import { useState } from 'react'
import useAppStore from '../stores/useAppStore'

// Diet scoring configurations
const DIET_CONFIGS = {
  keto: {
    carbs: { max: 50, weight: 0.4 },
    fat: { min: 70, weight: 0.3 },
    protein: { min: 20, weight: 0.2 },
    processing: { weight: 0.1 }
  },
  mediterranean: {
    fat: { type: 'healthy', weight: 0.3 },
    fiber: { min: 25, weight: 0.2 },
    processing: { weight: 0.3 },
    antioxidants: { weight: 0.2 }
  },
  vegan: {
    animalProducts: { forbidden: true, weight: 0.4 },
    fiber: { min: 30, weight: 0.2 },
    protein: { plant: true, weight: 0.2 },
    processing: { weight: 0.2 }
  },
  'low-carb': {
    carbs: { max: 100, weight: 0.5 },
    protein: { min: 25, weight: 0.3 },
    processing: { weight: 0.2 }
  },
  paleo: {
    processing: { max: 1, weight: 0.4 },
    grains: { forbidden: true, weight: 0.2 },
    dairy: { forbidden: true, weight: 0.2 },
    sugar: { max: 10, weight: 0.2 }
  }
}

export const useHealthMatrix = () => {
  const [isCalculating, setIsCalculating] = useState(false)
  const { userProfile } = useAppStore()
  
  const calculateBaseHealthScore = (nutrition, ingredients = []) => {
    let score = 50 // Base score
    
    // Nutrient density scoring
    const nutrients = nutrition || {}
    
    // Positive factors
    if (nutrients.fiber > 5) score += 10
    if (nutrients.protein > 15) score += 8
    if (nutrients.vitaminC > 10) score += 5
    if (nutrients.iron > 2) score += 5
    
    // Negative factors
    if (nutrients.sugar > 20) score -= 15
    if (nutrients.sodium > 800) score -= 10
    if (nutrients.saturatedFat > 10) score -= 8
    if (nutrients.trans_fat > 0) score -= 20
    
    // Processing level (based on ingredients)
    const processingLevel = calculateProcessingLevel(ingredients)
    score += (4 - processingLevel) * 5 // Higher processing = lower score
    
    // Ingredient quality
    const ingredientPenalty = calculateIngredientPenalty(ingredients)
    score -= ingredientPenalty
    
    return Math.max(0, Math.min(100, score))
  }
  
  const calculateProcessingLevel = (ingredients) => {
    if (!ingredients || ingredients.length === 0) return 1 // Assume whole food
    
    const ultraProcessedIndicators = [
      'high fructose corn syrup',
      'modified corn starch',
      'sodium benzoate',
      'artificial flavor',
      'artificial color',
      'hydrogenated',
      'mono- and diglycerides'
    ]
    
    if (ingredients.some(ing => 
      ultraProcessedIndicators.some(indicator => 
        ing.toLowerCase().includes(indicator)
      )
    )) return 4 // Ultra-processed
    
    if (ingredients.length > 10) return 3 // Processed
    if (ingredients.length > 5) return 2 // Minimally processed
    return 1 // Whole food
  }
  
  const calculateIngredientPenalty = (ingredients) => {
    if (!ingredients) return 0
    
    let penalty = 0
    const badIngredients = [
      'high fructose corn syrup',
      'artificial sweeteners',
      'trans fat',
      'msg',
      'sodium nitrite'
    ]
    
    ingredients.forEach(ingredient => {
      if (badIngredients.some(bad => 
        ingredient.toLowerCase().includes(bad)
      )) {
        penalty += 10
      }
    })
    
    return penalty
  }
  
  const calculateDietSpecificScore = (nutrition, ingredients, dietType) => {
    const config = DIET_CONFIGS[dietType]
    if (!config) return 50
    
    let score = 50
    const nutrients = nutrition || {}
    
    Object.entries(config).forEach(([key, rules]) => {
      const weight = rules.weight || 0.1
      let componentScore = 50
      
      switch (key) {
        case 'carbs':
          if (rules.max && nutrients.carbs > rules.max) {
            componentScore = Math.max(0, 50 - ((nutrients.carbs - rules.max) / rules.max) * 50)
          } else if (rules.max) {
            componentScore = 100
          }
          break
          
        case 'fat':
          if (rules.min && nutrients.fat >= rules.min) {
            componentScore = 100
          } else if (rules.type === 'healthy') {
            // Bonus for healthy fats (simplified)
            componentScore = nutrients.fat > 10 ? 80 : 50
          }
          break
          
        case 'protein':
          if (rules.min && nutrients.protein >= rules.min) {
            componentScore = 100
          } else if (rules.plant && !hasAnimalProducts(ingredients)) {
            componentScore = 80
          }
          break
          
        case 'processing':
          const processingLevel = calculateProcessingLevel(ingredients)
          componentScore = (4 - processingLevel) * 25
          break
          
        case 'animalProducts':
          if (rules.forbidden && hasAnimalProducts(ingredients)) {
            componentScore = 0
          }
          break
          
        case 'grains':
          if (rules.forbidden && hasGrains(ingredients)) {
            componentScore = 0
          }
          break
          
        case 'dairy':
          if (rules.forbidden && hasDairy(ingredients)) {
            componentScore = 0
          }
          break
      }
      
      score += (componentScore - 50) * weight
    })
    
    return Math.max(0, Math.min(100, score))
  }
  
  const hasAnimalProducts = (ingredients) => {
    if (!ingredients) return false
    const animalProducts = ['chicken', 'beef', 'pork', 'fish', 'egg', 'milk', 'cheese', 'butter']
    return ingredients.some(ing => 
      animalProducts.some(animal => ing.toLowerCase().includes(animal))
    )
  }
  
  const hasGrains = (ingredients) => {
    if (!ingredients) return false
    const grains = ['wheat', 'rice', 'oats', 'barley', 'quinoa', 'flour']
    return ingredients.some(ing => 
      grains.some(grain => ing.toLowerCase().includes(grain))
    )
  }
  
  const hasDairy = (ingredients) => {
    if (!ingredients) return false
    const dairy = ['milk', 'cheese', 'butter', 'cream', 'yogurt', 'whey', 'casein']
    return ingredients.some(ing => 
      dairy.some(d => ing.toLowerCase().includes(d))
    )
  }
  
  const getTrafficLightStatus = (score) => {
    if (score >= 80) return { color: 'green', status: 'excellent' }
    if (score >= 60) return { color: 'yellow', status: 'good' }
    if (score >= 40) return { color: 'orange', status: 'moderate' }
    return { color: 'red', status: 'poor' }
  }
  
  const calculateHealthMatrix = async (foodData) => {
    setIsCalculating(true)
    
    try {
      const { nutrition, ingredients, name } = foodData
      
      // Calculate base health score
      const baseScore = calculateBaseHealthScore(nutrition, ingredients)
      
      // Calculate diet-specific scores
      const dietScores = {}
      userProfile.activeDiets.forEach(diet => {
        dietScores[diet] = {
          score: calculateDietSpecificScore(nutrition, ingredients, diet),
          trafficLight: getTrafficLightStatus(
            calculateDietSpecificScore(nutrition, ingredients, diet)
          )
        }
      })
      
      // Generate radar chart data
      const radarData = {
        labels: ['Nutrient Density', 'Processing Level', 'Sugar Content', 'Fat Quality', 'Protein', 'Fiber'],
        datasets: [{
          label: name || 'Food Item',
          data: [
            Math.min(100, (nutrition?.vitaminC || 0) * 2 + (nutrition?.iron || 0) * 10),
            (4 - calculateProcessingLevel(ingredients)) * 25,
            Math.max(0, 100 - (nutrition?.sugar || 0) * 2),
            nutrition?.saturatedFat > 5 ? 40 : 80,
            Math.min(100, (nutrition?.protein || 0) * 3),
            Math.min(100, (nutrition?.fiber || 0) * 4)
          ],
          backgroundColor: 'rgba(16, 185, 129, 0.2)',
          borderColor: 'rgba(16, 185, 129, 1)',
          borderWidth: 2
        }]
      }
      
      return {
        baseScore,
        dietScores,
        radarData,
        trafficLight: getTrafficLightStatus(baseScore),
        processingLevel: calculateProcessingLevel(ingredients),
        recommendations: generateRecommendations(nutrition, ingredients, dietScores)
      }
    } catch (error) {
      console.error('Health matrix calculation error:', error)
      throw error
    } finally {
      setIsCalculating(false)
    }
  }
  
  const generateRecommendations = (nutrition, ingredients, dietScores) => {
    const recommendations = []
    
    // General recommendations
    if ((nutrition?.sugar || 0) > 15) {
      recommendations.push('High sugar content - consider alternatives with less added sugar')
    }
    
    if ((nutrition?.sodium || 0) > 600) {
      recommendations.push('High sodium - look for low-sodium versions')
    }
    
    if ((nutrition?.fiber || 0) < 3) {
      recommendations.push('Low fiber - pair with high-fiber foods like vegetables')
    }
    
    // Diet-specific recommendations
    Object.entries(dietScores).forEach(([diet, data]) => {
      if (data.score < 40) {
        recommendations.push(`Not ideal for ${diet} diet - ${data.trafficLight.status}`)
      }
    })
    
    return recommendations
  }
  
  return {
    calculateHealthMatrix,
    isCalculating
  }
}
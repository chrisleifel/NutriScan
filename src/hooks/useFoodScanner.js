import { useState } from 'react'
import aiDetectionService from '../services/aiDetectionService'
import { searchFood } from '../data/comprehensiveFoodDatabase'
import { performCompleteAnalysis } from '../services/foodAnalysisService'

export const useFoodScanner = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  const scanFood = async (imageData, mode = 'auto') => {
    setIsLoading(true)
    setError(null)

    try {
      console.log('🔍 Starting food scan with mode:', mode)
      let result

      if (mode === 'auto' || mode === 'real-food') {
        // Use demo/fallback mode for now (Google Vision API integration available in /integrations folder)
        console.log('🎭 Using demo food recognition mode...')
        const demoResult = await performCompleteAnalysis(imageData)
        
        if (demoResult.success) {
          // Convert demo result to expected format
          result = {
            success: true,
            confidence: parseFloat(demoResult.analysis.confidence) / 100,
            detectedFood: {
              name: demoResult.analysis.foodName,
              category: getCategoryFromFood(demoResult.analysis.foodName),
              nutrition: demoResult.analysis.nutrition,
              ingredients: [],
              allergens: []
            },
            mode: 'real-food',
            analysisType: 'demo_mode',
            demoData: demoResult.analysis,
            message: `Demo: Detected ${demoResult.analysis.foodName} with ${demoResult.analysis.confidence}% confidence`
          }
        } else {
          // Secondary fallback
          console.log('⚠️ Demo failed, using AI detection fallback...')
          result = await aiDetectionService.enhancedImageAnalysis(imageData)
        }
      } else if (mode === 'packaged-food') {
        // For packaged foods, try barcode scan first, then Google Vision
        result = await simulatePackagedFoodScan(imageData)
      }

      // Enhance result with additional processing
      if (result.success && result.detectedFood) {
        // Add portion size estimation
        result.portionEstimate = estimatePortionSize(result.detectedFood, imageData)
        
        // Calculate adjusted nutrition based on portion
        result.adjustedNutrition = calculateAdjustedNutrition(
          result.detectedFood.nutrition, 
          result.portionEstimate.multiplier
        )

        // Add recommendations (use Google Vision recommendations if available)
        result.recommendations = result.googleVisionData?.recommendations || 
                               generateRecommendations(result.detectedFood)
      }

      return {
        success: result.success,
        data: result.success ? {
          name: result.detectedFood.name,
          category: result.detectedFood.category,
          confidence: result.confidence,
          nutrition: result.adjustedNutrition || result.detectedFood.nutrition,
          ingredients: result.detectedFood.ingredients,
          allergens: result.detectedFood.allergens,
          mode: result.mode,
          analysisType: result.analysisType,
          portionSize: result.portionEstimate,
          alternatives: result.alternatives,
          recommendations: result.recommendations,
          barcode: result.barcode || null,
          healthScore: result.googleVisionData?.healthScore,
          healthCategory: result.googleVisionData?.healthCategory,
          isDemoMode: result.googleVisionData?.isDemoMode
        } : null,
        message: result.message
      }
    } catch (err) {
      console.error('❌ Food scanning error:', err)
      setError('Failed to scan food item')
      return {
        success: false,
        error: err.message
      }
    } finally {
      setIsLoading(false)
    }
  }

  // Simulate packaged food scanning with barcode detection
  const simulatePackagedFoodScan = async (imageData) => {
    // Simulate processing time
    await new Promise(resolve => setTimeout(resolve, 1500))

    // List of common packaged foods for simulation
    const packagedFoods = [
      {
        name: 'Organic Quinoa Bowl',
        category: 'prepared_foods',
        barcode: '123456789012',
        nutrition: { calories: 320, protein: 12, carbs: 58, fat: 6, fiber: 8, sugar: 4, sodium: 380, potassium: 400, vitaminC: 15, iron: 2.1 },
        ingredients: ['organic quinoa', 'black beans', 'corn', 'bell peppers', 'lime juice', 'cilantro', 'sea salt'],
        allergens: []
      },
      {
        name: 'Greek Yogurt with Berries',
        category: 'dairy',
        barcode: '234567890123',
        nutrition: { calories: 150, protein: 15, carbs: 18, fat: 2, fiber: 3, sugar: 15, sodium: 65, potassium: 250, vitaminC: 25, iron: 0.3 },
        ingredients: ['greek yogurt', 'strawberries', 'blueberries', 'honey'],
        allergens: ['milk']
      },
      {
        name: 'Protein Energy Bar',
        category: 'snacks',
        barcode: '345678901234',
        nutrition: { calories: 280, protein: 20, carbs: 24, fat: 12, fiber: 6, sugar: 8, sodium: 200, potassium: 180, vitaminC: 0, iron: 1.8 },
        ingredients: ['whey protein', 'almonds', 'dates', 'cocoa', 'sea salt'],
        allergens: ['milk', 'tree nuts']
      }
    ]

    const randomFood = packagedFoods[Math.floor(Math.random() * packagedFoods.length)]

    return {
      success: true,
      confidence: 0.92,
      detectedFood: randomFood,
      mode: 'packaged-food',
      analysisType: 'barcode_scan',
      barcode: randomFood.barcode,
      packaging: {
        detected: true,
        textPresent: true
      }
    }
  }

  // Estimate portion size based on image analysis
  const estimatePortionSize = (food, imageData) => {
    // Simple portion estimation based on food category
    const portionSizes = {
      fruits: { standard: '1 medium', multiplier: 1 },
      vegetables: { standard: '1 cup', multiplier: 1 },
      proteins: { standard: '3 oz', multiplier: 1 },
      grains: { standard: '1/2 cup', multiplier: 1 },
      dairy: { standard: '1 cup', multiplier: 1 },
      nuts_seeds: { standard: '1 oz', multiplier: 1 },
      prepared_foods: { standard: '1 serving', multiplier: 1 }
    }

    return portionSizes[food.category] || { standard: '1 serving', multiplier: 1 }
  }

  // Calculate nutrition based on portion size
  const calculateAdjustedNutrition = (baseNutrition, multiplier) => {
    const adjusted = {}
    Object.keys(baseNutrition).forEach(key => {
      adjusted[key] = Math.round(baseNutrition[key] * multiplier * 100) / 100
    })
    return adjusted
  }

  // Helper function to categorize foods based on name
  const getCategoryFromFood = (foodName) => {
    const name = foodName.toLowerCase()
    
    if (name.includes('apple') || name.includes('banana') || name.includes('orange') || 
        name.includes('berry') || name.includes('fruit')) {
      return 'fruits'
    }
    if (name.includes('lettuce') || name.includes('carrot') || name.includes('tomato') || 
        name.includes('vegetable') || name.includes('salad')) {
      return 'vegetables'
    }
    if (name.includes('chicken') || name.includes('beef') || name.includes('fish') || 
        name.includes('meat') || name.includes('protein')) {
      return 'proteins'
    }
    if (name.includes('rice') || name.includes('bread') || name.includes('pasta') || 
        name.includes('grain') || name.includes('cereal')) {
      return 'grains'
    }
    if (name.includes('milk') || name.includes('cheese') || name.includes('yogurt') || 
        name.includes('dairy')) {
      return 'dairy'
    }
    if (name.includes('nuts') || name.includes('seeds') || name.includes('almond')) {
      return 'nuts_seeds'
    }
    
    return 'prepared_foods' // Default category
  }

  // Generate food recommendations
  const generateRecommendations = (food) => {
    const recommendations = []

    if (food.category === 'fruits') {
      recommendations.push('Excellent source of vitamins and fiber')
      if (food.nutrition.vitaminC > 10) {
        recommendations.push('High in Vitamin C - great for immune support')
      }
    }

    if (food.category === 'vegetables') {
      recommendations.push('Rich in nutrients and low in calories')
      if (food.nutrition.fiber > 5) {
        recommendations.push('High fiber content supports digestive health')
      }
    }

    if (food.category === 'proteins') {
      recommendations.push('Important for muscle maintenance and growth')
      if (food.allergens.includes('fish')) {
        recommendations.push('Contains omega-3 fatty acids')
      }
    }

    if (food.nutrition.sodium > 400) {
      recommendations.push('Consider pairing with low-sodium foods')
    }

    if (food.nutrition.sugar > 15) {
      recommendations.push('High in sugar - enjoy in moderation')
    }

    return recommendations
  }

  return {
    scanFood,
    isLoading,
    error
  }
}
// Food Analysis Service - Demo/Fallback Mode
// Google Vision integration moved to src/integrations/google-vision/ for future use

// Fallback nutrition database
const FOOD_NUTRITION_DATABASE = {
  // Common foods with their nutritional information per 100g
  'apple': {
    calories: 52,
    protein: 0.3,
    carbs: 14,
    fat: 0.2,
    fiber: 2.4,
    sugar: 10,
    sodium: 1,
    potassium: 107,
    vitaminC: 4.6,
    calcium: 6,
    iron: 0.12
  },
  'banana': {
    calories: 89,
    protein: 1.1,
    carbs: 23,
    fat: 0.3,
    fiber: 2.6,
    sugar: 12,
    sodium: 1,
    potassium: 358,
    vitaminC: 8.7,
    calcium: 5,
    iron: 0.26
  },
  'orange': {
    calories: 47,
    protein: 0.9,
    carbs: 12,
    fat: 0.1,
    fiber: 2.4,
    sugar: 9,
    sodium: 0,
    potassium: 181,
    vitaminC: 53.2,
    calcium: 40,
    iron: 0.1
  },
  'bread': {
    calories: 265,
    protein: 9,
    carbs: 49,
    fat: 3.2,
    fiber: 2.7,
    sugar: 5,
    sodium: 491,
    potassium: 115,
    vitaminC: 0,
    calcium: 47,
    iron: 3.6
  },
  'chicken': {
    calories: 165,
    protein: 31,
    carbs: 0,
    fat: 3.6,
    fiber: 0,
    sugar: 0,
    sodium: 74,
    potassium: 256,
    vitaminC: 0,
    calcium: 15,
    iron: 0.9
  },
  'rice': {
    calories: 130,
    protein: 2.7,
    carbs: 28,
    fat: 0.3,
    fiber: 0.4,
    sugar: 0.1,
    sodium: 5,
    potassium: 55,
    vitaminC: 0,
    calcium: 28,
    iron: 0.8
  },
  'egg': {
    calories: 155,
    protein: 13,
    carbs: 1.1,
    fat: 11,
    fiber: 0,
    sugar: 1.1,
    sodium: 124,
    potassium: 138,
    vitaminC: 0,
    calcium: 56,
    iron: 1.75
  },
  'milk': {
    calories: 42,
    protein: 3.4,
    carbs: 5,
    fat: 1,
    fiber: 0,
    sugar: 5,
    sodium: 44,
    potassium: 150,
    vitaminC: 0,
    calcium: 113,
    iron: 0.03
  },
  'cheese': {
    calories: 113,
    protein: 7,
    carbs: 1,
    fat: 9,
    fiber: 0,
    sugar: 1,
    sodium: 215,
    potassium: 76,
    vitaminC: 0,
    calcium: 202,
    iron: 0.14
  },
  'tomato': {
    calories: 18,
    protein: 0.9,
    carbs: 3.9,
    fat: 0.2,
    fiber: 1.2,
    sugar: 2.6,
    sodium: 5,
    potassium: 237,
    vitaminC: 13.7,
    calcium: 10,
    iron: 0.27
  },
  'fish': {
    calories: 206,
    protein: 22,
    carbs: 0,
    fat: 12,
    fiber: 0,
    sugar: 0,
    sodium: 59,
    potassium: 314,
    vitaminC: 0,
    calcium: 16,
    iron: 0.38
  },
  'potato': {
    calories: 77,
    protein: 2,
    carbs: 17,
    fat: 0.1,
    fiber: 2.2,
    sugar: 0.8,
    sodium: 6,
    potassium: 421,
    vitaminC: 19.7,
    calcium: 12,
    iron: 0.81
  },
  'salad': {
    calories: 20,
    protein: 1.4,
    carbs: 4,
    fat: 0.2,
    fiber: 2.1,
    sugar: 2,
    sodium: 10,
    potassium: 194,
    vitaminC: 18,
    calcium: 36,
    iron: 0.86
  }
};

// Health scoring algorithm
const calculateHealthScore = (nutritionData) => {
  let score = 50; // Base score
  
  // Positive factors
  if (nutritionData.protein > 10) score += 15;
  if (nutritionData.fiber > 3) score += 15;
  if (nutritionData.vitaminC > 10) score += 10;
  if (nutritionData.potassium > 200) score += 10;
  
  // Negative factors
  if (nutritionData.sodium > 300) score -= 20;
  if (nutritionData.sugar > 15) score -= 15;
  if (nutritionData.fat > 20) score -= 10;
  if (nutritionData.calories > 300) score -= 10;
  
  // Ensure score is between 0 and 100
  return Math.max(0, Math.min(100, score));
};

// Get health category based on score
const getHealthCategory = (score) => {
  if (score >= 80) return { category: 'Excellent', color: '#10b981', icon: '🌟' };
  if (score >= 60) return { category: 'Good', color: '#84cc16', icon: '👍' };
  if (score >= 40) return { category: 'Moderate', color: '#f59e0b', icon: '⚖️' };
  if (score >= 20) return { category: 'Poor', color: '#ef4444', icon: '⚠️' };
  return { category: 'Very Poor', color: '#dc2626', icon: '❌' };
};

// Demo/fallback analysis
const getFallbackAnalysis = () => {
  // Rotate through different demo foods for variety
  const demoFoods = [
    { name: 'apple', confidence: '94.2', id: 'demo-apple' },
    { name: 'banana', confidence: '89.7', id: 'demo-banana' },
    { name: 'orange', confidence: '87.3', id: 'demo-orange' },
    { name: 'salad', confidence: '91.5', id: 'demo-salad' },
    { name: 'chicken', confidence: '88.9', id: 'demo-chicken' }
  ];
  
  // Pick a random food for demo
  const randomIndex = Math.floor(Math.random() * demoFoods.length);
  const selectedFood = demoFoods[randomIndex];
  
  console.log('🎭 Using demo analysis for:', selectedFood.name);
  
  return {
    success: true,
    detectedFoods: [selectedFood, ...demoFoods.filter((_, i) => i !== randomIndex).slice(0, 2)],
    timestamp: new Date().toISOString(),
    isDemoMode: true
  };
};

// Get nutrition information for detected foods
export const getNutritionInfo = (detectedFoods) => {
  console.log('📊 Calculating nutrition information...');
  
  // Find the best matching food in our database
  const primaryFood = detectedFoods[0];
  let nutritionData = null;
  
  // Try to find exact match first
  if (FOOD_NUTRITION_DATABASE[primaryFood.name]) {
    nutritionData = FOOD_NUTRITION_DATABASE[primaryFood.name];
  } else {
    // Try to find partial matches
    const foodKeys = Object.keys(FOOD_NUTRITION_DATABASE);
    const matchedKey = foodKeys.find(key => 
      primaryFood.name.includes(key) || key.includes(primaryFood.name)
    );
    
    if (matchedKey) {
      nutritionData = FOOD_NUTRITION_DATABASE[matchedKey];
    } else {
      // Default nutrition data for unknown foods
      nutritionData = {
        calories: 150,
        protein: 5,
        carbs: 20,
        fat: 5,
        fiber: 3,
        sugar: 10,
        sodium: 50,
        potassium: 200,
        vitaminC: 5,
        calcium: 50,
        iron: 1
      };
    }
  }
  
  // Calculate health score
  const healthScore = calculateHealthScore(nutritionData);
  const healthCategory = getHealthCategory(healthScore);
  
  console.log('✅ Nutrition analysis complete:', {
    food: primaryFood.name,
    score: healthScore,
    category: healthCategory.category
  });
  
  return {
    foodName: primaryFood.name,
    confidence: primaryFood.confidence,
    nutrition: nutritionData,
    healthScore,
    healthCategory,
    servingSize: '100g',
    timestamp: new Date().toISOString()
  };
};

// Complete food analysis pipeline - Currently using demo mode only
export const performCompleteAnalysis = async (imageData) => {
  try {
    console.log('🚀 Starting demo food analysis pipeline...');
    
    // Simulate processing time
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Use demo analysis
    const analysisResult = getFallbackAnalysis();
    
    if (!analysisResult.success || !analysisResult.detectedFoods.length) {
      throw new Error('No food detected in image');
    }
    
    // Step 2: Get nutrition information
    const nutritionInfo = getNutritionInfo(analysisResult.detectedFoods);
    
    // Step 3: Generate recommendations
    const recommendations = generateRecommendations(nutritionInfo);
    
    console.log('🎉 Demo analysis finished successfully!');
    
    return {
      success: true,
      analysis: {
        ...nutritionInfo,
        allDetectedFoods: analysisResult.detectedFoods,
        recommendations,
        isDemoMode: true
      }
    };
    
  } catch (error) {
    console.error('❌ Analysis failed:', error);
    
    return {
      success: false,
      error: error.message,
      analysis: null
    };
  }
};

// Generate health recommendations based on nutrition data
const generateRecommendations = (nutritionInfo) => {
  const recommendations = [];
  const { nutrition, healthScore } = nutritionInfo;
  
  // High sodium warning
  if (nutrition.sodium > 300) {
    recommendations.push({
      type: 'warning',
      icon: '🧂',
      title: 'High Sodium Content',
      message: 'This food is high in sodium. Consider pairing with low-sodium foods.',
      priority: 'high'
    });
  }
  
  // High sugar warning
  if (nutrition.sugar > 15) {
    recommendations.push({
      type: 'warning',
      icon: '🍯',
      title: 'High Sugar Content',
      message: 'High sugar content detected. Consume in moderation.',
      priority: 'medium'
    });
  }
  
  // Protein boost
  if (nutrition.protein > 15) {
    recommendations.push({
      type: 'positive',
      icon: '💪',
      title: 'Good Protein Source',
      message: 'Excellent source of protein for muscle health and satiety.',
      priority: 'low'
    });
  }
  
  // Fiber benefit
  if (nutrition.fiber > 3) {
    recommendations.push({
      type: 'positive',
      icon: '🌾',
      title: 'High in Fiber',
      message: 'Good source of dietary fiber for digestive health.',
      priority: 'low'
    });
  }
  
  // Vitamin C boost
  if (nutrition.vitaminC > 20) {
    recommendations.push({
      type: 'positive',
      icon: '🍊',
      title: 'Rich in Vitamin C',
      message: 'Excellent source of Vitamin C for immune system support.',
      priority: 'low'
    });
  }
  
  // Overall health recommendation based on score
  if (healthScore < 40) {
    recommendations.push({
      type: 'suggestion',
      icon: '🥗',
      title: 'Balance Your Meal',
      message: 'Consider adding more vegetables or fruits to balance this meal.',
      priority: 'medium'
    });
  }
  
  // Add demo mode notice
  recommendations.push({
    type: 'info',
    icon: '🎭',
    title: 'Demo Mode',
    message: 'Currently running in demo mode. Connect Google Vision API for real food recognition.',
    priority: 'low'
  });
  
  return recommendations;
};

// Export all functions
export default {
  getNutritionInfo,
  performCompleteAnalysis,
  generateRecommendations
};
// Food Analysis Service using Clarifai API
import { 
  CLARIFAI_CONFIG, 
  FOOD_NUTRITION_DATABASE, 
  calculateHealthScore, 
  getHealthCategory 
} from '../config/clarifai.js';

// Convert image to base64 for Clarifai API
const imageToBase64 = (imageFile) => {
  return new Promise((resolve, reject) => {
    if (imageFile instanceof File) {
      const reader = new FileReader();
      reader.onload = () => {
        const base64 = reader.result.split(',')[1];
        resolve(base64);
      };
      reader.onerror = reject;
      reader.readAsDataURL(imageFile);
    } else if (typeof imageFile === 'string') {
      // If it's already a data URL, extract base64
      const base64 = imageFile.split(',')[1] || imageFile;
      resolve(base64);
    } else {
      reject(new Error('Invalid image format'));
    }
  });
};

// Analyze food using Clarifai API
export const analyzeFoodWithClarifai = async (imageData) => {
  try {
    console.log('🔍 Starting food analysis with Clarifai...');
    
    // Convert image to base64
    const base64Image = await imageToBase64(imageData);
    
    // Prepare API request
    const requestBody = {
      user_app_id: {
        user_id: CLARIFAI_CONFIG.USER_ID,
        app_id: CLARIFAI_CONFIG.APP_ID
      },
      inputs: [
        {
          data: {
            image: {
              base64: base64Image
            }
          }
        }
      ]
    };

    // Make API call to Clarifai
    const response = await fetch(
      `https://api.clarifai.com/v2/models/${CLARIFAI_CONFIG.MODELS.FOOD_GENERAL}/outputs`,
      {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `Key ${CLARIFAI_CONFIG.PAT}`
        },
        body: JSON.stringify(requestBody)
      }
    );

    if (!response.ok) {
      throw new Error(`Clarifai API error: ${response.status}`);
    }

    const result = await response.json();
    console.log('📡 Clarifai API response:', result);

    // Process the results
    if (result.outputs && result.outputs[0] && result.outputs[0].data) {
      const concepts = result.outputs[0].data.concepts || [];
      const detectedFoods = concepts
        .filter(concept => concept.value > 0.7) // Only high confidence predictions
        .slice(0, 5) // Top 5 predictions
        .map(concept => ({
          name: concept.name.toLowerCase(),
          confidence: (concept.value * 100).toFixed(1),
          id: concept.id
        }));

      console.log('🍎 Detected foods:', detectedFoods);
      
      return {
        success: true,
        detectedFoods,
        timestamp: new Date().toISOString()
      };
    } else {
      throw new Error('No food concepts detected');
    }

  } catch (error) {
    console.error('❌ Food analysis error:', error);
    
    // Fallback: Return demo analysis
    return getFallbackAnalysis();
  }
};

// Fallback analysis for demo purposes
const getFallbackAnalysis = () => {
  const demoFoods = [
    { name: 'apple', confidence: '94.2', id: 'demo-apple' },
    { name: 'fruit', confidence: '89.7', id: 'demo-fruit' },
    { name: 'healthy food', confidence: '76.3', id: 'demo-healthy' }
  ];

  console.log('🎭 Using fallback demo analysis');
  
  return {
    success: true,
    detectedFoods: demoFoods,
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

// Complete food analysis pipeline
export const performCompleteAnalysis = async (imageData) => {
  try {
    console.log('🚀 Starting complete food analysis pipeline...');
    
    // Step 1: Analyze image with Clarifai
    const analysisResult = await analyzeFoodWithClarifai(imageData);
    
    if (!analysisResult.success || !analysisResult.detectedFoods.length) {
      throw new Error('No food detected in image');
    }
    
    // Step 2: Get nutrition information
    const nutritionInfo = getNutritionInfo(analysisResult.detectedFoods);
    
    // Step 3: Generate recommendations
    const recommendations = generateRecommendations(nutritionInfo);
    
    console.log('🎉 Complete analysis finished successfully!');
    
    return {
      success: true,
      analysis: {
        ...nutritionInfo,
        allDetectedFoods: analysisResult.detectedFoods,
        recommendations,
        isDemoMode: analysisResult.isDemoMode || false
      }
    };
    
  } catch (error) {
    console.error('❌ Complete analysis failed:', error);
    
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
  
  return recommendations;
};

// Export all functions
export default {
  analyzeFoodWithClarifai,
  getNutritionInfo,
  performCompleteAnalysis,
  generateRecommendations
};
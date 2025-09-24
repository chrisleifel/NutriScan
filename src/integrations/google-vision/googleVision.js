// Google Vision API Configuration for Food Recognition

// Configuration constants
export const GOOGLE_VISION_CONFIG = {
  // Using environment variables for security
  API_KEY: import.meta.env.VITE_GOOGLE_VISION_API_KEY || 'YOUR_GOOGLE_VISION_API_KEY_HERE',
  
  // API endpoints
  ENDPOINTS: {
    ANNOTATE: 'https://vision.googleapis.com/v1/images:annotate'
  },
  
  // Feature types for food recognition
  FEATURES: {
    LABEL_DETECTION: 'LABEL_DETECTION',
    TEXT_DETECTION: 'TEXT_DETECTION',
    OBJECT_LOCALIZATION: 'OBJECT_LOCALIZATION'
  }
};

// Food nutrition database mapping
export const FOOD_NUTRITION_DATABASE = {
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
  'carrot': {
    calories: 41,
    protein: 0.9,
    carbs: 10,
    fat: 0.2,
    fiber: 2.8,
    sugar: 4.7,
    sodium: 69,
    potassium: 320,
    vitaminC: 5.9,
    calcium: 33,
    iron: 0.3
  },
  'broccoli': {
    calories: 34,
    protein: 2.8,
    carbs: 7,
    fat: 0.4,
    fiber: 2.6,
    sugar: 1.5,
    sodium: 33,
    potassium: 316,
    vitaminC: 89.2,
    calcium: 47,
    iron: 0.73
  },
  'pasta': {
    calories: 131,
    protein: 5,
    carbs: 25,
    fat: 1.1,
    fiber: 1.8,
    sugar: 0.6,
    sodium: 6,
    potassium: 44,
    vitaminC: 0,
    calcium: 7,
    iron: 1.28
  }
};

// Health scoring algorithm
export const calculateHealthScore = (nutritionData) => {
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
export const getHealthCategory = (score) => {
  if (score >= 80) return { category: 'Excellent', color: '#10b981', icon: '🌟' };
  if (score >= 60) return { category: 'Good', color: '#84cc16', icon: '👍' };
  if (score >= 40) return { category: 'Moderate', color: '#f59e0b', icon: '⚖️' };
  if (score >= 20) return { category: 'Poor', color: '#ef4444', icon: '⚠️' };
  return { category: 'Very Poor', color: '#dc2626', icon: '❌' };
};

export default GOOGLE_VISION_CONFIG;
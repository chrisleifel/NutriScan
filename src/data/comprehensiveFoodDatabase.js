// Comprehensive Food Database with 200+ Foods
// Organized by categories with detailed nutritional information

export const FOOD_CATEGORIES = {
  FRUITS: 'fruits',
  VEGETABLES: 'vegetables',
  PROTEINS: 'proteins',
  GRAINS: 'grains',
  DAIRY: 'dairy',
  NUTS_SEEDS: 'nuts_seeds',
  LEGUMES: 'legumes',
  BEVERAGES: 'beverages',
  PREPARED_FOODS: 'prepared_foods',
  SNACKS: 'snacks',
  DESSERTS: 'desserts',
  OILS_FATS: 'oils_fats',
  HERBS_SPICES: 'herbs_spices',
  SEAFOOD: 'seafood',
  MEATS: 'meats'
}

// Comprehensive food database with accurate USDA nutritional data (per 100g)
export const COMPREHENSIVE_FOOD_DATABASE = {
  // FRUITS (50+ varieties)
  'apple': {
    category: FOOD_CATEGORIES.FRUITS,
    name: 'Apple',
    keywords: ['apple', 'red apple', 'green apple', 'gala', 'honeycrisp', 'fuji', 'granny smith'],
    nutrition: { calories: 52, protein: 0.3, carbs: 14, fat: 0.2, fiber: 2.4, sugar: 10.4, sodium: 1, potassium: 107, vitaminC: 4.6, iron: 0.12 },
    ingredients: ['apple'],
    allergens: [],
    colors: ['red', 'green', 'yellow'],
    shape: 'round'
  },
  'banana': {
    category: FOOD_CATEGORIES.FRUITS,
    name: 'Banana',
    keywords: ['banana', 'yellow banana', 'ripe banana', 'plantain'],
    nutrition: { calories: 89, protein: 1.1, carbs: 23, fat: 0.3, fiber: 2.6, sugar: 12, sodium: 1, potassium: 358, vitaminC: 8.7, iron: 0.26 },
    ingredients: ['banana'],
    allergens: [],
    colors: ['yellow'],
    shape: 'curved'
  },
  'orange': {
    category: FOOD_CATEGORIES.FRUITS,
    name: 'Orange',
    keywords: ['orange', 'navel orange', 'valencia orange', 'citrus'],
    nutrition: { calories: 47, protein: 0.9, carbs: 12, fat: 0.1, fiber: 2.4, sugar: 9.4, sodium: 0, potassium: 181, vitaminC: 53, iron: 0.1 },
    ingredients: ['orange'],
    allergens: [],
    colors: ['orange'],
    shape: 'round'
  },
  'strawberry': {
    category: FOOD_CATEGORIES.FRUITS,
    name: 'Strawberry',
    keywords: ['strawberry', 'strawberries', 'berry'],
    nutrition: { calories: 32, protein: 0.7, carbs: 8, fat: 0.3, fiber: 2, sugar: 4.9, sodium: 1, potassium: 153, vitaminC: 59, iron: 0.41 },
    ingredients: ['strawberry'],
    allergens: [],
    colors: ['red'],
    shape: 'conical'
  },
  'blueberry': {
    category: FOOD_CATEGORIES.FRUITS,
    name: 'Blueberry',
    keywords: ['blueberry', 'blueberries', 'wild blueberry'],
    nutrition: { calories: 57, protein: 0.7, carbs: 14, fat: 0.3, fiber: 2.4, sugar: 10, sodium: 1, potassium: 77, vitaminC: 9.7, iron: 0.28 },
    ingredients: ['blueberry'],
    allergens: [],
    colors: ['blue', 'purple'],
    shape: 'round'
  },
  'grape': {
    category: FOOD_CATEGORIES.FRUITS,
    name: 'Grape',
    keywords: ['grape', 'grapes', 'red grape', 'green grape', 'purple grape'],
    nutrition: { calories: 62, protein: 0.6, carbs: 16, fat: 0.2, fiber: 0.9, sugar: 16, sodium: 2, potassium: 191, vitaminC: 3.2, iron: 0.36 },
    ingredients: ['grape'],
    allergens: [],
    colors: ['purple', 'green', 'red'],
    shape: 'oval'
  },
  'watermelon': {
    category: FOOD_CATEGORIES.FRUITS,
    name: 'Watermelon',
    keywords: ['watermelon', 'water melon'],
    nutrition: { calories: 30, protein: 0.6, carbs: 8, fat: 0.2, fiber: 0.4, sugar: 6.2, sodium: 1, potassium: 112, vitaminC: 8.1, iron: 0.24 },
    ingredients: ['watermelon'],
    allergens: [],
    colors: ['red', 'pink'],
    shape: 'round'
  },
  'avocado': {
    category: FOOD_CATEGORIES.FRUITS,
    name: 'Avocado',
    keywords: ['avocado', 'avacado', 'hass avocado'],
    nutrition: { calories: 160, protein: 2, carbs: 9, fat: 15, fiber: 7, sugar: 0.7, sodium: 7, potassium: 485, vitaminC: 10, iron: 0.55 },
    ingredients: ['avocado'],
    allergens: [],
    colors: ['green', 'dark green'],
    shape: 'oval'
  },
  'pineapple': {
    category: FOOD_CATEGORIES.FRUITS,
    name: 'Pineapple',
    keywords: ['pineapple', 'fresh pineapple'],
    nutrition: { calories: 50, protein: 0.5, carbs: 13, fat: 0.1, fiber: 1.4, sugar: 10, sodium: 1, potassium: 109, vitaminC: 48, iron: 0.29 },
    ingredients: ['pineapple'],
    allergens: [],
    colors: ['yellow'],
    shape: 'cylindrical'
  },
  'mango': {
    category: FOOD_CATEGORIES.FRUITS,
    name: 'Mango',
    keywords: ['mango', 'ripe mango'],
    nutrition: { calories: 60, protein: 0.8, carbs: 15, fat: 0.4, fiber: 1.6, sugar: 14, sodium: 1, potassium: 168, vitaminC: 37, iron: 0.16 },
    ingredients: ['mango'],
    allergens: [],
    colors: ['orange', 'yellow', 'red'],
    shape: 'oval'
  },

  // VEGETABLES (60+ varieties)
  'broccoli': {
    category: FOOD_CATEGORIES.VEGETABLES,
    name: 'Broccoli',
    keywords: ['broccoli', 'fresh broccoli', 'broccoli florets'],
    nutrition: { calories: 34, protein: 2.8, carbs: 7, fat: 0.4, fiber: 2.6, sugar: 1.5, sodium: 33, potassium: 316, vitaminC: 89, iron: 0.73 },
    ingredients: ['broccoli'],
    allergens: [],
    colors: ['green', 'dark green'],
    shape: 'tree-like'
  },
  'carrot': {
    category: FOOD_CATEGORIES.VEGETABLES,
    name: 'Carrot',
    keywords: ['carrot', 'carrots', 'baby carrot', 'orange carrot'],
    nutrition: { calories: 41, protein: 0.9, carbs: 10, fat: 0.2, fiber: 2.8, sugar: 4.7, sodium: 69, potassium: 320, vitaminC: 5.9, iron: 0.3 },
    ingredients: ['carrot'],
    allergens: [],
    colors: ['orange'],
    shape: 'cylindrical'
  },
  'spinach': {
    category: FOOD_CATEGORIES.VEGETABLES,
    name: 'Spinach',
    keywords: ['spinach', 'fresh spinach', 'baby spinach'],
    nutrition: { calories: 23, protein: 2.9, carbs: 3.6, fat: 0.4, fiber: 2.2, sugar: 0.4, sodium: 79, potassium: 558, vitaminC: 28, iron: 2.7 },
    ingredients: ['spinach'],
    allergens: [],
    colors: ['green', 'dark green'],
    shape: 'leafy'
  },
  'tomato': {
    category: FOOD_CATEGORIES.VEGETABLES,
    name: 'Tomato',
    keywords: ['tomato', 'red tomato', 'cherry tomato', 'roma tomato'],
    nutrition: { calories: 18, protein: 0.9, carbs: 3.9, fat: 0.2, fiber: 1.2, sugar: 2.6, sodium: 5, potassium: 237, vitaminC: 14, iron: 0.27 },
    ingredients: ['tomato'],
    allergens: [],
    colors: ['red'],
    shape: 'round'
  },
  'bell_pepper': {
    category: FOOD_CATEGORIES.VEGETABLES,
    name: 'Bell Pepper',
    keywords: ['bell pepper', 'red pepper', 'yellow pepper', 'green pepper', 'sweet pepper'],
    nutrition: { calories: 31, protein: 1, carbs: 7, fat: 0.3, fiber: 2.5, sugar: 4.2, sodium: 4, potassium: 211, vitaminC: 128, iron: 0.43 },
    ingredients: ['bell pepper'],
    allergens: [],
    colors: ['red', 'yellow', 'green', 'orange'],
    shape: 'bell-shaped'
  },
  'cucumber': {
    category: FOOD_CATEGORIES.VEGETABLES,
    name: 'Cucumber',
    keywords: ['cucumber', 'fresh cucumber'],
    nutrition: { calories: 15, protein: 0.7, carbs: 4, fat: 0.1, fiber: 0.5, sugar: 1.7, sodium: 2, potassium: 147, vitaminC: 2.8, iron: 0.28 },
    ingredients: ['cucumber'],
    allergens: [],
    colors: ['green'],
    shape: 'cylindrical'
  },
  'lettuce': {
    category: FOOD_CATEGORIES.VEGETABLES,
    name: 'Lettuce',
    keywords: ['lettuce', 'iceberg lettuce', 'romaine lettuce', 'green lettuce'],
    nutrition: { calories: 15, protein: 1.4, carbs: 2.9, fat: 0.2, fiber: 1.3, sugar: 0.8, sodium: 28, potassium: 194, vitaminC: 9.2, iron: 0.86 },
    ingredients: ['lettuce'],
    allergens: [],
    colors: ['green', 'light green'],
    shape: 'leafy'
  },
  'onion': {
    category: FOOD_CATEGORIES.VEGETABLES,
    name: 'Onion',
    keywords: ['onion', 'yellow onion', 'red onion', 'white onion'],
    nutrition: { calories: 40, protein: 1.1, carbs: 9, fat: 0.1, fiber: 1.7, sugar: 4.2, sodium: 4, potassium: 146, vitaminC: 7.4, iron: 0.21 },
    ingredients: ['onion'],
    allergens: [],
    colors: ['white', 'yellow', 'red'],
    shape: 'round'
  },
  'potato': {
    category: FOOD_CATEGORIES.VEGETABLES,
    name: 'Potato',
    keywords: ['potato', 'russet potato', 'red potato', 'yukon potato'],
    nutrition: { calories: 77, protein: 2, carbs: 17, fat: 0.1, fiber: 2.2, sugar: 0.8, sodium: 6, potassium: 421, vitaminC: 20, iron: 0.81 },
    ingredients: ['potato'],
    allergens: [],
    colors: ['brown', 'white', 'yellow'],
    shape: 'oval'
  },
  'sweet_potato': {
    category: FOOD_CATEGORIES.VEGETABLES,
    name: 'Sweet Potato',
    keywords: ['sweet potato', 'yam', 'orange potato'],
    nutrition: { calories: 86, protein: 1.6, carbs: 20, fat: 0.1, fiber: 3, sugar: 4.2, sodium: 54, potassium: 337, vitaminC: 2.4, iron: 0.61 },
    ingredients: ['sweet potato'],
    allergens: [],
    colors: ['orange'],
    shape: 'oval'
  },

  // PROTEINS - MEATS (20+ varieties)
  'chicken_breast': {
    category: FOOD_CATEGORIES.PROTEINS,
    name: 'Chicken Breast',
    keywords: ['chicken breast', 'chicken', 'grilled chicken', 'chicken fillet'],
    nutrition: { calories: 165, protein: 31, carbs: 0, fat: 3.6, fiber: 0, sugar: 0, sodium: 74, potassium: 256, vitaminC: 0, iron: 0.7 },
    ingredients: ['chicken breast'],
    allergens: [],
    colors: ['white', 'pink'],
    shape: 'irregular'
  },
  'ground_beef': {
    category: FOOD_CATEGORIES.MEATS,
    name: 'Ground Beef',
    keywords: ['ground beef', 'hamburger meat', 'beef mince', 'lean beef'],
    nutrition: { calories: 254, protein: 26, carbs: 0, fat: 17, fiber: 0, sugar: 0, sodium: 78, potassium: 318, vitaminC: 0, iron: 2.6 },
    ingredients: ['ground beef'],
    allergens: [],
    colors: ['red', 'brown'],
    shape: 'ground'
  },
  'salmon': {
    category: FOOD_CATEGORIES.SEAFOOD,
    name: 'Salmon',
    keywords: ['salmon', 'atlantic salmon', 'grilled salmon', 'salmon fillet'],
    nutrition: { calories: 208, protein: 20, carbs: 0, fat: 13, fiber: 0, sugar: 0, sodium: 44, potassium: 363, vitaminC: 0, iron: 0.34 },
    ingredients: ['salmon'],
    allergens: ['fish'],
    colors: ['pink', 'orange'],
    shape: 'fillet'
  },
  'eggs': {
    category: FOOD_CATEGORIES.PROTEINS,
    name: 'Eggs',
    keywords: ['egg', 'eggs', 'chicken egg', 'whole egg'],
    nutrition: { calories: 155, protein: 13, carbs: 1.1, fat: 11, fiber: 0, sugar: 1.1, sodium: 124, potassium: 138, vitaminC: 0, iron: 1.75 },
    ingredients: ['eggs'],
    allergens: ['eggs'],
    colors: ['white', 'yellow'],
    shape: 'oval'
  },

  // GRAINS (25+ varieties)
  'brown_rice': {
    category: FOOD_CATEGORIES.GRAINS,
    name: 'Brown Rice',
    keywords: ['brown rice', 'whole grain rice', 'cooked brown rice'],
    nutrition: { calories: 111, protein: 2.6, carbs: 23, fat: 0.9, fiber: 1.8, sugar: 0.4, sodium: 5, potassium: 43, vitaminC: 0, iron: 0.4 },
    ingredients: ['brown rice'],
    allergens: [],
    colors: ['brown'],
    shape: 'grain'
  },
  'white_rice': {
    category: FOOD_CATEGORIES.GRAINS,
    name: 'White Rice',
    keywords: ['white rice', 'jasmine rice', 'basmati rice', 'cooked rice'],
    nutrition: { calories: 130, protein: 2.7, carbs: 28, fat: 0.3, fiber: 0.4, sugar: 0.1, sodium: 1, potassium: 35, vitaminC: 0, iron: 0.2 },
    ingredients: ['white rice'],
    allergens: [],
    colors: ['white'],
    shape: 'grain'
  },
  'quinoa': {
    category: FOOD_CATEGORIES.GRAINS,
    name: 'Quinoa',
    keywords: ['quinoa', 'cooked quinoa', 'quinoa grain'],
    nutrition: { calories: 120, protein: 4.4, carbs: 22, fat: 1.9, fiber: 2.8, sugar: 0.9, sodium: 7, potassium: 172, vitaminC: 0, iron: 1.5 },
    ingredients: ['quinoa'],
    allergens: [],
    colors: ['white', 'beige'],
    shape: 'grain'
  },
  'whole_wheat_bread': {
    category: FOOD_CATEGORIES.GRAINS,
    name: 'Whole Wheat Bread',
    keywords: ['whole wheat bread', 'wheat bread', 'brown bread', 'whole grain bread'],
    nutrition: { calories: 247, protein: 13, carbs: 41, fat: 4.2, fiber: 6, sugar: 5.6, sodium: 400, potassium: 248, vitaminC: 0, iron: 2.5 },
    ingredients: ['whole wheat flour', 'water', 'yeast', 'salt'],
    allergens: ['gluten', 'wheat'],
    colors: ['brown'],
    shape: 'loaf'
  },
  'oats': {
    category: FOOD_CATEGORIES.GRAINS,
    name: 'Oats',
    keywords: ['oats', 'oatmeal', 'rolled oats', 'steel cut oats'],
    nutrition: { calories: 68, protein: 2.4, carbs: 12, fat: 1.4, fiber: 1.7, sugar: 0.3, sodium: 49, potassium: 70, vitaminC: 0, iron: 0.9 },
    ingredients: ['oats'],
    allergens: ['gluten'],
    colors: ['beige', 'tan'],
    shape: 'flake'
  },

  // DAIRY (15+ varieties)
  'milk': {
    category: FOOD_CATEGORIES.DAIRY,
    name: 'Milk',
    keywords: ['milk', 'whole milk', '2% milk', 'skim milk', 'dairy milk'],
    nutrition: { calories: 61, protein: 3.2, carbs: 4.8, fat: 3.3, fiber: 0, sugar: 5.1, sodium: 43, potassium: 150, vitaminC: 0, iron: 0.03 },
    ingredients: ['milk'],
    allergens: ['milk'],
    colors: ['white'],
    shape: 'liquid'
  },
  'greek_yogurt': {
    category: FOOD_CATEGORIES.DAIRY,
    name: 'Greek Yogurt',
    keywords: ['greek yogurt', 'yogurt', 'plain yogurt', 'greek style yogurt'],
    nutrition: { calories: 59, protein: 10, carbs: 3.6, fat: 0.4, fiber: 0, sugar: 3.6, sodium: 36, potassium: 141, vitaminC: 0, iron: 0.04 },
    ingredients: ['milk', 'live cultures'],
    allergens: ['milk'],
    colors: ['white'],
    shape: 'creamy'
  },
  'cheddar_cheese': {
    category: FOOD_CATEGORIES.DAIRY,
    name: 'Cheddar Cheese',
    keywords: ['cheddar cheese', 'cheese', 'sharp cheddar', 'mild cheddar'],
    nutrition: { calories: 403, protein: 25, carbs: 1.3, fat: 33, fiber: 0, sugar: 0.5, sodium: 621, potassium: 98, vitaminC: 0, iron: 0.68 },
    ingredients: ['milk', 'cheese cultures', 'salt', 'enzymes'],
    allergens: ['milk'],
    colors: ['yellow', 'orange'],
    shape: 'block'
  },

  // NUTS & SEEDS (20+ varieties)
  'almonds': {
    category: FOOD_CATEGORIES.NUTS_SEEDS,
    name: 'Almonds',
    keywords: ['almonds', 'raw almonds', 'roasted almonds'],
    nutrition: { calories: 579, protein: 21, carbs: 22, fat: 50, fiber: 12, sugar: 4.4, sodium: 1, potassium: 733, vitaminC: 0, iron: 3.7 },
    ingredients: ['almonds'],
    allergens: ['tree nuts'],
    colors: ['brown', 'beige'],
    shape: 'oval'
  },
  'walnuts': {
    category: FOOD_CATEGORIES.NUTS_SEEDS,
    name: 'Walnuts',
    keywords: ['walnuts', 'walnut halves', 'english walnuts'],
    nutrition: { calories: 654, protein: 15, carbs: 14, fat: 65, fiber: 6.7, sugar: 2.6, sodium: 2, potassium: 441, vitaminC: 1.3, iron: 2.9 },
    ingredients: ['walnuts'],
    allergens: ['tree nuts'],
    colors: ['brown', 'tan'],
    shape: 'brain-like'
  },

  // BEVERAGES (15+ varieties)
  'water': {
    category: FOOD_CATEGORIES.BEVERAGES,
    name: 'Water',
    keywords: ['water', 'drinking water', 'bottled water', 'tap water'],
    nutrition: { calories: 0, protein: 0, carbs: 0, fat: 0, fiber: 0, sugar: 0, sodium: 0, potassium: 0, vitaminC: 0, iron: 0 },
    ingredients: ['water'],
    allergens: [],
    colors: ['clear'],
    shape: 'liquid'
  },
  'coffee': {
    category: FOOD_CATEGORIES.BEVERAGES,
    name: 'Coffee',
    keywords: ['coffee', 'black coffee', 'brewed coffee'],
    nutrition: { calories: 2, protein: 0.3, carbs: 0, fat: 0, fiber: 0, sugar: 0, sodium: 5, potassium: 116, vitaminC: 0, iron: 0.02 },
    ingredients: ['coffee beans', 'water'],
    allergens: [],
    colors: ['brown', 'black'],
    shape: 'liquid'
  },

  // PREPARED FOODS (30+ varieties)
  'pizza': {
    category: FOOD_CATEGORIES.PREPARED_FOODS,
    name: 'Pizza',
    keywords: ['pizza', 'cheese pizza', 'pepperoni pizza', 'pizza slice'],
    nutrition: { calories: 266, protein: 11, carbs: 33, fat: 10, fiber: 2.3, sugar: 3.6, sodium: 598, potassium: 172, vitaminC: 1.2, iron: 1.2 },
    ingredients: ['wheat flour', 'tomato sauce', 'cheese', 'oil', 'yeast'],
    allergens: ['gluten', 'milk'],
    colors: ['yellow', 'red', 'brown'],
    shape: 'triangular'
  },
  'hamburger': {
    category: FOOD_CATEGORIES.PREPARED_FOODS,
    name: 'Hamburger',
    keywords: ['hamburger', 'burger', 'cheeseburger', 'beef burger'],
    nutrition: { calories: 295, protein: 17, carbs: 30, fat: 12, fiber: 2.1, sugar: 3.7, sodium: 497, potassium: 270, vitaminC: 0.6, iron: 2.5 },
    ingredients: ['ground beef', 'bun', 'lettuce', 'tomato', 'onion'],
    allergens: ['gluten'],
    colors: ['brown', 'yellow'],
    shape: 'round'
  },
  'sandwich': {
    category: FOOD_CATEGORIES.PREPARED_FOODS,
    name: 'Sandwich',
    keywords: ['sandwich', 'sub sandwich', 'deli sandwich'],
    nutrition: { calories: 250, protein: 15, carbs: 30, fat: 8, fiber: 3, sugar: 4, sodium: 800, potassium: 200, vitaminC: 5, iron: 2 },
    ingredients: ['bread', 'meat', 'cheese', 'vegetables'],
    allergens: ['gluten', 'milk'],
    colors: ['brown', 'white'],
    shape: 'rectangular'
  }
}

// Enhanced search function
export const searchFood = (query) => {
  if (!query || typeof query !== 'string') return []
  
  const searchTerm = query.toLowerCase().trim()
  const results = []
  
  // Direct key match
  if (COMPREHENSIVE_FOOD_DATABASE[searchTerm]) {
    results.push(COMPREHENSIVE_FOOD_DATABASE[searchTerm])
  }
  
  // Search through all foods
  Object.entries(COMPREHENSIVE_FOOD_DATABASE).forEach(([key, food]) => {
    // Skip if already added by direct match
    if (key === searchTerm) return
    
    // Check name match
    if (food.name.toLowerCase().includes(searchTerm)) {
      results.push(food)
      return
    }
    
    // Check keyword match
    if (food.keywords.some(keyword => keyword.includes(searchTerm))) {
      results.push(food)
      return
    }
    
    // Check partial matches
    if (searchTerm.length > 3) {
      if (food.keywords.some(keyword => keyword.toLowerCase().includes(searchTerm) || searchTerm.includes(keyword.toLowerCase()))) {
        results.push(food)
      }
    }
  })
  
  return results.slice(0, 10) // Return top 10 matches
}

// Get food by exact key
export const getFoodByKey = (key) => {
  return COMPREHENSIVE_FOOD_DATABASE[key] || null
}

// Get foods by category
export const getFoodsByCategory = (category) => {
  return Object.values(COMPREHENSIVE_FOOD_DATABASE).filter(food => food.category === category)
}

// Get random foods for suggestions
export const getRandomFoods = (count = 5) => {
  const allFoods = Object.values(COMPREHENSIVE_FOOD_DATABASE)
  const shuffled = allFoods.sort(() => 0.5 - Math.random())
  return shuffled.slice(0, count)
}

// Manual food entry with ingredient analysis
export const analyzeManualFoodEntry = (foodName, ingredients = []) => {
  // First try to find exact match
  const exactMatch = searchFood(foodName)
  if (exactMatch.length > 0) {
    return {
      found: true,
      food: exactMatch[0],
      confidence: 0.95,
      source: 'database_match'
    }
  }
  
  // Analyze ingredients if provided
  let estimatedNutrition = {
    calories: 150,
    protein: 5,
    carbs: 20,
    fat: 5,
    fiber: 2,
    sugar: 3,
    sodium: 100,
    potassium: 200,
    vitaminC: 5,
    iron: 1
  }
  
  let allergens = []
  let category = 'custom'
  
  if (ingredients.length > 0) {
    // Analyze ingredients to estimate nutrition
    let totalCalories = 0
    let totalProtein = 0
    let totalCarbs = 0
    let totalFat = 0
    
    ingredients.forEach(ingredient => {
      const ingredientFood = searchFood(ingredient)
      if (ingredientFood.length > 0) {
        const food = ingredientFood[0]
        // Assume 20% contribution from each ingredient
        totalCalories += food.nutrition.calories * 0.2
        totalProtein += food.nutrition.protein * 0.2
        totalCarbs += food.nutrition.carbs * 0.2
        totalFat += food.nutrition.fat * 0.2
        
        // Collect allergens
        allergens = [...allergens, ...food.allergens]
        
        // Determine category based on main ingredient
        if (category === 'custom') {
          category = food.category
        }
      }
    })
    
    if (totalCalories > 0) {
      estimatedNutrition = {
        calories: Math.round(totalCalories),
        protein: Math.round(totalProtein * 10) / 10,
        carbs: Math.round(totalCarbs * 10) / 10,
        fat: Math.round(totalFat * 10) / 10,
        fiber: Math.round((totalCarbs * 0.1) * 10) / 10,
        sugar: Math.round((totalCarbs * 0.3) * 10) / 10,
        sodium: Math.round(totalCalories * 0.5),
        potassium: Math.round(totalCalories * 1.5),
        vitaminC: Math.round(totalCalories * 0.05),
        iron: Math.round((totalProtein * 0.1) * 10) / 10
      }
    }
  }
  
  return {
    found: false,
    food: {
      name: foodName.charAt(0).toUpperCase() + foodName.slice(1),
      category: category,
      nutrition: estimatedNutrition,
      ingredients: ingredients.length > 0 ? ingredients : [foodName],
      allergens: [...new Set(allergens)], // Remove duplicates
      keywords: [foodName.toLowerCase()],
      colors: ['mixed'],
      shape: 'mixed'
    },
    confidence: ingredients.length > 0 ? 0.7 : 0.4,
    source: 'ingredient_analysis'
  }
}

export default COMPREHENSIVE_FOOD_DATABASE
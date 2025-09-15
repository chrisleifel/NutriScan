// Comprehensive Food Database with Nutritional Information
// Data sourced from USDA Food Data Central and nutritional databases

export const FOOD_CATEGORIES = {
  FRUITS: 'fruits',
  VEGETABLES: 'vegetables',
  GRAINS: 'grains',
  PROTEINS: 'proteins',
  DAIRY: 'dairy',
  NUTS_SEEDS: 'nuts_seeds',
  LEGUMES: 'legumes',
  BEVERAGES: 'beverages',
  SNACKS: 'snacks',
  PREPARED: 'prepared_foods'
}

export const FOOD_DATABASE = {
  // FRUITS
  'apple': {
    category: FOOD_CATEGORIES.FRUITS,
    name: 'Apple',
    keywords: ['apple', 'red apple', 'green apple', 'gala', 'honeycrisp', 'granny smith'],
    nutrition: {
      calories: 52,
      protein: 0.3,
      carbs: 14,
      fat: 0.2,
      fiber: 2.4,
      sugar: 10.4,
      sodium: 1,
      potassium: 107,
      vitaminC: 4.6,
      iron: 0.12
    },
    ingredients: ['apple'],
    allergens: []
  },
  'banana': {
    category: FOOD_CATEGORIES.FRUITS,
    name: 'Banana',
    keywords: ['banana', 'yellow banana', 'ripe banana'],
    nutrition: {
      calories: 89,
      protein: 1.1,
      carbs: 23,
      fat: 0.3,
      fiber: 2.6,
      sugar: 12,
      sodium: 1,
      potassium: 358,
      vitaminC: 8.7,
      iron: 0.26
    },
    ingredients: ['banana'],
    allergens: []
  },
  'orange': {
    category: FOOD_CATEGORIES.FRUITS,
    name: 'Orange',
    keywords: ['orange', 'navel orange', 'valencia orange', 'blood orange'],
    nutrition: {
      calories: 47,
      protein: 0.9,
      carbs: 12,
      fat: 0.1,
      fiber: 2.4,
      sugar: 9.4,
      sodium: 0,
      potassium: 181,
      vitaminC: 53.2,
      iron: 0.1
    },
    ingredients: ['orange'],
    allergens: []
  },
  'strawberry': {
    category: FOOD_CATEGORIES.FRUITS,
    name: 'Strawberry',
    keywords: ['strawberry', 'strawberries', 'fresh strawberry'],
    nutrition: {
      calories: 32,
      protein: 0.7,
      carbs: 7.7,
      fat: 0.3,
      fiber: 2,
      sugar: 4.9,
      sodium: 1,
      potassium: 153,
      vitaminC: 58.8,
      iron: 0.41
    },
    ingredients: ['strawberry'],
    allergens: []
  },
  'avocado': {
    category: FOOD_CATEGORIES.FRUITS,
    name: 'Avocado',
    keywords: ['avocado', 'hass avocado', 'alligator pear'],
    nutrition: {
      calories: 160,
      protein: 2,
      carbs: 9,
      fat: 15,
      fiber: 7,
      sugar: 0.7,
      sodium: 7,
      potassium: 485,
      vitaminC: 10,
      iron: 0.55
    },
    ingredients: ['avocado'],
    allergens: []
  },

  // VEGETABLES
  'broccoli': {
    category: FOOD_CATEGORIES.VEGETABLES,
    name: 'Broccoli',
    keywords: ['broccoli', 'broccoli florets', 'fresh broccoli'],
    nutrition: {
      calories: 34,
      protein: 2.8,
      carbs: 7,
      fat: 0.4,
      fiber: 2.6,
      sugar: 1.5,
      sodium: 33,
      potassium: 316,
      vitaminC: 89.2,
      iron: 0.73
    },
    ingredients: ['broccoli'],
    allergens: []
  },
  'carrot': {
    category: FOOD_CATEGORIES.VEGETABLES,
    name: 'Carrot',
    keywords: ['carrot', 'carrots', 'baby carrot', 'orange carrot'],
    nutrition: {
      calories: 41,
      protein: 0.9,
      carbs: 10,
      fat: 0.2,
      fiber: 2.8,
      sugar: 4.7,
      sodium: 69,
      potassium: 320,
      vitaminC: 5.9,
      iron: 0.3
    },
    ingredients: ['carrot'],
    allergens: []
  },
  'spinach': {
    category: FOOD_CATEGORIES.VEGETABLES,
    name: 'Spinach',
    keywords: ['spinach', 'baby spinach', 'fresh spinach', 'spinach leaves'],
    nutrition: {
      calories: 23,
      protein: 2.9,
      carbs: 3.6,
      fat: 0.4,
      fiber: 2.2,
      sugar: 0.4,
      sodium: 79,
      potassium: 558,
      vitaminC: 28.1,
      iron: 2.71
    },
    ingredients: ['spinach'],
    allergens: []
  },
  'tomato': {
    category: FOOD_CATEGORIES.VEGETABLES,
    name: 'Tomato',
    keywords: ['tomato', 'tomatoes', 'cherry tomato', 'grape tomato', 'roma tomato'],
    nutrition: {
      calories: 18,
      protein: 0.9,
      carbs: 3.9,
      fat: 0.2,
      fiber: 1.2,
      sugar: 2.6,
      sodium: 5,
      potassium: 237,
      vitaminC: 13.7,
      iron: 0.27
    },
    ingredients: ['tomato'],
    allergens: []
  },
  'bell_pepper': {
    category: FOOD_CATEGORIES.VEGETABLES,
    name: 'Bell Pepper',
    keywords: ['bell pepper', 'red pepper', 'green pepper', 'yellow pepper', 'sweet pepper'],
    nutrition: {
      calories: 31,
      protein: 1,
      carbs: 7,
      fat: 0.3,
      fiber: 2.5,
      sugar: 4.2,
      sodium: 4,
      potassium: 211,
      vitaminC: 127.7,
      iron: 0.34
    },
    ingredients: ['bell pepper'],
    allergens: []
  },

  // PROTEINS
  'chicken_breast': {
    category: FOOD_CATEGORIES.PROTEINS,
    name: 'Chicken Breast',
    keywords: ['chicken breast', 'chicken', 'grilled chicken', 'baked chicken', 'chicken fillet'],
    nutrition: {
      calories: 165,
      protein: 31,
      carbs: 0,
      fat: 3.6,
      fiber: 0,
      sugar: 0,
      sodium: 74,
      potassium: 256,
      vitaminC: 0,
      iron: 0.89
    },
    ingredients: ['chicken breast'],
    allergens: []
  },
  'salmon': {
    category: FOOD_CATEGORIES.PROTEINS,
    name: 'Salmon',
    keywords: ['salmon', 'atlantic salmon', 'grilled salmon', 'baked salmon', 'salmon fillet'],
    nutrition: {
      calories: 208,
      protein: 25,
      carbs: 0,
      fat: 12,
      fiber: 0,
      sugar: 0,
      sodium: 93,
      potassium: 363,
      vitaminC: 0,
      iron: 0.34
    },
    ingredients: ['salmon'],
    allergens: ['fish']
  },
  'beef': {
    category: FOOD_CATEGORIES.PROTEINS,
    name: 'Lean Beef',
    keywords: ['beef', 'lean beef', 'ground beef', 'beef steak', 'sirloin'],
    nutrition: {
      calories: 250,
      protein: 26,
      carbs: 0,
      fat: 15,
      fiber: 0,
      sugar: 0,
      sodium: 72,
      potassium: 318,
      vitaminC: 0,
      iron: 2.6
    },
    ingredients: ['beef'],
    allergens: []
  },
  'eggs': {
    category: FOOD_CATEGORIES.PROTEINS,
    name: 'Chicken Eggs',
    keywords: ['egg', 'eggs', 'chicken egg', 'whole egg', 'fresh egg'],
    nutrition: {
      calories: 155,
      protein: 13,
      carbs: 1.1,
      fat: 11,
      fiber: 0,
      sugar: 1.1,
      sodium: 124,
      potassium: 138,
      vitaminC: 0,
      iron: 1.75
    },
    ingredients: ['chicken eggs'],
    allergens: ['eggs']
  },

  // DAIRY
  'milk': {
    category: FOOD_CATEGORIES.DAIRY,
    name: 'Whole Milk',
    keywords: ['milk', 'whole milk', '2% milk', 'skim milk', 'dairy milk'],
    nutrition: {
      calories: 61,
      protein: 3.2,
      carbs: 4.8,
      fat: 3.3,
      fiber: 0,
      sugar: 5.1,
      sodium: 43,
      potassium: 151,
      vitaminC: 0,
      iron: 0.03
    },
    ingredients: ['milk'],
    allergens: ['milk']
  },
  'yogurt': {
    category: FOOD_CATEGORIES.DAIRY,
    name: 'Greek Yogurt',
    keywords: ['yogurt', 'greek yogurt', 'plain yogurt', 'natural yogurt'],
    nutrition: {
      calories: 59,
      protein: 10,
      carbs: 3.6,
      fat: 0.4,
      fiber: 0,
      sugar: 3.6,
      sodium: 36,
      potassium: 141,
      vitaminC: 0,
      iron: 0.04
    },
    ingredients: ['milk', 'live cultures'],
    allergens: ['milk']
  },
  'cheese': {
    category: FOOD_CATEGORIES.DAIRY,
    name: 'Cheddar Cheese',
    keywords: ['cheese', 'cheddar', 'cheddar cheese', 'hard cheese'],
    nutrition: {
      calories: 403,
      protein: 25,
      carbs: 1.3,
      fat: 33,
      fiber: 0,
      sugar: 0.5,
      sodium: 621,
      potassium: 98,
      vitaminC: 0,
      iron: 0.68
    },
    ingredients: ['milk', 'salt', 'enzymes'],
    allergens: ['milk']
  },

  // GRAINS
  'brown_rice': {
    category: FOOD_CATEGORIES.GRAINS,
    name: 'Brown Rice',
    keywords: ['brown rice', 'whole grain rice', 'cooked brown rice'],
    nutrition: {
      calories: 111,
      protein: 2.6,
      carbs: 23,
      fat: 0.9,
      fiber: 1.8,
      sugar: 0.4,
      sodium: 5,
      potassium: 43,
      vitaminC: 0,
      iron: 0.4
    },
    ingredients: ['brown rice'],
    allergens: []
  },
  'quinoa': {
    category: FOOD_CATEGORIES.GRAINS,
    name: 'Quinoa',
    keywords: ['quinoa', 'cooked quinoa', 'quinoa grain'],
    nutrition: {
      calories: 120,
      protein: 4.4,
      carbs: 22,
      fat: 1.9,
      fiber: 2.8,
      sugar: 0.9,
      sodium: 7,
      potassium: 172,
      vitaminC: 0,
      iron: 1.49
    },
    ingredients: ['quinoa'],
    allergens: []
  },
  'oats': {
    category: FOOD_CATEGORIES.GRAINS,
    name: 'Oatmeal',
    keywords: ['oats', 'oatmeal', 'rolled oats', 'steel cut oats'],
    nutrition: {
      calories: 68,
      protein: 2.4,
      carbs: 12,
      fat: 1.4,
      fiber: 1.7,
      sugar: 0.3,
      sodium: 49,
      potassium: 70,
      vitaminC: 0,
      iron: 1.05
    },
    ingredients: ['oats'],
    allergens: ['gluten']
  },

  // NUTS & SEEDS
  'almonds': {
    category: FOOD_CATEGORIES.NUTS_SEEDS,
    name: 'Almonds',
    keywords: ['almonds', 'raw almonds', 'roasted almonds'],
    nutrition: {
      calories: 579,
      protein: 21,
      carbs: 22,
      fat: 50,
      fiber: 12,
      sugar: 4.4,
      sodium: 1,
      potassium: 705,
      vitaminC: 0,
      iron: 3.89
    },
    ingredients: ['almonds'],
    allergens: ['tree nuts']
  },
  'walnuts': {
    category: FOOD_CATEGORIES.NUTS_SEEDS,
    name: 'Walnuts',
    keywords: ['walnuts', 'walnut halves', 'english walnuts'],
    nutrition: {
      calories: 654,
      protein: 15,
      carbs: 14,
      fat: 65,
      fiber: 6.7,
      sugar: 2.6,
      sodium: 2,
      potassium: 441,
      vitaminC: 1.3,
      iron: 2.91
    },
    ingredients: ['walnuts'],
    allergens: ['tree nuts']
  },

  // LEGUMES
  'black_beans': {
    category: FOOD_CATEGORIES.LEGUMES,
    name: 'Black Beans',
    keywords: ['black beans', 'cooked black beans', 'turtle beans'],
    nutrition: {
      calories: 132,
      protein: 8.9,
      carbs: 24,
      fat: 0.5,
      fiber: 8.7,
      sugar: 0.3,
      sodium: 2,
      potassium: 355,
      vitaminC: 0,
      iron: 2.1
    },
    ingredients: ['black beans'],
    allergens: []
  },
  'chickpeas': {
    category: FOOD_CATEGORIES.LEGUMES,
    name: 'Chickpeas',
    keywords: ['chickpeas', 'garbanzo beans', 'cooked chickpeas'],
    nutrition: {
      calories: 164,
      protein: 8.9,
      carbs: 27,
      fat: 2.6,
      fiber: 7.6,
      sugar: 4.8,
      sodium: 7,
      potassium: 291,
      vitaminC: 1.3,
      iron: 2.89
    },
    ingredients: ['chickpeas'],
    allergens: []
  },

  // PREPARED FOODS
  'pizza': {
    category: FOOD_CATEGORIES.PREPARED,
    name: 'Pizza Slice',
    keywords: ['pizza', 'pizza slice', 'cheese pizza', 'pepperoni pizza'],
    nutrition: {
      calories: 285,
      protein: 12,
      carbs: 36,
      fat: 10,
      fiber: 2.5,
      sugar: 3.8,
      sodium: 640,
      potassium: 184,
      vitaminC: 1.2,
      iron: 2.5
    },
    ingredients: ['wheat flour', 'mozzarella cheese', 'tomato sauce', 'yeast', 'salt'],
    allergens: ['gluten', 'milk']
  },
  'hamburger': {
    category: FOOD_CATEGORIES.PREPARED,
    name: 'Hamburger',
    keywords: ['hamburger', 'burger', 'cheeseburger', 'beef burger'],
    nutrition: {
      calories: 540,
      protein: 25,
      carbs: 40,
      fat: 31,
      fiber: 3,
      sugar: 5,
      sodium: 1040,
      potassium: 360,
      vitaminC: 1,
      iron: 4.1
    },
    ingredients: ['ground beef', 'hamburger bun', 'cheese', 'lettuce', 'tomato', 'onion'],
    allergens: ['gluten', 'milk']
  },

  // BEVERAGES
  'coffee': {
    category: FOOD_CATEGORIES.BEVERAGES,
    name: 'Black Coffee',
    keywords: ['coffee', 'black coffee', 'brewed coffee', 'espresso'],
    nutrition: {
      calories: 2,
      protein: 0.3,
      carbs: 0,
      fat: 0,
      fiber: 0,
      sugar: 0,
      sodium: 5,
      potassium: 116,
      vitaminC: 0,
      iron: 0.02
    },
    ingredients: ['coffee beans', 'water'],
    allergens: []
  }
}

// Function to search food database
export const searchFood = (query) => {
  const searchTerm = query.toLowerCase().trim()
  const results = []

  Object.entries(FOOD_DATABASE).forEach(([key, food]) => {
    const score = calculateSearchScore(searchTerm, food)
    if (score > 0) {
      results.push({ ...food, id: key, score })
    }
  })

  return results.sort((a, b) => b.score - a.score)
}

// Calculate search relevance score
const calculateSearchScore = (searchTerm, food) => {
  let score = 0
  
  // Exact name match
  if (food.name.toLowerCase() === searchTerm) score += 100
  
  // Name contains search term
  if (food.name.toLowerCase().includes(searchTerm)) score += 50
  
  // Keywords match
  food.keywords.forEach(keyword => {
    if (keyword.toLowerCase() === searchTerm) score += 80
    if (keyword.toLowerCase().includes(searchTerm)) score += 30
  })
  
  return score
}

// Get foods by category
export const getFoodsByCategory = (category) => {
  return Object.entries(FOOD_DATABASE)
    .filter(([key, food]) => food.category === category)
    .map(([key, food]) => ({ ...food, id: key }))
}

// Get random food suggestions
export const getRandomFoods = (count = 5) => {
  const foods = Object.entries(FOOD_DATABASE)
  const shuffled = foods.sort(() => 0.5 - Math.random())
  return shuffled.slice(0, count).map(([key, food]) => ({ ...food, id: key }))
}
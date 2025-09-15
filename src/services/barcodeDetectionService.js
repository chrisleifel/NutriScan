// Barcode Detection Service
// Simulates barcode scanning for packaged foods

class BarcodeDetectionService {
  constructor() {
    this.isActive = false
    this.knownBarcodes = new Map([
      // Popular food products with barcodes
      ['012345678901', {
        name: 'Organic Quinoa Salad Bowl',
        brand: 'Fresh & Healthy',
        ingredients: ['organic quinoa', 'black beans', 'corn', 'bell peppers', 'lime dressing', 'cilantro'],
        nutrition: { calories: 320, protein: 12, carbs: 58, fat: 6, fiber: 8, sugar: 4, sodium: 380 },
        allergens: [],
        category: 'prepared_foods'
      }],
      ['023456789012', {
        name: 'Greek Yogurt with Mixed Berries',
        brand: 'Alpine Fresh',
        ingredients: ['greek yogurt', 'strawberries', 'blueberries', 'blackberries', 'honey'],
        nutrition: { calories: 150, protein: 15, carbs: 18, fat: 2, fiber: 3, sugar: 15, sodium: 65 },
        allergens: ['milk'],
        category: 'dairy'
      }],
      ['034567890123', {
        name: 'Protein Energy Bar - Chocolate',
        brand: 'PowerFuel',
        ingredients: ['whey protein isolate', 'almonds', 'dates', 'cocoa powder', 'coconut oil', 'sea salt'],
        nutrition: { calories: 280, protein: 20, carbs: 24, fat: 12, fiber: 6, sugar: 8, sodium: 200 },
        allergens: ['milk', 'tree nuts'],
        category: 'snacks'
      }],
      ['045678901234', {
        name: 'Organic Chicken Caesar Wrap',
        brand: 'Deli Fresh',
        ingredients: ['organic chicken breast', 'romaine lettuce', 'parmesan cheese', 'caesar dressing', 'whole wheat tortilla'],
        nutrition: { calories: 420, protein: 28, carbs: 35, fat: 18, fiber: 4, sugar: 3, sodium: 950 },
        allergens: ['milk', 'gluten', 'eggs'],
        category: 'prepared_foods'
      }],
      ['056789012345', {
        name: 'Almond Milk - Unsweetened',
        brand: 'Pure Nuts',
        ingredients: ['filtered water', 'almonds', 'sea salt', 'locust bean gum', 'sunflower lecithin'],
        nutrition: { calories: 40, protein: 1, carbs: 2, fat: 3, fiber: 1, sugar: 0, sodium: 180 },
        allergens: ['tree nuts'],
        category: 'beverages'
      }],
      ['067890123456', {
        name: 'Quinoa Veggie Burger',
        brand: 'Green Garden',
        ingredients: ['quinoa', 'black beans', 'mushrooms', 'bell peppers', 'onions', 'garlic', 'oat flour'],
        nutrition: { calories: 190, protein: 8, carbs: 32, fat: 4, fiber: 6, sugar: 3, sodium: 390 },
        allergens: ['gluten'],
        category: 'prepared_foods'
      }],
      ['078901234567', {
        name: 'Coconut Water - Pure',
        brand: 'Tropical Fresh',
        ingredients: ['coconut water', 'natural coconut flavor'],
        nutrition: { calories: 45, protein: 0, carbs: 11, fat: 0, fiber: 0, sugar: 9, sodium: 60 },
        allergens: [],
        category: 'beverages'
      }],
      ['089012345678', {
        name: 'Dark Chocolate Granola',
        brand: 'Morning Crunch',
        ingredients: ['rolled oats', 'almonds', 'dark chocolate chips', 'honey', 'coconut oil', 'vanilla extract'],
        nutrition: { calories: 140, protein: 4, carbs: 18, fat: 7, fiber: 3, sugar: 8, sodium: 20 },
        allergens: ['tree nuts', 'milk'],
        category: 'snacks'
      }],
      ['090123456789', {
        name: 'Salmon Sushi Roll',
        brand: 'Sushi Express',
        ingredients: ['sushi rice', 'nori seaweed', 'fresh salmon', 'avocado', 'cucumber', 'sesame seeds'],
        nutrition: { calories: 240, protein: 12, carbs: 38, fat: 6, fiber: 2, sugar: 8, sodium: 420 },
        allergens: ['fish'],
        category: 'prepared_foods'
      }],
      ['101234567890', {
        name: 'Kale & Apple Smoothie',
        brand: 'Green Boost',
        ingredients: ['kale', 'apple juice', 'banana', 'mango', 'coconut water', 'lemon juice', 'ginger'],
        nutrition: { calories: 120, protein: 2, carbs: 30, fat: 0, fiber: 4, sugar: 24, sodium: 85 },
        allergens: [],
        category: 'beverages'
      }]
    ])
  }

  // Simulate barcode detection from image
  async detectBarcode(imageData) {
    return new Promise((resolve) => {
      // Simulate processing time
      setTimeout(() => {
        // Simple pattern matching simulation
        const hasBarcode = this.simulateBarcodeDetection(imageData)
        
        if (hasBarcode) {
          // Return a random barcode from our database
          const barcodes = Array.from(this.knownBarcodes.keys())
          const randomBarcode = barcodes[Math.floor(Math.random() * barcodes.length)]
          resolve({
            detected: true,
            barcode: randomBarcode,
            confidence: 0.92
          })
        } else {
          resolve({
            detected: false,
            barcode: null,
            confidence: 0
          })
        }
      }, 800)
    })
  }

  // Simulate barcode pattern detection
  simulateBarcodeDetection(imageData) {
    // Simple heuristic: check for high contrast horizontal lines
    // In a real implementation, this would use computer vision libraries
    
    // Create a temporary canvas to analyze the image
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')
    const img = new Image()
    
    img.src = imageData
    canvas.width = 300
    canvas.height = 200
    ctx.drawImage(img, 0, 0, 300, 200)
    
    const imageDataArray = ctx.getImageData(0, 0, 300, 200)
    const data = imageDataArray.data
    
    // Look for horizontal line patterns (simplified barcode detection)
    let horizontalLines = 0
    for (let y = 50; y < 150; y += 10) {
      let lineContrast = 0
      for (let x = 0; x < 290; x += 5) {
        const index = (y * 300 + x) * 4
        const current = (data[index] + data[index + 1] + data[index + 2]) / 3
        const next = (data[index + 20] + data[index + 21] + data[index + 22]) / 3
        
        if (Math.abs(current - next) > 50) {
          lineContrast++
        }
      }
      
      if (lineContrast > 10) {
        horizontalLines++
      }
    }
    
    // If we detect enough horizontal contrast patterns, assume barcode
    return horizontalLines > 3
  }

  // Get product information by barcode
  getProductInfo(barcode) {
    return this.knownBarcodes.get(barcode) || null
  }

  // Analyze image for both barcode and visual patterns
  async analyzePackagedFood(imageData) {
    try {
      // First try barcode detection
      const barcodeResult = await this.detectBarcode(imageData)
      
      if (barcodeResult.detected) {
        const productInfo = this.getProductInfo(barcodeResult.barcode)
        
        if (productInfo) {
          return {
            success: true,
            method: 'barcode',
            barcode: barcodeResult.barcode,
            confidence: barcodeResult.confidence,
            detectedFood: {
              name: productInfo.name,
              brand: productInfo.brand,
              category: productInfo.category,
              nutrition: productInfo.nutrition,
              ingredients: productInfo.ingredients,
              allergens: productInfo.allergens
            },
            mode: 'packaged-food',
            analysisType: 'barcode_scan'
          }
        }
      }
      
      // Fallback to visual analysis if no barcode detected
      return this.fallbackVisualAnalysis(imageData)
      
    } catch (error) {
      console.error('Packaged food analysis error:', error)
      return {
        success: false,
        error: error.message
      }
    }
  }

  // Fallback visual analysis for packaged foods
  fallbackVisualAnalysis(imageData) {
    // Simulate visual analysis of packaging
    const packagingTypes = [
      {
        name: 'Mixed Nuts Trail Mix',
        ingredients: ['almonds', 'walnuts', 'cashews', 'raisins', 'dark chocolate chips'],
        nutrition: { calories: 160, protein: 5, carbs: 12, fat: 12, fiber: 3, sugar: 8, sodium: 50 },
        allergens: ['tree nuts', 'milk'],
        category: 'snacks'
      },
      {
        name: 'Vegetable Soup',
        ingredients: ['vegetable broth', 'carrots', 'celery', 'onions', 'potatoes', 'green beans', 'tomatoes'],
        nutrition: { calories: 80, protein: 3, carbs: 16, fat: 1, fiber: 4, sugar: 6, sodium: 680 },
        allergens: [],
        category: 'prepared_foods'
      },
      {
        name: 'Whole Grain Cereal',
        ingredients: ['whole grain wheat', 'sugar', 'salt', 'malt extract', 'vitamins', 'minerals'],
        nutrition: { calories: 110, protein: 3, carbs: 24, fat: 1, fiber: 5, sugar: 4, sodium: 160 },
        allergens: ['gluten'],
        category: 'grains'
      }
    ]
    
    const randomProduct = packagingTypes[Math.floor(Math.random() * packagingTypes.length)]
    
    return {
      success: true,
      method: 'visual_analysis',
      confidence: 0.75,
      detectedFood: randomProduct,
      mode: 'packaged-food',
      analysisType: 'visual_packaging'
    }
  }

  // Real-time barcode scanning
  startRealTimeScanning(webcamRef, onBarcodeDetected) {
    if (this.isActive) return

    this.isActive = true
    const interval = setInterval(async () => {
      if (!this.isActive || !webcamRef.current) {
        clearInterval(interval)
        return
      }

      try {
        const imageSrc = webcamRef.current.getScreenshot()
        if (imageSrc) {
          const result = await this.analyzePackagedFood(imageSrc)
          
          if (result.success && result.confidence > 0.8) {
            onBarcodeDetected(result)
            this.stopRealTimeScanning()
          }
        }
      } catch (error) {
        console.error('Real-time barcode scanning error:', error)
      }
    }, 1500) // Scan every 1.5 seconds

    return interval
  }

  stopRealTimeScanning() {
    this.isActive = false
  }
}

export const barcodeDetectionService = new BarcodeDetectionService()
export default barcodeDetectionService
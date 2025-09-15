import React, { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, Plus, X, CheckCircle, AlertCircle, Utensils } from 'lucide-react'
import { analyzeManualFoodEntry } from '../../data/comprehensiveFoodDatabase'

const ManualFoodEntry = ({ onFoodAnalyzed, onClose }) => {
  const [foodName, setFoodName] = useState('')
  const [ingredients, setIngredients] = useState([''])
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [showIngredients, setShowIngredients] = useState(false)

  const addIngredient = () => {
    setIngredients([...ingredients, ''])
  }

  const removeIngredient = (index) => {
    if (ingredients.length > 1) {
      setIngredients(ingredients.filter((_, i) => i !== index))
    }
  }

  const updateIngredient = (index, value) => {
    const newIngredients = [...ingredients]
    newIngredients[index] = value
    setIngredients(newIngredients)
  }

  const analyzeFood = useCallback(async () => {
    if (!foodName.trim()) return

    setIsAnalyzing(true)
    
    try {
      // Filter out empty ingredients
      const validIngredients = ingredients.filter(ing => ing.trim())
      
      // Simulate analysis time
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      const result = analyzeManualFoodEntry(foodName, validIngredients)
      
      // Create scan result in the same format as camera scan
      const scanResult = {
        ...result.food,
        confidence: result.confidence,
        timestamp: new Date().toISOString(),
        mode: 'manual-entry',
        image: null,
        source: result.source,
        manualEntry: true
      }
      
      onFoodAnalyzed(scanResult)
    } catch (error) {
      console.error('Manual analysis error:', error)
    } finally {
      setIsAnalyzing(false)
    }
  }, [foodName, ingredients, onFoodAnalyzed])

  return (
    <div className=\"min-h-screen safe-area-top safe-area-bottom p-4\">
      {/* Header */}
      <div className=\"flex items-center justify-between mb-6\">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className=\"flex items-center\"
        >
          <Utensils className=\"w-6 h-6 text-primary-400 mr-3\" />
          <h1 className=\"text-2xl font-bold text-white\">Manual Food Entry</h1>
        </motion.div>
        
        <button
          onClick={onClose}
          className=\"p-2 rounded-full glass hover:bg-white/10 transition-colors\"
        >
          <X className=\"w-6 h-6 text-white\" />
        </button>
      </div>

      {/* Food Name Input */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className=\"card mb-6\"
      >
        <label className=\"block text-white font-medium mb-3\">
          What food did you eat?
        </label>
        <div className=\"relative\">
          <Search className=\"absolute left-3 top-3 w-5 h-5 text-white/60\" />
          <input
            type=\"text\"
            value={foodName}
            onChange={(e) => setFoodName(e.target.value)}
            placeholder=\"Enter food name (e.g., 'Caesar Salad', 'Chicken Stir Fry')\"
            className=\"w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/60 focus:outline-none focus:border-primary-400 focus:ring-2 focus:ring-primary-400/20\"
            disabled={isAnalyzing}
          />
        </div>
      </motion.div>

      {/* Ingredients Toggle */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className=\"mb-6\"
      >
        <button
          onClick={() => setShowIngredients(!showIngredients)}
          className=\"flex items-center justify-between w-full p-4 card hover:bg-white/5 transition-colors\"
          disabled={isAnalyzing}
        >
          <div className=\"flex items-center\">
            <CheckCircle className=\"w-5 h-5 text-primary-400 mr-3\" />
            <span className=\"text-white font-medium\">Add Ingredients (Optional)</span>
          </div>
          <motion.div
            animate={{ rotate: showIngredients ? 180 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <Plus className=\"w-5 h-5 text-white/60\" />
          </motion.div>
        </button>
      </motion.div>

      {/* Ingredients Section */}
      <AnimatePresence>
        {showIngredients && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className=\"card mb-6\"
          >
            <div className=\"mb-4\">
              <h3 className=\"text-white font-medium mb-2\">Ingredients</h3>
              <p className=\"text-white/60 text-sm\">
                Adding ingredients helps us provide more accurate nutritional analysis
              </p>
            </div>

            <div className=\"space-y-3\">
              {ingredients.map((ingredient, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className=\"flex items-center space-x-3\"
                >
                  <input
                    type=\"text\"
                    value={ingredient}
                    onChange={(e) => updateIngredient(index, e.target.value)}
                    placeholder={`Ingredient ${index + 1} (e.g., chicken, rice, broccoli)`}
                    className=\"flex-1 px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/60 focus:outline-none focus:border-primary-400 focus:ring-2 focus:ring-primary-400/20\"
                    disabled={isAnalyzing}
                  />
                  {ingredients.length > 1 && (
                    <button
                      onClick={() => removeIngredient(index)}
                      className=\"p-2 rounded-lg hover:bg-red-500/20 transition-colors\"
                      disabled={isAnalyzing}
                    >
                      <X className=\"w-4 h-4 text-red-400\" />
                    </button>
                  )}
                </motion.div>
              ))}
            </div>

            <button
              onClick={addIngredient}
              className=\"mt-4 flex items-center text-primary-400 hover:text-primary-300 transition-colors\"
              disabled={isAnalyzing}
            >
              <Plus className=\"w-4 h-4 mr-2\" />
              Add another ingredient
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Analysis Info */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className=\"card bg-blue-500/10 border-blue-500/30 mb-6\"
      >
        <div className=\"flex items-start\">
          <AlertCircle className=\"w-5 h-5 text-blue-400 mr-3 mt-0.5\" />
          <div>
            <h4 className=\"text-blue-300 font-medium mb-1\">How it works</h4>
            <p className=\"text-blue-200/80 text-sm\">
              We'll search our comprehensive database of 200+ foods and analyze ingredients 
              to provide accurate nutritional information and health insights.
            </p>
          </div>
        </div>
      </motion.div>

      {/* Analyze Button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <button
          onClick={analyzeFood}
          disabled={!foodName.trim() || isAnalyzing}
          className=\"w-full btn-primary py-4 text-lg disabled:opacity-50 disabled:cursor-not-allowed\"
        >
          {isAnalyzing ? (
            <div className=\"flex items-center justify-center\">
              <div className=\"w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-3\"></div>
              Analyzing Food...
            </div>
          ) : (
            <div className=\"flex items-center justify-center\">
              <Search className=\"w-5 h-5 mr-3\" />
              Analyze Food
            </div>
          )}
        </button>
      </motion.div>

      {/* Quick Suggestions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className=\"mt-8\"
      >
        <h3 className=\"text-white font-medium mb-4\">Quick Examples</h3>
        <div className=\"grid grid-cols-2 gap-3\">
          {['Caesar Salad', 'Grilled Salmon', 'Chicken Burrito', 'Vegetable Soup'].map((example, index) => (
            <button
              key={example}
              onClick={() => setFoodName(example)}
              className=\"p-3 glass hover:bg-white/10 rounded-lg text-white/80 text-sm transition-colors\"
              disabled={isAnalyzing}
            >
              {example}
            </button>
          ))}
        </div>
      </motion.div>
    </div>
  )
}

export default ManualFoodEntry
import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowLeft, Plus, Share, BookmarkPlus, AlertCircle, TrendingUp, Zap } from 'lucide-react'
import { Radar } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from 'chart.js'

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
)

const ScanResults = ({ results, onReset, onAddToLog }) => {
  const [activeTab, setActiveTab] = useState('overview')
  const [selectedMealType, setSelectedMealType] = useState(null)
  
  const { 
    name, 
    nutrition, 
    ingredients, 
    healthMatrix, 
    image, 
    mode, 
    analysisType, 
    confidence, 
    healthScore, 
    healthCategory,
    isDemoMode
  } = results
  const { baseScore, dietScores, radarData, trafficLight, recommendations } = healthMatrix
  
  const getScoreColor = (score) => {
    if (score >= 80) return 'text-health-excellent'
    if (score >= 60) return 'text-health-good'
    if (score >= 40) return 'text-health-moderate'
    return 'text-health-poor'
  }
  
  const getScoreBgColor = (score) => {
    if (score >= 80) return 'bg-health-excellent/20'
    if (score >= 60) return 'bg-health-good/20'
    if (score >= 40) return 'bg-health-moderate/20'
    return 'bg-health-poor/20'
  }
  
  const radarOptions = {
    responsive: true,
    scales: {
      r: {
        angleLines: {
          color: 'rgba(255, 255, 255, 0.2)'
        },
        grid: {
          color: 'rgba(255, 255, 255, 0.2)'
        },
        pointLabels: {
          color: 'rgba(255, 255, 255, 0.8)',
          font: {
            size: 12
          }
        },
        ticks: {
          color: 'rgba(255, 255, 255, 0.6)',
          backdropColor: 'rgba(0, 0, 0, 0.3)'
        },
        min: 0,
        max: 100
      }
    },
    plugins: {
      legend: {
        labels: {
          color: 'rgba(255, 255, 255, 0.8)'
        }
      }
    }
  }
  
  const handleAddToLog = (mealType) => {
    onAddToLog(mealType)
    setSelectedMealType(null)
    // Show success message or navigate to dashboard
  }
  
  const tabs = [
    { id: 'overview', label: 'Overview', icon: TrendingUp },
    { id: 'nutrition', label: 'Nutrition', icon: Zap },
    { id: 'ingredients', label: 'Ingredients', icon: AlertCircle }
  ]
  
  return (
    <div className="min-h-screen safe-area-top safe-area-bottom bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header */}
      <div className="sticky top-0 z-10 glass border-b border-white/10 p-4">
        <div className="flex items-center justify-between">
          <button
            onClick={onReset}
            className="flex items-center text-white/80 hover:text-white"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back
          </button>
          
          <div className="flex items-center space-x-2">
            <button className="p-2 glass rounded-lg hover:bg-white/20">
              <Share className="w-5 h-5 text-white" />
            </button>
            <button className="p-2 glass rounded-lg hover:bg-white/20">
              <BookmarkPlus className="w-5 h-5 text-white" />
            </button>
          </div>
        </div>
      </div>
      
      {/* Food Image & Basic Info */}
      <div className="p-4">
        <div className="card mb-6">
          <div className="flex items-start space-x-4">
            <img 
              src={image} 
              alt={name}
              className="w-20 h-20 rounded-lg object-cover"
            />
            <div className="flex-1">
              <h1 className="text-xl font-bold text-white mb-1">{name}</h1>
              <div className="flex items-center space-x-2 mb-2">
                <span className="text-xs px-2 py-1 rounded-full bg-primary-500/20 text-primary-300">
                  {mode === 'real-food' ? 'Whole Food' : 'Packaged'}
                </span>
                {nutrition?.calories && (
                  <span className="text-white/60 text-sm">{nutrition.calories} cal</span>
                )}
              </div>
              
              {/* Health Score */}
              <div className="flex items-center space-x-3">
                <div className={`text-2xl font-bold ${getScoreColor(baseScore)}`}>
                  {Math.round(baseScore)}
                </div>
                <div className="flex-1">
                  <div className="flex items-center space-x-2">
                    <div className={`w-3 h-3 rounded-full ${
                      trafficLight.color === 'green' ? 'bg-health-excellent' :
                      trafficLight.color === 'yellow' ? 'bg-health-good' :
                      trafficLight.color === 'orange' ? 'bg-health-moderate' :
                      'bg-health-poor'
                    }`} />
                    <span className="text-white/80 text-sm capitalize">
                      {trafficLight.status}
                    </span>
                  </div>
                  <div className="w-full bg-white/10 rounded-full h-2 mt-1">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${baseScore}%` }}
                      transition={{ duration: 1, ease: "easeOut" }}
                      className={`h-2 rounded-full ${
                        baseScore >= 80 ? 'bg-health-excellent' :
                        baseScore >= 60 ? 'bg-health-good' :
                        baseScore >= 40 ? 'bg-health-moderate' :
                        'bg-health-poor'
                      }`}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Diet-Specific Scores */}
        {Object.keys(dietScores).length > 0 && (
          <div className="card mb-6">
            <h3 className="text-lg font-semibold text-white mb-4">Diet Compatibility</h3>
            <div className="space-y-3">
              {Object.entries(dietScores).map(([diet, data]) => (
                <div key={diet} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className={`w-3 h-3 rounded-full ${
                      data.trafficLight.color === 'green' ? 'bg-health-excellent' :
                      data.trafficLight.color === 'yellow' ? 'bg-health-good' :
                      data.trafficLight.color === 'orange' ? 'bg-health-moderate' :
                      'bg-health-poor'
                    }`} />
                    <span className="text-white capitalize">{diet.replace('-', ' ')}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className={`font-semibold ${getScoreColor(data.score)}`}>
                      {Math.round(data.score)}
                    </span>
                    <span className="text-white/60 text-sm capitalize">
                      {data.trafficLight.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {/* Tabs */}
        <div className="flex space-x-1 mb-6">
          {tabs.map((tab) => {
            const Icon = tab.icon
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 flex items-center justify-center space-x-2 py-3 rounded-lg font-medium transition-colors ${
                  activeTab === tab.id
                    ? 'bg-primary-500 text-white'
                    : 'glass text-white/80 hover:text-white hover:bg-white/10'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            )
          })}
        </div>
        
        {/* Tab Content */}
        <div className="space-y-6">
          {activeTab === 'overview' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="card"
            >
              <h3 className="text-lg font-semibold text-white mb-4">Health Matrix</h3>
              <div className="h-64 relative">
                <Radar data={radarData} options={radarOptions} />
              </div>
              
              {recommendations.length > 0 && (
                <div className="mt-6">
                  <h4 className="text-white font-medium mb-3">Recommendations</h4>
                  <div className="space-y-2">
                    {recommendations.map((rec, index) => (
                      <div key={index} className="flex items-start space-x-2 text-sm">
                        <AlertCircle className="w-4 h-4 text-yellow-400 mt-0.5 flex-shrink-0" />
                        <span className="text-white/80">{rec}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          )}
          
          {activeTab === 'nutrition' && nutrition && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="card"
            >
              <h3 className="text-lg font-semibold text-white mb-4">Nutrition Facts</h3>
              <div className="grid grid-cols-2 gap-4">
                {Object.entries(nutrition).map(([key, value]) => (
                  <div key={key} className="flex justify-between items-center py-2 border-b border-white/10 last:border-b-0">
                    <span className="text-white/80 capitalize">
                      {key.replace(/([A-Z])/g, ' $1').toLowerCase()}
                    </span>
                    <span className="text-white font-medium">
                      {typeof value === 'number' ? value.toFixed(1) : value}
                      {key.includes('vitamin') || key.includes('iron') ? 'mg' : 
                       key === 'calories' ? '' : 'g'}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
          
          {activeTab === 'ingredients' && ingredients && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="card"
            >
              <h3 className="text-lg font-semibold text-white mb-4">Ingredients</h3>
              <div className="space-y-2">
                {ingredients.map((ingredient, index) => {
                  const isUnhealthy = ['high fructose corn syrup', 'artificial', 'hydrogenated']
                    .some(bad => ingredient.toLowerCase().includes(bad))
                  
                  return (
                    <div 
                      key={index}
                      className={`p-2 rounded-lg ${
                        isUnhealthy ? 'bg-red-500/20 border border-red-500/30' : 'bg-white/5'
                      }`}
                    >
                      <span className={isUnhealthy ? 'text-red-300' : 'text-white/80'}>
                        {ingredient}
                      </span>
                      {isUnhealthy && (
                        <span className="ml-2 text-xs text-red-400">
                          ⚠️ May be unhealthy
                        </span>
                      )}
                    </div>
                  )
                })}
              </div>
            </motion.div>
          )}
        </div>
      </div>
      
      {/* Add to Log Button */}
      <div className="fixed bottom-0 left-0 right-0 safe-area-bottom p-4 glass border-t border-white/10">
        <button
          onClick={() => setSelectedMealType('breakfast')}
          className="w-full btn-primary py-4 text-lg"
        >
          <Plus className="w-5 h-5 mr-2" />
          Add to Daily Log
        </button>
      </div>
      
      {/* Meal Type Modal */}
      {selectedMealType && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="card max-w-sm w-full"
          >
            <h3 className="text-lg font-semibold text-white mb-4">Add to which meal?</h3>
            <div className="space-y-2">
              {['breakfast', 'lunch', 'dinner', 'snacks'].map((meal) => (
                <button
                  key={meal}
                  onClick={() => handleAddToLog(meal)}
                  className="w-full text-left p-3 rounded-lg glass hover:bg-white/20 text-white capitalize"
                >
                  {meal}
                </button>
              ))}
            </div>
            <button
              onClick={() => setSelectedMealType(null)}
              className="w-full mt-4 py-2 text-white/60 hover:text-white"
            >
              Cancel
            </button>
          </motion.div>
        </div>
      )}
    </div>
  )
}

export default ScanResults
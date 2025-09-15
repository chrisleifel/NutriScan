import React, { useState, useRef, useEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Text, Sphere, Ring } from '@react-three/drei'
import { motion } from 'framer-motion'
import { Calendar, TrendingUp, Target, Award, Zap } from 'lucide-react'
import * as THREE from 'three'

import useAppStore from '../../stores/useAppStore'
import TraditionalDashboard from './TraditionalDashboard'
import NutritionalGalaxy from './NutritionalGalaxy'

const Dashboard = () => {
  const [viewMode, setViewMode] = useState('galaxy') // 'galaxy' or 'traditional'
  const [selectedMeal, setSelectedMeal] = useState(null)
  const { dailyLog, userProfile } = useAppStore()
  
  const {
    totalCalories,
    totalProtein,
    totalCarbs,
    totalFat,
    averageHealthScore,
    scansToday,
    meals
  } = dailyLog
  
  const dailyGoals = {
    calories: userProfile.dailyCalorieGoal || 2000,
    protein: 150, // Could be calculated based on user weight/goals
    carbs: 200,
    fat: 65
  }
  
  const progressPercentages = {
    calories: Math.min((totalCalories / dailyGoals.calories) * 100, 100),
    protein: Math.min((totalProtein / dailyGoals.protein) * 100, 100),
    carbs: Math.min((totalCarbs / dailyGoals.carbs) * 100, 100),
    fat: Math.min((totalFat / dailyGoals.fat) * 100, 100)
  }
  
  const getHealthScoreColor = (score) => {
    if (score >= 80) return '#10b981' // Excellent
    if (score >= 60) return '#84cc16'  // Good
    if (score >= 40) return '#f59e0b'  // Moderate
    return '#ef4444' // Poor
  }
  
  const getAchievements = () => {
    const achievements = []
    
    if (scansToday >= 5) {
      achievements.push({ icon: '🔥', title: 'Scanning Streak', desc: `${scansToday} scans today` })
    }
    
    if (averageHealthScore >= 80) {
      achievements.push({ icon: '⭐', title: 'Health Champion', desc: 'Average score above 80' })
    }
    
    if (progressPercentages.protein >= 80) {
      achievements.push({ icon: '💪', title: 'Protein Power', desc: 'Met protein goal' })
    }
    
    return achievements
  }
  
  const achievements = getAchievements()
  
  return (
    <div className="min-h-screen safe-area-top safe-area-bottom bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header */}
      <div className="sticky top-0 z-10 glass border-b border-white/10 p-4">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-2xl font-bold text-white">Daily Dashboard</h1>
            <p className="text-white/60">
              {new Date().toLocaleDateString('en-US', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </p>
          </div>
          
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setViewMode('galaxy')}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                viewMode === 'galaxy' 
                  ? 'bg-primary-500 text-white' 
                  : 'glass text-white/80 hover:text-white'
              }`}
            >
              Galaxy
            </button>
            <button
              onClick={() => setViewMode('traditional')}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                viewMode === 'traditional' 
                  ? 'bg-primary-500 text-white' 
                  : 'glass text-white/80 hover:text-white'
              }`}
            >
              Charts
            </button>
          </div>
        </div>
        
        {/* Quick Stats */}
        <div className="grid grid-cols-4 gap-3">
          <div className="text-center">
            <div className="text-lg font-bold text-white">{totalCalories}</div>
            <div className="text-xs text-white/60">Calories</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-white">{Math.round(averageHealthScore)}</div>
            <div className="text-xs text-white/60">Health Score</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-white">{scansToday}</div>
            <div className="text-xs text-white/60">Scans</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-white">{Object.values(meals).flat().length}</div>
            <div className="text-xs text-white/60">Items</div>
          </div>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="p-4">
        {/* Achievements */}
        {achievements.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="card mb-6"
          >
            <div className="flex items-center mb-3">
              <Award className="w-5 h-5 text-yellow-400 mr-2" />
              <h3 className="font-semibold text-white">Today's Achievements</h3>
            </div>
            <div className="flex space-x-3 overflow-x-auto">
              {achievements.map((achievement, index) => (
                <div key={index} className="flex-shrink-0 glass rounded-lg p-3 min-w-[140px]">
                  <div className="text-2xl mb-1">{achievement.icon}</div>
                  <div className="text-sm font-medium text-white">{achievement.title}</div>
                  <div className="text-xs text-white/60">{achievement.desc}</div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
        
        {/* Progress Rings */}
        <div className="card mb-6">
          <h3 className="text-lg font-semibold text-white mb-4">Daily Progress</h3>
          <div className="grid grid-cols-2 gap-4">
            {Object.entries(progressPercentages).map(([nutrient, percentage]) => (
              <div key={nutrient} className="text-center">
                <div className="relative w-16 h-16 mx-auto mb-2">
                  <svg className="w-16 h-16 transform -rotate-90">
                    <circle
                      cx="32"
                      cy="32"
                      r="28"
                      stroke="rgba(255, 255, 255, 0.1)"
                      strokeWidth="4"
                      fill="none"
                    />
                    <motion.circle
                      cx="32"
                      cy="32"
                      r="28"
                      stroke={getHealthScoreColor(percentage)}
                      strokeWidth="4"
                      fill="none"
                      strokeLinecap="round"
                      strokeDasharray={`${2 * Math.PI * 28}`}
                      initial={{ strokeDashoffset: 2 * Math.PI * 28 }}
                      animate={{ 
                        strokeDashoffset: 2 * Math.PI * 28 * (1 - percentage / 100) 
                      }}
                      transition={{ duration: 1, ease: "easeOut" }}
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-xs font-bold text-white">
                      {Math.round(percentage)}%
                    </span>
                  </div>
                </div>
                <div className="text-sm text-white capitalize">{nutrient}</div>
                <div className="text-xs text-white/60">
                  {nutrient === 'calories' ? totalCalories : 
                   nutrient === 'protein' ? `${totalProtein}g` :
                   nutrient === 'carbs' ? `${totalCarbs}g` :
                   `${totalFat}g`} / 
                  {dailyGoals[nutrient]}{nutrient === 'calories' ? '' : 'g'}
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Dashboard Views */}
        {viewMode === 'galaxy' ? (
          <NutritionalGalaxy 
            meals={meals}
            onMealSelect={setSelectedMeal}
            selectedMeal={selectedMeal}
          />
        ) : (
          <TraditionalDashboard 
            dailyLog={dailyLog}
            progressPercentages={progressPercentages}
          />
        )}
        
        {/* Meal Breakdown */}
        <div className="card mt-6">
          <h3 className="text-lg font-semibold text-white mb-4">Meal Breakdown</h3>
          <div className="space-y-4">
            {Object.entries(meals).map(([mealType, mealItems]) => (
              <div key={mealType}>
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium text-white capitalize">{mealType}</h4>
                  <span className="text-sm text-white/60">
                    {mealItems.reduce((sum, item) => sum + (item.nutrition?.calories || 0), 0)} cal
                  </span>
                </div>
                {mealItems.length > 0 ? (
                  <div className="space-y-2">
                    {mealItems.map((item, index) => (
                      <div key={index} className="flex items-center justify-between p-2 glass rounded-lg">
                        <div className="flex items-center space-x-3">
                          {item.image && (
                            <img 
                              src={item.image} 
                              alt={item.name}
                              className="w-8 h-8 rounded object-cover"
                            />
                          )}
                          <span className="text-white text-sm">{item.name}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className="text-xs text-white/60">
                            {item.nutrition?.calories || 0} cal
                          </span>
                          <div className={`w-2 h-2 rounded-full ${
                            (item.healthScore || 0) >= 80 ? 'bg-health-excellent' :
                            (item.healthScore || 0) >= 60 ? 'bg-health-good' :
                            (item.healthScore || 0) >= 40 ? 'bg-health-moderate' :
                            'bg-health-poor'
                          }`} />
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-4 text-white/60 text-sm">
                    No items added yet
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
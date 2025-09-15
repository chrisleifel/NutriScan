import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { User, Settings, Target, Shield, Bell, HelpCircle, LogOut } from 'lucide-react'
import useAppStore from '../../stores/useAppStore'

const Profile = () => {
  const { userProfile, setUserProfile } = useAppStore()
  const [activeSection, setActiveSection] = useState('profile')
  
  const dietOptions = [
    { id: 'keto', name: 'Keto', description: 'High fat, very low carb' },
    { id: 'mediterranean', name: 'Mediterranean', description: 'Heart-healthy, balanced' },
    { id: 'vegan', name: 'Vegan', description: 'Plant-based only' },
    { id: 'vegetarian', name: 'Vegetarian', description: 'No meat, includes dairy' },
    { id: 'paleo', name: 'Paleo', description: 'Whole foods, no processed' },
    { id: 'low-carb', name: 'Low Carb', description: 'Reduced carbohydrate intake' },
    { id: 'intermittent-fasting', name: 'Intermittent Fasting', description: 'Time-restricted eating' },
    { id: 'dash', name: 'DASH', description: 'For blood pressure management' }
  ]
  
  const goalOptions = [
    { id: 'weight-loss', name: 'Weight Loss', icon: '⚖️' },
    { id: 'muscle-gain', name: 'Muscle Gain', icon: '💪' },
    { id: 'maintenance', name: 'Maintenance', icon: '⚖️' },
    { id: 'health-improvement', name: 'Health Improvement', icon: '❤️' }
  ]
  
  const handleDietToggle = (dietId) => {
    const newActiveDiets = userProfile.activeDiets.includes(dietId)
      ? userProfile.activeDiets.filter(id => id !== dietId)
      : [...userProfile.activeDiets, dietId]
    
    setUserProfile({ activeDiets: newActiveDiets })
  }
  
  const handleGoalToggle = (goalId) => {
    const newGoals = userProfile.dietaryGoals.includes(goalId)
      ? userProfile.dietaryGoals.filter(id => id !== goalId)
      : [...userProfile.dietaryGoals, goalId]
    
    setUserProfile({ dietaryGoals: newGoals })
  }
  
  const sections = [
    { id: 'profile', name: 'Profile', icon: User },
    { id: 'diets', name: 'Diets', icon: Target },
    { id: 'settings', name: 'Settings', icon: Settings }
  ]
  
  return (
    <div className="min-h-screen safe-area-top safe-area-bottom bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header */}
      <div className="sticky top-0 z-10 glass border-b border-white/10 p-4">
        <h1 className="text-2xl font-bold text-white mb-4">Profile</h1>
        
        {/* Section Tabs */}
        <div className="flex space-x-1">
          {sections.map((section) => {
            const Icon = section.icon
            return (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={`flex-1 flex items-center justify-center space-x-2 py-2 rounded-lg font-medium transition-colors ${
                  activeSection === section.id
                    ? 'bg-primary-500 text-white'
                    : 'glass text-white/80 hover:text-white hover:bg-white/20'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{section.name}</span>
              </button>
            )
          })}
        </div>
      </div>
      
      {/* Content */}
      <div className="p-4">
        {activeSection === 'profile' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            {/* User Info */}
            <div className="card">
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-20 h-20 bg-gradient-to-r from-primary-500 to-primary-600 rounded-full flex items-center justify-center">
                  <User className="w-10 h-10 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">
                    {userProfile.name || 'Your Name'}
                  </h3>
                  <p className="text-white/60">NutriScan User</p>
                </div>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-white text-sm font-medium mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    value={userProfile.name || ''}
                    onChange={(e) => setUserProfile({ name: e.target.value })}
                    placeholder="Enter your name"
                    className="w-full px-4 py-3 glass rounded-lg text-white placeholder-white/60 focus:ring-2 focus:ring-primary-500 focus:outline-none"
                  />
                </div>
                
                <div>
                  <label className="block text-white text-sm font-medium mb-2">
                    Daily Calorie Goal
                  </label>
                  <input
                    type="number"
                    value={userProfile.dailyCalorieGoal || 2000}
                    onChange={(e) => setUserProfile({ dailyCalorieGoal: parseInt(e.target.value) })}
                    className="w-full px-4 py-3 glass rounded-lg text-white focus:ring-2 focus:ring-primary-500 focus:outline-none"
                  />
                </div>
                
                <div>
                  <label className="block text-white text-sm font-medium mb-3">
                    Dietary Goals
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {goalOptions.map((goal) => (
                      <button
                        key={goal.id}
                        onClick={() => handleGoalToggle(goal.id)}
                        className={`p-3 rounded-lg text-sm font-medium transition-colors text-left ${
                          userProfile.dietaryGoals.includes(goal.id)
                            ? 'bg-primary-500 text-white'
                            : 'glass text-white/80 hover:bg-white/20'
                        }`}
                      >
                        <div className="flex items-center space-x-2">
                          <span>{goal.icon}</span>
                          <span>{goal.name}</span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
        
        {activeSection === 'diets' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className="card">
              <h3 className="text-lg font-semibold text-white mb-4">
                Active Diets
              </h3>
              <p className="text-white/60 text-sm mb-6">
                Select the diets you follow. Food will be scored based on these preferences.
              </p>
              
              <div className="space-y-3">
                {dietOptions.map((diet) => (
                  <div
                    key={diet.id}
                    className={`p-4 rounded-lg cursor-pointer transition-colors ${
                      userProfile.activeDiets.includes(diet.id)
                        ? 'bg-primary-500/20 border border-primary-500/30'
                        : 'glass hover:bg-white/10'
                    }`}
                    onClick={() => handleDietToggle(diet.id)}
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="font-medium text-white">{diet.name}</h4>
                        <p className="text-sm text-white/60 mt-1">{diet.description}</p>
                      </div>
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                        userProfile.activeDiets.includes(diet.id)
                          ? 'border-primary-400 bg-primary-400'
                          : 'border-white/40'
                      }`}>
                        {userProfile.activeDiets.includes(diet.id) && (
                          <div className="w-2 h-2 bg-white rounded-full" />
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {userProfile.activeDiets.length > 0 && (
              <div className="card">
                <h3 className="text-lg font-semibold text-white mb-4">
                  Diet Summary
                </h3>
                <div className="flex flex-wrap gap-2">
                  {userProfile.activeDiets.map((dietId) => {
                    const diet = dietOptions.find(d => d.id === dietId)
                    return (
                      <span
                        key={dietId}
                        className="px-3 py-1 bg-primary-500/20 text-primary-300 rounded-full text-sm"
                      >
                        {diet?.name}
                      </span>
                    )
                  })}
                </div>
              </div>
            )}
          </motion.div>
        )}
        
        {activeSection === 'settings' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className="card">
              <h3 className="text-lg font-semibold text-white mb-4">App Settings</h3>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Bell className="w-5 h-5 text-white/60" />
                    <div>
                      <h4 className="text-white font-medium">Notifications</h4>
                      <p className="text-white/60 text-sm">Daily reminders and tips</p>
                    </div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" defaultChecked />
                    <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-500"></div>
                  </label>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Shield className="w-5 h-5 text-white/60" />
                    <div>
                      <h4 className="text-white font-medium">Privacy Mode</h4>
                      <p className="text-white/60 text-sm">Keep scan data local only</p>
                    </div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" />
                    <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-500"></div>
                  </label>
                </div>
              </div>
            </div>
            
            <div className="card">
              <h3 className="text-lg font-semibold text-white mb-4">Support</h3>
              
              <div className="space-y-3">
                <button className="w-full flex items-center space-x-3 p-3 glass rounded-lg hover:bg-white/10 transition-colors">
                  <HelpCircle className="w-5 h-5 text-white/60" />
                  <span className="text-white">Help & FAQ</span>
                </button>
                
                <button className="w-full flex items-center space-x-3 p-3 glass rounded-lg hover:bg-white/10 transition-colors">
                  <LogOut className="w-5 h-5 text-red-400" />
                  <span className="text-red-400">Reset All Data</span>
                </button>
              </div>
            </div>
            
            <div className="card">
              <div className="text-center text-white/60 text-sm">
                <p>NutriScan v1.0.0</p>
                <p className="mt-1">Built with cutting-edge AI technology</p>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  )
}

export default Profile
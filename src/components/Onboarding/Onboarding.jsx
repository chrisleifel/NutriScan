import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronRight, Sparkles, Target, Zap, CheckCircle } from 'lucide-react'
import useAppStore from '../../stores/useAppStore'

const Onboarding = () => {
  const [currentStep, setCurrentStep] = useState(0)
  const { setUserProfile } = useAppStore()
  
  const [formData, setFormData] = useState({
    name: '',
    dietaryGoals: [],
    activeDiets: [],
    dailyCalorieGoal: 2000
  })
  
  const steps = [
    {
      id: 'welcome',
      title: 'Welcome to NutriScan',
      subtitle: 'The Intelligent Food Health Matrix',
      component: WelcomeStep
    },
    {
      id: 'goals',
      title: 'What are your goals?',
      subtitle: 'Help us personalize your experience',
      component: GoalsStep
    },
    {
      id: 'diets',
      title: 'Select your diets',
      subtitle: 'We\'ll score foods based on your preferences',
      component: DietsStep
    },
    {
      id: 'complete',
      title: 'You\'re all set!',
      subtitle: 'Start scanning and discover your food\'s health potential',
      component: CompleteStep
    }
  ]
  
  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      // Complete onboarding
      setUserProfile({
        ...formData,
        onboardingComplete: true
      })
    }
  }
  
  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }
  
  const updateFormData = (updates) => {
    setFormData(prev => ({ ...prev, ...updates }))
  }
  
  const CurrentStepComponent = steps[currentStep].component
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex flex-col">
      {/* Progress Bar */}
      <div className="safe-area-top p-4">
        <div className="w-full bg-white/10 rounded-full h-2">
          <motion.div
            className="bg-gradient-to-r from-primary-500 to-primary-600 h-2 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          />
        </div>
      </div>
      
      {/* Content */}
      <div className="flex-1 flex flex-col justify-center px-4 pb-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
            className="text-center mb-8"
          >
            <h1 className="text-3xl font-bold text-white mb-2">
              {steps[currentStep].title}
            </h1>
            <p className="text-white/70 text-lg">
              {steps[currentStep].subtitle}
            </p>
          </motion.div>
        </AnimatePresence>
        
        <div className="flex-1 flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="w-full max-w-md"
            >
              <CurrentStepComponent 
                formData={formData}
                updateFormData={updateFormData}
              />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
      
      {/* Navigation */}
      <div className="safe-area-bottom p-4">
        <div className="flex justify-between items-center">
          <button
            onClick={handleBack}
            disabled={currentStep === 0}
            className={`px-6 py-3 rounded-lg font-medium transition-colors ${
              currentStep === 0
                ? 'text-white/40 cursor-not-allowed'
                : 'text-white/80 hover:text-white glass hover:bg-white/20'
            }`}
          >
            Back
          </button>
          
          <div className="flex space-x-2">
            {steps.map((_, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full transition-colors ${
                  index <= currentStep ? 'bg-primary-400' : 'bg-white/20'
                }`}
              />
            ))}
          </div>
          
          <button
            onClick={handleNext}
            className="btn-primary flex items-center space-x-2"
          >
            <span>{currentStep === steps.length - 1 ? 'Get Started' : 'Next'}</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  )
}

// Welcome Step Component
const WelcomeStep = () => {
  return (
    <div className="text-center space-y-8">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
        className="w-32 h-32 mx-auto bg-gradient-to-r from-primary-500 to-primary-600 rounded-full flex items-center justify-center shadow-2xl"
      >
        <Sparkles className="w-16 h-16 text-white" />
      </motion.div>
      
      <div className="space-y-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="glass rounded-2xl p-6"
        >
          <Zap className="w-8 h-8 text-primary-400 mx-auto mb-3" />
          <h3 className="text-white font-semibold mb-2">AI-Powered Analysis</h3>
          <p className="text-white/70 text-sm">
            Instant nutrition analysis with contextual intelligence
          </p>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="glass rounded-2xl p-6"
        >
          <Target className="w-8 h-8 text-primary-400 mx-auto mb-3" />
          <h3 className="text-white font-semibold mb-2">Personalized Scoring</h3>
          <p className="text-white/70 text-sm">
            Food scores adapted to your dietary preferences
          </p>
        </motion.div>
      </div>
    </div>
  )
}

// Goals Step Component
const GoalsStep = ({ formData, updateFormData }) => {
  const goals = [
    { id: 'weight-loss', name: 'Weight Loss', icon: '⚖️', desc: 'Lose weight healthily' },
    { id: 'muscle-gain', name: 'Muscle Gain', icon: '💪', desc: 'Build lean muscle mass' },
    { id: 'maintenance', name: 'Maintenance', icon: '⚖️', desc: 'Maintain current weight' },
    { id: 'health-improvement', name: 'Health Improvement', icon: '❤️', desc: 'Improve overall health' }
  ]
  
  const toggleGoal = (goalId) => {
    const newGoals = formData.dietaryGoals.includes(goalId)
      ? formData.dietaryGoals.filter(id => id !== goalId)
      : [...formData.dietaryGoals, goalId]
    
    updateFormData({ dietaryGoals: newGoals })
  }
  
  return (
    <div className="space-y-4">
      <div className="mb-6">
        <label className="block text-white text-sm font-medium mb-3">
          What's your name?
        </label>
        <input
          type="text"
          value={formData.name}
          onChange={(e) => updateFormData({ name: e.target.value })}
          placeholder="Enter your name"
          className="w-full px-4 py-3 glass rounded-lg text-white placeholder-white/60 focus:ring-2 focus:ring-primary-500 focus:outline-none"
        />
      </div>
      
      <div className="grid grid-cols-1 gap-3">
        {goals.map((goal) => (
          <motion.div
            key={goal.id}
            whileTap={{ scale: 0.98 }}
            className={`p-4 rounded-xl cursor-pointer transition-all ${
              formData.dietaryGoals.includes(goal.id)
                ? 'bg-primary-500/20 border-2 border-primary-500/50 shadow-lg'
                : 'glass hover:bg-white/10 border-2 border-transparent'
            }`}
            onClick={() => toggleGoal(goal.id)}
          >
            <div className="flex items-center space-x-4">
              <div className="text-2xl">{goal.icon}</div>
              <div className="flex-1">
                <h3 className="font-semibold text-white">{goal.name}</h3>
                <p className="text-white/60 text-sm">{goal.desc}</p>
              </div>
              <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${
                formData.dietaryGoals.includes(goal.id)
                  ? 'border-primary-400 bg-primary-400'
                  : 'border-white/40'
              }`}>
                {formData.dietaryGoals.includes(goal.id) && (
                  <CheckCircle className="w-4 h-4 text-white" />
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
      
      <div className="mt-6">
        <label className="block text-white text-sm font-medium mb-3">
          Daily Calorie Goal
        </label>
        <input
          type="number"
          value={formData.dailyCalorieGoal}
          onChange={(e) => updateFormData({ dailyCalorieGoal: parseInt(e.target.value) })}
          className="w-full px-4 py-3 glass rounded-lg text-white focus:ring-2 focus:ring-primary-500 focus:outline-none"
        />
      </div>
    </div>
  )
}

// Diets Step Component
const DietsStep = ({ formData, updateFormData }) => {
  const diets = [
    { id: 'keto', name: 'Keto', desc: 'High fat, very low carb' },
    { id: 'mediterranean', name: 'Mediterranean', desc: 'Heart-healthy, balanced' },
    { id: 'vegan', name: 'Vegan', desc: 'Plant-based only' },
    { id: 'vegetarian', name: 'Vegetarian', desc: 'No meat, includes dairy' },
    { id: 'paleo', name: 'Paleo', desc: 'Whole foods, no processed' },
    { id: 'low-carb', name: 'Low Carb', desc: 'Reduced carbohydrates' }
  ]
  
  const toggleDiet = (dietId) => {
    const newDiets = formData.activeDiets.includes(dietId)
      ? formData.activeDiets.filter(id => id !== dietId)
      : [...formData.activeDiets, dietId]
    
    updateFormData({ activeDiets: newDiets })
  }
  
  return (
    <div className="space-y-4">
      <p className="text-white/70 text-sm text-center mb-6">
        Select the diets you follow. We'll personalize food scores based on your choices.
      </p>
      
      <div className="grid grid-cols-1 gap-3">
        {diets.map((diet) => (
          <motion.div
            key={diet.id}
            whileTap={{ scale: 0.98 }}
            className={`p-4 rounded-xl cursor-pointer transition-all ${
              formData.activeDiets.includes(diet.id)
                ? 'bg-primary-500/20 border-2 border-primary-500/50 shadow-lg'
                : 'glass hover:bg-white/10 border-2 border-transparent'
            }`}
            onClick={() => toggleDiet(diet.id)}
          >
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-white">{diet.name}</h3>
                <p className="text-white/60 text-sm">{diet.desc}</p>
              </div>
              <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${
                formData.activeDiets.includes(diet.id)
                  ? 'border-primary-400 bg-primary-400'
                  : 'border-white/40'
              }`}>
                {formData.activeDiets.includes(diet.id) && (
                  <CheckCircle className="w-4 h-4 text-white" />
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
      
      <div className="text-center mt-6">
        <p className="text-white/60 text-sm">
          You can always change these settings later in your profile.
        </p>
      </div>
    </div>
  )
}

// Complete Step Component
const CompleteStep = ({ formData }) => {
  return (
    <div className="text-center space-y-8">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
        className="w-32 h-32 mx-auto bg-gradient-to-r from-green-500 to-primary-600 rounded-full flex items-center justify-center shadow-2xl"
      >
        <CheckCircle className="w-16 h-16 text-white" />
      </motion.div>
      
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-white">
          Welcome, {formData.name || 'there'}!
        </h2>
        
        <div className="glass rounded-2xl p-6 text-left">
          <h3 className="font-semibold text-white mb-4">Your Profile Summary:</h3>
          
          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-white/70">Daily Calorie Goal:</span>
              <span className="text-white font-medium">{formData.dailyCalorieGoal} cal</span>
            </div>
            
            <div>
              <span className="text-white/70">Goals:</span>
              <div className="mt-1 flex flex-wrap gap-1">
                {formData.dietaryGoals.map(goal => (
                  <span key={goal} className="px-2 py-1 bg-primary-500/20 text-primary-300 rounded text-xs">
                    {goal.replace('-', ' ')}
                  </span>
                ))}
              </div>
            </div>
            
            {formData.activeDiets.length > 0 && (
              <div>
                <span className="text-white/70">Active Diets:</span>
                <div className="mt-1 flex flex-wrap gap-1">
                  {formData.activeDiets.map(diet => (
                    <span key={diet} className="px-2 py-1 bg-green-500/20 text-green-300 rounded text-xs">
                      {diet}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
        
        <p className="text-white/70">
          You're ready to start your personalized nutrition journey!
        </p>
      </div>
    </div>
  )
}

export default Onboarding
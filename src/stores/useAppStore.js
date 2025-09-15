import { create } from 'zustand'
import { persist } from 'zustand/middleware'

const useAppStore = create(
  persist(
    (set, get) => ({
      // User Profile
      userProfile: {
        name: '',
        dietaryGoals: [], // ['weight-loss', 'muscle-gain', 'maintenance']
        activeDiets: [], // ['keto', 'mediterranean', 'vegan', etc.]
        dailyCalorieGoal: 2000,
        restrictions: [], // ['gluten-free', 'dairy-free', etc.]
        onboardingComplete: true
      },

      // Scanner State
      scannerState: {
        isActive: false,
        mode: 'auto', // 'auto', 'real-food', 'packaged'
        currentScan: null,
        isProcessing: false
      },

      // Daily Log
      dailyLog: {
        date: new Date().toISOString().split('T')[0],
        meals: {
          breakfast: [],
          lunch: [],
          dinner: [],
          snacks: []
        },
        totalCalories: 0,
        totalProtein: 0,
        totalCarbs: 0,
        totalFat: 0,
        averageHealthScore: 0,
        scansToday: 0
      },

      // Scan History
      scanHistory: [],

      // Actions
      setUserProfile: (profile) => set(state => ({
        userProfile: { ...state.userProfile, ...profile }
      })),

      setScannerState: (scannerState) => set(state => ({
        scannerState: { ...state.scannerState, ...scannerState }
      })),

      addScanToHistory: (scanResult) => set(state => {
        const newHistory = [scanResult, ...state.scanHistory].slice(0, 100) // Keep last 100 scans
        return {
          scanHistory: newHistory,
          dailyLog: {
            ...state.dailyLog,
            scansToday: state.dailyLog.scansToday + 1
          }
        }
      }),

      addMealToLog: (meal, mealType) => set(state => {
        const updatedMeals = {
          ...state.dailyLog.meals,
          [mealType]: [...state.dailyLog.meals[mealType], meal]
        }

        // Recalculate totals
        const allMeals = Object.values(updatedMeals).flat()
        const totals = allMeals.reduce((acc, meal) => ({
          calories: acc.calories + (meal.nutrition?.calories || 0),
          protein: acc.protein + (meal.nutrition?.protein || 0),
          carbs: acc.carbs + (meal.nutrition?.carbs || 0),
          fat: acc.fat + (meal.nutrition?.fat || 0),
          healthScore: acc.healthScore + (meal.healthScore || 0)
        }), { calories: 0, protein: 0, carbs: 0, fat: 0, healthScore: 0 })

        return {
          dailyLog: {
            ...state.dailyLog,
            meals: updatedMeals,
            totalCalories: totals.calories,
            totalProtein: totals.protein,
            totalCarbs: totals.carbs,
            totalFat: totals.fat,
            averageHealthScore: allMeals.length > 0 ? totals.healthScore / allMeals.length : 0
          }
        }
      }),

      resetDailyLog: () => {
        const today = new Date().toISOString().split('T')[0]
        const currentDate = get().dailyLog.date
        
        if (today !== currentDate) {
          set(state => ({
            dailyLog: {
              date: today,
              meals: { breakfast: [], lunch: [], dinner: [], snacks: [] },
              totalCalories: 0,
              totalProtein: 0,
              totalCarbs: 0,
              totalFat: 0,
              averageHealthScore: 0,
              scansToday: 0
            }
          }))
        }
      }
    }),
    {
      name: 'nutriscan-storage',
      partialize: (state) => ({
        userProfile: state.userProfile,
        scanHistory: state.scanHistory,
        dailyLog: state.dailyLog
      })
    }
  )
)

export default useAppStore
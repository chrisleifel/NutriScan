import React, { useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'

import useAppStore from './stores/useAppStore'
import Layout from './components/Layout'
import FixedRealTimeScanner from './components/Scanner/FixedRealTimeScanner'
import Dashboard from './components/Dashboard/Dashboard'
import History from './components/History/History'
import Profile from './components/Profile/Profile'
import Onboarding from './components/Onboarding/Onboarding'

function App() {
  try {
    const { userProfile, resetDailyLog } = useAppStore()

    useEffect(() => {
      // Reset daily log if it's a new day
      resetDailyLog()
    }, [resetDailyLog])

    // Show onboarding if not completed
    if (!userProfile.onboardingComplete) {
      return <Onboarding />
    }
  } catch (error) {
    console.error('App error:', error)
    // Fallback UI
    return (
      <div style={{ padding: '20px', textAlign: 'center', color: 'white', backgroundColor: '#1a1a1a', minHeight: '100vh' }}>
        <h1>NutriScan</h1>
        <p>Loading...</p>
        <button onClick={() => window.location.reload()} style={{ padding: '10px 20px', marginTop: '20px' }}>
          Reload App
        </button>
      </div>
    )
  }

  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        <Layout>
          <AnimatePresence mode="wait">
            <Routes>
              <Route path="/" element={<Navigate to="/scanner" replace />} />
              <Route 
                path="/scanner" 
                element={
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <FixedRealTimeScanner />
                  </motion.div>
                } 
              />
              <Route 
                path="/dashboard" 
                element={
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Dashboard />
                  </motion.div>
                } 
              />
              <Route 
                path="/history" 
                element={
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <History />
                  </motion.div>
                } 
              />
              <Route 
                path="/profile" 
                element={
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Profile />
                  </motion.div>
                } 
              />
            </Routes>
          </AnimatePresence>
        </Layout>
      </div>
    </Router>
  )
}

export default App
import React from 'react'
import { useLocation, Link } from 'react-router-dom'
import { Camera, BarChart3, History, User, Scan } from 'lucide-react'
import { motion } from 'framer-motion'

const Layout = ({ children }) => {
  const location = useLocation()
  
  const navigation = [
    { name: 'Scanner', href: '/scanner', icon: Camera, current: location.pathname === '/scanner' },
    { name: 'Dashboard', href: '/dashboard', icon: BarChart3, current: location.pathname === '/dashboard' },
    { name: 'History', href: '/history', icon: History, current: location.pathname === '/history' },
    { name: 'Profile', href: '/profile', icon: User, current: location.pathname === '/profile' },
  ]
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Main Content */}
      <main className="pb-20">
        {children}
      </main>
      
      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 safe-area-bottom z-50">
        <div className="glass border-t border-white/10">
          <div className="grid grid-cols-4 h-16">
            {navigation.map((item) => {
              const Icon = item.icon
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`flex flex-col items-center justify-center space-y-1 text-xs font-medium transition-colors relative ${
                    item.current
                      ? 'text-primary-400'
                      : 'text-white/60 hover:text-white'
                  }`}
                >
                  {item.current && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute inset-0 bg-primary-500/20 rounded-lg m-2"
                      initial={false}
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                  <Icon className={`w-6 h-6 relative z-10 ${
                    item.current ? 'text-primary-400' : 'text-white/60'
                  }`} />
                  <span className={`relative z-10 ${
                    item.current ? 'text-primary-400' : 'text-white/60'
                  }`}>
                    {item.name}
                  </span>
                </Link>
              )
            })}
          </div>
        </div>
      </nav>
      
      {/* Floating Action Button for Quick Scan */}
      {location.pathname !== '/scanner' && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="fixed bottom-20 right-4 safe-area-bottom z-40"
        >
          <Link
            to="/scanner"
            className="w-14 h-14 bg-gradient-to-r from-primary-500 to-primary-600 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-shadow"
          >
            <Scan className="w-6 h-6 text-white" />
          </Link>
        </motion.div>
      )}
    </div>
  )
}

export default Layout
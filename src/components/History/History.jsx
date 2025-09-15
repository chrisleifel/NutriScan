import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Calendar, Filter, Search, TrendingUp, Clock } from 'lucide-react'
import useAppStore from '../../stores/useAppStore'

const History = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedFilter, setSelectedFilter] = useState('all') // all, excellent, good, poor
  const [selectedDate, setSelectedDate] = useState('')
  
  const { scanHistory } = useAppStore()
  
  const filteredHistory = scanHistory.filter(scan => {
    const matchesSearch = scan.name?.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = selectedFilter === 'all' || 
      (selectedFilter === 'excellent' && scan.healthMatrix?.baseScore >= 80) ||
      (selectedFilter === 'good' && scan.healthMatrix?.baseScore >= 60 && scan.healthMatrix?.baseScore < 80) ||
      (selectedFilter === 'poor' && scan.healthMatrix?.baseScore < 60)
    
    const scanDate = new Date(scan.timestamp).toDateString()
    const filterDate = selectedDate ? new Date(selectedDate).toDateString() : ''
    const matchesDate = !selectedDate || scanDate === filterDate
    
    return matchesSearch && matchesFilter && matchesDate
  })
  
  const getScoreColor = (score) => {
    if (score >= 80) return 'text-health-excellent'
    if (score >= 60) return 'text-health-good'
    if (score >= 40) return 'text-health-moderate'
    return 'text-health-poor'
  }
  
  const getScoreBadge = (score) => {
    if (score >= 80) return { color: 'bg-health-excellent', label: 'Excellent' }
    if (score >= 60) return { color: 'bg-health-good', label: 'Good' }
    if (score >= 40) return { color: 'bg-health-moderate', label: 'Moderate' }
    return { color: 'bg-health-poor', label: 'Poor' }
  }
  
  const groupedByDate = filteredHistory.reduce((groups, scan) => {
    const date = new Date(scan.timestamp).toDateString()
    if (!groups[date]) groups[date] = []
    groups[date].push(scan)
    return groups
  }, {})
  
  return (
    <div className="min-h-screen safe-area-top safe-area-bottom bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header */}
      <div className="sticky top-0 z-10 glass border-b border-white/10 p-4">
        <h1 className="text-2xl font-bold text-white mb-4">Scan History</h1>
        
        {/* Search and Filters */}
        <div className="space-y-3">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60 w-5 h-5" />
            <input
              type="text"
              placeholder="Search food items..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 glass rounded-lg text-white placeholder-white/60 focus:ring-2 focus:ring-primary-500 focus:outline-none"
            />
          </div>
          
          {/* Filters */}
          <div className="flex space-x-2 overflow-x-auto">
            {[
              { id: 'all', label: 'All' },
              { id: 'excellent', label: 'Excellent' },
              { id: 'good', label: 'Good' },
              { id: 'poor', label: 'Poor' }
            ].map((filter) => (
              <button
                key={filter.id}
                onClick={() => setSelectedFilter(filter.id)}
                className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
                  selectedFilter === filter.id
                    ? 'bg-primary-500 text-white'
                    : 'glass text-white/80 hover:text-white hover:bg-white/20'
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>
          
          {/* Date Filter */}
          <div className="flex items-center space-x-2">
            <Calendar className="text-white/60 w-5 h-5" />
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="glass rounded-lg px-3 py-2 text-white text-sm focus:ring-2 focus:ring-primary-500 focus:outline-none"
            />
            {selectedDate && (
              <button
                onClick={() => setSelectedDate('')}
                className="text-white/60 hover:text-white text-sm"
              >
                Clear
              </button>
            )}
          </div>
        </div>
      </div>
      
      {/* Content */}
      <div className="p-4">
        {scanHistory.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-20 h-20 mx-auto mb-4 rounded-full glass flex items-center justify-center">
              <Clock className="w-10 h-10 text-white/60" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">No scan history yet</h3>
            <p className="text-white/60 mb-6">Start scanning foods to build your history</p>
            <button className="btn-primary">
              Start Scanning
            </button>
          </div>
        ) : filteredHistory.length === 0 ? (
          <div className="text-center py-12">
            <h3 className="text-xl font-semibold text-white mb-2">No results found</h3>
            <p className="text-white/60">Try adjusting your search or filters</p>
          </div>
        ) : (
          <div className="space-y-6">
            {Object.entries(groupedByDate).map(([date, scans]) => (
              <div key={date}>
                <h3 className="text-lg font-semibold text-white mb-3 sticky top-24 glass rounded-lg px-3 py-2 inline-block">
                  {new Date(date).toLocaleDateString('en-US', { 
                    weekday: 'long', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </h3>
                
                <div className="space-y-3">
                  <AnimatePresence>
                    {scans.map((scan, index) => {
                      const score = scan.healthMatrix?.baseScore || 0
                      const badge = getScoreBadge(score)
                      
                      return (
                        <motion.div
                          key={`${scan.timestamp}-${index}`}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -20 }}
                          transition={{ duration: 0.2, delay: index * 0.05 }}
                          className="card hover:bg-white/5 transition-colors cursor-pointer"
                          onClick={() => {
                            // Navigate to scan details or open modal
                            console.log('Show scan details:', scan)
                          }}
                        >
                          <div className="flex items-start space-x-4">
                            {scan.image && (
                              <img
                                src={scan.image}
                                alt={scan.name}
                                className="w-16 h-16 rounded-lg object-cover flex-shrink-0"
                              />
                            )}
                            
                            <div className="flex-1 min-w-0">
                              <div className="flex items-start justify-between">
                                <div>
                                  <h4 className="font-semibold text-white truncate">
                                    {scan.name}
                                  </h4>
                                  <p className="text-sm text-white/60">
                                    {new Date(scan.timestamp).toLocaleTimeString('en-US', {
                                      hour: 'numeric',
                                      minute: '2-digit'
                                    })}
                                  </p>
                                </div>
                                
                                <div className="flex items-center space-x-2 flex-shrink-0">
                                  <div className={`text-lg font-bold ${getScoreColor(score)}`}>
                                    {Math.round(score)}
                                  </div>
                                  <div className={`px-2 py-1 rounded-full text-xs text-white ${badge.color}`}>
                                    {badge.label}
                                  </div>
                                </div>
                              </div>
                              
                              {scan.nutrition && (
                                <div className="mt-2 flex items-center space-x-4 text-sm text-white/60">
                                  <span>{scan.nutrition.calories} cal</span>
                                  <span>{scan.nutrition.protein}g protein</span>
                                  <span>{scan.nutrition.carbs}g carbs</span>
                                  <span>{scan.nutrition.fat}g fat</span>
                                </div>
                              )}
                              
                              {scan.mode && (
                                <div className="mt-2">
                                  <span className="text-xs px-2 py-1 rounded-full bg-primary-500/20 text-primary-300">
                                    {scan.mode === 'real-food' ? 'Whole Food' : 'Packaged'}
                                  </span>
                                </div>
                              )}
                            </div>
                          </div>
                        </motion.div>
                      )
                    })}
                  </AnimatePresence>
                </div>
              </div>
            ))}
          </div>
        )}
        
        {/* Statistics Summary */}
        {filteredHistory.length > 0 && (
          <div className="card mt-8">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
              <TrendingUp className="w-5 h-5 mr-2" />
              Summary Statistics
            </h3>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-white">
                  {filteredHistory.length}
                </div>
                <div className="text-white/60 text-sm">Total Scans</div>
              </div>
              
              <div className="text-center">
                <div className="text-2xl font-bold text-primary-400">
                  {Math.round(
                    filteredHistory.reduce((sum, scan) => 
                      sum + (scan.healthMatrix?.baseScore || 0), 0
                    ) / filteredHistory.length
                  )}
                </div>
                <div className="text-white/60 text-sm">Avg Health Score</div>
              </div>
              
              <div className="text-center">
                <div className="text-2xl font-bold text-health-excellent">
                  {filteredHistory.filter(scan => 
                    (scan.healthMatrix?.baseScore || 0) >= 80
                  ).length}
                </div>
                <div className="text-white/60 text-sm">Excellent Foods</div>
              </div>
              
              <div className="text-center">
                <div className="text-2xl font-bold text-white">
                  {Math.round(
                    filteredHistory.reduce((sum, scan) => 
                      sum + (scan.nutrition?.calories || 0), 0
                    )
                  )}
                </div>
                <div className="text-white/60 text-sm">Total Calories</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default History
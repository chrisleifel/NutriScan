import React from 'react'
import { motion } from 'framer-motion'

const CameraOverlay = ({ isActive }) => {
  return (
    <div className="absolute inset-0 pointer-events-none">
      {/* Scanning Grid Overlay */}
      <div className="absolute inset-0 opacity-20">
        <svg className="w-full h-full">
          <defs>
            <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
              <path d="M 20 0 L 0 0 0 20" fill="none" stroke="white" strokeWidth="0.5"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>
      
      {/* Center Viewfinder */}
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div
          className="relative w-48 h-48 border-2 border-primary-400 rounded-2xl"
          animate={isActive ? {
            scale: [1, 1.05, 1],
            opacity: [0.7, 1, 0.7]
          } : {}}
          transition={{
            duration: 2,
            repeat: isActive ? Infinity : 0,
            ease: "easeInOut"
          }}
        >
          {/* Corner Brackets */}
          <div className="absolute -top-1 -left-1 w-6 h-6 border-l-2 border-t-2 border-primary-400"></div>
          <div className="absolute -top-1 -right-1 w-6 h-6 border-r-2 border-t-2 border-primary-400"></div>
          <div className="absolute -bottom-1 -left-1 w-6 h-6 border-l-2 border-b-2 border-primary-400"></div>
          <div className="absolute -bottom-1 -right-1 w-6 h-6 border-r-2 border-b-2 border-primary-400"></div>
          
          {/* Scanning Line */}
          {isActive && (
            <motion.div
              className="absolute left-0 right-0 h-0.5 bg-primary-400 shadow-lg"
              animate={{
                top: ['10%', '90%', '10%']
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          )}
          
          {/* Center Dot */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <motion.div
              className="w-2 h-2 bg-primary-400 rounded-full"
              animate={isActive ? {
                scale: [1, 1.5, 1],
                opacity: [1, 0.5, 1]
              } : {}}
              transition={{
                duration: 1,
                repeat: isActive ? Infinity : 0
              }}
            />
          </div>
        </motion.div>
      </div>
      
      {/* Instructions */}
      <div className="absolute bottom-4 left-4 right-4 text-center">
        <div className="glass rounded-lg px-4 py-2">
          <p className="text-white/90 text-sm">
            {isActive ? 'Analyzing food...' : 'Position food in the frame'}
          </p>
        </div>
      </div>
    </div>
  )
}

export default CameraOverlay
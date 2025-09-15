import React, { useState, useRef, useCallback, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Camera, Scan, Zap, Sparkles, Target, AlertCircle, Eye, Pause, Play } from 'lucide-react'
import Webcam from 'react-webcam'

import useAppStore from '../../stores/useAppStore'
import { useFoodScanner } from '../../hooks/useFoodScanner'
import { useHealthMatrix } from '../../hooks/useHealthMatrix'
import aiDetectionService from '../../services/aiDetectionService'
import ScanResults from './ScanResults'
import CameraOverlay from './CameraOverlay'

const RealTimeScanner = () => {
  const webcamRef = useRef(null)
  const intervalRef = useRef(null)
  const [isScanning, setIsScanning] = useState(false)
  const [capturedImage, setCapturedImage] = useState(null)
  const [scanResults, setScanResults] = useState(null)
  const [error, setError] = useState(null)
  const [cameraError, setCameraError] = useState(false)
  const [showCameraPrompt, setShowCameraPrompt] = useState(false)
  const [isRealTimeActive, setIsRealTimeActive] = useState(false)
  const [detectedFoods, setDetectedFoods] = useState([])
  const [confidence, setConfidence] = useState(0)
  const [autoCapture, setAutoCapture] = useState(true)
  const fileInputRef = useRef(null)
  
  const { scannerState, setScannerState, addScanToHistory } = useAppStore()
  const { scanFood, isLoading: isScanLoading } = useFoodScanner()
  const { calculateHealthMatrix } = useHealthMatrix()

  // Clean up interval on unmount
  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [])

  // Real-time food detection
  const startRealTimeDetection = useCallback(() => {
    if (!webcamRef.current || isRealTimeActive) return

    setIsRealTimeActive(true)
    setDetectedFoods([])
    
    // Analyze frame every 2 seconds
    intervalRef.current = setInterval(async () => {
      try {
        if (webcamRef.current && !isScanning) {
          const imageSrc = webcamRef.current.getScreenshot()
          if (imageSrc) {
            await analyzeFrame(imageSrc)
          }
        }
      } catch (error) {
        console.error('Real-time detection error:', error)
      }
    }, 2000)
  }, [isRealTimeActive, isScanning])

  const stopRealTimeDetection = useCallback(() => {
    setIsRealTimeActive(false)
    setDetectedFoods([])
    setConfidence(0)
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }
  }, [])

  // Analyze current frame for food detection
  const analyzeFrame = useCallback(async (imageSrc) => {
    try {
      // Use AI detection service for real-time analysis
      const result = await aiDetectionService.enhancedImageAnalysis(imageSrc)
      
      if (result.success && result.confidence > 0.7) {
        const newFood = {
          name: result.detectedFood.name,
          confidence: result.confidence,
          ingredients: result.detectedFood.ingredients || [],
          category: result.detectedFood.category
        }
        
        setDetectedFoods(prev => {
          // Only add if not already detected or if confidence is higher
          const existingIndex = prev.findIndex(food => food.name === newFood.name)
          if (existingIndex >= 0) {
            if (newFood.confidence > prev[existingIndex].confidence) {
              const updated = [...prev]
              updated[existingIndex] = newFood
              return updated
            }
            return prev
          }
          return [...prev, newFood].slice(-5) // Keep only last 5 detections
        })
        
        setConfidence(result.confidence)
        
        // Auto-capture if confidence is very high and auto-capture is enabled
        if (result.confidence > 0.85 && autoCapture && !isScanning) {
          await handleAutoCapture(imageSrc, result)
        }
      }
    } catch (error) {
      console.error('Frame analysis error:', error)
    }
  }, [autoCapture, isScanning])

  // Handle auto-capture when high confidence detection
  const handleAutoCapture = useCallback(async (imageSrc, detectionResult) => {
    setIsScanning(true)
    stopRealTimeDetection()
    
    try {
      setCapturedImage(imageSrc)
      
      // Calculate health matrix score
      const healthMatrix = await calculateHealthMatrix(detectionResult)
      
      const finalResult = {
        ...detectionResult,
        healthMatrix,
        timestamp: new Date().toISOString(),
        mode: 'auto-capture',
        image: imageSrc,
        autoDetected: true,
        detectedIngredients: detectionResult.detectedFood.ingredients || []
      }
      
      setScanResults(finalResult)
      addScanToHistory(finalResult)
    } catch (error) {
      console.error('Auto-capture error:', error)
      setError('Auto-capture failed. Please try manual capture.')
    } finally {
      setIsScanning(false)
    }
  }, [calculateHealthMatrix, addScanToHistory])

  // Manual capture
  const handleCapture = useCallback(async () => {
    if (!webcamRef.current) return
    
    setIsScanning(true)
    setError(null)
    stopRealTimeDetection()
    
    try {
      const imageSrc = webcamRef.current.getScreenshot()
      setCapturedImage(imageSrc)
      
      // Detect scan mode
      const detectedMode = await detectScanMode(imageSrc)
      setScannerState({ mode: detectedMode })
      
      // Perform AI food scanning
      const scanResult = await scanFood(imageSrc, detectedMode)
      
      if (scanResult) {
        // Calculate health matrix score
        const healthMatrix = await calculateHealthMatrix(scanResult)
        
        const finalResult = {
          ...scanResult,
          healthMatrix,
          timestamp: new Date().toISOString(),
          mode: detectedMode,
          image: imageSrc,
          detectedIngredients: scanResult.data?.ingredients || []
        }
        
        setScanResults(finalResult)
        addScanToHistory(finalResult)
      }
    } catch (err) {
      console.error('Scanning error:', err)
      setError('Failed to analyze food. Please try again.')
    } finally {
      setIsScanning(false)
    }
  }, [scanFood, calculateHealthMatrix, detectScanMode, setScannerState, addScanToHistory])
  
  // File upload handler
  const handleFileUpload = useCallback(async (event) => {
    const file = event.target.files[0]
    if (!file) return
    
    const reader = new FileReader()
    reader.onload = async (e) => {
      const imageSrc = e.target.result
      setCapturedImage(imageSrc)
      
      setIsScanning(true)
      setError(null)
      stopRealTimeDetection()
      
      try {
        const detectedMode = await detectScanMode(imageSrc)
        setScannerState({ mode: detectedMode })
        
        const scanResult = await scanFood(imageSrc, detectedMode)
        
        if (scanResult) {
          const healthMatrix = await calculateHealthMatrix(scanResult)
          
          const finalResult = {
            ...scanResult,
            healthMatrix,
            timestamp: new Date().toISOString(),
            mode: detectedMode,
            image: imageSrc,
            detectedIngredients: scanResult.data?.ingredients || []
          }
          
          setScanResults(finalResult)
          addScanToHistory(finalResult)
        }
      } catch (err) {
        console.error('File scanning error:', err)
        setError('Failed to analyze food. Please try again.')
      } finally {
        setIsScanning(false)
      }
    }
    reader.readAsDataURL(file)
  }, [scanFood, calculateHealthMatrix, detectScanMode, setScannerState, addScanToHistory])

  // Simple mode detection
  const detectScanMode = useCallback(async (imageData) => {
    return new Promise((resolve) => {
      const img = new Image()
      img.onload = () => {
        const canvas = document.createElement('canvas')
        const ctx = canvas.getContext('2d')
        canvas.width = img.width
        canvas.height = img.height
        ctx.drawImage(img, 0, 0)
        
        const imageDataArray = ctx.getImageData(0, 0, canvas.width, canvas.height)
        const edges = detectEdges(imageDataArray)
        
        const mode = edges > 0.3 ? 'packaged' : 'real-food'
        resolve(mode)
      }
      img.src = imageData
    })
  }, [])

  const detectEdges = (imageData) => {
    let edgeCount = 0
    const data = imageData.data
    const width = imageData.width
    
    for (let i = width * 4; i < data.length - width * 4; i += 4) {
      const brightness = (data[i] + data[i + 1] + data[i + 2]) / 3
      const rightBrightness = (data[i + 4] + data[i + 5] + data[i + 6]) / 3
      const bottomBrightness = (data[i + width * 4] + data[i + width * 4 + 1] + data[i + width * 4 + 2]) / 3
      
      if (Math.abs(brightness - rightBrightness) > 50 || Math.abs(brightness - bottomBrightness) > 50) {
        edgeCount++
      }
    }
    
    return edgeCount / (imageData.width * imageData.height)
  }

  const resetScanner = () => {
    setCapturedImage(null)
    setScanResults(null)
    setError(null)
    setCameraError(false)
    setShowCameraPrompt(false)
    setDetectedFoods([])
    setConfidence(0)
    stopRealTimeDetection()
    setScannerState({ isActive: false, mode: 'auto' })
  }
  
  if (scanResults) {
    return (
      <ScanResults 
        results={scanResults} 
        onReset={resetScanner}
        onAddToLog={(mealType) => {
          console.log('Adding to log:', mealType)
        }}
      />
    )
  }
  
  return (
    <div className="min-h-screen safe-area-top safe-area-bottom p-4">
      {/* Hero Section */}
      <div className="text-center mb-6">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          className="inline-flex items-center justify-center w-20 h-20 mb-4 rounded-full bg-gradient-to-r from-primary-500 to-primary-600 shadow-lg"
        >
          <Sparkles className="w-10 h-10 text-white" />
        </motion.div>
        
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-3xl font-bold text-white mb-2"
        >
          Smart Food Scanner
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-white/80 text-lg"
        >
          Real-time AI recognition with auto-capture
        </motion.p>
      </div>

      {/* Real-time Detection Status */}
      <AnimatePresence>
        {isRealTimeActive && detectedFoods.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="card bg-green-500/20 border-green-500/30 mb-4 p-4"
          >
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center text-green-300 mb-2">
                  <Eye className="w-5 h-5 mr-2" />
                  <span className="font-medium">Foods Detected:</span>
                </div>
                <div className="space-y-1">
                  {detectedFoods.map((food, index) => (
                    <div key={index} className="text-sm text-green-200">
                      <span className="font-medium">{food.name}</span>
                      <span className="text-green-300/80 ml-2">
                        {Math.round(food.confidence * 100)}% confident
                      </span>
                      {food.ingredients.length > 0 && (
                        <div className="text-xs text-green-300/60 mt-1">
                          <div className="font-medium mb-1">Key Ingredients:</div>
                          <div className="flex flex-wrap gap-1">
                            {food.ingredients.slice(0, 6).map((ingredient, idx) => (
                              <span key={idx} className="bg-green-500/20 px-2 py-1 rounded text-xs">
                                {ingredient}
                              </span>
                            ))}
                            {food.ingredients.length > 6 && (
                              <span className="text-green-300/60 text-xs">
                                +{food.ingredients.length - 6} more
                              </span>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-green-300">
                  {Math.round(confidence * 100)}%
                </div>
                <div className="text-xs text-green-400">
                  {confidence > 0.85 ? 'Auto-capturing...' : 'Scanning...'}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Camera Section */}
      <div className="relative mb-6">
        <div className="card overflow-hidden">
          {capturedImage ? (
            <div className="relative">
              <img 
                src={capturedImage} 
                alt="Captured food" 
                className="w-full h-64 object-cover rounded-lg"
              />
              {isScanning && (
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center rounded-lg">
                  <div className="text-center text-white">
                    <Zap className="w-8 h-8 mx-auto mb-2 animate-pulse" />
                    <p>Analyzing with AI...</p>
                    <div className="mt-2 text-sm text-white/80">
                      Mode: {scannerState.mode}
                    </div>
                  </div>
                </div>
              )}
            </div>
          ) : cameraError ? (
            <div className="relative h-64 bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg overflow-hidden flex items-center justify-center">
              <div className="text-center p-6">
                <Camera className="w-12 h-12 text-white/60 mx-auto mb-4" />
                <h3 className="text-white font-medium mb-2">Camera not available</h3>
                <p className="text-white/60 text-sm mb-4">Upload a photo instead</p>
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="btn-primary"
                >
                  Choose Photo
                </button>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  multiple={false}
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </div>
            </div>
          ) : (
            <div className="relative h-64 bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg overflow-hidden">
              <Webcam
                ref={webcamRef}
                audio={false}
                screenshotFormat="image/jpeg"
                className="w-full h-full object-cover"
                videoConstraints={{
                  width: { ideal: 1280 },
                  height: { ideal: 720 },
                  facingMode: { ideal: "environment" }
                }}
                onUserMediaError={(error) => {
                  console.error('Camera error:', error)
                  setCameraError(true)
                  if (error.name === 'NotAllowedError') {
                    setError('Camera permission denied. Please allow camera access in browser settings, or use photo upload.')
                  } else if (error.name === 'NotFoundError') {
                    setError('No camera found. Please use photo upload instead.')
                  } else {
                    setError('Camera access failed. Using photo upload instead.')
                  }
                }}
                style={{ width: '100%', height: '100%' }}
              />
              
              <CameraOverlay isActive={isScanning || isRealTimeActive} />
            </div>
          )}
        </div>
      </div>
      
      {/* Controls */}
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button
            onClick={isRealTimeActive ? stopRealTimeDetection : startRealTimeDetection}
            disabled={cameraError || isScanning}
            className={`flex items-center px-4 py-2 rounded-lg transition-colors ${
              isRealTimeActive 
                ? 'bg-red-500 hover:bg-red-600 text-white' 
                : 'bg-primary-500 hover:bg-primary-600 text-white'
            }`}
          >
            {isRealTimeActive ? (
              <>
                <Pause className="w-4 h-4 mr-2" />
                Stop Scanning
              </>
            ) : (
              <>
                <Play className="w-4 h-4 mr-2" />
                Start Real-Time
              </>
            )}
          </button>
        </div>
        
        <div className="flex items-center space-x-3">
          <label className="flex items-center text-white/80 text-sm">
            <input
              type="checkbox"
              checked={autoCapture}
              onChange={(e) => setAutoCapture(e.target.checked)}
              className="mr-2"
            />
            Auto-capture
          </label>
        </div>
      </div>
      
      {/* Error Message */}
      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="card bg-red-500/20 border-red-500/30 mb-4 p-4"
          >
            <div className="flex items-center text-red-300">
              <AlertCircle className="w-5 h-5 mr-2" />
              <span>{error}</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Action Buttons */}
      <div className="space-y-4">
        {capturedImage ? (
          <div className="flex space-x-4">
            <button
              onClick={resetScanner}
              disabled={isScanning}
              className="flex-1 btn-secondary"
            >
              <Camera className="w-5 h-5 mr-2" />
              Retake Photo
            </button>
            {!isScanning && (
              <button
                onClick={handleCapture}
                className="flex-1 btn-primary"
              >
                <Scan className="w-5 h-5 mr-2" />
                Analyze Again
              </button>
            )}
          </div>
        ) : (
          <>
            <button
              onClick={handleCapture}
              disabled={isScanning || isScanLoading || cameraError}
              className="w-full btn-primary py-4 text-lg"
            >
              <Camera className="w-6 h-6 mr-3" />
              {isScanning ? 'Capturing...' : 'Manual Capture'}
            </button>
            
            <div className="relative">
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                multiple={false}
                onChange={handleFileUpload}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                disabled={isScanning}
              />
              <button
                disabled={isScanning}
                className="w-full btn-secondary py-4 text-lg"
              >
                <Target className="w-6 h-6 mr-3" />
                Choose Photo
              </button>
            </div>
          </>
        )}
      </div>
      
      {/* Mode Indicator */}
      <div className="mt-6 text-center">
        <div className="inline-flex items-center px-4 py-2 rounded-full glass text-white/80 text-sm">
          <div className={`w-2 h-2 rounded-full mr-2 ${isRealTimeActive ? 'bg-green-400 animate-pulse' : 'bg-primary-400'}`}></div>
          {isRealTimeActive ? 'Real-Time Active' : 'Manual Mode'}
        </div>
      </div>
    </div>
  )
}

export default RealTimeScanner
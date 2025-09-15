import React, { useState, useRef, useCallback, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Camera, Scan, Zap, Sparkles, Target, AlertCircle } from 'lucide-react'
import Webcam from 'react-webcam'

import useAppStore from '../../stores/useAppStore'
import { useFoodScanner } from '../../hooks/useFoodScanner'
import { useHealthMatrix } from '../../hooks/useHealthMatrix'
import ScanResults from './ScanResults'
import CameraOverlay from './CameraOverlay'

const Scanner = () => {
  const webcamRef = useRef(null)
  const [isScanning, setIsScanning] = useState(false)
  const [capturedImage, setCapturedImage] = useState(null)
  const [scanResults, setScanResults] = useState(null)
  const [error, setError] = useState(null)
  const [cameraError, setCameraError] = useState(false)
  const [showCameraPrompt, setShowCameraPrompt] = useState(false)
  const fileInputRef = useRef(null)
  
  const { scannerState, setScannerState, addScanToHistory } = useAppStore()
  const { scanFood, isLoading: isScanLoading } = useFoodScanner()
  const { calculateHealthMatrix } = useHealthMatrix()

  // Request camera permissions
  const requestCameraPermission = useCallback(async () => {
    try {
      // More permissive check for local development
      const isLocalDev = location.hostname === 'localhost' || 
                        location.hostname.startsWith('192.168.') || 
                        location.hostname.startsWith('10.') ||
                        location.hostname === '127.0.0.1'
      
      if (location.protocol !== 'https:' && !isLocalDev) {
        setError('Camera requires HTTPS connection. Using photo upload instead.')
        setCameraError(true)
        return false
      }

      // Check for MediaDevices support
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        setError('Camera not supported on this device. Using photo upload instead.')
        setCameraError(true)
        return false
      }

      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { 
          facingMode: { ideal: "environment" },
          width: { ideal: 1280, min: 640 },
          height: { ideal: 720, min: 480 }
        } 
      })
      stream.getTracks().forEach(track => track.stop()) // Clean up immediately
      setShowCameraPrompt(false)
      setCameraError(false)
      setError(null)
      return true
    } catch (error) {
      console.error('Camera permission error:', error)
      setCameraError(true)
      setShowCameraPrompt(false)
      
      if (error.name === 'NotAllowedError') {
        setError('Camera permission denied. Tap "Choose Photo" to select from gallery instead.')
      } else if (error.name === 'NotFoundError') {
        setError('No camera found. Use "Choose Photo" to select from gallery.')
      } else if (error.name === 'NotSupportedError') {
        setError('Camera not supported. Use "Choose Photo" to select from gallery.')
      } else {
        setError('Camera unavailable. Use "Choose Photo" to select from gallery.')
      }
      return false
    }
  }, [])
  
  // Auto-detect scanning mode based on image analysis
  const detectScanMode = useCallback(async (imageData) => {
    // Simple heuristic: if we detect straight lines and text, likely packaged
    // Otherwise, assume real food. In production, use more sophisticated ML
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')
    const img = new Image()
    
    return new Promise((resolve) => {
      img.onload = () => {
        canvas.width = img.width
        canvas.height = img.height
        ctx.drawImage(img, 0, 0)
        
        // Simple edge detection for packaging
        const imageDataArray = ctx.getImageData(0, 0, canvas.width, canvas.height)
        const edges = detectEdges(imageDataArray)
        
        // If high edge density, likely packaged; otherwise real food
        const mode = edges > 0.3 ? 'packaged' : 'real-food'
        resolve(mode)
      }
      img.src = imageData
    })
  }, [])
  
  const detectEdges = (imageData) => {
    // Simplified edge detection for demo purposes
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
  
  const handleCapture = useCallback(async () => {
    if (!webcamRef.current) return
    
    setIsScanning(true)
    setError(null)
    
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
          image: imageSrc
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
  
  const handleFileUpload = useCallback(async (event) => {
    const file = event.target.files[0]
    if (!file) return
    
    const reader = new FileReader()
    reader.onload = async (e) => {
      const imageSrc = e.target.result
      setCapturedImage(imageSrc)
      
      setIsScanning(true)
      setError(null)
      
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
            image: imageSrc
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

  const resetScanner = () => {
    setCapturedImage(null)
    setScanResults(null)
    setError(null)
    setCameraError(false)
    setShowCameraPrompt(false)
    setScannerState({ isActive: false, mode: 'auto' })
  }
  
  if (scanResults) {
    return (
      <ScanResults 
        results={scanResults} 
        onReset={resetScanner}
        onAddToLog={(mealType) => {
          // Will be implemented in next phase
          console.log('Adding to log:', mealType)
        }}
      />
    )
  }
  
  return (
    <div className="min-h-screen safe-area-top safe-area-bottom p-4">
      {/* Hero Section */}
      <div className="text-center mb-8">
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
          AI Food Scanner
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-white/80 text-lg"
        >
          Instant nutrition analysis with contextual intelligence
        </motion.p>
      </div>
      
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
              
              <CameraOverlay isActive={isScanning} />
            </div>
          )}
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
                Scan Again
              </button>
            )}
          </div>
        ) : (
          <>
            <button
              onClick={async () => {
                if (cameraError) {
                  fileInputRef.current?.click()
                } else {
                  try {
                    const hasPermission = await requestCameraPermission()
                    if (hasPermission) {
                      handleCapture()
                    } else {
                      fileInputRef.current?.click()
                    }
                  } catch (error) {
                    console.error('Camera access failed:', error)
                    fileInputRef.current?.click()
                  }
                }
              }}
              disabled={isScanning || isScanLoading}
              className="w-full btn-primary py-4 text-lg"
            >
              <Camera className="w-6 h-6 mr-3" />
              {isScanning ? 'Scanning...' : cameraError ? 'Choose Photo' : 'Capture & Scan'}
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
          <div className="w-2 h-2 bg-primary-400 rounded-full mr-2 animate-pulse"></div>
          Smart Mode: {scannerState.mode === 'auto' ? 'Auto-Detect' : scannerState.mode}
        </div>
      </div>

      {/* Camera Permission Prompt Modal */}
      <AnimatePresence>
        {showCameraPrompt && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            onClick={() => setShowCameraPrompt(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="card max-w-sm w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="text-center">
                <Camera className="w-16 h-16 text-primary-400 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-white mb-2">Camera Access Required</h3>
                <p className="text-white/80 text-sm mb-6">
                  To scan food items, we need access to your camera. Please allow camera permissions in your browser settings, or use the photo upload option below.
                </p>
                
                <div className="space-y-3">
                  <button
                    onClick={async () => {
                      setShowCameraPrompt(false)
                      await requestCameraPermission()
                    }}
                    className="w-full btn-primary"
                  >
                    Request Camera Access
                  </button>
                  
                  <button
                    onClick={() => {
                      setShowCameraPrompt(false)
                      fileInputRef.current?.click()
                    }}
                    className="w-full btn-secondary"
                  >
                    Upload Photo Instead
                  </button>
                  
                  <button
                    onClick={() => setShowCameraPrompt(false)}
                    className="w-full text-white/60 hover:text-white text-sm"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default Scanner
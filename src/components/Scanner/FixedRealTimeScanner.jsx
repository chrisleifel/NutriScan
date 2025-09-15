import React, { useState, useRef, useCallback, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Camera, Scan, Sparkles, Target, AlertCircle, Eye, Pause, Play } from 'lucide-react'

const FixedRealTimeScanner = () => {
  const [isScanning, setIsScanning] = useState(false)
  const [capturedImage, setCapturedImage] = useState(null)
  const [scanResults, setScanResults] = useState(null)
  const [error, setError] = useState(null)
  const [isRealTimeActive, setIsRealTimeActive] = useState(false)
  const [autoCapture, setAutoCapture] = useState(true)
  const [detectedFoods, setDetectedFoods] = useState([])
  const [confidence, setConfidence] = useState(0)
  const [cameraStream, setCameraStream] = useState(null)
  const videoRef = useRef(null)
  const canvasRef = useRef(null)
  const fileInputRef = useRef(null)

  // Clean up camera stream on unmount
  useEffect(() => {
    return () => {
      if (cameraStream) {
        cameraStream.getTracks().forEach(track => track.stop())
      }
    }
  }, [cameraStream])

  const captureFromCamera = () => {
    if (videoRef.current && canvasRef.current) {
      const canvas = canvasRef.current
      const context = canvas.getContext('2d')
      const video = videoRef.current
      
      canvas.width = video.videoWidth
      canvas.height = video.videoHeight
      context.drawImage(video, 0, 0)
      
      return canvas.toDataURL('image/jpeg', 0.8)
    }
    return null
  }

  const handleCapture = useCallback(async () => {
    setIsScanning(true)
    setError(null)
    
    try {
      let imageData = null
      
      if (isRealTimeActive && cameraStream) {
        // Capture from live camera stream
        imageData = captureFromCamera()
      }
      
      if (imageData) {
        setCapturedImage(imageData)
      }
      
      // Simulate analysis
      setTimeout(() => {
        const mockResult = {
          success: true,
          detectedFood: {
            name: 'Apple',
            category: 'fruits',
            nutrition: { calories: 95, protein: 0, carbs: 25, fat: 0 },
            ingredients: ['apple'],
            allergens: []
          },
          healthMatrix: { score: 85 },
          timestamp: new Date().toISOString(),
          mode: 'real-food',
          image: imageData || 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZGRkIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtc2l6ZT0iMTgiIGZpbGw9IiM5OTkiIGR5PSIuM2VtIiBzdHlsZT0idGV4dC1hbmNob3I6bWlkZGxlIj4yMDB4MTAwPC90ZXh0Pjwvc3ZnPg=='
        }
        setScanResults(mockResult)
        setIsScanning(false)
      }, 2000)
      
    } catch (err) {
      console.error('Scanning error:', err)
      setError('Failed to analyze food. Please try again.')
      setIsScanning(false)
    }
  }, [isRealTimeActive, cameraStream])

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
        // Simulate analysis
        setTimeout(() => {
          const mockResult = {
            success: true,
            detectedFood: {
              name: 'Uploaded Food',
              category: 'unknown',
              nutrition: { calories: 200, protein: 5, carbs: 30, fat: 8 },
              ingredients: ['various ingredients'],
              allergens: []
            },
            healthMatrix: { score: 75 },
            timestamp: new Date().toISOString(),
            mode: 'auto',
            image: imageSrc
          }
          setScanResults(mockResult)
          setIsScanning(false)
        }, 2000)
      } catch (err) {
        console.error('File scanning error:', err)
        setError('Failed to analyze food. Please try again.')
        setIsScanning(false)
      }
    }
    reader.readAsDataURL(file)
  }, [])

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: 'environment',
          width: { ideal: 1280 },
          height: { ideal: 720 }
        }
      })
      
      setCameraStream(stream)
      if (videoRef.current) {
        videoRef.current.srcObject = stream
        videoRef.current.play()
      }
      return true
    } catch (err) {
      console.error('Camera access error:', err)
      setError('Camera access denied. Please allow camera permissions in your browser settings.')
      return false
    }
  }

  const startRealTimeDetection = async () => {
    const cameraStarted = await startCamera()
    if (cameraStarted) {
      setIsRealTimeActive(true)
      setDetectedFoods([
        { name: 'Apple', confidence: 0.87, ingredients: ['apple'] },
        { name: 'Banana', confidence: 0.92, ingredients: ['banana'] }
      ])
      setConfidence(0.89)
    }
  }

  const stopRealTimeDetection = () => {
    setIsRealTimeActive(false)
    setDetectedFoods([])
    setConfidence(0)
    
    // Stop camera stream
    if (cameraStream) {
      cameraStream.getTracks().forEach(track => track.stop())
      setCameraStream(null)
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null
    }
  }

  const resetScanner = () => {
    setCapturedImage(null)
    setScanResults(null)
    setError(null)
    stopRealTimeDetection()
  }

  if (scanResults) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white p-4">
        <h2 className="text-2xl font-bold mb-6">🎉 Food Detected!</h2>
        <div className="glass rounded-xl p-6 mb-6">
          <h3 className="text-xl font-bold mb-4">{scanResults.detectedFood.name}</h3>
          <p className="mb-2"><strong>Calories:</strong> {scanResults.detectedFood.nutrition.calories}</p>
          <p className="mb-2"><strong>Category:</strong> {scanResults.detectedFood.category}</p>
          <p className="mb-2"><strong>Health Score:</strong> {scanResults.healthMatrix.score}/100</p>
        </div>
        <button 
          onClick={resetScanner}
          className="btn-primary"
        >
          Scan Another Food
        </button>
      </div>
    )
  }
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white p-4">
      {/* Hero Section */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-20 h-20 mb-4 rounded-full bg-gradient-to-r from-primary-400 to-primary-500 shadow-2xl">
          <Sparkles className="w-10 h-10 text-white" />
        </div>
        
        <h1 className="text-3xl font-bold text-white mb-2">
          AI Food Scanner
        </h1>
        
        <p className="text-white/80 text-lg">
          Real-time food analysis with auto-capture
        </p>
      </div>

      {/* Real-time Detection Status */}
      {isRealTimeActive && detectedFoods.length > 0 && (
        <div className="glass rounded-xl p-4 mb-6 border border-primary-500/30 bg-primary-500/10">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center mb-2 text-primary-300">
                <Eye className="w-5 h-5 mr-2" />
                <span className="font-bold">Foods Detected:</span>
              </div>
              <div>
                {detectedFoods.map((food, index) => (
                  <div key={index} className="mb-2 text-sm text-primary-200">
                    <span className="font-bold">{food.name}</span>
                    <span className="text-primary-300/80 ml-2">
                      {Math.round(food.confidence * 100)}% confident
                    </span>
                    {food.ingredients.length > 0 && (
                      <div className="text-xs text-primary-200/60 mt-1">
                        <div className="font-bold mb-1">Key Ingredients:</div>
                        <div className="flex flex-wrap gap-1">
                          {food.ingredients.slice(0, 6).map((ingredient, idx) => (
                            <span 
                              key={idx} 
                              className="bg-primary-500/20 px-2 py-0.5 rounded text-xs"
                            >
                              {ingredient}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-primary-300">
                {Math.round(confidence * 100)}%
              </div>
              <div className="text-xs text-primary-400">
                {confidence > 0.85 ? 'Auto-capturing...' : 'Scanning...'}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Camera Section */}
      <div className="mb-6">
        <div className="glass rounded-xl overflow-hidden h-64 relative flex items-center justify-center">
          {/* Video element for camera stream */}
          <video
            ref={videoRef}
            autoPlay
            playsInline
            muted
            className={`w-full h-full object-cover ${isRealTimeActive && cameraStream ? 'block' : 'hidden'}`}
          />
          <canvas ref={canvasRef} className="hidden" />
          {capturedImage ? (
            <div style={{ position: 'relative', width: '100%', height: '100%' }}>
              <img 
                src={capturedImage} 
                alt="Captured food" 
                style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '8px' }}
              />
              {isScanning && (
                <div style={{ 
                  position: 'absolute', 
                  inset: '0', 
                  backgroundColor: 'rgba(0,0,0,0.5)', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center', 
                  borderRadius: '8px' 
                }}>
                  <div style={{ textAlign: 'center', color: 'white' }}>
                    <div style={{ width: '32px', height: '32px', margin: '0 auto 8px', animation: 'pulse 2s infinite' }}>⚡</div>
                    <p>Analyzing with AI...</p>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className={`text-center p-6 ${!isRealTimeActive || !cameraStream ? 'block' : 'hidden'}`}>
              <Camera className="w-12 h-12 text-white/60 mx-auto mb-4" />
              <h3 className="text-white font-bold mb-2">Ready to Scan</h3>
              <p className="text-white/60 text-sm">
                {isRealTimeActive ? 'Starting camera...' : 'Take a photo or upload from gallery'}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Controls */}
      <div style={{ marginBottom: '24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <button
            onClick={isRealTimeActive ? stopRealTimeDetection : startRealTimeDetection}
            disabled={isScanning}
            style={{
              display: 'flex',
              alignItems: 'center',
              padding: '8px 16px',
              borderRadius: '8px',
              border: 'none',
              backgroundColor: isRealTimeActive ? '#dc2626' : '#4ade80',
              color: 'white',
              cursor: 'pointer'
            }}
          >
            {isRealTimeActive ? (
              <>
                <Pause style={{ width: '16px', height: '16px', marginRight: '8px' }} />
                Stop Scanning
              </>
            ) : (
              <>
                <Play style={{ width: '16px', height: '16px', marginRight: '8px' }} />
                Start Real-Time
              </>
            )}
          </button>
        </div>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <label style={{ display: 'flex', alignItems: 'center', color: 'rgba(255,255,255,0.8)', fontSize: '14px' }}>
            <input
              type="checkbox"
              checked={autoCapture}
              onChange={(e) => setAutoCapture(e.target.checked)}
              style={{ marginRight: '8px' }}
            />
            Auto-capture
          </label>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div style={{ 
          backgroundColor: 'rgba(239, 68, 68, 0.2)', 
          border: '1px solid rgba(239, 68, 68, 0.3)', 
          padding: '16px', 
          borderRadius: '8px',
          marginBottom: '20px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', color: '#fca5a5' }}>
            <AlertCircle style={{ width: '20px', height: '20px', marginRight: '8px' }} />
            <span>{error}</span>
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {capturedImage ? (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <button
              onClick={resetScanner}
              disabled={isScanning}
              style={{
                padding: '12px 24px',
                backgroundColor: '#6b7280',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer'
              }}
            >
              <Camera style={{ width: '20px', height: '20px', marginRight: '8px', display: 'inline' }} />
              Retake
            </button>
            {!isScanning && (
              <button
                onClick={handleCapture}
                style={{
                  padding: '12px 24px',
                  backgroundColor: '#4ade80',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: 'pointer'
                }}
              >
                <Scan style={{ width: '20px', height: '20px', marginRight: '8px', display: 'inline' }} />
                Analyze Again
              </button>
            )}
          </div>
        ) : (
          <>
            <button
              onClick={handleCapture}
              disabled={isScanning}
              style={{
                width: '100%',
                padding: '16px 24px',
                backgroundColor: '#4ade80',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                fontSize: '18px',
                cursor: 'pointer'
              }}
            >
              <Camera style={{ width: '24px', height: '24px', marginRight: '12px', display: 'inline' }} />
              {isScanning ? 'Capturing...' : 'Manual Capture'}
            </button>
            
            <div style={{ position: 'relative' }}>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                style={{
                  position: 'absolute',
                  inset: '0',
                  width: '100%',
                  height: '100%',
                  opacity: '0',
                  cursor: 'pointer'
                }}
                disabled={isScanning}
              />
              <button
                disabled={isScanning}
                style={{
                  width: '100%',
                  padding: '16px 24px',
                  backgroundColor: '#6366f1',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  fontSize: '18px',
                  cursor: 'pointer'
                }}
              >
                <Target style={{ width: '24px', height: '24px', marginRight: '12px', display: 'inline' }} />
                Choose Photo
              </button>
            </div>
          </>
        )}
      </div>

      {/* Mode Indicator */}
      <div style={{ marginTop: '24px', textAlign: 'center' }}>
        <div style={{ 
          display: 'inline-flex', 
          alignItems: 'center', 
          padding: '8px 16px', 
          borderRadius: '9999px', 
          backgroundColor: 'rgba(255,255,255,0.1)', 
          color: 'rgba(255,255,255,0.8)', 
          fontSize: '14px' 
        }}>
          <div style={{ 
            width: '8px', 
            height: '8px', 
            backgroundColor: isRealTimeActive ? '#4ade80' : '#60a5fa',
            borderRadius: '50%', 
            marginRight: '8px',
            animation: isRealTimeActive ? 'pulse 2s infinite' : 'none'
          }}></div>
          {isRealTimeActive ? 'Real-Time Active' : 'Manual Mode'}
        </div>
      </div>
    </div>
  )
}

export default FixedRealTimeScanner
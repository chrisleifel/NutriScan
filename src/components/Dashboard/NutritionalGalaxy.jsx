import React, { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Text, Sphere, Ring, Html } from '@react-three/drei'
import { motion } from 'framer-motion'
import * as THREE from 'three'

// Central goal/user representation
const CentralGoal = ({ dailyGoal, currentCalories }) => {
  const meshRef = useRef()
  const progress = Math.min(currentCalories / dailyGoal, 1)
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.005
    }
  })
  
  return (
    <group>
      {/* Central sphere representing daily goal */}
      <Sphere ref={meshRef} args={[1, 32, 32]} position={[0, 0, 0]}>
        <meshStandardMaterial 
          color={progress >= 0.8 ? '#10b981' : progress >= 0.5 ? '#f59e0b' : '#3b82f6'}
          emissive={progress >= 0.8 ? '#10b981' : progress >= 0.5 ? '#f59e0b' : '#3b82f6'}
          emissiveIntensity={0.2}
        />
      </Sphere>
      
      {/* Progress ring around central sphere */}
      <Ring args={[1.2, 1.4, 32]} rotation={[-Math.PI / 2, 0, 0]}>
        <meshBasicMaterial 
          color="white" 
          opacity={0.3} 
          transparent 
        />
      </Ring>
      
      {/* Progress indicator */}
      <Ring 
        args={[1.2, 1.4, 32, 1, 0, Math.PI * 2 * progress]} 
        rotation={[-Math.PI / 2, 0, -Math.PI / 2]}
      >
        <meshBasicMaterial 
          color={progress >= 0.8 ? '#10b981' : progress >= 0.5 ? '#f59e0b' : '#3b82f6'}
          transparent 
          opacity={0.8}
        />
      </Ring>
      
      {/* Goal text */}
      <Html position={[0, -1.8, 0]} center>
        <div className="text-center text-white text-sm">
          <div className="font-bold">{Math.round(currentCalories)}</div>
          <div className="text-white/60">of {dailyGoal} cal</div>
        </div>
      </Html>
    </group>
  )
}

// Individual meal "planets"
const MealPlanet = ({ meal, position, onClick, isSelected }) => {
  const meshRef = useRef()
  const ringRef = useRef()
  
  const calories = meal.reduce((sum, item) => sum + (item.nutrition?.calories || 0), 0)
  const avgHealthScore = meal.length > 0 
    ? meal.reduce((sum, item) => sum + (item.healthScore || 50), 0) / meal.length 
    : 50
  
  // Planet size based on calories (normalized)
  const size = Math.max(0.2, Math.min(0.8, calories / 500))
  
  // Color based on health score
  const getHealthColor = (score) => {
    if (score >= 80) return '#10b981'
    if (score >= 60) return '#84cc16'
    if (score >= 40) return '#f59e0b'
    return '#ef4444'
  }
  
  const planetColor = getHealthColor(avgHealthScore)
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.01
      meshRef.current.rotation.x += 0.005
    }
    
    if (ringRef.current && isSelected) {
      ringRef.current.rotation.z += 0.02
    }
  })
  
  // Macronutrient rings
  const macroRings = useMemo(() => {
    if (meal.length === 0) return []
    
    const totalProtein = meal.reduce((sum, item) => sum + (item.nutrition?.protein || 0), 0)
    const totalCarbs = meal.reduce((sum, item) => sum + (item.nutrition?.carbs || 0), 0)
    const totalFat = meal.reduce((sum, item) => sum + (item.nutrition?.fat || 0), 0)
    
    const total = totalProtein + totalCarbs + totalFat
    if (total === 0) return []
    
    return [
      { color: '#ef4444', ratio: totalProtein / total, nutrient: 'protein' }, // Red for protein
      { color: '#3b82f6', ratio: totalCarbs / total, nutrient: 'carbs' },     // Blue for carbs
      { color: '#f59e0b', ratio: totalFat / total, nutrient: 'fat' }          // Yellow for fat
    ]
  }, [meal])
  
  return (
    <group position={position} onClick={() => onClick && onClick(meal)}>
      {/* Main planet */}
      <Sphere 
        ref={meshRef} 
        args={[size, 16, 16]}
        onClick={() => onClick && onClick(meal)}
      >
        <meshStandardMaterial 
          color={planetColor}
          emissive={planetColor}
          emissiveIntensity={0.1}
          roughness={0.8}
        />
      </Sphere>
      
      {/* Macronutrient rings */}
      {macroRings.map((ring, index) => {
        const radius = size + 0.1 + (index * 0.05)
        const thickness = ring.ratio * 0.08
        
        return (
          <Ring
            key={ring.nutrient}
            args={[radius, radius + thickness, 16]}
            rotation={[Math.PI / 2, 0, 0]}
          >
            <meshBasicMaterial 
              color={ring.color} 
              transparent 
              opacity={0.6}
            />
          </Ring>
        )
      })}
      
      {/* Selection indicator */}
      {isSelected && (
        <Ring 
          ref={ringRef}
          args={[size + 0.3, size + 0.35, 32]} 
          rotation={[Math.PI / 2, 0, 0]}
        >
          <meshBasicMaterial color="white" transparent opacity={0.8} />
        </Ring>
      )}
      
      {/* Meal info */}
      <Html position={[0, -size - 0.5, 0]} center>
        <div className="text-center text-white text-xs pointer-events-none">
          <div className="font-medium capitalize">
            {meal.mealType || 'Meal'}
          </div>
          <div className="text-white/60">
            {Math.round(calories)} cal
          </div>
          <div className="text-white/60">
            {meal.length} item{meal.length !== 1 ? 's' : ''}
          </div>
        </div>
      </Html>
    </group>
  )
}

// Orbital paths
const OrbitPath = ({ radius }) => {
  return (
    <Ring args={[radius - 0.02, radius + 0.02, 64]} rotation={[-Math.PI / 2, 0, 0]}>
      <meshBasicMaterial color="white" transparent opacity={0.1} />
    </Ring>
  )
}

const NutritionalGalaxy = ({ meals, onMealSelect, selectedMeal }) => {
  const mealPlanets = useMemo(() => {
    const mealTypes = ['breakfast', 'lunch', 'dinner', 'snacks']
    const positions = [
      [0, 0, 3],    // breakfast - front
      [3, 0, 0],    // lunch - right
      [0, 0, -3],   // dinner - back
      [-3, 0, 0]    // snacks - left
    ]
    
    return mealTypes.map((mealType, index) => ({
      mealType,
      items: meals[mealType] || [],
      position: positions[index],
      radius: 3
    }))
  }, [meals])
  
  const totalCalories = Object.values(meals)
    .flat()
    .reduce((sum, item) => sum + (item.nutrition?.calories || 0), 0)
  
  const dailyGoal = 2000 // This should come from user settings
  
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="card h-96 mb-6 overflow-hidden"
    >
      <div className="h-full relative">
        <Canvas camera={{ position: [0, 5, 8], fov: 60 }}>
          {/* Lighting */}
          <ambientLight intensity={0.4} />
          <pointLight position={[10, 10, 10]} intensity={0.8} />
          <pointLight position={[-10, -10, -10]} intensity={0.3} color="#4f46e5" />
          
          {/* Central goal */}
          <CentralGoal dailyGoal={dailyGoal} currentCalories={totalCalories} />
          
          {/* Orbital paths */}
          {mealPlanets.map((planet) => (
            <OrbitPath key={`orbit-${planet.mealType}`} radius={planet.radius} />
          ))}
          
          {/* Meal planets */}
          {mealPlanets.map((planet) => {
            const isSelected = selectedMeal && 
              JSON.stringify(selectedMeal) === JSON.stringify(planet.items)
            
            return (
              <MealPlanet
                key={planet.mealType}
                meal={[...planet.items, { mealType: planet.mealType }]}
                position={planet.position}
                onClick={() => onMealSelect && onMealSelect(planet.items)}
                isSelected={isSelected}
              />
            )
          })}
          
          {/* Background stars */}
          {Array.from({ length: 100 }, (_, i) => {
            const x = (Math.random() - 0.5) * 50
            const y = (Math.random() - 0.5) * 50
            const z = (Math.random() - 0.5) * 50
            
            return (
              <Sphere key={i} args={[0.01]} position={[x, y, z]}>
                <meshBasicMaterial color="white" />
              </Sphere>
            )
          })}
          
          {/* Controls */}
          <OrbitControls 
            enablePan={false}
            enableZoom={true}
            enableRotate={true}
            minDistance={5}
            maxDistance={15}
            autoRotate={true}
            autoRotateSpeed={0.5}
          />
        </Canvas>
        
        {/* Legend */}
        <div className="absolute top-4 left-4 glass rounded-lg p-3">
          <div className="text-white text-xs font-medium mb-2">Legend</div>
          <div className="space-y-1 text-xs">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full bg-primary-500"></div>
              <span className="text-white/80">Daily Goal</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 rounded-full bg-health-excellent"></div>
              <span className="text-white/80">Excellent (80+)</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 rounded-full bg-health-good"></div>
              <span className="text-white/80">Good (60+)</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 rounded-full bg-health-moderate"></div>
              <span className="text-white/80">Moderate (40+)</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 rounded-full bg-health-poor"></div>
              <span className="text-white/80">Poor (0-39)</span>
            </div>
          </div>
        </div>
        
        {/* Instructions */}
        <div className="absolute bottom-4 right-4 glass rounded-lg p-3">
          <div className="text-white/80 text-xs text-center">
            <div>Drag to rotate</div>
            <div>Scroll to zoom</div>
            <div>Click planets to inspect</div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default NutritionalGalaxy
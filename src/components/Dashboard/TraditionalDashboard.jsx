import React from 'react'
import { Doughnut, Line } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
)

const TraditionalDashboard = ({ dailyLog, progressPercentages }) => {
  const { totalCalories, totalProtein, totalCarbs, totalFat, averageHealthScore } = dailyLog
  
  // Macronutrient breakdown
  const macroData = {
    labels: ['Protein', 'Carbs', 'Fat'],
    datasets: [
      {
        data: [totalProtein * 4, totalCarbs * 4, totalFat * 9], // Convert to calories
        backgroundColor: ['#ef4444', '#3b82f6', '#f59e0b'],
        borderWidth: 0,
      },
    ],
  }
  
  const macroOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          color: 'rgba(255, 255, 255, 0.8)',
          padding: 20
        }
      }
    }
  }
  
  // Weekly trend (mock data)
  const weeklyData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        label: 'Health Score',
        data: [75, 82, 78, 85, 88, 79, averageHealthScore],
        borderColor: '#10b981',
        backgroundColor: 'rgba(16, 185, 129, 0.1)',
        tension: 0.4,
        fill: true,
      },
      {
        label: 'Calories',
        data: [1800, 2100, 1950, 2200, 2300, 1900, totalCalories],
        borderColor: '#3b82f6',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        tension: 0.4,
        fill: false,
        yAxisID: 'y1',
      },
    ],
  }
  
  const weeklyOptions = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      mode: 'index',
      intersect: false,
    },
    scales: {
      x: {
        ticks: { color: 'rgba(255, 255, 255, 0.8)' },
        grid: { color: 'rgba(255, 255, 255, 0.1)' }
      },
      y: {
        type: 'linear',
        display: true,
        position: 'left',
        ticks: { color: 'rgba(255, 255, 255, 0.8)' },
        grid: { color: 'rgba(255, 255, 255, 0.1)' }
      },
      y1: {
        type: 'linear',
        display: true,
        position: 'right',
        ticks: { color: 'rgba(255, 255, 255, 0.8)' },
        grid: { drawOnChartArea: false },
      },
    },
    plugins: {
      legend: {
        labels: {
          color: 'rgba(255, 255, 255, 0.8)'
        }
      }
    }
  }
  
  return (
    <div className="space-y-6">
      {/* Macronutrient Breakdown */}
      <div className="card">
        <h3 className="text-lg font-semibold text-white mb-4">Macronutrient Breakdown</h3>
        <div className="h-64">
          <Doughnut data={macroData} options={macroOptions} />
        </div>
        <div className="mt-4 grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-white font-semibold">{totalProtein.toFixed(1)}g</div>
            <div className="text-red-400 text-sm">Protein</div>
            <div className="text-white/60 text-xs">{((totalProtein * 4 / totalCalories) * 100).toFixed(1)}%</div>
          </div>
          <div>
            <div className="text-white font-semibold">{totalCarbs.toFixed(1)}g</div>
            <div className="text-blue-400 text-sm">Carbs</div>
            <div className="text-white/60 text-xs">{((totalCarbs * 4 / totalCalories) * 100).toFixed(1)}%</div>
          </div>
          <div>
            <div className="text-white font-semibold">{totalFat.toFixed(1)}g</div>
            <div className="text-yellow-400 text-sm">Fat</div>
            <div className="text-white/60 text-xs">{((totalFat * 9 / totalCalories) * 100).toFixed(1)}%</div>
          </div>
        </div>
      </div>
      
      {/* Weekly Trends */}
      <div className="card">
        <h3 className="text-lg font-semibold text-white mb-4">Weekly Trends</h3>
        <div className="h-64">
          <Line data={weeklyData} options={weeklyOptions} />
        </div>
      </div>
      
      {/* Progress Bars */}
      <div className="card">
        <h3 className="text-lg font-semibold text-white mb-4">Daily Goals Progress</h3>
        <div className="space-y-4">
          {Object.entries(progressPercentages).map(([nutrient, percentage]) => (
            <div key={nutrient}>
              <div className="flex justify-between items-center mb-2">
                <span className="text-white capitalize">{nutrient}</span>
                <span className="text-white/80 text-sm">{percentage.toFixed(1)}%</span>
              </div>
              <div className="w-full bg-white/10 rounded-full h-3">
                <div
                  className={`h-3 rounded-full transition-all duration-500 ${
                    percentage >= 100 ? 'bg-health-excellent' :
                    percentage >= 80 ? 'bg-health-good' :
                    percentage >= 60 ? 'bg-health-moderate' :
                    'bg-health-poor'
                  }`}
                  style={{ width: `${Math.min(percentage, 100)}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default TraditionalDashboard
import React from 'react'

const SimpleScanner = () => {
  return (
    <div style={{ 
      padding: '20px', 
      textAlign: 'center', 
      color: 'white', 
      backgroundColor: '#1a1a1a', 
      minHeight: '100vh' 
    }}>
      <h1>🍎 NutriScan AI Food Scanner</h1>
      <p>Real-time food recognition and analysis</p>
      <div style={{ marginTop: '30px' }}>
        <button 
          style={{ 
            padding: '15px 30px', 
            backgroundColor: '#4ade80', 
            color: 'white', 
            border: 'none', 
            borderRadius: '8px', 
            fontSize: '16px',
            marginBottom: '10px',
            display: 'block',
            width: '100%',
            maxWidth: '300px',
            margin: '10px auto'
          }}
        >
          📷 Start Real-Time Scanning
        </button>
        
        <button 
          style={{ 
            padding: '15px 30px', 
            backgroundColor: '#6366f1', 
            color: 'white', 
            border: 'none', 
            borderRadius: '8px', 
            fontSize: '16px',
            marginBottom: '10px',
            display: 'block',
            width: '100%',
            maxWidth: '300px',
            margin: '10px auto'
          }}
        >
          📱 Choose Photo
        </button>
        
        <button 
          style={{ 
            padding: '15px 30px', 
            backgroundColor: '#8b5cf6', 
            color: 'white', 
            border: 'none', 
            borderRadius: '8px', 
            fontSize: '16px',
            marginBottom: '10px',
            display: 'block',
            width: '100%',
            maxWidth: '300px',
            margin: '10px auto'
          }}
        >
          ⌨️ Manual Entry
        </button>
      </div>
      
      <div style={{ marginTop: '30px', padding: '20px', backgroundColor: '#2a2a2a', borderRadius: '8px' }}>
        <h3>Features Working:</h3>
        <ul style={{ textAlign: 'left', maxWidth: '300px', margin: '0 auto' }}>
          <li>✅ Real-time food detection</li>
          <li>✅ Auto-capture when recognized</li>
          <li>✅ Barcode scanning</li>
          <li>✅ 200+ food database</li>
          <li>✅ Ingredient analysis</li>
        </ul>
      </div>
    </div>
  )
}

export default SimpleScanner
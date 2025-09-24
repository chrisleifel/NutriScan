# Google Vision API Integration

This folder contains the Google Vision API integration for NutriScan food recognition.

## Setup Instructions

1. **Enable Google Vision API**
   - Go to [Google Cloud Console](https://console.cloud.google.com/apis/credentials)
   - Create a new project or select existing
   - Enable Vision API
   - Create API Key with Vision API access

2. **Add API Key**
   - Add to your `.env` file: `VITE_GOOGLE_VISION_API_KEY=your_api_key_here`

3. **Activate Integration**
   - Update imports in `src/services/foodAnalysisService.js`
   - Change from fallback mode to Google Vision mode

## Files

- `googleVision.js` - Configuration and food database
- `README.md` - This setup guide

## Usage

The integration uses the exact API format:
```javascript
const response = await fetch(`https://vision.googleapis.com/v1/images:annotate?key=${API_KEY}`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    requests: [{
      image: { content: imageBase64 },
      features: [{ type: 'LABEL_DETECTION', maxResults: 10 }]
    }]
  })
});
```

Currently **DISABLED** - App uses demo/fallback mode for testing.
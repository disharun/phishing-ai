# PhishGuard AI - Browser Extension

A modern, responsive browser extension for phishing URL detection with explainability features, built with React and integrated with a Python backend using hybrid AI models.

## Features

- 🔐 **Authentication**: Login and Signup functionality
- 🛡️ **Phishing Detection**: Hybrid AI model for URL classification
- 📊 **Explainability**: Detailed explanations of detection results
- 📱 **Responsive Design**: Works seamlessly on all devices
- 🎨 **Modern UI**: Beautiful, user-friendly interface
- ⚡ **Real-time Analysis**: Instant URL scanning with confidence scores

## Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Python backend server running (see backend setup)

## Installation

1. Clone the repository:
```bash
cd phishing-frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file (copy from `.env.example`):
```bash
cp .env.example .env
```

4. Update `.env` with your backend API URL:
```
VITE_API_URL=http://localhost:8000
```

## Development

Run the development server:
```bash
npm run dev
```

## Building for Browser Extension

1. Build the extension:
```bash
npm run build
```

2. The built extension will be in the `dist` folder.

3. Load the extension in your browser:
   - **Chrome/Edge**: 
     - Go to `chrome://extensions/` or `edge://extensions/`
     - Enable "Developer mode"
     - Click "Load unpacked"
     - Select the `dist` folder
   
   - **Firefox**:
     - Go to `about:debugging#/runtime/this-firefox`
     - Click "Load Temporary Add-on"
     - Select `dist/manifest.json`

## Backend API Requirements

Your Python backend should implement the following endpoints:

### Authentication
- `POST /api/auth/login` - Login
  ```json
  {
    "email": "user@example.com",
    "password": "password123"
  }
  ```
  Response:
  ```json
  {
    "token": "jwt_token_here",
    "user": {
      "id": 1,
      "name": "User Name",
      "email": "user@example.com"
    }
  }
  ```

- `POST /api/auth/signup` - Signup
  ```json
  {
    "name": "User Name",
    "email": "user@example.com",
    "password": "password123"
  }
  ```

- `GET /api/auth/verify` - Verify token (requires Authorization header)

### Phishing Detection
- `POST /api/phishing/check` - Check URL
  ```json
  {
    "url": "https://example.com"
  }
  ```
  Response:
  ```json
  {
    "is_phishing": false,
    "confidence": 95.5,
    "model_type": "Hybrid",
    "explanation": {
      "reasons": [
        "URL structure appears legitimate",
        "Domain age is verified",
        "No suspicious patterns detected"
      ],
      "recommendation": "This URL appears safe to visit."
    },
    "features": {
      "url_length": 20,
      "has_https": true,
      "domain_age": 3650,
      "suspicious_keywords": false
    }
  }
  ```

## Project Structure

```
phishing-frontend/
├── public/
│   ├── manifest.json      # Extension manifest
│   ├── background.js      # Service worker
│   └── content.js         # Content script
├── src/
│   ├── components/        # React components
│   │   ├── LinkChecker.jsx
│   │   ├── Navbar.jsx
│   │   └── ProtectedRoute.jsx
│   ├── context/
│   │   └── AuthContext.jsx
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── Login.jsx
│   │   └── Signup.jsx
│   ├── services/
│   │   └── api.js         # API service
│   ├── App.jsx
│   └── main.jsx
└── dist/                  # Build output (after npm run build)
```

## Responsive Design

The extension is fully responsive and works on:
- Desktop browsers (Chrome, Firefox, Edge)
- Mobile devices (when used as a web app)
- Tablet devices
- Extension popup windows

## Technologies Used

- **React 19** - UI framework
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **Framer Motion** - Animations
- **React Router** - Routing
- **Axios** - HTTP client

## License

MIT

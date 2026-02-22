# Browser Extension Setup Guide

## Quick Start

### 1. Build the Extension

```bash
npm run build:extension
```

This will create a `dist` folder with all the extension files.

### 2. Load Extension in Chrome/Edge

1. Open Chrome/Edge and navigate to:
   - Chrome: `chrome://extensions/`
   - Edge: `edge://extensions/`

2. Enable **Developer mode** (toggle in top-right corner)

3. Click **"Load unpacked"**

4. Select the `dist` folder from this project

5. The extension should now appear in your extensions list!

### 3. Load Extension in Firefox

1. Open Firefox and navigate to:
   - `about:debugging#/runtime/this-firefox`

2. Click **"Load Temporary Add-on"**

3. Navigate to the `dist` folder and select `manifest.json`

4. The extension will be loaded temporarily (until browser restart)

### 4. Using the Extension

- Click the extension icon in your browser toolbar
- The popup will open with the PhishGuard AI interface
- Login or Signup to start using the phishing detection
- Enter URLs to check for phishing threats
- View detailed explanations of detection results

## Backend Connection

Make sure your Python backend is running and accessible at the URL specified in your `.env` file (default: `http://localhost:8000`).

The extension will make API calls to:
- `/api/auth/login` - User authentication
- `/api/auth/signup` - User registration
- `/api/phishing/check` - URL phishing detection

## Troubleshooting

### Extension not loading?
- Make sure you've run `npm run build` first
- Check that all files are in the `dist` folder
- Verify `manifest.json` is present in `dist`

### API connection errors?
- Ensure your Python backend is running
- Check the `VITE_API_URL` in your `.env` file
- Verify CORS is enabled on your backend for the extension origin

### Popup not displaying correctly?
- The extension popup is optimized for 400px width
- Some browsers may need a refresh after installation
- Try reloading the extension in the extensions page

## Development Mode

For development, you can run:
```bash
npm run dev
```

Then use a tool like [web-ext](https://github.com/mozilla/web-ext) or manually load the dev build.

## Notes

- The extension uses Manifest V3
- Service worker handles background tasks
- Content script can inject warnings on suspicious pages

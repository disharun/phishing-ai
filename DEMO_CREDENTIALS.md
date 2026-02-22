# Demo Login Credentials

Since the Python backend is not available yet, the app uses **mock authentication** that works entirely in your browser.

## Pre-configured Demo Accounts

You can login with any of these accounts:

### Account 1
- **Email:** `demo@phishguard.ai`
- **Password:** `demo123`

### Account 2
- **Email:** `test@example.com`
- **Password:** `test123`

## Or Create Your Own Account

You can also **sign up** with any email and password - it will be stored locally in your browser's localStorage.

## How It Works

- The app automatically detects if the backend is available
- If backend is not running, it uses mock authentication
- All user data is stored in browser localStorage
- You can login/signup without any backend connection

## Switching to Real Backend

When your Python backend is ready:

1. Start your backend server
2. Update `.env` file with your backend URL:
   ```
   VITE_API_URL=http://localhost:8000
   ```
3. The app will automatically use the real backend when it's available

## Notes

- Mock authentication is for development/testing only
- Passwords are stored in plain text (not secure - for demo only)
- All data is stored in browser localStorage
- Clear browser data to reset all accounts

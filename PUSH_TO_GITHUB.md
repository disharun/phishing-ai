# Push to GitHub - Instructions

Your project is now set up with a **clean, isolated git repository** that only tracks files in the `phishing-frontend` directory. Your private files are safe!

## ✅ What's Done

- ✅ Git repository initialized ONLY in `phishing-frontend` directory
- ✅ Isolated from parent directories (your private files are safe!)
- ✅ All project files committed
- ✅ Remote configured to: `https://github.com/disharun/phishing-ai.git`
- ✅ Branch renamed to `main`

## 🚀 Push to GitHub

Run these commands:

```bash
cd phishing-frontend
git push -u origin main
```

**Repository:** `https://github.com/disharun/phishing-ai.git`

## 📋 What Will Be Pushed

Only these files from your project:
- Source code (src/)
- Configuration files (package.json, vite.config.js, etc.)
- Extension files (manifest.json, background.js, content.js)
- Documentation (README.md, etc.)
- **NOT** node_modules (excluded by .gitignore)
- **NOT** any files outside the project directory

## 🔒 Your Private Files Are Safe

The git repository is **completely isolated** in the `phishing-frontend` directory. It will NOT track:
- Files from your Desktop
- Files from your Documents
- Files from your user directory
- Any files outside the project folder

## ⚠️ If You Get Authentication Errors

You may need to use a Personal Access Token instead of password:
1. Go to GitHub → Settings → Developer settings → Personal access tokens
2. Generate a new token with `repo` permissions
3. Use the token as your password when pushing

## 📝 Future Updates

After making changes:

```bash
cd phishing-frontend
git add .
git commit -m "Your commit message"
git push
```

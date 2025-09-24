# GitHub Secrets Setup Guide

## 🔐 Setting up GitHub Secrets for Secure Deployment

### Step 1: Go to Your Repository Settings
1. Go to your GitHub repository: `https://github.com/Jes-win-hac-ker/fest-register-flow`
2. Click on **Settings** tab
3. In the left sidebar, click **Secrets and variables** → **Actions**

### Step 2: Add Repository Secrets
Click **New repository secret** and add these two secrets:

#### Secret 1: VITE_SUPABASE_URL
- **Name**: `VITE_SUPABASE_URL`
- **Secret**: `https://dppomlbhaumyslmgbzpu.supabase.co`

#### Secret 2: VITE_SUPABASE_ANON_KEY  
- **Name**: `VITE_SUPABASE_ANON_KEY`
- **Secret**: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRwcG9tbGJoYXVteXNsbWdienB1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTg3MjYyNDYsImV4cCI6MjA3NDMwMjI0Nn0.A7uckfB3NKhg9Y0kQpUuZA1krU79B86HyBNzQ_G5TCs`

### Step 3: Enable GitHub Pages
1. In repository **Settings**
2. Scroll down to **Pages** section
3. Under **Source**, select **GitHub Actions**
4. Save the settings

### Step 4: Enable Required Permissions
1. Go to **Settings** → **Actions** → **General**
2. Under **Workflow permissions**, select:
   - ☑️ **Read and write permissions**
   - ☑️ **Allow GitHub Actions to create and approve pull requests**
3. Click **Save**

## 🚀 How It Works

### Automatic Deployment:
1. **Push to main branch** → Triggers GitHub Actions
2. **Secrets are injected** → Creates `.env` file during build
3. **Project builds** → Using your Supabase credentials
4. **Deploys to GitHub Pages** → Live at your GitHub Pages URL

### Security Benefits:
- ✅ **No secrets in code** - Environment variables stored securely
- ✅ **No .env in repository** - Prevents accidental exposure
- ✅ **Encrypted storage** - GitHub encrypts all secrets
- ✅ **Build-time injection** - Secrets only used during deployment

### Your Live URL:
After setup, your site will be available at:
`https://jes-win-hac-ker.github.io/fest-register-flow/`

## 🔧 Local Development

For local development, create a new `.env` file:

```bash
# Create .env file for local development only
echo "VITE_SUPABASE_URL=https://dppomlbhaumyslmgbzpu.supabase.co" > .env
echo "VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRwcG9tbGJoYXVteXNsbWdienB1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTg3MjYyNDYsImV4cCI6MjA3NDMwMjI0Nn0.A7uckfB3NKhg9Y0kQpUuZA1krU79B86HyBNzQ_G5TCs" >> .env
```

**Note**: The `.env` file is now in `.gitignore` and won't be committed.

## 🧪 Testing the Deployment

1. **Add the secrets** to your GitHub repository
2. **Push any change** to trigger deployment:
   ```bash
   git add .
   git commit -m "🔐 Setup GitHub Secrets deployment"
   git push origin main
   ```
3. **Check Actions tab** to see deployment progress
4. **Visit your live site** once deployment completes

## ⚠️ Important Notes

- **Never commit secrets** to the repository
- **GitHub Secrets are encrypted** and secure
- **Local .env is ignored** by git
- **Production uses GitHub Secrets** automatically
- **Email functions work** with the same Supabase setup

Your Vyvidh'25 site will now deploy securely without exposing any sensitive information! 🎉
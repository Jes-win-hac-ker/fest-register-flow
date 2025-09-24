# Tech Fest Landing Page - Deployment Guide

## GitHub Pages Deployment

This project is configured for automatic deployment to GitHub Pages using GitHub Actions.

### Setup Instructions

1. **Connect to GitHub (via Lovable)**
   - Click the GitHub button in the top right of your Lovable editor
   - Authorize the Lovable GitHub App
   - Create a new repository

2. **Enable GitHub Pages**
   - Go to your GitHub repository
   - Navigate to Settings → Pages
   - Under "Source", select "GitHub Actions"
   - The deployment workflow will run automatically

3. **Configure Repository Name**
   - Update the `base` path in `vite.config.ts` to match your repository name
   - Change `/tech-fest-landing/` to `/your-repo-name/`

4. **Environment Variables (for Supabase)**
   - Go to repository Settings → Secrets and variables → Actions
   - Add your Supabase environment variables:
     - `VITE_SUPABASE_URL`
     - `VITE_SUPABASE_ANON_KEY`

### Workflows

- **deploy.yml**: Builds and deploys to GitHub Pages on main branch pushes
- **preview.yml**: Runs build checks on pull requests

### Custom Domain (Optional)

To use a custom domain:
1. Add a `CNAME` file to the `public` folder with your domain
2. Configure DNS settings with your domain provider
3. Enable custom domain in GitHub Pages settings

### Manual Deployment

If you prefer manual deployment:

```bash
# Build the project
npm run build

# Deploy to any static hosting service
# Upload the contents of the 'dist' folder
```

### Hosting Alternatives

- **Vercel**: Connect your GitHub repo for automatic deployments
- **Netlify**: Drag and drop the `dist` folder or connect GitHub
- **Firebase Hosting**: Use `firebase deploy` after building
- **AWS S3 + CloudFront**: Upload dist folder to S3 bucket

### Environment Variables

When deploying, make sure to set these environment variables in your hosting platform:

```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### Build Commands

```bash
# Install dependencies
npm install

# Development server
npm run dev

# Production build
npm run build

# Preview production build
npm run preview
```
# Vyvidh'25 - Landing Page

A modern, responsive landing page for Vyvidh'25 with registration functionality.

## 🚀 Features

- **Full-screen Hero Section**: Ready for autoplay video background
- **Registration Form**: Validated form with smooth animations
- **Modern Design**: Gradient-based design system with tech aesthetics
- **Responsive Layout**: Mobile-first responsive design
- **SEO Optimized**: Proper meta tags and semantic HTML

## 🛠 Tech Stack

- **React 18** with TypeScript
- **Vite** for fast development and building
- **Tailwind CSS** for styling
- **Shadcn/ui** for UI components
- **Supabase Ready** for backend integration

## 📦 Deployment

This project is configured for automatic deployment to GitHub Pages via GitHub Actions.

### Quick Deploy to GitHub Pages

1. **Connect to GitHub** (via Lovable interface)
2. **Push changes** to the main branch
3. **Enable GitHub Pages** in repository settings
4. Your site will be live at `https://yourusername.github.io/your-repo-name/`

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed deployment instructions and hosting alternatives.

## 🔧 Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 🎥 Adding Your Video

Replace the placeholder in `src/components/HeroSection.tsx`:

```tsx
<video autoPlay muted loop playsInline className="h-full w-full object-cover">
  <source src="/your-video.mp4" type="video/mp4" />
</video>
```

## 🔗 Backend Integration

Connect to Supabase for:
- Registration data storage
- Automated email confirmations
- Payment link redirects

[Setup Supabase Integration](https://docs.lovable.dev/integrations/supabase/)

## 📱 Project Structure

```
src/
├── components/
│   ├── ui/              # Shadcn UI components
│   ├── HeroSection.tsx  # Main hero with video background
│   └── RegistrationForm.tsx # Registration form with validation
├── pages/
│   └── Index.tsx        # Main landing page
├── assets/              # Images and media files
└── lib/                 # Utilities
```

## 🎨 Customization

The design system is defined in:
- `src/index.css` - Color tokens and gradients
- `tailwind.config.ts` - Tailwind configuration
- `src/components/ui/button.tsx` - Button variants

## 🌐 Environment Variables

For Supabase integration:

```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

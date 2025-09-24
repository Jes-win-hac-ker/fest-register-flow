# Video Upload Guide for Vyvidh'25

## 🎥 Adding Your Video Background

### Current Status:
- ✅ Video component is configured
- ✅ Video paths are set up correctly  
- ❌ **Your actual video file is needed**

### Steps to Add Your Video:

#### Method 1: Replace the Placeholder Video
1. **Prepare your video file**:
   - **Format**: MP4 (recommended)
   - **Resolution**: 1080p or higher
   - **Duration**: Any length (it will loop)
   - **Size**: Under 50MB for faster loading
   - **Aspect**: Portrait or landscape (component handles both)

2. **Replace the placeholder**:
   - Rename your video to: `tech-fest-video.mp4`
   - Replace the file in: `/public/tech-fest-video.mp4`

#### Method 2: Use Git LFS for Large Videos (>25MB)
If your video is large:

```bash
# Install Git LFS
git lfs install

# Track video files
git lfs track "*.mp4"
git lfs track "*.webm"

# Add and commit
git add .gitattributes
git add public/tech-fest-video.mp4
git commit -m "Add video with Git LFS"
git push origin main
```

#### Method 3: Host Video Externally
For very large videos, host on external service:

1. **Upload to**: YouTube, Vimeo, or cloud storage
2. **Update component** to use external URL:

```tsx
<video>
  <source src="https://your-cdn.com/your-video.mp4" type="video/mp4" />
</video>
```

### Video Optimization Tips:

#### Recommended Settings:
- **Codec**: H.264
- **Bitrate**: 2-5 Mbps
- **Frame Rate**: 24-30 fps
- **Audio**: Remove audio track (video is muted anyway)

#### Using FFmpeg to Optimize:
```bash
ffmpeg -i input.mp4 \
  -c:v libx264 \
  -crf 28 \
  -preset medium \
  -vf "scale=1080:-2" \
  -an \
  -movflags +faststart \
  tech-fest-video.mp4
```

### Current Fallback:
If video doesn't load, users will see:
- 🎨 **Gradient background** (purple to blue to black)
- 📝 **Loading message** with instructions
- 🖼️ **Hero image** as backup

### Testing Your Video:

1. **Local testing**:
   ```bash
   npm run dev
   # Check http://localhost:8081
   ```

2. **Production testing**:
   - Push to GitHub
   - Check GitHub Pages deployment
   - Verify video loads on mobile devices

### Supported Formats:
- ✅ **MP4** (primary, best compatibility)
- ✅ **WebM** (optional, better compression)
- ❌ **MOV** (convert to MP4)
- ❌ **AVI** (convert to MP4)

### Mobile Considerations:
- ✅ **playsInline** attribute for iOS
- ✅ **muted** required for autoplay
- ✅ **preload="auto"** for smooth playback
- ✅ **Portrait videos** supported

### File Structure:
```
public/
├── tech-fest-video.mp4    ← Your main video file
├── tech-fest-video.webm   ← Optional WebM version
├── favicon.ico
└── ...
```

### Next Steps:
1. 📁 **Prepare your video** (MP4 format, optimized)
2. 📂 **Add to public folder** as `tech-fest-video.mp4`
3. 🚀 **Test locally** with `npm run dev`
4. 📤 **Push to GitHub** to deploy
5. 🎉 **Enjoy your video background**!

### Need Help?
- Video too large? Use Git LFS or external hosting
- Video won't play? Check format and codec
- Performance issues? Optimize bitrate and resolution
- Mobile problems? Ensure muted autoplay is working

Your Vyvidh'25 landing page will look amazing with your custom video! 🎬
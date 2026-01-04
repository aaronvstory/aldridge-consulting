# Export SVG to PNG Instructions

Since this system doesn't have ImageMagick or Inkscape installed, here are multiple methods to convert the SVG files to PNG:

## Method 1: Online Converter (Fastest)
1. Visit https://cloudconvert.com/svg-to-png
2. Upload the SVG files
3. Set desired resolution
4. Download PNG files

### Recommended Exports:

**Favicon Set (from `logo.svg`):**
- 512x512px → favicon-512.png
- 256x256px → favicon-256.png
- 128x128px → favicon-128.png
- 64x64px → favicon-64.png
- 32x32px → favicon-32.png
- 16x16px → favicon-16.png

**Apple Touch Icon (from `apple-touch-icon.svg`):**
- 180x180px → apple-touch-icon.png

**Email Signature (from `email-signature-logo.svg`):**
- 600x180px → email-signature-logo.png
- 300x90px → email-signature-logo-small.png (for mobile)

## Method 2: Using Browser (Free)
1. Open SVG file in Chrome/Edge
2. Right-click → Inspect
3. Console: Run this code:
```javascript
const canvas = document.createElement('canvas');
const ctx = canvas.getContext('2d');
const img = new Image();

// Set desired size (change width/height as needed)
canvas.width = 512;
canvas.height = 512;

img.onload = () => {
  ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
  const link = document.createElement('a');
  link.download = 'logo-512.png';
  link.href = canvas.toDataURL('image/png');
  link.click();
};

img.src = document.querySelector('svg').outerHTML;
```

## Method 3: Using Figma (Professional)
1. Create free Figma account
2. Import SVG files
3. Right-click → Export as PNG
4. Choose resolution (1x, 2x, 3x for retina)

## Method 4: Using Adobe Illustrator
1. Open SVG in Illustrator
2. File → Export → Export As
3. Choose PNG format
4. Set resolution (72 PPI for web, 300 PPI for print)

## Method 5: Using Inkscape (Free Desktop App)
1. Download Inkscape: https://inkscape.org/
2. Open SVG file
3. File → Export PNG Image
4. Set dimensions
5. Export

## Quick Export Script (PowerShell)

If you install Inkscape, save this as `export-pngs.ps1`:

```powershell
$inkscape = "C:\Program Files\Inkscape\bin\inkscape.exe"

# Favicon set
& $inkscape "logo.svg" --export-filename="favicon-512.png" -w 512 -h 512
& $inkscape "logo.svg" --export-filename="favicon-256.png" -w 256 -h 256
& $inkscape "logo.svg" --export-filename="favicon-128.png" -w 128 -h 128
& $inkscape "logo.svg" --export-filename="favicon-64.png" -w 64 -h 64
& $inkscape "logo.svg" --export-filename="favicon-32.png" -w 32 -h 32

# Apple touch icon
& $inkscape "apple-touch-icon.svg" --export-filename="apple-touch-icon.png" -w 180 -h 180

# Email signature
& $inkscape "email-signature-logo.svg" --export-filename="email-signature-logo.png" -w 600 -h 180
& $inkscape "email-signature-logo.svg" --export-filename="email-signature-logo-small.png" -w 300 -h 90
```

## Recommended: Use CloudConvert (5 minutes total)

1. Go to https://cloudconvert.com/svg-to-png
2. Click "Select Files" and upload all SVG files
3. For each file, click the settings gear icon
4. Set width/height as shown in "Recommended Exports" above
5. Click "Start Conversion"
6. Download all PNG files as a ZIP

## After Export

Once you have the PNG files:

1. **Update index.html** to reference the PNG favicons:
```html
<link rel="icon" type="image/png" sizes="512x512" href="/favicon-512.png">
<link rel="icon" type="image/png" sizes="256x256" href="/favicon-256.png">
<link rel="icon" type="image/png" sizes="128x128" href="/favicon-128.png">
<link rel="icon" type="image/png" sizes="64x64" href="/favicon-64.png">
<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32.png">
<link rel="apple-touch-icon" href="/apple-touch-icon.png">
```

2. **Use email-signature-logo.png** in your email signature template

3. **Upload apple-touch-icon.png** to your website root directory

---

Need help? Contact info@aldridge-con.com

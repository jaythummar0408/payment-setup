# Deployment Guide - Payment Setup App

## MIME Type Error Fix

If you're getting "Expected a JavaScript module script but the server responded with a MIME type of 'application/octet-stream'" error, your server is not configured to serve JavaScript files with the correct Content-Type header.

## Solutions by Platform

### 1. **Vercel** (Recommended - Easiest)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

The `vercel.json` file is already configured with correct MIME types.

### 2. **Netlify**

```bash
# Install Netlify CLI
npm i -g netlify-cli

# Deploy
netlify deploy --prod
```

The `netlify.toml` file is already configured.

### 3. **Apache Server**

The `.htaccess` file in the `public/` folder will be copied to `dist/` during build.

After building:
```bash
npm run build
```

Upload the entire `dist/` folder to your Apache server. The `.htaccess` file will configure MIME types automatically.

### 4. **Nginx Server**

Use the configuration from `nginx.conf.example`:

1. Build the app:
```bash
npm run build
```

2. Upload `dist/` folder to your server

3. Update your nginx config (usually at `/etc/nginx/sites-available/your-site`):
```nginx
# Add the types block and location blocks from nginx.conf.example
```

4. Test and reload nginx:
```bash
sudo nginx -t
sudo systemctl reload nginx
```

### 5. **GitHub Pages**

Install gh-pages:
```bash
npm install --save-dev gh-pages
```

Add to `package.json` scripts:
```json
"predeploy": "npm run build",
"deploy": "gh-pages -d dist"
```

Update `vite.config.ts` with your repo name:
```typescript
export default defineConfig({
  base: '/your-repo-name/',
  // ... rest of config
})
```

Deploy:
```bash
npm run deploy
```

### 6. **Generic Static Host**

If using any other static file host:

1. Build the app:
```bash
npm run build
```

2. Ensure your server is configured to:
   - Serve `.js` and `.mjs` files with `Content-Type: application/javascript`
   - Serve `.css` files with `Content-Type: text/css`
   - Serve `index.html` for all routes (SPA routing)

3. Upload the `dist/` folder

## Build Command

```bash
npm run build
```

This creates a `dist/` folder with production-ready files.

## Preview Build Locally

```bash
npm run preview
```

This serves the built files locally to test before deployment.

## Common Issues

### Issue: MIME type error persists
**Solution**: Check your server's MIME type configuration. The server must send correct Content-Type headers.

### Issue: 404 on refresh
**Solution**: Configure your server to serve `index.html` for all routes (see platform-specific configs above).

### Issue: Assets not loading
**Solution**: Check the `base` path in `vite.config.ts` matches your deployment path.


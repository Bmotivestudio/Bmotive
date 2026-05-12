# 🚀 OTTIMIZZAZIONE PERFORMANCE E CORE WEB VITALS - Bmotive Studio

## 🎯 TARGET PERFORMANCE METRICS

### CORE WEB VITALS OBIETTIVI:
- **LCP (Largest Contentful Paint)**: <2.5s (attuale: verificare)
- **FID (First Input Delay)**: <100ms  
- **CLS (Cumulative Layout Shift)**: <0.1
- **Page Speed Score**: >90 mobile, >95 desktop

### METRICHE AGGIUNTIVE:
- **Time to First Byte**: <600ms
- **First Contentful Paint**: <1.8s
- **Total Blocking Time**: <200ms
- **Speed Index**: <3.4s

---

## 🖼️ OTTIMIZZAZIONE IMMAGINI AGGRESSIVE

### CONVERSIONE WEBP AUTOMATICA

#### Script di Conversione Batch:
```bash
#!/bin/bash
# Conversione automatica tutte le immagini in WebP

find ./public/images -type f \( -name "*.jpg" -o -name "*.jpeg" -o -name "*.png" \) | while read img; do
    # Estrai nome file senza estensione
    filename=$(basename "$img" | cut -d. -f1)
    dir=$(dirname "$img")
    
    # Converti in WebP con qualità ottimizzata
    if [[ "$img" == *"hero"* ]] || [[ "$img" == *"banner"* ]]; then
        # Immagini hero: qualità 85, dimensione max 1920px
        cwebp -q 85 -resize 1920 0 "$img" -o "$dir/$filename.webp"
    elif [[ "$img" == *"portfolio"* ]] || [[ "$img" == *"gallery"* ]]; then
        # Portfolio: qualità 90, dimensione max 1200px  
        cwebp -q 90 -resize 1200 0 "$img" -o "$dir/$filename.webp"
    else
        # Altre immagini: qualità 80, dimensione max 800px
        cwebp -q 80 -resize 800 0 "$img" -o "$dir/$filename.webp"
    fi
    
    echo "Convertito: $img -> $filename.webp"
done
```

### LAZY LOADING IMPLEMENTATION

#### Componente React OptimizedImage:
```jsx
import { useState, useRef, useEffect } from 'react';

interface OptimizedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean;
}

export const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  width,
  height,
  className = '',
  priority = false
}) => {
  const [imageSrc, setImageSrc] = useState<string>('');
  const [isLoaded, setIsLoaded] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  // Genera varianti WebP
  const webpSrc = src.replace(/\.(jpg|jpeg|png)$/i, '.webp');
  
  useEffect(() => {
    if (priority) {
      // Carica immediatamente se prioritaria
      setImageSrc(webpSrc);
      return;
    }

    // Intersection Observer per lazy loading
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setImageSrc(webpSrc);
          observer.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: '50px' }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, [webpSrc, priority]);

  return (
    <picture className={className}>
      {/* WebP per browser supportati */}
      <source srcSet={imageSrc} type="image/webp" />
      
      {/* Fallback per browser non supportati */}
      <img
        ref={imgRef}
        src={imageSrc || src}
        alt={alt}
        width={width}
        height={height}
        loading={priority ? 'eager' : 'lazy'}
        onLoad={() => setIsLoaded(true)}
        style={{
          opacity: isLoaded ? 1 : 0,
          transition: 'opacity 0.3s ease-in-out'
        }}
      />
    </picture>
  );
};
```

### DIMENSIONI RESPONSIVE AUTOMATICHE:
```jsx
// Breakpoints per immagini responsive
const imageSizes = {
  hero: {
    mobile: 'w-full h-[300px]',
    tablet: 'w-full h-[500px]', 
    desktop: 'w-full h-[700px]'
  },
  portfolio: {
    mobile: 'w-full h-[200px]',
    tablet: 'w-[400px] h-[300px]',
    desktop: 'w-[600px] h-[400px]'
  },
  blog: {
    mobile: 'w-full h-[180px]',
    tablet: 'w-[350px] h-[250px]',
    desktop: 'w-[500px] h-[300px]'
  }
};
```

---

## ⚡ OTTIMIZZAZIONI CRITICAL CSS

### CSS ABOVE-THE-FOLD INLINE:
```html
<!-- Da inserire in <head> per rendering istantaneo -->
<style>
/* Critical CSS - Solo above-the-fold */
.hero-section {
  min-height: 100vh;
  background: linear-gradient(135deg, #0A0A0A 0%, #1a1a1a 100%);
  display: flex;
  align-items: center;
  justify-content: center;
}

.hero-title {
  font-size: clamp(2rem, 5vw, 4rem);
  font-weight: 700;
  background: linear-gradient(135deg, #6366f1, #8b5cf6);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  text-align: center;
}

.nav-header {
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 50;
  background: rgba(10, 10, 10, 0.95);
  backdrop-filter: blur(10px);
  height: 64px;
}

/* Preload spinner */
.loading-spinner {
  width: 40px;
  height: 40px;
  border: 4px solid #f3f3f3;
  border-top: 4px solid #8b5cf6;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>
```

### PRELOAD RESOURCES CRITICI:
```html
<!-- Preload font principali -->
<link rel="preload" href="/fonts/inter.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="/fonts/montserrat-bold.woff2" as="font" type="font/woff2" crossorigin>

<!-- Preload immagini hero -->
<link rel="preload" href="/home-hero-bg.webp" as="image" type="image/webp">
<link rel="preload" href="/logo.webp" as="image" type="image/webp">

<!-- Preload CSS critici -->
<link rel="preload" href="/styles/critical.css" as="style">
<link rel="preload" href="/styles/above-fold.css" as="style">

<!-- DNS prefetch per domini esterni -->
<link rel="dns-prefetch" href="//fonts.googleapis.com">
<link rel="dns-prefetch" href="//www.googletagmanager.com">
<link rel="dns-prefetch" href="//connect.facebook.net">
```

---

## 🔧 OTTIMIZZAZIONI JAVASCRIPT

### BUNDLE SPLITTING OTTIMIZZATO:
```javascript
// vite.config.ts - Configurazione build ottimizzata
export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          // Vendor chunk per librerie stabili
          vendor: ['react', 'react-dom'],
          
          // UI chunk per componenti
          ui: [
            '@radix-ui/react-dialog',
            '@radix-ui/react-toast', 
            'framer-motion'
          ],
          
          // Utils chunk per utility
          utils: [
            'date-fns',
            'clsx',
            'tailwind-merge'
          ],
          
          // Chat chunk (caricamento lazy)
          chat: ['./src/components/chat/ChatBot']
        }
      }
    },
    
    // Compressione massima
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
        pure_funcs: ['console.log']
      }
    }
  }
});
```

### LAZY LOADING COMPONENTI:
```jsx
// Lazy loading per sezioni non critiche
import { lazy, Suspense } from 'react';

const ChatBot = lazy(() => import('./components/chat/ChatBot'));
const Portfolio = lazy(() => import('./pages/Portfolio'));
const BlogSection = lazy(() => import('./components/sections/BlogSection'));

// Wrapper con loading fallback
const LazySection = ({ children }: { children: React.ReactNode }) => (
  <Suspense fallback={
    <div className="flex justify-center items-center h-32">
      <div className="loading-spinner"></div>
    </div>
  }>
    {children}
  </Suspense>
);

// Utilizzo
<LazySection>
  <ChatBot />
</LazySection>
```

---

## 📊 LIGHTHOUSE AUDIT SETUP

### SCRIPT AUTOMAZIONE LIGHTHOUSE:
```bash
#!/bin/bash
# Audit automatico Lighthouse per tutte le pagine principali

PAGES=(
  "https://bmotivestudio.it/"
  "https://bmotivestudio.it/servizi-marketing-digitale"
  "https://bmotivestudio.it/portfolio-progetti"
  "https://bmotivestudio.it/agenzia-branding-roma"
  "https://bmotivestudio.it/contatti-bmotive"
  "https://bmotivestudio.it/blog"
)

mkdir -p lighthouse-reports/$(date +%Y-%m-%d)

for page in "${PAGES[@]}"; do
    echo "Auditing: $page"
    
    # Genera report Lighthouse
    lighthouse $page \
        --output=json \
        --output=html \
        --output-path=lighthouse-reports/$(date +%Y-%m-%d)/$(basename $page) \
        --chrome-flags="--headless --no-sandbox" \
        --throttling.cpuSlowdownMultiplier=1 \
        --throttling.requestLatencyMs=0 \
        --throttling.downloadThroughputKbps=0 \
        --throttling.uploadThroughputKbps=0
        
    echo "Completed: $page"
done

echo "Tutti i report generati in lighthouse-reports/$(date +%Y-%m-%d)/"
```

### TARGET SCORE LIGHTHOUSE:
- **Performance**: >90 (attuale: da verificare)
- **Accessibility**: >95
- **Best Practices**: >90  
- **SEO**: >95

---

## 🔄 CDN E CACHING STRATEGY

### CLOUDFLARE CONFIGURATION:
```javascript
// Cloudflare Workers per ottimizzazioni edge

addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request));
});

async function handleRequest(request) {
  const cache = caches.default;
  const cacheKey = new Request(request.url, request);

  // Check cache first
  let response = await cache.match(cacheKey);

  if (!response) {
    // Fetch from origin
    response = await fetch(request);
    
    // Clone response for caching
    const responseClone = response.clone();
    
    // Cache static assets longer
    if (request.url.includes('/images/') || 
        request.url.includes('/fonts/') ||
        request.url.includes('.webp')) {
      
      const headers = new Headers(responseClone.headers);
      headers.set('Cache-Control', 'public, max-age=31536000'); // 1 year
      headers.set('CDN-Cache-Control', 'public, max-age=31536000');
      
      response = new Response(responseClone.body, {
        status: responseClone.status,
        statusText: responseClone.statusText,
        headers: headers
      });
    }
    
    // Store in cache
    event.waitUntil(cache.put(cacheKey, response.clone()));
  }

  return response;
}
```

### CACHE HEADERS OTTIMIZZATI:
```nginx
# Configurazione Nginx/Apache per cache headers

# Immagini e font - cache lunga
location ~* \.(jpg|jpeg|png|webp|woff|woff2)$ {
    expires 1y;
    add_header Cache-Control "public, immutable";
    add_header Vary "Accept";
}

# CSS e JS - cache media con ETag
location ~* \.(css|js)$ {
    expires 30d;
    add_header Cache-Control "public";
    etag on;
}

# HTML - cache breve per aggiornamenti
location ~* \.html$ {
    expires 1h;
    add_header Cache-Control "public, must-revalidate";
}
```

---

## 📱 MOBILE OPTIMIZATION

### RESPONSIVE IMAGES SIZING:
```html
<!-- Responsive images con srcset -->
<img src="/portfolio-image-800.webp"
     srcset="/portfolio-image-400.webp 400w,
             /portfolio-image-800.webp 800w,
             /portfolio-image-1200.webp 1200w"
     sizes="(max-width: 768px) 100vw,
            (max-width: 1024px) 50vw,
            33vw"
     alt="Portfolio progetto Bmotive Studio"
     loading="lazy"
     width="800"
     height="600">
```

### TOUCH OPTIMIZATION:
```css
/* Miglioramenti touch interface */
.button, .link {
  min-height: 44px; /* Apple guidelines */
  min-width: 44px;
  touch-action: manipulation; /* Rimuove delay 300ms */
}

.scroll-container {
  -webkit-overflow-scrolling: touch; /* Smooth scrolling iOS */
  overscroll-behavior: contain; /* Previene scroll chaining */
}

/* Hover states solo per dispositivi con hover */
@media (hover: hover) {
  .button:hover {
    transform: scale(1.05);
  }
}
```

---

## 🎯 PERFORMANCE BUDGET

### LIMITI DIMENSIONI FILE:
- **Homepage totale**: <2MB
- **Singola pagina**: <1.5MB  
- **Immagini hero**: <300KB
- **Immagini portfolio**: <150KB
- **Bundle JS principale**: <500KB
- **CSS totale**: <100KB

### MONITORING AUTOMATICO:
```javascript
// Performance monitoring automatico
const performanceObserver = new PerformanceObserver((list) => {
  for (const entry of list.getEntries()) {
    // Track Core Web Vitals
    if (entry.entryType === 'largest-contentful-paint') {
      gtag('event', 'lcp', {
        'custom_parameter': entry.startTime
      });
    }
    
    if (entry.entryType === 'first-input') {
      gtag('event', 'fid', {
        'custom_parameter': entry.processingStart - entry.startTime
      });
    }
  }
});

performanceObserver.observe({entryTypes: ['largest-contentful-paint', 'first-input']});
```
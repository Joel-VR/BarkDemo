# BARK 2.0 · Propuesta de experiencia

Prototipo local de e-commerce para BARK Perú construido con Next.js App Router, React, TypeScript, Tailwind CSS, Framer Motion, Lucide y Zustand. Toda la tienda funciona con estado local; no se conecta a Shopify, no autentica clientes y no procesa pagos ni pedidos.

## Desarrollo

```bash
npm install
npm run dev
```

Abre `http://localhost:3000`. Usa `npm run build` para compilar la propuesta. El carrito y favoritos persisten en `localStorage`. El checkout solo valida el flujo visual en el navegador.

## Rutas

Inicio, `/productos`, `/productos/[slug]`, `/categoria/[slug]`, `/promociones`, `/recompensas`, `/carrito`, `/checkout`, `/nosotros` y `/favoritos`. El drawer de compra está disponible desde la navegación global.

## Datos y demostración

El catálogo está en `src/data/catalog.ts` y centraliza categorías, recomendaciones, variantes, precios mock y metas de Rewards. Los precios de creatinas, Gold Standard y cinturón se basan en el catálogo público de BARK consultado durante el prototipado; confirmar precio, stock, imágenes, presentación y disponibilidad antes de publicar. Los demás precios, umbrales, regalos y niveles de Rewards se identifican como demostrativos. Imágenes remotas de muestra requieren conexión a internet.

No ingreses datos de pago reales en el checkout. La acción "Reiniciar demo" limpia carrito y favoritos. Las promociones, datos de envío y recompensas requieren aprobación de BARK para operar comercialmente.

## Publicar en GitHub Pages

El workflow de GitHub Actions compila la app como sitio estático y publica el directorio `out/` en GitHub Pages al hacer push a `main`. En Settings → Pages, selecciona **GitHub Actions** como Source (en lugar de Deploy from a branch). La URL del proyecto es https://joel-vr.github.io/BarkDemo/.

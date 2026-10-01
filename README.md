# Cartilla Operativa — Full Nova Digital

Micrositio de una sola página, sin dependencias ni proceso de compilación.
Pensado para publicarse como sitio estático.

## Archivos

| Archivo | Qué contiene |
|---|---|
| `index.html` | Todo el contenido: portada, 10 capítulos, diagramas SVG y cierre. |
| `styles.css` | Sistema de diseño completo (colores, tipografía, grid, responsive, impresión). |
| `app.js` | Navegación, índice móvil, scroll-spy, barra de progreso y animaciones de entrada. |

## Cómo verlo en local

Abrir `index.html` en el navegador. No necesita servidor.

## Cómo publicarlo

### GitHub Pages
```bash
git init
git add .
git commit -m "Cartilla operativa Full Nova Digital"
git branch -M main
git remote add origin https://github.com/<usuario>/<repo>.git
git push -u origin main
```
Luego: **Settings → Pages → Source: Deploy from a branch → main / (root)**.
Queda en `https://<usuario>.github.io/<repo>/`.

### Cloudflare Pages o Netlify
Arrastrar la carpeta completa en el panel. Sin git y con dominio propio opcional.

## Cómo editarlo

- **Textos**: están en `index.html`, cada capítulo en su `<section class="chapter" id="cap-NN">`.
- **Colores**: todos los tokens están en `:root`, al comienzo de `styles.css`.
- **Agregar un capítulo**: duplicar una `<section class="chapter">`, cambiar el `id`,
  y añadir el enlace en los dos índices (`.rail__nav` y `#sheet`).
- Las clases `rv` activan la animación de entrada; conviene mantenerlas al añadir bloques.

## Nota sobre contenido

El documento describe proceso y capacidad operativa. **No contiene métricas de
rendimiento de clientes ni cifras históricas**, por decisión editorial: las cifras
se construyen con la cuenta de cada cliente.

## Atajos

- `Shift + ↓` / `Shift + ↑` — saltar de capítulo
- `Esc` — cerrar el índice en móvil

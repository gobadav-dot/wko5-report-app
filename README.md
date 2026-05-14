# WKO5 Race Report Builder

App para crear reports de competicion con datos, metricas e imagenes exportadas desde WKO5 y exportarlos a PDF desde el navegador.

## Stack

- Next.js App Router
- React
- Tailwind CSS
- Supabase preparado para una fase posterior

## Desarrollo local

```bash
npm install
npm run dev
```

Abre `http://localhost:3000`.

## Exportar PDF

Pulsa **Exportar PDF** y elige **Guardar como PDF** en el dialogo de impresion del navegador.

## Siguiente fase

- Conectar Supabase Auth.
- Guardar atletas, competiciones y reports.
- Subir imagenes WKO5 a Supabase Storage.
- Importar CSV/XLSX exportados desde WKO5 para rellenar metricas automaticamente.

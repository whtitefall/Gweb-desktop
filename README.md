# GraphNote Desktop

Desktop wrapper for the GraphNote web app using Electron.

## What this project does
- Opens GraphNote in a native desktop window.
- Uses production URL by default: `https://www.lettermessage.com`.
- Supports local web development URL in dev mode.

## Requirements
- Node.js 18+
- npm

## Install
```bash
npm install
```

## Run
Production URL in desktop window:
```bash
npm start
```

Local frontend URL in desktop window:
```bash
GRAPHNOTE_DEV_URL=http://localhost:5173 npm run dev
```

## Build Windows packages
```bash
npm run dist:win
```
or
```bash
npm run dist:portable
```

Output binaries are generated in `release/`.

## Environment variables
- `GRAPHNOTE_DESKTOP_URL` (optional): override production URL.
- `GRAPHNOTE_DEV_URL` (optional): override local dev URL.

Examples:
```bash
GRAPHNOTE_DESKTOP_URL=https://www.lettermessage.com npm start
GRAPHNOTE_DEV_URL=http://localhost:5173 npm run dev
```

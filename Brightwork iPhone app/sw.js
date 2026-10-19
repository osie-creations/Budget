/* Keeps the app on the phone so it opens without internet. Change VERSION when publishing an update. */
const VERSION='brightwork-2026-10-17a';
const FILES=["./","index.html","manifest.webmanifest","icons/apple-touch-icon.png","icons/icon-192.png","icons/icon-512.png","fonts/baloo-2-latin-600-normal.woff2","fonts/baloo-2-latin-700-normal.woff2","fonts/nunito-latin-400-normal.woff2","fonts/nunito-latin-600-normal.woff2","fonts/nunito-latin-700-normal.woff2","fonts/nunito-latin-800-normal.woff2"];
self.addEventListener('install',e=>{e.waitUntil(caches.open(VERSION).then(c=>c.addAll(FILES)).then(()=>self.skipWaiting()))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==VERSION).map(k=>caches.delete(k)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{ if(e.request.method!=='GET') return;
  e.respondWith(caches.match(e.request,{ignoreSearch:true}).then(hit=>hit||fetch(e.request).catch(()=>e.request.mode==='navigate'?caches.match('index.html'):Response.error())))});

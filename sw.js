const CACHE='zhuxi-v16-1';
const CORE=['./','./index.html','./manifest.webmanifest','./icon-192.png','./icon-512.png','./icon-180.png'];
self.addEventListener('install',event=>event.waitUntil(caches.open(CACHE).then(c=>c.addAll(CORE)).then(()=>self.skipWaiting())));
self.addEventListener('activate',event=>event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',event=>{
 const url=new URL(event.request.url);
 if(event.request.method!=='GET') return;
 if(url.pathname.endsWith('code-bank.min.json')||url.pathname.endsWith('code-bank.json')){
   event.respondWith(fetch(event.request,{cache:'no-store'}).catch(()=>caches.match(event.request))); return;
 }
 event.respondWith(caches.match(event.request).then(r=>r||fetch(event.request)));
});
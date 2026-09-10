const CACHE='zhuxi-v32-norm-fix';
const CORE=['./','./index.html','./manifest.webmanifest','./icon-180.png','./icon-192.png','./icon-512.png','./code-bank.json','./code-bank.min.json','./norm-library.json'];
self.addEventListener('install',event=>{
  event.waitUntil((async()=>{
    const c=await caches.open(CACHE);
    for(const u of CORE){try{await c.add(u)}catch(e){console.warn('cache skip',u,e)}}
    await self.skipWaiting();
  })());
});
self.addEventListener('activate',event=>event.waitUntil((async()=>{
  const keys=await caches.keys();
  await Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k)));
  await self.clients.claim();
})()));
self.addEventListener('fetch',event=>{
  if(event.request.method!=='GET')return;
  const url=new URL(event.request.url);
  event.respondWith((async()=>{
    const cache=await caches.open(CACHE);
    const cached=await cache.match(event.request);
    try{
      const response=await fetch(event.request);
      if(response.ok && (url.pathname.endsWith('/norm-library.json') || url.pathname.endsWith('/index.html') || url.pathname.endsWith('/sw.js'))){
        cache.put(event.request,response.clone()).catch(()=>{});
      }
      return response;
    }catch(err){
      if(cached)return cached;
      return new Response('Offline resource unavailable',{status:503,headers:{'Content-Type':'text/plain;charset=utf-8'}});
    }
  })());
});

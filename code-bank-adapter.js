// 筑习正式规范题库适配器
// 将 data/code-bank.min.json 放在仓库 data/ 目录下。
let codeBankData = null;

async function loadFormalCodeBank(){
  if(codeBankData) return codeBankData;
  const r = await fetch('./data/code-bank.min.json');
  if(!r.ok) throw new Error('规范题库加载失败：'+r.status);
  codeBankData = await r.json();
  return codeBankData;
}

function formalCodeOfDay(data){
  const ds = iso(new Date());
  const seed = [...ds].reduce((s,c)=>s+c.charCodeAt(0),0);
  return data.items[seed % data.items.length];
}

async function renderFormalCode(){
  const data = await loadFormalCodeBank();
  const q = formalCodeOfDay(data);
  const el = document.getElementById('codeQuestion');
  el.innerHTML = `<div style="font-size:16px">${esc(q.prompt)}</div>
    <div class="small" style="margin-top:8px">${esc(q.section_id||'规范')} · ${esc(q.type||'综合回忆')} · 共 ${data.items.length} 条题目</div>`;
  window.__formalCodeToday = q;
}

function openFormalCodeAnswer(){
  const q = window.__formalCodeToday;
  if(!q) return;
  const refs = q.references?.length ? q.references.map(x=>`<li>${esc(x)}</li>`).join('') : '<li>原手册该条未提取到独立规范出处。</li>';
  document.getElementById('sheet').innerHTML = `<h2>今日规范 · ${esc(q.number||'')} ${esc(q.section_id||'')}</h2>
    <p>${esc(q.prompt)}</p>
    <textarea id="codeA" placeholder="先独立回答，再查看参照。"></textarea>
    <div class="actions"><button class="pill primary" onclick="showFormalCodeAnswer()">查看参照</button></div>`;
  openModal();
}

function showFormalCodeAnswer(){
  const q = window.__formalCodeToday;
  if(!q) return;
  const refs = q.references?.length ? q.references.map(x=>`<li>${esc(x)}</li>`).join('') : '<li>原手册该条未提取到独立规范出处。</li>';
  document.getElementById('sheet').innerHTML += `<div class="card section">
    <b>参考答案</b><p>${esc(q.answer)}</p>
    <b>规范参照</b><ul>${refs}</ul>
    <p class="small">来源：建筑设计规范常用条文速查手册（重庆大学版） · PDF 第 ${q.page} 页</p>
  </div>`;
}

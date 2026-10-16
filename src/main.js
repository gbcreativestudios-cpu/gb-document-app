import "@fontsource/inter/300.css";import "@fontsource/inter/400.css";import "@fontsource/inter/500.css";import "@fontsource/inter/600.css";import "@fontsource/inter/700.css";import "@fontsource/inter/400-italic.css";
import "./style.css";
import logoUrl from "./assets/logo.png?inline";
import services from "../content/services.json";
import def from "../content/defaults.json";
const LOGO=logoUrl;
let DOCLOGO=LOGO;try{const l=localStorage.getItem("gb_logo");if(l)DOCLOGO=l}catch(e){}
const $=id=>document.getElementById(id);
const esc=s=>String(s??"").replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
const nl=s=>esc(s).replace(/\n/g,"<br>");
const BASE=Object.fromEntries(services.categories.map(c=>[c.name,c.items]));
let OV={add:{},rm:{},rmc:[]};try{const x=JSON.parse(localStorage.getItem("gb_svx")||"null");if(x)OV=x}catch(e){}
const saveOV=()=>{try{localStorage.setItem("gb_svx",JSON.stringify(OV))}catch(e){}};
let SV={};
function buildSV(){SV={};const names=[...Object.keys(BASE).filter(c=>!OV.rmc.includes(c)),...Object.keys(OV.add).filter(c=>!(c in BASE))];
 for(const c of names){const base=(BASE[c]||[]).filter(x=>!(OV.rm[c]||[]).includes(x));SV[c]=[...base,...(OV.add[c]||[]).filter(x=>!base.includes(x))]}}
buildSV();
const SYM={NGN:"N",USD:"$",EUR:"€",GBP:"£"};
const DEF={...def};try{Object.assign(DEF,JSON.parse(localStorage.getItem("gb_def")||"{}"))}catch(e){}
const saveDEF=()=>{try{localStorage.setItem("gb_def",JSON.stringify(DEF))}catch(e){}};
let INV=80;try{INV=parseInt(localStorage.getItem("gb_inv"))||80}catch(e){}
const saveINV=()=>{try{localStorage.setItem("gb_inv",String(INV))}catch(e){}};
const invNo=()=>"INV"+String(INV).padStart(4,"0");
function dl(){let d=$("svl");if(!d){d=document.createElement("datalist");d.id="svl";document.body.appendChild(d)}d.innerHTML=Object.values(SV).flat().map(x=>`<option value="${esc(x)}">`).join("")}
let BANK={NGN:{name:"GB STUDIOS LTD.",acct:"0080523838",bank:"STANBIC IBTC",iban:"",swift:""},USD:{},EUR:{},GBP:{}};
try{const b=JSON.parse(localStorage.getItem("gb_bank")||"null");if(b)BANK=b}catch(e){}
const MON=["JAN.","FEB.","MAR.","APR.","MAY","JUNE","JULY","AUG.","SEPT.","OCT.","NOV.","DEC."];
const dfmt=v=>{if(!v)return"";const[y,m,d]=v.split("-");return`${MON[m-1]} ${+d}, ${y}`};
const today=()=>new Date().toISOString().slice(0,10);
const mn=v=>Math.round((parseFloat(v)||0)*100);
const fm=(m,c)=>{const neg=m<0;m=Math.abs(m);const w=m%100===0;return(neg?"-":"")+(SYM[c]||c+" ")+(m/100).toLocaleString("en-US",{minimumFractionDigits:w?0:2,maximumFractionDigits:2})};
const in14=()=>new Date(Date.now()+12096e5).toISOString().slice(0,10);
const CL2=[{k:"cn",l:"Client name",d:"Mrs Adaeze Okafor"},{k:"cd",l:"Client details (one per line)",t:"area",r:3,d:"Lumen Events Ltd.\nLagos, Nigeria\n+234 801 234 5678"}];
const CLAUSES=DEF.agreement_clauses;
const DEFIT={receipt:[{d:"Event poster package — 50% upfront payment",q:1,p:""}],quotation:[{d:"Poster",q:1,p:""},{d:"Anticipation poster",q:1,p:""},{d:"Motion poster",q:1,p:""}]};
const CUR={k:"cur",l:"Currency (choose explicitly)",t:"sel",o:["NGN","USD","EUR","GBP"],d:"NGN"};
const CL=[{k:"cn",l:"Client name",d:""},{k:"cd",l:"Client details (one per line)",t:"area",r:3,d:""}];
const DOCS={
invoice:{n:"Invoice",items:1,f:[{k:"no",l:"Invoice number",d:"INV0080"},{k:"date",l:"Date",t:"date",d:today()},{k:"due",l:"Due date",d:"ON RECEIPT"},CUR,...CL,{k:"vat",l:"VAT %",t:"num",d:"0"},{k:"paid",l:"Amount paid",t:"num",d:"0"},{k:"pay",l:"Payment type",t:"sel",o:["PART PAYMENT","FULL PAYMENT","(none ticked)"],d:"(none ticked)"}]},
receipt:{n:"Receipt",items:1,f:[{k:"no",l:"Receipt number",d:"REC0001"},{k:"date",l:"Payment date",t:"date",d:today()},{k:"inv",l:"Related invoice",d:"INV0080"},CUR,...CL2,{k:"paid",l:"Amount actually received",t:"num",d:"0"},{k:"pay",l:"Payment type",t:"sel",o:["Auto","PART PAYMENT","FULL PAYMENT"],d:"Auto"},{k:"meth",l:"Payment method",d:"Bank transfer"},{k:"ref",l:"Transaction reference (optional)",d:""},{k:"acc",l:"Account credited (optional)",d:""}]},
proposal:{n:"Proposal",f:[{k:"title",l:"Title",d:"Visual Proposal & Quotation"},{k:"sub",l:"Project (italic subtitle)",d:"Lumen Night Live – Hosted by Lumen Events"},{k:"cn",l:"Prepared for",d:"Mrs Adaeze Okafor, Lumen Events Ltd."},{k:"date",l:"Date",t:"date",d:today()},{k:"valid",l:"Valid until",t:"date",d:in14()},{k:"ov",l:"Project overview (optional)",t:"area",r:4,d:"GB Studios will design the complete visual campaign for Lumen Night Live, from the first announcement to the final thank-you post, so the event looks consistent across social media, print and screens."},{k:"list",l:"Deliverables — one per line; start a line with # for a group heading",t:"area",r:12,d:"# Announcement & Promotion\nArtist announcement poster\nMain event poster\nTicket announcement poster\nLineup poster (complete list of performers)\n# Motion Visuals\nMotion event poster (post + story formats)\nCountdown motion visuals (7-day sequence)\n# Event Day & After\nFinal reminder poster\nThank You poster"},{k:"cur",l:"Currency (single currency)",t:"sel",o:["USD","NGN","EUR","GBP"],d:"USD"},{k:"price",l:"Total price (you enter it)",t:"num",d:""},{k:"dep",l:"Upfront payment %",t:"num",d:"50"},{k:"time",l:"Project timeline",d:"6 Weeks (until the end of the event)"},{k:"ms",l:"Milestones (optional, one per line)",t:"area",r:3,d:""},{k:"terms",l:"Key terms (one per line)",t:"area",r:6,d:DEF.proposal_terms},{k:"acc",l:"Acceptance note",t:"area",r:3,d:DEF.acceptance}]},
agreement:{n:"Agreement",f:[{k:"title",l:"Title",d:"Service Agreement"},{k:"sub",l:"Reference / date line",d:"Agreement for Event Visuals – Lumen Night Live"},{k:"pa",l:"Party A (details)",t:"area",r:3,d:"GB Studios Ltd.\nRC: 9295569\nOsun, Nigeria."},{k:"pb",l:"Party B (details)",t:"area",r:3,d:"Lumen Events Ltd.\nAdaeze Okafor\nLagos, Nigeria"},{k:"cl",l:"Clauses — blank line between clauses; first line of each = heading. Your own wording only.",t:"area",r:12,d:CLAUSES}]}
};
const S={};for(const[k,d]of Object.entries(DOCS)){S[k]={items:JSON.parse(JSON.stringify(DEFIT[k]||[{d:"",q:1,p:""}]))};d.f.forEach(f=>S[k][f.k]=f.d)}
let cur="invoice",invTouched=false;
const ICON={invoice:'<path d="M6 3h12v18l-3-2-3 2-3-2-3 2z"/><path d="M9 8h6M9 12h6"/>',receipt:'<path d="M4 7h16v10H4z"/><circle cx="12" cy="12" r="2.5"/>',quotation:'<path d="M5 4h14v16H5z"/><path d="M8 9h8M8 13h5"/>',proposal:'<path d="M4 5h16v11H4zM8 20h8M12 16v4"/>',agreement:'<path d="M6 3h9l4 4v14H6z"/><path d="M9 14c1-2 2 1 3-1s2 1 3-1"/>',services:'<path d="M4 6h16M4 12h16M4 18h10"/>',settings:'<circle cx="12" cy="12" r="3"/><path d="M12 3v3M12 18v3M3 12h3M18 12h3"/>'};
function nav(){$("nav").innerHTML=`<img src="${LOGO}" alt="GB Studios"><hr>`+[...Object.keys(DOCS),"services","settings"].map(k=>`<button class="nv ${k===cur?"on":""}" data-k="${k}"><svg viewBox="0 0 24 24">${ICON[k]}</svg>${k==="settings"?"Settings":k==="services"?"Services list":DOCS[k].n}</button>`).join("")+`<div class="sp"></div><div class="note">Saved in this browser only. Prices are never preset — you enter them on every document.</div>`;
 $("nav").querySelectorAll(".nv").forEach(b=>b.onclick=()=>{cur=b.dataset.k;render()})}
function fld(f,st){const v=esc(st[f.k]);const id=`f_${f.k}`;
 if(f.t==="area")return`<label>${f.l}</label><textarea data-k="${f.k}" rows="${f.r||3}">${v}</textarea>`;
 if(f.t==="sel")return`<label>${f.l}</label><select data-k="${f.k}">${f.o.map(o=>`<option ${o===st[f.k]?"selected":""}>${o}</option>`).join("")}</select>`;
 return`<label>${f.l}</label><input ${f.ro?"readonly":""} data-k="${f.k}" type="${f.t==="num"?"number":f.t==="date"?"date":"text"}" ${f.t==="num"?'min="0" step="any"':""} value="${v}">`}
function render(){nav();const v=$("view");
 if(cur==="settings"){$("ttl").textContent="Settings";$("dl").style.display="none";
  v.innerHTML=`<div class="card" style="max-width:420px"><h3>Document logo</h3><div style="background:linear-gradient(100deg,#3B76E5,#6E24AA 50%,#FC7737);padding:14px;border-radius:8px"><img src="${DOCLOGO}" style="height:34px;width:auto;max-width:100%" alt=""></div><label>Upload logo (white or transparent PNG / SVG / WebP)</label><input id="lgf" type="file" accept="image/png,image/svg+xml,image/webp"><button id="lgr" style="margin-top:8px">Reset to default</button><div class="hint">Used in the header of every document (not the app sidebar). Saved in this browser only.</div></div><div class="card" style="max-width:640px"><h3>Default terms &amp; copyright</h3>
<label>Copyright statement</label><textarea id="crt" rows="3">${esc(DEF.copyright)}</textarea>
<label style="display:flex;gap:8px;align-items:center;color:var(--tx)"><input type="checkbox" id="crp" style="width:auto" ${DEF.copyright_in_proposal?"checked":""}> Show in proposal Key Terms</label>
<label style="display:flex;gap:8px;align-items:center;color:var(--tx)"><input type="checkbox" id="cra" style="width:auto" ${DEF.copyright_in_agreement?"checked":""}> Add as a clause in agreements</label>
<label>Proposal key terms (one per line)</label><textarea id="dpt" rows="5">${esc(DEF.proposal_terms)}</textarea>
<label>Proposal acceptance note</label><textarea id="dac" rows="2">${esc(DEF.acceptance)}</textarea>
<label>Agreement clauses (blank line between clauses; first line = heading)</label><textarea id="dag" rows="10">${esc(DEF.agreement_clauses)}</textarea>
<div class="hint">Saved in this browser. Edits also update the matching fields on the proposal and agreement forms. The copyright statement never appears on invoices or receipts.</div><button id="dfr" style="margin-top:8px">Reset to starter text</button></div><div class="card" style="max-width:520px"><h3>Backup</h3><div class="hint" style="margin:0 0 8px">Your logo, bank accounts and invoice counter live in this browser only. Export a backup now and then.</div><button id="bx">Export backup</button> <button id="bi">Import backup</button><input id="bf" type="file" accept="application/json" style="display:none"></div><div class="hint" style="margin-bottom:12px;max-width:620px">One account per currency. A document only ever shows the account for its own currency; if none is set you get a warning instead of a substitute. (Prototype: saved in this browser only.)</div><div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(260px,1fr));gap:12px">`+Object.keys(SYM).map(c=>{const b=BANK[c]||{};return`<div class="card"><h3>${c}</h3>`+[["name","Account name"],["acct","Account number"],["bank","Bank name"],["iban","IBAN (optional)"],["swift","SWIFT/BIC (optional)"]].map(([k,l])=>`<label>${l}</label><input data-c="${c}" data-b="${k}" value="${esc(b[k])}">`).join("")+`</div>`}).join("")+`</div>`;
  $("lgf").onchange=e=>{const f=e.target.files[0];if(!f)return;const r=new FileReader();r.onload=()=>{const set=u=>{DOCLOGO=u;try{localStorage.setItem("gb_logo",u)}catch(x){alert("Logo too large to save in this browser.")}render()};if(f.type==="image/svg+xml"){set(r.result);return}const im=new Image();im.onload=()=>{const h=Math.min(160,im.height),w=Math.round(im.width*h/im.height),c=document.createElement("canvas");c.width=w;c.height=h;c.getContext("2d").drawImage(im,0,0,w,h);set(c.toDataURL("image/png"))};im.src=r.result};r.readAsDataURL(f)};
  $("lgr").onclick=()=>{DOCLOGO=LOGO;try{localStorage.removeItem("gb_logo")}catch(x){}render()};
  const dset=(k,v,fn)=>{DEF[k]=v;saveDEF();if(fn)fn()};
  $("crt").oninput=e=>dset("copyright",e.target.value);$("crp").onchange=e=>dset("copyright_in_proposal",e.target.checked);$("cra").onchange=e=>dset("copyright_in_agreement",e.target.checked);
  $("dpt").oninput=e=>dset("proposal_terms",e.target.value,()=>S.proposal.terms=e.target.value);
  $("dac").oninput=e=>dset("acceptance",e.target.value,()=>S.proposal.acc=e.target.value);
  $("dag").oninput=e=>dset("agreement_clauses",e.target.value,()=>S.agreement.cl=e.target.value);
  $("dfr").onclick=()=>{if(!confirm("Reset these defaults to the starter text?"))return;try{localStorage.removeItem("gb_def")}catch(x){}location.reload()};
  $("bx").onclick=()=>{const o={};for(const k of Object.keys(localStorage))if(k.startsWith("gb_"))o[k]=localStorage[k];const a=document.createElement("a");a.href=URL.createObjectURL(new Blob([JSON.stringify(o)],{type:"application/json"}));a.download="gb-studios-backup.json";a.click()};
  $("bi").onclick=()=>$("bf").click();$("bf").onchange=e=>{const f=e.target.files[0];if(!f)return;const r=new FileReader();r.onload=()=>{try{const o=JSON.parse(r.result);for(const[k,v]of Object.entries(o))if(k.startsWith("gb_"))localStorage.setItem(k,v);location.reload()}catch(x){alert("Not a valid backup file.")}};r.readAsText(f)};
  v.querySelectorAll("input[data-c]").forEach(e=>e.oninput=()=>{(BANK[e.dataset.c]=BANK[e.dataset.c]||{})[e.dataset.b]=e.value;try{localStorage.setItem("gb_bank",JSON.stringify(BANK))}catch(x){}});return}
 if(cur==="services"){$("ttl").textContent="Services list";$("dl").style.display="none";
  v.innerHTML=`<div class="hint" style="margin-bottom:12px;max-width:640px">These names appear as suggestions in the Description column. No prices here — you enter the price on each document. Changes are saved in this browser (use Settings → Export backup to keep a copy).</div><div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(280px,1fr));gap:12px">`+Object.entries(SV).map(([g,a])=>`<div class="card"><h3 style="display:flex;justify-content:space-between">${esc(g)}<button class="x" style="padding:0 6px;color:#f87171" data-dc="${esc(g)}" aria-label="Delete category">Delete</button></h3>${a.map((x,i)=>`<div style="display:flex;justify-content:space-between;gap:8px;padding:5px 0;border-bottom:1px solid var(--bd)"><span>${esc(x)}</span><button class="x" style="padding:0 8px;color:#f87171" data-ds="${esc(g)}" data-i="${i}" aria-label="Delete">✕</button></div>`).join("")}<div class="r2" style="grid-template-columns:1fr auto;margin-top:10px"><input placeholder="New service" data-n="${esc(g)}"><button data-a="${esc(g)}">Add</button></div></div>`).join("")+`<div class="card"><h3>New category</h3><div class="r2" style="grid-template-columns:1fr auto"><input id="nc" placeholder="Category name"><button id="ncb">Add</button></div></div></div><button id="rs" style="margin-top:12px">Reset to starter list</button>`;
  const done=()=>{saveOV();buildSV();render()};
  const add=g=>{const i=v.querySelector(`input[data-n="${g}"]`),t=i.value.trim();if(!t)return;if((BASE[g]||[]).includes(t)&&(OV.rm[g]||[]).includes(t))OV.rm[g]=OV.rm[g].filter(x=>x!==t);else{OV.add[g]=OV.add[g]||[];if(!SV[g].includes(t))OV.add[g].push(t)}done()};
  v.querySelectorAll("[data-a]").forEach(b=>b.onclick=()=>add(b.dataset.a));
  v.querySelectorAll("input[data-n]").forEach(i=>i.onkeydown=e=>{if(e.key==="Enter")add(i.dataset.n)});
  v.querySelectorAll("[data-ds]").forEach(b=>b.onclick=()=>{const g=b.dataset.ds,x=SV[g][b.dataset.i];if((BASE[g]||[]).includes(x)){(OV.rm[g]=OV.rm[g]||[]).push(x);OV.add[g]=(OV.add[g]||[]).filter(y=>y!==x)}else OV.add[g]=(OV.add[g]||[]).filter(y=>y!==x);done()});
  v.querySelectorAll("[data-dc]").forEach(b=>b.onclick=()=>{const g=b.dataset.dc;if(!confirm("Delete this category and its services?"))return;if(g in BASE&&!OV.rmc.includes(g))OV.rmc.push(g);delete OV.add[g];delete OV.rm[g];done()});
  $("ncb").onclick=()=>{const t=$("nc").value.trim();if(!t||t in SV)return;if(t in BASE&&OV.rmc.includes(t)){OV.rmc=OV.rmc.filter(c=>c!==t);delete OV.rm[t]}else OV.add[t]=OV.add[t]||[];done()};
  $("rs").onclick=()=>{if(confirm("Reset to the starter list? Your changes will be lost.")){OV={add:{},rm:{},rmc:[]};done()}};return}
 const d=DOCS[cur],st=S[cur];dl();if(cur==="invoice"&&!invTouched)st.no=invNo();$("ttl").textContent="New "+d.n.toLowerCase();$("dl").style.display="";
 v.innerHTML=`<div class="grid"><div class="form"><div class="card"><h3>${d.n} details</h3>${d.f.map(f=>fld(f,st)).join("")}<div id="bw"></div></div>
 ${d.items?`<div class="card"><h3>Line items — you set every price</h3><div class="hint" style="margin:0 0 4px">In each Description, pick from your list (click the field) or just type. Edit the list under “Services list”.</div><button id="add">+ Add line</button><div id="items"></div></div>`:""}</div>
 <div><div class="pvw" id="pvw"><div id="paper"></div></div></div></div>`;
 v.querySelectorAll("[data-k]").forEach(e=>e.oninput=e.onchange=()=>{st[e.dataset.k]=e.value;if(cur==="invoice"&&e.dataset.k==="no")invTouched=true;paper()});
 if(d.items){$("add").onclick=()=>{st.items.push({d:"",q:1,p:""});items();paper()};items()}
 paper()}
function items(){const st=S[cur],el=$("items");el.innerHTML=st.items.map((it,i)=>`<div class="it"><input list="svl" data-i="${i}" data-f="d" value="${esc(it.d)}" placeholder="Pick from list or type"><div class="r3"><input data-i="${i}" data-f="q" type="number" min="0" step="any" value="${it.q}" aria-label="Quantity"><input data-i="${i}" data-f="p" type="number" min="0" step="any" value="${it.p}" placeholder="Enter unit price" aria-label="Unit price"><button class="x" data-x="${i}" aria-label="Remove">✕</button></div></div>`).join("");
 el.querySelectorAll("input").forEach(e=>e.oninput=()=>{st.items[e.dataset.i][e.dataset.f]=e.value;paper()});
 el.querySelectorAll("[data-x]").forEach(b=>b.onclick=()=>{st.items.splice(b.dataset.x,1);items();paper()})}
const HEAD=()=>`<div class="hd"><img class="lg" src="${DOCLOGO}" alt="Logo"><div class="ad">Osun, Nigeria.<small>gbcreativestudios@gmail.com<br>+2348169804368</small></div></div><div class="st"></div>`;
const FOOT=`<div class="ft"><i></i><span><b>RC:</b> 9295569</span></div>`;
function paper(){const t=cur,s=S[t],c=s.cur;let h=HEAD(),warn="";
 if(DOCS[t].items){
  const rows=s.items.map(i=>{const q=parseFloat(i.q)||0,u=mn(i.p);return{d:i.d,q,u,a:Math.round(q*u),e:i.p===""}});
  const sub=rows.reduce((a,r)=>a+r.a,0),vr=parseFloat(s.vat)||0,vat=Math.round(sub*vr/100),tot=sub+vat,paid=mn(s.paid),bal=tot-paid;
  const lab={invoice:["BILL TO :","NUMBER:","DATE:","DUE DATE:"],receipt:["RECEIVED FROM :","NUMBER:","DATE:","INVOICE:"],quotation:["PREPARED FOR :","NUMBER:","DATE:","VALID UNTIL:"]}[t];
  const dv=t==="quotation"?dfmt(s.due):s.due;
  const pay=t==="invoice"?s.pay:(s.pay!=="Auto"?s.pay:(sub>0&&paid>=sub?"FULL PAYMENT":paid>0?"PART PAYMENT":""));const left=(t==="invoice"||t==="receipt")?`<div class="cb"><span><i class="${pay==="PART PAYMENT"?"on":""}"></i>PART PAYMENT</span><span><i class="${pay==="FULL PAYMENT"?"on":""}"></i>FULL PAYMENT</span></div>`:"<div></div>";
  const lines=(s.cd||"").split("\n").filter(Boolean);
  h+=`<div class="r1">${left}<h1>${t==="invoice"?"INVOICE":t==="receipt"?"RECEIPT":"QUOTATION"}</h1></div>
  <div class="bt"><div class="bl"><span>${lab[0]}</span><div><b>${esc(s.cn)||"&nbsp;"}</b><p>${lines.map(esc).join("<br>")}</p></div></div>
  <div class="mt"><span>${lab[1]}</span><span>${esc(s.no)}</span><span>${lab[2]}</span><span>${dfmt(s.date)}</span><span>${lab[3]}</span><span>${t==="receipt"?esc(s.inv):esc(dv)}</span></div></div>
  <table><colgroup><col style="width:390px"><col style="width:120px"><col style="width:100px"><col style="width:190px"></colgroup><thead><tr><th>Description</th><th>Quantity</th><th style="text-align:right">Unit price</th><th class="am">Amount</th></tr></thead><tbody>
  ${rows.map(r=>`<tr><td>${esc(r.d)||"&nbsp;"}</td><td class="qc">${r.q}</td><td class="ur">${r.e?"":fm(r.u,c)}</td><td class="am">${r.e?"":fm(r.a,c)}</td></tr>`).join("")}</tbody></table>`;
  const R=(l,v)=>`<div class="tr"><span class="l">${l}</span><span class="v">${v}</span></div>`;
  if(t==="invoice")h+=`<div class="tt">${R("SUBTOTAL:",fm(sub,c))}${R(`VAT (${vr}%):`,fm(vat,c))}${R("TOTAL:",fm(tot,c))}${R("PAID:",fm(paid,c))}</div><div class="bb"><span class="l">BALANCE DUE</span><span class="v">${fm(bal,c)}</span></div>`;
  if(t==="quotation")h+=`<div class="tt">${R("SUBTOTAL:",fm(sub,c))}${R(`VAT (${vr}%):`,fm(vat,c))}</div><div class="bb"><span class="l">TOTAL</span><span class="v">${fm(tot,c)}</span></div>`;
  if(t==="receipt")h+=`<div class="tt">${R("TOTAL:",fm(sub,c))}${R("RECEIVED:",fm(paid,c))}</div><div class="bb"><span class="l">BALANCE</span><span class="v">${fm(sub-paid,c)}</span></div>`;
  if(t==="invoice"){const b=BANK[c]||{};
   h+=`<div class="pi"><h3>Payment Info:</h3>`+(b.acct?`<dl><dt>Account Name:</dt><dd>${esc(b.name)}</dd><dt>Account Number:</dt><dd class="b">${esc(b.acct)}</dd><dt>Bank Name:</dt><dd>${esc(b.bank)}</dd>${b.iban?`<dt>IBAN:</dt><dd>${esc(b.iban)}</dd>`:""}${b.swift?`<dt>SWIFT/BIC:</dt><dd>${esc(b.swift)}</dd>`:""}</dl>`:`<div class="np" style="color:#b00020;margin-top:30px">No ${c} account set — add it under Bank accounts.</div>`)+`</div>`;
   if(!b.acct)warn=`No active ${c} bank account is configured. Do not issue this invoice until one is added (Bank accounts).`}
  if(t==="receipt")h+=`<div class="pi"><h3>Payment Details:</h3><dl><dt>Date Paid:</dt><dd>${dfmt(s.date)}</dd><dt>Method:</dt><dd>${esc(s.meth)}</dd>${s.ref?`<dt>Reference:</dt><dd>${esc(s.ref)}</dd>`:""}${s.acc?`<dt>Account:</dt><dd>${esc(s.acc)}</dd>`:""}</dl><div class="tx" style="margin-top:22px">Thank you for your payment.</div></div>`;
  if(t==="receipt"&&(paid<=0||paid>sub))warn="Amount received must be above zero and not more than the total.";
  if(t==="quotation"&&s.terms)h+=`<div class="pi"><h3>Terms:</h3><div class="tx">${esc(s.terms)}</div></div>`;
  if(rows.some(r=>r.e))warn=(warn?warn+" ":"")+"Some lines have no price yet.";
 }
 if(t==="proposal"){const pr=mn(s.price),dp=Math.min(100,Math.max(0,parseFloat(s.dep)||0)),d1=Math.round(pr*dp/100),cu=s.cur;
  const L=(s.list||"").split("\n").map(x=>x.trim()).filter(Boolean),M=(s.ms||"").split("\n").filter(x=>x.trim()),T=(s.terms||"").split("\n").filter(x=>x.trim());if(DEF.copyright_in_proposal&&DEF.copyright.trim())T.push(DEF.copyright.trim());
  h+=`<div class="ti">${esc(s.title)}</div>${s.sub?`<div class="su">${esc(s.sub)}</div>`:""}<div class="pm"><div><small>PREPARED FOR</small>${esc(s.cn)}</div><div><small>DATE</small>${dfmt(s.date)}</div><div><small>VALID UNTIL</small>${dfmt(s.valid)}</div></div>${s.ov?`<p class="ov">${nl(s.ov)}</p>`:""}<div class="sl">DELIVERABLES</div><ul class="bu">${L.map(x=>x[0]==="#"?`<li class="gh">${esc(x.slice(1).trim())}</li>`:`<li>${esc(x)}</li>`).join("")}</ul>${pr?`<div class="pb"><small>TOTAL INVESTMENT</small><span>${fm(pr,cu)}(${cu})</span></div>`:""}<div class="tl">${s.time?`Project Timeline : <b>${esc(s.time)}</b><br>`:""}Payment Schedule : <b>${dp}% upfront${pr?` (${fm(d1,cu)})`:""} and ${100-dp}% upon completion${pr?` (${fm(pr-d1,cu)})`:""}</b></div>${M.length?`<div class="sl">MILESTONES</div><ul class="bu sm">${M.map(x=>`<li>${esc(x)}</li>`).join("")}</ul>`:""}${T.length?`<div class="sl">KEY TERMS</div><ul class="bu sm">${T.map(x=>`<li>${esc(x)}</li>`).join("")}</ul>`:""}${s.acc?`<div class="ac">${nl(s.acc)}</div>`:""}`}
 if(t==="agreement"){const C=(s.cl||"").split(/\n\s*\n/).filter(x=>x.trim());if(DEF.copyright_in_agreement&&DEF.copyright.trim())C.push("Copyright\n"+DEF.copyright.trim());
  h+=`<div class="ti">${esc(s.title)}</div>${s.sub?`<div class="su">${esc(s.sub)}</div>`:""}<div class="pt" style="margin-top:30px"><div><b>Party A</b><br>${nl(s.pa)}</div><div><b>Party B</b><br>${nl(s.pb)}</div></div>
  <div class="cl">${C.map((x,i)=>{const[a,...r]=x.split("\n");return`<h4>${i+1}. ${esc(a)}</h4>${r.length?`<p>${esc(r.join("\n"))}</p>`:""}`}).join("")}</div>
  <div class="pt"><div class="ln">Signed for Party A<br>Date:</div><div class="ln">Signed for Party B<br>Date:</div></div>`}
 $("paper").className=(t==="proposal"||t==="agreement")?"pp":"";$("paper").innerHTML=h+FOOT;
 let w=$("bw");if(w)w.innerHTML=warn?`<div class="warn">${esc(warn)}</div>`:"";fit()}
function fit(){const p=$("paper"),w=$("pvw");if(!p||!w)return;const av=w.parentElement.clientWidth,W=p.offsetWidth,sc=Math.min(1,av/W);p.style.transform=`scale(${sc})`;w.style.width=W*sc+"px";w.style.height=p.offsetHeight*sc+"px"}
window.addEventListener("resize",fit);
window.addEventListener("beforeprint",()=>{const p=$("paper");if(!p)return;p.style.transform="scale(1.3333)";const W=p.offsetWidth,H=Math.max(p.offsetHeight,1);let st=document.getElementById("pgs");if(!st){st=document.createElement("style");st.id="pgs";document.head.appendChild(st)}st.textContent=`@media print{@page{size:${W}pt ${H}pt;margin:0}.pvw{width:${W*4/3}px!important;height:${H*4/3}px!important}}`});window.addEventListener("afterprint",()=>{fit();if(cur==="invoice"){const m=String(S.invoice.no||"").match(/(\d+)\s*$/);INV=(m?parseInt(m[1],10):INV)+1;saveINV();invTouched=false;S.invoice.no=invNo();const e=document.querySelector('[data-k="no"]');if(e)e.value=S.invoice.no;paper()}});
$("dl").onclick=()=>{const s=S[cur];document.title=(s.no||DOCS[cur].n)+" - GB Studios";window.print()};
render();

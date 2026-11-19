import {initializeApp} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import {getFirestore,collection,addDoc,query,where,orderBy,limit,onSnapshot,serverTimestamp} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const CONFIG={
  apiKey:"AIzaSyDMPGj-SB45jYeCiosKRd1TJKzq-VQZZp0",
  authDomain:"iuea-equal.firebaseapp.com",
  projectId:"iuea-equal",
  storageBucket:"iuea-equal.firebasestorage.app",
  messagingSenderId:"194358711293",
  appId:"1:194358711293:web:aee6026e409a734e02ff94"
};

const ready=CONFIG.projectId!=="PASTE_HERE";
const db=ready?getFirestore(initializeApp(CONFIG)):null;
const $=id=>document.getElementById(id);
const esc=s=>String(s??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const safe=u=>/^https:\/\//i.test(u)?u:"";
const say=(id,t)=>{const e=$(id);if(e){e.textContent=t;e.hidden=false}};
const SETUP="This feature is being set up. Please check back soon.";

function submitForm(formId,col,build,okMsg){
  const f=$(formId);if(!f)return;
  f.addEventListener("submit",async e=>{
    e.preventDefault();
    if(!ready)return say(formId+"Msg",SETUP);
    const btn=f.querySelector("button");btn.disabled=true;
    try{await addDoc(collection(db,col),{...build(new FormData(f)),approved:false,ts:serverTimestamp()});f.reset();say(formId+"Msg",okMsg)}
    catch(err){say(formId+"Msg","Sorry, something went wrong. Please check your entries and try again.")}
    btn.disabled=false})}

submitForm("projectForm","projects",fd=>({name:fd.get("name").trim(),faculty:fd.get("faculty"),title:fd.get("title").trim(),link:safe((fd.get("link")||"").trim()),description:fd.get("description").trim()}),"Thank you! Your project was submitted and will appear here after review.");
submitForm("feedbackForm","feedback",fd=>({name:(fd.get("name")||"").trim(),role:fd.get("role"),message:fd.get("message").trim()}),"Thank you! Your feedback was submitted and will appear here after review.");

function liveList(col,boxId,card){
  const box=$(boxId);if(!box)return;
  if(!ready){box.innerHTML=`<p>${SETUP}</p>`;return}
  onSnapshot(query(collection(db,col),where("approved","==",true),limit(50)),snap=>{
    const items=snap.docs.map(d=>d.data()).sort((a,b)=>(b.ts?.seconds||0)-(a.ts?.seconds||0));
    box.innerHTML=items.length?items.map(card).join(""):"<p>Nothing here yet. Be the first to submit.</p>"},
    ()=>{box.innerHTML="<p>Could not load right now. Please try again later.</p>"})}

liveList("projects","communityProjects",p=>{const l=safe(p.link);
  return `<div class="card top"><span class="tag">${esc(p.faculty)}</span><span class="tag">Student submission</span><h3>${esc(p.title)}</h3><p>${esc(p.description)}</p><small>By ${esc(p.name)}</small>${l?`<div class="btnrow"><a class="btn ghost sm" href="${esc(l)}" target="_blank" rel="noopener noreferrer">View project</a></div>`:""}</div>`});
liveList("feedback","feedbackList",f=>`<div class="card top"><span class="tag">${esc(f.role)}</span><p>${esc(f.message)}</p><small>${f.name?esc(f.name):"Anonymous"}</small></div>`);

// Community chat
const chat=$("chatBox");
if(chat){
  let cid=localStorage.getItem("cid");if(!cid){cid=(crypto.randomUUID?crypto.randomUUID():String(Math.random()).slice(2));localStorage.setItem("cid",cid)}
  const nameIn=$("chatName"),textIn=$("chatText");nameIn.value=localStorage.getItem("chatName")||"";
  if(!ready){chat.innerHTML=`<p>${SETUP}</p>`}
  else onSnapshot(query(collection(db,"messages"),orderBy("ts","desc"),limit(100)),snap=>{
    const near=chat.scrollHeight-chat.scrollTop-chat.clientHeight<120;
    const rows=snap.docs.map(d=>d.data({serverTimestamps:"estimate"})).reverse();
    chat.innerHTML=rows.length?rows.map(m=>{const t=m.ts?new Date(m.ts.seconds*1000).toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"}):"";
      return `<div class="msg${m.cid===cid?" me":""}"><b>${m.cid===cid?"You":esc(m.name)}</b>${esc(m.text)}<small>${t}</small></div>`}).join(""):"<p>No messages yet. Say hello!</p>";
    if(near||!chat.dataset.init){chat.scrollTop=chat.scrollHeight;chat.dataset.init="1"}},
    ()=>{chat.innerHTML="<p>Could not load the chat right now.</p>"});
  let last=0;
  $("chatForm").addEventListener("submit",async e=>{
    e.preventDefault();
    if(!ready)return say("chatErr",SETUP);
    const name=nameIn.value.trim().slice(0,40),text=textIn.value.trim().slice(0,500);
    if(!name||!text)return;
    if(Date.now()-last<2000)return say("chatErr","Please wait a moment before sending again.");
    last=Date.now();localStorage.setItem("chatName",name);
    try{await addDoc(collection(db,"messages"),{name,text,cid,ts:serverTimestamp()});textIn.value="";$("chatErr").hidden=true}
    catch(err){say("chatErr","Message not sent. Please try again.")}})}
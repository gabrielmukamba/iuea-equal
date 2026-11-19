const PAGES=[["index.html","Home"],["mission.html","Mission"],["innovation.html","Projects"],["standards.html","Standards"],["feedback.html","Feedback"],["community.html","Chat"],["university.html","University"],["designer.html","Designer"],["contact.html","Contact"]];
const here=location.pathname.split("/").pop()||"index.html";
const APK="https://gabrielmukamba.github.io/gabriel-website/static/";
const SOCIAL=`<div class="social-pills" style="margin-top:14px">
<a href="https://github.com/gabrielmukamba" target="_blank" rel="noopener">GitHub</a>
<a href="https://www.linkedin.com/in/gabriel-mukamba-80368241a" target="_blank" rel="noopener">LinkedIn</a>
<a href="https://www.instagram.com/mukambagabriel" target="_blank" rel="noopener">Instagram</a>
<a href="https://www.facebook.com/profile.php?id=61573141967189" target="_blank" rel="noopener">Facebook</a>
<a href="https://www.tiktok.com/@gabrielmukamba3" target="_blank" rel="noopener">TikTok</a>
<a href="https://www.youtube.com/@Gabrielmukamba3" target="_blank" rel="noopener">YouTube</a></div>`;
document.body.insertAdjacentHTML("afterbegin",`<header class="site-header"><nav class="navbar">
<a class="brand" href="index.html"><img src="images/iuea-logo.png" alt="IUEA logo" onerror="this.style.display='none'">IUEA EQUAL</a>
<button class="menu-btn" aria-label="Menu" onclick="document.querySelector('.links').classList.toggle('open')">Menu</button>
<ul class="links">${PAGES.map(([h,t])=>`<li><a href="${h}" class="${h===here?"active":""}">${t}</a></li>`).join("")}</ul></nav></header>`);
document.body.insertAdjacentHTML("beforeend",`<footer class="site-footer"><div class="wrap">
<div class="foot-cta"><img src="images/iuea-logo.png" alt="IUEA logo" onerror="this.style.display='none'"><p>IUEA EQUAL is an independent student initiative. It is not an official IUEA project.</p>
<a class="btn alt" href="community.html">Join the chat</a><a class="btn ghost" href="https://gabrielmukamba.github.io/iuea-connect/" target="_blank" rel="noopener">IUEA Connect</a></div>
<div class="foot-grid"><div><h4>Quick links</h4><ul>
<li><a href="mission.html">Mission</a></li><li><a href="innovation.html">Projects</a></li><li><a href="standards.html">Standards</a></li><li><a href="feedback.html">Feedback</a></li><li><a href="community.html">Community chat</a></li><li><a href="university.html">The University</a></li><li><a href="designer.html">About the designer</a></li><li><a href="privacy.html">Privacy</a></li><li><a href="https://iuea.ac.ug" target="_blank" rel="noopener">IUEA website</a></li></ul></div>
<div><h4>Contact</h4><address><a href="mailto:gabrielmukamba7@gmail.com">gabrielmukamba7@gmail.com</a><a href="https://wa.me/256727440898" target="_blank" rel="noopener">WhatsApp +256 727 440 898</a></address>${SOCIAL}</div></div></div>
<p class="copy">&copy; 2026 IUEA EQUAL Initiative<br>Designed and created by <a href="designer.html" style="color:var(--gold)">Wilondja Mukamba Gabriel (Gabriel Mukamba)</a></p></footer>`);

// Built-in projects. Add new ones here.
const PROJECTS=[
{t:"CivilTech Concrete Calculator",f:"Engineering",s:"Built",by:"Wilondja Mukamba Gabriel",d:"Works out the sand, gravel and cement needed for a given concrete volume and mix ratio, so students and small contractors can estimate materials before ordering.",live:"https://gabrielmukamba.github.io/civiltech-structural-material-concrete-calculator/",src:"https://github.com/gabrielmukamba/civiltech-structural-material-concrete-calculator",apk:"concrete-calculator.apk"},
{t:"AI Engineering Translation App",f:"Engineering",s:"Built",by:"Wilondja Mukamba Gabriel",d:"A Python and Flask web app that uses Google's Gemini API to translate technical industrial documentation. Also available as an Android app.",live:"https://engineering-ai-translator.onrender.com",src:"https://github.com/gabrielmukamba/engineering-ai-translator",apk:"engineering-ai-translator.apk"},
{t:"Calculate App",f:"Engineering",s:"Built",by:"Wilondja Mukamba Gabriel",d:"An everyday calculator built in plain HTML, CSS and JavaScript with no libraries.",live:"https://gabrielmukamba.github.io/calculator-app/",src:"https://github.com/gabrielmukamba/calculator-app",apk:"engineering-calculator-app.apk"},
{t:"To-Do List App",f:"Engineering",s:"Built",by:"Wilondja Mukamba Gabriel",d:"A task manager to add, complete and remove tasks instantly, built with plain JavaScript.",live:"https://gabrielmukamba.github.io/todo-list/",src:"https://github.com/gabrielmukamba/todo-list",apk:"todo-app.apk"},
{t:"IUEA Connect",f:"Engineering",s:"Built",by:"Wilondja Mukamba Gabriel",d:"A multi-page platform that unites IUEA students to share ideas, projects and applications.",live:"https://gabrielmukamba.github.io/iuea-connect/"},
{t:"Password Generator",f:"Engineering",s:"Built",by:"Wilondja Mukamba Gabriel",d:"A Python tool that generates strong random passwords from the length and character types you choose.",src:"https://github.com/gabrielmukamba/password-generator"},
{t:"VERTEX Corporate Website",f:"Business",s:"Practice",by:"Wilondja Mukamba Gabriel",d:"A fictional corporate website built to practise professional layout and responsive design.",live:"https://gabrielmukamba.github.io/vertex-corporate-website/",src:"https://github.com/gabrielmukamba/vertex-corporate-website"},
{t:"Campus Peer Mentorship & Legal Aid Portal",f:"Law",s:"Concept",by:"Concept by IUEA EQUAL",d:"An idea for a peer guidance platform that helps international and local students understand university policies, rights and academic procedures."},
{t:"East Africa Youth Entrepreneurship Tracker",f:"Business",s:"Concept",by:"Concept by IUEA EQUAL",d:"An idea for a directory connecting student startups with campus mentors, pitch competitions and funding opportunities."}];
const n=document.getElementById("nProj");if(n)n.textContent=PROJECTS.length;
const hub=document.getElementById("hubList");
if(hub){const F=["All","Engineering","Business","Law"],bar=document.getElementById("hubFilters");let cur="All";
const b=(h,t)=>h?`<a class="btn ghost sm" href="${h}" target="_blank" rel="noopener">${t}</a>`:"";
const draw=()=>{bar.innerHTML=F.map(x=>`<button type="button" class="btn ${x===cur?"alt":"ghost"}" data-f="${x}">${x}</button>`).join("");
const L=PROJECTS.filter(p=>cur==="All"||p.f===cur);
hub.innerHTML=L.length?L.map(p=>{const btns=b(p.live,"Live demo")+b(p.src,"Source code")+(p.apk?`<a class="btn alt sm" href="${APK+p.apk}" download>Download APK</a>`:"");
return `<div class="card top"><span class="tag">${p.f}</span><span class="tag">${p.s}</span><h3>${p.t}</h3><p>${p.d}</p><small>By ${p.by}</small>${btns?`<div class="btnrow">${btns}</div>`:""}</div>`}).join(""):"<p>No projects here yet.</p>";
bar.querySelectorAll("button").forEach(x=>x.onclick=()=>{cur=x.dataset.f;draw()})};draw()}

const calc=document.getElementById("calc");
if(calc){const R=[["Innovation & Problem Solving",30],["Leadership & Communication",25],["Academic & Intellectual Competence",20],["Character & Community Impact",15],["Stage Presence & Presentation",10]];
calc.innerHTML=R.map(([l,w],i)=>`<div class="row"><label for="r${i}">${l} (${w}%): <b id="v${i}">5</b>/10</label><input id="r${i}" type="range" min="0" max="10" value="5"></div>`).join("")+`<p>Total score: <span class="total" id="tot">50</span> / 100</p>`;
const up=()=>{let t=0;R.forEach(([l,w],i)=>{const v=+document.getElementById("r"+i).value;document.getElementById("v"+i).textContent=v;t+=w*v/10});document.getElementById("tot").textContent=Math.round(t*10)/10};
R.forEach((x,i)=>document.getElementById("r"+i).oninput=up)}
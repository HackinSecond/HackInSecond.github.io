(function(){
var C=window.HIS_CONFIG,D=window.HIS_DATA,$=function(s,r){return(r||document).querySelector(s)},$$=function(s,r){return[].slice.call((r||document).querySelectorAll(s))};
function esc(s){return String(s==null?'':s).replace(/[&<>"']/g,function(c){return{'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]})}
function ytId(u){var m=String(u).match(/(?:v=|youtu\.be\/|embed\/|shorts\/)([\w-]{11})/);return m?m[1]:(/^[\w-]{11}$/.test(u)?u:'')}
var R={
video:function(v){var id=ytId(v.id||v.url);return '<article class="card"><img class="thumb" loading="lazy" width="480" height="270" alt="" src="'+esc(v.thumb||'https://i.ytimg.com/vi/'+id+'/hqdefault.jpg')+'" onerror="this.style.display=\'none\'"><h3>'+esc(v.title)+'</h3><p>'+esc(v.description)+'</p><span class="tag">'+esc(v.channel)+'</span><span class="tag">'+esc(v.category)+'</span><p><a class="btn" href="https://www.youtube.com/watch?v='+id+'" rel="noopener">Watch</a></p></article>'},
tool:function(t){return '<article class="card" data-cat="'+esc(t.category)+'"><span class="tag">'+esc(t.category)+'</span><span class="tag">'+esc(t.level)+'</span><h3>'+esc(t.name)+'</h3><p>'+esc(t.short)+'</p><p><a href="/tools/details?id='+esc(t.id)+'">View details</a></p></article>'},
course:function(c){return '<article class="card" data-cat="'+esc(c.level)+'"><span class="tag">'+esc(c.level)+'</span><h3>'+esc(c.title)+'</h3><p>'+esc(c.description)+'</p><p><a href="/courses/details?id='+esc(c.id)+'">Course details</a></p></article>'},
faq:function(f){return '<details class="faq"><summary>'+esc(f.q)+'</summary><p>'+esc(f.a)+' <a href="'+esc(f.link)+'">Learn more</a></p></details>'}
};
var SRC={videos:['video',D.videos],tools:['tool',D.tools],products:['course',D.products],courses:['course',D.courses],faqs:['faq',D.faqs]};
var EMPTY={videos:'No videos have been added yet. Watch on YouTube: ',tools:'No tools listed yet.',products:'No premium products are configured yet. Coming soon.',courses:'No courses are published yet. Coming soon.',faqs:''};
$$('[data-list]').forEach(function(el){
  var k=el.dataset.list,s=SRC[k],items=s[1].slice();
  if(el.dataset.featured)items=items.filter(function(x){return x.featured}).concat(items).filter(function(x,i,a){return a.indexOf(x)===i});
  if(k==='videos')items.sort(function(a,b){return String(b.date||'').localeCompare(String(a.date||''))});
  if(el.dataset.limit)items=items.slice(0,+el.dataset.limit);
  if(!items.length){el.innerHTML='<p class="lead">'+EMPTY[k]+(k==='videos'?C.youtube.map(function(y){return '<a href="'+y.url+'" rel="noopener">'+esc(y.name)+'</a>'}).join(' · '):'')+'</p>';return}
  el.innerHTML=items.map(s[0]==='faq'?R.faq:R[s[0]]).join('');
});
$$('[data-filter]').forEach(function(box){
  var cards=$$('article.card',$(box.dataset.filter));if(!cards.length){box.hidden=true;return}
  var q=$('input',box),sel=$('select',box),cats=[];
  cards.forEach(function(c){var x=c.dataset.cat;if(x&&cats.indexOf(x)<0)cats.push(x)});
  if(sel)sel.innerHTML='<option value="">All categories</option>'+cats.map(function(c){return '<option>'+esc(c)+'</option>'}).join('');
  function f(){var t=q.value.toLowerCase();cards.forEach(function(c){c.hidden=!(c.textContent.toLowerCase().indexOf(t)>-1&&(!sel||!sel.value||c.dataset.cat===sel.value))})}
  q.addEventListener('input',f);sel&&sel.addEventListener('change',f);
});
var det=$('[data-detail]');
if(det){var k=det.dataset.detail,id=new URLSearchParams(location.search).get('id'),list=k==='tool'?D.tools:D.courses.concat(D.products),it=list.filter(function(x){return x.id===id})[0],h='';
  if(!it)h='<p>Item not found. <a href="'+(k==='tool'?'/tools/':'/courses/')+'">Back to the directory</a>.</p>';
  else if(k==='tool'){document.title=it.name+' | Hack In Seconds';h='<h1>'+esc(it.name)+'</h1><p class="lead">'+esc(it.long)+'</p><p><span class="tag">'+esc(it.category)+'</span><span class="tag">'+esc(it.level)+'</span><span class="tag">'+esc(it.type)+'</span></p><h2>Features</h2><ul>'+it.features.map(function(f){return '<li>'+esc(f)+'</li>'}).join('')+'</ul><h2>Requirements and authorized use</h2><p>'+esc(it.requirements)+'</p><h2>Limitations</h2><p>This page is an educational summary. Hack In Seconds has not security-tested or verified third-party downloads. Always use the official source.</p><p><a class="btn" href="'+esc(it.source)+'" rel="noopener">Official website</a> '+(it.download?'<a class="btn sec" href="'+esc(it.download)+'" rel="noopener">Official download page</a> ':'<span class="tag">No download link: see official site</span> ')+(it.docs?'<a class="btn sec" href="'+esc(it.docs)+'" rel="noopener">Documentation</a>':'')+'</p>'}
  else{document.title=it.title+' | Hack In Seconds';h='<h1>'+esc(it.title)+'</h1><p class="lead">'+esc(it.description)+'</p><p><span class="tag">'+esc(it.level)+'</span></p><h2>Prerequisites</h2><p>'+esc(it.prerequisites||'None stated')+'</p><h2>Learning outcomes</h2><ul>'+(it.outcomes||[]).map(function(o){return '<li>'+esc(o)+'</li>'}).join('')+'</ul><h2>Curriculum</h2>'+(it.curriculum||[]).map(function(s){return '<h3>'+esc(s.section)+'</h3><ul>'+s.lessons.map(function(l){return '<li>'+esc(l)+'</li>'}).join('')+'</ul>'}).join('')+'<h2>Price</h2><p>'+(it.price?esc(it.price)+' '+esc(it.currency):'Not set')+'</p><p>'+(it.checkout?'<a class="btn" href="'+esc(it.checkout)+'" rel="noopener">Buy (external checkout)</a>':'<strong>Purchase not available yet.</strong> Payment and delivery need a real checkout service, which has not been configured.')+'</p>'}
  det.innerHTML=h}
var mb=$('#menu');mb&&mb.addEventListener('click',function(){var n=$('nav');var o=n.classList.toggle('open');mb.setAttribute('aria-expanded',o)});
function modal(el,open){el.classList.toggle('on',open);if(open){var f=$('input,button',el);f&&f.focus()}}
$$('.ov').forEach(function(o){o.addEventListener('click',function(e){if(e.target===o||e.target.closest('[data-close]'))modal(o,false)})});
document.addEventListener('keydown',function(e){if(e.key==='Escape')$$('.ov.on').forEach(function(o){modal(o,false)})});
var so=$('#search-ov'),si=$('#search-in'),sr=$('#search-res');
var IDX=[];D.videos.forEach(function(v){IDX.push({t:v.title,d:v.description,k:'Video',u:'https://www.youtube.com/watch?v='+ytId(v.id),x:(v.tags||[]).join(' ')})});
D.tools.forEach(function(t){IDX.push({t:t.name,d:t.short,k:'Tool',u:'/tools/details?id='+t.id,x:(t.tags||[]).join(' ')})});
D.courses.concat(D.products).forEach(function(c){IDX.push({t:c.title,d:c.description,k:'Course',u:'/courses/details?id='+c.id,x:''})});
D.faqs.forEach(function(f){IDX.push({t:f.q,d:f.a,k:'FAQ',u:f.link,x:f.kw})});
[['Free Tools','/tools/'],['Premium Tools','/tools/premium'],['Courses','/courses/'],['Videos','/videos/'],['Tutorials','/tutorials/'],['About','/about'],['Contact','/contact'],['FAQ','/faq'],['Privacy Policy','/legal/privacy'],['Terms of Use','/legal/terms'],['Cybersecurity Disclaimer','/legal/disclaimer']].forEach(function(p){IDX.push({t:p[0],d:'Page',k:'Page',u:p[1],x:''})});
$$('[data-search]').forEach(function(b){b.addEventListener('click',function(){modal(so,true)})});
si&&si.addEventListener('input',function(){var q=si.value.toLowerCase().trim();if(!q){sr.innerHTML='';return}
  var r=IDX.filter(function(i){return q.split(/\s+/).every(function(w){return(i.t+' '+i.d+' '+i.x).toLowerCase().indexOf(w)>-1})}).slice(0,12);
  sr.innerHTML=r.length?r.map(function(i){return '<a href="'+esc(i.u)+'"><small>'+i.k+'</small><br>'+esc(i.t)+'</a>'}).join(''):'<p class="lead">No results for "'+esc(q)+'". Try a different keyword or <a href="/contact">contact us</a>.</p>'});
function send(form){var st=$('.st',form),id=C.formspreeId;
  if(!id||id.indexOf('YOUR_')===0){st.className='st err';st.textContent='This form is not connected yet. The site owner must set formspreeId in js/config.js.';return}
  var btn=$('button[type=submit]',form);btn.disabled=true;st.className='st';st.textContent='Sending...';
  fetch('https://formspree.io/f/'+encodeURIComponent(id),{method:'POST',body:new FormData(form),headers:{Accept:'application/json'}}).then(function(r){
    if(r.ok){st.className='st ok';st.textContent='Thank you. Your submission was received.';form.reset()}else throw 0}).catch(function(){st.className='st err';st.textContent='Submission failed. Please try again later.'}).then(function(){btn.disabled=false})}
$$('form[data-fs]').forEach(function(f){
  var pref=$('[name=preference]',f),ct=$('[name=contact]',f);
  pref&&pref.addEventListener('change',function(){ct.type=pref.value==='Phone'?'tel':'email';ct.autocomplete=ct.type});
  f.addEventListener('submit',function(e){e.preventDefault();var st=$('.st',f);
    if(!f.checkValidity()){st.className='st err';st.textContent='Please complete the required fields correctly.';return}send(f)})});
var pop=$('#pop-ov');
if(pop){var k='his_pop',t=+localStorage.getItem(k)||0;
  if(Date.now()>t)setTimeout(function(){if(!$('.ov.on'))modal(pop,true)},C.popupDelaySeconds*1000);
  pop.addEventListener('click',function(e){if(e.target.closest('[data-close]')||e.target===pop)localStorage.setItem(k,Date.now()+C.popupSnoozeDays*864e5)});
  $$('[data-open-pop]').forEach(function(b){b.addEventListener('click',function(){modal(pop,true)})})}
var bb=$('#bot-b'),bot=$('#bot'),log=$('.log',bot),KB=D.faqs.concat([{q:'Contact',a:'Use the contact form.',link:'/contact',kw:'contact email support'}]);
function say(c,t,l){var d=document.createElement('div');d.className='m '+c;d.textContent=t;if(l){d.appendChild(document.createTextNode(' '));var a=document.createElement('a');a.href=l;a.textContent='Open page';d.appendChild(a)}log.appendChild(d);log.scrollTop=1e9}
function reset(){log.innerHTML='';say('b','Hi! I am a simple rule-based FAQ assistant (not AI). Ask about tools, videos, courses, contact or legal info.');$('.sug',bot).innerHTML=D.faqs.slice(0,3).map(function(f){return '<button class="ib" type="button">'+esc(f.q)+'</button>'}).join(' ')}
function ask(q){say('u',q);var w=q.toLowerCase().split(/\W+/).filter(function(x){return x.length>2}),best=null,bs=0;
  KB.forEach(function(f){var s=0,h=(f.q+' '+f.kw).toLowerCase();w.forEach(function(x){if(h.indexOf(x)>-1)s++});if(s>bs){bs=s;best=f}});
  best?say('b',best.a,best.link):say('b','I do not have enough information to answer that. Please check the FAQ or use the contact form.','/contact')}
bb.addEventListener('click',function(){var o=bot.classList.toggle('on');bb.setAttribute('aria-expanded',o);if(o&&!log.children.length)reset()});
$('.sug',bot).addEventListener('click',function(e){if(e.target.tagName==='BUTTON')ask(e.target.textContent)});
$('form',bot).addEventListener('submit',function(e){e.preventDefault();var i=$('input',e.target);if(i.value.trim())ask(i.value.trim());i.value=''});
$('[data-reset]',bot).addEventListener('click',reset);
})();

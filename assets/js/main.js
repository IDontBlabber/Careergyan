/* Career Gyan – shared site script.
 * Extracted verbatim from the original single-page file (both <script> blocks, same order).
 * The only edits are routing-related; every one is listed in CHANGES.md. */
(function(){
'use strict';
var IMG='https://careergyan.co/images/';
var $=function(s,c){return (c||document).querySelector(s)};
var $$=function(s,c){return Array.prototype.slice.call((c||document).querySelectorAll(s))};
var icon=function(id,cls){return '<svg class="ic'+(cls?' '+cls:'')+'"><use href="#i-'+id+'"/></svg>'};
var esc=function(s){return String(s).replace(/[&<>"]/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]})};

/* ---------- DATA (from careergyan.co) ---------- */
var COUNTRIES={
  'uk':{n:'UK',c:'UK',img:'uk.png',page:'study-in-uk.php'},
  'usa':{n:'USA',c:'US',img:'usa.png',page:'study-in-usa.php'},
  'canada':{n:'Canada',c:'CA',page:'study-in-canada.php'},
  'france':{n:'France',c:'FR',img:'france.png',page:'study-in-france.php'},
  'germany':{n:'Germany',c:'DE',img:'germany.png',page:'study-in-germany.php'},
  'spain':{n:'Spain',c:'ES',page:'study-in-spain.php'},
  'netherlands':{n:'Netherlands',c:'NL',img:'netherlands.png',page:'study-in-netherlands.php'},
  'australia':{n:'Australia',c:'AU',img:'australia.png',page:'study-in-australia.php'},
  'new-zealand':{n:'New Zealand',c:'NZ',img:'newsland.png',page:'study-in-new-zealand.php'},
  'romania':{n:'Romania',c:'RO',img:'romania.png',page:'study-in-romania.php'},
  'hungary':{n:'Hungary',c:'HU',page:'study-in-hungary.php'},
  'ireland':{n:'Ireland',c:'IE',img:'ireland.png',page:'study-in-ireland.php'},
  'sweden':{n:'Sweden',c:'SE',img:'swedan.png',page:'study-in-sweden.php'},
  'latvia':{n:'Latvia',c:'LV',img:'latvia.png',page:'study-in-latvia.php'},
  'lithuania':{n:'Lithuania',c:'LT',img:'lithuania.png',page:'study-in-lithuania.php'},
  'poland':{n:'Poland',c:'PL',img:'poland.png',page:'study-in-poland.php'},
  'finland':{n:'Finland',c:'FI',page:'study-in-finland.php'},
  'italy':{n:'Italy',c:'IT',img:'italy.png',page:'study-in-italy.php'}
};
var DD_ORDER=['uk','canada','germany','netherlands','new-zealand','hungary','sweden','lithuania','finland','usa','france','spain','australia','romania','ireland','latvia','poland','italy'];
var GRID_ALL=['usa','uk','germany','australia','ireland','france','poland','sweden','netherlands','lithuania','romania','latvia','italy','new-zealand','canada','spain','hungary','finland'];
var GRID_BLR=['uk','usa','hungary','france','germany','netherlands','australia','ireland','sweden','latvia','lithuania','poland','italy','new-zealand','romania'];
var COURSES=[
  {s:'arts',n:'Arts',i:'arts'},{s:'engineering',n:'Engineering',i:'eng'},{s:'management',n:'Management',i:'mgmt'},
  {s:'medicine',n:'Medicine',i:'med'},{s:'pharmacy',n:'Pharmacy',i:'pharm'},{s:'science',n:'Science',i:'sci'},{s:'technology',n:'Technology',i:'tech'}
];
var LOCS=[
  {s:'bangalore',n:'Bangalore',route:'abroad-education-consultants-in-bangalore.html'},
  {s:'hyderabad',n:'Hyderabad',page:'abroad-education-consultants-in-hyderabad.php'},
  {s:'bahrain',n:'Bahrain',page:'abroad-education-consultants-in-bahrain.php'},
  {s:'germany',n:'Germany',page:'study-abroad-consultants-in-germany.php'},
  {s:'pune',n:'Pune',page:'abroad-education-consultants-in-pune.php'}
];
var OFFICES=[
  {k:'india',loc:'bangalore',n:'Bangalore CBD (HQ)',a:'#19, G - 2, Brigade Gardens, Church Street, Bangalore 560001',m:'https://maps.app.goo.gl/BefHKDGY5McM3AYBA',p:['+91 9606868888','+91 9686898888'],e:'enquiry@careergyan.co'},
  {k:'india',loc:'bangalore',n:'Jayanagar Office',a:'41, 7th B Main Rd, 4th Block, Jayanagar, Bengaluru, Karnataka 560011',m:'https://maps.app.goo.gl/bxtjeFRmbXvaS5Aa8',p:['+91 96868 98888'],e:'enquiry@careergyan.co'},
  {k:'india',loc:'bangalore',n:'Bangalore North',a:'#208, 8th B Main Road, 2nd Main, 2nd Cross HRBR Layout, Kalyan Nagar, Bangalore 560043',m:'https://maps.app.goo.gl/GLZk8EAzMm4mdAXk8',p:['+91 9686898888'],e:'Enquire@careergyan.co'},
  {k:'india',loc:'hyderabad',n:'Hyderabad',a:"Lorven Smart Spaces , 2nd floor , Vaishnavi's Cynosure ,Telecom Nagar Extension, Gachibowli , hyderabad 500032",m:'https://maps.app.goo.gl/TaxNt1GPD7FbCscLA',p:['+91 90716 63366'],e:'hyderabad@careergyan.co'},
  {k:'india',loc:'pune',n:'Pune',a:'Office No 214, Kamala Corner, 1st floor, near Morya Hospital, Chinchwad Pune 411033',m:'https://maps.app.goo.gl/GfHyDgHNV9mxk8ZH7',p:['+91 9822632911'],e:'pune@careergyan.co'},
  {k:'india',loc:'davanagere',n:'Davanagere Office',a:'#2837/1, 1st Floor, Bhari Plaza, S S Layout, Indoor Stadium Road, Davanagere 577004',m:'https://maps.app.goo.gl/WxABWrvGqdwkdKwN7',p:['+91 99647 57666','+91 96068 68888'],e:'enquiry@careergyan.co'},
  {k:'intl',hide:1,loc:'bahrain',n:'Bahrain',a:'CR no 145279-1. Office no. 5 Al Waine BDSME , 5th floor, ABC Mall , Juffair, Kingdom of Bahrain',m:'https://maps.app.goo.gl/zPydVATRQCeTkWpB9',p:['+973 3658 4499','+973 3468 2212'],e:'bahrain@careergyan.co'},
  {k:'intl',loc:'germany',n:'Germany',a:'Kreuzäckerstrasse 26, 70794, Filderstadt, Germany',m:'https://www.google.com/maps?q=Kreuz%C3%A4ckerstrasse%2026%2C%2070794%2C%20Filderstadt%2C%20Germany',p:['+49 176 34998057']}
];
var VOFFICES=OFFICES.filter(function(o){return o.loc!=='bahrain'});
var EVENTS=[
  {t:'Study in Europe Workshop 2027',d:'Sunday, 21 November 2027',tm:'11:00 AM – 1:00 PM + Live Q&A',l:'In-person workshop · Venue to be announced',m:'',img:'https://images.unsplash.com/photo-1523580494863-6f3031224c94?auto=format&fit=crop&w=1400&q=85',u:'study-in-europe-workshop-2027',city:'Workshop',kind:'Workshop',page:'study-in-europe-workshop-2027.html'},
  {t:'Career Gyan Abroad Education Fair – Intake 2026',d:'Sunday, 12 October 2025',tm:'12:00 AM',l:'The Park , MG Road , Bangalore',m:'https://maps.app.goo.gl/48nwYCnJNvaxDgnH7',img:'intake-2026.png',u:'career-gyan-abroad-education-fair',city:'Bangalore'},
  {t:'Germany’s Chancekarte Workshop - Bangalore',d:'Sunday, 12 October 2025',tm:'10:00 AM',l:'The Park Bangalore',m:'https://maps.app.goo.gl/48nwYCnJNvaxDgnH7',img:'germany-workshop.png',u:'abroad-education-fair-intake-2026',city:'Bangalore'},
  {t:'Career Gyan Abroad Education Workshop Your Gateway to the 2026 Intake',d:'Saturday, 30 August 2025',tm:'10:00 AM',l:'Kenko Asia, Bahrain',m:'https://share.google/fsGTogexzC3dip1Zy',img:'study-bahrain-re.jpg',u:'careergyan-study-abroad-expo-bahrain-2025',city:'Bahrain'},
  {t:'Finance Your Global Dreams with State Bank of India',d:'Saturday, 02 August 2025',tm:'10:00 AM',l:'State Bank of India, HSR Division',m:'https://www.google.com/maps?q=12.914559364318848%2C77.64462280273438&z=17&hl=en',img:'SBI-meetup-1.png',u:'finance-your-global-dreams-with-state-bank-of-india',city:'Bangalore'},
  {t:'Study Abroad Coffee meetup | 26th July - Coffee Brewery , Banashankari',d:'Saturday, 26 July 2025',tm:'11:00 AM',l:'Coffee Brewery, Banashankari',m:'https://maps.app.goo.gl/oR2F8hzfLMBmxrBBA',img:'BSK%20meetup.png',u:'careerbrews-study-abroad-meetup-banashankri-july-26',city:'Bangalore'},
  {t:'Careerbrews Europe Coffee Meetup - July 5th',d:'Saturday, 05 July 2025',tm:'10:00 AM',l:'GoSpaze, Whitefield',m:'https://maps.app.goo.gl/Wh3w5JdZtZxuU1yD8',img:'europe-meetup1.png',u:'careerbrews-europe-coffee-meetup',city:'Bangalore'},
  {t:'Study in Italy Workshop',d:'Saturday, 28 June 2025',tm:'11:00 AM',l:'BHIVE Premium, Church Street',m:'https://maps.app.goo.gl/MTmXqL2uQwDNcTEi7?g_st=iw',img:'UNI-ITALIA%20Event%20banner%20%281%29.png',u:'study-in-italy-workshop',city:'Bangalore'},
  {t:'Study in Europe Coffee Meet Up with Career Gyan',d:'Saturday, 14 June 2025',tm:'10:00 AM',l:'Starbucks, HRBR Layout',m:'https://maps.app.goo.gl/YrRNsDMCj81C8t2p6',img:'Coffee%20meetup%20Event%20in%20HRBR.png',u:'study-in-europe-coffee-meet-up-with-career-gyan',city:'Bangalore'},
  {t:'Study in Germany & France Coffee Meetup with Career Gyan',d:'Saturday, 24 May 2025',tm:'10:00 AM',l:'Starbucks, Jayanagar',m:'https://maps.app.goo.gl/uySFMqtiUfnGmdqU9',img:'Study%20in%20Germany%20%26%20France%20Coffee%20Meetup.png',u:'study-in-germany-and-france-coffee-meetup',city:'Bangalore'},
  {t:'Career Gyan Brews Meetup – Study in Germany',d:'Saturday, 03 May 2025',tm:'10:00 AM',l:'Cafe Lavista, Church Street, Bengaluru',m:'https://maps.app.goo.gl/7YnptbzcLWsm6JR96',img:'Coffee%20meet%20up.png',u:'career-gyan-brews-meetup',city:'Bangalore'},
  {t:'Career Gyan Education Fair - Hyderabad | 26th April 2025',d:'Saturday, 26 April 2025',tm:'10:00 AM',l:'Hyatt Place, Banjara Hills, Hyderabad',m:'https://maps.app.goo.gl/DuvyAvq1V2kYBE6e9',img:'career-gyan-education-fair.png',u:'career-gyan-education-fair-in-hyderabad',city:'Hyderabad'}
];
var SOCIALS=[
  {u:'https://www.facebook.com/Careergyanblr',i:'fb',l:'Facebook'},
  {u:'https://www.instagram.com/careergyanabroad/',i:'ig',l:'Instagram'},
  {u:'https://www.youtube.com/@careergyanblr',i:'yt',l:'YouTube'},
  {u:'https://www.linkedin.com/company/career-gyan-pvt-ltd/',i:'li',l:'LinkedIn'}
];
var PARTNERS=['summit.png','ielts.png','roombae.png','ets.png','buy-exchange.png','universities_living.png','Coracle.svg','Expatrio.svg','Fintiba.svg','Avanse.png'];

/* ---------- REUSABLE BLOCKS ---------- */
function statsHTML(six){
  var s=[['6413+','Success Stories'],['#1 Trusted','Consultancy'],['2569+','Universities'],['11+','Years of Experience'],['97%','VISA Approval (Last Intake)']];
  if(six) s.push(['50,000+','Guided Students']);
  return '<div class="stats'+(six?' six':'')+' rv">'+s.map(function(x){return '<div class="stat"><b data-count="'+x[0]+'">'+x[0]+'</b><span>'+x[1]+'</span></div>'}).join('')+'</div>';
}
function numband(six){
  var s=[['6413+','Success Stories'],['#1','Trusted Consultancy'],['2569+','Universities'],['11+','Years of Experience'],['97%','VISA Approval (Last Intake)']];
  if(six) s.push(['50,000+','Guided Students']);
  return '<div class="nb'+(six?' six':'')+'">'+s.map(function(x,i){return '<div class="rv" style="--d:'+(i*.06)+'s"><b data-count="'+x[0]+'">'+x[0]+'</b><span>'+x[1]+'</span></div>'}).join('')+'</div>';
}
var BLOCKS={
  stats5:function(){return statsHTML(false)},
  numband5:function(){return numband(false)},
  numband6:function(){return numband(true)},
  stats6:function(){return statsHTML(true)},
  trust:function(){return '<div class="trust"><div class="trust-item"><small>Membership</small><div class="logos"><img decoding="async" src="'+IMG+'home/qualityabroad/EAIE.png" alt="EAIE" loading="lazy"><img decoding="async" src="'+IMG+'home/qualityabroad/NAFSA.png" alt="NAFSA" loading="lazy"></div></div><div class="trust-item"><small>Accreditation</small><div class="logos"><img decoding="async" src="'+IMG+'germany/logos/icef-accredited-logo.png" alt="ICEF Accredited" loading="lazy"></div></div></div>'},
  roadmap:function(){return '<div class="roadmap">'+['Counselling','University Selection','Application Submission','Offer Acceptable','Visa Application'].map(function(s,i){return '<div class="rstep rv" style="--d:'+(i*.1)+'s"><div class="num">'+(i+1)+'</div><h4>'+s+'</h4></div>'}).join('')+'</div>'},
  assist:function(){return '<div class="assist">'+[['sop','SOP','Statement of Purpose'],['lor','LOR','Letter of Recommendation'],['lom','LOM','Letter of Motivation'],['cv','CV','Curriculum Vitae'],['visa','Visa','Student Visa Process']].map(function(a,i){return '<article class="assist-card rv" style="--d:'+(i*.08)+'s">'+(a[0]==='lom'?'<span class="assist-ic">'+icon('compass')+'</span>':'<img decoding="async" src="'+IMG+'home/assistance/'+a[0]+'.png" alt="'+a[1]+'" loading="lazy">')+'<h3>'+a[1]+'</h3><p>'+a[2]+'</p><span class="big">'+a[1]+'</span></article>'}).join('')+'</div>'},
  partners:function(){var l=PARTNERS.map(function(p){return '<img decoding="async" src="'+IMG+'home/partners/'+p+'" alt="'+PALT(p)+'" loading="lazy">'}).join('');return '<div class="marquee rv"><div class="track">'+l+l+'</div></div>'},
  coursetiles:function(){
    var list=[['engineering','Engineering','eng'],['arts','Arts','arts'],['management','Management','mgmt'],['science','Science','sci'],['medicine','MBBS/ Medicine','med']];
    return list.map(function(c,i){return '<a class="ctile rv" style="--d:'+(i*.07)+'s" href="'+courseHref(c[0])+'">'+icon(c[2])+'<div><h3>'+c[1]+'</h3></div><span class="go">Explore '+icon('arrow')+'</span></a>'}).join('');
  },
  reels:function(){
    var r=['C9B3UmVtAwZ','C9hcVH5tWSo','DBgGOV8sUDP','DDYsiQsNVdu'];
    return '<div class="reels">'+r.map(function(id,i){return '<a class="reel rv" style="--d:'+(i*.08)+'s" href="https://www.instagram.com/reel/'+id+'/" target="_blank" rel="noopener"><span class="play">'+icon('play')+'</span><small>@careergyanblr</small><b>Student story '+(i+1)+'</b></a>'}).join('')+'</div>';
  },
  news:function(){
    var n=[
      ['event-img.png','Education Excellence Award 2024‑25: CareerGyan Empowers Affordable Study Abroad Dreams','CareerGyan debunks common myths about the high costs of studying abroad, offering students a clear and realistic perspective.','https://bangaloremirror.indiatimes.com/bangalore/others/education-excellence-award-2024-25-make-your-study-abroad-dream-come-true-with-careergyan/articleshow/121194026.cms','Award'],
      ['event_3.png','Empowering Indian Students Through Global Education Partnerships Abroad','CareerGyan opens doors to global education by connecting Indian students with top international institutions.','https://www.instagram.com/p/DKOcKFWzQKA/','Partnerships'],
      ['event02.png','CareerGyan Connects with Spain\'s Leading Institutions for Global Education','Mr. Shiva Krishna presents the guide to global educators in Spain, strengthening CareerGyan’s mission to empower Indian students through international academic partnerships.','https://abroadnow.co/our-magazine/','Global']
    ];
    return n.map(function(x,i){return '<a class="post rv" style="--d:'+(i*.1)+'s" href="'+x[3]+'" target="_blank" rel="noopener"><div class="media"><img decoding="async" src="'+IMG+'events/'+x[0]+'" alt="'+esc(x[1])+'" loading="lazy"></div><div class="body"><span class="tag">'+x[4]+'</span><h3>'+esc(x[1])+'</h3><p>'+esc(x[2])+'</p><span class="link-arrow">Read more '+icon('arrow')+'</span></div></a>'}).join('');
  },
  socials:function(){return SOCIALS.map(function(s){return '<a href="'+s.u+'" target="_blank" rel="noopener" aria-label="'+s.l+'">'+icon(s.i)+'</a>'}).join('')},
  cta:function(){return '<div class="cta-band rv"><span class="glow"></span><div><h2>Your future starts here! Book an appointment today.</h2><p>Speak with a Career Gyan counsellor about your course, country and university options.</p><div class="actions"><a class="btn btn-light" href="contact.html">Book An Appointment '+icon('arrow')+'</a><a class="btn btn-outline-light" href="eligibility.html">Check Eligibility</a></div></div><img decoding="async" src="'+IMG+'home/quotation_img.png" alt="" loading="lazy"></div>'}
};

function courseHref(s){return 'course-'+s+'.html'}
function locHref(l){return l.route||l.page.replace(/\.php$/,'.html')}
function flagHTML(k,cls){var c=COUNTRIES[k];return '<span class="flag">'+(c.img?'<img decoding="async" src="'+IMG+'home/countries/'+c.img+'" alt="'+c.n+'" loading="lazy">':'<span class="mono">'+c.c+'</span>')+'</span>'}
function officeCard(o,i){
  var badge=o.k==='intl'?'International':(o.n.indexOf('HQ')>-1?'HQ':'India');
  return '<article class="branch rv" style="--d:'+((i%3)*.08)+'s" data-k="'+o.k+'"><div class="bh"><h3>'+esc(o.n)+'</h3><span class="badge">'+badge+'</span></div>'+
    '<a class="row" href="'+o.m+'" target="_blank" rel="noopener">'+icon('pin')+'<span>'+esc(o.a)+'</span></a>'+
    '<div class="row">'+icon('phone')+'<span>'+o.p.map(function(p){return '<a href="tel:'+p.replace(/\s/g,'')+'">'+p+'</a>'}).join(', ')+'</span></div>'+
    (o.e?'<div class="row">'+icon('mail')+'<a href="mailto:'+o.e+'">'+o.e+'</a></div>':'')+'</article>';
}
function parseDate(s){var p=s.split(', ')[1].split(' ');return {d:p[0],m:p[1].slice(0,3),y:p[2]}}
function eventImage(e){return /^https?:\/\//i.test(e.img)?e.img:'https://careergyan.co/images/content/events/'+e.img}
function eventLink(e){return e.page?'workshops/workshop-registration.html':'contact.html'}
function eventCard(e,i,rv){
  var dt=parseDate(e.d),src=eventImage(e),url=eventLink(e);
  var place=e.m?'<a href="'+e.m+'" target="_blank" rel="noopener">'+icon('pin')+'<span>'+esc(e.l)+'</span></a>':'<div>'+icon('pin')+'<span>'+esc(e.l)+'</span></div>';
  return '<article class="ev'+(rv?' rv':'')+'" style="animation-delay:'+(i*.05)+'s;--d:'+(i*.1)+'s"><a class="ev-media" href="'+url+'"><span class="bgblur" style="background-image:url(\''+src+'\')"></span><img decoding="async" src="'+src+'" alt="'+esc(e.t)+'" loading="lazy"><span class="ev-date"><b>'+dt.d+'</b><span>'+dt.m+' '+dt.y.slice(2)+'</span></span></a>'+
    '<div class="ev-body"><h3><a href="'+url+'">'+esc(e.t)+'</a></h3><div class="ev-meta"><div>'+icon('cal')+'<span>'+e.d+'</span></div><div>'+icon('clock')+'<span>'+e.tm+'</span></div>'+place+'</div>'+
    '<div class="ev-foot"><span class="city-pill">'+e.city+'</span><a class="link-arrow" href="'+url+'">'+(e.page?'View workshop &amp; register':'Enquire now')+' '+icon('arrow')+'</a></div></div></article>';
}

/* ---------- BUILD ---------- */
function build(){
  $$('[data-include]').forEach(function(el){var f=BLOCKS[el.getAttribute('data-include')];if(f)el.innerHTML=f(el.getAttribute('data-img'))});
  $$('[data-countries]').forEach(function(el){
    var list=el.getAttribute('data-countries')==='bangalore'?GRID_BLR:GRID_ALL;
    el.innerHTML=list.map(function(k,i){return countryCard(k,i)}).join('');
  });
  // nav dropdowns
  $('#dd-countries').innerHTML=DD_ORDER.map(function(k){return '<a href="study-in-'+k+'.html" data-r="country/'+k+'"><span class="code">'+COUNTRIES[k].c+'</span>'+COUNTRIES[k].n+'</a>'}).join('');
  $('#dd-courses').innerHTML=COURSES.map(function(c){return '<a href="'+courseHref(c.s)+'" data-r="'+(c.s==='arts'?'courses/arts':'course/'+c.s)+'">'+icon(c.i)+c.n+'</a>'}).join('');
  $('#dd-locations').innerHTML=LOCS.map(function(l){return '<a href="'+locHref(l)+'" data-r="'+(l.s==='bangalore'?'locations/bangalore':'location/'+l.s)+'">'+icon('pin')+l.n+'</a>'}).join('');
  $('#m-countries').innerHTML=DD_ORDER.map(function(k){return '<a href="study-in-'+k+'.html">'+COUNTRIES[k].n+'</a>'}).join('')+'<a href="all-countries.html" style="grid-column:1 / -1;font-weight:700;color:var(--blue)">View all destinations →</a>';
  $('#m-courses').innerHTML=COURSES.map(function(c){return '<a href="'+courseHref(c.s)+'">'+c.n+'</a>'}).join('');
  $('#m-locations').innerHTML=LOCS.map(function(l){return '<a href="'+locHref(l)+'">'+l.n+'</a>'}).join('');
  // footer
  $('#f-countries').innerHTML=DD_ORDER.map(function(k){return '<li><a href="study-in-'+k+'.html">'+COUNTRIES[k].n+'</a></li>'}).join('')+'<li><a href="all-countries.html" style="color:#fff;font-weight:700">All destinations</a></li>';
  $('#f-courses').innerHTML=COURSES.map(function(c){return '<li><a href="'+courseHref(c.s)+'">'+c.n+'</a></li>'}).join('');
  // home events
  if($('#home-events')){ /* MPA page guard */
  $('#home-events').innerHTML=EVENTS.slice(0,3).map(ticketCard).join('');
  $('#home-events-more').innerHTML=EVENTS.slice(3).map(function(e,i){return ticketCard(e,i%3)}).join('');
  $('#evMoreBtn').addEventListener('click',function(){var o=$('#evMore').classList.toggle('open');this.classList.toggle('open',o);$('span',this).textContent=o?'Show fewer events':'Show all '+EVENTS.length+' events';if(o)observe($('#evMore'))});
  }
  // events page
  if($('#ev-feature')){ /* MPA page guard */
  var f=EVENTS[0],fd=parseDate(f.d),fsrc=eventImage(f),furl=eventLink(f);
  $('#ev-feature').innerHTML='<article class="ev-feature"><a class="ev-media" href="'+furl+'"><span class="bgblur" style="background-image:url(\''+fsrc+'\')"></span><img decoding="async" src="'+fsrc+'" alt="'+esc(f.t)+'"><span class="ev-date"><b>'+fd.d+'</b><span>'+fd.m+' '+fd.y.slice(2)+'</span></span></a><div class="ev-body"><span class="tag">'+(f.kind||'Latest event')+'</span><h3>'+esc(f.t)+'</h3><div class="ev-meta"><div>'+icon('cal')+'<span>'+f.d+'</span></div><div>'+icon('clock')+'<span>'+f.tm+'</span></div><div>'+icon('pin')+'<span>'+esc(f.l)+'</span></div></div><div style="display:flex;gap:12px;flex-wrap:wrap;margin-top:8px"><a class="btn btn-primary" href="'+furl+'">View workshop &amp; register '+icon('arrow')+'</a></div></div></article>';
  var cities=['All'].concat(EVENTS.map(function(e){return e.city}).filter(function(c,i,a){return a.indexOf(c)===i}));
  $('#ev-filters').innerHTML=cities.map(function(c,i){var n=c==='All'?EVENTS.length:EVENTS.filter(function(e){return e.city===c}).length;return '<button class="'+(i?'':'active')+'" data-city="'+c+'">'+c+' <span style="opacity:.55">'+n+'</span></button>'}).join('');
  $('#ev-count').textContent=EVENTS.length;
  var fanImages=['https://images.unsplash.com/photo-1523580494863-6f3031224c94?auto=format&fit=crop&w=900&q=85','https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?auto=format&fit=crop&w=900&q=85','https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=900&q=85'];
  $('#ev-fan').innerHTML=EVENTS.slice(0,3).map(function(e,i){var src=fanImages[i],dt=parseDate(e.d);return '<a class="p p'+(i+1)+'" href="'+eventLink(e)+'"><img decoding="async" src="'+src+'" alt="'+esc(e.t)+'"><span class="ev-date"><b>'+dt.d+'</b><span>'+dt.m+' '+dt.y.slice(2)+'</span></span></a>'}).join('');
  renderEvents('All');
  $('#ev-filters').addEventListener('click',function(e){var b=e.target.closest('button');if(!b)return;$$('button',this).forEach(function(c){c.classList.toggle('active',c===b)});renderEvents(b.getAttribute('data-city'))});
  }
  // arts
  if($('#arts-countries')){ /* MPA page guard */
  var ARTS=[['Australia','australia'],['Canada','canada'],['Estonia',null,'EE'],['France','france'],['Germany','germany'],['India',null,'IN'],['Ireland','ireland'],['Italy','italy'],['Latvia','latvia'],['Lithuania','lithuania'],['Netherlands','netherlands'],['Poland','poland'],['Sweden','sweden'],['UK','uk'],['USA','usa']];
  $('#arts-countries').innerHTML=ARTS.map(function(a,i){return a[1]?countryCard(a[1],i):plainCountryCard(a[0],a[2].toLowerCase(),i)}).join('');
  $('#arts-other').innerHTML=COURSES.filter(function(c){return c.s!=='arts'}).map(function(c,i){return crsCard(c,i)}).join('');
  }
  // bangalore branches
  if($('#blr-branches')){ /* MPA page guard */
  $('#blr-branches').innerHTML=OFFICES.filter(function(o){return o.loc==='bangalore'}).map(officeCard).join('');
  }
  // contact offices
  if($('#all-branches')){ /* MPA page guard */
  $('#all-branches').innerHTML=VOFFICES.map(officeCard).join('');
  $('#off-filters').addEventListener('click',function(e){var b=e.target.closest('button');if(!b)return;var f=b.getAttribute('data-f');$$('button',this).forEach(function(c){c.classList.toggle('active',c===b)});$$('#all-branches .branch').forEach(function(x){x.style.display=(f==='all'||x.getAttribute('data-k')===f)?'':'none'})});
  }
  if($('#dest-list')){ /* MPA page guard */
  $('#dest-list').innerHTML=DD_ORDER.map(function(k){return '<option value="'+COUNTRIES[k].n+'">'}).join('');
  }
}
function renderEvents(city){
  var list=city==='All'?EVENTS.slice(1):EVENTS.filter(function(e){return e.city===city});
  $('#ev-grid').innerHTML=list.map(eventCard).join('');
}

/* ---------- DYNAMIC PAGES (structure ready for future content) ---------- */
function stub(kind,slug){
  if(kind==='country'&&CPAGE[slug])return countryPage(slug);
  if(kind==='course'&&slug==='engineering')return engineeringPage();
  if(kind==='course'&&CDATA[slug])return coursePage(slug);
  if(kind==='location'&&slug==='hyderabad')return hyderabadPage();
  if(kind==='location'&&LDATA[slug])return locationPage(slug);
  var title,eyebrow,crumb,ext,extLabel,bg,body='',glass='';
  if(kind==='country'){
    var c=COUNTRIES[slug];if(!c)return null;
    title='Study in <span class="serif">'+cname(slug)+'</span>';eyebrow='Study Destinations';crumb=['Countries',c.n];
    bg=PHOTO[slug]?UNS(PHOTO[slug],2000):(c.img?IMG+'home/countries/'+c.img:'');
    glass='<div class="glass rv" style="--d:.2s"><div class="glass-h"><span><img decoding="async" src="https://flagcdn.com/w80/'+iso(slug)+'.png" alt="" style="width:30px;height:30px;border-radius:50%;object-fit:cover;display:inline-block;vertical-align:middle;margin-right:10px">'+cname(slug)+'</span><svg class="ic"><use href="#i-globe"/></svg></div><div class="glass-row"><b>2569+</b><span>Partnered universities worldwide</span></div><div class="glass-row"><b>97%</b><span>VISA Approval (Last Intake)</span></div><div class="glass-row"><b>Free</b><span>Counselling session</span></div></div>';
  }else if(kind==='course'){
    var co=COURSES.filter(function(x){return x.s===slug})[0];if(!co||slug==='arts')return null;
    title='Study <span class="serif">'+co.n+'</span> Abroad';eyebrow='Courses · Study Abroad Programs';crumb=['Courses',co.n];
    bg=UNS(BANNER[slug]||'1758270705482-cee87ea98738',2000);
    glass='<div class="glass rv" style="--d:.2s"><div class="glass-h"><span>'+co.n+'</span>'+icon(co.i)+'</div><div class="glass-row"><b>Bachelor\'s &amp; Master\'s</b><span>Course types</span></div><div class="glass-row"><b>2569+</b><span>Partnered universities</span></div></div>';
  }else if(kind==='location'){
    var l=LOCS.filter(function(x){return x.s===slug})[0];if(!l||slug==='bangalore')return null;
    title='Career Gyan <span class="serif">'+l.n+'</span>';eyebrow='Our Locations';crumb=['Our Locations',l.n];
    bg=UNS(BANNER[slug==='germany'?'germanyloc':slug]||'1517048676732-d65bc937f952',2000);
    var offs=OFFICES.filter(function(o){return o.loc===slug});
    var o=offs[0];
    if(o)glass='<div class="glass rv" style="--d:.2s"><div class="glass-h"><span>'+esc(o.n)+' office</span><svg class="ic"><use href="#i-pin"/></svg></div><a class="glass-line" href="'+o.m+'" target="_blank" rel="noopener">'+icon('pin')+esc(o.a)+'</a>'+o.p.map(function(p){return '<a class="glass-line" href="tel:'+p.replace(/\s/g,'')+'">'+icon('phone')+p+'</a>'}).join('')+(o.e?'<a class="glass-line" href="mailto:'+o.e+'">'+icon('mail')+o.e+'</a>':'')+'</div>';
  }else return null;
  return '<div class="ihero">'+(bg?'<img decoding="async" class="bg" src="'+bg+'"'+HSET(bg)+' alt="'+esc(String(title).replace(/<[^>]+>/g,''))+'" fetchpriority="high">':'')+'<div class="container ihero-grid"><div>'+
    '<nav class="crumbs rv"><a href="index.html">Home</a>'+icon('right')+'<span>'+crumb[0]+'</span>'+icon('right')+'<span>'+crumb[1]+'</span></nav>'+
    '<span class="eyebrow gold rv">'+eyebrow+'</span><h1 class="rv" style="--d:.06s">'+title+'</h1><p class="h-lead rv" style="--d:.12s">Expert guidance from admission to visa, and everything in between.</p>'+
    '<div class="h-actions rv" style="--d:.18s"><a class="btn btn-gold" href="contact.html">Talk to our experts '+icon('arrow')+'</a><a class="btn btn-glass" href="eligibility.html">Check Eligibility</a></div></div>'+glass+'</div></div>'+
    '<section class="section" style="padding-bottom:0"><div class="container"><div class="notice rv"><p>Our counsellors can share complete, up-to-date details for this program. Book a free counselling session to get started.</p><a class="btn btn-primary" href="contact.html">Talk to our experts '+icon('arrow')+'</a></div></div></section>'+body+
    '<section class="section h-how" style="margin-top:100px"><span class="glow g1"></span><div class="container" style="position:relative"><div class="sec-head center"><span class="eyebrow gold both rv">How it works</span><h2 class="h-h2 rv" style="color:#fff">Your Abroad Education <span class="serif">Roadmap</span></h2></div><div class="steps">'+BLOCKS.steps()+'</div></div></section>'+
    '<section class="section"><div class="container"><div class="sec-head center"><span class="eyebrow both rv">Application &amp; admission assistance</span><h2 class="h-h2 rv">Every document, <span class="serif">done right</span></h2></div>'+BLOCKS.assist()+'</div></section>'+
    '<section class="section" style="padding-top:0"><div class="container">'+BLOCKS.cta()+'</div></section>';
}

function legalDocument(kind){
  var isPrivacy=kind==='privacy';
  var body=isPrivacy?"<h1>Privacy Policy</h1><p><strong>Effective date:</strong> 4 September 2026</p><p>CareerGyan respects your privacy. This Privacy Policy explains how information submitted through this event registration website may be collected, used and protected.</p><h2>1. Information We Collect</h2><p>When you register for the CareerGyan Abroad Education Fair, we may collect your full name, email address, mobile number, preferred country of study, course and education level. We may also receive payment-related identifiers from our payment provider when you complete a registration payment.</p><h2>2. How We Use Information</h2><ul><li>To process and confirm your event registration.</li><li>To process and verify payments.</li><li>To send registration, payment and event-related communications.</li><li>To respond to questions and provide relevant event or education-service assistance.</li><li>To maintain records and prevent fraud or misuse.</li></ul><h2>3. Payments</h2><p>Payments are processed through Razorpay. CareerGyan does not request or store your full card, UPI, banking or other payment credentials on this website. Payment information is handled by the payment provider according to its own policies.</p><h2>4. reCAPTCHA</h2><p>This website uses Google reCAPTCHA to help prevent automated or abusive submissions. Its use is subject to Google's applicable terms and privacy practices.</p><h2>5. Email Communications</h2><p>Registration emails may be sent to the email address supplied in the form. We may also send administrative notifications related to the registration.</p><h2>6. Data Sharing</h2><p>Information may be shared with service providers that are necessary to operate the registration process, such as payment, database, security and email-service providers. We do not sell registration information.</p><h2>7. Data Security</h2><p>We use reasonable technical and organizational measures to protect registration information. No internet-based system can be guaranteed to be completely secure.</p><h2>8. Retention</h2><p>Registration information may be retained for as long as reasonably necessary for event administration, accounting, customer support, legal obligations and legitimate business records.</p><h2>9. Your Choices</h2><p>If you have questions about your registration information or want to request correction of inaccurate information, contact CareerGyan using the contact details provided on the main website.</p><h2>10. Updates</h2><p>This policy may be updated when our services or legal requirements change. The latest version will be published on this page.</p>":"<h1>Terms &amp; Conditions</h1><p><strong>Effective date:</strong> 4 September 2026</p><p>By using this website and submitting the CareerGyan Abroad Education Fair registration form, you agree to these Terms &amp; Conditions.</p><h2>1. Registration</h2><p>You must provide accurate and complete information when registering. CareerGyan may contact you using the email address or mobile number supplied in the form for registration and event-related communication.</p><h2>2. Payment</h2><p>If a registration fee is applicable, payment must be completed through the payment gateway provided on the website. A registration is treated as paid only after the payment is successfully verified by CareerGyan's payment system.</p><h2>3. Payment Verification</h2><p>Payment status may be verified using Razorpay transaction information and server-side payment verification. A successful payment page or browser response alone does not override the server's verified payment status.</p><h2>4. Confirmation</h2><p>After successful payment verification, a confirmation may be sent to the email address used during registration and an administrative notification may be sent to CareerGyan.</p><h2>5. Event Information</h2><p>Event details, participating organizations, timings, venue arrangements and available services may be changed when necessary. CareerGyan will make reasonable efforts to communicate material changes.</p><h2>6. Cancellation and Refunds</h2><p>Any cancellation or refund will be handled according to the applicable registration/refund policy communicated by CareerGyan. Where a payment is eligible for refund, processing may be subject to payment-provider timelines and applicable charges or rules.</p><h2>7. Acceptable Use</h2><p>You must not submit false information, attempt to interfere with the registration or payment systems, abuse reCAPTCHA, or use the website for unlawful or fraudulent purposes.</p><h2>8. Third-Party Services</h2><p>The registration process may use third-party services such as Razorpay for payments, Google reCAPTCHA for abuse prevention and an email service for transactional messages. Those services may have their own terms and policies.</p><h2>9. Limitation</h2><p>CareerGyan is not responsible for temporary interruptions caused by internet connectivity, third-party service outages or circumstances outside its reasonable control.</p><h2>10. Changes to These Terms</h2><p>These terms may be updated from time to time. Continued use of the registration website after an update constitutes acceptance of the updated terms.</p><h2>11. Contact</h2><p>For registration or payment-related questions, please contact CareerGyan through the contact information provided on the main website.</p>";
  return '<div class="legal-page"><a class="legal-back" href="index.html">← Back to CareerGyan</a>'+body+'<p class="legal-copy">© 2026 Powered and secured by I Don't Blabber</p></div>';
}

/* ---------- ROUTER ---------- */
var STATIC={'not-found':'notfound','':'home','home':'home','about':'about','courses/arts':'arts','course/arts':'arts','workshop':'events','workshop/event':'home','locations/bangalore':'bangalore','location/bangalore':'bangalore','contact':'contact','eligibility':'eligibility','check-eligibility':'eligibility'};
var TITLES={home:'Abroad Education Consultants in India - Career Gyan',about:'About Career Gyan | Your Trusted Study Abroad Guide',arts:'Arts – Study Abroad Programs | Career Gyan',events:'Upcoming Study Abroad Fairs & Events | Career Gyan',bangalore:'Best Study Abroad Consultants in Bangalore | Career Gyan Bangalore',contact:'Contact Career Gyan | Get Study Abroad Assistance',eligibility:'Study Abroad Eligibility Checker | Career Gyan'};
var NAVKEY={about:'about',arts:'course',workshop:'events',bangalore:'location',contact:'contact'};
var current=null;

function route(){
  var path=decodeURIComponent(document.body.getAttribute('data-route')||'').replace(/\/$/,'').toLowerCase();
  if(path && !/^[a-z0-9\-\/]+$/.test(path)) return; // ignore in-page anchors
  var page=STATIC[path],navKey,html=null;
  if(!page){
    var m=path.match(/^(country|course|location)\/([a-z\-]+)$/);
    if(path==='privacy-policy'){html=legalDocument('privacy');navKey='legal'}
    else if(path==='terms-and-conditions'){html=legalDocument('terms');navKey='legal'}
    else if(path==='student-loan'){html=studentLoanPage();navKey='studentloan'}
    else if(path==='all-countries'){html=allCountriesPage();navKey='country'}
    else if(m){html=stub(m[1],m[2]);navKey=m[1]}
    if(html){page='dynamic';$('#dynamic').innerHTML=html;if(path==='all-countries'){initAllCountries()}}
    else{page='home';if(path)history.replaceState(null,'','#/')}
  }
  navKey=navKey||NAVKEY[page];
  var prog=$('#progress');prog.className='';void prog.offsetWidth;prog.className='run';
  setTimeout(function(){prog.className='done'},380);
  $$('.page').forEach(function(p){p.classList.toggle('active',p.getAttribute('data-page')===page)});
  $$('.nav-link[data-nav]').forEach(function(a){a.classList.toggle('active',a.getAttribute('data-nav')===navKey)});
  $$('.dd a').forEach(function(a){a.classList.toggle('active',a.getAttribute('data-r')===path)});
  var cp=document.body.getAttribute('data-path');$$('.hdr a[href],.mnav a[href]').forEach(function(a){if(a.getAttribute('href')===cp)a.setAttribute('aria-current','page');else a.removeAttribute('aria-current')});
  closeMenus();
  {var de=document.documentElement;de.style.scrollBehavior='auto';window.scrollTo(0,0);de.style.scrollBehavior=''}
  current=path;
  observe($('.page.active'));
}

/* ---------- REVEAL + COUNTERS ---------- */
var io='IntersectionObserver' in window?new IntersectionObserver(function(entries){
  entries.forEach(function(en){if(en.isIntersecting){en.target.classList.add('in');countUp(en.target);io.unobserve(en.target)}});
},{threshold:.12,rootMargin:'0px 0px -40px 0px'}):null;
function observe(root){
  $$('.rv,.rv-img,.wipe,.obs,.cmp,.doc',root).forEach(function(el){if(el.classList.contains('in'))return;if(io)io.observe(el);else el.classList.add('in')});
}
function countUp(el){
  $$('[data-count]',el).forEach(function(b){
    var raw=b.getAttribute('data-count'),m=raw.match(/^([^\d]*)([\d,]+)(.*)$/);
    if(!m||raw.charAt(0)==='#'||b.dataset.done)return;b.dataset.done=1;
    var target=parseInt(m[2].replace(/,/g,''),10),comma=m[2].indexOf(',')>-1,t0=null,dur=1600;
    function fmt(n){return comma?n.toLocaleString('en-US'):String(n)}
    function step(ts){if(!t0)t0=ts;var p=Math.min((ts-t0)/dur,1),e=1-Math.pow(1-p,3);b.textContent=m[1]+fmt(Math.round(target*e))+m[3];if(p<1)requestAnimationFrame(step)}
    requestAnimationFrame(step);
  });
}

/* ---------- MENUS ---------- */
function closeMenus(){document.body.classList.remove('menu-open');$$('.nav-item.open').forEach(function(n){n.classList.remove('open');var b=$('.nav-link',n);if(b)b.setAttribute('aria-expanded','false')})}
function initMenus(){
  $$('.nav-item.has-dd>.nav-link').forEach(function(btn){
    btn.addEventListener('click',function(e){e.stopPropagation();var it=btn.parentNode,o=!it.classList.contains('open');closeMenus();if(o){it.classList.add('open');btn.setAttribute('aria-expanded','true')}});
  });
  document.addEventListener('click',function(e){if(!e.target.closest('.nav-item'))$$('.nav-item.open').forEach(function(n){n.classList.remove('open')})});
  document.addEventListener('keydown',function(e){if(e.key==='Escape')closeMenus()});
  $('#burger').addEventListener('click',function(){document.body.classList.add('menu-open')});
  $('#mclose').addEventListener('click',closeMenus);
  $('#mnavBg').addEventListener('click',closeMenus);
  $$('.m-acc>button').forEach(function(b){b.addEventListener('click',function(){b.parentNode.classList.toggle('open')})});
  $$('.mnav a').forEach(function(a){a.addEventListener('click',closeMenus)});
  // in-page scroll links that must not trigger routing
  document.addEventListener('click',function(e){
    var a=e.target.closest('a[data-scroll]');if(!a)return;e.preventDefault();
    var t=document.querySelector(a.getAttribute('href'));if(t)window.scrollTo({top:t.getBoundingClientRect().top+window.pageYOffset-90,behavior:'smooth'});
  });
  var hdr=$('#hdr');window.addEventListener('scroll',function(){hdr.classList.toggle('scrolled',window.pageYOffset>10)},{passive:true});
}

/* ---------- FORMS ---------- */
function initForms(){
  if($('#finder')){ /* MPA page guard */
  $('#finder').addEventListener('submit',function(e){
    e.preventDefault();var c=$('#f-course').value,k=$('#f-country').value;
    if(c){location.href=courseHref(c.toLowerCase());return}
    location.href=k?'study-in-'+k+'.html':'contact.html';
  });
  }
  var form=$('#contactForm'),note=$('#formNote');
  if(form){ /* MPA page guard */
  form.addEventListener('submit',function(e){
    e.preventDefault();var ok=true;
    $$('[required]',form).forEach(function(f){var bad=!f.value.trim()||(f.type==='email'&&!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.value));f.parentNode.classList.toggle('err',bad);if(bad)ok=false});
    if(!ok){note.textContent='Please fill in the required fields marked with *.';note.classList.add('show');return}
    var lines=$$('input,select,textarea',form).filter(function(f){return f.value.trim()}).map(function(f){return f.name+': '+f.value.trim()});
    var href='mailto:enquiry@careergyan.co?subject='+encodeURIComponent('Study abroad enquiry – '+$('#c-name').value.trim())+'&body='+encodeURIComponent(lines.join('\n'));
    cgSendEnquiry(form,note,href);
  });
  $$('input,select',form).forEach(function(f){f.addEventListener('input',function(){f.parentNode.classList.remove('err')})});
  }
}

/* ---------- HOME (demo design) ---------- */
var FULLNAME={uk:'United Kingdom',usa:'United States'};
var EUROPE=['uk','france','germany','spain','netherlands','romania','hungary','ireland','sweden','latvia','lithuania','poland','finland','italy'];
var DEST_ORDER=['uk','usa','canada','germany','ireland','australia','new-zealand','france','italy','netherlands','spain','sweden','poland','hungary','romania','latvia','lithuania','finland'];
var PHOTO={uk:'1561022107-23ba5b910e02',usa:'1575139488320-2ac1da68a4a7',canada:'1486325212027-8081e485255e',germany:'1506760610100-1af6025cf0c7',ireland:'1549918864-48ac978761a4',australia:'1781668071654-b3fe9359cd9f','new-zealand':'1595125989588-36d745a2a828',france:'1502602898657-3e91760cbb34',italy:'1460722665083-c2599113f7e0',netherlands:'1754835143820-bcf20e2e1a35',spain:'1792319770711-e33c3e14c3b8',sweden:'1659521218958-d39c01cee9c1',hungary:'1790848947579-b7f050545ddf',poland:'1568749402196-dc116bcfca04',romania:'1771756762795-6f5a742edbdd',latvia:'1685470934582-3636319a3be9',lithuania:'1681675896751-10fabe479843',finland:'1641237608414-f90192f9b380'};
function iso(k){var c=COUNTRIES[k].c;return c==='UK'?'gb':c.toLowerCase()}
function cname(k){return FULLNAME[k]||COUNTRIES[k].n}
function destImg(k){
  var fb=COUNTRIES[k].img?IMG+'home/countries/'+COUNTRIES[k].img:'';
  var src=PHOTO[k]?'https://images.unsplash.com/photo-'+PHOTO[k]+'?auto=format&fit=crop&w=1200&q=70':fb;
  return src?'<img decoding="async" class="bg" src="'+src+'"'+(PHOTO[k]&&fb?' data-fb="'+fb+'"':'')+' alt="Study in '+cname(k)+'" loading="lazy">':'';
}
var destState={f:'all',all:false};
function renderDest(){
  var list=DEST_ORDER.filter(function(k){return destState.f==='all'||(destState.f==='europe'?EUROPE.indexOf(k)>-1:EUROPE.indexOf(k)<0)});
  var showAll=destState.all||destState.f!=='all';
  if(!showAll)list=list.slice(0,9);
  $('#destGrid').innerHTML=list.map(function(k,i){
    var big=(i===0&&destState.f==='all');
    return '<a class="dcard'+(big?' big':'')+(destImg(k)?'':' img-off')+'" style="animation-delay:'+(i*.05)+'s" href="study-in-'+k+'.html">'+destImg(k)+
      '<span class="mono-bg">'+COUNTRIES[k].c+'</span><span class="go">'+icon('arrow')+'</span>'+
      '<div class="dc-b"><h3><span class="flag"><img decoding="async" src="https://flagcdn.com/w80/'+iso(k)+'.png" alt="" loading="lazy"></span>'+cname(k)+'</h3><span class="pill">'+icon('cap')+'Study in '+cname(k)+'</span></div></a>';
  }).join('');
  $('#destMore').style.display=(destState.f==='all'&&!destState.all)?'':'none';
}
/* ===== v4 helpers ===== */
var REGION=function(k){return EUROPE.indexOf(k)>-1?'Europe':(k==='usa'||k==='canada'?'North America':'Oceania')};
var DFACTS={
  uk:[['Annual UG tuition (public)','£9,000–£20,000*'],['Student visa fee','£490*']],
  usa:[['Annual tuition','$20,000–$50,000*'],['SEVIS fee','$350*']],
  canada:[['Annual tuition','CAD 16,600–CAD 83,300*'],['Student visa fee','CAD 150*']]
};
function factRows(k){var f=DFACTS[k];if(!f)return [['Partnered universities','2569+ worldwide'],['Counselling','Free session']];return f}

/* ----- 02 coverflow ----- */
function initCoverflow(){
  var cf=$('#cf'),stage=$('#cfStage'),seg=$('#destSeg'),ink=$('.hx-tab-ink',seg),flags=$('#cfFlags'),bar=$('#cfBar'),list=[],idx=0,timer,DUR=5000,drag=null;
  function moveInk(b){ink.style.left=b.offsetLeft+'px';ink.style.width=b.offsetWidth+'px'}
  function build(f){
    list=DEST_ORDER.filter(function(k){return f==='all'||(f==='europe'?EUROPE.indexOf(k)>-1:EUROPE.indexOf(k)<0)}).slice(0,10);
    stage.innerHTML=list.map(function(k,i){
      var fb=COUNTRIES[k].img?IMG+'home/countries/'+COUNTRIES[k].img:'';
      return '<div class="cfc" data-i="'+i+'">'+(PHOTO[k]?'<img decoding="async" class="bg" src="'+UNS(PHOTO[k],1000)+'"'+(fb?' data-fb="'+fb+'"':'')+' alt="Study in '+cname(k)+'" loading="lazy" draggable="false">':'')+
      '<span class="code">'+COUNTRIES[k].c+'</span><span class="num">'+(i<9?'0':'')+(i+1)+'</span><span class="reg">'+REGION(k)+'</span>'+
      '<div class="info"><h3><span class="flag"><img decoding="async" src="https://flagcdn.com/w80/'+iso(k)+'.png" alt="" loading="lazy" draggable="false"></span>'+cname(k)+'</h3>'+
      '<div class="facts">'+factRows(k).map(function(r){return '<div class="fact"><span>'+r[0]+'</span><b>'+r[1]+'</b></div>'}).join('')+'</div>'+
      '<div class="cta"><a class="go" href="study-in-'+k+'.html">Study in '+cname(k)+' '+icon('arrow')+'</a><span>'+COUNTRIES[k].c+' · '+REGION(k)+'</span></div></div></div>';
    }).join('');
    flags.innerHTML=list.map(function(k,i){return '<button data-i="'+i+'"><img decoding="async" src="https://flagcdn.com/w80/'+iso(k)+'.png" alt="" loading="lazy">'+cname(k)+'</button>'}).join('');
    $('#cfTot').textContent=(list.length<10?'0':'')+list.length;
    $$('.cfc',stage).forEach(function(c){c.addEventListener('click',function(e){var i=+c.getAttribute('data-i');if(i!==idx){e.preventDefault();go(i)}})});
    go(0);
  }
  function layout(){
    var w=window.innerWidth,gap=w<680?w*0.62:(w<1024?300:340);
    $$('.cfc',stage).forEach(function(c,i){
      var o=i-idx,a=Math.abs(o);
      c.classList.toggle('on',o===0);
      c.style.transform='translateX('+(o*gap)+'px) translateZ('+(-a*160)+'px) rotateY('+(-o*14)+'deg) scale('+(1-a*0.06)+')';
      c.style.zIndex=100-a;c.style.opacity=a>3?0:1;c.style.pointerEvents=a>3?'none':'';
    });
    $$('button',flags).forEach(function(b,i){b.classList.toggle('on',i===idx)});
    $('#cfNow').textContent=(idx<9?'0':'')+(idx+1);
    bar.classList.remove('run');void bar.offsetWidth;bar.style.setProperty('--dur',DUR+'ms');bar.classList.add('run');
  }
  function go(i){idx=(i+list.length)%list.length;layout();auto()}
  function auto(){clearInterval(timer);timer=setInterval(function(){if(!cf.classList.contains('paused')&&cf.closest('.page.active'))go(idx+1)},DUR)}
  $('#cfPrev').addEventListener('click',function(){go(idx-1)});
  $('#cfNext').addEventListener('click',function(){go(idx+1)});
  flags.addEventListener('click',function(e){var b=e.target.closest('button');if(b)go(+b.getAttribute('data-i'))});
  cf.addEventListener('mouseenter',function(){cf.classList.add('paused')});cf.addEventListener('mouseleave',function(){cf.classList.remove('paused')});
  cf.addEventListener('keydown',function(e){if(e.key==='ArrowLeft')go(idx-1);if(e.key==='ArrowRight')go(idx+1)});
  cf.addEventListener('pointerdown',function(e){drag={x:e.clientX,t:Date.now()}});
  window.addEventListener('pointerup',function(e){if(!drag)return;var dx=e.clientX-drag.x;if(Math.abs(dx)>50)go(idx+(dx<0?1:-1));drag=null});
  seg.addEventListener('click',function(e){var b=e.target.closest('button');if(!b)return;$$('button',seg).forEach(function(x){x.classList.toggle('active',x===b)});moveInk(b);build(b.getAttribute('data-f'))});
  window.addEventListener('resize',function(){layout();moveInk($('button.active',seg))});
  setTimeout(function(){moveInk($('button.active',seg))},80);
  build('all');
}

/* ----- 04 roadmap sticky story ----- */
function initRoadmap(){
  var STEPS=[['Counselling','Our counsellors understand your academic profile, career goals, budget and preferred countries.','1507537362848-9c7e70b7b5c1'],['University Selection','A balanced list of ambitious, safe and best-fit universities from 2569+ partners.','1618255630366-f402c45736f6'],['Application Submission','SOPs, LORs and applications prepared and submitted, with university follow-ups.','1531482615713-2afd69097998'],['Offer Acceptable','We help you review your offers and accept the one that fits your goals.','1571260899304-425eee4c7efc'],['Visa Application','Documentation, application and interview preparation for a hassle-free visa.','1630487656049-6db93a53a7e9']];
  $('#rmImgs').innerHTML=STEPS.map(function(s,i){return '<img decoding="async" class="'+(i?'':'on')+'" src="'+UNS(s[2],1100)+'" alt="'+s[0]+'" loading="lazy">'}).join('');
  $('#steps').innerHTML=STEPS.map(function(s,i){return '<div class="rs" data-i="'+i+'" style="--i:'+i+';z-index:'+(i+1)+'"><span class="rs-big">0'+(i+1)+'</span><div class="rs-img"><img decoding="async" src="'+UNS(s[2],900)+'" alt="'+s[0]+'" loading="lazy"></div><div class="rs-in"><span class="rs-n">'+(i+1)+'</span><small>Step 0'+(i+1)+' of 05</small><h3>'+s[0]+'</h3><p>'+s[1]+'</p><div class="rs-meter">'+STEPS.map(function(x,j){return '<i class="'+(j<=i?'f':'')+'"></i>'}).join('')+'</div></div></div>'}).join('');
  var cur=-1,ring=$('#rmRing'),C=326.7;
  function set(i){if(i===cur)return;cur=i;
    $$('#steps .rs').forEach(function(r,j){r.classList.toggle('act',j===i)});
    $$('#rmImgs img').forEach(function(m,j){m.classList.toggle('on',j===i)});
    $('#rmN').textContent='0'+(i+1);
    var t=$('#rmT');t.textContent=STEPS[i][0];t.style.animation='none';void t.offsetWidth;t.style.animation='';
    ring.style.strokeDashoffset=(C*(1-(i+1)/STEPS.length)).toFixed(1);
  }
  function upd(){var rows=$$('#steps .rs');if(!rows.length||!rows[0].offsetParent)return;
    var best=0;rows.forEach(function(r,i){var st=parseFloat(getComputedStyle(r).top)||0;if(r.getBoundingClientRect().top<=st+(i?r.offsetHeight*0.45:4))best=i});
    var stacked=window.innerWidth>1024;
    rows.forEach(function(r,i){var d=best-i;if(stacked&&d>0){r.style.transform='scale('+(1-d*0.04).toFixed(3)+')';r.style.filter='brightness('+(1-d*0.08).toFixed(2)+')'}else{r.style.transform='';r.style.filter=''}});
    set(best)}
  var updT=0;window.addEventListener('scroll',function(){if(updT)return;updT=requestAnimationFrame(function(){updT=0;upd()})},{passive:true});window.addEventListener('resize',upd);window.addEventListener('hashchange',function(){setTimeout(upd,120)});
  set(0);upd();
}

/* ----- 05 course bento with tilt ----- */
function initCourses(){
  var CRS=[['engineering','Engineering','eng','1581091226033-d5c48150dbaa'],['management','Management','mgmt','1612359383347-245649cbb9d2'],['medicine','MBBS / Medicine','med','1624727828489-a1e03b79bba8'],['science','Science','sci','1602052577122-f73b9710adba'],['arts','Arts','arts','1692859532235-c93fa73bd5d0']];
  $('#crsList').innerHTML=CRS.map(function(c,i){return '<a class="cbx rv" style="--d:'+(i*.07)+'s" href="'+courseHref(c[0])+'"><img decoding="async" src="'+UNS(c[3],i?800:1200)+'" alt="'+c[1]+'" loading="lazy"><span class="glare"></span><div class="top"><em>0'+(i+1)+'</em><span>'+icon(c[2])+'</span></div><div class="bt"><h3>'+c[1]+'</h3><p>'+(c[0]==='arts'?'Available across 15 countries':'Bachelor\'s &amp; Master\'s programs')+'<i>'+icon('arrow')+'</i></p><span class="line"></span></div></a>'}).join('');
  if(window.matchMedia('(hover:none)').matches)return;
  $$('.cbx').forEach(function(c){
    c.addEventListener('mousemove',function(e){var r=c.getBoundingClientRect(),x=(e.clientX-r.left)/r.width,y=(e.clientY-r.top)/r.height;c.style.transform='rotateX('+((.5-y)*8).toFixed(2)+'deg) rotateY('+((x-.5)*10).toFixed(2)+'deg) translateY(-6px)';c.style.setProperty('--gx',(x*100)+'%');c.style.setProperty('--gy',(y*100)+'%')});
    c.addEventListener('mouseleave',function(){c.style.transform=''});
  });
}

/* ----- all countries page ----- */
function allCountriesPage(){
  var h='<div class="ihero"><img decoding="async" class="bg" src="'+UNS('1759784839707-a32c910a7747',2000)+'"'+HSET(UNS('1759784839707-a32c910a7747',2000))+' alt="Study abroad destinations for Indian students" fetchpriority="high"><div class="container ihero-grid"><div><nav class="crumbs rv"><a href="index.html">Home</a>'+icon('right')+'<span>Countries</span>'+icon('right')+'<span>All destinations</span></nav><span class="eyebrow gold rv">Study Destinations</span><h1 class="rv" style="--d:.06s">Explore top countries for Indian <span class="serif">students</span></h1><p class="h-lead rv" style="--d:.12s">2569+ partnered universities across the globe. Talk to a counsellor who knows each country.</p><div class="h-actions rv" style="--d:.18s"><a class="btn btn-gold" href="contact.html">Get Free Counselling '+icon('arrow')+'</a><a class="btn btn-glass" href="eligibility.html">Check Eligibility</a></div></div>'+
    glassRows('All destinations','globe',[['18','Study destinations'],['2569+','Partnered universities'],['97%','VISA Approval (Last Intake)']])+'</div></div>';
  h+='<section class="section" style="padding-top:0"><div class="container"><div class="ac-bar rv"><label class="ac-search">'+icon('search')+'<input id="acQ" type="search" placeholder="Search a country" aria-label="Search a country"></label><div class="ac-tabs" id="acTabs"><button class="active" data-r="all">All</button><button data-r="Europe">Europe</button><button data-r="North America">North America</button><button data-r="Oceania">Oceania</button></div><span class="ac-count" id="acCount"></span></div><div class="ac-grid" id="acGrid"></div></div></section>';
  var C=['uk','usa','canada'];
  var rows=[['Annual tuition','£9,000–£20,000* (UG) · £10,000–£28,000* (PG), public universities','$20,000 to $50,000*','CAD 16,600–CAD 83,300*'],['Visa costs','£490* application fee · £776* healthcare surcharge per year','$350* SEVIS fee','CAD 150* student visa fee'],['English tests','SELT (IELTS recognised by UK Visas and Immigration)','IELTS, TOEFL, SELT','IELTS or TOEFL'],['Entrance tests','GMAT, BMAT, GRE, SAT or MAT for some programs','ACT, SAT, GMAT, GRE, LSAT, MCAT by course','Depends on the university'],['Why students choose it','Some of the world\'s oldest and most respected universities; shorter, flexible programs','Over 5,000 institutions; choose or change your major','Lower tuition than many destinations; post-study work opportunities']];
  h+='<section class="section bg-soft"><div class="container">'+shead('Compare','Compare popular <span class="serif">destinations</span>',true,'Key figures from our UK, USA and Canada guides.')+'<div class="cmp-wrap"><div class="cmp rv"><div class="cmp-row head" style="--i:0"><div>At a glance</div>'+C.map(function(k){return '<div><img decoding="async" src="https://flagcdn.com/w80/'+iso(k)+'.png" alt="">'+cname(k)+'</div>'}).join('')+'</div>'+rows.map(function(r,i){return '<div class="cmp-row" style="--i:'+(i+1)+'"><div>'+r[0]+'</div><div>'+r[1]+'</div><div>'+r[2]+'</div><div>'+r[3]+'</div></div>'}).join('')+'</div></div><div style="text-align:center;margin-top:34px;display:flex;gap:12px;justify-content:center;flex-wrap:wrap">'+C.map(function(k){return '<a class="btn btn-ghost" href="study-in-'+k+'.html">Study in '+cname(k)+' '+icon('arrow')+'</a>'}).join('')+'</div></div></section>';
  h+=stepsSec();
  h+=ctaWith(UNS('1543269865-cbf427effbad',1800));
  return h;
}
function initAllCountries(){
  var grid=$('#acGrid');if(!grid)return;var q=$('#acQ'),reg='all';
  function draw(){
    var t=q.value.trim().toLowerCase();
    var list=DEST_ORDER.filter(function(k){return (reg==='all'||REGION(k)===reg)&&(!t||cname(k).toLowerCase().indexOf(t)>-1||COUNTRIES[k].n.toLowerCase().indexOf(t)>-1)});
    $('#acCount').textContent='Showing '+list.length+' destination'+(list.length===1?'':'s');
    grid.innerHTML=list.length?list.map(function(k,i){var fb=COUNTRIES[k].img?IMG+'home/countries/'+COUNTRIES[k].img:'';return '<a class="acc" style="animation-delay:'+(i*.04)+'s" href="study-in-'+k+'.html"><div class="media">'+(PHOTO[k]?'<img decoding="async" class="bg" src="'+UNS(PHOTO[k],900)+'"'+(fb?' data-fb="'+fb+'"':'')+' alt="'+cname(k)+'" loading="lazy">':'')+'<span class="reg">'+REGION(k)+'</span>'+(CPAGE[k]?'<span class="guide">Full guide</span>':'')+'<span class="code">'+COUNTRIES[k].c+'</span></div><div class="body"><h3><img decoding="async" src="https://flagcdn.com/w80/'+iso(k)+'.png" alt="">'+cname(k)+'</h3><div class="facts">'+factRows(k).map(function(r){return '<div class="fact"><span>'+r[0]+'</span><b>'+r[1]+'</b></div>'}).join('')+'</div><span class="go">Study in '+cname(k)+'<i>'+icon('arrow')+'</i></span></div></a>'}).join(''):'<p class="ac-empty">No destinations match “'+esc(q.value)+'”. Try another country name.</p>';
  }
  q.addEventListener('input',draw);
  $('#acTabs').addEventListener('click',function(e){var b=e.target.closest('button');if(!b)return;reg=b.getAttribute('data-r');$$('#acTabs button').forEach(function(x){x.classList.toggle('active',x===b)});draw()});
  draw();
}

function initHome(){
  if(!$('#hSlides'))return; /* MPA page guard */
  // country selects
  var opts=DD_ORDER.map(function(k){return '<option value="'+k+'">'+COUNTRIES[k].n+'</option>'}).join('');
  $('#f-country').insertAdjacentHTML('beforeend',opts);
  $('#h-dest').insertAdjacentHTML('beforeend',DD_ORDER.map(function(k){return '<option>'+COUNTRIES[k].n+'</option>'}).join(''));
  // hero slideshow
  var slides=$$('#hSlides img'),dots=$$('#hDots button'),cur=0,timer;
  function go(n){cur=(n+slides.length)%slides.length;slides.forEach(function(s,i){s.classList.toggle('active',i===cur)});dots.forEach(function(d,i){d.classList.toggle('active',i===cur)})}
  function auto(){clearInterval(timer);timer=setInterval(function(){go(cur+1)},6500)}
  dots.forEach(function(d,i){d.addEventListener('click',function(){go(i);auto()})});auto();
  // clock
  function tick(){try{$('#hClock').textContent=new Date().toLocaleTimeString('en-GB',{timeZone:'Asia/Kolkata',hour:'2-digit',minute:'2-digit'})}catch(e){}}
  tick();setInterval(tick,15000);
  // departures board
  var N=6,W=11,set=0,board=$('#board');
  board.innerHTML=Array.apply(null,{length:N}).map(function(){return '<div class="brow"><span class="flaps">'+Array.apply(null,{length:W}).map(function(){return '<span class="fl"></span>'}).join('')+'</span><span class="bcode"></span><span class="bstat">OPEN</span></div>'}).join('');
  function showSet(){
    var keys=DEST_ORDER.slice(set*N,set*N+N);
    $$('.brow',board).forEach(function(row,r){
      var name=(keys[r]?COUNTRIES[keys[r]].n:'').toUpperCase(),tiles=$$('.fl',row);
      tiles.forEach(function(t,i){var ch=name.charAt(i)||'';setTimeout(function(){t.classList.remove('flip');void t.offsetWidth;t.classList.add('flip');setTimeout(function(){t.textContent=ch},160)},r*90+i*40)});
      $('.bcode',row).textContent=keys[r]?COUNTRIES[keys[r]].c:'';
    });
    set=(set+1)%Math.ceil(DEST_ORDER.length/N);
  }
  showSet();setInterval(showSet,5200);

  initCoverflow();

  /* ---- 03 services: interactive split ---- */
  var SVC=[
    ['Test Preparation','Get ready for IELTS, TOEFL, Duolingo, PTE, and GRE with expert-led mock tests, personalized feedback, and proven tips to boost your scores.','https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1400&q=70','demo_logo.png'],
    ['Education Loan Assistance','Secure education loans from trusted banks and financial institutions with our expert guidance and end-to-end support.',IMG+'careergallery/gallery-5.png','education-loan.png','https://images.unsplash.com/photo-1568992688065-536aad8a12f6?auto=format&fit=crop&w=1400&q=70'],
    ['Travel Assistance','Plan and book your travel with ease. From flights to accommodations, we help you make a smooth transition to your study abroad destination.','https://images.unsplash.com/photo-1759784839707-a32c910a7747?auto=format&fit=crop&w=1400&q=70','Travel-assists.png'],
    ['Visa Assistance','Simplify the visa process with our expert support. We assist with documentation, application, and ensure a hassle-free experience.',IMG+'careergallery/gallery-4.png','visa-assistance.png','https://images.unsplash.com/photo-1570616969692-54d6ba3d0397?auto=format&fit=crop&w=1400&q=70'],
    ['Forex Services','Get the best exchange rates and reliable forex services for your study abroad destination, ensuring you travel with ease and confidence.','https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=1400&q=70','Forex.png'],
    ['Document Support (SOP & Resumes)','Craft compelling Statements of Purpose (SOPs) and impactful resumes with our expert assistance, giving your applications a winning edge.',IMG+'careergallery/gallery-8.png','Documents.png','https://images.unsplash.com/photo-1630487656049-6db93a53a7e9?auto=format&fit=crop&w=1400&q=70']
  ];
  var svl=$('#svcList'),svs=$('#svcStage'),sIdx=0,sTimer,DUR=6000;
  svl.innerHTML=SVC.map(function(s,i){return '<div class="hx-si rv" style="--d:'+(i*.05)+'s;--dur:'+DUR+'ms"><button><em>0'+(i+1)+'</em><span>'+esc(s[0])+'</span><i></i></button><div class="hx-si-b"><div><p>'+esc(s[1])+'</p><a href="contact.html">Talk to an expert '+icon('arrow')+'</a></div></div><span class="hx-si-bar"></span></div>'}).join('');
  svs.innerHTML=SVC.map(function(s,i){return '<div class="hx-ss"><img decoding="async" src="'+s[2]+'"'+(s[4]?' data-fb="'+s[4]+'"':'')+' alt="'+esc(s[0])+'" loading="lazy"><span class="hx-ss-num">0'+(i+1)+'</span><div class="hx-ss-card"><span><img decoding="async" src="'+IMG+'home/services/'+s[3]+'" alt="" loading="lazy"></span><div><b>'+esc(s[0])+'</b><small>Career Gyan services</small></div></div></div>'}).join('');
  function showSvc(i){sIdx=i;$$('.hx-si',svl).forEach(function(x,j){x.classList.toggle('on',j===i);if(j===i){var bar=$('.hx-si-bar',x);bar.style.display='none';void bar.offsetWidth;bar.style.display=''}});$$('.hx-ss',svs).forEach(function(x,j){x.classList.toggle('on',j===i)})}
  function svcAuto(){clearInterval(sTimer);sTimer=setInterval(function(){if(!svl.classList.contains('paused'))showSvc((sIdx+1)%SVC.length)},DUR)}
  $$('.hx-si',svl).forEach(function(x,i){$('button',x).addEventListener('click',function(){showSvc(i);svcAuto()})});
  svl.addEventListener('mouseenter',function(){svl.classList.add('paused')});svl.addEventListener('mouseleave',function(){svl.classList.remove('paused')});
  showSvc(0);svcAuto();

  initRoadmap();initCourses();

  /* ---- 07 phones ---- */
  $('#hxPhones').innerHTML=['C9B3UmVtAwZ','C9hcVH5tWSo','DBgGOV8sUDP','DDYsiQsNVdu'].map(function(id,i){return '<a class="hx-ph rv" style="--d:'+(i*.1)+'s" href="https://www.instagram.com/reel/'+id+'/" target="_blank" rel="noopener"><div class="hx-ph-in"><span class="play">'+icon('play')+'</span><small>@careergyanblr</small><b>Student story '+(i+1)+'</b></div></a>'}).join('');

  /* ---- partners double marquee ---- */
  function lg(list){var h=list.map(function(p){return '<div class="hx-lg"><img decoding="async" src="'+IMG+'home/partners/'+p+'" alt="'+PALT(p)+'" loading="lazy"></div>'}).join('');return '<div class="hx-mq-t">'+h+h+h+'</div>'}
  $('#hxMq1').innerHTML=lg(PARTNERS.slice(0,6));$('#hxMq2').innerHTML=lg(PARTNERS.slice(6).concat(PARTNERS.slice(0,1)));

  /* ---- 10 faq ---- */
  $$('#hxFaq .hq').forEach(function(q,i){if(i===0)q.classList.add('on');$('button',q).addEventListener('click',function(){var on=q.classList.contains('on');$$('#hxFaq .hq').forEach(function(x){x.classList.remove('on')});if(!on)q.classList.add('on')})});

  /* ---- 11 office explorer ---- */
  var tabs=$('#offTabs'),card=$('#offCard');
  tabs.innerHTML=VOFFICES.map(function(o,i){return '<button class="'+(i?'':'active')+'" data-o="'+i+'">'+esc(o.n.replace(' Office',''))+'</button>'}).join('');
  function showOff(i){var o=VOFFICES[i];card.innerHTML='<div class="hx-oc"><h3>'+esc(o.n)+'<span class="badge">'+(o.k==='intl'?'International':'India')+'</span></h3><div class="r">'+icon('pin')+'<span>'+esc(o.a)+'</span></div><div class="r">'+icon('phone')+'<span>'+o.p.map(function(p){return '<a href="tel:'+p.replace(/\s/g,'')+'">'+p+'</a>'}).join(', ')+'</span></div>'+(o.e?'<div class="r">'+icon('mail')+'<a href="mailto:'+o.e+'">'+o.e+'</a></div>':'')+'<a class="dir" href="'+o.m+'" target="_blank" rel="noopener">Get directions '+icon('arrow')+'</a></div>'}
  tabs.addEventListener('click',function(e){var b=e.target.closest('button');if(!b)return;$$('button',tabs).forEach(function(x){x.classList.toggle('active',x===b)});showOff(+b.getAttribute('data-o'))});
  showOff(0);
  // home form
  wireMailForm($('#homeForm'),$('#homeNote'),'h-name');
}
function ticketCard(e,i){
  var dt=parseDate(e.d),src=eventImage(e),url=eventLink(e);
  var place=e.m?'<a href="'+e.m+'" target="_blank" rel="noopener">'+icon('pin')+esc(e.l)+'</a>':'<span>'+icon('pin')+esc(e.l)+'</span>';
  return '<article class="hx-tk rv" style="--d:'+(i*.1)+'s"><div class="hx-tk-d"><b>'+dt.d+'</b><span>'+dt.m+'</span><small>'+dt.y+'</small></div><a class="hx-tk-img" href="'+url+'"><span class="bgblur" style="background-image:url(\''+src+'\')"></span><img decoding="async" src="'+src+'" alt="'+esc(e.t)+'" loading="lazy"></a><div class="hx-tk-b"><h3>'+esc(e.t)+'</h3><div class="meta"><span>'+icon('cal')+e.d+'</span><span>'+icon('clock')+e.tm+'</span>'+place+'</div></div><div class="hx-tk-go"><a href="'+url+'">'+(e.page?'View workshop &amp; register':'Read More')+' '+icon('arrow')+'</a></div></article>';
}

function wireMailForm(form,note,nameId){
  form.addEventListener('submit',function(e){
    e.preventDefault();var ok=true;
    $$('[required]',form).forEach(function(f){var bad=!f.value.trim()||(f.type==='email'&&!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.value));f.parentNode.classList.toggle('err',bad);if(bad)ok=false});
    if(!ok){note.textContent='Please fill in the required fields marked with *.';note.classList.add('show');return}
    var lines=$$('input,select,textarea',form).filter(function(f){return f.value.trim()}).map(function(f){return f.name+': '+f.value.trim()});
    cgSendEnquiry(form,note,'mailto:enquiry@careergyan.co?subject='+encodeURIComponent('Study abroad enquiry – '+document.getElementById(nameId).value.trim())+'&body='+encodeURIComponent(lines.join('\n')));
  });
  $$('input,select',form).forEach(function(f){f.addEventListener('input',function(){f.parentNode.classList.remove('err')})});
}
/* image fallback: try data-fb, else mark failed */
document.addEventListener('error',function(e){
  var t=e.target;if(!t||t.tagName!=='IMG')return;
  var fb=t.getAttribute('data-fb');
  if(fb){t.removeAttribute('data-fb');t.src=fb;return}
  t.classList.add('img-fail');
  var card=t.closest('.dcard');if(card&&t.classList.contains('bg'))card.classList.add('img-off');
  if(t.closest('.flag'))t.closest('.flag').style.display='none';
},true);

/* ---------- INNER PAGE BLOCKS ---------- */
var UNS=function(id,w){return 'https://images.unsplash.com/photo-'+id+'?auto=format&fit=crop&w='+(w||1200)+'&q=70'};
var STEPS=[['Counselling','Our counsellors understand your academic profile, career goals, budget and preferred countries.'],['University Selection','A balanced list of ambitious, safe and best-fit universities from 2569+ partners.'],['Application Submission','SOPs, LORs and applications prepared and submitted, with university follow-ups.'],['Offer Acceptable','We help you review your offers and accept the one that fits your goals.'],['Visa Application','Documentation, application and interview preparation for a hassle-free visa.']];
BLOCKS.steps=function(){return STEPS.map(function(s,i){return '<div class="step rv" style="--d:'+(i*.08)+'s"><div class="n">'+(i+1)+'</div><h3>'+s[0]+'</h3><p>'+s[1]+'</p></div>'}).join('')};
function crsCard(c,i,sub){return '<a class="crs rv" style="--d:'+(i*.07)+'s" href="'+courseHref(c.s)+'"><div class="top"><span>Course</span>'+icon(c.i)+'</div><div class="bd"><h3>'+c.n+'</h3><p>'+(sub||(c.s==='arts'?'Available across 15 countries':'Bachelor\'s & Master\'s programs'))+'</p></div></a>'}
BLOCKS.crs=function(){return [{s:'engineering',n:'Engineering',i:'eng'},{s:'management',n:'Management',i:'mgmt'},{s:'medicine',n:'MBBS / Medicine',i:'med'},{s:'science',n:'Science',i:'sci'},{s:'arts',n:'Arts',i:'arts'}].map(function(c,i){return crsCard(c,i)}).join('')};
var GFB=['1758270704763-22072a90d3b6','1606761568499-6d2451b23c66','1622045331680-f95e7e6ec580','1529070538774-1843cb3265df','1568992688065-536aad8a12f6','1612359383347-245649cbb9d2','1543269865-cbf427effbad','1531482615713-2afd69097998'];
var GALLERY=[['career-gallery.png','Abroad education fair'],['gallery-7.png','Student counselling'],['gallery-2.png','UK university visit'],['gallery-3.png','Education fair India'],['gallery-6.png','UK USA Canada seminar'],['gallery-4.png','Canada visa approval'],['gallery-5.png','Study abroad guidance'],['gallery-8.png','Admission letter UK']];
BLOCKS.gallery=function(){return GALLERY.map(function(g,i){return '<figure class="rv'+(i===0?' big':'')+(i===5?' wide':'')+'" style="--d:'+((i%4)*.06)+'s"><img decoding="async" src="'+IMG+'careergallery/'+g[0]+'" data-fb="'+UNS(GFB[i],900)+'" alt="'+g[1]+'" loading="lazy"><figcaption>'+g[1]+'</figcaption></figure>'}).join('')};
BLOCKS.cta=function(img){return '<div class="pcta rv"><img decoding="async" class="bg" src="'+(img||UNS('1541339907198-e08756dedf3f',1800))+'"'+HSET(img||UNS('1541339907198-e08756dedf3f',1800),1)+' alt="" loading="lazy"><span class="eyebrow gold">Book a free consultation</span><h2>Your future starts here! Book an <span class="serif">appointment today.</span></h2><p>Speak with a Career Gyan counsellor about your course, country and university options.</p><div class="h-actions"><a class="btn btn-gold" href="contact.html">Book An Appointment '+icon('arrow')+'</a><a class="btn btn-glass" href="eligibility.html">Check Eligibility</a></div></div>'};
function countryCard(k,i,small){
  var c=COUNTRIES[k];
  return '<a class="dcard'+(destImg(k)?'':' img-off')+'" style="animation-delay:'+(i*.04)+'s" href="study-in-'+k+'.html">'+destImg(k)+'<span class="mono-bg">'+c.c+'</span><span class="go">'+icon('arrow')+'</span><div class="dc-b"><h3><span class="flag"><img decoding="async" src="https://flagcdn.com/w80/'+iso(k)+'.png" alt="" loading="lazy"></span>'+cname(k)+'</h3><span class="pill">'+icon('cap')+'Study in '+cname(k)+'</span></div></a>';
}
var PLAINPHOTO={ee:'1639775382869-ea4c655de9a7',in:'1631781102154-c4fbe5fac655'};
function plainCountryCard(name,code,i){
  var ph=PLAINPHOTO[code];
  return '<div class="dcard'+(ph?'':' img-off')+' nolink" style="animation-delay:'+(i*.04)+'s">'+(ph?'<img decoding="async" class="bg" src="'+UNS(ph,1200)+'" alt="Study in '+name+'" loading="lazy">':'')+'<span class="mono-bg">'+code.toUpperCase()+'</span><div class="dc-b"><h3><span class="flag"><img decoding="async" src="https://flagcdn.com/w80/'+code+'.png" alt="" loading="lazy"></span>'+name+'</h3><span class="pill">'+icon('cap')+'Study in '+name+'</span></div></div>';
}

/* ---------- FULL PAGES: UK / USA / CANADA / ENGINEERING / HYDERABAD ---------- */
var BANNER={uk:'1612563958093-2c3bcfbd8760',usa:'1622397333309-3056849bc70b',canada:'1703691566844-2c48b16506e3',engineering:'1581092160607-ee22621dd758',hyderabad:'1696941515998-d83f24967aca',management:'1444653614773-995cb1ef9efa',medicine:'1504813184591-01572f98c85f',pharmacy:'1631549916768-4119b2e5f926',science:'1614935151651-0bea6508db6b',technology:'1461749280684-dccba630e2f6',pune:'1553064483-f10fe837615f',bahrain:'1748066768504-99532da7d1e9',germanyloc:'1621978766642-2d64b83eed24',davanagere:'1517048676732-d65bc937f952'};
var CPAGE={
 uk:{name:'UK',full:'United Kingdom',tag:'The destination for top-tier education and unlimited potential.',
  glance:[['£9,000+*','Annual UG tuition (public)'],['£490*','Student visa application fee'],['IELTS','Recognised by UK Visas and Immigration']],
  why:['The UK is multicultural and diverse, and home to some of the world\'s oldest and most respected universities.','Programs can be more affordable and sometimes shorter than in other countries.','Flexible study options let you combine courses or pursue joint honours and bespoke degrees.'],
  points:['Academic Excellence','Globally Recognised Qualifications','Strong Industry Links','Internships and Placements','Flexible Academic Programs','Work and Learn','Cultural Diversity','Networking Opportunities'],
  elig:[['Foundation','Higher Secondary (12th grade) or equivalent.'],['Undergraduate','Completed secondary school or 12th grade.'],['Postgraduate','A bachelor\'s degree in any field. Some programs require an upper second-class honours degree; others accept a lower second with professional work experience.'],['English','Secure English Language Tests (SELT) are accepted. IELTS is recognised by UK Visas and Immigration. TOEFL is not currently a recognised SELT, though some universities may accept it, so check with your university.'],['Entrance tests','Some programs require tests such as GMAT, BMAT, GRE, SAT or MAT, in addition to English proficiency tests.']],
  visa:['Valid passport','Evidence of funds','Tuberculosis screening (compulsory for South Asian countries)','CAS reference from your institution','Evidence that the visa is genuinely for study'],
  docs:['Passport and ID','Licensed student sponsor','CAS letter','Offer letter','Financial statement','English proficiency letter','Criminal record (DBS) check','Three recommendation letters','10+2 certificate','Latest qualification certificate','ATAS certificate','SELT certificate (IELTS)'],
  costs:[['Tuition, public universities','£9,000–£20,000* (UG) · £10,000–£28,000* (PG) per year'],['Tuition, private universities','£10,000–£40,000* (UG) · £15,000–£35,000* (PG) per year'],['Student halls','£650–£2,000* per year, plus about one month\'s rent as deposit'],['Private accommodation','£350–£650/month* shared · £800–£1,300/month* private'],['Phone','£20–£30* per month'],['Groceries','£150–£250* per month'],['Travel','£90–£100/month* in London · £40–£50* elsewhere'],['Visa application fee','£490* (one-time)'],['Healthcare surcharge','£776* per year of visa (stays over 6 months)']],
  salTitle:'Average base salaries in the UK',sal:[['Financial professionals',65000,'£65,000*'],['Sales and marketing',48000,'£48,000*'],['Software professionals',45000,'£45,000*'],['Teaching',40000,'£40,000*'],['Nursing',38000,'£38,000*'],['Administrative jobs',25000,'£25,000*'],['Warehouse operatives',25000,'£25,000*'],['Care workers',24000,'£24,000*']],
  unis:['University of East London','University of Sheffield','Queen Mary University of London','University of Birmingham','University of Roehampton','Coventry University','University of Essex','Aston University','Anglia Ruskin University','Edinburgh Napier University','Ravensbourne University London','Newman University','University of Edinburgh']},
 usa:{name:'USA',full:'United States',tag:'The ultimate destination for top-notch education with unlimited potential.',
  glance:[['5,000+','Institutions to choose from'],['$20,000+*','Annual tuition (from)'],['$350*','SEVIS fee']],
  why:['The US is home to some of the world\'s best and oldest universities, and students can choose from over 5,000 institutions.','US colleges let you pick or change your major after exploring your interests, and general education programs allow multiple subjects and electives.','Programs range from undergraduate to PhD.'],
  points:['Real-world Working Experience','Career Prospects','Advanced, Cutting-edge Facilities','Multicultural Experiences','Globally Recognised Qualifications','Flexible Academic Courses','Work as well as Learn','Networking Opportunities'],
  elig:[['Undergraduate','Completion of 10+2.'],['Postgraduate','A bachelor\'s degree in a related discipline. Some programs require an upper second-class honours degree; others accept a lower second-class honours degree with professional work experience.'],['English','IELTS, TOEFL and SELT are accepted for English proficiency. Check each college\'s accepted tests.'],['Entrance tests','Course-specific tests include ACT, SAT, GMAT, GRE, LSAT and MCAT.'],['Other factors','Sponsorship, economic stability and language proficiency.']],
  visa:['Passport','Visa photo','SEVIS payment confirmation and receipt','School records and certified exam results','Diploma (if needed)','Bank statements','Statement of Purpose'],
  docs:['Passport','Passport-size photo','Offer letter','Transcript or consolidated mark sheet','Provisional or degree certificate','Letter of recommendation','Bonafide letter','English proficiency letter','10+2 certificate','Financial statements'],
  costs:[['Tuition fee','$20,000 to $50,000*'],['SEVIS fee','$350*'],['Rent','$8,000 to $15,000*'],['Off-campus leisure','$2,000 to $3,600*'],['Food','On campus $250/month* · off campus $400 to $600/month*'],['Health insurance','$700 to $1,100* per year'],['Travel','$300 to $700* per year'],['Books and study material','$900 to $2,000* per year'],['Clothes','$500* per year']],
  salTitle:'Highest-paying jobs in the USA (average per year)',sal:[['Orthopedic surgeon',500000,'$500,000+*'],['CEO',300000,'$300,000+*'],['Surgeon specialties, radiologist, cardiologist',239200,'$239,200*'],['Psychiatrist',226800,'$226,800*'],['Airline pilot',211700,'$211,700*'],['IT manager',159010,'$159,010*'],['Data scientist',150000,'$150,000+*'],['Marketing manager',135030,'$135,030*'],['Petroleum engineer',130850,'$130,850*'],['Pharmacist',128570,'$128,570*']]},
 canada:{name:'Canada',full:'Canada',tag:'Quality education, lower tuition than many destinations, a multicultural society and post-study work opportunities.',
  glance:[['CAD 16,600+*','Annual tuition (from)'],['CAD 150*','Student visa fee'],['DLI','Acceptance letter needed for a study permit']],
  why:['Canada offers high-quality education with lower tuition than many other study destinations.','Its multicultural society welcomes international students.','Post-study work (PSW) opportunities help you build a career after graduation.'],
  points:['Abundant Scholarships','Esteemed Universities','Internships and Placements','High-paying Employment Opportunities','Research Opportunities','High-quality Education','Flexible Course Programs','Permanent Residency Opportunities'],
  elig:[['Language Proficiency','Prove your English-language proficiency through a test accepted by your chosen university, such as IELTS or TOEFL. Check the institution’s current accepted tests and minimum score requirements.'],['Acceptance Letter by DLI','A Designated Learning Institution (DLI) is a Canadian school approved to host international students. You generally need a letter of acceptance from a DLI when applying for a study permit.'],['Visa Requirements','You generally need a valid passport or proof of identity, proof of funds for your education and living costs, and a letter of acceptance from a recognised Canadian institution. You must satisfy the immigration officer that you meet the study-permit requirements and will leave Canada when your authorised stay ends. A Provincial or Territorial Attestation Letter (PAL/TAL) may also be required unless an exemption applies.'],['Academic Qualifications','Requirements depend on the course and university. In general, undergraduate applicants need a high school diploma or 10+2 qualification, while master’s applicants need a bachelor’s degree. Check the university’s official entry requirements for the exact qualification and prerequisites.']],
  visa:['Valid passport','Proof of funds','Credible intent to return home after studies','Letter of acceptance','Evidence that the visa is for education only'],
  docs:['Letter of acceptance','Academic records','Statement of purpose','Recommendation letters','English test scores','Passport and ID','Offer letter','Student sponsor','Proof of funds','Provincial or territorial attestation letter'],
  costs:[['Test fee (IELTS, GRE, etc.)','CAD 280–CAD 371* · INR 16,802–INR 22,263*'],['Guaranteed Investment Certificate','CAD 20,635* · INR 12.38 lakh*'],['Tuition fees','CAD 16,600–CAD 83,300* · INR 10–INR 50 lakh*'],['Student visa fee','CAD 150* · INR 9,002*'],['Living costs','CAD 20,000* · INR 12.00 lakh*'],['Travel','CAD 1,300* · INR 78,000*']],
  salTitle:'Highest-paying jobs in Canada (national average, CAD per year)',sal:[['Orthodontist',385012,'CAD 385,012*'],['Anaesthesiologist',359289,'CAD 359,289*'],['Cardiologist',332391,'CAD 332,391*'],['Surgeon',327990,'CAD 327,990*'],['Psychiatrist',307500,'CAD 307,500*'],['Physician',219974,'CAD 219,974*'],['Chief Marketing Officer',156744,'CAD 156,744*'],['Vice President',146376,'CAD 146,376*'],['Software Engineering Manager',144795,'CAD 144,795*'],['Director of IT',133964,'CAD 133,964*']],
  hourly:[['Server / Bartender','CAD 13/hr*'],['Sales Assistant','CAD 14/hr*'],['Barista','CAD 14/hr*'],['Babysitter','CAD 14/hr*'],['Dog Walker','CAD 15/hr*'],['Tutor','CAD 16/hr*'],['Ride-share / Delivery Driver','CAD 19/hr*'],['Freelancer','CAD 25/hr*']]}
};
var PICONS=['cap','globe','building','users','award','compass','shield','plane'];
/* ===== country guides from careergyan.co ===== */
Object.assign(CPAGE,{"france": {"name": "France", "full": "France", "tag": "The best destination for quality education and best employment opportunities.", "glance": [["€237.50–€323.25*", "Tuition fees"], ["€500–€800*", "Health insurance per year"], ["IELTS / TOEFL", "For English-taught courses"]], "why": ["France is a sought-after study destination, home to leading colleges, business schools, and universities. It offers affordable tuition, strong placement prospects, and a good return on investment.", "Its mix of high-class institutions, strong education system, central location, lively culture, and reasonable fees makes it more appealing than many other European countries. Programs range from research-based to short courses.", "Beyond academics, students join a vibrant community and dynamic culture, with the assurance of receiving a quality education."], "points": ["Abundant Scholarships", "Top-Ranked Colleges & Universities", "Remarkable Education System", "English Taught Programmes", "Affordable Education Expenses", "Reasonable Living Costs", "Incredible Scholarships"], "elig": [["Academic Qualifications", "Bachelor's programs require a 12th qualification with a 60% minimum score. Master's programs require a graduate certificate in the same discipline with 60–70% aggregate. PhD programs require a postgraduate certificate in the same subject."], ["Language Proficiency", "English-taught courses require TOEFL or IELTS. French-taught courses require DELF or DALF with a grade of B2 or higher."], ["Standardised Exams", "Certain management, business, science, or engineering courses require GRE or GMAT scores."]], "visa": ["Enrolment certificate from a French university", "Proof of finances", "Flight bookings", "Health insurance (about €500 to €800* per year)", "Documents proving residence, such as university accommodation or a rental agreement"], "docs": ["Valid passport and identification proof", "Academic transcripts", "Offer or acceptance letter", "Student sponsor letter", "English proficiency test results", "Standardised exam scores", "Proof of finances", "Health insurance", "Civil liability certificate", "Work experience for specific courses"], "costs": [["Tuition fees", "INR 23,185–INR 31,557* (EUR 237.50–EUR 323.25*)"], ["Accommodation", "INR 85K* (EUR 900*)"], ["Utilities", "INR 18K* (EUR 189*)"], ["Internet", "INR 3K* (EUR 30*)"], ["Transportation", "INR 6K* (EUR 64*)"], ["Fitness / Gym", "INR 3K* (EUR 35*)"], ["Groceries", "INR 28K* (EUR 300*)"], ["Leisure", "INR 26K* (EUR 280*)"], ["Health Insurance", "INR 3.7K* (EUR 40*)"]], "salTitle": "Highest-Paying Jobs in France", "sal": [["Chief Executive Officer (CEO)", 150000, "€150,000*"], ["Physician", 145000, "€145,000*"], ["Chief Financial Officer (CFO)", 100000, "€100,000*"], ["Dentist", 90000, "€90,000*"], ["Pilot", 80300, "€80,300*"], ["Healthcare Professional", 74000, "€74,000*"], ["Lawyer", 70600, "€70,600*"], ["Management Consultant", 70000, "€70,000*"], ["Human Resources Director", 70000, "€70,000*"], ["Financial Analyst", 61900, "€61,900*"]], "hourly": [["Freelance Digital Jobs", "EUR 27*"], ["Private Tutor", "EUR 24*"], ["Translator", "EUR 21*"], ["Uber Driver", "EUR 19*"], ["Tour Guide", "EUR 18*"], ["Event Staff", "EUR 15*"], ["Salesman", "EUR 15*"], ["Supermarket Cashier", "EUR 13*"], ["Waiter", "EUR 12*"], ["Babysitting", "EUR 11*"]], "unis": ["PSL", "Institut Polytechnique de Paris", "Sorbonne University"], "notes": [["Top courses", "Science, Technology, Engineering, Management, Pharmacy and Others, across undergraduate, postgraduate, diploma and PhD levels."], ["Tuition", "Tuition is comparatively reasonable at top institutions such as PSL, Institut Polytechnique de Paris and Sorbonne University. Costs depend on the course and university."]], "photo2": "1522202176988-66273c2fd55f"}, "germany": {"name": "Germany", "full": "Germany", "tag": "The best study abroad destination to achieve your dreams", "glance": [["No tuition", "Public universities (admin charges only)"], ["€1,000*", "Living expenses per month (approx.)"], ["18 months", "Post-study work opportunity"]], "why": ["Germany's rich culture and history are reflected in its cities, with old buildings, architecture and museums showing the past.", "Art lovers can visit many galleries and museums featuring popular works by artists worldwide.", "Germany is considered one of the best destinations for abroad education, with many top-ranked universities in culturally rich cities. The QS World University Rankings 2024 lists 9 German colleges among the top 200 worldwide."], "points": ["Low Tuition Fees", "High-Ranked Colleges and Universities", "Various Degree Programs", "Numerous Scholarships", "Great Placement Opportunities", "Hands-on Learning Experience", "18 Months Post Study Work"], "elig": [["For UG Courses", "10+2 qualification from your home country."], ["For PG Courses", "A bachelor's degree."], ["Language Proficiency", "Prove English proficiency through IELTS or TOEFL. Check requirements with the immigration office and your university."], ["Entrance & Standardised Tests", "Some courses require entrance exams or standardised tests. For example, master's programs in business and management may require GRE or GMAT."]], "visa": ["A valid passport", "€30,000* as health insurance coverage", "Two recent biometric portrait photographs", "Filled-in study visa application form", "Fee payment receipt for the visa application", "Acceptance letter from a German university", "A statement of purpose mentioning the intention to return home after course completion", "Approximately €10,332* deposited in a German fixed deposit account as proof of finances"], "docs": ["German Student Visa", "Valid Passport", "Language Proficiency Proof", "Proof of Financial Resources", "Health Insurance", "Previous Academic Records", "Statement of Purpose", "Letters of Recommendation", "APS Certificate", "Preliminary Review Documentation (VPD)", "Standardised Exams", "University Entrance Qualification"], "costs": [["Tuition fees (public universities)", "No tuition charges, only administrative charges"], ["Tuition fees (private colleges)", "INR 8 lakhs to INR 17 lakhs*"], ["Estimated living expenses", "Approximately €1,000* per month, including food, stay, utilities and travel"], ["Accommodation", "INR 22k to INR 71k* per month"], ["Food", "INR 17k to INR 35k* per month"], ["Health Insurance", "INR 7k to INR 8k* per month"], ["Transportation", "INR 4k to INR 7k* per month"], ["Utilities", "INR 8k to INR 13k* per month"]], "salTitle": "Highest-Paying Jobs in Germany", "sal": [["Surgeon", 22000000, "INR 2.2Cr*"], ["Specialist Doctor (Cardiologist, Neurologist)", 20000000, "INR 2Cr*"], ["Portfolio Manager", 8400000, "INR 84L*"], ["Healthcare Manager", 7700000, "INR 77L*"], ["Software Architect", 7500000, "INR 75L*"], ["IT Manager", 7300000, "INR 73L*"], ["Investment Banker", 7300000, "INR 73L*"], ["Software Engineer", 6400000, "INR 64L*"], ["Data Scientist", 6100000, "INR 61L*"], ["Automotive Engineer", 5800000, "INR 58L*"]], "hourly": [["Student Assistant", "€10–€17*"], ["Tutor", "€12–€15*"], ["Courier / Delivery", "€9–€12*"], ["Waiting Tables", "€7–€10*"], ["Office Assistant", "€12*"], ["Industrial Production Assistant", "€12*"], ["Salesperson", "€9–€10*"], ["Babysitting", "€10–€15*"], ["Call Centre Operator", "€15*"], ["Field Interviewer", "€18–€20*"]], "unis": [], "notes": [["Top courses", "Germany is often called the hub of engineering and business studies. Technical, science and business programs are among the top courses."], ["Job market", "Germany's unemployment rate is one of the lowest in the world, with strong demand for skilled professionals in tech, engineering, healthcare, management and finance."]], "photo2": "1530099486328-e021101a494a"}, "spain": {"name": "Spain", "full": "Spain", "tag": "Top destination for education, culture, and opportunity.", "glance": [["€700–€2,500*", "Public UG tuition per year"], ["€300–€800*", "Accommodation per month"], ["DELE / IELTS", "Language tests"]], "why": ["Spain is a popular European study destination that pairs strong academics with rich culture and a lower cost of living and tuition than many Western European countries. Its universities are noted for business, arts, engineering and humanities, with programs taught in Spanish and English.", "Beyond academics, students can enjoy historic cities such as Madrid and Barcelona, Mediterranean beaches and local festivals. A diverse international community and Spain's location make it easy to build global connections and travel across Europe."], "points": ["High-Quality Education", "Affordable Tuition and Living Costs", "Courses in English and Spanish", "Rich Culture and History", "Ideal Climate and Beautiful Locations", "Gateway to Europe and Career Opportunities"], "elig": [["Academic Qualifications", "Undergraduate applicants usually need secondary education equivalent to Spain's Bachillerato, and postgraduate applicants need a recognised bachelor's degree."], ["Language Proficiency", "Show Spanish or English proficiency, depending on the course language. Common tests are DELE for Spanish and IELTS or TOEFL for English-taught programs."], ["Student Visa (Non-EU)", "Non-EU/EEA students need a student visa, which requires an admission letter, proof of finances, medical insurance and a clean criminal record."], ["Recognition of Qualifications", "Some institutions may require previous qualifications to be validated through the Spanish Ministry of Education or the university's admissions office."]], "visa": ["Letter of acceptance from a Spanish institution", "Proof of financial means", "Medical insurance", "Clean criminal record"], "docs": ["Completed application form", "Academic transcripts and certificates", "Proof of language proficiency (Spanish or English)", "Valid passport", "Curriculum Vitae (CV)", "Motivation letter / Statement of Purpose", "Letters of recommendation", "Recognition of prior studies (Homologación)", "Proof of financial means", "Health insurance coverage"], "costs": [["Tuition fees (public universities, Bachelor's)", "€700 – €2,500* per year"], ["Accommodation", "€300 – €800* per month"], ["Food / Groceries", "€200 – €400* per month"], ["Transportation", "€40 – €60* per month (public transport passes)"], ["Utilities (electricity, water, internet)", "€100 – €150* per month"], ["Books, study materials, supplies", "€300 – €600* per year"], ["Health Insurance", "€50 – €100* per month (mandatory for non-EU students)"]], "salTitle": "Highest-Paying Jobs in Spain", "sal": [["Neurosurgeon", 120000, "€120,000* (₹1.07 Cr*)"], ["CEO", 110000, "€110,000* (₹98* Lakh)"], ["Anaesthetist", 100000, "€100,000* (₹89* Lakh)"], ["Financial Analyst", 70000, "€70,000* (₹62* Lakh)"], ["HR Director", 65000, "€65,000* (₹58* Lakh)"], ["Legal Professional", 60000, "€60,000* (₹53* Lakh)"], ["Mining Engineer", 55000, "€55,000* (₹49* Lakh)"], ["Financial Investment Advisor", 50000, "€50,000* (₹44* Lakh)"], ["Construction Manager", 50000, "€50,000* (₹44* Lakh)"], ["Software Architect", 45000, "€45,000* (₹40* Lakh)"]], "hourly": [], "unis": ["University of Barcelona", "Pompeu Fabra University", "Autonomous University of Barcelona (UAB)", "University of Navarra", "Universidad Autónoma de Madrid", "Complutense University", "University of Valencia", "Valencia Polytechnic University", "Universitat Rovira i Virgili", "Universitat Politècnica de Catalunya", "University of Granada", "University of Santiago de Compostela", "University of the Basque Country"], "notes": [["Top courses", "Popular fields include Business & Management, Hospitality & Tourism and Architecture & Design, with Engineering, Medicine and International Relations also in high demand."], ["What affects cost", "Tuition varies by type of college, chosen course, number of credits, city of study and nationality."]], "photo2": "1543269865-cbf427effbad"}, "netherlands": {"name": "Netherlands", "full": "Netherlands", "tag": "The best study abroad destination to achieve your dreams", "glance": [["€6,000–€15,000*", "UG tuition per year"], ["90,000+", "Students from 160 countries"], ["8", "Dutch colleges in QS top 200 (2024)"]], "why": ["Netherlands is one of the best options for studying abroad. It is a beautiful place to visit and stay, with charming towns and picturesque countryside, and some highly sought-after, top-ranked colleges and universities.", "The number of international students rises each academic year. Its educational excellence, unique teaching methods, hands-on training and welcoming atmosphere attract students worldwide, and the 2024 QS World Rankings list 8 Dutch colleges in the top 200 universities.", "With 90,000+ students from 160 countries, Netherlands has a diverse and inclusive student community, making it a strong destination for reaching career goals and academic excellence."], "points": ["Top-Ranked Colleges, Business Schools & Universities", "World-Class Education System", "High-Paying Jobs", "Internship Opportunities", "Practical Experience and Hands-on Learning", "Affordable Costs of Living and Education", "Strategic Location"], "elig": [["Bachelor's Degree", "10+2 qualification from an affiliated institution."], ["Master's Degree", "Bachelor's degree from a recognised university."], ["Language Proficiency", "Language proficiency tests are an important admission criterion. Prove English proficiency with tests such as IELTS and TOEFL."], ["Financial Proof", "Show proof of financial resources to fund your education and cover living costs."]], "visa": ["A valid passport and proper travel documents", "Proof of financial resources", "Acceptance letter issued by an accredited Dutch college", "Tuberculosis test", "Health insurance", "Statement of purpose showing the study is for education only and that you will return home after the course"], "docs": ["Valid passport and identity proof", "Registration on Studielink, the Dutch Government's student registration system", "Language proficiency test results", "Academic records", "Financial proof", "Letter of recommendation", "Health insurance", "Statement of purpose"], "costs": [["Tuition fees (public, undergraduate)", "EUR 6,000–EUR 15,000* per year"], ["Tuition fees (public, postgraduate)", "EUR 8,000–EUR 20,000* per year"], ["Tuition fees (private university)", "EUR 30,000* per year"], ["Accommodation", "EUR 300 to EUR 800* per month"], ["Food", "EUR 150 to EUR 200* per month"], ["Public Transport", "EUR 35 to EUR 70* per month"], ["Health Insurance", "EUR 80 to EUR 120* per month"], ["Miscellaneous (books, leisure, personal)", "EUR 100 to EUR 200* per month"], ["Overall estimated monthly expenses", "€800* (INR 72,528*) to €1,500* (INR 1,36,003*)"]], "salTitle": "Highest-Paying Jobs in Netherlands", "sal": [["Surgeon", 123241, "€123,241*"], ["Psychiatrist", 105120, "€105,120*"], ["Director", 85000, "€85,000*"], ["Dentist", 81500, "€81,500*"], ["Manager Software Development", 75600, "€75,600*"], ["Minister", 65268, "€65,268*"], ["Lawyer", 63000, "€63,000*"], ["Compliance Officer", 57616, "€57,616*"], ["Doctor", 54000, "€54,000*"], ["Notary", 48030, "€48,030*"]], "hourly": [], "unis": [], "notes": [["Most sought-after jobs", "Digital Marketing Specialist €48,000*; HR Generalist €43,785*; Senior Recruiter €37,500*; Data Analyst €45,328*; UX Designer €37,830*; Project Manager €55,941*; Customer Support €33,037*; Sales / Business Manager €50,267*; Software Engineer €50,700*."], ["Top courses", "Science, Technology, Engineering, Management, Pharmacy and Others."]], "photo2": "1606761568499-6d2451b23c66"}, "australia": {"name": "Australia", "full": "Australia", "tag": "The best destination with high potential.", "glance": [["AUD 20,000–AUD 45,000*", "Bachelor's tuition per year"], ["IELTS / TOEFL / Duolingo", "English tests"], ["Top 100", "Several universities in the global top 100"]], "why": ["Studying in Australia offers numerous opportunities for students worldwide. Its location, scenic views, vibrant environment, culinary scenes and attractive venues all contribute to its popularity.", "Some of the world's top-ranked universities are in the country, many in the top 100 global universities, such as Melbourne University, Sydney University, UNSW Sydney, Monash University and Queensland University. They offer bachelor's, master's, diploma and PhD courses with remarkable placement opportunities.", "Get ready to experience a diverse and innovative learning environment, with peace of mind that you are in the right place."], "points": ["High-Quality Education System", "Top-Ranked Colleges and Universities", "Diverse and Supportive Learning Environment", "Exceptional Placement Opportunities", "Flexible Programs", "Academic Excellence", "Incredible Networking Opportunity"], "elig": [["Foundation Course", "Secondary high school program or other equivalent qualification."], ["Bachelor's Degree", "10+2 academic record or equivalent qualification from an affiliated and recognised institution."], ["Master's Degree", "Bachelor's degree from a recognised college."], ["English Proficiency", "Prove language proficiency with tests such as IELTS, TOEFL or Duolingo. Check which tests your university accepts."], ["Financial Stability", "Provide proof of financial resources to show that you can fund your education."]], "visa": ["Valid passport and travel documents", "Letter of acceptance or offer from an Australian university", "Statement of Purpose showing you are going only for studies and will return home after completion", "Proof of financial resources to fund your education and living costs in Australia"], "docs": ["A valid passport and identity proof", "Letter of Recommendation", "English Proficiency Test", "Student Sponsor", "Latest Education Certificate", "10+2 Qualification Certificate", "Proof of Financial Resources", "Offer or Acceptance Letter from a Recognised University"], "costs": [["Tuition fees (bachelor's degree)", "AUD 20,000 to AUD 45,000* per year"], ["Tuition fees (master's degree and PhD)", "AUD 22,000 to AUD 50,000* per year"], ["Accommodation", "AUD 450 to AUD 1,800* per month"], ["Food / Groceries", "AUD 500 to AUD 1,000* per month"], ["Transportation", "AUD 30 to AUD 70* per month"], ["Utilities", "AUD 200* per month"], ["Books, study materials and stationery", "AUD 500 to AUD 1,000* per year"], ["Health insurance", "AUD 30* per month"]], "salTitle": "Highest-Paying Jobs in Australia", "sal": [["Neurosurgeon", 425000, "AUD 425,000* (INR 2.3Cr*)"], ["CEO", 400000, "AUD 400,000* (INR 2.1Cr*)"], ["Anaesthetist", 380000, "AUD 380,000* (INR 2Cr*)"], ["Financial Analyst", 300000, "AUD 300,000* (INR 1.6Cr*)"], ["Head of HR / HR Director", 300000, "AUD 300,000* (INR 1.6Cr*)"], ["Legal Professionals", 200000, "AUD 200,000* (INR 1Cr*)"], ["Mining Engineer", 180000, "AUD 180,000* (INR 98L*)"], ["Construction Manager", 175000, "AUD 175,000* (INR 95L*)"], ["Financial Investment Advisor", 160000, "AUD 160,000* (INR 87L*)"], ["Software Architect", 150000, "AUD 150,000* (INR 81L*)"]], "hourly": [], "unis": ["University of Melbourne", "University of Sydney", "UNSW Sydney", "Monash University", "University of Queensland"], "notes": [["Average base salaries", "Cardiologist AUD 214,393*; Psychiatrist AUD 190,624*; Doctor/Physician AUD 185,250*; Mining Engineer AUD 145,000*; Back-end Developer AUD 140,000*; Physicist AUD 128,739*; Software Engineer AUD 125,000*; Data Scientist AUD 122,212*."], ["High-paying industries", "Healthcare, IT and Software Engineering, followed by finance, pharmacy, law and human resources."]], "photo2": "1758270704763-22072a90d3b6"}, "new-zealand": {"name": "New Zealand", "full": "New Zealand", "tag": "The best study abroad destination to achieve your dreams", "glance": [["NZD 20,000–NZD 35,000*", "Tuition per year"], ["NZD 375*", "Student visa fee"], ["Post-study", "Work rights after graduation"]], "why": ["New Zealand is known for world-class institutions and high-quality programs. Its top-ranked universities offer courses from business and engineering to arts and sciences. Education emphasises practical learning and innovation, with small class sizes, personalised attention and access to leading experts.", "Beyond academics, the country offers scenic landscapes, friendly people and a safe setting for a balanced lifestyle. Students can enjoy beaches, national park hiking and urban culture, and post-study work opportunities let graduates gain international work experience."], "points": ["World-Class Education", "Safe and Welcoming Environment", "Stunning Natural Beauty", "Practical Learning and Innovation", "Work Opportunities for International Students", "Post-Graduation Work Rights"], "elig": [["Academic Qualifications", "Completed academic qualifications equivalent to New Zealand's entry requirements for the desired course level."], ["English Language Proficiency", "Proof through tests such as IELTS, TOEFL or PTE, with minimum scores varying by course and institution."], ["Offer of Place", "An official offer letter from a New Zealand education provider is required to apply for a student visa."], ["Financial Support", "Evidence of sufficient funds to cover tuition fees, living expenses and return travel."]], "visa": ["Valid offer of place from a recognised institution (mandatory)", "Student visa (essential for entry)", "Medical clearance (essential for entry)"], "docs": ["Valid Passport", "Academic Transcripts and Certificates", "English Language Test Scores", "Statement of Purpose (SOP)", "Letter of Recommendation (LOR)", "Curriculum Vitae (CV) or Resume", "Offer of Place", "Proof of Funds", "Medical Certificates", "Police Clearance Certificate", "Passport-Sized Photographs", "Completed Visa Application Form"], "costs": [["Tuition fees", "NZD 20,000 – NZD 35,000* per year (approx. ₹10–₹18 lakhs*)"], ["Living expenses", "NZD 15,000 – NZD 18,000* per year (approx. ₹7.5–₹9 lakhs*)"], ["Health insurance", "NZD 300 – NZD 700* per year (approx. ₹15,000–₹35,000*)"], ["Student visa fee", "NZD 375* (approx. ₹18,000–₹20,000*)"], ["Travel (round trip)", "NZD 1,200 – NZD 2,000* (approx. ₹60,000–₹1 lakh*)"], ["Study materials & miscellaneous", "NZD 500 – NZD 1,000* per year (approx. ₹25,000–₹50,000*)"]], "salTitle": "Most Sought After Jobs in New Zealand", "sal": [["Construction Project Manager", 95000, "NZD 95,000* per year"], ["Software Developer", 85000, "NZD 85,000* per year"], ["Registered Nurse", 75000, "NZD 75,000* per year"], ["Electrician", 70000, "NZD 70,000* per year"], ["Primary School Teacher", 60000, "NZD 60,000* per year"]], "hourly": [], "unis": [], "notes": [["Top courses", "Popular options include Information Technology, Business and Management, Engineering and Healthcare, with nursing and medical sciences noted for hands-on training."], ["Highest-paying jobs", "Healthcare, IT, engineering and management roles are among the most lucrative, especially in sectors facing skill shortages, including medical specialists, IT managers, engineering managers, pilots and corporate lawyers."]], "photo2": "1529070538774-1843cb3265df"}, "romania": {"name": "Romania", "full": "Romania", "tag": "The best study abroad destination to achieve your dreams", "glance": [["100+", "Countries represented on campus"], ["EU", "Degrees recognised across Europe"], ["English", "Many programs taught in English"]], "why": ["Romania is becoming an increasingly popular destination for international students seeking quality education at affordable costs. Its universities offer many undergraduate and postgraduate programs taught entirely in English, with Medicine, Engineering, Computer Science, Business and Arts especially popular.", "Tuition fees and living expenses are significantly lower than in many other European countries. As an EU member, Romania's degrees are recognised across Europe and globally.", "Universities attract students from over 100 countries, and most institutions have international student offices to help newcomers settle in. Entrance exams are not required for many programs, and visa approval rates are relatively high for genuine students."], "points": ["Affordable Education", "Global Recognition", "English Programs", "Diverse Culture", "Top Universities", "Hands-on Learning Experience", "Easy Admission"], "elig": [["Educational Qualifications", "The equivalent of Romanian high school (for undergraduate) or a bachelor's degree (for postgraduate) from a recognised institution."], ["Language Proficiency", "Proficiency in the language of instruction (Romanian, English or French) through standardised tests or preparatory language courses offered by Romanian universities."], ["Passport and Student Visa", "A valid passport and a Romanian student visa (D/SD type), applied for after receiving a letter of acceptance from a recognised Romanian university."], ["Proof of Financial Means", "Sufficient funds to cover tuition and living expenses for the duration of studies, usually through bank statements or financial sponsorship."]], "visa": ["Valid passport", "Romanian student visa (D/SD type), after a letter of acceptance from a recognised Romanian university", "Proof of sufficient funds for tuition and living expenses"], "docs": ["Completed application form", "Letter of acceptance from a Romanian university", "Proof of educational qualifications", "Valid passport", "Birth certificate", "Medical certificate", "Proof of language proficiency", "Passport-sized photos", "Curriculum Vitae (CV)", "Motivation letter or statement of purpose", "Proof of financial means", "Application fee payment receipt"], "costs": [["Tuition fees (undergraduate)", "£10,000 – £20,000* per year"], ["Tuition fees (postgraduate)", "£12,000 – £25,000* per year"], ["Accommodation (university halls)", "£400 – £800* per month"], ["Accommodation (private)", "£500 – £1,000* per month"], ["Living expenses", "£500 – £800* per month"], ["Health surcharge", "£470* per year"], ["Visa application fee", "£490*"], ["Miscellaneous", "£50 – £100* per month"], ["Estimated total per year", "£20,000 – £30,000*"]], "salTitle": "Highest-Paying Jobs in Romania", "sal": [["Medical Specialist (e.g., Surgeon)", 84000, "€4,000 – €7,000* per month"], ["IT Project Manager", 72000, "€3,500 – €6,000* per month"], ["Financial Manager", 72000, "€3,000 – €6,000* per month"], ["Software Engineer", 60000, "€2,000 – €5,000* per month"], ["Legal Consultant", 60000, "€2,500 – €5,000* per month"]], "hourly": [], "unis": ["Carol Davila University of Medicine and Pharmacy", "Iuliu Hațieganu University of Medicine and Pharmacy"], "notes": [["Top courses", "Quality education with affordable tuition, especially in Medicine, Engineering and Computer Science. Engineering and IT programs in Bucharest and Cluj-Napoca attract many international students."], ["Sought-after jobs", "Software developers €2,500 – €3,500* per month; civil engineers €1,800 – €2,500*; registered nurses €1,200 – €2,000*; accountants €1,500 – €2,300*; customer service specialists €1,000 – €2,000*."]], "photo2": "1568992688065-536aad8a12f6"}, "hungary": {"name": "Hungary", "full": "Hungary", "tag": "One of the best academic destinations, with many opportunities", "glance": [["€2,000–€5,000*", "Public UG tuition per year"], ["Bologna", "Degrees recognised across Europe"], ["€150–€300*", "Dormitory per month"]], "why": ["Hungary sits in Central/Eastern Europe, bordering Austria to the west and Romania to the east, and has many high-class colleges. Top Hungarian universities teach diverse programs in English, including data science, cyber security, architecture and social sciences.", "Institutions also offer preparatory and foundation courses for students who do not pass entrance exams. Hungarian degrees follow the Bologna Scheme and are recognised across Europe and worldwide.", "Studying in Hungary means receiving a high-quality education with a widely recognised degree, along with numerous opportunities."], "points": ["High-Quality Education", "Reasonable Tuition Fees", "A Wide Range of Courses", "Strong International Community", "Post-Study Work Opportunities", "Scholarship and Financial Aid"], "elig": [["Language Proficiency", "English-taught courses require proof of English proficiency through IELTS, TOEFL or an official language certificate. Courses taught in Hungarian require proficiency in Hungarian."], ["Academic Records", "Bachelor's degree courses require completion of 12th grade or equivalent. Postgraduate programs require an undergraduate program in the same field."], ["Standardised Exams", "Certain STEM courses require an entrance exam covering subjects such as English, Mathematics, Physics, Chemistry or Biology. Students who cannot pass take a foundation or preparatory course."]], "visa": ["Letter of acceptance from a recognised Hungarian college", "Proof of financial resources to cover tuition fees and living costs", "Valid passport and proof of identity", "Health insurance and a medical certificate"], "docs": ["Passport and Identity Proof", "Academic Records", "Proof of language proficiency", "Statement of Purpose", "Letter of Recommendation", "Residence Permit", "Proof of Accommodation", "Health insurance", "Financial proof to cover your stay"], "costs": [["Bachelor's programs", "€2,000 – €5,000* per year (public) · €5,000 – €12,000* (private)"], ["Master's programs", "€3,000 – €6,000* per year (public) · €6,000 – €15,000* (private)"], ["Medical degrees (MBBS)", "€12,000 – €16,000* (public) · €16,000 – €20,000* (private)"], ["Doctoral programs", "€1,500 – €5,000* (public) · €5,000 – €12,000* per year (private)"], ["Accommodation (dormitory)", "€150 – €300* per month"], ["Accommodation (private rental)", "€500 – €900* per month"], ["Food & groceries", "€150 – €250* per month"], ["Public transport pass", "€10 – €30* per month"], ["Utilities & internet", "€50 – €120* per month"], ["Personal expenses", "€30 – €70* per month"]], "salTitle": "Highest Paying Jobs in Hungary", "sal": [["Data Scientist", 1400000, "HUF 600,000 – HUF 1,400,000*"], ["AI & Machine Learning Engineer", 1300000, "HUF 600,000 – HUF 1,300,000*"], ["Software Developer", 1200000, "HUF 500,000 – HUF 1,200,000*"], ["Project Manager", 1200000, "HUF 700,000 – HUF 1,200,000*"], ["Marketing Manager", 1100000, "HUF 600,000 – HUF 1,100,000*"], ["Cybersecurity Specialist", 900000, "HUF 500,000 – HUF 900,000*"], ["Cloud Engineer", 900000, "HUF 500,000 – HUF 900,000*"], ["Financial Analyst", 900000, "HUF 500,000 – HUF 900,000*"]], "hourly": [], "unis": ["ELTE University", "University of Debrecen", "Corvinus University", "Budapest University of Technology (Műegyetem)", "University of Szeged", "University of Pannonia", "University of Pécs", "Óbuda University", "Semmelweis University", "Széchenyi University (Győr)", "Moholy-Nagy University", "CEU", "MATE", "Budapest Metropolitan University"], "notes": [["Top courses", "UG, PG and doctoral courses in Science, Technology, Engineering, Management, Pharmacy and Others. Low tuition fees and affordable living costs make Hungary popular."]], "photo2": "1531482615713-2afd69097998"}, "ireland": {"name": "Ireland", "full": "Ireland", "tag": "A top European destination for quality education and wide career opportunities", "glance": [["€10,000–€29,000*", "UG tuition per year"], ["€44,202*", "Average full-time salary per year"], ["IELTS / TOEFL / PTE", "English tests"]], "why": ["Ireland blends green countryside and castles with lively city life. Known as the Emerald Isle, it offers history, culture, nightlife and scenic views.", "Ireland offers strong-quality education, a broad range of courses and good job prospects, which makes it a good fit for students, including those from India. Many major technology and other companies have their main offices there.", "Irish institutions offer both short and long programs, from doctoral and research degrees to foundation and certificate courses."], "points": ["High Quality Education", "Friendly and Safe Environment", "Scholarship Facilities", "Employment Opportunities and PSW", "Cultural and Historical Richness", "Reasonable Cost of Living", "A Broad Range of Courses"], "elig": [["Academic Qualifications", "Undergraduate programs require 60% in 10+2. Foundation and diploma programs require a score of 50 in class 12. Master's programs require an undergraduate degree in the relevant field with 55% to 75%."], ["Language Proficiency", "An IELTS, TOEFL or PTE score is needed for admission. Minimum scores vary by college."], ["Entrance Examinations", "Most universities require an English test such as IELTS, TOEFL, PTE or the Duolingo English Test. Separate entrance exams are generally not needed, except for some specialised courses such as medicine, law or MBA."]], "visa": ["An acceptance letter from a recognised Irish college", "A valid passport", "Proof of funds", "English language proficiency", "Academic records", "Health insurance", "Confirmation that you will return home after your studies"], "docs": ["Valid passport and proof of identity", "Statement of purpose", "Letters of recommendation", "Academic transcripts", "English proficiency test results", "Proof of funds", "Health insurance", "Offer letter from a recognised university"], "costs": [["Undergraduate degree", "€10,000 to €29,000* per year"], ["Postgraduate program", "€13,000 to €37,000* per year"], ["Doctoral degree", "€13,000 to €37,000* per year"], ["Accommodation", "€300 – €600*"], ["Utilities (electricity, gas, water)", "€30 – €50*"], ["Food and groceries", "€250 – €350*"], ["Transportation (monthly bus ticket)", "€65 – €85*"], ["Books, learning materials and stationery", "€75*"], ["Mobile phone", "€20*"], ["Personal costs (leisure and sports)", "€200 – €300*"]], "salTitle": "Highest-Paying Jobs in Ireland", "sal": [["Chief Executive Officer (CEO)", 120000, "€120,000 – €200,000* per year"], ["Chief Financial Officer (CFO)", 100000, "€100,000 – €180,000* per year"], ["Judges", 100000, "€100,000 – €155,000* per year"], ["Surgeons & Doctors", 90000, "€90,000 – €220,000* per year"], ["IT & Software Development Managers", 80000, "€80,000 – €120,000* per year"], ["Lawyers / Solicitors", 60000, "€60,000 – €120,000* per year"], ["Marketing Directors", 60000, "€60,000 – €100,000* per year"], ["Bank Managers", 50000, "€50,000 – €140,000* per year"], ["College Professors", 50000, "€50,000 – €106,000* per year"], ["Pilots", 40000, "€40,000 – €90,000* per year"]], "hourly": [], "unis": ["Trinity College Dublin", "University College Dublin", "University College Cork", "University of Galway", "Dublin City University", "University of Limerick", "Maynooth University", "TU Dublin", "South East Technological University"], "notes": [["Average pay", "Full-time employees earn about €44,202* a year on average. Graduate starting pay ranges from about €28,000 to €34,000*, depending on sector."], ["Top courses", "Science, Technology, Engineering, Management, Pharmacy and Others, across bachelor's, master's, certificate, diploma and doctoral programs."]], "photo2": "1517048676732-d65bc937f952"}, "sweden": {"name": "Sweden", "full": "Sweden", "tag": "Sweden, where innovative learning meets global opportunities", "glance": [["1,000+", "Programs taught entirely in English"], ["SEK 80,000–SEK 150,000*", "UG tuition per year (public)"], ["8", "Universities in QS 2025 rankings"]], "why": ["Sweden offers world-class, innovation-focused education that stresses critical thinking and practical skills, taught in English. Its welcoming culture, natural scenery and research focus draw many Indian students. Sweden has eight universities in the 2025 QS rankings, with KTH Royal Institute of Technology at 74 and Lund University at 75.", "More than 1,000 programs are taught entirely in English, which helps students who do not yet speak Swedish. Universities such as Lund, Uppsala, KTH and Stockholm rank consistently in QS rankings and offer advanced research facilities, and tuition is affordable compared with many other countries."], "points": ["World-Class Education", "Innovative Learning", "English-Taught Programs", "Cultural Diversity", "Globally Ranked Universities", "Affordable Tuition"], "elig": [["Bachelor's Programs", "The 12th-grade Higher Secondary Certificate or an equivalent. Some programs, such as engineering, may require specific subjects like mathematics and science."], ["Master's Programs", "A recognised bachelor's degree of at least three years in a relevant field, usually with a GPA equal to a Swedish C or higher. Design and architecture programs may ask for work experience or a portfolio."], ["English Tests", "IELTS overall 6.5 with no section below 5.5; TOEFL iBT 90 with at least 20 in writing; PTE Academic 62 with no section below 55. Some universities waive tests for applicants who studied in English."], ["Standardised Tests", "GMAT, GRE and SAT are generally not required, though some competitive business or engineering programs may consider them."]], "visa": ["A residence permit for studies, required for stays over 90 days and applied for before arriving", "Valid passport", "Letter of admission from a Swedish university", "Proof of financial support, about SEK 9,450* per month for living expenses", "Health insurance, if the program is under one year", "Accommodation details (recommended)"], "docs": ["Valid passport", "Offer letter from a Swedish university", "Application via UniversityAdmissions.se", "Proof of tuition fee payment", "Financial proof of SEK 10,314* per month", "English proficiency certificate (IELTS, TOEFL or PTE)", "10th and 12th grade marksheets", "Latest qualification certificate", "One to two letters of recommendation", "Statement of purpose or motivation letter", "Curriculum vitae (CV)", "Health insurance, if the program is under one year"], "costs": [["Undergraduate tuition", "SEK 80,000 – SEK 150,000* (public) · SEK 100,000 – SEK 180,000* (private)"], ["Postgraduate tuition", "SEK 90,000 – SEK 200,000* (public) · SEK 120,000 – SEK 250,000* (private)"], ["Student halls", "SEK 3,000 – SEK 6,000* per month"], ["Private shared accommodation", "SEK 4,000 – SEK 8,000* per month"], ["Phone subscription", "SEK 200 – SEK 400* per month"], ["Groceries", "SEK 2,000 – SEK 3,000* per month"], ["Local public transport", "SEK 300 – SEK 500* per month"], ["Visa application fee", "SEK 1,500* (one-time)"], ["Miscellaneous expenses", "SEK 500 – SEK 1,500* per month"]], "salTitle": "Highest-Paying Jobs in Sweden (2025)", "sal": [["Judge", 1692000, "SEK 1,692,000* per year"], ["Surgeon / Doctor", 1609536, "SEK 1,609,536* per year"], ["Lawyer", 1368000, "SEK 1,368,000* per year"], ["Bank Manager", 1284000, "SEK 1,284,000* per year"], ["Chief Executive Officer", 1212000, "SEK 1,212,000* per year"], ["Chief Financial Officer", 1128000, "SEK 1,128,000* per year"], ["University Professor", 967200, "SEK 967,200* per year"], ["Orthodontist", 880000, "SEK 880,000* per year"], ["Pilot", 805200, "SEK 805,200* per year"], ["Marketing Director", 724800, "SEK 724,800* per year"]], "hourly": [], "unis": ["Lund University", "Uppsala University", "KTH Royal Institute of Technology", "Stockholm University"], "notes": [["Popular jobs", "Software developers (average SEK 510,000*), secondary school teachers (SEK 490,000*), nurses (SEK 450,000*) and care workers (SEK 300,000*) are among the most common roles."], ["Jobs without a degree", "Personal trainer, estate agent, police officer, firefighter, wellness coach and train driver, with pay from about SEK 160,000 to SEK 800,000* per year."]], "photo2": "1509062522246-3755977927d7"}, "latvia": {"name": "Latvia", "full": "Latvia", "tag": "A great study abroad destination with many incredible opportunities", "glance": [["€3,000–€5,000*", "UG tuition per year"], ["15", "Top-ranked colleges"], ["€60*", "Study visa fee"]], "why": ["Latvia is a European gem with beautiful beaches, cities and calm forests. It is popular for affordability and high quality of life.", "The Baltic country offers international students a chance to pursue higher studies in warm, thriving surroundings. It has 15 top-ranked colleges, including 11 public institutions and 4 private universities.", "Latvian universities emphasise modernisation and globalisation. Courses are offered in English, Russian, German, Latvian and Scandinavian languages, across fields from architecture to social sciences, with healthcare and aviation especially popular."], "points": ["Affordable Education and Living", "World-Class Education", "Globally Recognised Courses", "English Taught Courses", "Excellent Internship and Placement Opportunities", "Scholarships and Financial Assistance"], "elig": [["Academic Transcripts", "Diplomas and undergraduate programmes: 10+2 certification. Postgraduate courses: an undergraduate degree in a related field. Doctoral programmes: a master's degree in a related field."], ["Proficiency Tests", "Most colleges require IELTS, TOEFL or PTE. English-medium applicants may use previous education certification. Some courses may require Latvian proficiency."], ["Financial Proof", "Prove to Latvian authorities that you can fund education and living costs, via a bank certificate or international debit card."], ["Visa Criteria", "Valid passport, evidence of financial resources, residence permit for the duration of studies, and an offer letter from a recognised Latvian college."]], "visa": ["Valid passport or other relevant travel paperwork", "Evidence of financial resources for education and living expenses", "Residence permit for the duration of your studies", "Letter of acceptance or offer letter from a recognised Latvian college"], "docs": ["Passport and Identity Proof", "Academic Records", "Language Proficiency", "Proof of Funds", "Police Clearance Certificate", "Recommendation Letter", "Study Visa and Residence Permit (non-EU)", "Motivation Letter / CV"], "costs": [["Tuition fees (undergraduate, international)", "EUR 3,000 – EUR 5,000* per year"], ["Tuition fees (postgraduate)", "EUR 1,700* per year (EU) · EUR 3,700* per year (non-EU)"], ["Executive MBA programmes", "Up to EUR 25,600* per year"], ["Accommodation (university dormitory)", "EUR 70 – EUR 120* per month"], ["Accommodation (private flat)", "EUR 100 – EUR 350* per month"], ["Monthly utilities", "EUR 115 – EUR 185* per month"], ["Food and groceries", "EUR 120 – EUR 250* per month"], ["Public transport pass", "EUR 10 – EUR 16* per month"], ["Study visa", "EUR 60*"], ["Health insurance", "EUR 100 to EUR 700*"]], "salTitle": "Highest Paying Jobs in Latvia", "sal": [["Pilot", 55164, "€4,597* per month"], ["Chief Executive Officer", 54492, "€4,541* per month"], ["Sailor", 48168, "€4,014* per month"], ["Lead Developer", 45420, "€3,785* per month"], ["IT Manager", 44304, "€3,692* per month"], ["IT Director", 41748, "€3,479* per month"], ["Finance Manager", 41520, "€3,460* per month"], ["IT Architect", 41244, "€3,437* per month"], ["Dentist", 40668, "€3,389* per month"], ["Lawyer", 38508, "€3,209* per month"]], "hourly": [["Sales Advisor", "EUR 41–EUR 44*"], ["Customer Care Executive", "EUR 23–EUR 25*"], ["Administrative Assistant", "EUR 18–EUR 22*"], ["Cashier", "EUR 14–EUR 15*"], ["Courier", "EUR 12–EUR 14*"], ["Social Media Manager", "EUR 10–EUR 20*"], ["Language Teacher", "EUR 10–EUR 20*"], ["Writer or Editor", "EUR 10–EUR 20*"], ["Virtual Assistant", "EUR 10–EUR 20*"], ["Pet Care Specialist", "EUR 5–EUR 10*"]], "unis": ["Riga Technical University", "RISEBA University"], "notes": [["High-paying sectors", "High payouts are found in Information and Computer Technology, Finance, Aviation and Medicine."]], "photo2": "1570616969692-54d6ba3d0397"}, "lithuania": {"name": "Lithuania", "full": "Lithuania", "tag": "One of the top-tier academic destinations with lucrative career opportunities", "glance": [["350+", "Courses taught mainly in English"], ["€2,000–€4,000*", "Public UG tuition per year"], ["€120*", "National Visa D (approx.)"]], "why": ["Lithuania is a popular European study destination, and one Schengen visa allows travel to the wider region.", "Its universities are internationally recognised, charge lower tuition than many European countries, and offer over 350 courses taught mainly in English.", "Students can apply for their preferred course and join a growing student community with affordable fees."], "points": ["Low Tuition Fees", "Affordable Living", "Academic Excellence", "Well-Established Education System", "Recognised Institutions", "Career Opportunities", "A Unique Cultural Experience"], "elig": [["Bachelor's Degree", "Secondary school examination or 12th-grade completion."], ["Master's Degree", "A graduate program in the relevant field."], ["Language Proficiency", "English proficiency shown through IELTS, TOEFL or Duolingo."], ["Entrance Exams", "Some courses may require GMAT, GRE, SAT or ACT."]], "visa": ["Acceptance or offer letter from a recognised college in Lithuania", "Proof of finances", "Valid health insurance", "Past academic records such as 10+2 and graduation mark sheets", "Language proficiency tests", "Statement of Purpose"], "docs": ["Valid passport and identity proof", "Acceptance or offer letter from a recognised university", "Proof of financial resources", "Valid health insurance policy", "Academic records", "Language proficiency test results", "Entrance exam results", "Statement of purpose", "Letter of recommendation"], "costs": [["Public universities, Bachelor's", "€2,000 to €4,000* per year"], ["Public universities, Master's", "€3,000 to €6,000* per year"], ["Private universities, Bachelor's", "€3,000 to €6,000* per year"], ["Private universities, Master's", "Up to €8,000* per year"], ["Rent", "€150 to €300* per month"], ["Food & groceries", "€100 to €200* per month"], ["Transport", "€20 to €30* per month with student discounts"], ["Utilities & internet", "€50 to €100* per month"], ["Personal expenses", "€50 to €100* per month"], ["Student visa (National Visa D)", "Around €120*, one time"], ["Health insurance", "€150* per year (non-EU, private insurance)"], ["Books and supplies", "€100 to €200* per year"]], "salTitle": "Highest Paying Jobs in Lithuania", "sal": [["Chief Executive Officer", 64680, "EUR 5,390* per month"], ["IT Director", 64284, "EUR 5,357* per month"], ["Pilot", 62460, "EUR 5,205* per month"], ["Leasing Director", 60072, "EUR 5,006* per month"], ["Managing Director", 54192, "EUR 4,516* per month"], ["Business Group Manager", 53664, "EUR 4,472* per month"], ["IT Architect", 50736, "EUR 4,228* per month"], ["Lead Developer", 49620, "EUR 4,135* per month"], ["Finance Manager", 49008, "EUR 4,084* per month"], ["Go Developer", 46644, "EUR 3,887* per month"]], "hourly": [], "unis": [], "notes": [["Public vs private", "Public universities have low tuition fees, while private institutions charge higher fees that are still lower than many other European private colleges."], ["Course options", "Science, Technology, Engineering, Management, Pharmacy and Others."]], "photo2": "1571260899304-425eee4c7efc"}, "poland": {"name": "Poland", "full": "Poland", "tag": "Affordable, high-quality education in Poland, with degrees recognised across Europe and beyond.", "glance": [["€2,000–€4,000*", "Tuition per year"], ["€150–€400*", "Accommodation per month"], ["EU", "Degrees recognised across Europe"]], "why": ["Poland is a popular choice for international students because of its strong academics, reasonable tuition and lively student life. Many English-taught programs in engineering, medicine, business and IT are recognised across the EU and globally, and living costs are lower than in many Western European countries.", "Beyond academics, Poland offers historic cities, active student communities and a welcoming atmosphere. Its central location makes it easy to travel to neighbouring countries, and the growing economy creates post-study work options in technology, healthcare and manufacturing."], "points": ["Affordable Tuition Fees", "Globally Recognised Degrees", "Wide Range of English-Taught Programs", "Low Cost of Living", "Rich Cultural and Historical Experience", "Central Location in Europe"], "elig": [["Academic Qualifications", "Secondary education or higher, depending on the level of the course."], ["English Proficiency", "Non-native speakers must provide proof of English proficiency, such as IELTS, TOEFL or another accepted test."], ["Offer of Place", "A formal acceptance letter from a recognised Polish institution is needed to apply for a student visa."], ["Financial Support", "Show enough funds to cover tuition, living costs and travel for the full length of your studies."]], "visa": ["A valid student visa", "Acceptance from a recognised university", "An official offer letter from a Polish education provider", "Proof of financial stability for tuition fees and living expenses"], "docs": ["Valid passport", "Completed application form", "Academic transcripts and certificates", "Proof of English language proficiency", "Letter of motivation or statement of purpose", "Curriculum vitae (CV)", "Letter of recommendation", "Passport-sized photographs", "Offer of admission from a Polish university", "Proof of financial support", "Medical insurance", "Visa application form and fee"], "costs": [["Tuition fees", "EUR 2,000–EUR 4,000* per year (approx. ₹1.8–₹3.5 lakhs*)"], ["Accommodation", "EUR 150–EUR 400* per month (approx. ₹13,000–₹35,000*)"], ["Food and groceries", "EUR 150–EUR 250* per month (approx. ₹13,000–₹22,000*)"], ["Health insurance", "EUR 50–EUR 100* per year (approx. ₹4,500–₹9,000*)"], ["Transportation", "EUR 10–EUR 25* per month (approx. ₹900–₹2,200*)"], ["Miscellaneous", "EUR 100–EUR 150* per month (approx. ₹9,000–₹13,500*)"]], "salTitle": "Highest-Paying Jobs in Poland", "sal": [["Surgeon / Medical Specialist", 200000, "PLN 200,000 – PLN 600,000* per year"], ["IT Director / Software Architect", 150000, "PLN 150,000 – PLN 350,000* per year"], ["Investment Banker", 150000, "PLN 150,000 – PLN 400,000* per year"], ["Engineering Manager", 130000, "PLN 130,000 – PLN 250,000* per year"], ["Corporate Lawyer / Partner", 120000, "PLN 120,000 – PLN 300,000* per year"]], "hourly": [], "unis": [], "notes": [["Most sought-after jobs", "Software Developer PLN 120,000/year*; Data Scientist PLN 140,000/year*; Marketing Manager PLN 110,000/year*; Financial Analyst PLN 100,000/year*; Human Resources Manager PLN 110,000/year*."], ["Top courses", "Popular fields include engineering, medicine, business and IT, with internationally recognised degrees and affordable study options."]], "photo2": "1507537362848-9c7e70b7b5c1"}, "finland": {"name": "Finland", "full": "Finland", "tag": "An incredible study destination with numerous opportunities", "glance": [["9", "Universities in QS rankings"], ["€8,000–€20,000*", "Tuition per year"], ["€70*", "Student healthcare fee per year"]], "why": ["Finland is known as one of the happiest countries in the world, with rich natural beauty, a strong education system, high quality of life and a welcoming atmosphere.", "Several Finnish universities rank among the world's top institutions, with nine listed in the QS World University Rankings. Tuition is free for Finnish and EU/EEA students and reasonable for non-EU/EEA students. Education emphasises critical thinking, problem-solving, creativity, collaboration and hands-on learning."], "points": ["One of the Happiest Countries", "Strong Education System", "High Quality of Life", "Nine Universities in QS Rankings", "Reasonable Tuition for Non-EU Students", "Collaborative, Hands-on Learning"], "elig": [["Bachelor's Degree Courses", "Completion of secondary school examinations or 12th-grade education."], ["Master's Degree Courses", "A graduate program in the relevant field."], ["Language Proficiency", "English tests such as IELTS, TOEFL, PTE, Cambridge Proficiency or Duolingo."], ["Entrance Exams", "Some courses, such as Data Science, MBA, Business Analytics and Pharmacy, may require SAT, GRE or GMAT scores."]], "visa": ["Letter of acceptance from a recognised Finnish college", "Proof of financial resources", "Valid health insurance", "Academic records", "Language proficiency tests", "Statement of purpose"], "docs": ["Valid passport and identity proof", "Letter of acceptance from a recognised Finnish college", "Proof of financial resources", "Valid health insurance", "Academic records", "Language proficiency tests", "No criminal record", "Entrance exam results", "Statement of purpose", "Letter of recommendation", "Student residence permit if the course exceeds 90 days"], "costs": [["Tuition fees", "€8,000 – €20,000* per year (varies by university and program)"], ["Student union fees", "€100 – €150* per academic year"], ["Student healthcare fee", "€70* per year"], ["Accommodation (shared apartments)", "€400 – €700* per month"], ["Groceries", "€250 – €300* per month"], ["Public transport", "€30 – €50* per month"], ["Books & study materials", "€200 – €300*"], ["Laptop / software (one-time)", "€500 – €1,000*"], ["Health insurance", "€300 – €600* per year"]], "salTitle": "High-Paying Jobs in Finland", "sal": [["Human Resource Management", 75450, "Rs. 7,384,064"], ["Nursing", 72000, "Rs. 7,043,760"], ["IT and Software", 64162, "Rs. 6,276,074"], ["Business Development Manager", 61000, "Rs. 58.2 lakh"], ["Marketing Manager", 60000, "Rs. 57.2 lakh"], ["Physician", 60000, "Rs. 57.2 lakh"], ["Accounting and Finance", 58533, "Rs. 5,727,074"], ["AI Engineer", 55000, "Rs. 52.5 lakh"], ["Teaching", 48000, "Rs. 4,695,840"], ["Data Analyst", 48000, "Rs. 45.8 lakh"]], "hourly": [], "unis": ["Aalto University", "University of Helsinki", "Tampere University", "University of Eastern Finland", "University of Turku", "University of Jyväskylä", "University of Oulu", "University of Vaasa", "Hanken School of Economics", "LAB University", "University of Lapland", "LUT University", "Centria University"], "notes": [["Top courses", "Science, Technology, Engineering, Management, Pharmacy and Others."]], "photo2": "1573497620053-ea5300f94f21"}, "italy": {"name": "Italy", "full": "Italy", "tag": "One of the best European destinations with academic excellence and exceptional opportunities", "glance": [["€900–€4,000*", "Public tuition per year"], ["IMAT", "Entrance exam for medicine"], ["€250–€600*", "Student dorms per month"]], "why": ["Italy has a well-regarded education system known for its historical significance and academic excellence. Regional scholarships can provide financial aid to students from low-income backgrounds.", "Several of the world's oldest universities are in Italy, and the country has produced leading scientists, artists and Nobel Prize laureates. Italian universities are especially known for Architecture, Applied Sciences, Art, Medicine, Engineering, Industrial Design and Economics.", "Studying in Italy means joining a thriving community in a hub for academic excellence."], "points": ["High-Quality Education", "Affordable Tuition Fees", "Diverse Course Offerings", "Cultural Immersion and Historical Significance", "Remarkable Work Opportunities", "Vibrant Student Life"], "elig": [["Academic Records", "Undergraduate and diploma programs require 10+2 or equivalent. Postgraduate courses require a bachelor's degree in the same field. Doctoral programs require a master's degree in the same field."], ["Language Proficiency", "Proof of proficiency in the language of instruction through CILS, CELI, IELTS or TOEFL, depending on whether the course is taught in Italian or English."], ["Standardised Exams", "Some courses, such as medical programs, require entrance exams like IMAT. Business and economics courses may require GMAT or GRE."], ["Visa", "Proof of finances, valid health insurance, a residence permit, confirmation of acceptance from a recognised Italian university and proof of accommodation."]], "visa": ["Proof of financial resources to fund your education and living in Italy", "Proper health insurance coverage", "Residence permit", "Confirmation of acceptance from a recognised Italian university", "Proof of accommodation"], "docs": ["Valid passport and identity proof", "Academic transcripts", "Language proficiency results", "Statement of Purpose", "Letter of Recommendation", "Financial proof", "Portfolio for art, design and architecture courses", "Birth certificate", "Proof of accommodation", "Declaration of value for the previous degree", "Application fee receipt"], "costs": [["Public university tuition", "€900 – €4,000* per year"], ["Private university tuition", "€6,000 – €35,000* per year"], ["Student dorms", "€250 – €600* per month"], ["Private rentals", "€400 – €1,500* per month"], ["Food expenses", "€150 – €300* per month"], ["Public transportation", "€25 – €50* per month"]], "salTitle": "Highest Paying Jobs in Italy", "sal": [["Surgeon", 175000, "€175,000 – €200,000* (Rs. 1–1.8 crore)"], ["Marketing Director", 91000, "€91,000 – €120,000* (Rs. 83 lakh–1 crore)"], ["Bank Manager", 56000, "€56,000 – €90,000* (Rs. 51–82 lakh)"], ["Project Manager", 52000, "€52,000 – €70,000* (Rs. 47–64 lakh)"], ["Software Developer", 50000, "€50,000 – €61,000* (Rs. 45–56 lakh)"], ["Mechanical Engineer", 45000, "€45,000 – €60,000* (Rs. 41–55 lakh)"], ["Lawyer", 36000, "€36,000 – €70,000* (Rs. 33–64 lakh)"], ["Financial Analyst", 36000, "€36,000 – €50,000* (Rs. 33–45 lakh)"], ["Graphic Designer", 30000, "€30,000 – €55,000* (Rs. 27–50 lakh)"], ["Receptionist", 20000, "€20,000 – €45,000* (Rs. 18–41 lakh)"]], "hourly": [], "unis": ["Sapienza University of Rome", "University of Bologna", "University of Turin", "University of Milan", "University of Naples Federico II", "University of Pisa", "University of Trento", "Polytechnic University of Milan", "University of Pavia", "University of Rome Tor Vergata", "University of Florence", "University of Genoa", "Catholic University of the Sacred Heart", "Bocconi University"], "notes": [["Tech sector outlook", "Technology jobs are concentrated in Milan, Rome and Turin, with growth expected in Artificial Intelligence, Cybersecurity and Cloud Computing."], ["Famous jobs", "Bank Managers (average €156,000*), University Professors (€122,400*), Marketing Directors (€91,983*) and University Teaching Assistants (€44,091*)."]], "photo2": "1630487656049-6db93a53a7e9"}});
Object.keys(CPAGE).forEach(function(k){if(!BANNER[k]&&PHOTO[k])BANNER[k]=PHOTO[k]});
Object.assign(DFACTS,{"france": [["Tuition fees", "€237.50–€323.25*"], ["Health insurance per year", "€500–€800*"]], "germany": [["Public universities (admin charges only)", "No tuition"], ["Living expenses per month (approx.)", "€1,000*"]], "spain": [["Public UG tuition per year", "€700–€2,500*"], ["Accommodation per month", "€300–€800*"]], "netherlands": [["UG tuition per year", "€6,000–€15,000*"], ["Students from 160 countries", "90,000+"]], "australia": [["Bachelor's tuition per year", "AUD 20,000–AUD 45,000*"], ["English tests", "IELTS / TOEFL / Duolingo"]], "new-zealand": [["Tuition per year", "NZD 20,000–NZD 35,000*"], ["Student visa fee", "NZD 375*"]], "romania": [["Countries represented on campus", "100+"], ["Degrees recognised across Europe", "EU"]], "hungary": [["Public UG tuition per year", "€2,000–€5,000*"], ["Degrees recognised across Europe", "Bologna"]], "ireland": [["UG tuition per year", "€10,000–€29,000*"], ["Average full-time salary per year", "€44,202*"]], "sweden": [["Programs taught entirely in English", "1,000+"], ["UG tuition per year (public)", "SEK 80,000–SEK 150,000*"]], "latvia": [["UG tuition per year", "€3,000–€5,000*"], ["Top-ranked colleges", "15"]], "lithuania": [["Courses taught mainly in English", "350+"], ["Public UG tuition per year", "€2,000–€4,000*"]], "poland": [["Tuition per year", "€2,000–€4,000*"], ["Accommodation per month", "€150–€400*"]], "finland": [["Universities in QS rankings", "9"], ["Tuition per year", "€8,000–€20,000*"]], "italy": [["Public tuition per year", "€900–€4,000*"], ["Entrance exam for medicine", "IMAT"]]});
function sec(head,body,cls){return '<section class="section '+(cls||'')+'"><div class="container">'+head+body+'</div></section>'}
function shead(eb,h,center,lead){return '<div class="sec-head'+(center?' center':'')+'"><span class="eyebrow'+(center?' both':'')+' rv">'+eb+'</span><h2 class="h-h2 rv" style="--d:.06s">'+h+'</h2>'+(lead?'<p class="lead rv" style="--d:.12s">'+lead+'</p>':'')+'</div>'}
function statsBand(){return '<div class="container h-stats-wrap"><div class="h-stats rv"><div class="hs"><span class="hs-ic">'+icon('users')+'</span><div><b data-count="6413+">6413+</b><span>Success Stories</span></div></div><div class="hs"><span class="hs-ic">'+icon('cap')+'</span><div><b data-count="2569+">2569+</b><span>Universities</span></div></div><div class="hs"><span class="hs-ic">'+icon('shield')+'</span><div><b data-count="97%">97%</b><span>VISA Approval (Last Intake)</span></div></div><div class="hs dark"><span class="hs-ic">'+icon('award')+'</span><div><b data-count="11+">11+</b><span>Years of Experience</span></div></div></div></div>'}
function heroHTML(bg,crumbs,eb,h1,lead,glass){
  return '<div class="ihero"><img decoding="async" class="bg" src="'+bg+'"'+HSET(bg)+' alt="'+esc(String(h1).replace(/<[^>]+>/g,''))+'" fetchpriority="high"><div class="container ihero-grid"><div><nav class="crumbs rv"><a href="index.html">Home</a>'+crumbs.map(function(c){return icon('right')+'<span>'+c+'</span>'}).join('')+'</nav><span class="eyebrow gold rv">'+eb+'</span><h1 class="rv" style="--d:.06s">'+h1+'</h1><p class="h-lead rv" style="--d:.12s">'+lead+'</p><div class="h-actions rv" style="--d:.18s"><a class="btn btn-gold" href="contact.html">Get Free Counselling '+icon('arrow')+'</a><a class="btn btn-glass" href="eligibility.html">Check Eligibility</a></div></div>'+glass+'</div></div>';
}
function glassRows(title,ic,rows,flag){return '<div class="glass rv" style="--d:.2s"><div class="glass-h"><span>'+(flag?'<img decoding="async" class="gflag" src="https://flagcdn.com/w80/'+flag+'.png" alt="">':'')+title+'</span>'+icon(ic)+'</div>'+rows.map(function(r){return '<div class="glass-row"><b>'+r[0]+'</b><span>'+r[1]+'</span></div>'}).join('')+'</div>'}
function tabsHTML(items){
  return '<div class="tabs rv"><div class="tab-btns">'+items.map(function(t,i){return '<button class="'+(i?'':'active')+'" data-tab="'+i+'">'+t[0]+'</button>'}).join('')+'</div><div class="tab-panels">'+items.map(function(t,i){return '<div class="tab-panel'+(i?'':' active')+'" data-panel="'+i+'"><span class="tp-n">0'+(i+1)+'</span><h3>'+t[0]+'</h3><p>'+t[1]+'</p></div>'}).join('')+'</div></div>';
}
function checklist(title,items,dark,ic){return '<div class="chk'+(dark?' dark':'')+' rv"><div class="chk-h"><span class="hf-ic">'+icon(ic)+'</span><h3>'+title+'</h3></div><ul>'+items.map(function(x,i){return '<li style="--i:'+i+'">'+icon('check')+x+'</li>'}).join('')+'</ul></div>'}
function barsHTML(rows){rows=rows.filter(function(r){return r&&r[1]!=null});var max=Math.max.apply(null,rows.map(function(r){return r[1]}));return '<div class="bars rv">'+rows.map(function(r,i){return '<div class="bar-row" style="--i:'+i+'"><div class="bar-l"><span>'+r[0]+'</span><b>'+r[2]+'</b></div><div class="bar"><i style="--w:'+Math.max(8,Math.round(r[1]/max*100))+'%"></i></div></div>'}).join('')+'</div>'}
function costTable(rows){return '<div class="ctable rv">'+rows.map(function(r,i){return '<div class="crow" style="--i:'+i+'"><span>'+r[0]+'</span><b>'+r[1]+'</b></div>'}).join('')+'</div><p class="price-note rv">* Approximate figures. Actual fees and costs vary by university, city and intake, and are subject to change.</p>'}
function whyCG(){var w=[['award','Experience','More than 11 years of experience and 5,000+ success stories.'],['users','Personalised Guidance','One-on-one counselling to match courses and universities to your goals.'],['globe','Global Network','A network of 2,569+ partner universities.'],['shield','End-to-end Support','SOPs, LORs, admissions, visas, test preparation, education loans, travel and accommodation.']];
  return '<div class="cg4">'+w.map(function(x,i){return '<div class="cg rv" style="--d:'+(i*.08)+'s"><span class="hf-ic">'+icon(x[0])+'</span><h3>'+x[1]+'</h3><p>'+x[2]+'</p></div>'}).join('')+'</div>'}
function courseCards(){return '<div class="crs-grid">'+[['science','Science','sci'],['technology','Technology','tech'],['engineering','Engineering','eng'],['management','Management','mgmt'],['pharmacy','Pharmacy','pharm']].map(function(c,i){return crsCard({s:c[0],n:c[1],i:c[2]},i,'Master\'s, MBA & undergraduate')}).join('')+'</div>'}
function ctaWith(img){return '<section class="section" style="padding-top:0"><div class="container">'+BLOCKS.cta(img)+'</div></section>'}
function stepsSec(eb){return '<section class="section h-how"><span class="glow g1"></span><div class="container" style="position:relative"><div class="sec-head center"><span class="eyebrow gold both rv">'+(eb||'How it works')+'</span><h2 class="h-h2 rv" style="color:#fff">Your Abroad Education <span class="serif">Roadmap</span></h2></div><div class="steps">'+BLOCKS.steps()+'</div></div></section>'}

function countryPage(k){
  var d=CPAGE[k],c=COUNTRIES[k];
  var h=heroHTML(UNS(BANNER[k],2000),['Countries',d.name],'Study Destinations','Study in <span class="serif">'+d.full+'</span>',d.tag,glassRows(d.full+' at a glance','globe',d.glance,iso(k)));
  h+=statsBand();
  // why study
  h+='<section class="section h-why"><div class="container h-why-grid"><div class="h-collage"><div class="hc-main rv-img"><img decoding="async" src="'+UNS(d.photo2||PHOTO[k],1100)+'" data-fb="https://flagcdn.com/w1280/'+iso(k)+'.png" alt="'+d.full+'" loading="lazy"></div><div class="hc-side"><div class="hc-gold rv" style="--d:.15s"><b>2569+</b><span>Partnered universities across the globe</span></div><div class="hc-navy rv" style="--d:.25s"><span class="eyebrow gold" style="margin-bottom:10px">Top courses</span><p>Science · Technology · Engineering · Management · Pharmacy</p></div></div></div><div><span class="eyebrow rv">Why Study in '+d.name+'?</span><h2 class="h-h2 rv" style="--d:.06s">Why study in <span class="serif">'+d.full+'</span></h2>'+d.why.map(function(p,i){return '<p class="h-p rv" style="--d:'+(.1+i*.04)+'s'+(i?';margin-top:12px':'')+'">'+p+'</p>'}).join('')+'<a class="btn btn-primary rv" href="contact.html" style="margin-top:30px">Talk to an expert '+icon('arrow')+'</a></div></div></section>';
  // points
  h+=sec(shead('Why choose '+d.name,'Why you should choose <span class="serif">'+d.full+'</span>',true),'<div class="pts">'+d.points.map(function(p,i){return '<div class="pt rv" style="--d:'+((i%4)*.07)+'s"><span class="pt-n">0'+(i+1)+'</span><span class="pt-ic">'+icon(PICONS[i%8])+'</span><h3>'+p+'</h3></div>'}).join('')+'</div>','bg-soft');
  // courses
  h+=sec(shead('Top courses','Top courses in <span class="serif">'+d.full+'</span>',true,'Masters, MBA and undergraduate programs for Indian students.'),courseCards());
  // eligibility tabs
  h+=sec(shead('Eligibility','Who can apply to study in <span class="serif">'+d.name+'</span>',false),tabsHTML(d.elig),'bg-soft');
  // visa + docs
  h+=sec(shead('Visa & documents','What you\'ll need to <span class="serif">apply</span>',true),'<div class="chk-grid">'+checklist('Visa requirements',d.visa,true,'shield')+checklist('Application documents',d.docs,false,'mail')+'</div>');
  h+=dlSection(k,d);
  // cost
  h+=sec(shead('Cost of study','Estimated costs for <span class="serif">Indian students</span>',false,'Approximate figures. Your counsellor will help you plan the exact budget for your course and city.'),costTable(d.costs),'bg-soft');
  // salaries
  h+='<section class="section h-how"><span class="glow g1"></span><div class="container sal-grid" style="position:relative"><div><span class="eyebrow gold rv">Careers</span><h2 class="h-h2 rv" style="color:#fff">'+d.salTitle.replace(/(in (the )?[A-Z][\w ]*?)(?=\s*\(|$)/,'<span class="serif">$1</span>')+'</h2>'+(d.hourly&&d.hourly.length?'<p class="lead rv" style="margin-top:18px">Common part-time jobs (per hour):</p><div class="hourly rv">'+d.hourly.map(function(x){return '<span><b>'+x[1]+'</b>'+x[0]+'</span>'}).join('')+'</div>':'<p class="lead rv" style="margin-top:18px">Indicative salary figures from the Career Gyan '+d.name+' guide.</p>')+'</div>'+barsHTML(d.sal)+'</div></section>';
  // universities
  if(d.notes&&d.notes.length)h+=sec(shead('Good to know','More about studying in <span class="serif">'+d.name+'</span>',true),'<div class="cg4 notes-g">'+d.notes.map(function(x,i){return '<div class="cg rv" style="--d:'+(i*.08)+'s"><span class="hf-ic">'+icon(['award','globe','cap'][i%3])+'</span><h3>'+x[0]+'</h3><p>'+x[1]+'</p></div>'}).join('')+'</div>');
  if(d.unis&&d.unis.length)h+=sec(shead('Top universities','Top universities in <span class="serif">'+d.name+'</span>',true),'<div class="uni-marquee rv"><div class="uni-track">'+d.unis.concat(d.unis).map(function(u){return '<span class="uni">'+icon('cap')+u+'</span>'}).join('')+'</div></div><p class="muted" style="text-align:center;margin-top:20px">And more.</p>');
  // why career gyan
  h+=sec(shead('Why Choose Career Gyan','Your '+d.name+' journey, <span class="serif">fully supported</span>',true),whyCG(),'bg-soft');
  h+=stepsSec();
  h+=sec(shead('FAQs',d.name+' study abroad: <span class="serif">common questions</span>',true,'Answers for Indian students planning to study in '+d.full+'.'),faqHTML(countryFAQs(k)),'bg-soft');
  h+=ctaWith(UNS('1541339907198-e08756dedf3f',1800));
  return h;
}
function studentLoanPage(){
  var h=heroHTML(UNS('1454165804606-c3d57bc86b40',2000),['Resources','Student Loan'],'Student Loan Assistance','Plan your education with the right <span class="serif">funding support</span>','Explore education loan options for studying in India or overseas. Career Gyan can help you understand the process, prepare your documents and connect your funding plan with your university admission journey.',glassRows('Loan guidance at a glance','wallet',[['Study abroad','Funding support'],['Documentation','Application guidance'],['Personalised','Profile-based guidance']]));
  h+=sec(shead('Funding your studies','Understand your <span class="serif">education loan options</span>',true,'The right loan depends on your course, university, country, co-applicant profile and repayment capacity.'),'<div class="cg4"><article class="cg rv"><span class="hf-ic">'+icon('cap')+'</span><h3>Tuition Fee Funding</h3><p>Understand how education loans may help cover eligible tuition fees and university charges.</p></article><article class="cg rv" style="--d:.08s"><span class="hf-ic">'+icon('building')+'</span><h3>Living &amp; Travel Costs</h3><p>Check whether accommodation, travel, insurance and other approved study-related expenses can be included.</p></article><article class="cg rv" style="--d:.16s"><span class="hf-ic">'+icon('file')+'</span><h3>Document Preparation</h3><p>Get guidance on the academic, admission, identity and financial documents commonly requested by lenders.</p></article><article class="cg rv" style="--d:.24s"><span class="hf-ic">'+icon('clipboard')+'</span><h3>Application Guidance</h3><p>Understand the steps involved in comparing lenders, submitting an application and reviewing a loan offer.</p></article></div>');
  h+=sec(shead('How it works','A clear path from admission to <span class="serif">loan application</span>',true),'<div class="steps">'+[['Share your study plan','Tell us your destination, course, university and estimated expenses.'],['Review funding requirements','Understand the possible loan amount, collateral or co-applicant requirements and lender criteria.'],['Prepare your documents','Organise admission, academic, identity and financial documents for the application.'],['Apply and review the offer','Submit your application to the lender and carefully review interest, fees, repayment terms and conditions.']].map(function(x,i){return '<div class="step rv" style="--i:'+i+'"><span class="n">0'+(i+1)+'</span><div><h3>'+x[0]+'</h3><p>'+x[1]+'</p></div></div>'}).join('')+'</div>','bg-soft');
  h+=sec(shead('Important to know','Choose a loan after checking the <span class="serif">full terms</span>',false),'<div class="notice rv"><p>Loan approval, interest rates, eligible expenses, collateral requirements, processing fees and repayment terms are decided by the lender and depend on your profile. Career Gyan does not guarantee loan approval or a particular rate. Always read the lender\'s official sanction letter and terms before accepting an offer.</p></div>');
  h+=sec(shead('Get guidance','Discuss your education funding <span class="serif">with our team</span>',true),'<div class="pcta rv"><span class="eyebrow gold">Career Gyan</span><h2>Let’s plan your <span class="serif">next step</span></h2><p>Talk to our counsellors about your admission plan and the funding documents you may need.</p><div class="h-actions"><a class="btn btn-gold" href="contact.html">Talk to an expert '+icon('arrow')+'</a><a class="btn btn-glass" href="eligibility.html">Check Eligibility</a></div></div>');
  return h;
}

function engineeringPage(){
  var h=heroHTML(UNS(BANNER.engineering,2000),['Courses','Engineering'],'Courses · Study Abroad Programs','Study <span class="serif">Engineering</span> Abroad','Our study abroad programs let you experience world-class education while exploring new cultures. With diverse destinations and full support, you\'ll gain global perspectives, valuable skills, and unforgettable memories.',glassRows('Engineering at a glance','eng',[['15','Study destinations'],['Bachelor\'s & Master\'s','Course types'],['2569+','Partnered universities']]));
  h+='<section class="section"><div class="container h-why-grid"><div><span class="eyebrow rv">About the program</span><h2 class="h-h2 rv" style="--d:.06s">Build a global career in <span class="serif">STEM</span></h2><p class="h-p rv" style="--d:.1s">Pursuing higher education in Medical and STEM (Science, Technology, Engineering, and Mathematics) fields opens doors.</p><p class="h-p rv" style="--d:.14s;margin-top:12px">Our study abroad programs let you experience world-class education while exploring new cultures, with diverse destinations and full support from Career Gyan.</p><ul class="ticks rv" style="--d:.18s"><li>'+icon('check')+'World-class education</li><li>'+icon('check')+'Diverse destinations with full support</li><li>'+icon('check')+'Global perspectives and valuable skills</li></ul><a class="btn btn-primary rv" href="contact.html" style="margin-top:30px">Shortlist with an expert '+icon('arrow')+'</a></div><div class="h-collage"><div class="hc-main rv-img"><img decoding="async" src="'+UNS('1581091226033-d5c48150dbaa',1100)+'" alt="Engineering students in a workshop" loading="lazy"></div><div class="hc-side"><div class="hc-gold rv" style="--d:.15s"><b>15</b><span>Countries offering Engineering programs</span></div><div class="hc-small rv-img" style="--d:.25s"><img decoding="async" src="'+UNS('1606206873764-fd15e242df52',800)+'" alt="Robotic arm" loading="lazy"></div></div></div></div></section>';
  var EC=[['Australia','australia'],['Canada','canada'],['Estonia',null,'ee'],['France','france'],['Germany','germany'],['India',null,'in'],['Ireland','ireland'],['Italy','italy'],['Latvia','latvia'],['Lithuania','lithuania'],['Netherlands','netherlands'],['Poland','poland'],['Sweden','sweden'],['UK','uk'],['USA','usa']];
  h+='<section class="section h-dest"><div class="container">'+shead('Countries','Where you can study <span class="serif">Engineering</span>',true,'Engineering programs are available across these 15 destinations.')+'<div class="dgrid small">'+EC.map(function(a,i){return a[1]?countryCard(a[1],i):plainCountryCard(a[0],a[2],i)}).join('')+'</div></div></section>';
  h+=stepsSec();
  h+=sec(shead('Application & admission assistance','We help you build a <span class="serif">winning application</span>',true),BLOCKS.assist());
  h+=sec(shead('Explore other courses','Find the right program for your <span class="serif">career</span>',true),'<div class="crs-grid six">'+COURSES.filter(function(c){return c.s!=='engineering'}).map(function(c,i){return crsCard(c,i)}).join('')+'</div>','bg-soft');
  h+=ctaWith(UNS('1581092163144-b7ae3c00adbc',1800));
  return h;
}
function hyderabadPage(){
  var o=OFFICES.filter(function(x){return x.loc==='hyderabad'})[0];
  var glass='<div class="glass rv" style="--d:.2s"><div class="glass-h"><span>Career Gyan Hyderabad</span>'+icon('pin')+'</div><a class="glass-line" href="'+o.m+'" target="_blank" rel="noopener">'+icon('pin')+esc(o.a)+'</a><a class="glass-line" href="tel:+919071663366">'+icon('phone')+'+91 90716 63366</a><a class="glass-line" href="mailto:hyderabad@careergyan.co">'+icon('mail')+'hyderabad@careergyan.co</a><a class="btn btn-gold btn-sm" style="margin-top:18px;width:100%" href="'+o.m+'" target="_blank" rel="noopener">Get directions '+icon('arrow')+'</a></div>';
  var h=heroHTML(UNS(BANNER.hyderabad,2000),['Our Locations','Hyderabad'],'Career Gyan Hyderabad','Best Abroad Education Consultants in <span class="serif">Hyderabad</span>','Dreaming of studying abroad but not sure where to start? Your go-to partner for global education success.',glass);
  h+=statsBand();
  h+='<section class="section h-why"><div class="container h-why-grid"><div class="h-collage"><div class="hc-main rv-img"><img decoding="async" src="'+UNS('1787043940937-4c6f89b92bdf',1100)+'" alt="Charminar, Hyderabad" loading="lazy"></div><div class="hc-side"><div class="hc-gold rv" style="--d:.15s"><b>5,000+</b><span>Students guided to admissions in top universities</span></div><div class="hc-small rv-img" style="--d:.25s"><img decoding="async" src="'+UNS('1573497620053-ea5300f94f21',800)+'" alt="Counselling session" loading="lazy"></div></div></div><div><span class="eyebrow rv">Career Gyan Hyderabad</span><h2 class="h-h2 rv" style="--d:.06s">Your partner for <span class="serif">global education</span></h2><p class="h-p rv" style="--d:.1s">Career Gyan, one of the top abroad education consultants in Hyderabad, is your go-to partner for global education success. With 11+ years of experience, 2,569+ university partnerships, and a 100% visa approval rate in the last intake, we are the #1 trusted consultancy with proven success stories.</p><p class="h-p rv" style="--d:.14s;margin-top:12px">We guide you through every step, from counselling and university shortlisting to application submission and visa processing, making your study abroad journey smooth, simple, and successful.</p><div class="trust-mini rv"><span>Membership</span><img decoding="async" src="'+IMG+'home/qualityabroad/EAIE.png" alt="EAIE member" loading="lazy"><img decoding="async" src="'+IMG+'home/qualityabroad/NAFSA.png" alt="NAFSA member" loading="lazy"><span>Accreditation</span><img decoding="async" src="'+IMG+'germany/logos/icef-accredited-logo.png" alt="ICEF accredited agency" loading="lazy"></div></div></div></section>';
  var W=[['award','Success Record','Career Gyan has guided over 5,000 students toward successful admissions in top universities across the US, UK, Canada, Australia, and Europe.'],['users','Overseas Education Support','Individualised advice based on your academic background, finances, and goals.'],['globe','Global Network','Partnerships with 2,569+ universities, with access to programs, scholarships, and post-study options.'],['compass','Experienced Counsellors & Personalised Guidance','Personalised guidance from application to visa approval.'],['shield','Visa Assistance','Document checks, mock interviews, and visa preparation, with a 100% success rate in the latest intake.']];
  h+=sec(shead('Why Does Career Gyan Stand Out?','Hyderabad\'s trusted <span class="serif">study abroad partner</span>',true),'<div class="why2">'+W.map(function(x,i){return '<article class="w2'+(i===0?' dark':'')+(i===4?' gold':'')+' rv" style="--d:'+(i*.06)+'s">'+(i===0?'<img decoding="async" class="w2-bg" src="'+UNS('1606761568499-6d2451b23c66',1100)+'" alt="" loading="lazy"><div>':'')+'<span class="hf-ic">'+icon(x[0])+'</span><h3>'+x[1]+'</h3><p>'+x[2]+'</p>'+(i===0?'</div>':'')+'</article>'}).join('')+'</div>','bg-soft');
  var HC=['usa','uk','germany','australia','ireland','france','poland','sweden','netherlands','lithuania','romania','latvia','italy','new-zealand','hungary','canada','finland'];
  h+='<section class="section h-dest" style="background:#fff"><div class="container">'+shead('2569+ Partnered Universities Across the Globe','Explore by <span class="serif">Countries</span>',true)+'<div class="dgrid small">'+HC.map(function(k,i){return countryCard(k,i)}).join('')+'</div></div></section>';
  h+=stepsSec('Study abroad process');
  h+=sec(shead('Explore by Courses','Programs our Hyderabad team <span class="serif">guides you through</span>',true),'<div class="crs-grid">'+BLOCKS.crs()+'</div>');
  h+=sec(shead('Application & admission assistance','Every document, <span class="serif">done right</span>',true),BLOCKS.assist(),'bg-soft');
  var T=[['Aarav Sharma','Artificial Intelligence','Canada'],['Priya Verma','MBA','Australia'],['Riya Choudhary','Data Science & Analytics','USA'],['Ananya Rao','Psychology','UK'],['Devansh Patil','Mechanical','Germany']];
  h+=sec(shead('Student Stories','Find out what our <span class="serif">students say</span>',true),'<div class="tst">'+T.map(function(t,i){return '<div class="tcard rv" style="--d:'+(i*.07)+'s"><span class="tav">'+t[0].split(' ').map(function(w){return w[0]}).join('')+'</span><b>'+t[0]+'</b><span>'+t[1]+'</span><em>'+icon('globe')+t[2]+'</em></div>'}).join('')+'</div>');
  h+=sec(shead('Visit us','Contact <span class="serif">Information</span>',true),'<div class="contact-panel rv"><div class="info"><h3>Career Gyan Hyderabad</h3><div class="ci"><span class="ib">'+icon('pin')+'</span><div><small>Address</small><a href="'+o.m+'" target="_blank" rel="noopener">'+esc(o.a)+'</a></div></div><div class="ci"><span class="ib">'+icon('phone')+'</span><div><small>Phone</small><a href="tel:+919071663366">+91 90716 63366</a></div></div><div class="ci"><span class="ib">'+icon('mail')+'</span><div><small>Email</small><a href="mailto:hyderabad@careergyan.co">hyderabad@careergyan.co</a></div></div></div><div class="map"><iframe title="Career Gyan Hyderabad map" loading="lazy" referrerpolicy="no-referrer-when-downgrade" src="https://www.google.com/maps/embed?pb=!1m23!1m12!1m3!1d121807.3425550554!2d78.28452643857287!3d17.436751460155275!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m8!3e6!4m0!4m5!1s0x3bcb935f18a1b205%3A0xf2fca92b34102e0!2s2nd%20floor%2C%20Telecom%20Nagar%20Extension%2C%20Gachibowli%2C%20Hyderabad%2C%20Telangana%20500032!3m2!1d17.4367684!2d78.36692819999999!5e0!3m2!1sen!2sin!4v1749036736890!5m2!1sen!2sin"></iframe></div></div>','bg-soft');
  var F=[['Why choose Career Gyan in Hyderabad?','With 11+ years of experience, 2,569+ university partnerships and 5,000+ students guided to top universities, Career Gyan offers end-to-end support from counselling to visa.'],['When should I contact Career Gyan?','Ideally 8 to 12 months before your intended intake, so there is time for test preparation, shortlisting and applications.'],['Do you help with scholarships and education loans?','Yes. We help you find scholarships and arrange education loans, through our student loan guidance page.'],['Which countries can I apply to?','The USA, UK, Canada, Germany, Australia, Ireland, France, Poland, Sweden, the Netherlands, Lithuania, Romania, Latvia, Italy, New Zealand, Hungary, Finland and more.'],['Do you support visa processing?','Yes. We help with document checks, mock interviews and visa preparation.'],['Do you offer test preparation?','Yes, for IELTS, TOEFL, GRE, GMAT and PTE.'],['Do you provide pre-departure support?','Yes. We offer pre-departure and post-visa support so you settle in smoothly.']];
  h+=sec(shead('FAQ','Frequently Asked <span class="serif">Questions</span>',true),'<div class="faq">'+F.map(function(f){return '<details class="rv"><summary>'+f[0]+'<span class="pm"></span></summary><div class="ans">'+f[1]+'</div></details>'}).join('')+'</div>');
  h+=ctaWith(UNS('1787044050216-19d30c0aeaf5',1800));
  return h;
}
/* ===== NEW PAGES: Management / Medicine / Pharmacy / Science / Technology + Bahrain / Germany / Pune ===== */
var CDATA={
 management:{n:'Management',i:'mgmt',
  lead:'Build the leadership, analytical and people skills that global employers look for, with business programs from MBA to specialised Master\'s degrees.',
  h:'Lead with a <span class="serif">global mindset</span>',
  p:['Management programs abroad combine strong theory with case studies, teamwork and real industry exposure. You learn how international businesses really run, and you graduate with a network that spans countries.','Career Gyan helps you compare business schools, choose between an MBA and a specialised Master\'s, and prepare a profile that stands out, from GMAT and GRE guidance to your SOP and visa.'],
  ticks:['MBA and specialised Master\'s programs','Case-based, industry-linked teaching','International peer network','Support from shortlisting to visa'],
  specs:['MBA','Master in Management','Business Analytics','Finance','Marketing','International Business','Supply Chain & Logistics','Human Resource Management'],
  c:['usa','uk','canada','australia','ireland','germany','france','netherlands','sweden','italy','spain','new-zealand'],
  faq:[['Do I need work experience for an MBA abroad?','Many MBA programs prefer two or more years of work experience, while Master\'s in Management programs often accept recent graduates. Your counsellor will match programs to your profile.'],['Is GMAT or GRE compulsory?','It depends on the university and country. Some schools require a score, some waive it with work experience, and some do not ask for one. We confirm requirements for each shortlisted program.'],['Can I study management after a non-business degree?','Yes. Many programs welcome graduates from any discipline, although some ask for foundation modules or relevant experience.'],['When should I start applying?','Ideally 8 to 12 months before your intended intake, so there is time for tests, SOP, LORs and applications.']],
  cta:'1541339907198-e08756dedf3f'},
 medicine:{n:'Medicine',i:'med',
  lead:'Train in internationally recognised medical and health-science programs, with guidance on admissions, entrance tests, recognition rules and visas.',
  h:'A medical career with <span class="serif">global recognition</span>',
  p:['Studying medicine abroad opens access to modern teaching hospitals, clinical training and international exposure. Programs, fees, entrance requirements and language of instruction vary widely, so choosing the right university matters.','Career Gyan counsellors help you understand admission routes, entrance exams, licensing and recognition requirements, and build a shortlist that fits your academic profile and budget.'],
  ticks:['MBBS, dentistry and allied health programs','Clinical exposure in teaching hospitals','Guidance on entrance tests and recognition','End-to-end admission and visa support'],
  specs:['MBBS / Medicine','Dentistry','Nursing','Physiotherapy','Biomedical Science','Public Health','Clinical Research','Radiography'],
  c:['hungary','romania','poland','lithuania','latvia','italy','spain','germany','uk','ireland'],
  faq:[['Do Indian students need NEET to study MBBS abroad?','Indian students who plan to practise in India are generally required to qualify NEET. Rules are set by the National Medical Commission and can change, so your counsellor will confirm the current position.'],['Will my degree be recognised?','Recognition depends on the university, the country and the licensing rules where you want to practise. We help you check this before you apply.'],['Is the course taught in English?','Many universities offer English-taught medical programs, though you may be expected to learn the local language for clinical work.'],['Are entrance exams required?','Some countries and universities require tests such as IMAT, BMAT or UCAT, while others admit on academic merit and interview. We confirm requirements for each shortlisted program.']],
  cta:'1758270704763-22072a90d3b6'},
 pharmacy:{n:'Pharmacy',i:'pharm',
  lead:'Study pharmaceutical sciences at universities with modern laboratories, research links and strong career pathways in healthcare and industry.',
  h:'Shape the future of <span class="serif">healthcare</span>',
  p:['Pharmacy and pharmaceutical science programs abroad blend laboratory work, clinical understanding and research. Graduates can work in hospitals, drug development, regulatory affairs, quality and the wider life-sciences industry.','Career Gyan helps you compare programs, understand licensing and registration pathways, and prepare an application that highlights your academic strengths.'],
  ticks:['Bachelor\'s, Master\'s and research pathways','Modern labs and industry links','Careers in healthcare, pharma and regulation','Application, SOP and visa support'],
  specs:['Pharmaceutical Sciences','Clinical Pharmacy','Pharmacology','Pharmaceutical Technology','Regulatory Affairs','Pharmacovigilance','Drug Discovery','Pharmaceutical Management'],
  c:['usa','uk','canada','australia','ireland','germany','france','poland','hungary','sweden','netherlands','italy'],
  faq:[['Can I practise as a pharmacist after studying abroad?','Licensing is controlled by each country. Some programs lead directly to registration, while others are science-focused. Your counsellor will explain the route for your chosen country.'],['What is the difference between pharmacy and pharmaceutical sciences?','Pharmacy programs often focus on patient care and dispensing, while pharmaceutical sciences focus on drug development, research and industry roles.'],['Do I need a pharmacy degree to apply for a Master\'s?','Most Master\'s programs expect a related bachelor\'s degree, such as pharmacy or life sciences. Requirements vary by university.'],['When should I start applying?','Ideally 8 to 12 months before your intended intake.']],
  cta:'1531482615713-2afd69097998'},
 science:{n:'Science',i:'sci',
  lead:'From data science to biotechnology, study science at research-driven universities and turn curiosity into an international career.',
  h:'Where curiosity meets <span class="serif">opportunity</span>',
  p:['Science programs abroad emphasise practical lab work, research projects and interdisciplinary learning. Many universities offer strong research links, which helps if you plan to continue to a PhD or an industry career.','Career Gyan helps you find programs that match your interests, compare universities and prepare applications, from shortlisting to your visa.'],
  ticks:['Research-driven universities','Hands-on lab and project work','Pathways to PhD and industry careers','Support from shortlisting to visa'],
  specs:['Data Science','Biotechnology','Life Sciences','Chemistry','Physics','Mathematics & Statistics','Environmental Science','Neuroscience'],
  c:['usa','uk','canada','australia','ireland','germany','france','netherlands','sweden','finland','italy','new-zealand','poland','spain'],
  faq:[['Can I switch to a different science subject for my Master\'s?','Often yes, although some programs ask for prerequisite modules. Your counsellor will check each program\'s entry requirements.'],['Are research opportunities available for Master\'s students?','Many universities include a research project or thesis, and some offer research assistant roles. Availability varies by program.'],['Are there scholarships for science students?','Some universities and governments offer scholarships. We help you identify the ones you may be eligible for.'],['When should I start applying?','Ideally 8 to 12 months before your intended intake.']],
  cta:'1606761568499-6d2451b23c66'},
 technology:{n:'Technology',i:'tech',
  lead:'Study computing and emerging technologies at universities close to industry, and prepare for careers in AI, software, data and cybersecurity.',
  h:'Build the tech that <span class="serif">shapes tomorrow</span>',
  p:['Technology programs abroad combine strong fundamentals with projects, internships and exposure to the latest tools. Many cities with leading universities are also major technology hubs.','Career Gyan helps you choose between programs, compare universities and prepare strong applications, from your SOP and portfolio to your visa.'],
  ticks:['Programs in AI, data, software and security','Project-based, industry-linked learning','Access to global technology hubs','Application, SOP and visa support'],
  specs:['Computer Science','Artificial Intelligence & ML','Data Science','Cybersecurity','Software Engineering','Cloud Computing','Robotics','Internet of Things'],
  c:['usa','uk','canada','australia','ireland','germany','france','netherlands','sweden','finland','italy','new-zealand','poland','lithuania'],
  faq:[['Do I need a computer science background?','Many Master\'s programs expect a related bachelor\'s degree, but some welcome graduates from other fields with relevant skills or conversion courses.'],['Do universities abroad offer internships?','Many programs include internships or industry projects. Availability and work rules differ by country and university.'],['Is a portfolio or coding test required?','Some programs ask for projects, a portfolio or an online assessment. We confirm requirements for each shortlisted program.'],['When should I start applying?','Ideally 8 to 12 months before your intended intake.']],
  cta:'1758270704763-22072a90d3b6'}
};
var LDATA={
 bahrain:{n:'Bahrain',eb:'Career Gyan Bahrain',
  h1:'Best Abroad Education Consultants in <span class="serif">Bahrain</span>',
  lead:'Study abroad guidance for students and families in the Kingdom of Bahrain, from counselling and university selection to visa.',
  ah:'Your partner for <span class="serif">global education</span>',
  p:['Career Gyan Bahrain is our international office in Juffair, supporting students who want to study in Europe, the UK, North America, Australia and beyond. We combine the experience of a 11+ year consultancy with a local team you can meet in person.','We guide you through every step, from counselling and university shortlisting to applications and visa processing, and we host study abroad workshops and expos in Bahrain.'],
  alt:'Manama skyline, Bahrain',img:'bahrain',cta:'1541339907198-e08756dedf3f',
  stat:['2569+','Partner universities worldwide'],
  why:[['award','Experienced Consultancy','More than 11 years of experience guiding students to universities abroad.'],['users','Personalised Guidance','Individual advice based on your academic background, budget and goals.'],['globe','Global Network','Partnerships with 2,569+ universities and access to programs and scholarships.'],['compass','Local Team, Global Reach','A Bahrain office backed by Career Gyan offices in India and Germany.'],['shield','Visa Assistance','Document checks, mock interviews and visa preparation.']],
  grid:'all'},
 germany:{n:'Germany',eb:'Career Gyan Germany',
  h1:'Study Abroad Consultants in <span class="serif">Germany</span>',
  lead:'On-the-ground support from our Germany office for students planning to study in Germany and across Europe.',
  ah:'Close to your <span class="serif">study destination</span>',
  p:['Career Gyan Germany is our international office in Filderstadt, near Stuttgart. It puts our team close to the German and wider European education landscape, which helps us guide students with current, practical knowledge.','From counselling and university selection to applications and visa preparation, we support your journey with the same end-to-end approach that has helped students from our offices across India and Bahrain.'],
  alt:'Street in Germany',img:'germanyloc',cta:'1531482615713-2afd69097998',
  stat:['2569+','Partner universities worldwide'],
  why:[['award','Experienced Consultancy','More than 11 years of experience guiding students to universities abroad.'],['users','Personalised Guidance','Individual advice based on your academic background, budget and goals.'],['globe','European Network','Partnerships with 2,569+ universities, including options across Europe.'],['compass','Close to the Destination','A Germany office that keeps our team in touch with the local education scene.'],['shield','Visa Assistance','Document checks, mock interviews and visa preparation.']],
  grid:'europe',link:['germany','Study in Germany guide']},
 davanagere:{n:'Davanagere',eb:'Career Gyan Davanagere',
  h1:'Best Abroad Education Consultants in <span class="serif">Davanagere</span>',
  lead:'Expert guidance for students in Davanagere who want to study abroad, from counselling and applications to visa.',
  ah:'Your partner for <span class="serif">global education</span>',
  p:['Career Gyan Davanagere, at Bhari Plaza on Indoor Stadium Road, brings our 11+ years of experience and 2,569+ university partnerships to students and families in Davanagere and nearby towns.','We guide you through every step, from counselling and university shortlisting to application submission and visa processing, making your study abroad journey smooth, simple and successful.'],
  alt:'Career Gyan counselling team',img:'davanagere',cta:'1758270704763-22072a90d3b6',
  stat:['2569+','Partner universities worldwide'],
  why:[['award','Experienced Consultancy','More than 11 years of experience guiding students to universities abroad.'],['users','Personalised Guidance','Individual advice based on your academic background, budget and goals.'],['globe','Global Network','Partnerships with 2,569+ universities, with access to programs, scholarships and post-study options.'],['compass','Experienced Counsellors','Personalised guidance from application to visa approval.'],['shield','Visa Assistance','Document checks, mock interviews and visa preparation.']],
  grid:'all'},
 pune:{n:'Pune',eb:'Career Gyan Pune',
  h1:'Best Abroad Education Consultants in <span class="serif">Pune</span>',
  lead:'Expert guidance for students in Pune who want to study abroad, from counselling and applications to visa.',
  ah:'Your partner for <span class="serif">global education</span>',
  p:['Career Gyan Pune, in Chinchwad, brings our 11+ years of experience and 2,569+ university partnerships to students and families in Pune and nearby cities.','We guide you through every step, from counselling and university shortlisting to application submission and visa processing, making your study abroad journey smooth, simple and successful.'],
  alt:'Pune city',img:'pune',cta:'1758270704763-22072a90d3b6',
  stat:['2569+','Partner universities worldwide'],
  why:[['award','Experienced Consultancy','More than 11 years of experience guiding students to universities abroad.'],['users','Personalised Guidance','Individual advice based on your academic background, budget and goals.'],['globe','Global Network','Partnerships with 2,569+ universities, with access to programs, scholarships and post-study options.'],['compass','Experienced Counsellors','Personalised guidance from application to visa approval.'],['shield','Visa Assistance','Document checks, mock interviews and visa preparation.']],
  grid:'all'}
};
function coursePage(slug){
  var d=CDATA[slug];
  var h=heroHTML(UNS(BANNER[slug],2000),['Courses',d.n],'Courses · Study Abroad Programs','Study <span class="serif">'+d.n+'</span> Abroad',d.lead,glassRows(d.n+' at a glance',d.i,[[String(d.c.length),'Popular destinations'],['Bachelor\'s &amp; Master\'s','Course types'],['2569+','Partnered universities']]));
  h+='<section class="section"><div class="container h-why-grid"><div><span class="eyebrow rv">About the program</span><h2 class="h-h2 rv" style="--d:.06s">'+d.h+'</h2>'+d.p.map(function(t,i){return '<p class="h-p rv" style="--d:'+(.1+i*.04)+'s'+(i?';margin-top:12px':'')+'">'+t+'</p>'}).join('')+'<ul class="ticks rv" style="--d:.18s">'+d.ticks.map(function(t){return '<li>'+icon('check')+t+'</li>'}).join('')+'</ul><a class="btn btn-primary rv" href="contact.html" style="margin-top:30px">Shortlist with an expert '+icon('arrow')+'</a></div><div class="h-collage"><div class="hc-main rv-img"><img decoding="async" src="'+UNS(BANNER[slug],1100)+'" alt="Study '+d.n+' abroad" loading="lazy"></div><div class="hc-side"><div class="hc-gold rv" style="--d:.15s"><b>2569+</b><span>Partnered universities to choose from</span></div><div class="hc-small rv-img" style="--d:.25s"><img decoding="async" src="'+UNS('1573497620053-ea5300f94f21',800)+'" alt="Counselling session" loading="lazy"></div></div></div></div></section>';
  h+=sec(shead('Popular specialisations','What you can study in <span class="serif">'+d.n+'</span>',true),'<div class="pts">'+d.specs.map(function(p,i){return '<div class="pt rv" style="--d:'+((i%4)*.07)+'s"><span class="pt-n">0'+(i+1)+'</span><span class="pt-ic">'+icon(PICONS[i%8])+'</span><h3>'+p+'</h3></div>'}).join('')+'</div>','bg-soft');
  h+='<section class="section h-dest"><div class="container">'+shead('Countries','Where you can study <span class="serif">'+d.n+'</span>',true,'Popular destinations for '+d.n+' programs. Your counsellor will confirm availability for your chosen course.')+'<div class="dgrid small">'+d.c.map(function(k,i){return countryCard(k,i)}).join('')+'</div></div></section>';
  h+=stepsSec();
  h+=sec(shead('Application & admission assistance','We help you build a <span class="serif">winning application</span>',true),BLOCKS.assist());
  h+=sec(shead('FAQ','Studying '+d.n+' abroad: <span class="serif">common questions</span>',true),'<div class="faq">'+d.faq.map(function(f){return '<details class="rv"><summary>'+f[0]+'<span class="pm"></span></summary><div class="ans">'+f[1]+'</div></details>'}).join('')+'</div>','bg-soft');
  h+=sec(shead('Explore other courses','Find the right program for your <span class="serif">career</span>',true),'<div class="crs-grid six">'+COURSES.filter(function(c){return c.s!==slug}).map(function(c,i){return crsCard(c,i)}).join('')+'</div>');
  h+=ctaWith(UNS(d.cta,1800));
  return h;
}
function locationPage(slug){
  var d=LDATA[slug],o=OFFICES.filter(function(x){return x.loc===slug})[0];
  var tel=o.p[0].replace(/\s/g,'');
  var glass='<div class="glass rv" style="--d:.2s"><div class="glass-h"><span>Career Gyan '+d.n+'</span>'+icon('pin')+'</div><a class="glass-line" href="'+o.m+'" target="_blank" rel="noopener">'+icon('pin')+esc(o.a)+'</a>'+o.p.map(function(p){return '<a class="glass-line" href="tel:'+p.replace(/\s/g,'')+'">'+icon('phone')+p+'</a>'}).join('')+(o.e?'<a class="glass-line" href="mailto:'+o.e+'">'+icon('mail')+o.e+'</a>':'')+'<a class="btn btn-gold btn-sm" style="margin-top:18px;width:100%" href="'+o.m+'" target="_blank" rel="noopener">Get directions '+icon('arrow')+'</a></div>';
  var h=heroHTML(UNS(BANNER[d.img],2000),['Our Locations',d.n],d.eb,d.h1,d.lead,glass);
  h+=statsBand();
  h+='<section class="section h-why"><div class="container h-why-grid"><div class="h-collage"><div class="hc-main rv-img"><img decoding="async" src="'+UNS(BANNER[d.img],1100)+'" alt="'+d.alt+'" loading="lazy"></div><div class="hc-side"><div class="hc-gold rv" style="--d:.15s"><b>'+d.stat[0]+'</b><span>'+d.stat[1]+'</span></div><div class="hc-small rv-img" style="--d:.25s"><img decoding="async" src="'+UNS('1573497620053-ea5300f94f21',800)+'" alt="Counselling session" loading="lazy"></div></div></div><div><span class="eyebrow rv">'+d.eb+'</span><h2 class="h-h2 rv" style="--d:.06s">'+d.ah+'</h2>'+d.p.map(function(t,i){return '<p class="h-p rv" style="--d:'+(.1+i*.04)+'s'+(i?';margin-top:12px':'')+'">'+t+'</p>'}).join('')+'<div class="trust-mini rv"><span>Membership</span><img decoding="async" src="'+IMG+'home/qualityabroad/EAIE.png" alt="EAIE member" loading="lazy"><img decoding="async" src="'+IMG+'home/qualityabroad/NAFSA.png" alt="NAFSA member" loading="lazy"><span>Accreditation</span><img decoding="async" src="'+IMG+'germany/logos/icef-accredited-logo.png" alt="ICEF accredited agency" loading="lazy"></div>'+(d.link?'<a class="btn btn-primary rv" href="study-in-'+d.link[0]+'.html" style="margin-top:26px">'+d.link[1]+' '+icon('arrow')+'</a>':'')+'</div></div></section>';
  h+=sec(shead('Why Does Career Gyan Stand Out?',d.n+'\'s trusted <span class="serif">study abroad partner</span>',true),'<div class="why2">'+d.why.map(function(x,i){return '<article class="w2'+(i===0?' dark':'')+(i===4?' gold':'')+' rv" style="--d:'+(i*.06)+'s">'+(i===0?'<img decoding="async" class="w2-bg" src="'+UNS('1606761568499-6d2451b23c66',1100)+'" alt="" loading="lazy"><div>':'')+'<span class="hf-ic">'+icon(x[0])+'</span><h3>'+x[1]+'</h3><p>'+x[2]+'</p>'+(i===0?'</div>':'')+'</article>'}).join('')+'</div>','bg-soft');
  var EU=['germany','france','netherlands','italy','spain','sweden','poland','hungary','finland','lithuania','latvia','romania','ireland','uk'];
  var list=d.grid==='europe'?EU:DD_ORDER;
  h+='<section class="section h-dest" style="background:#fff"><div class="container">'+shead('2569+ Partnered Universities Across the Globe','Explore by <span class="serif">Countries</span>',true)+'<div class="dgrid small">'+list.map(function(k,i){return countryCard(k,i)}).join('')+'</div></div></section>';
  h+=stepsSec('Study abroad process');
  h+=sec(shead('Explore by Courses','Programs our '+d.n+' team <span class="serif">guides you through</span>',true),'<div class="crs-grid six">'+COURSES.map(function(c,i){return crsCard(c,i)}).join('')+'</div>');
  h+=sec(shead('Application & admission assistance','Every document, <span class="serif">done right</span>',true),BLOCKS.assist(),'bg-soft');
  h+=sec(shead('Visit us','Contact <span class="serif">Information</span>',true),'<div class="contact-panel rv"><div class="info"><h3>Career Gyan '+d.n+'</h3><div class="ci"><span class="ib">'+icon('pin')+'</span><div><small>Address</small><a href="'+o.m+'" target="_blank" rel="noopener">'+esc(o.a)+'</a></div></div><div class="ci"><span class="ib">'+icon('phone')+'</span><div><small>Phone</small>'+o.p.map(function(p){return '<a href="tel:'+p.replace(/\s/g,'')+'">'+p+'</a>'}).join('<br>')+'</div></div>'+(o.e?'<div class="ci"><span class="ib">'+icon('mail')+'</span><div><small>Email</small><a href="mailto:'+o.e+'">'+o.e+'</a></div></div>':'')+'</div><div class="map"><iframe title="Career Gyan '+d.n+' map" loading="lazy" referrerpolicy="no-referrer-when-downgrade" src="https://www.google.com/maps?q='+encodeURIComponent(o.a)+'&output=embed"></iframe></div></div>','bg-soft');
  var F=[['When should I contact Career Gyan?','Ideally 8 to 12 months before your intended intake, so there is time for test preparation, shortlisting and applications.'],['Which countries can I apply to?','The USA, UK, Canada, Germany, Australia, Ireland, France, Poland, Sweden, the Netherlands, Lithuania, Romania, Latvia, Italy, New Zealand, Hungary, Finland and more.'],['Do you help with scholarships and education loans?','Yes. We help you find scholarships and arrange education loans, through our student loan guidance page.'],['Do you support visa processing?','Yes. We help with document checks, mock interviews and visa preparation.'],['Do you offer test preparation?','Yes, for IELTS, TOEFL, GRE, GMAT and PTE.'],['Do you provide pre-departure support?','Yes. We offer pre-departure and post-visa support so you settle in smoothly.']];
  h+=sec(shead('FAQ','Frequently Asked <span class="serif">Questions</span>',true),'<div class="faq">'+F.map(function(f){return '<details class="rv"><summary>'+f[0]+'<span class="pm"></span></summary><div class="ans">'+f[1]+'</div></details>'}).join('')+'</div>');
  h+=ctaWith(UNS(d.cta,1800));
  return h;
}
/* tabs */
document.addEventListener('click',function(e){var b=e.target.closest('[data-tab]');if(!b)return;var t=b.closest('.tabs');$$('[data-tab]',t).forEach(function(x){x.classList.toggle('active',x===b)});$$('.tab-panel',t).forEach(function(p){p.classList.toggle('active',p.getAttribute('data-panel')===b.getAttribute('data-tab'))})});
/* banner parallax */
var pxT=0;window.addEventListener('scroll',function(){if(pxT)return;pxT=requestAnimationFrame(function(){pxT=0;var y=window.pageYOffset;if(y>900)return;$$('.page.active .ihero .bg').forEach(function(el){el.style.translate='0 '+(y*0.28)+'px'})})},{passive:true});

/* ===== ELIGIBILITY CHECKER PAGE (content from eligibility.careergyan.co) ===== */
var EL_B='https://eligibility.careergyan.co/wp-content/uploads/';
var EL_A={},EL_H=[],EL_CUR=null,EL_DONE=false,EL_REVIEWED=false;
var EL_YN=['Yes','No'],EL_EX=['IELTS','TOEFL','Duolingo','PTE'],EL_BUD=['10 Lacs to 20 Lacs','21 Lacs to 30 Lacs','31 Lacs to 40 Lacs','41 Lacs to 50 Lacs','51 Lacs to 65 Lacs','65 Lacs+'],EL_PCT=['Less than 50%','51% to 60%','61 to 70%','71% & Above'],EL_PSV=['1 Year','2 Years','3 Years'];
var EL_MI={R:'2023/07/hand-drawn-glossary-illustration_52683-111962-1.webp',W:'2023/07/girl-taking-exam_1308-16049.webp',L:'2023/07/speaking-listening-one-man-holds-hand-his-ear-other-says-bubble-information-hearing-whisper_1284-44516.webp',S:'2023/07/interview-concept-illustration_114360-1501.webp',O:'2023/07/bachelor-12th-pursuing.png'};
function elSteps(){
  var ok=function(a){return a.explore!=='No'&&a.degree!=='P.hd'},
  B=function(a){return ok(a)&&a.degree==="Bachelor's"},
  M=function(a){return ok(a)&&a.degree==="Master's"},
  g1=function(a){return M(a)&&(a.mArea==='MS (STEM)'||a.mArea==='MS - Management')},
  g2=function(a){return M(a)&&(a.mArea==='MBA'||a.mArea==='MIM or Master’s')},
  tw=function(a){return a.current==='12 th Standard'},
  dip=function(a){return B(a)&&(a.current==='Diploma'||a.stream==='Diploma')},
  S=function(id,q,type,img,o){o=o||{};o.id=id;o.q=q;o.type=type;o.img=img;return o};
  var L=[];
  L.push(S('name','Enter Your Name*','text','2023/08/3-1-12.webp'));
  L.push(S('email','Enter your mail ID*','email','2023/08/3-1-121.webp'));
  L.push(S('phone','Enter your Phone Number*','tel','2023/08/3-1-121e.webp'));
  L.push(S('ref','Use Referral code for Discount (Optional)','text','2023/08/3-1-11.webp',{opt:1}));
  L.push(S('city','Select your city or Select your city of counselling*','one','2023/08/3-1-1a.png',{o:['Bangalore','Mangalore','Davanagere','Belgaum','Hyderabad','Others']}));
  L.push(S('explore','Do you wish to explore opportunities abroad?*','one','2023/07/Abroad-yes.png',{o:EL_YN}));
  L.push(S('degree','The degree you wish to pursue?*','one','2023/07/interview-concept-illustration_114360-15012mm.webp',{o:["Bachelor's","Master's",'P.hd'],w:function(a){return a.explore!=='No'}}));
  /* Bachelor's */
  L.push(S('age','What is your age?*','one','2023/05/5-1.png',{o:['Less than 23','> 23'],w:B}));
  L.push(S('current','What are you currently pursuing?*','one','2023/08/3-1-1224.webp',{o:['12 th Standard','Diploma'],w:B}));
  L.push(S('std12','Have you completed or are you currently pursuing Std 12?*','one','2023/08/3-1-1224.webp',{o:['Completed','Pursuing'],w:function(a){return B(a)&&tw(a)}}));
  L.push(S('std12d','Completing Month & Year ? *','month','2023/07/page2.png',{w:function(a){return B(a)&&tw(a)}}));
  L.push(S('eng','Enter the marks you scored on the English paper*','num','2023/05/5-1.png',{w:function(a){return B(a)&&tw(a)}}));
  L.push(S('board','Select the board you are studying or have completed*','one','2023/07/bachelor-12th-pursuing-engineering.png',{o:['State Board','CBSE','ICSE','IGCSE','IB','Others'],w:function(a){return B(a)&&tw(a)}}));
  L.push(S('p12','Tick your 12th std score percentage*','one','2023/07/bachelor-12th-pursuing-engineering-exam.png',{o:EL_PCT,w:function(a){return B(a)&&tw(a)}}));
  L.push(S('stream','Tick the stream you aspire to foresee a career in*','one','2023/07/bachelor-12th-pursuing.png',{o:['Science & Mathematics','Arts','Commerce','Diploma'],w:function(a){return B(a)&&tw(a)}}));
  var sm=function(a){return B(a)&&tw(a)&&a.stream==='Science & Mathematics'};
  L.push(S('dsel','Which Degree you want to Study?*','one','2023/07/interview-concept-illustration_114360-1501m.webp',{o:['Engineering','Science'],w:sm}));
  L.push(S('artsd','Tick the degree you aspire for with Arts as your forte*','one','2023/05/2-3.png',{o:['BA','LAW','Others'],w:function(a){return B(a)&&tw(a)&&a.stream==='Arts'}}));
  L.push(S('comm','Dive in further to your area of interest in the Commerce Stream*','one','2023/07/money-income-attraction_74855-6573.webp',{o:['Marketing','Banking','Finance','Travel & Tourism','HR','Business Administration','Statistics','Business Management','Others'],w:function(a){return B(a)&&tw(a)&&a.stream==='Commerce'}}));
  L.push(S('branch','Pre-Planning for Branch Option*','one','2023/07/bachelor-12th-pursuing-engineering-visa.png',{o:['MECH','CSE','ECE','EEE','IT','Chemical Engineering','Textiles Engineering','Bio Medical Engineering','Bio Technology','Others'],w:function(a){return sm(a)&&a.dsel==='Engineering'}}));
  L.push(S('scid','Tick the degree you aspire for with science and Mathematics as your forte*','one','2023/07/money-income-attraction_74855-65731.webp',{o:['CS','Physics','Maths','Chemistry','Biology','Zology','Electronics','Others'],w:function(a){return sm(a)&&a.dsel==='Science'}}));
  L.push(S('artsb','Select your Branch *','one','2023/07/bachelor-12th-pursuing-engineering.png',{o:['English','Journalism','Economics','Psychology','Sociology','Religious Studies','History','Archaeology','Others'],w:function(a){return B(a)&&tw(a)&&a.stream==='Arts'&&a.artsd==='BA'}}));
  L.push(S('dst','Are you Pursuing Diploma or Completed? *','one','2023/07/diploma.png',{o:['Completed','Pursuing'],w:dip}));
  L.push(S('dd','Completing Month & Year (Diploma)*','month','2023/07/bachelor-12th-pursuing-engineering-exam.png',{w:dip}));
  L.push(S('db','Which Branch your studied in Diploma?*','one','2023/07/diploma-post-study-visa.png',{o:['Diploma CSE','Diploma MECH','Diploma ECE','Diploma EEE'],w:dip}));
  L.push(S('ds','Enter your Percentage (or) CGPA Score*','text','2023/07/diploma-branch-score.png',{w:dip}));
  L.push(S('hint','A hint of guidance before ticking the box*','multi','2023/07/interview-concept-illustration_114360-1501n.webp',{o:['USA','UK','CANADA','GERMANY','FRANCE','ITALY','IRLAND','AUS','HUNGARY','Latvia','Lithuania','Estonia','Slovakia','UAE','Others'],w:B}));
  L.push(S('bex','Have you written any Exam?*','one','2023/05/4-2-1.png',{o:EL_YN,w:B}));
  L.push(S('bexw','Which exam you written?*','one','2023/07/bachelor-12th-pursuing-engineering-exam.png',{o:EL_EX,w:function(a){return B(a)&&a.bex==='Yes'}}));
  var bw=function(a){return B(a)&&a.bex==='Yes'},bq=['What are your marks in Reading?*','What are your Marks in Writing?*','What are your Marks in Listening?*','What are your marks in Speaking?*','What is your Overall Marks?*'];
  ['R','W','L','S','O'].forEach(function(k,i){L.push(S('b'+k,bq[i],'num',EL_MI[k],{w:bw}))});
  L.push(S('breg','Have you registered for any exams?*','one','2023/05/5-1.png',{o:EL_YN,w:function(a){return B(a)&&a.bex==='No'}}));
  L.push(S('bregw','For Which Exam have you registered?*','one','2023/07/bachelor-12th-pursuing-engineering.png',{o:['IELTS','TOEFL','Dulingo','PTE'],w:function(a){return B(a)&&a.bex==='No'&&a.breg==='Yes'}}));
  L.push(S('bregd','When the Exam is?*','date','2023/07/page2.png',{w:function(a){return B(a)&&a.bex==='No'&&a.breg==='Yes'}}));
  L.push(S('bbud','What is your Budget?*','one','2023/07/finance-department-employees-are-calculating-expenses-company-s-business_1150-41782.webp',{o:EL_BUD,w:B}));
  L.push(S('bpsv','Post Study Visa*','one','2023/08/3-1-121eb.webp',{o:EL_PSV,w:B}));
  /* Master's */
  L.push(S('myrs','The number of years you wish to dedicate to a master’s degree?*','one','2023/05/6-1.png',{o:['1 year','2 years'],w:M}));
  L.push(S('mArea','Your Area of Interest for Masters*','one','2023/07/money-income-attraction_74855-65731-1.webp',{o:['MS (STEM)','MS - Management','MBA','MIM or Master’s'],w:M}));
  L.push(S('mex','Which exam have you taken for Master’s?*','one','2023/07/masters-interest-exam.png',{o:EL_EX.concat(['No Exam?']),w:g1}));
  var m1=function(a){return g1(a)&&a.mex&&a.mex!=='No Exam?'},mq=['What are your marks in Reading?*','What are your marks in Writing?*','What are your marks in Listening?*','What are your marks in Speaking?*','What are your Overall marks?*'];
  ['R','W','L','S','O'].forEach(function(k,i){L.push(S('m1'+k,mq[i],'num',EL_MI[k],{w:m1}))});
  L.push(S('mex2','Have you written any Exam?','one','2023/07/diploma-branch-score.png',{o:EL_EX.concat(['No Exam?']),w:g2,opt:1}));
  var m2=function(a){return g2(a)&&a.mex2&&a.mex2!=='No Exam?'},m2q=['What are your marks in Reading?**','What are your Marks in Writing?**','What are your Marks in Listening?**','What are your marks in Speaking?**','What are your Overall Marks?**'];
  ['R','W','L','S','O'].forEach(function(k,i){L.push(S('m2'+k,m2q[i],'num',EL_MI[k],{w:m2}))});
  L.push(S('gre','Have you written GRE/GMAT Exam?*','one','2023/07/bachelor-12th-pursuing-engineering-exam-1.png',{o:['No','Yes'],w:M}));
  L.push(S('work','Do you have Work Experience?*','one','2023/07/interview-concept-illustration_114360-15011l.webp',{o:EL_YN,w:M}));
  L.push(S('workd','Years of experience and Job description*','area','2023/07/page2.png',{w:function(a){return M(a)&&a.work==='Yes'}}));
  L.push(S('bys','Completion Years for Bachelor’s Degree course?*','one','2023/07/money-income-attraction_74855-657311.webp',{o:['3 years','4 years','5 years'],w:M}));
  L.push(S('d3','The degree obtained from 3 years of Bachelor’s course *','one','2023/07/money-income-attraction_74855-65731-1.webp',{o:['BBA','BBM','B.Com','Bachelor’s of Honours','BA','B Sc','Others'],w:function(a){return M(a)&&a.bys==='3 years'}}));
  L.push(S('d4','The Degree obtained from 4 years of bachelor’s course*','one','2023/07/bachelor-1.png',{o:['BE','B-Tech','NEP','Others'],w:function(a){return M(a)&&a.bys==='4 years'}}));
  L.push(S('d5','The Degree you earned from 5 years of bachelor’s course*','one','2023/07/money-income-attraction_74855-657311-1.webp',{o:['B Architecture','BA - LLB','Others'],w:function(a){return M(a)&&a.bys==='5 years'}}));
  var mc=['USA','UK','ITALY','FRANCE','AUS','LATVIA','HUNGARY','LITHUANIA','ESTONIA','SLOVAKIA','UAE','GERMANY','Others'];
  L.push(S('mc3','Which Country Do you want to Study? (Select any three )*','multi','2023/07/interview-concept-illustration_114360-1501n.webp',{o:mc,max:3,w:function(a){return M(a)&&(a.mArea==='MBA'||a.mArea==='MIM or Master’s')}}));
  L.push(S('mc1','The country where you wish to pursue your master’s from? *','one','2023/07/interview-concept-illustration_114360-1501n.webp',{o:['USA','UK','FRANCE','AUS','Others'],w:function(a){return M(a)&&a.mArea==='MS - Management'}}));
  L.push(S('mc2','The country where you wish to pursue your master’s from? (Select any three )*','multi','2023/07/interview-concept-illustration_114360-1501n.webp',{o:['USA','UK','EUROPE','AUS','Others'],max:3,w:function(a){return M(a)&&a.mArea==='MS (STEM)'}}));
  L.push(S('back','Backlogs if any?*','one','2023/07/masters-backlogs.png',{o:['<5','<8','<10','10+','Zero Backlogs'],w:M}));
  L.push(S('vstamp','Do you have Visa Rejection Stamp?*','one','2023/07/masters-post-visa-years-1.png',{o:EL_YN,w:M}));
  L.push(S('vref','Do you have a Visa refusal?*','one','2023/07/bachelor-12th-pursuing-details.png',{o:EL_YN,w:M}));
  L.push(S('mpsv','Do you wish to opt for a post-study visa?\nSelect the number of years for Post study visa\n*','one','2023/08/3-1-121eb.webp',{o:['1 year','2 years','3 years'],w:M}));
  L.push(S('mpct','Select your degree percentage marks*','one','2023/07/diploma-branch-score-1.png',{o:EL_PCT,w:M}));
  L.push(S('mbud','Select your budget for the completion of a master’s degree*','one','2023/07/masters-engineering-budget.png',{o:EL_BUD,w:M}));
  L.push(S('gap','Do you have any education gap?*','one','2023/05/9-1.png',{o:EL_YN,w:M}));
  var gp=function(a){return M(a)&&a.gap==='Yes'};
  L.push(S('gapy','Constructive Years of the Gap in Education','one','2023/07/girl-taking-exam_1308-16049.webp',{o:['< 5 year','6 to 10 years','10 years +'],w:gp,opt:1}));
  L.push(S('gapr','Reason for the Education Gap*','one','2023/07/interview-concept-illustration_114360-15011m.webp',{o:['Job','Internship','Health Issues','Others'],w:gp}));
  L.push(S('gapj','Years of experience and Job description*','area','2023/07/interview-concept-illustration_114360-1501.webp',{w:function(a){return gp(a)&&a.gapr==='Job'}}));
  L.push(S('gapi','Internship Company name and the role in the company (Job description)*','area','2023/05/3-1.png',{w:function(a){return gp(a)&&a.gapr==='Internship'}}));
  L.push(S('gaph','What type of Health Issue?*','area','2023/07/interview-concept-illustration_114360-15011mgfds.webp',{w:function(a){return gp(a)&&a.gapr==='Health Issues'}}));
  L.push(S('sp','If you are married, would you like to be accompanied by your spouse to study further?\n*','one','2023/07/masters-with-spouse-country.png',{o:EL_YN,w:M}));
  L.push(S('spc','Select the Country Choice*','one','2023/07/interview-concept-illustration_114360-15011m12.webp',{o:['USA','UK','AUS','FRANCE','Others'],w:function(a){return M(a)&&a.sp==='Yes'}}));
  return L;
}
var EL_S=null;
function elVis(){return EL_S.filter(function(s){return !s.w||s.w(EL_A)})}
function elStep(id){return EL_S.filter(function(s){return s.id===id})[0]}
function elEnd(){EL_DONE='review';elRender()}
function elRender(){
  var body=$('#elBody'),foot=$('#elFoot'),bar=$('#elBar'),cnt=$('#elCount');
  if(EL_DONE==='review'){EL_REVIEWED=true;elReview(body,foot,bar,cnt);return}
  if(EL_DONE){
    bar.style.width='100%';cnt.textContent='Completed';
    var vis=elVis(),rows=vis.filter(function(s){var v=EL_A[s.id];return v&&(!Array.isArray(v)||v.length)}).map(function(s){var v=EL_A[s.id];return [s.q.replace(/\s*\*+\s*$/,'').replace(/\n/g,' '),Array.isArray(v)?v.join(', '):v]});
    var txt='Career Gyan – Eligibility profile\n'+rows.map(function(r){return r[0]+': '+r[1]}).join('\n');
    var nm=EL_A.name?esc(EL_A.name):'there';
    body.className='el-body noimg';
    body.innerHTML='<div class="el-res"><span class="ok">'+icon('check')+'</span><h3>Thank you, '+nm+'!</h3><p>'+(EL_SAVED?'Your details have been sent to Career Gyan. A counsellor will contact you with personalised guidance.':'Your details are ready. Send your profile to Career Gyan, or call us to get your eligibility result and personalised guidance.')+'</p>'+elResultHTML()+'<div class="el-sum">'+rows.map(function(r){return '<div><span>'+esc(r[0])+'</span><b>'+esc(r[1])+'</b></div>'}).join('')+'</div><div class="acts"><a class="btn btn-primary" href="mailto:enquiry@careergyan.co?subject='+encodeURIComponent('Eligibility check – '+(EL_A.name||''))+'&body='+encodeURIComponent(txt)+'">Email my profile '+icon('arrow')+'</a><a class="btn btn-gold" target="_blank" rel="noopener" href="https://api.whatsapp.com/send?phone=919686898888&text='+encodeURIComponent(txt)+'">Send on WhatsApp '+icon('arrow')+'</a><a class="btn btn-outline-blue" href="tel:+919686898888">'+icon('phone')+' +91 9686898888</a></div></div>';
    foot.innerHTML='<button class="el-link" id="elBack2">← Edit answers</button><span class="sp"></span><button class="el-link" id="elRestart2">Restart</button>';
    $('#elBack2').onclick=function(){EL_DONE='review';elRender()};
    $('#elRestart2').onclick=elRestart;
    return;
  }
  var s=elStep(EL_CUR),vis=elVis(),idx=vis.indexOf(s);
  bar.style.width=Math.max(4,Math.round(idx/vis.length*100))+'%';
  cnt.textContent='Question '+(idx+1)+' of '+vis.length;
  body.className='el-body'+(s.img?'':' noimg');
  var cur=EL_A[s.id],inp='';
  if(s.type==='one'||s.type==='multi'){
    var multi=s.type==='multi';
    inp='<div class="el-opts" role="'+(multi?'group':'radiogroup')+'">'+s.o.map(function(o){var on=multi?(cur||[]).indexOf(o)>-1:cur===o;return '<button type="button" class="el-opt'+(multi?' multi':'')+(on?' on':'')+'" data-v="'+esc(o)+'" aria-pressed="'+on+'"><span class="bx">'+icon('check')+'</span>'+esc(o)+'</button>'}).join('')+'</div>'+(multi&&s.max?'<p class="el-hint">Select up to '+s.max+'</p>':'');
  }else if(s.type==='area'){inp='<textarea class="el-in" id="elIn" rows="4">'+esc(cur||'')+'</textarea>'}
  else{var t={text:'text',email:'email',tel:'tel',num:'number',month:'month',date:'date'}[s.type]||'text';inp='<input class="el-in" id="elIn" type="'+t+'"'+(t==='number'?' step="any" min="0" inputmode="decimal"':'')+(t==='tel'?' inputmode="tel"':'')+' value="'+esc(cur||'')+'" autocomplete="off">'}
  body.innerHTML=(s.img?'<div class="el-img"><img decoding="async" src="'+EL_B+s.img+'" alt="" onerror="var b=this.closest(\'.el-body\');if(b){b.classList.add(\'noimg\');this.parentNode.remove()}"></div>':'')+'<div class="el-q"><h3>'+esc(s.q)+'</h3>'+inp+'<p class="el-err" id="elErr" role="alert"></p></div>';
  foot.innerHTML='<button class="el-link" id="elClear">Clear selection</button><button class="el-link" id="elRestart">Restart</button>'+(EL_REVIEWED?'<button class="el-link" id="elToReview">Back to review</button>':'')+'<span class="sp"></span><button class="btn btn-outline-blue btn-sm" id="elBack"'+(EL_H.length?'':' disabled')+'>← Previous</button><button class="btn btn-primary btn-sm" id="elNext">'+(idx===vis.length-1?'Review answers':'Next')+' '+icon('arrow')+'</button>';
  $('#elBack').onclick=elBack;$('#elRestart').onclick=elRestart;$('#elNext').onclick=function(){elNext()};
  $('#elClear').onclick=function(){delete EL_A[s.id];elRender()};
  $$('.el-opt',body).forEach(function(b){b.onclick=function(){
    var v=b.getAttribute('data-v');
    if(s.type==='multi'){var arr=(EL_A[s.id]||[]).slice(),i=arr.indexOf(v);if(i>-1)arr.splice(i,1);else{if(s.max&&arr.length>=s.max){$('#elErr').textContent='You can select up to '+s.max+' options.';return}arr.push(v)}EL_A[s.id]=arr;elRender()}
    else{EL_A[s.id]=v;$('#elErr').textContent='';$$('.el-opt',body).forEach(function(x){var on=x===b;x.classList.toggle('on',on);x.setAttribute('aria-pressed',on)})}
  }});
  var ie=$('#elIn');if(ie){ie.addEventListener('keydown',function(e){if(e.key==='Enter'&&s.type!=='area'){e.preventDefault();elNext()}});if(window.innerWidth>900&&s.id!=='name')ie.focus({preventScroll:true})}
}
function elNext(){
  var s=elStep(EL_CUR),err=$('#elErr'),ie=$('#elIn');
  if(ie){EL_A[s.id]=ie.value.trim()}
  var v=EL_A[s.id],empty=!v||(Array.isArray(v)&&!v.length);
  if(empty&&!s.opt){err.textContent=(s.type==='one'||s.type==='multi')?'Please select an option to continue.':'This field is required.';if(ie)ie.focus();return}
  if(!empty){
    if(s.type==='email'&&!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v)){err.textContent='Please enter a valid email address.';return}
    if(s.type==='tel'&&v.replace(/\D/g,'').length<10){err.textContent='Please enter a valid phone number.';return}
  }
  var vis=elVis(),i=vis.indexOf(s);
  if(i<vis.length-1){EL_H.push(EL_CUR);EL_CUR=vis[i+1].id;elRender();elScroll()}else{EL_H.push(EL_CUR);elEnd();elScroll()}
}
function elBack(){if(!EL_H.length)return;EL_CUR=EL_H.pop();elRender()}
function elRestart(){EL_A={};EL_H=[];EL_DONE=false;EL_REVIEWED=false;EL_SAVED=null;EL_CUR=elVis()[0].id;elRender()}
function elScroll(){var t=$('#chat1');if(t){var r=t.getBoundingClientRect();if(r.top<0||r.top>window.innerHeight*.5)window.scrollTo({top:r.top+window.pageYOffset-90,behavior:'smooth'})}}
function elVideo(id){var m=$('#elModal');$('#elVid').innerHTML='<iframe src="https://www.youtube.com/embed/'+id+'?autoplay=1&rel=0" title="Career Gyan video" allow="autoplay; encrypted-media; picture-in-picture" allowfullscreen></iframe>';m.classList.add('open')}
function elCloseVideo(){$('#elModal').classList.remove('open');$('#elVid').innerHTML=''}
function initEligibility(){
  if(!$('#eligibilityPage'))return; /* MPA page guard */
  EL_S=elSteps();EL_CUR=EL_S[0].id;
  var U=EL_B;
  var h='<div class="ihero"><img decoding="async" class="bg" src="'+UNS('1759784839707-a32c910a7747',2000)+'"'+HSET(UNS('1759784839707-a32c910a7747',2000))+' alt="Study abroad eligibility checker" fetchpriority="high"><div class="container ihero-grid"><div><nav class="crumbs rv"><a href="index.html">Home</a>'+icon('right')+'<span>Eligibility Checker</span></nav><h1 class="rv" style="--d:.06s">Study abroad eligibility at your fingertips</h1><p class="h-lead rv" style="--d:.12s">Online AI Based Abroad Education Eligibility Checker assesses your eligibility for studying abroad based on your education and Personal preferences.</p><div class="h-actions rv" style="--d:.18s"><a class="btn btn-gold" href="#chat1" data-scroll>Check Your Eligibility Now '+icon('arrow')+'</a></div></div><div class="glass rv" style="--d:.2s"><div class="glass-h"><span>Career Gyan</span>'+icon('phone')+'</div><a class="glass-line" href="tel:+919686898888">'+icon('phone')+'+91 9686898888</a></div></div></div>';
  h+='<div class="container h-stats-wrap"><div class="el-feats">'+[['Countries-Icon-3.png','Countries','Explore the best-fit country for pursuing your abroad education dreams'],['Colleges-Icon-2.png','Colleges','Explore the ideal institution<br>that is well suited for your educational goals'],['Courses-Icon-3.png','Courses','Explore the ideal program tailored to your specific field of interest and professional goals.']].map(function(f,i){return '<div class="el-feat rv" style="--d:'+(i*.08)+'s"><div class="ei"><img decoding="async" src="'+U+'2023/05/'+f[0]+'" alt="'+f[1]+'" loading="lazy"></div><h3>'+f[1]+'</h3><p>'+f[2]+'</p></div>'}).join('')+'</div></div>';
  h+='<section class="section"><div class="container"><div class="sec-head center"><h2 class="h-h2 rv">Discover the advanced online eligibility checker for a comprehensive assessment of your study abroad potential</h2><p class="lead rv" style="--d:.1s">Give yourself a chance. Explore your world of Opportunities.</p><p class="lead rv" style="--d:.14s;margin-top:8px">Undergo your profile evaluation and get the right career guidance for your further studies.</p></div><div class="el-card rv" id="chat1"><div class="el-top"><div class="el-bar"><i id="elBar"></i></div><span class="el-count" id="elCount"></span></div><div class="el-body" id="elBody"></div><div class="el-foot" id="elFoot"></div></div></div></section>';
  h+='<section class="section bg-soft"><div class="container el-how"><div><span class="eyebrow rv">Process</span><h2 class="h-h2 rv" style="--d:.06s">How it Works</h2><p class="lead rv" style="--d:.1s;margin-top:14px">The AI eligibility checker assesses education, residence, study country, level, field, and preferred programs to determine study abroad eligibility</p><div class="el-steps">'+[['AI Checker','Visit Career Gyan AI Checker'],['Data Feed','Give all the Information Asked'],['Get Your result','Get all your Result Instant']].map(function(s,i){return '<div class="el-st rv" style="--d:'+(.12+i*.07)+'s"><span class="n">'+(i+1)+'</span><div><h3>'+s[0]+'</h3><p>'+s[1]+'</p></div></div>'}).join('')+'</div></div><button class="el-vid rv" type="button" data-yt="PbY8SHFqqNw" aria-label="Play video"><img decoding="async" src="'+U+'2021/10/work1.jpg" alt="" loading="lazy" onerror="this.src=\'https://img.youtube.com/vi/PbY8SHFqqNw/hqdefault.jpg\'"><span class="pl">'+icon('play')+'</span></button></div></section>';
  h+='<section class="section"><div class="container"><div class="el-tst rv"><img decoding="async" class="bg" src="'+U+'2023/05/Career-Gyan-Banner-4.webp" alt="" loading="lazy" onerror="this.style.display=\'none\'"><div class="el-tst-grid"><div><span class="eyebrow gold">Testimonials</span><h2>How Are Our Client\'s Thanks Us About Our Services</h2><p>This should be used to tell a story and let your users know a little more<br>about your product or service. How can you benefit them?</p><div class="el-stats"><div><b data-count="97.7%">97.7%</b></div><div><b data-count="100+">100+</b><span>Countries</span></div><div><b data-count="10000+">10000+</b><span>Users</span></div></div></div><button class="el-vid" type="button" data-yt="1iIZeIy7TqM" aria-label="Play video" style="aspect-ratio:16/11"><img decoding="async" src="'+U+'2023/05/Career-Gyan-Banner-3.webp" alt="" loading="lazy"><span class="pl">'+icon('play')+'</span></button></div></div></div></section>';
  h+='<section class="section" style="padding-top:0"><div class="container"><div class="el-about"><span class="eyebrow both rv">About</span><h2 class="h-h2 rv" style="--d:.06s">About the Career Gyan Eligibility Checker</h2><h3 class="rv" style="--d:.1s">Still have doubts about studying abroad?</h3><p class="rv" style="--d:.14s">Click the link below to receive personalized guidance from our experts. Let us help you navigate the exciting world of international education and make your dreams a reality. Get the support you need today</p><div class="rv" style="--d:.18s;margin-top:28px"><a class="btn btn-primary" href="tel:9686898888">Have a Question? Get Free guidance . '+icon('arrow')+'</a></div></div></div></section>';
  $('#eligibilityPage').innerHTML=h;
  var md=document.createElement('div');md.className='el-modal';md.id='elModal';md.innerHTML='<div class="el-modal-in"><button class="x" type="button" aria-label="Close">×</button><div id="elVid" style="width:100%;height:100%"></div></div>';document.body.appendChild(md);
  md.addEventListener('click',function(e){if(e.target===md||e.target.classList.contains('x'))elCloseVideo()});
  document.addEventListener('keydown',function(e){if(e.key==='Escape')elCloseVideo()});
  $('#eligibilityPage').addEventListener('click',function(e){var b=e.target.closest('[data-yt]');if(b)elVideo(b.getAttribute('data-yt'))});
  elRender();
}

/* =====================================================================
   ADDITIONS
   ===================================================================== */
/* --- settings you can edit later --- */
var WA_CHANNEL_URL='https://whatsapp.com/channel/REPLACE_WITH_YOUR_CHANNEL_ID'; // <- paste your WhatsApp channel link here
var SHOW_PAST_EVENT_POPUP=true; // true: if no upcoming event exists, popup shows the most recent one. false: popup only for upcoming events
// Real downloadable files. Leave empty to use the auto-generated dummy PDF.
// Example: var DOWNLOADS={uk:{admission:'files/uk-admission-checklist.pdf',visa:'files/uk-visa-checklist.pdf'}};
var DOWNLOADS={};

/* ---------- footer: office dropdown + dedicated location pages ---------- */
var OFF_PAGE={bangalore:['abroad-education-consultants-in-bangalore.html','Career Gyan Bangalore'],hyderabad:['abroad-education-consultants-in-hyderabad.html','Career Gyan Hyderabad'],pune:['abroad-education-consultants-in-pune.html','Career Gyan Pune'],davanagere:['abroad-education-consultants-in-davanagere.html','Career Gyan Davanagere'],germany:['study-abroad-consultants-in-germany.html','Career Gyan Germany']};
function initOffDD(){
  var root=$('#f-offices');if(!root)return;
  var chips=Object.keys(OFF_PAGE).map(function(k){return '<a href="'+OFF_PAGE[k][0]+'">'+icon('link')+OFF_PAGE[k][1]+'</a>'}).join('');
  root.innerHTML='<div class="offdd-card"><div class="offdd-office-list" role="group" aria-label="All Career Gyan office locations">'+VOFFICES.map(function(o,i){return '<button type="button" data-i="'+i+'" aria-pressed="'+(i===0?'true':'false')+'">'+esc(o.n)+'</button>'}).join('')+'</div><div class="offdd-cur" aria-live="polite"></div><div class="offdd-body"></div></div><div class="offdd-side"><h5>Dedicated location pages</h5><div class="offdd-chips">'+chips+'</div></div>';
  var list=$('.offdd-office-list',root),cur=$('.offdd-cur',root),body=$('.offdd-body',root);
  function show(i){
    var o=VOFFICES[i],pg=OFF_PAGE[o.loc];
    cur.textContent=o.n;
    body.innerHTML='<a class="r" href="'+o.m+'" target="_blank" rel="noopener">'+icon('pin')+'<span>'+esc(o.a)+'</span></a>'+
      '<div class="r">'+icon('phone')+'<span>'+o.p.map(function(p){return '<a href="tel:'+p.replace(/\s/g,'')+'">'+p+'</a>'}).join(', ')+'</span></div>'+
      (o.e?'<div class="r">'+icon('mail')+'<span><a href="mailto:'+o.e+'">'+o.e+'</a></span></div>':'')+
      (pg?'<a class="r" href="'+pg[0]+'">'+icon('link')+'<span>'+pg[1]+'</span></a>':'');
    $$('button',list).forEach(function(b){var active=+b.getAttribute('data-i')===i;b.classList.toggle('on',active);b.setAttribute('aria-pressed',active?'true':'false')});
  }
  list.addEventListener('click',function(e){var b=e.target.closest('button');if(!b)return;show(+b.getAttribute('data-i'))});
  show(0);
}

/* ---------- FAQ helpers ---------- */
function faqHTML(list){return '<div class="faq">'+list.map(function(f){return '<details class="rv"><summary>'+f[0]+'<span class="pm"></span></summary><div class="ans">'+f[1]+'</div></details>'}).join('')+'</div>'}
function trimTxt(t,n){t=String(t);if(t.length<=n)return t;var c=t.slice(0,n),i=Math.max(c.lastIndexOf('. '),c.lastIndexOf('; '));return i>40?c.slice(0,i+1):c.replace(/\s+\S*$/,'')+'…'}
function faqList(a){return '<ul class="faq-ul">'+a.map(function(x){return '<li>'+x+'</li>'}).join('')+'</ul>'}
function countryFAQs(k){
  var d=CPAGE[k],n=d.name,f=d.full,Q=[];
  Q.push(['Why should Indian students choose '+f+' for higher education?',d.why.slice(0,2).join(' ')]);
  if(d.elig&&d.elig.length)Q.push(['What are the eligibility requirements to study in '+n+'?',faqList(d.elig.slice(0,4).map(function(e){return '<b>'+e[0]+':</b> '+trimTxt(e[1],230)}))+'<p>Requirements differ by university and course, so your counsellor will confirm the exact criteria for your shortlist.</p>']);
  if(d.costs&&d.costs.length)Q.push(['How much does it cost to study in '+n+'?',faqList(d.costs.slice(0,4).map(function(r){return '<b>'+r[0]+':</b> '+r[1]}))+'<p>* Approximate figures. Actual costs vary by university and city and are subject to change.</p>']);
  if(d.visa&&d.visa.length)Q.push(['What is required for the '+n+' student visa?',faqList(d.visa)+'<p>Visa rules and fees change, so we confirm the latest requirements with you before you apply.</p>']);
  if(d.docs&&d.docs.length)Q.push(['Which documents do I need for university admission in '+n+'?',d.docs.join(', ')+'. You can also download our checklist in the section above.']);
  if(d.hourly&&d.hourly.length)Q.push(['What part-time jobs can students do in '+n+'?','Common student jobs and indicative pay: '+d.hourly.slice(0,5).map(function(x){return x[0]+' ('+x[1]+')'}).join(', ')+'. Work rights depend on your visa, so check the limits with your counsellor.']);
  if(d.unis&&d.unis.length)Q.push(['Which universities can I apply to in '+n+'?','Our partners include '+d.unis.slice(0,8).join(', ')+' and more. We shortlist universities based on your profile, budget and course.']);
  Q.push(['How can Career Gyan help me study in '+n+'?','We support you end to end: counselling, university shortlisting, SOP, LOR and LOM (Letter of Motivation) support, application submission, visa preparation, education loans and pre-departure guidance. <a href="contact.html">Book a free counselling session</a> to get started.']);
  return Q;
}

/* ---------- country page: document + visa checklists (50 / 50) ---------- */
function dlName(k,t){var c=CPAGE[k].name.replace(/\s+/g,'-');return 'CareerGyan-'+c+(t==='admission'?'-University-Admission-Checklist.pdf':'-Student-Visa-Checklist.pdf')}
function dlSection(k,d){
  var n=d.name;
  function card(t,title,desc,ic,dark){
    return '<div class="dlc'+(dark?' dark':'')+' rv"><span class="hf-ic">'+icon(ic)+'</span><h3>'+title+'</h3><p>'+desc+'</p>'+
      '<button class="dl-file" type="button" data-dl="'+k+'|'+t+'"><span class="dl-pdf">PDF</span><span class="dl-meta"><b>'+dlName(k,t)+'</b><small>'+(t==='admission'?d.docs.length:d.visa.length)+' items · Click to download</small></span><span class="dl-go">'+icon('download')+'</span></button></div>';
  }
  return sec(shead('Checklists','Your '+n+' <span class="serif">checklists</span>',true,'Download a checklist for each stage and tick items off as you collect them.'),
    '<div class="dl-split">'+
    card('admission','University admission checklist','The documents commonly needed to apply to universities in '+n+', from transcripts and test scores to your SOP and recommendation letters.','mail',false)+
    card('visa','Student visa checklist','What you will typically need for the '+n+' student visa, from your passport and offer letter to proof of funds.','shield',true)+
    '</div>','');
}
/* tiny PDF writer (used for the dummy checklist files) */
function makePDF(title,sub,items,foot){
  var map={'£':0xA3,'€':0x80,'–':0x96,'—':0x97,'’':0x92,'‘':0x91,'“':0x93,'”':0x94,'•':0x95,'·':0xB7,'…':0x85,'é':0xE9,'ä':0xE4,'ö':0xF6,'ü':0xFC,'ß':0xDF,'å':0xE5};
  function enc(t){var o='';for(var i=0;i<t.length;i++){var c=t.charAt(i),code=t.charCodeAt(i);if(c==='₹'){o+='Rs.';continue}if(map[c]!=null)code=map[c];else if(code>255||code<32)code=63;var ch=String.fromCharCode(code);o+=(ch==='\\'||ch==='('||ch===')')?'\\'+ch:ch}return o}
  function wrap(t,n){var w=String(t).split(' '),l='',o=[];w.forEach(function(x){if((l+' '+x).trim().length>n){o.push(l);l=x}else l=(l+' '+x).trim()});if(l)o.push(l);return o}
  var pages=[],cs=[];
  function head(){cs=['0.043 0.122 0.294 rg 0 752 595 90 re f','0.949 0.663 0.231 rg 0 748 595 4 re f','BT /F2 20 Tf 1 1 1 rg 50 805 Td ('+enc(title)+') Tj ET','BT /F1 11 Tf 0.78 0.84 0.96 rg 50 782 Td ('+enc(sub)+') Tj ET'];return 715}
  function foot_(){cs.push('BT /F1 8.5 Tf 0.4 0.45 0.55 rg 50 30 Td ('+enc(foot)+') Tj ET');pages.push(cs.join('\n'))}
  var y=head();
  items.forEach(function(it,i){
    var ls=wrap((i+1)+'.  '+it,78);
    if(y-ls.length*15<60){foot_();y=head()}
    cs.push('0.1 0.2 0.5 RG 0.8 w 50 '+(y-9)+' 11 11 re S');
    ls.forEach(function(l,j){cs.push('BT /F1 12 Tf 0.1 0.13 0.25 rg 72 '+(y-j*15-7)+' Td ('+enc(l)+') Tj ET')});
    y-=ls.length*15+9;
  });
  foot_();
  var objs=[],np=pages.length;
  objs[1]='<< /Type /Catalog /Pages 2 0 R >>';
  objs[2]='<< /Type /Pages /Kids ['+pages.map(function(_,i){return (5+2*i)+' 0 R'}).join(' ')+'] /Count '+np+' >>';
  objs[3]='<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica /Encoding /WinAnsiEncoding >>';
  objs[4]='<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold /Encoding /WinAnsiEncoding >>';
  pages.forEach(function(p,i){
    objs[5+2*i]='<< /Type /Page /Parent 2 0 R /MediaBox [0 0 595 842] /Resources << /Font << /F1 3 0 R /F2 4 0 R >> >> /Contents '+(6+2*i)+' 0 R >>';
    objs[6+2*i]='<< /Length '+p.length+' >>\nstream\n'+p+'\nendstream';
  });
  var out='%PDF-1.4\n',off=[];
  for(var i=1;i<objs.length;i++){off[i]=out.length;out+=i+' 0 obj\n'+objs[i]+'\nendobj\n'}
  var x=out.length;
  out+='xref\n0 '+objs.length+'\n0000000000 65535 f \n';
  for(i=1;i<objs.length;i++)out+=('0000000000'+off[i]).slice(-10)+' 00000 n \n';
  out+='trailer\n<< /Size '+objs.length+' /Root 1 0 R >>\nstartxref\n'+x+'\n%%EOF';
  var u=new Uint8Array(out.length);for(i=0;i<out.length;i++)u[i]=out.charCodeAt(i)&255;
  return u;
}
document.addEventListener('click',function(e){
  var b=e.target.closest('[data-dl]');if(!b)return;
  var p=b.getAttribute('data-dl').split('|'),k=p[0],t=p[1],d=CPAGE[k],name=dlName(k,t),real=DOWNLOADS[k]&&DOWNLOADS[k][t];
  var a=document.createElement('a');a.download=name;
  if(real){a.href=real}
  else{
    var items=t==='admission'?d.docs:d.visa;
    var pdf=makePDF(d.name+' '+(t==='admission'?'University Admission Checklist':'Student Visa Checklist'),'Career Gyan · Study abroad consultants',items,'Sample checklist based on the Career Gyan '+d.name+' guide. Your counsellor will confirm the latest requirements.');
    a.href=URL.createObjectURL(new Blob([pdf],{type:'application/pdf'}));
    setTimeout(function(){URL.revokeObjectURL(a.href)},5000);
  }
  document.body.appendChild(a);a.click();a.remove();
});

/* ---------- contact page FAQs ---------- */
function initContactFAQ(){
  var host=$('#contact-faq .container');if(!host)return;
  var F=[
    ['Where are your offices located?','We have offices in Bangalore (CBD, Jayanagar and North), Hyderabad, Pune, Davanagere and Germany. Find the address, phone and email for each one in the list above, or in the footer.'],
    ['How can I book a free counselling session?','Fill in the enquiry form on this page, or call us on <a href="tel:+919606868888">+91 96068 68888</a>. You can also walk in to any of our offices.'],
    ['What services do Career Gyan offer for students planning to study abroad?','End-to-end support, including university selection, application and admission assistance, SOP, LOR and LOM (Letter of Motivation) writing, visa guidance, education loans, travel planning and forex services.'],
    ['How does Career Gyan help with visa applications?','Our team offers expert assistance with visa documentation, application processes and interview preparation, so you can handle the visa process smoothly and confidently.'],
    ['Do you offer support for standardized test preparation?','Yes. We provide coaching and resources for IELTS, TOEFL, Duolingo, PTE and GRE, including mock tests, personalised feedback and tips to help you reach your target scores.'],
    ['Can Career Gyan help with scholarships and financial aid?','Yes. We help students identify and apply for scholarships and financial aid, and guide you in presenting a strong application. See our <a href="student-loan.html">Student Loan</a> page for funding support.']
  ];
  host.innerHTML='<div class="sec-head center"><span class="eyebrow both rv">FAQs</span><h2 class="h-h2 rv" style="--d:.06s">Frequently asked <span class="serif">questions</span></h2></div>'+faqHTML(F);
}

/* ---------- WhatsApp channel button ---------- */
function initWAChannel(){var b=$('#waChannelBtn');if(b)b.setAttribute('href',WA_CHANNEL_URL)}

/* ---------- next-event registration popup ---------- */
function evDate(e){var p=e.d.split(', ')[1];return new Date(p)}
function pickPopupEvent(){
  var t=new Date();t.setHours(0,0,0,0);
  var up=EVENTS.filter(function(e){return evDate(e)>=t}).sort(function(a,b){return evDate(a)-evDate(b)});
  if(up.length)return {e:up[0],upcoming:true};
  if(!SHOW_PAST_EVENT_POPUP||!EVENTS.length)return null;
  var latest=EVENTS.slice().sort(function(a,b){return evDate(b)-evDate(a)})[0];
  return {e:latest,upcoming:false};
}
function initEventPopup(){
  var pick=pickPopupEvent();if(!pick)return;
  try{if(sessionStorage.getItem('cgEvPopStudyEurope2027')==='1')return}catch(x){}
  var e=pick.e,src=eventImage(e),eventUrl=eventLink(e);
  var pop=document.createElement('div');pop.className='evpop';pop.setAttribute('role','dialog');pop.setAttribute('aria-modal','true');pop.setAttribute('aria-label','Event registration');
  pop.innerHTML='<div class="evpop-card"><button class="evpop-x" type="button" aria-label="Close">'+icon('close')+'</button>'+
    '<div class="evpop-img"><span class="bgblur" style="background-image:url(\''+src+'\')"></span><img decoding="async" src="'+src+'" alt="'+esc(e.t)+'"></div>'+
    '<div class="evpop-b"><span class="evpop-tag">'+(pick.upcoming?'Next event · Register now':'Our latest event')+'</span><h3>'+esc(e.t)+'</h3>'+
    '<div class="evpop-meta"><span>'+icon('cal')+e.d+'</span><span>'+icon('clock')+e.tm+'</span><span>'+icon('pin')+esc(e.l)+'</span></div>'+
    '<div class="evpop-act"><a class="btn btn-gold" href="'+eventUrl+'">'+(e.page?'Register for this workshop':(pick.upcoming?'Register now':'Enquire about upcoming events'))+' '+icon('arrow')+'</a><a class="btn btn-ghost" href="workshops.html">All workshops &amp; events</a></div></div></div>';
  document.body.appendChild(pop);
  function close(){pop.classList.remove('show');try{sessionStorage.setItem('cgEvPopStudyEurope2027','1')}catch(x){}setTimeout(function(){pop.remove()},300);document.removeEventListener('keydown',key)}
  function key(ev){if(ev.key==='Escape')close()}
  pop.addEventListener('click',function(ev){
    if(ev.target===pop||ev.target.closest('.evpop-x')){close();return}
    var r=ev.target.closest('a');if(r){var m=$('#c-msg');if(m&&r.hasAttribute('data-reg'))m.value=(pick.upcoming?'I would like to register for: ':'I am interested in your upcoming events. Latest event seen: ')+e.t;close()}
  });
  document.addEventListener('keydown',key);
  var h=document.body.getAttribute('data-route')||'';
  if(h===''||h==='home'){setTimeout(function(){pop.classList.add('show');$('.evpop-x',pop).focus()},1400)}
  else{pop.remove()}
}



/* =====================================================================
   ADDED (2026-11-11): Supabase saving for the enquiry forms + eligibility
   checker (review step, Next/Previous on every question, budget results)
   ===================================================================== */
/* --- Supabase: same project as the workshop registration page --- */
var CG_SUPABASE_URL='https://veovdcqtyrbakyednkvr.supabase.co';
var CG_SUPABASE_KEY='sb_publishable_RvXX8tPrW-Dpq1JzXo_1Yg_eE36VuDR';
function cgInsert(table,row){
  return fetch(CG_SUPABASE_URL+'/rest/v1/'+table,{method:'POST',headers:{'Content-Type':'application/json','apikey':CG_SUPABASE_KEY,'Prefer':'return=minimal'},body:JSON.stringify(row)})
    .then(function(r){if(!r.ok)return r.text().then(function(t){throw new Error('Supabase '+r.status+': '+t)});return true});
}
/* enquiry forms (home "Book a free counselling session" + contact page): save to table "enquiries".
   If saving fails, fall back to the original behaviour (open the visitor's email app). */
function cgSendEnquiry(form,note,mailto){
  var v=function(n){var f=form.querySelector('[name="'+n+'"]');return f&&f.value.trim()?f.value.trim():null};
  var row={source:form.id==='homeForm'?'home':'contact',full_name:v('Full Name'),email:v('Email ID'),phone:v('Phone Number'),city:v('Current City'),
    destination:v('Preferred Study Destination'),course:v('Course'),intake_month:v('Planned Month'),intake_year:v('Preferred Year'),message:v('Message'),page_url:location.href.slice(0,500)};
  var btn=form.querySelector('[type="submit"]');if(btn)btn.disabled=true;
  note.textContent='Sending your enquiry…';note.classList.add('show');
  cgInsert('enquiries',row).then(function(){
    form.reset();
    note.innerHTML='Thank you! Your enquiry has been received. A Career Gyan counsellor will contact you shortly. You can also call <a href="tel:+919606868888">+91 96068 68888</a>.';
  }).catch(function(err){
    try{console.warn(err)}catch(x){}
    window.location.href=mailto;
    note.innerHTML='Thank you! Your email app has opened with your enquiry addressed to <b>enquiry@careergyan.co</b> — just press send. You can also call <a href="tel:+919606868888">+91 96068 68888</a>.';
  }).then(function(){if(btn)btn.disabled=false});
}

/* --- Eligibility: budget -> countries shown on the result screen ---
   EDIT THIS LIST to match your counselling policy. Each budget shows its own countries plus all cheaper tiers.
   Keys are the site's country pages (study-in-<key>.html); 'estonia' / 'slovakia' have no page and show as plain chips. */
var EL_BUDGET_TIERS=[
  ['10 Lacs to 20 Lacs',['germany','france','italy','poland','hungary','latvia','lithuania','romania','estonia','slovakia']],
  ['21 Lacs to 30 Lacs',['spain','finland','sweden','netherlands','ireland']],
  ['31 Lacs to 40 Lacs',['new-zealand','canada','uk']],
  ['41 Lacs to 50 Lacs',['australia']],
  ['51 Lacs to 65 Lacs',['usa']],
  ['65 Lacs+',[]]
];
/* Shown when the student answers "No" to "Do you wish to explore opportunities abroad?" (text from the original checker). */
var EL_NO_ABROAD_MSG='We Are Also Specialized In Exploring New Opportunities To Study Abroad. Continue With The Option, Yes To Mentor You With Ample Countries To Study Abroad.';
var EL_CONTACTS=[['Bangalore','+91 9686898888'],['Davanagere','+91 9964757666'],['Mangalore','']]; /* TODO: add the Mangalore number */
var EL_EXTRA={estonia:['Estonia','ee'],slovakia:['Slovakia','sk']};
var EL_PICK_MAP={usa:'usa',uk:'uk',canada:'canada',germany:'germany',france:'france',italy:'italy',irland:'ireland',ireland:'ireland',aus:'australia',hungary:'hungary',latvia:'latvia',lithuania:'lithuania',estonia:'estonia',slovakia:'slovakia'};
var EL_SAVED=null;
function elBudgetCountries(b){var out=[];for(var i=0;i<EL_BUDGET_TIERS.length;i++){out=out.concat(EL_BUDGET_TIERS[i][1]);if(EL_BUDGET_TIERS[i][0]===b)return out}return []}
function elPicks(){var a=[].concat(EL_A.hint||[],EL_A.mc3||[],EL_A.mc2||[],EL_A.mc1?[EL_A.mc1]:[]);return a.map(function(x){return EL_PICK_MAP[String(x).toLowerCase()]}).filter(function(x,i,arr){return x&&arr.indexOf(x)===i})}
function elCountryChip(k,pick){
  var ex=EL_EXTRA[k],name=ex?ex[0]:cname(k),code=ex?ex[1]:iso(k);
  var inner='<img decoding="async" src="https://flagcdn.com/w80/'+code+'.png" alt="" style="width:22px;height:22px;border-radius:50%;object-fit:cover">'+name+(pick?' <span class="el-pick">Your pick</span>':'');
  return ex?'<span class="el-chip'+(pick?' pref':'')+'">'+inner+'</span>':'<a class="'+(pick?'pref':'')+'" href="study-in-'+k+'.html">'+inner+'</a>';
}
function elContactsHTML(){return '<div class="el-contacts"><h4>You can Contact us:</h4>'+EL_CONTACTS.filter(function(c){return c[1]}).map(function(c){return '<p><b>'+c[0]+':</b> <a href="tel:'+c[1].replace(/\s/g,'')+'">'+c[1]+'</a></p>'}).join('')+'<p><b>Email :</b> <a href="mailto:enquiry@careergyan.co">enquiry@careergyan.co</a></p></div>'}
function elResultHTML(){
  if(EL_A.explore==='No'||!EL_A.degree||EL_A.degree==='P.hd')return '<div class="el-out"><p class="el-msg">'+esc(EL_NO_ABROAD_MSG)+'</p>'+elContactsHTML()+'</div>';
  var b=EL_A.bbud||EL_A.mbud;if(!b)return '';
  var list=elBudgetCountries(b),picks=elPicks(),over=picks.filter(function(k){return list.indexOf(k)<0});
  list=picks.filter(function(k){return list.indexOf(k)>-1}).concat(list.filter(function(k){return picks.indexOf(k)<0}));
  return '<div class="el-out"><span class="eyebrow both">Your result</span><h4>Countries you can study in with a budget of '+esc(b)+'</h4>'+
    '<div class="other-courses el-cty">'+list.map(function(k){return elCountryChip(k,picks.indexOf(k)>-1)}).join('')+'</div>'+
    (over.length?'<p class="el-note">Above this budget: '+over.map(function(k){return EL_EXTRA[k]?EL_EXTRA[k][0]:cname(k)}).join(', ')+'. Talk to us about scholarships and education loans.</p>':'')+
    '<p class="el-note">* Indicative, based on typical total cost (tuition + living). Your counsellor will confirm options for your profile and course.</p></div>';
}
function elMissing(){var vis=elVis();for(var i=0;i<vis.length;i++){var s=vis[i],v=EL_A[s.id];if(!s.opt&&(!v||(Array.isArray(v)&&!v.length)))return s}return null}
function elGoTo(id){var ids=elVis().map(function(x){return x.id});EL_H=ids.slice(0,Math.max(0,ids.indexOf(id)));EL_CUR=id;EL_DONE=false;elRender();elScroll()}
function elReview(body,foot,bar,cnt){
  bar.style.width='100%';cnt.textContent='Review your answers';body.className='el-body noimg';
  body.innerHTML='<div class="el-res el-rev"><h3>Check your answers</h3><p>Review your details below. Use “Edit” to change any answer, then submit.</p><div class="el-sum">'+
    elVis().map(function(s){var v=EL_A[s.id],t=(v&&(!Array.isArray(v)||v.length))?(Array.isArray(v)?v.join(', '):v):'—';return '<div><span>'+esc(s.q.replace(/\s*\*+\s*$/,'').replace(/\n/g,' '))+'</span><b>'+esc(t)+'</b><button type="button" class="el-link el-edit" data-id="'+s.id+'">Edit</button></div>'}).join('')+
    '</div><p class="el-err" id="elErr" role="alert"></p></div>';
  foot.innerHTML='<button class="el-link" id="elRestart">Restart</button><span class="sp"></span><button class="btn btn-outline-blue btn-sm" id="elBack">← Previous</button><button class="btn btn-primary btn-sm" id="elSubmit">Submit '+icon('arrow')+'</button>';
  $('#elRestart').onclick=elRestart;
  $('#elBack').onclick=function(){EL_DONE=false;if(EL_H.length&&EL_H[EL_H.length-1]===EL_CUR)EL_H.pop();elRender()};
  $$('.el-edit',body).forEach(function(b){b.onclick=function(){elGoTo(b.getAttribute('data-id'))}});
  $('#elSubmit').onclick=function(){
    var miss=elMissing();if(miss){elGoTo(miss.id);$('#elErr').textContent='Please answer this question to continue.';return}
    var btn=this;btn.disabled=true;btn.textContent='Submitting…';
    var vis=elVis(),answers={};vis.forEach(function(s){var v=EL_A[s.id];if(v&&(!Array.isArray(v)||v.length))answers[s.q.replace(/\s*\*+\s*$/,'').replace(/\n/g,' ')]=v});
    var b=EL_A.bbud||EL_A.mbud||null;
    cgInsert('eligibility_submissions',{full_name:EL_A.name||null,email:EL_A.email||null,phone:EL_A.phone||null,referral_code:EL_A.ref||null,city:EL_A.city||null,
      explore_abroad:EL_A.explore||null,degree:EL_A.degree||null,budget:b,preferred_countries:elPicks(),suggested_countries:b?elBudgetCountries(b):[],answers:answers,page_url:location.href.slice(0,500)})
      .then(function(){EL_SAVED=true}).catch(function(e){EL_SAVED=false;try{console.warn(e)}catch(x){}})
      .then(function(){EL_DONE=true;elRender();elScroll()});
  };
}
/* "Back to review" shortcut while editing an answer */
document.addEventListener('click',function(e){
  if(!e.target.closest('#elToReview'))return;
  var s=elStep(EL_CUR),ie=$('#elIn');if(ie)EL_A[s.id]=ie.value.trim();
  EL_DONE='review';elRender();elScroll();
});

/* --- performance + image SEO helpers (2026-11-11) --- */
/* Responsive sizes for Unsplash hero/CTA photos: phones download a smaller file, desktop is unchanged. */
function HSET(u,cta){if(!/images\.unsplash\.com\/.*[?&]w=\d+/.test(u))return '';var w=+u.match(/[?&]w=(\d+)/)[1];var s=[800,1400].filter(function(x){return x<w}).map(function(x){return u.replace(/([?&]w=)\d+/,'$1'+x)+' '+x+'w'}).concat([u+' '+w+'w']).join(', ');return ' srcset="'+s+'" sizes="'+(cta?'(max-width:1240px) 100vw, 1200px':'100vw')+'"'}
/* Descriptive alt text for partner logos (was the file name). */
var PARTNER_ALT={summit:'Summit – Career Gyan partner',ielts:'IELTS – English test partner',roombae:'Roombae – student accommodation partner',ets:'ETS (TOEFL & GRE) – test partner','buy-exchange':'BuyExchange – forex partner',universities_living:'Universities Living – student housing partner',Coracle:'Coracle – test preparation partner',Expatrio:'Expatrio – blocked account partner',Fintiba:'Fintiba – blocked account partner',Avanse:'Avanse – education loan partner'};
function PALT(p){var k=p.split('.')[0];return PARTNER_ALT[k]||k.replace(/_|-/g,' ')}
/* Pause decorative CSS animations (glows, spinning rings, marquees, floating cards) while their section is off-screen. */
(function(){if(!('IntersectionObserver' in window))return;var o=new IntersectionObserver(function(es){es.forEach(function(e){e.target.classList.toggle('cg-off',!e.isIntersecting)})},{rootMargin:'250px 0px'});
  function watch(){$$('.hx-sec,.h-hero,.ihero,.section,.footer,.hx-partners,.h-partners').forEach(function(el){if(!el.__cgw){el.__cgw=1;o.observe(el)}})}
  setTimeout(watch,0);window.addEventListener('load',watch);})();

build();initHome();initMenus();initForms();initEligibility();initOffDD();initContactFAQ();initWAChannel();initEventPopup();
try{if('scrollRestoration' in history)history.scrollRestoration='manual'}catch(e){}
window.addEventListener('load',function(){window.scrollTo(0,0)},{once:true});
window.addEventListener('pageshow',function(){window.scrollTo(0,0)});
route();
})();

/* ---- second script block of the original file ---- */
(function(){
  var PAGE='workshops/workshop-registration.html';
  function check(){if(location.hash.replace(/^#\/?/,'').replace(/\/$/,'').toLowerCase()==='workshop/event')location.replace(PAGE)}
  window.addEventListener('hashchange',check);
  document.addEventListener('click',function(e){var l=e.target.closest&&e.target.closest('a[href="#workshop-registration"]');if(!l)return;e.preventDefault();location.href=PAGE});
  check();
})();

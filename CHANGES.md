# JavaScript changes vs. the original single-page file

`assets/js/main.js` is the original two `<script>` blocks, in the same order, character for character, except for the routing edits below. All 104 named functions are present and their bodies are unchanged apart from the lines in the diff.

## Why each edit was needed

- Link builder: course hash route -> page file
- Bangalore location link -> clean URL
- Location link builder -> page file (live slug)
- Dropdown active-key for courses no longer derivable from the href
- Dropdown active-key for locations no longer derivable from the href
- Finder form: navigate to page instead of setting hash
- Country links -> page file
- Country link -> page file
- Home links -> page file
- Hash link #/contact -> clean URL
- Hash link #/eligibility -> clean URL
- Hash link #/all-countries -> clean URL
- Hash link #/student-loan -> clean URL
- Hash link #/workshop -> clean URL
- Footer location chips -> clean URLs
- Router: route comes from <body data-route> (set per page) instead of the URL hash
- Router: stop overwriting <title> (each page now has its own SEO title)
- Router: register the new 404 page
- Active nav: add aria-current="page" next to the existing .active class
- Hash routing listener removed (each page is its own file; an in-page #anchor must not re-run the router)
- Event popup: "is this the home page" now read from data-route
- Guard: home events block only on home
- Guard: events-page block only on /events
- Guard: arts block only on /course/arts
- Guard: Bangalore branches only on Bangalore page
- Guard: office list only on /contact
- Guard: datalist only on /contact
- Guard: finder form only on home
- Guard: contact form wiring only on /contact
- Guard: initHome only on home
- Guard: initEligibility only on /eligibility
- Workshop registration moved to /workshops/workshop-registration
- Eligibility: finishing the questions opens a review screen first
- Eligibility: review screen
- Eligibility: result screen shows the budget-based country list
- Eligibility: result screen links back to the review
- Eligibility: Previous + Next buttons on every question
- Eligibility: choosing an option no longer jumps to the next question
- Eligibility: restart also clears review state
- Eligibility: review state
- Home form: save to Supabase (falls back to the original email app if saving fails)
- Contact form: save to Supabase (falls back to the original email app if saving fails)
- Hero image: keyword alt, responsive sizes, load first
- Hero image: keyword alt
- Country card photo: keyword alt
- Carousel photo: keyword alt
- Lazy-load below-the-fold flags
- Lazy-load service icons
- Partner logos: descriptive alt instead of file name
- Lazy-load accreditation logos
- CTA photo: responsive sizes
- Hero parallax: run once per frame instead of on every scroll event
- Roadmap cards: run once per frame instead of on every scroll event
- New code block (Supabase + eligibility review/results), clearly marked
- All script-built images decode off the main thread

## Exact diff

```diff
--- original <script> blocks (index.html)
+++ assets/js/main.js
@@ -38 +38 @@
-  {s:'bangalore',n:'Bangalore',route:'#/locations/bangalore'},
+  {s:'bangalore',n:'Bangalore',route:'abroad-education-consultants-in-bangalore.html'},
@@ -93 +93 @@
-  trust:function(){return '<div class="trust"><div class="trust-item"><small>Membership</small><div class="logos"><img src="'+IMG+'home/qualityabroad/EAIE.png" alt="EAIE" loading="lazy"><img src="'+IMG+'home/qualityabroad/NAFSA.png" alt="NAFSA" loading="lazy"></div></div><div class="trust-item"><small>Accreditation</small><div class="logos"><img src="'+IMG+'germany/logos/icef-accredited-logo.png" alt="ICEF Accredited" loading="lazy"></div></div></div>'},
+  trust:function(){return '<div class="trust"><div class="trust-item"><small>Membership</small><div class="logos"><img decoding="async" src="'+IMG+'home/qualityabroad/EAIE.png" alt="EAIE" loading="lazy"><img decoding="async" src="'+IMG+'home/qualityabroad/NAFSA.png" alt="NAFSA" loading="lazy"></div></div><div class="trust-item"><small>Accreditation</small><div class="logos"><img decoding="async" src="'+IMG+'germany/logos/icef-accredited-logo.png" alt="ICEF Accredited" loading="lazy"></div></div></div>'},
@@ -95,2 +95,2 @@
-  assist:function(){return '<div class="assist">'+[['sop','SOP','Statement of Purpose'],['lor','LOR','Letter of Recommendation'],['lom','LOM','Letter of Motivation'],['cv','CV','Curriculum Vitae'],['visa','Visa','Student Visa Process']].map(function(a,i){return '<article class="assist-card rv" style="--d:'+(i*.08)+'s">'+(a[0]==='lom'?'<span class="assist-ic">'+icon('compass')+'</span>':'<img src="'+IMG+'home/assistance/'+a[0]+'.png" alt="'+a[1]+'" loading="lazy">')+'<h3>'+a[1]+'</h3><p>'+a[2]+'</p><span class="big">'+a[1]+'</span></article>'}).join('')+'</div>'},
-  partners:function(){var l=PARTNERS.map(function(p){return '<img src="'+IMG+'home/partners/'+p+'" alt="'+p.split('.')[0].replace(/_|-/g,' ')+'" loading="lazy">'}).join('');return '<div class="marquee rv"><div class="track">'+l+l+'</div></div>'},
+  assist:function(){return '<div class="assist">'+[['sop','SOP','Statement of Purpose'],['lor','LOR','Letter of Recommendation'],['lom','LOM','Letter of Motivation'],['cv','CV','Curriculum Vitae'],['visa','Visa','Student Visa Process']].map(function(a,i){return '<article class="assist-card rv" style="--d:'+(i*.08)+'s">'+(a[0]==='lom'?'<span class="assist-ic">'+icon('compass')+'</span>':'<img decoding="async" src="'+IMG+'home/assistance/'+a[0]+'.png" alt="'+a[1]+'" loading="lazy">')+'<h3>'+a[1]+'</h3><p>'+a[2]+'</p><span class="big">'+a[1]+'</span></article>'}).join('')+'</div>'},
+  partners:function(){var l=PARTNERS.map(function(p){return '<img decoding="async" src="'+IMG+'home/partners/'+p+'" alt="'+PALT(p)+'" loading="lazy">'}).join('');return '<div class="marquee rv"><div class="track">'+l+l+'</div></div>'},
@@ -111 +111 @@
-    return n.map(function(x,i){return '<a class="post rv" style="--d:'+(i*.1)+'s" href="'+x[3]+'" target="_blank" rel="noopener"><div class="media"><img src="'+IMG+'events/'+x[0]+'" alt="'+esc(x[1])+'" loading="lazy"></div><div class="body"><span class="tag">'+x[4]+'</span><h3>'+esc(x[1])+'</h3><p>'+esc(x[2])+'</p><span class="link-arrow">Read more '+icon('arrow')+'</span></div></a>'}).join('');
+    return n.map(function(x,i){return '<a class="post rv" style="--d:'+(i*.1)+'s" href="'+x[3]+'" target="_blank" rel="noopener"><div class="media"><img decoding="async" src="'+IMG+'events/'+x[0]+'" alt="'+esc(x[1])+'" loading="lazy"></div><div class="body"><span class="tag">'+x[4]+'</span><h3>'+esc(x[1])+'</h3><p>'+esc(x[2])+'</p><span class="link-arrow">Read more '+icon('arrow')+'</span></div></a>'}).join('');
@@ -114 +114 @@
-  cta:function(){return '<div class="cta-band rv"><span class="glow"></span><div><h2>Your future starts here! Book an appointment today.</h2><p>Speak with a Career Gyan counsellor about your course, country and university options.</p><div class="actions"><a class="btn btn-light" href="#/contact">Book An Appointment '+icon('arrow')+'</a><a class="btn btn-outline-light" href="#/eligibility">Check Eligibility</a></div></div><img src="'+IMG+'home/quotation_img.png" alt="" loading="lazy"></div>'}
+  cta:function(){return '<div class="cta-band rv"><span class="glow"></span><div><h2>Your future starts here! Book an appointment today.</h2><p>Speak with a Career Gyan counsellor about your course, country and university options.</p><div class="actions"><a class="btn btn-light" href="contact.html">Book An Appointment '+icon('arrow')+'</a><a class="btn btn-outline-light" href="eligibility.html">Check Eligibility</a></div></div><img decoding="async" src="'+IMG+'home/quotation_img.png" alt="" loading="lazy"></div>'}
@@ -117,3 +117,3 @@
-function courseHref(s){return s==='arts'?'#/courses/arts':'#/course/'+s}
-function locHref(l){return l.route||'#/location/'+l.s}
-function flagHTML(k,cls){var c=COUNTRIES[k];return '<span class="flag">'+(c.img?'<img src="'+IMG+'home/countries/'+c.img+'" alt="'+c.n+'" loading="lazy">':'<span class="mono">'+c.c+'</span>')+'</span>'}
+function courseHref(s){return 'course-'+s+'.html'}
+function locHref(l){return l.route||l.page.replace(/\.php$/,'.html')}
+function flagHTML(k,cls){var c=COUNTRIES[k];return '<span class="flag">'+(c.img?'<img decoding="async" src="'+IMG+'home/countries/'+c.img+'" alt="'+c.n+'" loading="lazy">':'<span class="mono">'+c.c+'</span>')+'</span>'}
@@ -129 +129 @@
-function eventLink(e){return e.page?'workshop-registration.html':'#/contact'}
+function eventLink(e){return e.page?'workshops/workshop-registration.html':'contact.html'}
@@ -133 +133 @@
-  return '<article class="ev'+(rv?' rv':'')+'" style="animation-delay:'+(i*.05)+'s;--d:'+(i*.1)+'s"><a class="ev-media" href="'+url+'"><span class="bgblur" style="background-image:url(\''+src+'\')"></span><img src="'+src+'" alt="'+esc(e.t)+'" loading="lazy"><span class="ev-date"><b>'+dt.d+'</b><span>'+dt.m+' '+dt.y.slice(2)+'</span></span></a>'+
+  return '<article class="ev'+(rv?' rv':'')+'" style="animation-delay:'+(i*.05)+'s;--d:'+(i*.1)+'s"><a class="ev-media" href="'+url+'"><span class="bgblur" style="background-image:url(\''+src+'\')"></span><img decoding="async" src="'+src+'" alt="'+esc(e.t)+'" loading="lazy"><span class="ev-date"><b>'+dt.d+'</b><span>'+dt.m+' '+dt.y.slice(2)+'</span></span></a>'+
@@ -146,4 +146,4 @@
-  $('#dd-countries').innerHTML=DD_ORDER.map(function(k){return '<a href="#/country/'+k+'" data-r="country/'+k+'"><span class="code">'+COUNTRIES[k].c+'</span>'+COUNTRIES[k].n+'</a>'}).join('');
-  $('#dd-courses').innerHTML=COURSES.map(function(c){return '<a href="'+courseHref(c.s)+'" data-r="'+courseHref(c.s).slice(2)+'">'+icon(c.i)+c.n+'</a>'}).join('');
-  $('#dd-locations').innerHTML=LOCS.map(function(l){return '<a href="'+locHref(l)+'" data-r="'+locHref(l).slice(2)+'">'+icon('pin')+l.n+'</a>'}).join('');
-  $('#m-countries').innerHTML=DD_ORDER.map(function(k){return '<a href="#/country/'+k+'">'+COUNTRIES[k].n+'</a>'}).join('')+'<a href="#/all-countries" style="grid-column:1 / -1;font-weight:700;color:var(--blue)">View all destinations →</a>';
+  $('#dd-countries').innerHTML=DD_ORDER.map(function(k){return '<a href="study-in-'+k+'.html" data-r="country/'+k+'"><span class="code">'+COUNTRIES[k].c+'</span>'+COUNTRIES[k].n+'</a>'}).join('');
+  $('#dd-courses').innerHTML=COURSES.map(function(c){return '<a href="'+courseHref(c.s)+'" data-r="'+(c.s==='arts'?'courses/arts':'course/'+c.s)+'">'+icon(c.i)+c.n+'</a>'}).join('');
+  $('#dd-locations').innerHTML=LOCS.map(function(l){return '<a href="'+locHref(l)+'" data-r="'+(l.s==='bangalore'?'locations/bangalore':'location/'+l.s)+'">'+icon('pin')+l.n+'</a>'}).join('');
+  $('#m-countries').innerHTML=DD_ORDER.map(function(k){return '<a href="study-in-'+k+'.html">'+COUNTRIES[k].n+'</a>'}).join('')+'<a href="all-countries.html" style="grid-column:1 / -1;font-weight:700;color:var(--blue)">View all destinations →</a>';
@@ -153 +153 @@
-  $('#f-countries').innerHTML=DD_ORDER.map(function(k){return '<li><a href="#/country/'+k+'">'+COUNTRIES[k].n+'</a></li>'}).join('')+'<li><a href="#/all-countries" style="color:#fff;font-weight:700">All destinations</a></li>';
+  $('#f-countries').innerHTML=DD_ORDER.map(function(k){return '<li><a href="study-in-'+k+'.html">'+COUNTRIES[k].n+'</a></li>'}).join('')+'<li><a href="all-countries.html" style="color:#fff;font-weight:700">All destinations</a></li>';
@@ -155,0 +156 @@
+  if($('#home-events')){ /* MPA page guard */
@@ -158,0 +160 @@
+  }
@@ -159,0 +162 @@
+  if($('#ev-feature')){ /* MPA page guard */
@@ -161 +164 @@
-  $('#ev-feature').innerHTML='<article class="ev-feature"><a class="ev-media" href="'+furl+'"><span class="bgblur" style="background-image:url(\''+fsrc+'\')"></span><img src="'+fsrc+'" alt="'+esc(f.t)+'"><span class="ev-date"><b>'+fd.d+'</b><span>'+fd.m+' '+fd.y.slice(2)+'</span></span></a><div class="ev-body"><span class="tag">'+(f.kind||'Latest event')+'</span><h3>'+esc(f.t)+'</h3><div class="ev-meta"><div>'+icon('cal')+'<span>'+f.d+'</span></div><div>'+icon('clock')+'<span>'+f.tm+'</span></div><div>'+icon('pin')+'<span>'+esc(f.l)+'</span></div></div><div style="display:flex;gap:12px;flex-wrap:wrap;margin-top:8px"><a class="btn btn-primary" href="'+furl+'">View workshop &amp; register '+icon('arrow')+'</a></div></div></article>';
+  $('#ev-feature').innerHTML='<article class="ev-feature"><a class="ev-media" href="'+furl+'"><span class="bgblur" style="background-image:url(\''+fsrc+'\')"></span><img decoding="async" src="'+fsrc+'" alt="'+esc(f.t)+'"><span class="ev-date"><b>'+fd.d+'</b><span>'+fd.m+' '+fd.y.slice(2)+'</span></span></a><div class="ev-body"><span class="tag">'+(f.kind||'Latest event')+'</span><h3>'+esc(f.t)+'</h3><div class="ev-meta"><div>'+icon('cal')+'<span>'+f.d+'</span></div><div>'+icon('clock')+'<span>'+f.tm+'</span></div><div>'+icon('pin')+'<span>'+esc(f.l)+'</span></div></div><div style="display:flex;gap:12px;flex-wrap:wrap;margin-top:8px"><a class="btn btn-primary" href="'+furl+'">View workshop &amp; register '+icon('arrow')+'</a></div></div></article>';
@@ -166 +169 @@
-  $('#ev-fan').innerHTML=EVENTS.slice(0,3).map(function(e,i){var src=fanImages[i],dt=parseDate(e.d);return '<a class="p p'+(i+1)+'" href="'+eventLink(e)+'"><img src="'+src+'" alt="'+esc(e.t)+'"><span class="ev-date"><b>'+dt.d+'</b><span>'+dt.m+' '+dt.y.slice(2)+'</span></span></a>'}).join('');
+  $('#ev-fan').innerHTML=EVENTS.slice(0,3).map(function(e,i){var src=fanImages[i],dt=parseDate(e.d);return '<a class="p p'+(i+1)+'" href="'+eventLink(e)+'"><img decoding="async" src="'+src+'" alt="'+esc(e.t)+'"><span class="ev-date"><b>'+dt.d+'</b><span>'+dt.m+' '+dt.y.slice(2)+'</span></span></a>'}).join('');
@@ -168,0 +172 @@
+  }
@@ -169,0 +174 @@
+  if($('#arts-countries')){ /* MPA page guard */
@@ -172,0 +178 @@
+  }
@@ -173,0 +180 @@
+  if($('#blr-branches')){ /* MPA page guard */
@@ -174,0 +182 @@
+  }
@@ -175,0 +184 @@
+  if($('#all-branches')){ /* MPA page guard */
@@ -177,0 +187,2 @@
+  }
+  if($('#dest-list')){ /* MPA page guard */
@@ -178,0 +190 @@
+  }
@@ -197 +209 @@
-    glass='<div class="glass rv" style="--d:.2s"><div class="glass-h"><span><img src="https://flagcdn.com/w80/'+iso(slug)+'.png" alt="" style="width:30px;height:30px;border-radius:50%;object-fit:cover;display:inline-block;vertical-align:middle;margin-right:10px">'+cname(slug)+'</span><svg class="ic"><use href="#i-globe"/></svg></div><div class="glass-row"><b>2569+</b><span>Partnered universities worldwide</span></div><div class="glass-row"><b>97%</b><span>VISA Approval (Last Intake)</span></div><div class="glass-row"><b>Free</b><span>Counselling session</span></div></div>';
+    glass='<div class="glass rv" style="--d:.2s"><div class="glass-h"><span><img decoding="async" src="https://flagcdn.com/w80/'+iso(slug)+'.png" alt="" style="width:30px;height:30px;border-radius:50%;object-fit:cover;display:inline-block;vertical-align:middle;margin-right:10px">'+cname(slug)+'</span><svg class="ic"><use href="#i-globe"/></svg></div><div class="glass-row"><b>2569+</b><span>Partnered universities worldwide</span></div><div class="glass-row"><b>97%</b><span>VISA Approval (Last Intake)</span></div><div class="glass-row"><b>Free</b><span>Counselling session</span></div></div>';
@@ -211,2 +223,2 @@
-  return '<div class="ihero">'+(bg?'<img class="bg" src="'+bg+'" alt="">':'')+'<div class="container ihero-grid"><div>'+
-    '<nav class="crumbs rv"><a href="#/">Home</a>'+icon('right')+'<span>'+crumb[0]+'</span>'+icon('right')+'<span>'+crumb[1]+'</span></nav>'+
+  return '<div class="ihero">'+(bg?'<img decoding="async" class="bg" src="'+bg+'"'+HSET(bg)+' alt="'+esc(String(title).replace(/<[^>]+>/g,''))+'" fetchpriority="high">':'')+'<div class="container ihero-grid"><div>'+
+    '<nav class="crumbs rv"><a href="index.html">Home</a>'+icon('right')+'<span>'+crumb[0]+'</span>'+icon('right')+'<span>'+crumb[1]+'</span></nav>'+
@@ -214,2 +226,2 @@
-    '<div class="h-actions rv" style="--d:.18s"><a class="btn btn-gold" href="#/contact">Talk to our experts '+icon('arrow')+'</a><a class="btn btn-glass" href="#/eligibility">Check Eligibility</a></div></div>'+glass+'</div></div>'+
-    '<section class="section" style="padding-bottom:0"><div class="container"><div class="notice rv"><p>Our counsellors can share complete, up-to-date details for this program. Book a free counselling session to get started.</p><a class="btn btn-primary" href="#/contact">Talk to our experts '+icon('arrow')+'</a></div></div></section>'+body+
+    '<div class="h-actions rv" style="--d:.18s"><a class="btn btn-gold" href="contact.html">Talk to our experts '+icon('arrow')+'</a><a class="btn btn-glass" href="eligibility.html">Check Eligibility</a></div></div>'+glass+'</div></div>'+
+    '<section class="section" style="padding-bottom:0"><div class="container"><div class="notice rv"><p>Our counsellors can share complete, up-to-date details for this program. Book a free counselling session to get started.</p><a class="btn btn-primary" href="contact.html">Talk to our experts '+icon('arrow')+'</a></div></div></section>'+body+
@@ -224 +236 @@
-  return '<div class="legal-page"><a class="legal-back" href="#/">← Back to CareerGyan</a>'+body+'<p class="legal-copy">© 2026 Powered and secured by I Don't Blabber</p></div>';
+  return '<div class="legal-page"><a class="legal-back" href="index.html">← Back to CareerGyan</a>'+body+'<p class="legal-copy">© 2026 Powered and secured by I Don't Blabber</p></div>';
@@ -228 +240 @@
-var STATIC={'':'home','home':'home','about':'about','courses/arts':'arts','course/arts':'arts','workshop':'events','workshop/event':'home','locations/bangalore':'bangalore','location/bangalore':'bangalore','contact':'contact','eligibility':'eligibility','check-eligibility':'eligibility'};
+var STATIC={'not-found':'notfound','':'home','home':'home','about':'about','courses/arts':'arts','course/arts':'arts','workshop':'events','workshop/event':'home','locations/bangalore':'bangalore','location/bangalore':'bangalore','contact':'contact','eligibility':'eligibility','check-eligibility':'eligibility'};
@@ -234 +246 @@
-  var path=decodeURIComponent(location.hash.replace(/^#\/?/,'')).replace(/\/$/,'').toLowerCase();
+  var path=decodeURIComponent(document.body.getAttribute('data-route')||'').replace(/\/$/,'').toLowerCase();
@@ -244 +256 @@
-    if(html){page='dynamic';$('#dynamic').innerHTML=html;document.title=$('#dynamic h1').textContent+' | Career Gyan';if(path==='all-countries'){initAllCountries();document.title='All Study Destinations | Career Gyan'}}
+    if(html){page='dynamic';$('#dynamic').innerHTML=html;if(path==='all-countries'){initAllCountries()}}
@@ -247 +258,0 @@
-  if(page!=='dynamic')document.title=TITLES[page];
@@ -253,0 +265 @@
+  var cp=document.body.getAttribute('data-path');$$('.hdr a[href],.mnav a[href]').forEach(function(a){if(a.getAttribute('href')===cp)a.setAttribute('aria-current','page');else a.removeAttribute('aria-current')});
@@ -300,0 +313 @@
+  if($('#finder')){ /* MPA page guard */
@@ -303,2 +316,2 @@
-    if(c){location.hash=courseHref(c.toLowerCase());return}
-    location.hash=k?'#/country/'+k:'#/contact';
+    if(c){location.href=courseHref(c.toLowerCase());return}
+    location.href=k?'study-in-'+k+'.html':'contact.html';
@@ -305,0 +319 @@
+  }
@@ -306,0 +321 @@
+  if(form){ /* MPA page guard */
@@ -313,3 +328 @@
-    window.location.href=href;
-    note.innerHTML='Thank you! Your email app has opened with your enquiry addressed to <b>enquiry@careergyan.co</b> — just press send. You can also call <a href="tel:+919606868888">+91 96068 68888</a>.';
-    note.classList.add('show');
+    cgSendEnquiry(form,note,href);
@@ -317,0 +331 @@
+  }
@@ -330 +344 @@
-  return src?'<img class="bg" src="'+src+'"'+(PHOTO[k]&&fb?' data-fb="'+fb+'"':'')+' alt="" loading="lazy">':'';
+  return src?'<img decoding="async" class="bg" src="'+src+'"'+(PHOTO[k]&&fb?' data-fb="'+fb+'"':'')+' alt="Study in '+cname(k)+'" loading="lazy">':'';
@@ -339 +353 @@
-    return '<a class="dcard'+(big?' big':'')+(destImg(k)?'':' img-off')+'" style="animation-delay:'+(i*.05)+'s" href="#/country/'+k+'">'+destImg(k)+
+    return '<a class="dcard'+(big?' big':'')+(destImg(k)?'':' img-off')+'" style="animation-delay:'+(i*.05)+'s" href="study-in-'+k+'.html">'+destImg(k)+
@@ -341 +355 @@
-      '<div class="dc-b"><h3><span class="flag"><img src="https://flagcdn.com/w80/'+iso(k)+'.png" alt="" loading="lazy"></span>'+cname(k)+'</h3><span class="pill">'+icon('cap')+'Study in '+cname(k)+'</span></div></a>';
+      '<div class="dc-b"><h3><span class="flag"><img decoding="async" src="https://flagcdn.com/w80/'+iso(k)+'.png" alt="" loading="lazy"></span>'+cname(k)+'</h3><span class="pill">'+icon('cap')+'Study in '+cname(k)+'</span></div></a>';
@@ -362 +376 @@
-      return '<div class="cfc" data-i="'+i+'">'+(PHOTO[k]?'<img class="bg" src="'+UNS(PHOTO[k],1000)+'"'+(fb?' data-fb="'+fb+'"':'')+' alt="" loading="lazy" draggable="false">':'')+
+      return '<div class="cfc" data-i="'+i+'">'+(PHOTO[k]?'<img decoding="async" class="bg" src="'+UNS(PHOTO[k],1000)+'"'+(fb?' data-fb="'+fb+'"':'')+' alt="Study in '+cname(k)+'" loading="lazy" draggable="false">':'')+
@@ -364 +378 @@
-      '<div class="info"><h3><span class="flag"><img src="https://flagcdn.com/w80/'+iso(k)+'.png" alt="" draggable="false"></span>'+cname(k)+'</h3>'+
+      '<div class="info"><h3><span class="flag"><img decoding="async" src="https://flagcdn.com/w80/'+iso(k)+'.png" alt="" loading="lazy" draggable="false"></span>'+cname(k)+'</h3>'+
@@ -366 +380 @@
-      '<div class="cta"><a class="go" href="#/country/'+k+'">Study in '+cname(k)+' '+icon('arrow')+'</a><span>'+COUNTRIES[k].c+' · '+REGION(k)+'</span></div></div></div>';
+      '<div class="cta"><a class="go" href="study-in-'+k+'.html">Study in '+cname(k)+' '+icon('arrow')+'</a><span>'+COUNTRIES[k].c+' · '+REGION(k)+'</span></div></div></div>';
@@ -368 +382 @@
-    flags.innerHTML=list.map(function(k,i){return '<button data-i="'+i+'"><img src="https://flagcdn.com/w80/'+iso(k)+'.png" alt="">'+cname(k)+'</button>'}).join('');
+    flags.innerHTML=list.map(function(k,i){return '<button data-i="'+i+'"><img decoding="async" src="https://flagcdn.com/w80/'+iso(k)+'.png" alt="" loading="lazy">'+cname(k)+'</button>'}).join('');
@@ -403,2 +417,2 @@
-  $('#rmImgs').innerHTML=STEPS.map(function(s,i){return '<img class="'+(i?'':'on')+'" src="'+UNS(s[2],1100)+'" alt="'+s[0]+'" loading="lazy">'}).join('');
-  $('#steps').innerHTML=STEPS.map(function(s,i){return '<div class="rs" data-i="'+i+'" style="--i:'+i+';z-index:'+(i+1)+'"><span class="rs-big">0'+(i+1)+'</span><div class="rs-img"><img src="'+UNS(s[2],900)+'" alt="'+s[0]+'" loading="lazy"></div><div class="rs-in"><span class="rs-n">'+(i+1)+'</span><small>Step 0'+(i+1)+' of 05</small><h3>'+s[0]+'</h3><p>'+s[1]+'</p><div class="rs-meter">'+STEPS.map(function(x,j){return '<i class="'+(j<=i?'f':'')+'"></i>'}).join('')+'</div></div></div>'}).join('');
+  $('#rmImgs').innerHTML=STEPS.map(function(s,i){return '<img decoding="async" class="'+(i?'':'on')+'" src="'+UNS(s[2],1100)+'" alt="'+s[0]+'" loading="lazy">'}).join('');
+  $('#steps').innerHTML=STEPS.map(function(s,i){return '<div class="rs" data-i="'+i+'" style="--i:'+i+';z-index:'+(i+1)+'"><span class="rs-big">0'+(i+1)+'</span><div class="rs-img"><img decoding="async" src="'+UNS(s[2],900)+'" alt="'+s[0]+'" loading="lazy"></div><div class="rs-in"><span class="rs-n">'+(i+1)+'</span><small>Step 0'+(i+1)+' of 05</small><h3>'+s[0]+'</h3><p>'+s[1]+'</p><div class="rs-meter">'+STEPS.map(function(x,j){return '<i class="'+(j<=i?'f':'')+'"></i>'}).join('')+'</div></div></div>'}).join('');
@@ -418 +432 @@
-  window.addEventListener('scroll',upd,{passive:true});window.addEventListener('resize',upd);window.addEventListener('hashchange',function(){setTimeout(upd,120)});
+  var updT=0;window.addEventListener('scroll',function(){if(updT)return;updT=requestAnimationFrame(function(){updT=0;upd()})},{passive:true});window.addEventListener('resize',upd);window.addEventListener('hashchange',function(){setTimeout(upd,120)});
@@ -425 +439 @@
-  $('#crsList').innerHTML=CRS.map(function(c,i){return '<a class="cbx rv" style="--d:'+(i*.07)+'s" href="'+courseHref(c[0])+'"><img src="'+UNS(c[3],i?800:1200)+'" alt="'+c[1]+'" loading="lazy"><span class="glare"></span><div class="top"><em>0'+(i+1)+'</em><span>'+icon(c[2])+'</span></div><div class="bt"><h3>'+c[1]+'</h3><p>'+(c[0]==='arts'?'Available across 15 countries':'Bachelor\'s &amp; Master\'s programs')+'<i>'+icon('arrow')+'</i></p><span class="line"></span></div></a>'}).join('');
+  $('#crsList').innerHTML=CRS.map(function(c,i){return '<a class="cbx rv" style="--d:'+(i*.07)+'s" href="'+courseHref(c[0])+'"><img decoding="async" src="'+UNS(c[3],i?800:1200)+'" alt="'+c[1]+'" loading="lazy"><span class="glare"></span><div class="top"><em>0'+(i+1)+'</em><span>'+icon(c[2])+'</span></div><div class="bt"><h3>'+c[1]+'</h3><p>'+(c[0]==='arts'?'Available across 15 countries':'Bachelor\'s &amp; Master\'s programs')+'<i>'+icon('arrow')+'</i></p><span class="line"></span></div></a>'}).join('');
@@ -435 +449 @@
-  var h='<div class="ihero"><img class="bg" src="'+UNS('1759784839707-a32c910a7747',2000)+'" alt=""><div class="container ihero-grid"><div><nav class="crumbs rv"><a href="#/">Home</a>'+icon('right')+'<span>Countries</span>'+icon('right')+'<span>All destinations</span></nav><span class="eyebrow gold rv">Study Destinations</span><h1 class="rv" style="--d:.06s">Explore top countries for Indian <span class="serif">students</span></h1><p class="h-lead rv" style="--d:.12s">2569+ partnered universities across the globe. Talk to a counsellor who knows each country.</p><div class="h-actions rv" style="--d:.18s"><a class="btn btn-gold" href="#/contact">Get Free Counselling '+icon('arrow')+'</a><a class="btn btn-glass" href="#/eligibility">Check Eligibility</a></div></div>'+
+  var h='<div class="ihero"><img decoding="async" class="bg" src="'+UNS('1759784839707-a32c910a7747',2000)+'"'+HSET(UNS('1759784839707-a32c910a7747',2000))+' alt="Study abroad destinations for Indian students" fetchpriority="high"><div class="container ihero-grid"><div><nav class="crumbs rv"><a href="index.html">Home</a>'+icon('right')+'<span>Countries</span>'+icon('right')+'<span>All destinations</span></nav><span class="eyebrow gold rv">Study Destinations</span><h1 class="rv" style="--d:.06s">Explore top countries for Indian <span class="serif">students</span></h1><p class="h-lead rv" style="--d:.12s">2569+ partnered universities across the globe. Talk to a counsellor who knows each country.</p><div class="h-actions rv" style="--d:.18s"><a class="btn btn-gold" href="contact.html">Get Free Counselling '+icon('arrow')+'</a><a class="btn btn-glass" href="eligibility.html">Check Eligibility</a></div></div>'+
@@ -440 +454 @@
-  h+='<section class="section bg-soft"><div class="container">'+shead('Compare','Compare popular <span class="serif">destinations</span>',true,'Key figures from our UK, USA and Canada guides.')+'<div class="cmp-wrap"><div class="cmp rv"><div class="cmp-row head" style="--i:0"><div>At a glance</div>'+C.map(function(k){return '<div><img src="https://flagcdn.com/w80/'+iso(k)+'.png" alt="">'+cname(k)+'</div>'}).join('')+'</div>'+rows.map(function(r,i){return '<div class="cmp-row" style="--i:'+(i+1)+'"><div>'+r[0]+'</div><div>'+r[1]+'</div><div>'+r[2]+'</div><div>'+r[3]+'</div></div>'}).join('')+'</div></div><div style="text-align:center;margin-top:34px;display:flex;gap:12px;justify-content:center;flex-wrap:wrap">'+C.map(function(k){return '<a class="btn btn-ghost" href="#/country/'+k+'">Study in '+cname(k)+' '+icon('arrow')+'</a>'}).join('')+'</div></div></section>';
+  h+='<section class="section bg-soft"><div class="container">'+shead('Compare','Compare popular <span class="serif">destinations</span>',true,'Key figures from our UK, USA and Canada guides.')+'<div class="cmp-wrap"><div class="cmp rv"><div class="cmp-row head" style="--i:0"><div>At a glance</div>'+C.map(function(k){return '<div><img decoding="async" src="https://flagcdn.com/w80/'+iso(k)+'.png" alt="">'+cname(k)+'</div>'}).join('')+'</div>'+rows.map(function(r,i){return '<div class="cmp-row" style="--i:'+(i+1)+'"><div>'+r[0]+'</div><div>'+r[1]+'</div><div>'+r[2]+'</div><div>'+r[3]+'</div></div>'}).join('')+'</div></div><div style="text-align:center;margin-top:34px;display:flex;gap:12px;justify-content:center;flex-wrap:wrap">'+C.map(function(k){return '<a class="btn btn-ghost" href="study-in-'+k+'.html">Study in '+cname(k)+' '+icon('arrow')+'</a>'}).join('')+'</div></div></section>';
@@ -451 +465 @@
-    grid.innerHTML=list.length?list.map(function(k,i){var fb=COUNTRIES[k].img?IMG+'home/countries/'+COUNTRIES[k].img:'';return '<a class="acc" style="animation-delay:'+(i*.04)+'s" href="#/country/'+k+'"><div class="media">'+(PHOTO[k]?'<img class="bg" src="'+UNS(PHOTO[k],900)+'"'+(fb?' data-fb="'+fb+'"':'')+' alt="'+cname(k)+'" loading="lazy">':'')+'<span class="reg">'+REGION(k)+'</span>'+(CPAGE[k]?'<span class="guide">Full guide</span>':'')+'<span class="code">'+COUNTRIES[k].c+'</span></div><div class="body"><h3><img src="https://flagcdn.com/w80/'+iso(k)+'.png" alt="">'+cname(k)+'</h3><div class="facts">'+factRows(k).map(function(r){return '<div class="fact"><span>'+r[0]+'</span><b>'+r[1]+'</b></div>'}).join('')+'</div><span class="go">Study in '+cname(k)+'<i>'+icon('arrow')+'</i></span></div></a>'}).join(''):'<p class="ac-empty">No destinations match “'+esc(q.value)+'”. Try another country name.</p>';
+    grid.innerHTML=list.length?list.map(function(k,i){var fb=COUNTRIES[k].img?IMG+'home/countries/'+COUNTRIES[k].img:'';return '<a class="acc" style="animation-delay:'+(i*.04)+'s" href="study-in-'+k+'.html"><div class="media">'+(PHOTO[k]?'<img decoding="async" class="bg" src="'+UNS(PHOTO[k],900)+'"'+(fb?' data-fb="'+fb+'"':'')+' alt="'+cname(k)+'" loading="lazy">':'')+'<span class="reg">'+REGION(k)+'</span>'+(CPAGE[k]?'<span class="guide">Full guide</span>':'')+'<span class="code">'+COUNTRIES[k].c+'</span></div><div class="body"><h3><img decoding="async" src="https://flagcdn.com/w80/'+iso(k)+'.png" alt="">'+cname(k)+'</h3><div class="facts">'+factRows(k).map(function(r){return '<div class="fact"><span>'+r[0]+'</span><b>'+r[1]+'</b></div>'}).join('')+'</div><span class="go">Study in '+cname(k)+'<i>'+icon('arrow')+'</i></span></div></a>'}).join(''):'<p class="ac-empty">No destinations match “'+esc(q.value)+'”. Try another country name.</p>';
@@ -458,0 +473 @@
+  if(!$('#hSlides'))return; /* MPA page guard */
@@ -497,2 +512,2 @@
-  svl.innerHTML=SVC.map(function(s,i){return '<div class="hx-si rv" style="--d:'+(i*.05)+'s;--dur:'+DUR+'ms"><button><em>0'+(i+1)+'</em><span>'+esc(s[0])+'</span><i></i></button><div class="hx-si-b"><div><p>'+esc(s[1])+'</p><a href="#/contact">Talk to an expert '+icon('arrow')+'</a></div></div><span class="hx-si-bar"></span></div>'}).join('');
-  svs.innerHTML=SVC.map(function(s,i){return '<div class="hx-ss"><img src="'+s[2]+'"'+(s[4]?' data-fb="'+s[4]+'"':'')+' alt="'+esc(s[0])+'" loading="lazy"><span class="hx-ss-num">0'+(i+1)+'</span><div class="hx-ss-card"><span><img src="'+IMG+'home/services/'+s[3]+'" alt=""></span><div><b>'+esc(s[0])+'</b><small>Career Gyan services</small></div></div></div>'}).join('');
+  svl.innerHTML=SVC.map(function(s,i){return '<div class="hx-si rv" style="--d:'+(i*.05)+'s;--dur:'+DUR+'ms"><button><em>0'+(i+1)+'</em><span>'+esc(s[0])+'</span><i></i></button><div class="hx-si-b"><div><p>'+esc(s[1])+'</p><a href="contact.html">Talk to an expert '+icon('arrow')+'</a></div></div><span class="hx-si-bar"></span></div>'}).join('');
+  svs.innerHTML=SVC.map(function(s,i){return '<div class="hx-ss"><img decoding="async" src="'+s[2]+'"'+(s[4]?' data-fb="'+s[4]+'"':'')+' alt="'+esc(s[0])+'" loading="lazy"><span class="hx-ss-num">0'+(i+1)+'</span><div class="hx-ss-card"><span><img decoding="async" src="'+IMG+'home/services/'+s[3]+'" alt="" loading="lazy"></span><div><b>'+esc(s[0])+'</b><small>Career Gyan services</small></div></div></div>'}).join('');
@@ -511 +526 @@
-  function lg(list){var h=list.map(function(p){return '<div class="hx-lg"><img src="'+IMG+'home/partners/'+p+'" alt="'+p.split('.')[0].replace(/_|-/g,' ')+'" loading="lazy"></div>'}).join('');return '<div class="hx-mq-t">'+h+h+h+'</div>'}
+  function lg(list){var h=list.map(function(p){return '<div class="hx-lg"><img decoding="async" src="'+IMG+'home/partners/'+p+'" alt="'+PALT(p)+'" loading="lazy"></div>'}).join('');return '<div class="hx-mq-t">'+h+h+h+'</div>'}
@@ -529 +544 @@
-  return '<article class="hx-tk rv" style="--d:'+(i*.1)+'s"><div class="hx-tk-d"><b>'+dt.d+'</b><span>'+dt.m+'</span><small>'+dt.y+'</small></div><a class="hx-tk-img" href="'+url+'"><span class="bgblur" style="background-image:url(\''+src+'\')"></span><img src="'+src+'" alt="'+esc(e.t)+'" loading="lazy"></a><div class="hx-tk-b"><h3>'+esc(e.t)+'</h3><div class="meta"><span>'+icon('cal')+e.d+'</span><span>'+icon('clock')+e.tm+'</span>'+place+'</div></div><div class="hx-tk-go"><a href="'+url+'">'+(e.page?'View workshop &amp; register':'Read More')+' '+icon('arrow')+'</a></div></article>';
+  return '<article class="hx-tk rv" style="--d:'+(i*.1)+'s"><div class="hx-tk-d"><b>'+dt.d+'</b><span>'+dt.m+'</span><small>'+dt.y+'</small></div><a class="hx-tk-img" href="'+url+'"><span class="bgblur" style="background-image:url(\''+src+'\')"></span><img decoding="async" src="'+src+'" alt="'+esc(e.t)+'" loading="lazy"></a><div class="hx-tk-b"><h3>'+esc(e.t)+'</h3><div class="meta"><span>'+icon('cal')+e.d+'</span><span>'+icon('clock')+e.tm+'</span>'+place+'</div></div><div class="hx-tk-go"><a href="'+url+'">'+(e.page?'View workshop &amp; register':'Read More')+' '+icon('arrow')+'</a></div></article>';
@@ -538,3 +553 @@
-    window.location.href='mailto:enquiry@careergyan.co?subject='+encodeURIComponent('Study abroad enquiry – '+document.getElementById(nameId).value.trim())+'&body='+encodeURIComponent(lines.join('\n'));
-    note.innerHTML='Thank you! Your email app has opened with your enquiry addressed to <b>enquiry@careergyan.co</b> — just press send. You can also call <a href="tel:+919606868888">+91 96068 68888</a>.';
-    note.classList.add('show');
+    cgSendEnquiry(form,note,'mailto:enquiry@careergyan.co?subject='+encodeURIComponent('Study abroad enquiry – '+document.getElementById(nameId).value.trim())+'&body='+encodeURIComponent(lines.join('\n')));
@@ -562,2 +575,2 @@
-BLOCKS.gallery=function(){return GALLERY.map(function(g,i){return '<figure class="rv'+(i===0?' big':'')+(i===5?' wide':'')+'" style="--d:'+((i%4)*.06)+'s"><img src="'+IMG+'careergallery/'+g[0]+'" data-fb="'+UNS(GFB[i],900)+'" alt="'+g[1]+'" loading="lazy"><figcaption>'+g[1]+'</figcaption></figure>'}).join('')};
-BLOCKS.cta=function(img){return '<div class="pcta rv"><img class="bg" src="'+(img||UNS('1541339907198-e08756dedf3f',1800))+'" alt="" loading="lazy"><span class="eyebrow gold">Book a free consultation</span><h2>Your future starts here! Book an <span class="serif">appointment today.</span></h2><p>Speak with a Career Gyan counsellor about your course, country and university options.</p><div class="h-actions"><a class="btn btn-gold" href="#/contact">Book An Appointment '+icon('arrow')+'</a><a class="btn btn-glass" href="#/eligibility">Check Eligibility</a></div></div>'};
+BLOCKS.gallery=function(){return GALLERY.map(function(g,i){return '<figure class="rv'+(i===0?' big':'')+(i===5?' wide':'')+'" style="--d:'+((i%4)*.06)+'s"><img decoding="async" src="'+IMG+'careergallery/'+g[0]+'" data-fb="'+UNS(GFB[i],900)+'" alt="'+g[1]+'" loading="lazy"><figcaption>'+g[1]+'</figcaption></figure>'}).join('')};
+BLOCKS.cta=function(img){return '<div class="pcta rv"><img decoding="async" class="bg" src="'+(img||UNS('1541339907198-e08756dedf3f',1800))+'"'+HSET(img||UNS('1541339907198-e08756dedf3f',1800),1)+' alt="" loading="lazy"><span class="eyebrow gold">Book a free consultation</span><h2>Your future starts here! Book an <span class="serif">appointment today.</span></h2><p>Speak with a Career Gyan counsellor about your course, country and university options.</p><div class="h-actions"><a class="btn btn-gold" href="contact.html">Book An Appointment '+icon('arrow')+'</a><a class="btn btn-glass" href="eligibility.html">Check Eligibility</a></div></div>'};
@@ -566 +579 @@
-  return '<a class="dcard'+(destImg(k)?'':' img-off')+'" style="animation-delay:'+(i*.04)+'s" href="#/country/'+k+'">'+destImg(k)+'<span class="mono-bg">'+c.c+'</span><span class="go">'+icon('arrow')+'</span><div class="dc-b"><h3><span class="flag"><img src="https://flagcdn.com/w80/'+iso(k)+'.png" alt="" loading="lazy"></span>'+cname(k)+'</h3><span class="pill">'+icon('cap')+'Study in '+cname(k)+'</span></div></a>';
+  return '<a class="dcard'+(destImg(k)?'':' img-off')+'" style="animation-delay:'+(i*.04)+'s" href="study-in-'+k+'.html">'+destImg(k)+'<span class="mono-bg">'+c.c+'</span><span class="go">'+icon('arrow')+'</span><div class="dc-b"><h3><span class="flag"><img decoding="async" src="https://flagcdn.com/w80/'+iso(k)+'.png" alt="" loading="lazy"></span>'+cname(k)+'</h3><span class="pill">'+icon('cap')+'Study in '+cname(k)+'</span></div></a>';
@@ -571 +584 @@
-  return '<div class="dcard'+(ph?'':' img-off')+' nolink" style="animation-delay:'+(i*.04)+'s">'+(ph?'<img class="bg" src="'+UNS(ph,1200)+'" alt="" loading="lazy">':'')+'<span class="mono-bg">'+code.toUpperCase()+'</span><div class="dc-b"><h3><span class="flag"><img src="https://flagcdn.com/w80/'+code+'.png" alt="" loading="lazy"></span>'+name+'</h3><span class="pill">'+icon('cap')+'Study in '+name+'</span></div></div>';
+  return '<div class="dcard'+(ph?'':' img-off')+' nolink" style="animation-delay:'+(i*.04)+'s">'+(ph?'<img decoding="async" class="bg" src="'+UNS(ph,1200)+'" alt="Study in '+name+'" loading="lazy">':'')+'<span class="mono-bg">'+code.toUpperCase()+'</span><div class="dc-b"><h3><span class="flag"><img decoding="async" src="https://flagcdn.com/w80/'+code+'.png" alt="" loading="lazy"></span>'+name+'</h3><span class="pill">'+icon('cap')+'Study in '+name+'</span></div></div>';
@@ -616,3 +629,3 @@
-  return '<div class="ihero"><img class="bg" src="'+bg+'" alt=""><div class="container ihero-grid"><div><nav class="crumbs rv"><a href="#/">Home</a>'+crumbs.map(function(c){return icon('right')+'<span>'+c+'</span>'}).join('')+'</nav><span class="eyebrow gold rv">'+eb+'</span><h1 class="rv" style="--d:.06s">'+h1+'</h1><p class="h-lead rv" style="--d:.12s">'+lead+'</p><div class="h-actions rv" style="--d:.18s"><a class="btn btn-gold" href="#/contact">Get Free Counselling '+icon('arrow')+'</a><a class="btn btn-glass" href="#/eligibility">Check Eligibility</a></div></div>'+glass+'</div></div>';
-}
-function glassRows(title,ic,rows,flag){return '<div class="glass rv" style="--d:.2s"><div class="glass-h"><span>'+(flag?'<img class="gflag" src="https://flagcdn.com/w80/'+flag+'.png" alt="">':'')+title+'</span>'+icon(ic)+'</div>'+rows.map(function(r){return '<div class="glass-row"><b>'+r[0]+'</b><span>'+r[1]+'</span></div>'}).join('')+'</div>'}
+  return '<div class="ihero"><img decoding="async" class="bg" src="'+bg+'"'+HSET(bg)+' alt="'+esc(String(h1).replace(/<[^>]+>/g,''))+'" fetchpriority="high"><div class="container ihero-grid"><div><nav class="crumbs rv"><a href="index.html">Home</a>'+crumbs.map(function(c){return icon('right')+'<span>'+c+'</span>'}).join('')+'</nav><span class="eyebrow gold rv">'+eb+'</span><h1 class="rv" style="--d:.06s">'+h1+'</h1><p class="h-lead rv" style="--d:.12s">'+lead+'</p><div class="h-actions rv" style="--d:.18s"><a class="btn btn-gold" href="contact.html">Get Free Counselling '+icon('arrow')+'</a><a class="btn btn-glass" href="eligibility.html">Check Eligibility</a></div></div>'+glass+'</div></div>';
+}
+function glassRows(title,ic,rows,flag){return '<div class="glass rv" style="--d:.2s"><div class="glass-h"><span>'+(flag?'<img decoding="async" class="gflag" src="https://flagcdn.com/w80/'+flag+'.png" alt="">':'')+title+'</span>'+icon(ic)+'</div>'+rows.map(function(r){return '<div class="glass-row"><b>'+r[0]+'</b><span>'+r[1]+'</span></div>'}).join('')+'</div>'}
@@ -636 +649 @@
-  h+='<section class="section h-why"><div class="container h-why-grid"><div class="h-collage"><div class="hc-main rv-img"><img src="'+UNS(d.photo2||PHOTO[k],1100)+'" data-fb="https://flagcdn.com/w1280/'+iso(k)+'.png" alt="'+d.full+'" loading="lazy"></div><div class="hc-side"><div class="hc-gold rv" style="--d:.15s"><b>2569+</b><span>Partnered universities across the globe</span></div><div class="hc-navy rv" style="--d:.25s"><span class="eyebrow gold" style="margin-bottom:10px">Top courses</span><p>Science · Technology · Engineering · Management · Pharmacy</p></div></div></div><div><span class="eyebrow rv">Why Study in '+d.name+'?</span><h2 class="h-h2 rv" style="--d:.06s">Why study in <span class="serif">'+d.full+'</span></h2>'+d.why.map(function(p,i){return '<p class="h-p rv" style="--d:'+(.1+i*.04)+'s'+(i?';margin-top:12px':'')+'">'+p+'</p>'}).join('')+'<a class="btn btn-primary rv" href="#/contact" style="margin-top:30px">Talk to an expert '+icon('arrow')+'</a></div></div></section>';
+  h+='<section class="section h-why"><div class="container h-why-grid"><div class="h-collage"><div class="hc-main rv-img"><img decoding="async" src="'+UNS(d.photo2||PHOTO[k],1100)+'" data-fb="https://flagcdn.com/w1280/'+iso(k)+'.png" alt="'+d.full+'" loading="lazy"></div><div class="hc-side"><div class="hc-gold rv" style="--d:.15s"><b>2569+</b><span>Partnered universities across the globe</span></div><div class="hc-navy rv" style="--d:.25s"><span class="eyebrow gold" style="margin-bottom:10px">Top courses</span><p>Science · Technology · Engineering · Management · Pharmacy</p></div></div></div><div><span class="eyebrow rv">Why Study in '+d.name+'?</span><h2 class="h-h2 rv" style="--d:.06s">Why study in <span class="serif">'+d.full+'</span></h2>'+d.why.map(function(p,i){return '<p class="h-p rv" style="--d:'+(.1+i*.04)+'s'+(i?';margin-top:12px':'')+'">'+p+'</p>'}).join('')+'<a class="btn btn-primary rv" href="contact.html" style="margin-top:30px">Talk to an expert '+icon('arrow')+'</a></div></div></section>';
@@ -665 +678 @@
-  h+=sec(shead('Get guidance','Discuss your education funding <span class="serif">with our team</span>',true),'<div class="pcta rv"><span class="eyebrow gold">Career Gyan</span><h2>Let’s plan your <span class="serif">next step</span></h2><p>Talk to our counsellors about your admission plan and the funding documents you may need.</p><div class="h-actions"><a class="btn btn-gold" href="#/contact">Talk to an expert '+icon('arrow')+'</a><a class="btn btn-glass" href="#/eligibility">Check Eligibility</a></div></div>');
+  h+=sec(shead('Get guidance','Discuss your education funding <span class="serif">with our team</span>',true),'<div class="pcta rv"><span class="eyebrow gold">Career Gyan</span><h2>Let’s plan your <span class="serif">next step</span></h2><p>Talk to our counsellors about your admission plan and the funding documents you may need.</p><div class="h-actions"><a class="btn btn-gold" href="contact.html">Talk to an expert '+icon('arrow')+'</a><a class="btn btn-glass" href="eligibility.html">Check Eligibility</a></div></div>');
@@ -671 +684 @@
-  h+='<section class="section"><div class="container h-why-grid"><div><span class="eyebrow rv">About the program</span><h2 class="h-h2 rv" style="--d:.06s">Build a global career in <span class="serif">STEM</span></h2><p class="h-p rv" style="--d:.1s">Pursuing higher education in Medical and STEM (Science, Technology, Engineering, and Mathematics) fields opens doors.</p><p class="h-p rv" style="--d:.14s;margin-top:12px">Our study abroad programs let you experience world-class education while exploring new cultures, with diverse destinations and full support from Career Gyan.</p><ul class="ticks rv" style="--d:.18s"><li>'+icon('check')+'World-class education</li><li>'+icon('check')+'Diverse destinations with full support</li><li>'+icon('check')+'Global perspectives and valuable skills</li></ul><a class="btn btn-primary rv" href="#/contact" style="margin-top:30px">Shortlist with an expert '+icon('arrow')+'</a></div><div class="h-collage"><div class="hc-main rv-img"><img src="'+UNS('1581091226033-d5c48150dbaa',1100)+'" alt="Engineering students in a workshop" loading="lazy"></div><div class="hc-side"><div class="hc-gold rv" style="--d:.15s"><b>15</b><span>Countries offering Engineering programs</span></div><div class="hc-small rv-img" style="--d:.25s"><img src="'+UNS('1606206873764-fd15e242df52',800)+'" alt="Robotic arm" loading="lazy"></div></div></div></div></section>';
+  h+='<section class="section"><div class="container h-why-grid"><div><span class="eyebrow rv">About the program</span><h2 class="h-h2 rv" style="--d:.06s">Build a global career in <span class="serif">STEM</span></h2><p class="h-p rv" style="--d:.1s">Pursuing higher education in Medical and STEM (Science, Technology, Engineering, and Mathematics) fields opens doors.</p><p class="h-p rv" style="--d:.14s;margin-top:12px">Our study abroad programs let you experience world-class education while exploring new cultures, with diverse destinations and full support from Career Gyan.</p><ul class="ticks rv" style="--d:.18s"><li>'+icon('check')+'World-class education</li><li>'+icon('check')+'Diverse destinations with full support</li><li>'+icon('check')+'Global perspectives and valuable skills</li></ul><a class="btn btn-primary rv" href="contact.html" style="margin-top:30px">Shortlist with an expert '+icon('arrow')+'</a></div><div class="h-collage"><div class="hc-main rv-img"><img decoding="async" src="'+UNS('1581091226033-d5c48150dbaa',1100)+'" alt="Engineering students in a workshop" loading="lazy"></div><div class="hc-side"><div class="hc-gold rv" style="--d:.15s"><b>15</b><span>Countries offering Engineering programs</span></div><div class="hc-small rv-img" style="--d:.25s"><img decoding="async" src="'+UNS('1606206873764-fd15e242df52',800)+'" alt="Robotic arm" loading="lazy"></div></div></div></div></section>';
@@ -685 +698 @@
-  h+='<section class="section h-why"><div class="container h-why-grid"><div class="h-collage"><div class="hc-main rv-img"><img src="'+UNS('1787043940937-4c6f89b92bdf',1100)+'" alt="Charminar, Hyderabad" loading="lazy"></div><div class="hc-side"><div class="hc-gold rv" style="--d:.15s"><b>5,000+</b><span>Students guided to admissions in top universities</span></div><div class="hc-small rv-img" style="--d:.25s"><img src="'+UNS('1573497620053-ea5300f94f21',800)+'" alt="Counselling session" loading="lazy"></div></div></div><div><span class="eyebrow rv">Career Gyan Hyderabad</span><h2 class="h-h2 rv" style="--d:.06s">Your partner for <span class="serif">global education</span></h2><p class="h-p rv" style="--d:.1s">Career Gyan, one of the top abroad education consultants in Hyderabad, is your go-to partner for global education success. With 11+ years of experience, 2,569+ university partnerships, and a 100% visa approval rate in the last intake, we are the #1 trusted consultancy with proven success stories.</p><p class="h-p rv" style="--d:.14s;margin-top:12px">We guide you through every step, from counselling and university shortlisting to application submission and visa processing, making your study abroad journey smooth, simple, and successful.</p><div class="trust-mini rv"><span>Membership</span><img src="'+IMG+'home/qualityabroad/EAIE.png" alt="EAIE"><img src="'+IMG+'home/qualityabroad/NAFSA.png" alt="NAFSA"><span>Accreditation</span><img src="'+IMG+'germany/logos/icef-accredited-logo.png" alt="ICEF"></div></div></div></section>';
+  h+='<section class="section h-why"><div class="container h-why-grid"><div class="h-collage"><div class="hc-main rv-img"><img decoding="async" src="'+UNS('1787043940937-4c6f89b92bdf',1100)+'" alt="Charminar, Hyderabad" loading="lazy"></div><div class="hc-side"><div class="hc-gold rv" style="--d:.15s"><b>5,000+</b><span>Students guided to admissions in top universities</span></div><div class="hc-small rv-img" style="--d:.25s"><img decoding="async" src="'+UNS('1573497620053-ea5300f94f21',800)+'" alt="Counselling session" loading="lazy"></div></div></div><div><span class="eyebrow rv">Career Gyan Hyderabad</span><h2 class="h-h2 rv" style="--d:.06s">Your partner for <span class="serif">global education</span></h2><p class="h-p rv" style="--d:.1s">Career Gyan, one of the top abroad education consultants in Hyderabad, is your go-to partner for global education success. With 11+ years of experience, 2,569+ university partnerships, and a 100% visa approval rate in the last intake, we are the #1 trusted consultancy with proven success stories.</p><p class="h-p rv" style="--d:.14s;margin-top:12px">We guide you through every step, from counselling and university shortlisting to application submission and visa processing, making your study abroad journey smooth, simple, and successful.</p><div class="trust-mini rv"><span>Membership</span><img decoding="async" src="'+IMG+'home/qualityabroad/EAIE.png" alt="EAIE member" loading="lazy"><img decoding="async" src="'+IMG+'home/qualityabroad/NAFSA.png" alt="NAFSA member" loading="lazy"><span>Accreditation</span><img decoding="async" src="'+IMG+'germany/logos/icef-accredited-logo.png" alt="ICEF accredited agency" loading="lazy"></div></div></div></section>';
@@ -687 +700 @@
-  h+=sec(shead('Why Does Career Gyan Stand Out?','Hyderabad\'s trusted <span class="serif">study abroad partner</span>',true),'<div class="why2">'+W.map(function(x,i){return '<article class="w2'+(i===0?' dark':'')+(i===4?' gold':'')+' rv" style="--d:'+(i*.06)+'s">'+(i===0?'<img class="w2-bg" src="'+UNS('1606761568499-6d2451b23c66',1100)+'" alt="" loading="lazy"><div>':'')+'<span class="hf-ic">'+icon(x[0])+'</span><h3>'+x[1]+'</h3><p>'+x[2]+'</p>'+(i===0?'</div>':'')+'</article>'}).join('')+'</div>','bg-soft');
+  h+=sec(shead('Why Does Career Gyan Stand Out?','Hyderabad\'s trusted <span class="serif">study abroad partner</span>',true),'<div class="why2">'+W.map(function(x,i){return '<article class="w2'+(i===0?' dark':'')+(i===4?' gold':'')+' rv" style="--d:'+(i*.06)+'s">'+(i===0?'<img decoding="async" class="w2-bg" src="'+UNS('1606761568499-6d2451b23c66',1100)+'" alt="" loading="lazy"><div>':'')+'<span class="hf-ic">'+icon(x[0])+'</span><h3>'+x[1]+'</h3><p>'+x[2]+'</p>'+(i===0?'</div>':'')+'</article>'}).join('')+'</div>','bg-soft');
@@ -790 +803 @@
-  h+='<section class="section"><div class="container h-why-grid"><div><span class="eyebrow rv">About the program</span><h2 class="h-h2 rv" style="--d:.06s">'+d.h+'</h2>'+d.p.map(function(t,i){return '<p class="h-p rv" style="--d:'+(.1+i*.04)+'s'+(i?';margin-top:12px':'')+'">'+t+'</p>'}).join('')+'<ul class="ticks rv" style="--d:.18s">'+d.ticks.map(function(t){return '<li>'+icon('check')+t+'</li>'}).join('')+'</ul><a class="btn btn-primary rv" href="#/contact" style="margin-top:30px">Shortlist with an expert '+icon('arrow')+'</a></div><div class="h-collage"><div class="hc-main rv-img"><img src="'+UNS(BANNER[slug],1100)+'" alt="Study '+d.n+' abroad" loading="lazy"></div><div class="hc-side"><div class="hc-gold rv" style="--d:.15s"><b>2569+</b><span>Partnered universities to choose from</span></div><div class="hc-small rv-img" style="--d:.25s"><img src="'+UNS('1573497620053-ea5300f94f21',800)+'" alt="Counselling session" loading="lazy"></div></div></div></div></section>';
+  h+='<section class="section"><div class="container h-why-grid"><div><span class="eyebrow rv">About the program</span><h2 class="h-h2 rv" style="--d:.06s">'+d.h+'</h2>'+d.p.map(function(t,i){return '<p class="h-p rv" style="--d:'+(.1+i*.04)+'s'+(i?';margin-top:12px':'')+'">'+t+'</p>'}).join('')+'<ul class="ticks rv" style="--d:.18s">'+d.ticks.map(function(t){return '<li>'+icon('check')+t+'</li>'}).join('')+'</ul><a class="btn btn-primary rv" href="contact.html" style="margin-top:30px">Shortlist with an expert '+icon('arrow')+'</a></div><div class="h-collage"><div class="hc-main rv-img"><img decoding="async" src="'+UNS(BANNER[slug],1100)+'" alt="Study '+d.n+' abroad" loading="lazy"></div><div class="hc-side"><div class="hc-gold rv" style="--d:.15s"><b>2569+</b><span>Partnered universities to choose from</span></div><div class="hc-small rv-img" style="--d:.25s"><img decoding="async" src="'+UNS('1573497620053-ea5300f94f21',800)+'" alt="Counselling session" loading="lazy"></div></div></div></div></section>';
@@ -806,2 +819,2 @@
-  h+='<section class="section h-why"><div class="container h-why-grid"><div class="h-collage"><div class="hc-main rv-img"><img src="'+UNS(BANNER[d.img],1100)+'" alt="'+d.alt+'" loading="lazy"></div><div class="hc-side"><div class="hc-gold rv" style="--d:.15s"><b>'+d.stat[0]+'</b><span>'+d.stat[1]+'</span></div><div class="hc-small rv-img" style="--d:.25s"><img src="'+UNS('1573497620053-ea5300f94f21',800)+'" alt="Counselling session" loading="lazy"></div></div></div><div><span class="eyebrow rv">'+d.eb+'</span><h2 class="h-h2 rv" style="--d:.06s">'+d.ah+'</h2>'+d.p.map(function(t,i){return '<p class="h-p rv" style="--d:'+(.1+i*.04)+'s'+(i?';margin-top:12px':'')+'">'+t+'</p>'}).join('')+'<div class="trust-mini rv"><span>Membership</span><img src="'+IMG+'home/qualityabroad/EAIE.png" alt="EAIE"><img src="'+IMG+'home/qualityabroad/NAFSA.png" alt="NAFSA"><span>Accreditation</span><img src="'+IMG+'germany/logos/icef-accredited-logo.png" alt="ICEF"></div>'+(d.link?'<a class="btn btn-primary rv" href="#/country/'+d.link[0]+'" style="margin-top:26px">'+d.link[1]+' '+icon('arrow')+'</a>':'')+'</div></div></section>';
-  h+=sec(shead('Why Does Career Gyan Stand Out?',d.n+'\'s trusted <span class="serif">study abroad partner</span>',true),'<div class="why2">'+d.why.map(function(x,i){return '<article class="w2'+(i===0?' dark':'')+(i===4?' gold':'')+' rv" style="--d:'+(i*.06)+'s">'+(i===0?'<img class="w2-bg" src="'+UNS('1606761568499-6d2451b23c66',1100)+'" alt="" loading="lazy"><div>':'')+'<span class="hf-ic">'+icon(x[0])+'</span><h3>'+x[1]+'</h3><p>'+x[2]+'</p>'+(i===0?'</div>':'')+'</article>'}).join('')+'</div>','bg-soft');
+  h+='<section class="section h-why"><div class="container h-why-grid"><div class="h-collage"><div class="hc-main rv-img"><img decoding="async" src="'+UNS(BANNER[d.img],1100)+'" alt="'+d.alt+'" loading="lazy"></div><div class="hc-side"><div class="hc-gold rv" style="--d:.15s"><b>'+d.stat[0]+'</b><span>'+d.stat[1]+'</span></div><div class="hc-small rv-img" style="--d:.25s"><img decoding="async" src="'+UNS('1573497620053-ea5300f94f21',800)+'" alt="Counselling session" loading="lazy"></div></div></div><div><span class="eyebrow rv">'+d.eb+'</span><h2 class="h-h2 rv" style="--d:.06s">'+d.ah+'</h2>'+d.p.map(function(t,i){return '<p class="h-p rv" style="--d:'+(.1+i*.04)+'s'+(i?';margin-top:12px':'')+'">'+t+'</p>'}).join('')+'<div class="trust-mini rv"><span>Membership</span><img decoding="async" src="'+IMG+'home/qualityabroad/EAIE.png" alt="EAIE member" loading="lazy"><img decoding="async" src="'+IMG+'home/qualityabroad/NAFSA.png" alt="NAFSA member" loading="lazy"><span>Accreditation</span><img decoding="async" src="'+IMG+'germany/logos/icef-accredited-logo.png" alt="ICEF accredited agency" loading="lazy"></div>'+(d.link?'<a class="btn btn-primary rv" href="study-in-'+d.link[0]+'.html" style="margin-top:26px">'+d.link[1]+' '+icon('arrow')+'</a>':'')+'</div></div></section>';
+  h+=sec(shead('Why Does Career Gyan Stand Out?',d.n+'\'s trusted <span class="serif">study abroad partner</span>',true),'<div class="why2">'+d.why.map(function(x,i){return '<article class="w2'+(i===0?' dark':'')+(i===4?' gold':'')+' rv" style="--d:'+(i*.06)+'s">'+(i===0?'<img decoding="async" class="w2-bg" src="'+UNS('1606761568499-6d2451b23c66',1100)+'" alt="" loading="lazy"><div>':'')+'<span class="hf-ic">'+icon(x[0])+'</span><h3>'+x[1]+'</h3><p>'+x[2]+'</p>'+(i===0?'</div>':'')+'</article>'}).join('')+'</div>','bg-soft');
@@ -823 +836 @@
-window.addEventListener('scroll',function(){var y=window.pageYOffset;if(y>900)return;$$('.page.active .ihero .bg').forEach(function(el){el.style.translate='0 '+(y*0.28)+'px'})},{passive:true});
+var pxT=0;window.addEventListener('scroll',function(){if(pxT)return;pxT=requestAnimationFrame(function(){pxT=0;var y=window.pageYOffset;if(y>900)return;$$('.page.active .ihero .bg').forEach(function(el){el.style.translate='0 '+(y*0.28)+'px'})})},{passive:true});
@@ -827 +840 @@
-var EL_A={},EL_H=[],EL_CUR=null,EL_DONE=false;
+var EL_A={},EL_H=[],EL_CUR=null,EL_DONE=false,EL_REVIEWED=false;
@@ -917 +930 @@
-function elEnd(){EL_DONE=true;elRender()}
+function elEnd(){EL_DONE='review';elRender()}
@@ -919,0 +933 @@
+  if(EL_DONE==='review'){EL_REVIEWED=true;elReview(body,foot,bar,cnt);return}
@@ -926,3 +940,3 @@
-    body.innerHTML='<div class="el-res"><span class="ok">'+icon('check')+'</span><h3>Thank you, '+nm+'!</h3><p>Your details are ready. Send your profile to Career Gyan, or call us to get your eligibility result and personalised guidance.</p><div class="el-sum">'+rows.map(function(r){return '<div><span>'+esc(r[0])+'</span><b>'+esc(r[1])+'</b></div>'}).join('')+'</div><div class="acts"><a class="btn btn-primary" href="mailto:enquiry@careergyan.co?subject='+encodeURIComponent('Eligibility check – '+(EL_A.name||''))+'&body='+encodeURIComponent(txt)+'">Email my profile '+icon('arrow')+'</a><a class="btn btn-gold" target="_blank" rel="noopener" href="https://api.whatsapp.com/send?phone=919686898888&text='+encodeURIComponent(txt)+'">Send on WhatsApp '+icon('arrow')+'</a><a class="btn btn-outline-blue" href="tel:+919686898888">'+icon('phone')+' +91 9686898888</a></div></div>';
-    foot.innerHTML='<button class="el-link" id="elBack2">← Back</button><span class="sp"></span><button class="el-link" id="elRestart2">Restart</button>';
-    $('#elBack2').onclick=function(){EL_DONE=false;elRender()};
+    body.innerHTML='<div class="el-res"><span class="ok">'+icon('check')+'</span><h3>Thank you, '+nm+'!</h3><p>'+(EL_SAVED?'Your details have been sent to Career Gyan. A counsellor will contact you with personalised guidance.':'Your details are ready. Send your profile to Career Gyan, or call us to get your eligibility result and personalised guidance.')+'</p>'+elResultHTML()+'<div class="el-sum">'+rows.map(function(r){return '<div><span>'+esc(r[0])+'</span><b>'+esc(r[1])+'</b></div>'}).join('')+'</div><div class="acts"><a class="btn btn-primary" href="mailto:enquiry@careergyan.co?subject='+encodeURIComponent('Eligibility check – '+(EL_A.name||''))+'&body='+encodeURIComponent(txt)+'">Email my profile '+icon('arrow')+'</a><a class="btn btn-gold" target="_blank" rel="noopener" href="https://api.whatsapp.com/send?phone=919686898888&text='+encodeURIComponent(txt)+'">Send on WhatsApp '+icon('arrow')+'</a><a class="btn btn-outline-blue" href="tel:+919686898888">'+icon('phone')+' +91 9686898888</a></div></div>';
+    foot.innerHTML='<button class="el-link" id="elBack2">← Edit answers</button><span class="sp"></span><button class="el-link" id="elRestart2">Restart</button>';
+    $('#elBack2').onclick=function(){EL_DONE='review';elRender()};
@@ -942,2 +956,2 @@
-  body.innerHTML=(s.img?'<div class="el-img"><img src="'+EL_B+s.img+'" alt="" onerror="var b=this.closest(\'.el-body\');if(b){b.classList.add(\'noimg\');this.parentNode.remove()}"></div>':'')+'<div class="el-q"><h3>'+esc(s.q)+'</h3>'+inp+'<p class="el-err" id="elErr" role="alert"></p></div>';
-  foot.innerHTML='<button class="el-link" id="elBack"'+(EL_H.length?'':' disabled')+'>← Back</button><button class="el-link" id="elClear">Clear selection</button><span class="sp"></span><button class="el-link" id="elRestart">Restart</button><button class="btn btn-primary btn-sm" id="elNext">'+(idx===vis.length-1?'Finish':'Next')+' '+icon('arrow')+'</button>';
+  body.innerHTML=(s.img?'<div class="el-img"><img decoding="async" src="'+EL_B+s.img+'" alt="" onerror="var b=this.closest(\'.el-body\');if(b){b.classList.add(\'noimg\');this.parentNode.remove()}"></div>':'')+'<div class="el-q"><h3>'+esc(s.q)+'</h3>'+inp+'<p class="el-err" id="elErr" role="alert"></p></div>';
+  foot.innerHTML='<button class="el-link" id="elClear">Clear selection</button><button class="el-link" id="elRestart">Restart</button>'+(EL_REVIEWED?'<button class="el-link" id="elToReview">Back to review</button>':'')+'<span class="sp"></span><button class="btn btn-outline-blue btn-sm" id="elBack"'+(EL_H.length?'':' disabled')+'>← Previous</button><button class="btn btn-primary btn-sm" id="elNext">'+(idx===vis.length-1?'Review answers':'Next')+' '+icon('arrow')+'</button>';
@@ -949 +963 @@
-    else{EL_A[s.id]=v;$$('.el-opt',body).forEach(function(x){var on=x===b;x.classList.toggle('on',on);x.setAttribute('aria-pressed',on)});setTimeout(function(){if(EL_CUR===s.id&&!EL_DONE)elNext()},260)}
+    else{EL_A[s.id]=v;$('#elErr').textContent='';$$('.el-opt',body).forEach(function(x){var on=x===b;x.classList.toggle('on',on);x.setAttribute('aria-pressed',on)})}
@@ -966 +980 @@
-function elRestart(){EL_A={};EL_H=[];EL_DONE=false;EL_CUR=elVis()[0].id;elRender()}
+function elRestart(){EL_A={};EL_H=[];EL_DONE=false;EL_REVIEWED=false;EL_SAVED=null;EL_CUR=elVis()[0].id;elRender()}
@@ -970,0 +985 @@
+  if(!$('#eligibilityPage'))return; /* MPA page guard */
@@ -973,2 +988,2 @@
-  var h='<div class="ihero"><img class="bg" src="'+UNS('1759784839707-a32c910a7747',2000)+'" alt=""><div class="container ihero-grid"><div><nav class="crumbs rv"><a href="#/">Home</a>'+icon('right')+'<span>Eligibility Checker</span></nav><h1 class="rv" style="--d:.06s">Study abroad eligibility at your fingertips</h1><p class="h-lead rv" style="--d:.12s">Online AI Based Abroad Education Eligibility Checker assesses your eligibility for studying abroad based on your education and Personal preferences.</p><div class="h-actions rv" style="--d:.18s"><a class="btn btn-gold" href="#chat1" data-scroll>Check Your Eligibility Now '+icon('arrow')+'</a></div></div><div class="glass rv" style="--d:.2s"><div class="glass-h"><span>Career Gyan</span>'+icon('phone')+'</div><a class="glass-line" href="tel:+919686898888">'+icon('phone')+'+91 9686898888</a></div></div></div>';
-  h+='<div class="container h-stats-wrap"><div class="el-feats">'+[['Countries-Icon-3.png','Countries','Explore the best-fit country for pursuing your abroad education dreams'],['Colleges-Icon-2.png','Colleges','Explore the ideal institution<br>that is well suited for your educational goals'],['Courses-Icon-3.png','Courses','Explore the ideal program tailored to your specific field of interest and professional goals.']].map(function(f,i){return '<div class="el-feat rv" style="--d:'+(i*.08)+'s"><div class="ei"><img src="'+U+'2023/05/'+f[0]+'" alt="'+f[1]+'" loading="lazy"></div><h3>'+f[1]+'</h3><p>'+f[2]+'</p></div>'}).join('')+'</div></div>';
+  var h='<div class="ihero"><img decoding="async" class="bg" src="'+UNS('1759784839707-a32c910a7747',2000)+'"'+HSET(UNS('1759784839707-a32c910a7747',2000))+' alt="Study abroad eligibility checker" fetchpriority="high"><div class="container ihero-grid"><div><nav class="crumbs rv"><a href="index.html">Home</a>'+icon('right')+'<span>Eligibility Checker</span></nav><h1 class="rv" style="--d:.06s">Study abroad eligibility at your fingertips</h1><p class="h-lead rv" style="--d:.12s">Online AI Based Abroad Education Eligibility Checker assesses your eligibility for studying abroad based on your education and Personal preferences.</p><div class="h-actions rv" style="--d:.18s"><a class="btn btn-gold" href="#chat1" data-scroll>Check Your Eligibility Now '+icon('arrow')+'</a></div></div><div class="glass rv" style="--d:.2s"><div class="glass-h"><span>Career Gyan</span>'+icon('phone')+'</div><a class="glass-line" href="tel:+919686898888">'+icon('phone')+'+91 9686898888</a></div></div></div>';
+  h+='<div class="container h-stats-wrap"><div class="el-feats">'+[['Countries-Icon-3.png','Countries','Explore the best-fit country for pursuing your abroad education dreams'],['Colleges-Icon-2.png','Colleges','Explore the ideal institution<br>that is well suited for your educational goals'],['Courses-Icon-3.png','Courses','Explore the ideal program tailored to your specific field of interest and professional goals.']].map(function(f,i){return '<div class="el-feat rv" style="--d:'+(i*.08)+'s"><div class="ei"><img decoding="async" src="'+U+'2023/05/'+f[0]+'" alt="'+f[1]+'" loading="lazy"></div><h3>'+f[1]+'</h3><p>'+f[2]+'</p></div>'}).join('')+'</div></div>';
@@ -976,2 +991,2 @@
-  h+='<section class="section bg-soft"><div class="container el-how"><div><span class="eyebrow rv">Process</span><h2 class="h-h2 rv" style="--d:.06s">How it Works</h2><p class="lead rv" style="--d:.1s;margin-top:14px">The AI eligibility checker assesses education, residence, study country, level, field, and preferred programs to determine study abroad eligibility</p><div class="el-steps">'+[['AI Checker','Visit Career Gyan AI Checker'],['Data Feed','Give all the Information Asked'],['Get Your result','Get all your Result Instant']].map(function(s,i){return '<div class="el-st rv" style="--d:'+(.12+i*.07)+'s"><span class="n">'+(i+1)+'</span><div><h3>'+s[0]+'</h3><p>'+s[1]+'</p></div></div>'}).join('')+'</div></div><button class="el-vid rv" type="button" data-yt="PbY8SHFqqNw" aria-label="Play video"><img src="'+U+'2021/10/work1.jpg" alt="" loading="lazy" onerror="this.src=\'https://img.youtube.com/vi/PbY8SHFqqNw/hqdefault.jpg\'"><span class="pl">'+icon('play')+'</span></button></div></section>';
-  h+='<section class="section"><div class="container"><div class="el-tst rv"><img class="bg" src="'+U+'2023/05/Career-Gyan-Banner-4.webp" alt="" loading="lazy" onerror="this.style.display=\'none\'"><div class="el-tst-grid"><div><span class="eyebrow gold">Testimonials</span><h2>How Are Our Client\'s Thanks Us About Our Services</h2><p>This should be used to tell a story and let your users know a little more<br>about your product or service. How can you benefit them?</p><div class="el-stats"><div><b data-count="97.7%">97.7%</b></div><div><b data-count="100+">100+</b><span>Countries</span></div><div><b data-count="10000+">10000+</b><span>Users</span></div></div></div><button class="el-vid" type="button" data-yt="1iIZeIy7TqM" aria-label="Play video" style="aspect-ratio:16/11"><img src="'+U+'2023/05/Career-Gyan-Banner-3.webp" alt="" loading="lazy"><span class="pl">'+icon('play')+'</span></button></div></div></div></section>';
+  h+='<section class="section bg-soft"><div class="container el-how"><div><span class="eyebrow rv">Process</span><h2 class="h-h2 rv" style="--d:.06s">How it Works</h2><p class="lead rv" style="--d:.1s;margin-top:14px">The AI eligibility checker assesses education, residence, study country, level, field, and preferred programs to determine study abroad eligibility</p><div class="el-steps">'+[['AI Checker','Visit Career Gyan AI Checker'],['Data Feed','Give all the Information Asked'],['Get Your result','Get all your Result Instant']].map(function(s,i){return '<div class="el-st rv" style="--d:'+(.12+i*.07)+'s"><span class="n">'+(i+1)+'</span><div><h3>'+s[0]+'</h3><p>'+s[1]+'</p></div></div>'}).join('')+'</div></div><button class="el-vid rv" type="button" data-yt="PbY8SHFqqNw" aria-label="Play video"><img decoding="async" src="'+U+'2021/10/work1.jpg" alt="" loading="lazy" onerror="this.src=\'https://img.youtube.com/vi/PbY8SHFqqNw/hqdefault.jpg\'"><span class="pl">'+icon('play')+'</span></button></div></section>';
+  h+='<section class="section"><div class="container"><div class="el-tst rv"><img decoding="async" class="bg" src="'+U+'2023/05/Career-Gyan-Banner-4.webp" alt="" loading="lazy" onerror="this.style.display=\'none\'"><div class="el-tst-grid"><div><span class="eyebrow gold">Testimonials</span><h2>How Are Our Client\'s Thanks Us About Our Services</h2><p>This should be used to tell a story and let your users know a little more<br>about your product or service. How can you benefit them?</p><div class="el-stats"><div><b data-count="97.7%">97.7%</b></div><div><b data-count="100+">100+</b><span>Countries</span></div><div><b data-count="10000+">10000+</b><span>Users</span></div></div></div><button class="el-vid" type="button" data-yt="1iIZeIy7TqM" aria-label="Play video" style="aspect-ratio:16/11"><img decoding="async" src="'+U+'2023/05/Career-Gyan-Banner-3.webp" alt="" loading="lazy"><span class="pl">'+icon('play')+'</span></button></div></div></div></section>';
@@ -998 +1013 @@
-var OFF_PAGE={bangalore:['#/locations/bangalore','Career Gyan Bangalore'],hyderabad:['#/location/hyderabad','Career Gyan Hyderabad'],pune:['#/location/pune','Career Gyan Pune'],davanagere:['#/location/davanagere','Career Gyan Davanagere'],germany:['#/location/germany','Career Gyan Germany']};
+var OFF_PAGE={bangalore:['abroad-education-consultants-in-bangalore.html','Career Gyan Bangalore'],hyderabad:['abroad-education-consultants-in-hyderabad.html','Career Gyan Hyderabad'],pune:['abroad-education-consultants-in-pune.html','Career Gyan Pune'],davanagere:['abroad-education-consultants-in-davanagere.html','Career Gyan Davanagere'],germany:['study-abroad-consultants-in-germany.html','Career Gyan Germany']};
@@ -1030 +1045 @@
-  Q.push(['How can Career Gyan help me study in '+n+'?','We support you end to end: counselling, university shortlisting, SOP, LOR and LOM (Letter of Motivation) support, application submission, visa preparation, education loans and pre-departure guidance. <a href="#/contact">Book a free counselling session</a> to get started.']);
+  Q.push(['How can Career Gyan help me study in '+n+'?','We support you end to end: counselling, university shortlisting, SOP, LOR and LOM (Letter of Motivation) support, application submission, visa preparation, education loans and pre-departure guidance. <a href="contact.html">Book a free counselling session</a> to get started.']);
@@ -1106 +1121 @@
-    ['Can Career Gyan help with scholarships and financial aid?','Yes. We help students identify and apply for scholarships and financial aid, and guide you in presenting a strong application. See our <a href="#/student-loan">Student Loan</a> page for funding support.']
+    ['Can Career Gyan help with scholarships and financial aid?','Yes. We help students identify and apply for scholarships and financial aid, and guide you in presenting a strong application. See our <a href="student-loan.html">Student Loan</a> page for funding support.']
@@ -1130 +1145 @@
-    '<div class="evpop-img"><span class="bgblur" style="background-image:url(\''+src+'\')"></span><img src="'+src+'" alt="'+esc(e.t)+'"></div>'+
+    '<div class="evpop-img"><span class="bgblur" style="background-image:url(\''+src+'\')"></span><img decoding="async" src="'+src+'" alt="'+esc(e.t)+'"></div>'+
@@ -1133 +1148 @@
-    '<div class="evpop-act"><a class="btn btn-gold" href="'+eventUrl+'">'+(e.page?'Register for this workshop':(pick.upcoming?'Register now':'Enquire about upcoming events'))+' '+icon('arrow')+'</a><a class="btn btn-ghost" href="#/workshop">All workshops &amp; events</a></div></div></div>';
+    '<div class="evpop-act"><a class="btn btn-gold" href="'+eventUrl+'">'+(e.page?'Register for this workshop':(pick.upcoming?'Register now':'Enquire about upcoming events'))+' '+icon('arrow')+'</a><a class="btn btn-ghost" href="workshops.html">All workshops &amp; events</a></div></div></div>';
@@ -1142 +1157 @@
-  var h=location.hash.replace(/^#\/?/,'');
+  var h=document.body.getAttribute('data-route')||'';
@@ -1147,0 +1163,105 @@
+
+/* =====================================================================
+   ADDED (2026-11-11): Supabase saving for the enquiry forms + eligibility
+   checker (review step, Next/Previous on every question, budget results)
+   ===================================================================== */
+/* --- Supabase: same project as the workshop registration page --- */
+var CG_SUPABASE_URL='https://veovdcqtyrbakyednkvr.supabase.co';
+var CG_SUPABASE_KEY='sb_publishable_RvXX8tPrW-Dpq1JzXo_1Yg_eE36VuDR';
+function cgInsert(table,row){
+  return fetch(CG_SUPABASE_URL+'/rest/v1/'+table,{method:'POST',headers:{'Content-Type':'application/json','apikey':CG_SUPABASE_KEY,'Prefer':'return=minimal'},body:JSON.stringify(row)})
+    .then(function(r){if(!r.ok)return r.text().then(function(t){throw new Error('Supabase '+r.status+': '+t)});return true});
+}
+/* enquiry forms (home "Book a free counselling session" + contact page): save to table "enquiries".
+   If saving fails, fall back to the original behaviour (open the visitor's email app). */
+function cgSendEnquiry(form,note,mailto){
+  var v=function(n){var f=form.querySelector('[name="'+n+'"]');return f&&f.value.trim()?f.value.trim():null};
+  var row={source:form.id==='homeForm'?'home':'contact',full_name:v('Full Name'),email:v('Email ID'),phone:v('Phone Number'),city:v('Current City'),
+    destination:v('Preferred Study Destination'),course:v('Course'),intake_month:v('Planned Month'),intake_year:v('Preferred Year'),message:v('Message'),page_url:location.href.slice(0,500)};
+  var btn=form.querySelector('[type="submit"]');if(btn)btn.disabled=true;
+  note.textContent='Sending your enquiry…';note.classList.add('show');
+  cgInsert('enquiries',row).then(function(){
+    form.reset();
+    note.innerHTML='Thank you! Your enquiry has been received. A Career Gyan counsellor will contact you shortly. You can also call <a href="tel:+919606868888">+91 96068 68888</a>.';
+  }).catch(function(err){
+    try{console.warn(err)}catch(x){}
+    window.location.href=mailto;
+    note.innerHTML='Thank you! Your email app has opened with your enquiry addressed to <b>enquiry@careergyan.co</b> — just press send. You can also call <a href="tel:+919606868888">+91 96068 68888</a>.';
+  }).then(function(){if(btn)btn.disabled=false});
+}
+
+/* --- Eligibility: budget -> countries shown on the result screen ---
+   EDIT THIS LIST to match your counselling policy. Each budget shows its own countries plus all cheaper tiers.
+   Keys are the site's country pages (study-in-<key>.html); 'estonia' / 'slovakia' have no page and show as plain chips. */
+var EL_BUDGET_TIERS=[
+  ['10 Lacs to 20 Lacs',['germany','france','italy','poland','hungary','latvia','lithuania','romania','estonia','slovakia']],
+  ['21 Lacs to 30 Lacs',['spain','finland','sweden','netherlands','ireland']],
+  ['31 Lacs to 40 Lacs',['new-zealand','canada','uk']],
+  ['41 Lacs to 50 Lacs',['australia']],
+  ['51 Lacs to 65 Lacs',['usa']],
+  ['65 Lacs+',[]]
+];
+/* Shown when the student answers "No" to "Do you wish to explore opportunities abroad?" (text from the original checker). */
+var EL_NO_ABROAD_MSG='We Are Also Specialized In Exploring New Opportunities To Study Abroad. Continue With The Option, Yes To Mentor You With Ample Countries To Study Abroad.';
+var EL_CONTACTS=[['Bangalore','+91 9686898888'],['Davanagere','+91 9964757666'],['Mangalore','']]; /* TODO: add the Mangalore number */
+var EL_EXTRA={estonia:['Estonia','ee'],slovakia:['Slovakia','sk']};
+var EL_PICK_MAP={usa:'usa',uk:'uk',canada:'canada',germany:'germany',france:'france',italy:'italy',irland:'ireland',ireland:'ireland',aus:'australia',hungary:'hungary',latvia:'latvia',lithuania:'lithuania',estonia:'estonia',slovakia:'slovakia'};
+var EL_SAVED=null;
+function elBudgetCountries(b){var out=[];for(var i=0;i<EL_BUDGET_TIERS.length;i++){out=out.concat(EL_BUDGET_TIERS[i][1]);if(EL_BUDGET_TIERS[i][0]===b)return out}return []}
+function elPicks(){var a=[].concat(EL_A.hint||[],EL_A.mc3||[],EL_A.mc2||[],EL_A.mc1?[EL_A.mc1]:[]);return a.map(function(x){return EL_PICK_MAP[String(x).toLowerCase()]}).filter(function(x,i,arr){return x&&arr.indexOf(x)===i})}
+function elCountryChip(k,pick){
+  var ex=EL_EXTRA[k],name=ex?ex[0]:cname(k),code=ex?ex[1]:iso(k);
+  var inner='<img decoding="async" src="https://flagcdn.com/w80/'+code+'.png" alt="" style="width:22px;height:22px;border-radius:50%;object-fit:cover">'+name+(pick?' <span class="el-pick">Your pick</span>':'');
+  return ex?'<span class="el-chip'+(pick?' pref':'')+'">'+inner+'</span>':'<a class="'+(pick?'pref':'')+'" href="study-in-'+k+'.html">'+inner+'</a>';
+}
+function elContactsHTML(){return '<div class="el-contacts"><h4>You can Contact us:</h4>'+EL_CONTACTS.filter(function(c){return c[1]}).map(function(c){return '<p><b>'+c[0]+':</b> <a href="tel:'+c[1].replace(/\s/g,'')+'">'+c[1]+'</a></p>'}).join('')+'<p><b>Email :</b> <a href="mailto:enquiry@careergyan.co">enquiry@careergyan.co</a></p></div>'}
+function elResultHTML(){
+  if(EL_A.explore==='No'||!EL_A.degree||EL_A.degree==='P.hd')return '<div class="el-out"><p class="el-msg">'+esc(EL_NO_ABROAD_MSG)+'</p>'+elContactsHTML()+'</div>';
+  var b=EL_A.bbud||EL_A.mbud;if(!b)return '';
+  var list=elBudgetCountries(b),picks=elPicks(),over=picks.filter(function(k){return list.indexOf(k)<0});
+  list=picks.filter(function(k){return list.indexOf(k)>-1}).concat(list.filter(function(k){return picks.indexOf(k)<0}));
+  return '<div class="el-out"><span class="eyebrow both">Your result</span><h4>Countries you can study in with a budget of '+esc(b)+'</h4>'+
+    '<div class="other-courses el-cty">'+list.map(function(k){return elCountryChip(k,picks.indexOf(k)>-1)}).join('')+'</div>'+
+    (over.length?'<p class="el-note">Above this budget: '+over.map(function(k){return EL_EXTRA[k]?EL_EXTRA[k][0]:cname(k)}).join(', ')+'. Talk to us about scholarships and education loans.</p>':'')+
+    '<p class="el-note">* Indicative, based on typical total cost (tuition + living). Your counsellor will confirm options for your profile and course.</p></div>';
+}
+function elMissing(){var vis=elVis();for(var i=0;i<vis.length;i++){var s=vis[i],v=EL_A[s.id];if(!s.opt&&(!v||(Array.isArray(v)&&!v.length)))return s}return null}
+function elGoTo(id){var ids=elVis().map(function(x){return x.id});EL_H=ids.slice(0,Math.max(0,ids.indexOf(id)));EL_CUR=id;EL_DONE=false;elRender();elScroll()}
+function elReview(body,foot,bar,cnt){
+  bar.style.width='100%';cnt.textContent='Review your answers';body.className='el-body noimg';
+  body.innerHTML='<div class="el-res el-rev"><h3>Check your answers</h3><p>Review your details below. Use “Edit” to change any answer, then submit.</p><div class="el-sum">'+
+    elVis().map(function(s){var v=EL_A[s.id],t=(v&&(!Array.isArray(v)||v.length))?(Array.isArray(v)?v.join(', '):v):'—';return '<div><span>'+esc(s.q.replace(/\s*\*+\s*$/,'').replace(/\n/g,' '))+'</span><b>'+esc(t)+'</b><button type="button" class="el-link el-edit" data-id="'+s.id+'">Edit</button></div>'}).join('')+
+    '</div><p class="el-err" id="elErr" role="alert"></p></div>';
+  foot.innerHTML='<button class="el-link" id="elRestart">Restart</button><span class="sp"></span><button class="btn btn-outline-blue btn-sm" id="elBack">← Previous</button><button class="btn btn-primary btn-sm" id="elSubmit">Submit '+icon('arrow')+'</button>';
+  $('#elRestart').onclick=elRestart;
+  $('#elBack').onclick=function(){EL_DONE=false;if(EL_H.length&&EL_H[EL_H.length-1]===EL_CUR)EL_H.pop();elRender()};
+  $$('.el-edit',body).forEach(function(b){b.onclick=function(){elGoTo(b.getAttribute('data-id'))}});
+  $('#elSubmit').onclick=function(){
+    var miss=elMissing();if(miss){elGoTo(miss.id);$('#elErr').textContent='Please answer this question to continue.';return}
+    var btn=this;btn.disabled=true;btn.textContent='Submitting…';
+    var vis=elVis(),answers={};vis.forEach(function(s){var v=EL_A[s.id];if(v&&(!Array.isArray(v)||v.length))answers[s.q.replace(/\s*\*+\s*$/,'').replace(/\n/g,' ')]=v});
+    var b=EL_A.bbud||EL_A.mbud||null;
+    cgInsert('eligibility_submissions',{full_name:EL_A.name||null,email:EL_A.email||null,phone:EL_A.phone||null,referral_code:EL_A.ref||null,city:EL_A.city||null,
+      explore_abroad:EL_A.explore||null,degree:EL_A.degree||null,budget:b,preferred_countries:elPicks(),suggested_countries:b?elBudgetCountries(b):[],answers:answers,page_url:location.href.slice(0,500)})
+      .then(function(){EL_SAVED=true}).catch(function(e){EL_SAVED=false;try{console.warn(e)}catch(x){}})
+      .then(function(){EL_DONE=true;elRender();elScroll()});
+  };
+}
+/* "Back to review" shortcut while editing an answer */
+document.addEventListener('click',function(e){
+  if(!e.target.closest('#elToReview'))return;
+  var s=elStep(EL_CUR),ie=$('#elIn');if(ie)EL_A[s.id]=ie.value.trim();
+  EL_DONE='review';elRender();elScroll();
+});
+
+/* --- performance + image SEO helpers (2026-11-11) --- */
+/* Responsive sizes for Unsplash hero/CTA photos: phones download a smaller file, desktop is unchanged. */
+function HSET(u,cta){if(!/images\.unsplash\.com\/.*[?&]w=\d+/.test(u))return '';var w=+u.match(/[?&]w=(\d+)/)[1];var s=[800,1400].filter(function(x){return x<w}).map(function(x){return u.replace(/([?&]w=)\d+/,'$1'+x)+' '+x+'w'}).concat([u+' '+w+'w']).join(', ');return ' srcset="'+s+'" sizes="'+(cta?'(max-width:1240px) 100vw, 1200px':'100vw')+'"'}
+/* Descriptive alt text for partner logos (was the file name). */
+var PARTNER_ALT={summit:'Summit – Career Gyan partner',ielts:'IELTS – English test partner',roombae:'Roombae – student accommodation partner',ets:'ETS (TOEFL & GRE) – test partner','buy-exchange':'BuyExchange – forex partner',universities_living:'Universities Living – student housing partner',Coracle:'Coracle – test preparation partner',Expatrio:'Expatrio – blocked account partner',Fintiba:'Fintiba – blocked account partner',Avanse:'Avanse – education loan partner'};
+function PALT(p){var k=p.split('.')[0];return PARTNER_ALT[k]||k.replace(/_|-/g,' ')}
+/* Pause decorative CSS animations (glows, spinning rings, marquees, floating cards) while their section is off-screen. */
+(function(){if(!('IntersectionObserver' in window))return;var o=new IntersectionObserver(function(es){es.forEach(function(e){e.target.classList.toggle('cg-off',!e.isIntersecting)})},{rootMargin:'250px 0px'});
+  function watch(){$$('.hx-sec,.h-hero,.ihero,.section,.footer,.hx-partners,.h-partners').forEach(function(el){if(!el.__cgw){el.__cgw=1;o.observe(el)}})}
+  setTimeout(watch,0);window.addEventListener('load',watch);})();
+
@@ -1150 +1269,0 @@
-window.addEventListener('hashchange',route);
@@ -1158 +1277 @@
-  var PAGE='workshop-registration.html';
+  var PAGE='workshops/workshop-registration.html';
```

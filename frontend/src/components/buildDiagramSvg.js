/**
 * Builds the SVG markup for the layered services diagram on the About page.
 * Pure function (no DOM access), so it can run on the server and the client with identical output.
 * Colours match the site: violet (AI, RAG & data), sky blue (Web & product), coral (Marketing & growth).
 */
export function buildDiagramSvg() {
  var cx=240,hw=110,hh=55,T=14;
  var C={ai:'#8b5cf6',web:'#0ea5e9',mkt:'#ec4899'};
  function P(cy,u,v){return [cx-hw+hw*(u+v),cy+hh*(v-u)]}
  function pt(a){return a[0].toFixed(1)+','+a[1].toFixed(1)}
  function poly(a,at){return '<polygon points="'+a.map(pt).join(' ')+'" '+at+'/>'}
  function ln(a,b,at){return '<line x1="'+a[0]+'" y1="'+a[1]+'" x2="'+b[0]+'" y2="'+b[1]+'" '+at+'/>'}
  var soft='stroke="currentColor" stroke-opacity=".2"';
  function gridD(cy){var o='';for(var k=1;k<8;k++){var t=k/8;o+=ln(P(cy,t,0),P(cy,t,1),soft)+ln(P(cy,0,t),P(cy,1,t),soft)}return o}
  function linesD(cy){var o='';for(var k=1;k<10;k++){o+=ln(P(cy,k/10,0),P(cy,k/10,1),soft)}
    return o+poly([P(cy,.04,.04),P(cy,.2,.04),P(cy,.04,.2)].map(function(a){return a}),'fill="none" stroke="currentColor" stroke-opacity=".6"')}
  function ringsD(cy){var o='';[.35,.65,.9].forEach(function(s){o+=poly([[cx,cy-hh*s],[cx+hw*s,cy],[cx,cy+hh*s],[cx-hw*s,cy]],'fill="none" stroke="currentColor" stroke-opacity=".38"')});return o}
  function slab(cy,color,det){var N=[cx,cy-hh],E=[cx+hw,cy],S=[cx,cy+hh],W=[cx-hw,cy];
    function sh(a){return [a[0],a[1]+T]}
    return '<g style="color:'+color+'">'+poly([W,S,sh(S),sh(W)],'fill="currentColor" fill-opacity=".42"')
     +poly([E,S,sh(S),sh(E)],'fill="currentColor" fill-opacity=".16"')
     +poly([N,E,S,W],'fill="currentColor" fill-opacity=".2" stroke="currentColor" stroke-opacity=".95" stroke-width="1.4" stroke-linejoin="round"')+det(cy)+'</g>'}
  var G={
   Data:'<ellipse cx="0" cy="-6" rx="8" ry="3.2"/><path d="M-8 -6v12c0 1.8 3.6 3.2 8 3.2s8-1.4 8-3.2V-6M-8 0c0 1.8 3.6 3.2 8 3.2s8-1.4 8-3.2"/>',
   'AI / RAG':'<rect x="-8" y="-8" width="16" height="16" rx="3"/><path d="M-4 -12v4M4 -12v4M-4 8v4M4 8v4M-12 -4h4M-12 4h4M8 -4h4M8 4h4"/><text y="4">AI</text>',
   Sites:'<rect x="-11" y="-9" width="22" height="18" rx="2.5"/><path d="M-11 -4h22M-6 2h8M-6 5.5h12"/><circle class="f" cx="-7.5" cy="-6.5" r=".9"/><circle class="f" cx="-4.5" cy="-6.5" r=".9"/>',
   Dev:'<text y="4.5" style="font-size:14px">&lt;/&gt;</text>',
   Growth:'<path d="M-10 6l6-7 5 4 8-9M3 -8h6v6"/>',
   Ads:'<circle r="10"/><circle r="5.5"/><circle class="f" r="1.8"/>',
   SEO:'<circle cx="-2" cy="-2" r="7"/><path d="M3 3l7 7"/>',
   Creators:'<circle cx="-5" cy="-4" r="3.5"/><circle cx="6" cy="-2" r="3"/><path d="M-11 8c0-5 3-7 6-7s6 2 6 7M2 8c0-4 2-5.5 4-5.5s5 1.5 5 5.5"/>'};
  function tile(L,t,i){var ax=cx+t.dx,ay=L.cy+t.dy,ty=ay-32,c=L.color;
    return '<g class="fade" style="--d:'+(L.d+.5+i*.1)+'s;color:'+c+'"><ellipse cx="'+ax+'" cy="'+ay+'" rx="13" ry="5" fill="#000" fill-opacity=".35"/>'
     +'<ellipse cx="'+ax+'" cy="'+ay+'" rx="4" ry="1.8" fill="currentColor"/>'+ln([ax,ty+16],[ax,ay],'stroke="currentColor" stroke-opacity=".7"')
     +'<text class="tl" x="'+ax+'" y="'+(ay+19)+'">'+t.n.replace('&','&amp;')+'</text></g>'
     +'<g class="drop" style="--d:'+(L.d+.9+i*.12)+'s"><g class="bob" style="--b:'+(2+i*.4)+'s"><g transform="translate('+ax+' '+ty+')">'
     +'<rect x="-17" y="-16" width="34" height="32" rx="9" class="tb"/><rect x="-17" y="-16" width="34" height="32" rx="9" fill="'+c+'" fill-opacity=".28" stroke="'+c+'" stroke-width="1.3"/>'
     +'<g class="gly">'+G[t.n]+'</g></g></g></g>'}
  function chain(L){var p=L.tiles.map(function(t){return (cx+t.dx)+','+(L.cy+t.dy)}).join(' ');
    return '<polyline class="flow fade" style="--d:'+(L.d+.8)+'s;color:'+L.color+'" points="'+p+'" stroke="'+L.color+'" stroke-width="1.5"/>'}
  function title(L){var x=cx+hw+34;
    return '<g class="fade" style="--d:'+(L.d+.4)+'s;color:'+L.color+'">'+ln([cx+hw+4,L.cy],[cx+hw+26,L.cy],'stroke="currentColor" stroke-opacity=".7"')
     +'<text class="lbl-t" x="'+x+'" y="'+(L.cy-1)+'">'+L.title+'</text><text class="lbl-s" x="'+x+'" y="'+(L.cy+17)+'">'+L.sub+'</text></g>'}
  function packet(path,begin,dur){return '<g opacity="0"><animateMotion dur="'+dur+'s" begin="'+begin+'s" repeatCount="indefinite" path="'+path+'"/>'
     +'<animate attributeName="opacity" values="0;1;1;0" keyTimes="0;.12;.85;1" dur="'+dur+'s" begin="'+begin+'s" repeatCount="indefinite"/>'
     +'<rect x="-3" y="-3" width="6" height="6" transform="rotate(45)" class="pk"/></g>'}
  function cyl(x,y,c){return '<g style="color:'+c+'"><path d="M'+(x-11)+' '+y+'v14c0 3 5 5 11 5s11-2 11-5V'+y+'" fill="currentColor" fill-opacity=".3" stroke="currentColor" stroke-width="1.3"/><ellipse cx="'+x+'" cy="'+y+'" rx="11" ry="5" fill="currentColor" fill-opacity=".45" stroke="currentColor" stroke-width="1.3"/></g>'}

  var L1={cy:490,color:C.ai,title:'AI, RAG &amp; data',sub:'2 services',det:gridD,d:.2,c:'s1',tiles:[{n:'Data',dx:-44,dy:4},{n:'AI / RAG',dx:44,dy:4}]};
  var L2={cy:320,color:C.web,title:'Web &amp; product',sub:'2 services',det:linesD,d:.55,c:'s2',tiles:[{n:'Sites',dx:-44,dy:2},{n:'Dev',dx:44,dy:2}]};
  var L3={cy:150,color:C.mkt,title:'Marketing &amp; growth',sub:'4 services',det:ringsD,d:.9,c:'s3',tiles:[{n:'Growth',dx:-69,dy:10},{n:'Ads',dx:-23,dy:-2},{n:'SEO',dx:23,dy:-2},{n:'Creators',dx:69,dy:10}]};

  var o='<defs><radialGradient id="floor"><stop offset="0" stop-color="#7a4dff" stop-opacity=".55"/><stop offset="1" stop-color="#7a4dff" stop-opacity="0"/></radialGradient></defs>'
   +'<ellipse class="halo" cx="'+cx+'" cy="568" rx="210" ry="40" fill="url(#floor)"/>';
  // vertical rails (behind the layers) with travelling packets
  [-36,0,36].forEach(function(dx,r){var x=cx+dx,p='M'+x+' 486 L'+x+' 92';
    o+='<line class="rail" x1="'+x+'" y1="486" x2="'+x+'" y2="92" stroke="#a78bfa" stroke-opacity=".55" stroke-width="1.4"/>';
    [0,1].forEach(function(k){o+=packet(p,(2.2+r*.8+k*2.3).toFixed(1),4.6)})});
  // data sources feeding the base
  var src=[[40,440],[40,490],[40,540]];
  o+='<g class="sp s1"><g class="fade" style="--d:.2s"><text class="lbl-s" x="12" y="'+(src[0][1]-26)+'">Your data</text>';
  src.forEach(function(s,i){var ty=L1.cy+(s[1]-L1.cy)*.3,d='M'+(s[0]+14)+' '+(s[1]+6)+' C100 '+(s[1]+6)+' 118 '+ty+' 172 '+ty;
    o+=cyl(s[0],s[1],C.ai)+'<path class="flow" d="'+d+'" stroke="'+C.ai+'" stroke-width="1.5"/>'+packet(d,(1.6+i*.7).toFixed(1),3.2)});
  o+='</g></g>';
  [L1,L2,L3].forEach(function(L){
    o+='<g class="sp '+L.c+'"><g class="rise" style="--d:'+L.d+'s">'+slab(L.cy,L.color,L.det)+chain(L)+title(L)+L.tiles.map(function(t,i){return tile(L,t,i)}).join('')+'</g></g>'});
  // outputs
  o+='<g class="sp sc"><g class="drop" style="--d:2.2s"><g class="bob" style="--b:2.4s"><g class="chip"><rect x="'+(cx-72)+'" y="14" width="144" height="28" rx="14"/><circle cx="'+(cx-56)+'" cy="28" r="4" fill="#ec4899"/><text x="'+(cx-45)+'" y="32.5">Your data \u2192 answers</text></g></g></g>';
  var oc=['Traffic','Leads','ROAS','#1'],ow=[86,76,76,60],ox=cx-161;
  oc.forEach(function(t,i){o+='<g class="drop" style="--d:'+(2.4+i*.12)+'s"><g class="bob" style="--b:'+(2.8+i*.3)+'s"><g class="chip"><rect x="'+ox+'" y="54" width="'+ow[i]+'" height="26" rx="13"/>'
    +'<polygon points="'+(ox+10)+',71 '+(ox+15)+',63 '+(ox+20)+',71" fill="#22c55e"/><text x="'+(ox+26)+'" y="71.5">'+t+'</text></g></g></g>';ox+=ow[i]+8});
  o+='</g>';
  
  return o;
}

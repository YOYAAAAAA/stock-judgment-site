(function(){
  'use strict';
  var PREFIX='stock6.v1.';
  var THEME_KEY=PREFIX+'theme';
  var DONE_KEY=PREFIX+'done';
  var VERDICT_KEY=PREFIX+'verdict';
  var state={mode:null,entryIndex:0,entryId:null,node:null,phase:'start',answers:{},history:[],doneEntries:[]};
  var layer=null;
  var stageEl=null,startCard=null,trailEl=null,trailChips=null,progressChip=null,progFill=null;
  var sheetWrap=null,sheetEl=null,sheetGrab=null,sheetTitle=null,sheetBody=null;
  var glossList=null,glossSearch=null,glossEmpty=null;
  var narrowMQ=window.matchMedia('(max-width:599px)');

  function get(k,d){try{var v=localStorage.getItem(k);return v?JSON.parse(v):d;}catch(e){return d;}}
  function set(k,v){try{localStorage.setItem(k,JSON.stringify(v));}catch(e){}}
  function getDone(){var v=get(DONE_KEY,{});return v&&typeof v==='object'?v:{};}
  function markDone(id){var d=getDone();d[id]=true;set(DONE_KEY,d);}
  function stateKey(id){return PREFIX+'state.'+id;}
  function saveLayerState(){
    if(!layer) return;
    if(!state.mode){try{localStorage.removeItem(stateKey(layer.id));}catch(e){}return;}
    set(stateKey(layer.id),{mode:state.mode,entryIndex:state.entryIndex,entryId:state.entryId,node:state.node,
      phase:state.phase,answers:state.answers,history:state.history,doneEntries:state.doneEntries});
  }
  function clearLayerState(id){try{localStorage.removeItem(stateKey(id));}catch(e){}}
  function restoreLayerState(){
    var s=get(stateKey(layer.id),null);
    if(!s||typeof s!=='object'||s.mode!=='all'&&s.mode!=='single') return false;
    if(!s.entryId||!entryOf(s.entryId)) return false;
    if(s.phase!=='q'&&s.phase!=='partial'&&s.phase!=='final') return false;
    if(s.phase==='q'&&!layer.nodes[s.node]) return false;
    state.mode=s.mode;state.entryIndex=entryIndex(s.entryId);state.entryId=s.entryId;
    state.node=s.node||null;state.phase=s.phase;
    state.answers=(s.answers&&typeof s.answers==='object')?s.answers:{};
    state.history=Array.isArray(s.history)?s.history:[];
    state.doneEntries=Array.isArray(s.doneEntries)?s.doneEntries:[];
    return true;
  }
  function esc(s){return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');}
  function layerByNo(n){return (window.LAYERS||[]).filter(function(l){return l.no===n;})[0];}
  function entryOf(id){return layer.entries.filter(function(e){return e.id===id;})[0];}
  function entryIndex(id){return layer.entries.map(function(e){return e.id;}).indexOf(id);}
  function totalAll(){return layer.entries.reduce(function(n,e){return n+e.steps;},0);}
  function modeLabel(){
    if(!state.mode) return '';
    if(state.mode==='single'){var e=entryOf(state.entryId);return (e?e.mark:'')+' · 只查这一项';}
    return layer.entries.map(function(e){return e.mark;}).join('+')+' · 完整链';
  }
  function srcTags(src){
    return (src||[]).map(function(s){
      var cls=s[0]==='学术共识'?'lv-a':(s[0]==='教材方法'?'lv-t':'lv-e');
      return '<span class="lv '+cls+'">['+esc(s[0])+']</span>';
    }).join('');
  }
  function srcNote(src){
    if(!src||!src.length) return '';
    return '<div class="src-note">'+src.map(function(s){return esc(s[0])+'：'+esc(s[1]);}).join('　')+'</div>';
  }
  function termify(text){
    return String(text||'').replace(/\{(\w+)\}/g,function(m,k){
      var t=window.DICT&&window.DICT[k];
      if(!t) return m;
      return '<button class="term" type="button" data-term="'+k+'" aria-expanded="false">'+esc(t.name)+'<span class="qmark">?</span></button>';
    });
  }
  function termRows(keys){
    return (keys||[]).map(function(k){
      var t=window.DICT[k];if(!t) return '';
      return '<div class="term-row" data-row="'+k+'" hidden><dt>'+esc(t.name)+'</dt>'
        +'<dd><span class="k">是什么</span>'+esc(t.def)+'</dd>'
        +'<dd><span class="k k2">为什么重要</span>'+esc(t.why)+'</dd></div>';
    }).join('');
  }
  function figHTML(key){
    if(!key) return '';
    var f=window.FIGS&&window.FIGS[key];
    return f||'';
  }
  function condRow(item){
    var flag=item.s==='ok'?'✓':(item.s==='bad'?'×':'?');
    var cls=item.s==='ok'?'ok':(item.s==='bad'?'bad':'unk');
    return '<div class="cond-item '+cls+'"><span class="cond-flag">'+flag+'</span><span><b>'+esc(item.t)+'</b>：'+esc(item.d)+'</span></div>';
  }
  function setProgress(text,p){
    if(progressChip) progressChip.textContent=text;
    if(progFill) progFill.style.width=(Math.max(0,Math.min(1,p))*100).toFixed(1)+'%';
  }
  function focusStage(){
    if(!stageEl) return;
    var y=stageEl.getBoundingClientRect().top+window.pageYOffset-70;
    window.scrollTo({top:y<0?0:y,behavior:'auto'});
  }
  function currentTotal(){
    if(!state.mode) return 0;
    return state.mode==='single'?entryOf(state.entryId).steps:totalAll();
  }

  /* ---------- 主题 ---------- */
  function effTheme(){return document.documentElement.dataset.theme||((window.matchMedia&&window.matchMedia('(prefers-color-scheme: dark)').matches)?'dark':'light');}
  function paintTheme(btn){
    if(!btn) return;
    var t=effTheme();
    btn.textContent=t==='dark'?'亮':'暗';
    btn.setAttribute('aria-label',t==='dark'?'切换到浅色模式':'切换到深色模式');
  }
  function initTheme(){
    var btn=document.getElementById('themeBtn');
    if(!btn) return;
    paintTheme(btn);
    btn.addEventListener('click',function(){
      var next=effTheme()==='dark'?'light':'dark';
      document.documentElement.dataset.theme=next;
      set(THEME_KEY,next);
      paintTheme(btn);
    });
    if(window.matchMedia){
      var mq=window.matchMedia('(prefers-color-scheme: dark)');
      if(mq.addEventListener) mq.addEventListener('change',function(){paintTheme(btn);});
    }
  }

  /* ---------- 抽屉 ---------- */
  function initSheet(){
    sheetWrap=document.getElementById('sheetWrap');
    if(!sheetWrap) return;
    sheetEl=document.getElementById('sheet');
    sheetGrab=document.getElementById('sheetGrab');
    sheetTitle=document.getElementById('sheetTitle');
    sheetBody=document.getElementById('sheetBody');
    var dragY=null,dragDy=0;
    sheetGrab.addEventListener('pointerdown',function(e){
      dragY=e.clientY;dragDy=0;sheetEl.style.transition='none';
      try{sheetGrab.setPointerCapture(e.pointerId);}catch(err){}
    });
    sheetGrab.addEventListener('pointermove',function(e){
      if(dragY===null) return;
      dragDy=Math.max(0,e.clientY-dragY);
      sheetEl.style.transform='translateY('+dragDy+'px)';
    });
    function endDrag(){
      if(dragY===null) return;
      sheetEl.style.transition='';
      if(dragDy>90){dragY=null;closeSheet();}
      else{sheetEl.style.transform='';dragY=null;}
    }
    sheetGrab.addEventListener('pointerup',endDrag);
    sheetGrab.addEventListener('pointercancel',endDrag);
    document.addEventListener('keydown',function(e){if(e.key==='Escape') closeSheet();});
    if(narrowMQ.addEventListener) narrowMQ.addEventListener('change',function(e){if(!e.matches) closeSheet();});
    document.addEventListener('click',function(e){
      if(e.target.closest('[data-sheet-close]')){closeSheet();}
    });
  }
  window.openSheet=function(k){
    var t=window.DICT&&window.DICT[k];
    if(!t||!sheetWrap) return;
    sheetTitle.textContent=t.name;
    sheetBody.innerHTML='<p><span class="k">是什么</span>'+esc(t.def)+'</p><p><span class="k">为什么重要</span>'+esc(t.why)+'</p>';
    sheetEl.style.transition='';sheetEl.style.transform='';
    sheetWrap.hidden=false;
    document.body.style.overflow='hidden';
    setTimeout(function(){if(!sheetWrap.hidden) sheetWrap.classList.add('on');},30);
  };
  function closeSheet(){
    if(!sheetWrap||sheetWrap.hidden) return;
    sheetWrap.classList.remove('on');
    document.body.style.overflow='';
    sheetEl.style.transform='';
    setTimeout(function(){if(!sheetWrap.classList.contains('on')){sheetWrap.hidden=true;sheetEl.style.transition='';}},300);
  }

  /* ---------- 通用点击 ---------- */
  function bindGlobalClick(){
    document.addEventListener('click',function(e){
      if(e.target.closest('[data-sheet-close]')){closeSheet();return;}
      var term=e.target.closest('.term[data-term]');
      if(term){
        var k=term.dataset.term;
        if(narrowMQ.matches) window.openSheet(k);
        else toggleTerm(k);
        return;
      }
      var opt=e.target.closest('.opt');
      if(opt){choose(opt.dataset.node,opt.dataset.opt);return;}
      var entry=e.target.closest('[data-entry]');
      if(entry){start(entry.dataset.entry);return;}
      var act=e.target.closest('[data-act]');
      if(act){doAct(act.dataset.act);}
    });
  }
  function toggleTerm(k){
    if(!stageEl) return;
    var rows=Array.prototype.slice.call(stageEl.querySelectorAll('.term-row')).filter(function(r){return r.dataset.row===k;});
    if(!rows.length) return;
    var open=rows[0].hidden;
    rows.forEach(function(r){r.hidden=!open;});
    stageEl.querySelectorAll('.term[data-term="'+k+'"]').forEach(function(b){
      b.classList.toggle('open',open);b.setAttribute('aria-expanded',open?'true':'false');
    });
  }

  /* ---------- 顶部六层切换 ---------- */
  function initNav(){
    var right=document.querySelector('.top-right');
    if(!right||document.getElementById('navDrop')) return;
    var isLayer=!!(document.body.dataset.layer&&layer);
    var wrap=document.createElement('div');
    wrap.className='navdrop';wrap.id='navDrop';
    wrap.innerHTML='<button class="nav-btn" type="button" id="navBtn" aria-haspopup="true" aria-expanded="false" aria-controls="navMenu">'
      +'<span id="navBtnLabel">六层</span><i class="nb-caret" aria-hidden="true">▾</i></button>'
      +'<div class="nav-menu" id="navMenu" role="menu" hidden></div>';
    right.insertBefore(wrap,right.firstChild);
    var btn=wrap.querySelector('#navBtn'),menu=wrap.querySelector('#navMenu');
    function build(){
      var d=getDone(),dn=0;
      (window.LAYERS||[]).forEach(function(l){if(d[l.id])dn++;});
      var rows='<a class="nav-item nav-home" role="menuitem" href="'+(isLayer?'../index.html':'index.html')+'"'+(isLayer?'':' aria-current="page"')+'>'
        +'<span class="ni-main">六层总览</span><span class="ni-s">已过 '+dn+'/6</span></a>';
      rows+='<div class="nav-cap">跳到哪一层</div>';
      (window.LAYERS||[]).forEach(function(l){
        var st=navStatusOf(l);
        var cls='nav-item'+(st.done?' done':'')+(st.doing?' doing':'')+(isLayer&&l.id===layer.id?' current':'');
        rows+='<a class="'+cls+'" role="menuitem" href="'+(isLayer?'layer'+l.no+'.html':'layers/'+l.id+'.html')+'"'
          +(isLayer&&l.id===layer.id?' aria-current="page"':'')+'>'
          +'<span class="ni-wrap"><span class="ni-main">第 '+l.no+' 层 · '+st.text+'</span><span class="ni-sub">'+esc(l.title)+'</span></span>'
          +'</a>';
      });
      menu.innerHTML=rows;
    }
    function closeMenu(){menu.hidden=true;btn.setAttribute('aria-expanded','false');}
    btn.addEventListener('click',function(e){
      e.stopPropagation();
      if(menu.hidden){build();menu.hidden=false;btn.setAttribute('aria-expanded','true');}
      else closeMenu();
    });
    menu.addEventListener('click',function(){closeMenu();});
    document.addEventListener('click',function(e){if(!e.target.closest('#navDrop')) closeMenu();});
    document.addEventListener('keydown',function(e){if(e.key==='Escape') closeMenu();});
  }

  /* ---------- 总览 ---------- */
  function initIndex(){
    var app=document.getElementById('siteRoot');
    if(!app) return;
    setProgress('已过 0/6',0);
    app.innerHTML=
      '<div class="progress-card"><div class="progress-main"><div class="progress-num" id="doneNum">0<small> / 6 层</small></div>'
      +'<div class="progress-cap" id="doneCap">还没走完任何一层</div></div>'
      +'<div class="pips" id="pips"></div><button class="progress-reset" type="button" data-reset>重置进度</button></div>'
      +'<div class="layer-list" id="layerList"></div>'
      +'<section class="search-panel"><h2 style="font-size:18px;margin:0">搜层或术语</h2>'
      +'<input class="gloss-search" id="siteSearch" type="search" placeholder="例如：量比、止损、板块阶段" autocomplete="off" aria-label="搜索层次或术语">'
      +'<div class="search-results" id="termHits"></div></section>';
    renderIndex();
    var input=document.getElementById('siteSearch');
    input.addEventListener('input',function(){filterIndex(input.value.trim());});
    app.addEventListener('click',function(e){
      if(e.target.closest('[data-reset]')){
        set(DONE_KEY,{});set(VERDICT_KEY,{});
        (window.LAYERS||[]).forEach(function(l){clearLayerState(l.id);});
        renderIndex();setProgress('已过 0/6',0);
      }
    });
  }
  function navStatusOf(l){
    var s=get(stateKey(l.id),null),n=(s&&s.answers)?Object.keys(s.answers).length:0;
    if(getDone()[l.id]||(s&&s.phase==='final')) return {text:'已完成',done:true};
    if(n>0) return {text:n+'/'+denomOf(l),done:false,doing:true};
    return {text:'未开始',done:false};
  }
  function renderIndex(){
    var done=getDone(),n=0,list='';
    (window.LAYERS||[]).forEach(function(l){
      var st=navStatusOf(l),isDone=st.done;if(isDone)n++;
      list+='<a class="layer-card" href="layers/'+l.id+'.html" data-text="'+esc((l.no+' '+l.title+' '+l.preview.ask+' '+l.preview.stop).toLowerCase())+'">'
        +'<div class="top"><span class="layer-no">第 '+l.no+' 层</span>'
        +'<span class="layer-state'+(isDone?' done':(st.doing?' doing':''))+'">'+st.text+'</span></div>'
        +'<h3>'+esc(l.title)+'</h3>'
        +'<div class="layer-meta"><span><b>要问</b>'+esc(l.preview.ask)+'</span><span><b>停在哪</b>'+esc(l.preview.stop)+'</span></div>'
        +'<div class="go">'+(isDone?'再走一遍':'进入这一层')+' →</div></a>';
    });
    var listEl=document.getElementById('layerList');if(listEl) listEl.innerHTML=list;
    var num=document.getElementById('doneNum');if(num) num.innerHTML=n+'<small> / 6 层</small>';
    var cap=document.getElementById('doneCap');if(cap) cap.textContent=n===0?'还没走完任何一层':(n===6?'六层全部走完':(n<3?'已经起了个头':'过半了，继续'));
    var pips=document.getElementById('pips');if(pips){
      pips.innerHTML=(window.LAYERS||[]).map(function(l){return '<span class="pip'+(done[l.id]?' on':'')+'"></span>';}).join('');
    }
    setProgress('已过 '+n+'/6',n/6);
    var input=document.getElementById('siteSearch');if(input&&input.value.trim()) filterIndex(input.value.trim());
    applyIndexVerdict();
  }
  function filterIndex(q){
    var cards=document.querySelectorAll('#layerList .layer-card'),shown=0;
    cards.forEach(function(c){
      var hit=!q||c.dataset.text.indexOf(q.toLowerCase())>-1;
      c.hidden=!hit;if(hit)shown++;
    });
    var hits=document.getElementById('termHits');if(!hits) return;
    if(!q){hits.innerHTML='';return;}
    var arr=[];
    Object.keys(window.DICT||{}).forEach(function(k){
      var t=window.DICT[k],text=(t.name+' '+t.def+' '+t.why).toLowerCase();
      if(text.indexOf(q.toLowerCase())>-1) arr.push(t);
    });
    hits.innerHTML=arr.slice(0,10).map(function(t){
      return '<dl class="search-hit"><dt>'+esc(t.name)+'</dt><dd>'+esc(t.def)+'</dd></dl>';
    }).join('')+(arr.length?'':'<div class="search-empty">没有匹配的术语。试试“量比”“止损”“现金流”。</div>');
  }

  /* ---------- 单层 ---------- */
  function initLayer(){
    var id=document.body.dataset.layer;
    layer=(window.LAYERS||[]).filter(function(l){return l.id===id;})[0];
    var root=document.getElementById('appRoot');
    if(!layer||!root){if(root) root.innerHTML='<p>这一层的数据没有加载。</p>';return;}
    document.title='第 '+layer.no+' 层 · '+layer.title;
    stageEl=null;
    root.innerHTML=
      '<div class="hero"><div class="kicker">'+esc(layer.kicker)+'</div><h1>'+esc(layer.title)+'</h1>'
      +'<p class="lede">'+layer.lede+'</p>'+(layer.fig?figHTML(layer.fig):'')+'</div>'
      +'<div id="startCard"></div><div class="trail" id="trail"><div class="trail-label">这一层走过的路径</div><div class="trail-chips" id="trailChips"></div></div>'
      +'<div id="stage"></div>'
      +'<section class="glossary"><div class="gloss-head"><h2>术语表</h2><span class="gloss-sub">这一层出现的词，每个最多三句</span></div>'
      +'<input class="gloss-search" id="glossSearch" type="search" placeholder="搜索术语" autocomplete="off" aria-label="搜索本层术语">'
      +'<dl class="gloss-list" id="glossList"></dl><div class="gloss-empty" id="glossEmpty" hidden>没有这个词。试试别的关键词。</div></section>'
      +'<div class="foot">'+layer.foot+'<br>本页是学习工具，不构成投资建议。</div>'
      +'<nav class="layer-nav">'+navHTML()+'</nav>';
    stageEl=document.getElementById('stage');
    startCard=document.getElementById('startCard');
    trailEl=document.getElementById('trail');
    trailChips=document.getElementById('trailChips');
    progressChip=document.getElementById('progressChip');
    progFill=document.getElementById('progFill');
    glossList=document.getElementById('glossList');
    glossSearch=document.getElementById('glossSearch');
    glossEmpty=document.getElementById('glossEmpty');
    restoreLayerState();
    renderStart();
    renderGlossary();
    glossSearch.addEventListener('input',function(){
      var q=glossSearch.value.trim().toLowerCase(),n=0;
      Array.prototype.forEach.call(glossList.children,function(el){
        var hit=!q||el.dataset.text.indexOf(q)>-1;el.hidden=!hit;if(hit)n++;
      });
      glossEmpty.hidden=n>0;
    });
    render();
    window.scrollTo(0,0);
  }
  function navHTML(){
    var prev=layer.no>1?'<a href="layer'+(layer.no-1)+'.html">← 第 '+(layer.no-1)+' 层</a>':'';
    var next=layer.no<6?'<a href="layer'+(layer.no+1)+'.html">第 '+(layer.no+1)+' 层 →</a>':'';
    return '<a href="../index.html">六层总览</a>'+prev+next;
  }
  function renderStart(){
    var total=totalAll();
    startCard.innerHTML=
      '<div class="start-card"><div class="start-title">你想先从哪个子问题查起？</div>'
      +'<div class="start-sub">选一个入口只走这一条；不确定就选“全部都要”，按顺序走完整层。每一步只问一件事，选完自动往下走。</div>'
      +'<div class="entries">'+layer.entries.map(function(e){
        return '<button class="entry" type="button" data-entry="'+e.id+'"><span class="mark">'+esc(e.mark)+'</span>'
          +'<span><span class="et">'+esc(e.label)+'</span><span class="es">'+esc(e.desc)+'</span></span><span class="go">›</span></button>';
      }).join('')
      +'<button class="entry all" type="button" data-entry="all"><span class="mark">'+layer.entries.map(function(e){return e.mark;}).join('+')+'</span>'
      +'<span><span class="et">全部都要</span><span class="es">按顺序走完这一层，共 '+total+' 步，最后给完整结论。</span></span><span class="go">›</span></button>'
      +'</div><div class="hint">虚线下划线的词可以点：窄屏从底部滑出解释，宽屏就地展开。每一步都有来源等级和“看哪里”。</div></div>';
  }
  function render(){
    var started=!!state.mode;
    startCard.hidden=started;
    trailEl.classList.toggle('on',started);
    if(!started){stageEl.innerHTML='';setProgress('还没开始',0);applyLayerVerdict();return;}
    if(state.phase==='q'){
      var total=currentTotal();
      var no=Math.min(state.history.length+1,total);
      setProgress('第 '+no+' 步 / 共 '+total+' 步',no/total);
    }else if(state.phase==='partial'){
      setProgress('半结论 · 已查 '+state.history.length+' 步',0.72);
    }else{
      setProgress('已完成 '+state.history.length+' 步',1);
    }
    renderTrail();
    if(state.phase==='q') renderQuestion();
    else if(state.phase==='partial') renderPartial();
    else renderConclusion();
    applyLayerVerdict();
    saveLayerState();
  }
  function renderTrail(){
    var chips=['<span class="trail-chip mode"><b>'+esc(modeLabel())+'</b></span>'];
    state.history.forEach(function(h){
      chips.push('<span class="trail-chip"><span class="tick">✓</span>'+esc(h.short)+' · <b>'+esc(h.label)+'</b></span>');
    });
    trailChips.innerHTML=chips.join('');
  }
  function renderQuestion(){
    var node=layer.nodes[state.node];
    var total=currentTotal();
    var no=state.history.length+1;
    stageEl.innerHTML=
      '<div class="q-card"><div class="q-top"><span class="q-step">第 '+no+' 步 / 共 '+total+' 步</span>'
      +'<div class="q-src">'+srcTags(node.src)+'</div></div>'+srcNote(node.src)
      +'<div class="q-ask">这一步在问什么</div><h2 class="q-title">'+node.title+'</h2>'
      +'<p class="q-plain">'+termify(node.plain)+'</p>'+figHTML(node.fig)
      +'<div class="term-defs">'+termRows(node.terms)+'</div>'
      +'<div class="where"><h3>看哪里</h3><ul>'+node.where.map(function(w){return '<li>'+esc(w)+'</li>';}).join('')+'</ul></div>'
      +'<div class="options">'+node.options.map(function(o){
        return '<button class="opt" type="button" data-node="'+state.node+'" data-opt="'+o.k+'"><span class="radio"></span>'
          +'<span><span class="ol">'+esc(o.label)+'</span><span class="om">'+esc(o.mean)+'</span></span></button>';
      }).join('')+'</div>'
      +'<div class="q-foot">'+(state.history.length?'<button class="link-btn" type="button" data-act="back">← 返回上一步</button>':'')
      +'<button class="link-btn" type="button" data-act="restart">重来</button><span class="q-note">选完自动进入下一步</span></div></div>';
  }
  function renderPartial(){
    var pd=typeof layer.partial==='function'?layer.partial(state.entryId,state.answers):layer.partial[state.entryId];
    var done=layer.entries.filter(function(e){return state.doneEntries.indexOf(e.id)>-1;});
    var left=layer.entries.filter(function(e){return state.doneEntries.indexOf(e.id)<0;});
    var rows=done.map(function(e){
      var last=state.history.filter(function(h){return h.entry===e.id;}).slice(-1)[0];
      return '<div class="cond-item ok"><span class="cond-flag">✓</span><span><b>'+esc(e.label)+'</b>：'+(last?esc(last.label):'已查')+'</span></div>';
    }).join('');
    stageEl.innerHTML=
      '<div class="verdict-card"><div class="verdict-label">半结论 · 只查了这一项</div>'
      +'<div class="verdict">'+esc(pd.t)+'<span class="tag">'+esc(pd.tag)+'</span></div>'
      +'<p class="verdict-sub">'+esc(pd.sub)+'</p><div class="cond">'+rows+'</div>'
      +'<p class="verdict-sub" style="margin-top:18px">还没查：'+left.map(function(e){return esc(e.mark)+' '+esc(e.label);}).join('；')+'。半结论不能当成整层结论。</p>'
      +'<div class="verdict-foot">'
      +(left.length?'<button class="btn-primary" type="button" data-act="continue">接着查：'+esc(left[0].mark+' '+left[0].label)+'</button>':'')
      +'<button class="btn-ghost" type="button" data-act="back">改上一步</button>'
      +'<button class="btn-ghost" type="button" data-act="restart">重来</button>'
      +'<button class="btn-ghost" type="button" data-act="review">回去对照</button></div></div>';
  }
  function renderConclusion(){
    var v=layer.verdict(state.answers);
    var checks=layer.checks(state.answers);
    var next=layer.no<6?'<a class="btn-primary" href="layer'+(layer.no+1)+'.html">进入第 '+(layer.no+1)+' 层</a>':'<a class="btn-primary" href="../index.html">回总览</a>';
    stageEl.innerHTML=
      '<div class="verdict-card"><div class="verdict-label">结论 · 第 '+layer.no+' 层</div>'
      +'<div class="verdict">'+esc(v.t)+'<span class="tag">'+esc(v.tag)+'</span></div>'
      +'<p class="verdict-sub">'+esc(v.sub)+'</p><div class="cond">'+checks.map(condRow).join('')+'</div>'
      +'<div class="verdict-foot">'+next+'<button class="btn-ghost" type="button" data-act="restart">重来这一层</button>'
      +'<button class="btn-ghost" type="button" data-act="review">回去对照</button>'
      +'<button class="btn-ghost" type="button" data-act="gloss">看术语表</button></div></div>';
  }
  function start(key){
    var all=key==='all';
    if(all){
      state.mode='all';state.entryIndex=0;state.entryId=layer.entries[0].id;
    }else{
      var idx=entryIndex(key);
      state.mode='single';state.entryIndex=idx;state.entryId=key;
    }
    var e=entryOf(state.entryId);
    state.node=e.first;state.phase='q';state.answers={};state.history=[];state.doneEntries=[];
    render();focusStage();
  }
  function choose(nodeKey,optKey){
    var node=layer.nodes[nodeKey];if(!node) return;
    var opt=node.options.filter(function(o){return o.k===optKey;})[0];if(!opt) return;
    state.answers[nodeKey]=optKey;
    state.history.push({node:nodeKey,opt:optKey,label:opt.label,short:node.short,entry:state.entryId});
    if(opt.next==='END'){finishEntry();}
    else{state.node=opt.next;}
    render();focusStage();
  }
  function finishEntry(){
    if(state.doneEntries.indexOf(state.entryId)<0) state.doneEntries.push(state.entryId);
    if(state.mode==='single'){state.phase='partial';return;}
    var nextIdx=-1;
    for(var i=0;i<layer.entries.length;i++){
      if(state.doneEntries.indexOf(layer.entries[i].id)<0){nextIdx=i;break;}
    }
    if(nextIdx<0){state.phase='final';markDone(layer.id);return;}
    state.entryIndex=nextIdx;state.entryId=layer.entries[nextIdx].id;state.node=layer.entries[nextIdx].first;state.phase='q';
  }
  function back(){
    if(!state.history.length) return;
    var last=state.history.pop();
    delete state.answers[last.node];
    var di=state.doneEntries.indexOf(last.entry);if(di>-1) state.doneEntries.splice(di,1);
    state.entryId=last.entry;state.entryIndex=entryIndex(last.entry);state.node=last.node;state.phase='q';
    render();focusStage();
  }
  function restart(){
    if(layer){clearVerdict(layer.id);clearLayerState(layer.id);}
    state={mode:null,entryIndex:0,entryId:null,node:null,phase:'start',answers:{},history:[],doneEntries:[]};
    render();startCard.hidden=false;window.scrollTo({top:0,behavior:'auto'});
  }
  function continueAll(){
    state.mode='all';
    var nextIdx=-1;
    for(var i=0;i<layer.entries.length;i++){
      if(state.doneEntries.indexOf(layer.entries[i].id)<0){nextIdx=i;break;}
    }
    if(nextIdx<0){state.phase='final';markDone(layer.id);}
    else{state.entryIndex=nextIdx;state.entryId=layer.entries[nextIdx].id;state.node=layer.entries[nextIdx].first;state.phase='q';state.doneEntries=state.doneEntries.slice();}
    render();focusStage();
  }
  function doAct(act){
    if(act==='back') return back();
    if(act==='restart') return restart();
    if(act==='continue') return continueAll();
    if(act==='review'){trailEl.scrollIntoView({block:'start'});window.scrollBy(0,-70);return;}
    if(act==='gloss'){var g=document.querySelector('.glossary');if(g){g.scrollIntoView({block:'start'});setTimeout(function(){glossSearch.focus();},220);}}
  }
  function renderGlossary(){
    var keys=[];
    Object.keys(layer.nodes).forEach(function(nk){
      (layer.nodes[nk].terms||[]).forEach(function(k){if(keys.indexOf(k)<0) keys.push(k);});
    });
    (layer.extraTerms||[]).forEach(function(k){if(keys.indexOf(k)<0) keys.push(k);});
    var items=keys.map(function(k){
      var t=window.DICT[k];if(!t) return '';
      return '<div class="gloss-item" data-text="'+esc((t.name+' '+t.def+' '+t.why).toLowerCase())+'"><dt>'+esc(t.name)+'</dt><dd>'+esc(t.def)+'</dd></div>';
    }).join('');
    glossList.innerHTML=items;
  }

  /* ---------- 四态色面判断 ---------- */
  var vWrapEl=null,vBlock=null,vBlue=null,vBig=null,vBig2=null,jWrap=null,jSheet=null,jBody=null,jGrab=null;
  var vData=null,vScope='layer',jDir='bottom',jOpen=false;

  function layerById(id){return (window.LAYERS||[]).filter(function(l){return l.id===id;})[0];}
  function denomOf(l){return l?l.entries.reduce(function(n,e){return n+e.steps;},0):6;}
  function getVerdicts(){var v=get(VERDICT_KEY,{});return v&&typeof v==='object'?v:{};}
  function saveVerdict(id,v){
    var all=getVerdicts();
    all[id]={state:v.state,strength:v.strength,score:v.score,coverage:v.coverage,denom:v.denom,veto:!!v.veto};
    set(VERDICT_KEY,all);
  }
  function clearVerdict(id){
    var all=getVerdicts();
    if(all[id]){delete all[id];set(VERDICT_KEY,all);}
  }
  function verdictOf(answers,layerId){
    var J=window.JUDGE&&window.JUDGE.layers[layerId];
    var lay=layerById(layerId);
    var denom=denomOf(lay);
    if(!J||!lay) return {layerId:layerId,score:0,coverage:0,denom:denom,state:'unknown',strength:2,rows:[],vetoes:[],veto:false};
    var score=0,rows=[],vetoes=[];
    Object.keys(answers||{}).forEach(function(k){
      var ok=answers[k];if(!ok) return;
      var w=(J.w[k]&&J.w[k][ok]);if(typeof w!=='number') w=0;
      var v=J.veto[k+'.'+ok]||null;
      score+=w;
      rows.push({node:k,opt:ok,w:w,veto:v});
      if(v) vetoes.push(v);
    });
    var coverage=Math.min(rows.length,denom);
    var st=coverage<3?'unknown':(vetoes.length?'bad':(score>=4?'good':(score<=-4?'bad':'neutral')));
    var sg=st==='unknown'?2:(vetoes.length?3:(Math.abs(score)>=7?3:(Math.abs(score)>=3?2:1)));
    return {layerId:layerId,score:score,coverage:coverage,denom:denom,state:st,strength:sg,rows:rows,vetoes:vetoes,veto:!!vetoes.length};
  }
  function verdictOfIndex(){
    var vs=getVerdicts(),cov=0,total=0,veto=false,judged=[],i;
    for(i=0;i<(window.LAYERS||[]).length;i++){
      var l=window.LAYERS[i],v=vs[l.id];
      if(!v||v.coverage<3) continue;
      cov++;
      total+=v.state==='good'?1:(v.state==='bad'?-1:0);
      if(v.veto) veto=true;
      judged.push({layer:l,v:v});
    }
    var st=cov<3?'unknown':(veto?'bad':(total>=2?'good':(total<=-2?'bad':'neutral')));
    var sg=veto?3:(Math.abs(total)>=4?3:(Math.abs(total)>=2?2:1));
    var rows=judged.map(function(j){
      return {layerNo:j.layer.no,title:j.layer.title,state:j.v.state,score:j.v.score,veto:!!j.v.veto};
    });
    return {layerId:'index',score:total,coverage:cov,denom:6,state:st,strength:sg,rows:rows,judged:judged,vetoes:veto?['有一层命中否决']:[],veto:veto};
  }
  function phraseOf(key,st,v){
    if(st==='unknown'){
      var cov=v?('已答 '+v.coverage+'/'+v.denom+' 步'):'';
      return {main:'还没看出来',nat:'未判',act:'等',
        full:(key==='index'?'六层里还凑不满三层结论':'这一层还没答到 3 步')+(cov?'：'+cov+'，先不下结论。':'。'),
        pos:'先按未判处理，不新开仓，把没答的步骤补齐',
        stop:'没有仓位，不设止损',
        flip:'补到 3 步以上再看颜色；一旦命中否决直接转绿'};
    }
    var p=(window.JUDGE&&window.JUDGE.phrase)||{};
    var set=p[key]||p.index;
    return set[st]||{main:'还没看出来',nat:'未判',act:'等',
        full:'还没有这一层的结论文案，先按未判处理。',pos:'不新开仓',stop:'没有仓位，不设止损',flip:'补齐作答后再看'};
  }
  function phraseKey(v){return v&&v.layerId&&v.layerId!=='index'?v.layerId:'index';}
  var STATE_LABEL={good:'有利',bad:'不利',neutral:'观望',unknown:'未判'};
  var COLOR_LABEL={good:'红',bad:'绿',neutral:'黄',unknown:'蓝'};
  var STRENGTH_LABEL={1:'浅',2:'中',3:'强'};

  function ensureVerdictDOM(){
    if(document.getElementById('vWrap')){vWrapEl=document.getElementById('vWrap');return;}
    vWrapEl=document.createElement('div');vWrapEl.id='vWrap';
    vWrapEl.innerHTML=
      '<div class="vblock" id="vblock" aria-hidden="true"></div>'
      +'<div class="vthin" aria-hidden="true"><i></i></div>'
      +'<div class="vbig vbig-fix" id="vbig" role="button" tabindex="0" aria-haspopup="dialog" aria-expanded="false" aria-label="打开这次判断的来路">'
      +'<span class="vmain"></span><small class="vnature"></small><span class="vhint" aria-hidden="true">›</span></div>';
    document.body.appendChild(vWrapEl);
    vBlock=document.getElementById('vblock');
    vBig=document.getElementById('vbig');

    vBlue=document.createElement('div');vBlue.id='vblue';
    vBlue.innerHTML='<button class="vbig vblue-btn" id="vbig2" type="button" aria-haspopup="dialog" aria-expanded="false" aria-label="打开这次判断的来路">'
      +'<span class="vmain"></span><small class="vnature"></small><span class="vhint" aria-hidden="true">›</span></button>'
      +'<p class="vnote" id="vnote"></p>';
    vBig2=vBlue.querySelector('#vbig2');
    var main=document.querySelector('.wrap');
    if(main){
      var crumbs=main.querySelector('.crumbs');
      if(crumbs) main.insertBefore(vBlue,crumbs.nextSibling);
      else main.insertBefore(vBlue,main.firstChild);
    }

    jWrap=document.createElement('div');jWrap.className='jwrap';jWrap.id='jWrap';jWrap.hidden=true;
    jWrap.innerHTML='<div class="jmask" data-jclose></div>'
      +'<div class="jsheet" id="jSheet" role="dialog" aria-modal="true" aria-labelledby="jTitle">'
      +'<div class="jgrab" id="jGrab"><span></span></div>'
      +'<div class="jhead"><h3 id="jTitle">这次判断怎么来的</h3><button class="jx" type="button" data-jclose aria-label="关闭">关闭</button></div>'
      +'<div class="jbody" id="jBody"></div></div>';
    document.body.appendChild(jWrap);
    jSheet=document.getElementById('jSheet');
    jBody=document.getElementById('jBody');
    jGrab=document.getElementById('jGrab');

    function bindBig(el){
      if(!el) return;
      el.addEventListener('click',function(e){e.stopPropagation();openJudge();});
      el.addEventListener('keydown',function(e){
        if(e.key==='Enter'||e.key===' '){e.preventDefault();e.stopPropagation();openJudge();}
      });
    }
    bindBig(vBig);bindBig(vBig2);

    document.addEventListener('click',function(e){
      if(e.target.closest('[data-jclose]')) closeJudge();
    });
    document.addEventListener('keydown',function(e){if(e.key==='Escape') closeJudge();});
    window.addEventListener('resize',function(){
      var tb=document.querySelector('.topbar');
      document.documentElement.style.setProperty('--navH',(tb?tb.offsetHeight:56)+'px');
    });

    var dragY=null,dragDy=0;
    jGrab.addEventListener('pointerdown',function(e){
      dragY=e.clientY;dragDy=0;jSheet.style.transition='none';
      try{jGrab.setPointerCapture(e.pointerId);}catch(err){}
    });
    jGrab.addEventListener('pointermove',function(e){
      if(dragY===null) return;
      var d=e.clientY-dragY;
      dragDy=(jDir==='top')?Math.min(0,d):Math.max(0,d);
      jSheet.style.transform='translateY('+dragDy+'px)';
    });
    function endDrag(){
      if(dragY===null) return;
      jSheet.style.transition='';
      if((jDir==='top'&&dragDy<-80)||(jDir==='bottom'&&dragDy>80)){dragY=null;closeJudge();}
      else{jSheet.style.transform='';dragY=null;}
    }
    jGrab.addEventListener('pointerup',endDrag);
    jGrab.addEventListener('pointercancel',endDrag);
  }

  function paintVerdict(v,scope){
    vData=v;vScope=scope;
    var b=document.body;
    b.dataset.verdict=v.state;b.dataset.strength=v.strength;
    var tb=document.querySelector('.topbar');
    document.documentElement.style.setProperty('--navH',(tb?tb.offsetHeight:56)+'px');
    var ph=phraseOf(phraseKey(v),v.state,v);
    var br='（'+ph.nat+'·'+ph.act+'）';
    [vBig,vBig2].forEach(function(el){
      if(!el) return;
      var m=el.querySelector('.vmain'),n=el.querySelector('.vnature');
      if(m) m.textContent=ph.main;
      if(n) n.textContent=br;
      el.setAttribute('aria-expanded','false');
    });
    var note=document.getElementById('vnote');
    if(note){
      note.textContent=v.coverage>=v.denom
        ?'六步答完：'+STATE_LABEL[v.state]+' · '+STRENGTH_LABEL[v.strength]+'档。'
        :'覆盖 '+v.coverage+'/'+v.denom+'，还有 '+(v.denom-v.coverage)+' 步没答。答到 3 步以上才给颜色结论。';
    }
  }

  function applyLayerVerdict(){
    if(!layer) return;
    var v=verdictOf(state.answers, layer.id);
    v.done=state.doneEntries.slice();
    if(v.coverage>0) saveVerdict(layer.id,v); else clearVerdict(layer.id);
    paintVerdict(v,'layer');
  }
  function applyIndexVerdict(){
    var v=verdictOfIndex();
    paintVerdict(v,'index');
  }

  function optLabelOf(lay,nodeKey,optKey){
    var node=lay.nodes[nodeKey];if(!node) return optKey;
    var o=(node.options||[]).filter(function(x){return x.k===optKey;})[0];
    return o?o.label:optKey;
  }
  function judgePanelHTML(){
    var v=vData;if(!v) return '';
    var ph=phraseOf(phraseKey(v),v.state,v);
    var nat=STATE_LABEL[v.state]+' · '+COLOR_LABEL[v.state]+' · '+STRENGTH_LABEL[v.strength]+'档';
    var sec1='',sec2='',sec3='';
    if(vScope==='index'){
      if(!v.rows.length){
        sec1='<div class="jrow"><span class="jk">六层</span><span class="jv muted">都还没答到 3 步，无法汇总</span></div>';
      }else{
        sec1=v.rows.map(function(r){
          return '<div class="jrow"><span class="jk">第 '+r.layerNo+' 层 · '+esc(r.title)+'</span><span class="jv'+(r.state==='bad'?' neg':'')+'">'+STATE_LABEL[r.state]+(r.veto?' · 命中否决':'')+'</span></div>';
        }).join('');
      }
      sec1+=(window.LAYERS||[]).filter(function(l){return v.rows.every(function(r){return r.layerNo!==l.no;});})
        .map(function(l){return '<div class="jrow"><span class="jk">第 '+l.no+' 层 · '+esc(l.title)+'</span><span class="jv muted">未答</span></div>';}).join('');
      sec2=v.rows.map(function(r){
        return '<div class="jrow"><span class="jk">第 '+r.layerNo+' 层</span><span class="jv num '+(r.score>0?'pos':(r.score<0?'neg':'zero'))+'">'+(r.score>0?'+':'')+r.score+'</span></div>';
      }).join('');
      sec3='<div class="jfull">'+esc(ph.full)+'</div>'
        +'<div class="jtagline"><span class="jtag '+v.state+'">'+nat+'</span></div>'
        +'<div class="jrow jkv"><span class="jk">该干嘛</span><span class="jv">'+esc(ph.act+'：'+ph.pos)+'</span></div>'
        +'<div class="jrow jkv"><span class="jk">止损</span><span class="jv">'+esc(ph.stop)+'</span></div>'
        +'<div class="jrow jkv"><span class="jk">改口条件</span><span class="jv">'+esc(ph.flip)+'</span></div>';
    }else{
      var lay=layerById(v.layerId)||layer;
      if(!v.rows.length){
        sec1='<div class="jrow"><span class="jk">这一层</span><span class="jv muted">还没开始答</span></div>';
      }else{
        sec1=v.rows.map(function(r){
          return '<div class="jrow"><span class="jk">'+esc((lay.nodes[r.node]||{}).short||r.node)+'</span><span class="jv">'+esc(optLabelOf(lay,r.node,r.opt))+'</span></div>';
        }).join('');
      }
      var done=v.done||[];
      sec1+=(lay.entries||[]).filter(function(e){return done.indexOf(e.id)<0;})
        .map(function(e){return '<div class="jrow"><span class="jk">'+esc(e.label)+'</span><span class="jv muted">未答</span></div>';}).join('');
      sec2=v.rows.map(function(r){
        var short=(lay.nodes[r.node]||{}).short||r.node;
        return '<div class="jrow"><span class="jk">'+esc(short+' · '+optLabelOf(lay,r.node,r.opt))+(r.veto?' <b>veto</b>':'')+'</span>'
          +'<span class="jv num '+(r.w>0?'pos':(r.w<0?'neg':'zero'))+'">'+(r.w>0?'+':'')+r.w+'</span></div>';
      }).join('');
      sec3='<div class="jfull">'+esc(ph.full)+'</div>'
        +'<div class="jtagline"><span class="jtag '+v.state+'">'+nat+'</span></div>'
        +'<div class="jrow jkv"><span class="jk">该干嘛</span><span class="jv">'+esc(ph.act+'：'+ph.pos)+'</span></div>'
        +'<div class="jrow jkv"><span class="jk">止损</span><span class="jv">'+esc(ph.stop)+'</span></div>'
        +'<div class="jrow jkv"><span class="jk">改口条件</span><span class="jv">'+esc(ph.flip)+'</span></div>';
    }
    if(!sec2) sec2='<div class="jrow"><span class="jk">合计</span><span class="jv muted">没有作答，无法算分</span></div>';
    var vetoHTML=v.vetoes&&v.vetoes.length
      ?'<div class="jrow jveto"><span class="jk">否决</span><span class="jv">'+esc(v.vetoes.join('；'))+'</span></div>'
      :'<div class="jrow"><span class="jk">否决</span><span class="jv muted">未命中</span></div>';
    return '<div class="jsec"><h4>选了哪些</h4>'+sec1+'</div>'
      +'<div class="jsec"><h4>凭什么</h4>'+sec2
      +'<div class="jrow jtot"><span class="jk">合计分</span><span class="jv num">'+(v.score>0?'+':'')+v.score+'</span></div>'
      +'<div class="jrow"><span class="jk">覆盖度</span><span class="jv num">'+v.coverage+' / '+v.denom+'</span></div>'
      +vetoHTML+'</div>'
      +'<div class="jsec"><h4>结论</h4>'+sec3+'</div>';
  }
  function openJudge(){
    if(!vData||!jWrap) return;
    jBody.innerHTML=judgePanelHTML();
    jDir=(vData.state==='good')?'top':'bottom';
    jWrap.className='jwrap '+jDir;
    jSheet.style.transition='';jSheet.style.transform='';
    jWrap.hidden=false;
    document.body.style.overflow='hidden';
    if(vBig) vBig.setAttribute('aria-expanded','true');
    if(vBig2) vBig2.setAttribute('aria-expanded','true');
    jOpen=true;
    setTimeout(function(){if(!jWrap.hidden) jWrap.classList.add('on');},20);
  }
  function closeJudge(){
    if(!jWrap||jWrap.hidden) return;
    jWrap.classList.remove('on');
    document.body.style.overflow='';
    jSheet.style.transform='';
    if(vBig) vBig.setAttribute('aria-expanded','false');
    if(vBig2) vBig2.setAttribute('aria-expanded','false');
    jOpen=false;
    setTimeout(function(){if(!jWrap.classList.contains('on')){jWrap.hidden=true;jSheet.style.transition='';}},300);
  }

  document.addEventListener('DOMContentLoaded',function(){
    initTheme();
    initSheet();
    ensureVerdictDOM();
    bindGlobalClick();
    if(document.body.dataset.page==='index') initIndex();
    else if(document.body.dataset.layer){initLayer();}
    initNav();
  });
})();

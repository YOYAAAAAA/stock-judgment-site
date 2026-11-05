(function(){
'use strict';

/* ============================================================
   全站配图：内联 SVG，1.5px 细线、圆角 8px、单一蓝主色，
   红色只表示上涨、绿色只表示下跌；量能一律中性蓝或灰。
   ============================================================ */
window.FIGS={
l1who:`<figure class="fig"><svg viewBox="0 0 480 150" role="img" aria-label="左边白线加权、黄线不加权；右边成交额柱对照五日基准">
  <text x="8" y="16" class="t-strong">谁在带动</text>
  <line class="grid" x1="10" y1="26" x2="232" y2="26"/>
  <polyline class="line-w" points="14,76 38,72 62,74 86,66 110,70 134,58 158,62 182,52 206,56 226,46"/>
  <polyline class="line-y" points="14,80 38,78 62,73 86,75 110,68 134,71 158,62 182,60 206,52 226,48"/>
  <line class="zero" x1="10" y1="84" x2="232" y2="84"/>
  <text x="10" y="108" class="t-mute">白线加权 · 黄线不加权</text>
  <line class="grid" x1="240" y1="8" x2="240" y2="148"/>
  <text x="252" y="16" class="t-strong">量能够不够</text>
  <rect class="bar-dim" x="256" y="56" width="20" height="34" rx="6"/>
  <rect class="bar-dim" x="286" y="50" width="20" height="40" rx="6"/>
  <rect class="bar-dim" x="316" y="60" width="20" height="30" rx="6"/>
  <rect class="bar-dim" x="346" y="44" width="20" height="46" rx="6"/>
  <rect class="bar-dim" x="376" y="54" width="20" height="36" rx="6"/>
  <line class="base" x1="248" y1="52" x2="472" y2="52"/>
  <rect class="bar" x="406" y="26" width="20" height="64" rx="6"/>
  <text x="416" y="22" class="t-accent" text-anchor="middle">今日</text>
  <line class="axis" x1="248" y1="90" x2="472" y2="90"/>
  <text x="248" y="112" class="t-mute">虚线＝五日基准</text>
</svg><figcaption class="fig-cap">示意，非实时。左边看谁在上，右边看今天的量够不够。</figcaption></figure>`,
l1breadth:`<figure class="fig"><svg viewBox="0 0 480 150" role="img" aria-label="指数红线在上行，上涨1200家、下跌3800家">
  <text x="8" y="16" class="t-strong">指数涨了，可多数股票在跌</text>
  <text x="8" y="46">上涨 1200 家</text>
  <rect class="bar-up" x="100" y="52" width="64" height="18" rx="6"/>
  <text x="8" y="88">下跌 3800 家</text>
  <rect class="bar-down" x="100" y="94" width="202" height="18" rx="6"/>
  <text x="8" y="144" class="t-mute">指数被权重股拉起，多数股没跟上</text>
  <text x="468" y="16" class="t-up" text-anchor="end">指数（红＝涨）</text>
  <line class="zero" x1="342" y1="96" x2="468" y2="96"/>
  <polyline class="line-up" points="344,92 356,88 368,82 380,86 392,76 404,70 416,64 428,56 440,50 452,44 464,38"/>
  <text x="468" y="122" class="t-down" text-anchor="end">多数股（绿＝跌）</text>
</svg><figcaption class="fig-cap">示意，非实时。指数由权重股拉起，但下跌家数更多。</figcaption></figure>`,
l1vol:`<figure class="fig"><svg viewBox="0 0 480 150" role="img" aria-label="今日成交额高于五日基准，下排是量比刻度">
  <text x="8" y="15" class="t-strong">今日成交额 vs 五日基准</text>
  <rect class="bar-dim" x="50" y="58" width="22" height="34" rx="5"/>
  <rect class="bar-dim" x="86" y="52" width="22" height="40" rx="5"/>
  <rect class="bar-dim" x="122" y="62" width="22" height="30" rx="5"/>
  <rect class="bar-dim" x="158" y="44" width="22" height="48" rx="5"/>
  <rect class="bar-dim" x="194" y="56" width="22" height="36" rx="5"/>
  <line class="base" x1="42" y1="54" x2="306" y2="54"/>
  <rect class="bar" x="230" y="30" width="22" height="62" rx="5"/>
  <text x="241" y="24" class="t-accent" text-anchor="middle">今日</text>
  <text x="312" y="58" class="t-mute">虚线＝五日基准</text>
  <line class="axis" x1="42" y1="92" x2="306" y2="92"/>
  <line class="rule" x1="42" y1="126" x2="306" y2="126"/>
  <line class="tick" x1="42" y1="121" x2="42" y2="131"/>
  <line class="tick" x1="174" y1="121" x2="174" y2="131"/>
  <line class="tick" x1="306" y1="121" x2="306" y2="131"/>
  <text x="42" y="116" class="t-accent" text-anchor="middle">1.0</text>
  <text x="174" y="116" class="t-accent" text-anchor="middle">1.2</text>
  <text x="306" y="116" class="t-accent" text-anchor="middle">1.5</text>
  <text x="42" y="145" class="t-mute" text-anchor="middle">常态</text>
  <text x="174" y="145" class="t-mute" text-anchor="middle">正常</text>
  <text x="306" y="145" class="t-mute" text-anchor="middle">明显放量</text>
</svg><figcaption class="fig-cap">柱＝成交额，用中性蓝；量比＝今日每分钟均量 ÷ 前 5 日同一时段均量。示意，非实时。</figcaption></figure>`,
l1pv:`<figure class="fig"><svg viewBox="0 0 480 150" role="img" aria-label="量价四种组合">
  <rect class="box" x="8" y="8" width="224" height="64" rx="8"/>
  <text x="20" y="32" class="t-up t-strong">放量上涨</text>
  <text x="20" y="54" class="t-mute">量价齐升，最健康</text>
  <rect class="box" x="240" y="8" width="232" height="64" rx="8"/>
  <text x="252" y="32" class="t-up t-strong">无量上涨</text>
  <text x="252" y="54" class="t-mute">缺资金确认，容易回落</text>
  <rect class="box" x="8" y="78" width="224" height="64" rx="8"/>
  <text x="20" y="102" class="t-down t-strong">放量下跌</text>
  <text x="20" y="124" class="t-mute">资金出逃，别追</text>
  <rect class="box" x="240" y="78" width="232" height="64" rx="8"/>
  <text x="252" y="102" class="t-down t-strong">缩量下跌</text>
  <text x="252" y="124" class="t-mute">没人接，继续观察</text>
</svg><figcaption class="fig-cap">四个象限只按价格涨跌着色；示意，非实时。</figcaption></figure>`,
l2cycle:`<figure class="fig"><svg viewBox="0 0 480 150" role="img" aria-label="题材生命周期的五个阶段：启动、发酵、高潮、退潮、冰点">
  <text x="8" y="16" class="t-strong">题材不是一条直线，是一段有温度的生命周期</text>
  <line class="grid" x1="10" y1="34" x2="470" y2="34"/>
  <line class="axis" x1="10" y1="118" x2="470" y2="118"/>
  <polyline class="line-accent" points="20,112 90,96 160,70 230,44 300,48 370,76 440,108"/>
  <circle class="dot" cx="90" cy="96" r="4"/>
  <circle class="dot" cx="230" cy="44" r="4"/>
  <circle class="dot" cx="370" cy="76" r="4"/>
  <text x="20" y="136" class="t-mute">启动</text>
  <text x="80" y="136" class="t-mute">发酵</text>
  <text x="202" y="136" class="t-strong">高潮</text>
  <text x="336" y="136" class="t-mute">退潮</text>
  <text x="430" y="136" class="t-mute">冰点</text>
  <text x="470" y="54" class="t-mute" text-anchor="end">情绪温度</text>
</svg><figcaption class="fig-cap">示意，非实时。先定位阶段，再决定是试错、持有，还是退出。</figcaption></figure>`,
l2ladder:`<figure class="fig"><svg viewBox="0 0 480 150" role="img" aria-label="涨停梯队：龙头、二线、跟风三层">
  <text x="8" y="16" class="t-strong">梯队完整，接力才在</text>
  <rect class="box-accent" x="16" y="30" width="140" height="42" rx="8"/>
  <text x="28" y="56" class="t-accent t-strong">龙头 · 5 板</text>
  <rect class="box" x="170" y="30" width="140" height="42" rx="8"/>
  <text x="182" y="56" class="t-strong">二线 · 2–3 板</text>
  <rect class="box" x="324" y="30" width="140" height="42" rx="8"/>
  <text x="336" y="56" class="t-mute">跟风 · 首板</text>
  <line class="axis" x1="156" y1="51" x2="168" y2="51"/>
  <line class="axis" x1="310" y1="51" x2="322" y2="51"/>
  <rect class="box" x="16" y="90" width="140" height="38" rx="8"/>
  <text x="28" y="114" class="t-mute">封住：情绪在</text>
  <rect class="box box-down" x="170" y="90" width="294" height="38" rx="8"/>
  <text x="182" y="114" class="t-mute">断层：二线不跟，退潮信号</text>
</svg><figcaption class="fig-cap">示意，非实时。看三层的连接，不只看最上面那只。</figcaption></figure>`,
l3trend:`<figure class="fig"><svg viewBox="0 0 480 150" role="img" aria-label="价格在 20 日线和 60 日线上方，均线向上">
  <text x="8" y="16" class="t-strong">趋势位阶：价格和两条均线的相对位置</text>
  <line class="axis" x1="16" y1="118" x2="464" y2="118"/>
  <polyline class="line-accent" points="20,104 80,100 140,92 200,92 260,82 320,80 380,70 440,64"/>
  <polyline class="line-accent" points="20,112 80,109 140,105 200,102 260,98 320,94 380,90 440,86" opacity=".55"/>
  <polyline class="line-up" points="20,100 80,88 140,82 200,68 260,62 320,52 380,44 440,32"/>
  <text x="446" y="52" class="t-up" text-anchor="end">价格</text>
  <text x="446" y="82" class="t-accent" text-anchor="end">20 日线</text>
  <text x="446" y="104" class="t-mute" text-anchor="end">60 日线</text>
  <text x="16" y="140" class="t-mute">两条均线同向向上，回踩才有观察价值</text>
</svg><figcaption class="fig-cap">示意，非实时。均线只描述过去，不负责预测未来。</figcaption></figure>`,
l3rr:`<figure class="fig"><svg viewBox="0 0 480 150" role="img" aria-label="现价在压力位和支撑位之间，上方空间大于下方风险">
  <text x="8" y="16" class="t-strong">位置决定风险收益比</text>
  <line class="base" x1="24" y1="44" x2="456" y2="44"/>
  <text x="456" y="38" class="t-up" text-anchor="end">压力位 · 上方约 8 个点</text>
  <line class="axis" x1="24" y1="94" x2="456" y2="94"/>
  <text x="456" y="112" class="t-down" text-anchor="end">支撑位 · 下方约 4 个点</text>
  <line class="line-accent" x1="24" y1="72" x2="456" y2="72"/>
  <text x="456" y="90" class="t-accent" text-anchor="end">现价</text>
  <line class="tick" x1="110" y1="42" x2="110" y2="46"/>
  <line class="tick" x1="110" y1="92" x2="110" y2="96"/>
  <line class="tick" x1="110" y1="70" x2="110" y2="74"/>
</svg><figcaption class="fig-cap">示意，非实时。离压力太近，赚的空间不够覆盖止损，就不值得动手。</figcaption></figure>`,
l4resonance:`<figure class="fig"><svg viewBox="0 0 480 150" role="img" aria-label="量价、指标、周期三个信号同向">
  <text x="8" y="16" class="t-strong">共振＝三个独立信号指向同一方向</text>
  <rect class="box" x="16" y="34" width="136" height="76" rx="8"/>
  <text x="30" y="60" class="t-strong">量价</text>
  <text x="30" y="84" class="t-mute">放量上涨</text>
  <circle class="dot" cx="136" cy="54" r="5"/>
  <rect class="box" x="172" y="34" width="136" height="76" rx="8"/>
  <text x="186" y="60" class="t-strong">指标</text>
  <text x="186" y="84" class="t-mute">MACD 同向</text>
  <circle class="dot" cx="292" cy="54" r="5"/>
  <rect class="box" x="328" y="34" width="136" height="76" rx="8"/>
  <text x="342" y="60" class="t-strong">周期</text>
  <text x="342" y="84" class="t-mute">日线周线同向</text>
  <circle class="dot" cx="448" cy="54" r="5"/>
  <text x="16" y="136" class="t-mute">三个都同向，信号更强；有一个冲突，就降级</text>
</svg><figcaption class="fig-cap">示意，非实时。共振提高可信度，但不取消止损。</figcaption></figure>`,
l4div:`<figure class="fig"><svg viewBox="0 0 480 150" role="img" aria-label="价格创新高但成交量在缩小，形成量价背离">
  <text x="8" y="16" class="t-strong">价格新高，量却越来越小</text>
  <line class="zero" x1="16" y1="90" x2="464" y2="90"/>
  <polyline class="line-up" points="20,82 80,74 140,62 200,54 260,46 320,38 380,32 440,26"/>
  <text x="446" y="52" class="t-up" text-anchor="end">价格</text>
  <rect class="bar-dim" x="226" y="104" width="20" height="28" rx="5"/>
  <rect class="bar-dim" x="286" y="112" width="20" height="20" rx="5"/>
  <rect class="bar-dim" x="346" y="118" width="20" height="14" rx="5"/>
  <rect class="bar-dim" x="406" y="124" width="20" height="8" rx="5"/>
  <text x="446" y="142" class="t-mute" text-anchor="end">成交量在缩</text>
  <text x="16" y="140" class="t-mute">价格往上，成交量往下：推力在减弱</text>
</svg><figcaption class="fig-cap">示意，非实时。背离只是提醒，不是立即反手。</figcaption></figure>`,
l5chips:`<figure class="fig"><svg viewBox="0 0 480 150" role="img" aria-label="筹码成本分布，现价上方有一片套牢区">
  <text x="8" y="16" class="t-strong">筹码分布：看现价上方有多少人等解套</text>
  <line class="axis" x1="150" y1="24" x2="150" y2="132"/>
  <line class="grid" x1="150" y1="38" x2="460" y2="38"/>
  <line class="grid" x1="150" y1="62" x2="460" y2="62"/>
  <line class="grid" x1="150" y1="86" x2="460" y2="86"/>
  <line class="grid" x1="150" y1="110" x2="460" y2="110"/>
  <rect class="bar-dim" x="158" y="44" width="150" height="12" rx="6"/>
  <rect class="bar-dim" x="158" y="68" width="230" height="12" rx="6"/>
  <rect class="bar-dim" x="158" y="92" width="110" height="12" rx="6"/>
  <rect class="bar" x="158" y="116" width="64" height="12" rx="6"/>
  <text x="318" y="52" class="t-mute">高位套牢</text>
  <text x="398" y="76" class="t-mute">平均成本</text>
  <text x="278" y="100" class="t-mute">近期换手</text>
  <text x="232" y="124" class="t-accent">现价附近</text>
  <line class="zero" x1="150" y1="106" x2="460" y2="106"/>
</svg><figcaption class="fig-cap">示意，非实时。上方筹码越厚，反弹时的卖压越重。</figcaption></figure>`,
l5cash:`<figure class="fig"><svg viewBox="0 0 480 150" role="img" aria-label="净利润高于经营现金流，差额是应计利润">
  <text x="8" y="16" class="t-strong">利润和现金流，差在哪</text>
  <line class="axis" x1="30" y1="118" x2="300" y2="118"/>
  <rect class="bar-dim" x="64" y="42" width="46" height="76" rx="6"/>
  <text x="87" y="134" class="t-mute" text-anchor="middle">净利润</text>
  <text x="87" y="34" class="t-strong" text-anchor="middle">100</text>
  <rect class="bar" x="150" y="70" width="46" height="48" rx="6"/>
  <text x="173" y="134" class="t-mute" text-anchor="middle">经营现金流</text>
  <text x="173" y="62" class="t-accent" text-anchor="middle">60</text>
  <line class="base" x1="96" y1="42" x2="150" y2="42"/>
  <text x="316" y="58" class="t-strong">差额＝应计利润</text>
  <text x="316" y="82" class="t-mute">账面赚了，钱还没到账</text>
  <text x="316" y="106" class="t-mute">差得越久，越要查应收</text>
</svg><figcaption class="fig-cap">示意，非实时。经营现金流长期低于净利润，利润质量要打折。</figcaption></figure>`,
l6risk:`<figure class="fig"><svg viewBox="0 0 480 150" role="img" aria-label="买入价、止损位与风险距离">
  <text x="8" y="16" class="t-strong">先定错在哪走，再决定买多少</text>
  <line class="axis" x1="24" y1="118" x2="456" y2="118"/>
  <line class="line-accent" x1="24" y1="56" x2="456" y2="56"/>
  <text x="454" y="50" class="t-accent" text-anchor="end">买入价</text>
  <line class="zero" x1="24" y1="100" x2="456" y2="100"/>
  <text x="454" y="116" class="t-down" text-anchor="end">止损位 · 结构下方</text>
  <line class="line-up" x1="24" y1="78" x2="120" y2="78" opacity="0"/>
  <text x="24" y="88" class="t-mute">风险距离＝买入价 − 止损价</text>
  <text x="24" y="140" class="t-mute">止损被触发就执行，不临时改规则</text>
</svg><figcaption class="fig-cap">示意，非实时。止损位来自价格结构，不来自“我能亏多少”。</figcaption></figure>`,
l6position:`<figure class="fig"><svg viewBox="0 0 480 150" role="img" aria-label="仓位由总资金、单笔风险比例和止损距离计算">
  <text x="8" y="16" class="t-strong">仓位＝风险预算 ÷ 止损距离</text>
  <rect class="box" x="16" y="38" width="132" height="56" rx="8"/>
  <text x="30" y="62" class="t-mute">总资金</text>
  <text x="30" y="82" class="t-strong">全部</text>
  <text x="160" y="70" class="t-accent" text-anchor="middle">×</text>
  <rect class="box" x="178" y="38" width="132" height="56" rx="8"/>
  <text x="192" y="62" class="t-mute">单笔风险</text>
  <text x="192" y="82" class="t-strong">百分之一</text>
  <text x="322" y="70" class="t-accent" text-anchor="middle">=</text>
  <rect class="box-accent" x="340" y="38" width="124" height="56" rx="8"/>
  <text x="352" y="62" class="t-mute">风险预算</text>
  <text x="352" y="82" class="t-accent t-strong">百分之一总资金</text>
  <line class="axis" x1="16" y1="112" x2="464" y2="112"/>
  <text x="16" y="136" class="t-mute">百分之一 ÷ 半成止损距离＝最多两成仓位；距离越远，仓位越小</text>
</svg><figcaption class="fig-cap">示意，非实时。先算最大亏损，再倒推能买多少。</figcaption></figure>`
};

/* ============================================================
   第一层：大盘环境
   ============================================================ */
window.LAYERS=[];
window.LAYERS.push({
id:'layer1',no:1,kicker:'Layer 01 / 大盘环境',
title:'今天是谁在带动？量能够不够？',
preview:{ask:'谁在带动、带动有多真；量能够不够、量价配不配',stop:'今天适不适合继续看个股'},
fig:'l1who',
entries:[
{id:'who',mark:'A',label:'今天是谁在带动？',desc:'看白线黄线、涨跌家数、领涨板块，判断是权重、普涨，还是少数板块硬撑。',steps:3,first:'a1'},
{id:'vol',mark:'B',label:'量能够不够？',desc:'看成交额和量比，再和昨天的量价配合对照，判断这波有没有资金跟。',steps:3,first:'b1'}
],
nodes:{
a1:{step:'',short:'白线黄线谁在上',title:'指数的白线和黄线，谁在上面？',
 plain:'打开上证指数的分时图，看两条线：{white}和{yellow}。哪条在上面，就先说明今天是谁在出力。',
 terms:['white','yellow','weighted','unweighted'],
 where:['上证指数分时图，多数行情软件默认显示白、黄两条线','看哪条在上、两条线距离是否越拉越开','不要用个股分时图代替指数分时图'],
 src:[['教材方法','指数编制与加权口径：白线加权、黄线不加权'],['学术共识','Bodie《Investments》：先扣掉市场 β，再判断个股']],
 options:[
  {k:'white',label:'白线在上',mean:'大市值权重股在拉，指数比多数股票好看。',next:'a2'},
  {k:'yellow',label:'黄线在上',mean:'中小盘更活跃，赚钱效应可能比指数更好。',next:'a2'},
  {k:'flat',label:'两线贴合',mean:'权重和中小盘步调接近，方向暂时没有明显偏向。',next:'a2'}],
 next:'a2'},
a2:{step:'',short:'带动有多真',title:'指数涨了，是个股普涨还是少数在撑？',
 plain:'看{breadth}。指数上涨但下跌家数明显更多，说明拉动只来自少数股票，{contribution}会很集中。',
 terms:['breadth','contribution'],
 where:['行情软件的“涨跌家数”或“上涨 / 下跌 / 平盘”统计','两市上涨家数与下跌家数对比','指数涨幅和涨跌家数是否同向'],
 src:[['教材方法','指数编制：大市值股权重更高'],['业内经验','指数与涨跌家数背离，常用来识别“指数失真”']],
 fig:'l1breadth',
 options:[
  {k:'broad',label:'上涨家数明显更多',mean:'普涨，环境健康，个股容错更高。',next:'a3'},
  {k:'narrow',label:'下跌家数更多',mean:'少数股票在撑指数，追个股容易踩空。',next:'a3'},
  {k:'mixed',label:'两边差不多',mean:'分化行情，只能挑最强的方向。',next:'a3'}],
 next:'a3'},
a3:{step:'',short:'领涨的宽度',title:'领涨的是很多板块，还是只有一两个？',
 plain:'看板块涨幅榜和{limitup}。只有一两个板块在涨、龙头还封不住，这波带动就不结实。',
 terms:['limitup','contribution'],
 where:['板块涨幅榜前 5 名','前 3 个板块的成交额占两市比重','领涨板块里涨停家数、龙头是否封住'],
 src:[['业内经验','板块宽度与龙头封板是盘口经验，缺严格统计证据'],['学术共识','Bodie《Investments》：公开信息很快被定价']],
 options:[
  {k:'broad',label:'多个板块一起涨，龙头封住',mean:'带动有宽度，持续性更好。',next:'END'},
  {k:'one',label:'只有一两个板块，龙头封住',mean:'结构性行情，只能做这一条线。',next:'END'},
  {k:'failed',label:'只有一两个板块，龙头反复打开',mean:'带动偏假，容易一日游。',next:'END'}],
 next:'END'},
b1:{step:'',short:'成交额比平时',title:'今天的成交额，比平时大还是小？',
 plain:'量能就是{amount}。先和{ma5}比，再看比昨天多还是少。',
 terms:['amount','ma5'],
 where:['两市合计成交额，不是单个指数的成交额','今天的成交额 vs 5 日平均成交额','今天的成交额 vs 昨天'],
 src:[['教材方法','Murphy《Technical Analysis of the Financial Markets》：量是价的燃料'],['学术共识','Bodie《Investments》：量价关系是统计倾向，不是定律']],
 fig:'l1vol',
 options:[
  {k:'up',label:'明显高于五日线（约涨一成以上）',mean:'有增量资金进场，涨跌更容易延续。',next:'b2'},
  {k:'flat',label:'和五日线差不多（上下不超过一成）',mean:'存量博弈，方向持续性弱。',next:'b2'},
  {k:'down',label:'明显低于五日线',mean:'资金在退，反弹容易无量。',next:'b2'}],
 next:'b2'},
b2:{step:'',short:'量比',title:'开盘到现在，量比是多少？',
 plain:'{ratio}把今天的成交速度和最近五天比。1.0 附近是常态，1.5 以上才算明显放量。',
 terms:['ratio'],
 where:['指数或个股分时页的“量比”字段','9:30–10:00 量比波动最大，别用开盘一分钟下结论','量比要和价格方向一起看'],
 src:[['业内经验','量比阈值 1.0 / 1.2 / 1.5 是经验值，不同软件算法略有差异'],['教材方法','Murphy：量价需要互相确认']],
 options:[
  {k:'high',label:'1.5 及以上',mean:'明显放量，有资金主动参与。',next:'b3'},
  {k:'mid',label:'1.0–1.2',mean:'量能正常，谈不上放量。',next:'b3'},
  {k:'low',label:'1.0 以下',mean:'缩量，观望资金多。',next:'b3'}],
 next:'b3'},
b3:{step:'',short:'量价配不配',title:'放量的时候，价格是涨还是跌？',
 plain:'把量能和价格放在一起看：{energy}放大时，价格同向才算配合。',
 terms:['energy','priceVolume'],
 where:['分时图的价格线与成交量柱','今天涨跌方向 vs 成交量柱高低','放量出现在上涨段还是下跌段'],
 src:[['教材方法','Murphy：量价关系九法则'],['业内经验','分时放量的真假要结合位置，属经验判断']],
 fig:'l1pv',
 options:[
  {k:'upVol',label:'放量上涨',mean:'量价齐升，最健康的组合。',next:'END'},
  {k:'upNo',label:'无量上涨',mean:'缺资金确认，涨得虚，容易回落。',next:'END'},
  {k:'downVol',label:'放量下跌',mean:'有资金出逃，别接。',next:'END'},
  {k:'downNo',label:'缩量下跌',mean:'抛压不重，但也没人接，继续观察。',next:'END'}],
 next:'END'}
},
partial:function(id,a){
 if(id==='who'){
  var t=a.a1==='white'?'权重在拉':(a.a1==='yellow'?'中小盘在拉':'没有明显偏向');
  var sub=a.a1==='white'?'白线在上，说明大市值权重股出力更多。指数好看，不代表你手里的小股票也在涨。':(a.a1==='yellow'?'黄线在上，说明中小盘更活跃。指数可能一般，但个股体感更好。':'两线贴合，权重和中小盘步调接近，今天没有明显偏向。');
  return {t:t,tag:'还差量能',sub:sub};
 }
 return {t:a.b1==='up'?'有增量资金':(a.b1==='down'?'资金在退':'存量博弈'),tag:'还差带动',sub:'量能只说明有没有钱进来。还得看是谁在拉、拉得宽不宽，才能判断环境能不能用。'};
},
checks:function(a){
 return [
 {t:'带动有宽度',d:(a.a2?a.a2:'')||(a.a3?a.a3:'')?'已查第 2、3 步':'还没查',s:(a.a2==='narrow'||a.a3==='failed')?'bad':((a.a2==='broad')?'ok':'unk')},
 {t:'资金在跟',d:a.b1?('成交额：'+optText(this,'b1',a.b1)):'还没查',s:(a.b1==='down'||a.b2==='low')?'bad':((a.b1==='up'||a.b2==='high')?'ok':'unk')},
 {t:'量价配合',d:a.b3?optText(this,'b3',a.b3):'还没查',s:a.b3==='upVol'?'ok':(a.b3==='downVol'?'bad':'unk')}
 ];
},
verdict:function(a){
 if(a.b3==='downVol') return {t:'干脆不做',tag:'回避',sub:'放量下跌，说明有资金在出逃。今天的环境不支持动手。'};
 if(a.b3==='upNo') return {t:'只能看',tag:'先观察',sub:'无量上涨，涨得虚。没有资金确认，追进去容易回落。'};
 if(a.b3==='downNo') return {t:'只能看',tag:'先观察',sub:'缩量下跌，抛压不重但也没人接。等量能回来再说。'};
 if(a.a2==='narrow'||a.a3==='failed') return {t:'只能看',tag:'环境偏窄',sub:'量价配合不错，但带动只来自少数股票。做也只能做最强的那条线。'};
 return {t:'可以动手',tag:'环境可用',sub:'量价齐升，带动有宽度。这个环境允许你继续看个股，但个股仍要单独验证。'};
},
foot:'来源锚定：指数加权与市场 β（Bodie《Investments》，学术共识）；量价关系（Murphy《Technical Analysis of the Financial Markets》，教材方法）；盘口与板块经验只作参考，不作必答依据。'
});

/* ============================================================
   第二层：板块题材
   ============================================================ */
window.LAYERS.push({
id:'layer2',no:2,kicker:'Layer 02 / 板块题材',
title:'这条题材，走到哪一步了？',
lede:'先看板块，不看个股。题材有生命周期：<strong>启动、发酵、高潮、退潮</strong>。位置不同，做法完全不同。',
preview:{ask:'阶段在启动、发酵还是退潮；资金还在不在',stop:'这条线还能不能接力'},
fig:'l2cycle',
entries:[
{id:'stage',mark:'A',label:'这条线走到哪一步了？',desc:'用涨幅榜、涨停家数、龙头状态，把阶段定位出来。',steps:3,first:'s1'},
{id:'flow',mark:'B',label:'资金还在不在？',desc:'看板块成交额占比、资金流向、封板质量，判断是接力还是撤退。',steps:3,first:'f1'}
],
nodes:{
s1:{short:'阶段定位',title:'这个板块，今天是第一次上榜，还是已经涨了几天？',
 plain:'先看{stage}：涨幅榜名次、板块内{limitup}、连板高度。第一次上榜和连涨五天，含义完全不同。',
 terms:['stage','limitup','ladder'],
 where:['板块涨幅榜前 5 名','板块内涨停家数与最高连板','这个板块连续上榜几天'],
 src:[['教材方法','Murphy《Technical Analysis of the Financial Markets》：趋势分阶段'],['业内经验','板块生命周期与涨停梯队是盘口经验，仅作参考']],
 options:[
  {k:'fresh',label:'首次上榜，涨停 ≤3 家',mean:'刚点火，还处在试错期。',next:'s2_fresh'},
  {k:'mid',label:'连续 3–5 天上榜，涨停 5–10 家',mean:'进入发酵期，资金开始扩散。',next:'s2_mid'},
  {k:'late',label:'排名下滑，涨停家数锐减',mean:'进入退潮期，先想怎么退。',next:'s2_late'}],
 next:'s2_fresh'},
s2_fresh:{short:'消息真假',title:'消息是第一次出现，还是旧闻重提？',
 plain:'启动第一天最怕把{theme}当成{consensus}。看消息源头：政策文件、公司公告，还是群里的截图。',
 terms:['theme','consensus','catalyst'],
 where:['交易所公告 / 部委官网原文','主流财经媒体首发时间','板块内公司是否公告相关业务'],
 src:[['学术共识','Bodie《Investments》：公开信息会被快速定价'],['业内经验','消息层级与真伪判断，属业内经验']],
 options:[
  {k:'new',label:'新政策或新订单，找得到原文',mean:'有真实催化，值得继续跟踪。',next:'s3'},
  {k:'old',label:'旧消息被重新翻出来',mean:'没有新增信息，更多是情绪反弹。',next:'s3'},
  {k:'rumor',label:'只有传闻，找不到原文',mean:'证据不足，直接降级。',next:'s3'}],
 next:'s3'},
s2_mid:{short:'板块宽度',title:'是整条板块在涨，还是只有龙头在涨？',
 plain:'发酵期看{ladder}：龙头继续封住、二线跟涨，才是健康。只有{leader}独涨，说明{relay}资金不够。',
 terms:['ladder','leader','relay'],
 where:['板块内涨幅超过半成的家数','龙头与二线股的涨幅差','昨日涨停股今天的表现'],
 src:[['教材方法','Murphy：趋势需要成交量扩散确认'],['业内经验','龙头与二线接力是盘口观察']],
 fig:'l2ladder',
 options:[
  {k:'broad',label:'普涨，二线在接力',mean:'宽度健康，行情还能延续。',next:'s3'},
  {k:'split',label:'龙头独强，二线不跟',mean:'只剩抱团，扩散失败。',next:'s3'},
  {k:'weak',label:'龙头也松动，跟风股回落',mean:'情绪开始退，别再追高。',next:'s3'}],
 next:'s3'},
s2_late:{short:'退潮确认',title:'龙头开始补跌了吗？',
 plain:'退潮期先看{leader}：龙头补跌、昨日涨停今天大面，说明情绪在退。别用“跌多了”当理由。',
 terms:['leader','limitup','divergence'],
 where:['龙头股是否跌破 5 日线','昨日涨停股今日平均涨幅','板块内跌停和大阴线家数'],
 src:[['教材方法','Murphy：趋势破坏后先退出观察'],['业内经验','退潮期判断属盘口经验']],
 options:[
  {k:'fallen',label:'龙头补跌，昨日涨停大面',mean:'退潮已确认，先退出。',next:'s3'},
  {k:'flat',label:'龙头高位横盘，没有补跌',mean:'还没退干净，等方向。',next:'s3'},
  {k:'handoff',label:'新龙头接棒，老龙头休息',mean:'可能换主线，不是简单退潮。',next:'s3'}],
 next:'s3'},
s3:{short:'量能配合',title:'今天板块成交额，是放大还是萎缩？',
 plain:'用{volumeShare}配合阶段：启动要放量，发酵可温和放量，退潮再放量常是出货。',
 terms:['volumeShare','energy','divergence'],
 where:['板块成交额 / 两市成交额','今日 vs 5 日平均','放量出现在上涨段还是下跌段'],
 src:[['教材方法','Murphy：量价关系九法则'],['学术共识','Bodie：量价关系是统计倾向']],
 options:[
  {k:'expand',label:'明显放大',mean:'有增量资金，阶段还能延续。',next:'END'},
  {k:'flat',label:'和平时差不多',mean:'存量博弈，持续性一般。',next:'END'},
  {k:'shrink',label:'明显萎缩',mean:'资金在撤，随时可能断档。',next:'END'}],
 next:'END'},
f1:{short:'资金占比',title:'板块成交额占两市比重，在升还是在降？',
 plain:'{volumeShare}能看出资金是不是往这里集中。占比升、价格也升，才是真吸金。',
 terms:['volumeShare','energy','mainFlow'],
 where:['板块成交额占两市比重','今日 vs 昨日和 5 日平均','价格方向与占比是否同向'],
 src:[['教材方法','Murphy：量能确认价格方向'],['业内经验','板块资金占比是软件统计口径，仅作参考']],
 options:[
  {k:'up',label:'占比上升',mean:'资金在往这里集中。',next:'f2_up'},
  {k:'flat',label:'占比基本持平',mean:'存量资金，内部在切。',next:'f2_mid'},
  {k:'down',label:'占比下降',mean:'资金正在离开。',next:'f2_down'}],
 next:'f2_up'},
f2_up:{short:'资金性质',title:'资金是净流入，还是只剩存量在倒手？',
 plain:'看{mainFlow}和{turnover}。流入加上换手温和，才是增量；换手暴增但价格不涨，可能是对倒。',
 terms:['mainFlow','turnover','relay'],
 where:['主力或北向净流入，注意软件口径不同','板块换手率','龙头成交额占板块比重'],
 src:[['业内经验','资金流向统计口径差异大，只作参考'],['教材方法','Murphy：量价需要互相确认']],
 options:[
  {k:'inflow',label:'净流入，换手温和',mean:'增量资金在进，接力健康。',next:'f3'},
  {k:'rotation',label:'流入流出不明显，内部轮动',mean:'存量博弈，只能做最强分支。',next:'f3'},
  {k:'outflow',label:'净流出，龙头放量下跌',mean:'资金在撤，不接。',next:'f3'}],
 next:'f3'},
f2_mid:{short:'资金集中度',title:'资金是在向龙头集中，还是在向外扩散？',
 plain:'占比持平时看集中度：{leader}吸走大部分成交，二线没量，说明只是存量抱团。',
 terms:['leader','relay'],
 where:['龙头成交额 / 板块成交额','涨幅前 10 名成交额占比','二线股是否缩量'],
 src:[['业内经验','集中度是盘口观察，缺严格统计'],['学术共识','Bodie：少数权重股会主导指数表现']],
 options:[
  {k:'focus',label:'向龙头集中，二线没量',mean:'存量抱团，扩散失败。',next:'f3'},
  {k:'diffuse',label:'向二线扩散，龙头让位',mean:'接力还在，可以继续看。',next:'f3'},
  {k:'unclear',label:'看不出来，成交很散',mean:'没有主线，先观望。',next:'f3'}],
 next:'f3'},
f2_down:{short:'流出性质',title:'流出的是短线资金，还是配置资金？',
 plain:'缩量下跌多为短线撤退；放量下跌要警惕{divergence}。区分不了就按最坏情况。',
 terms:['divergence','mainFlow','energy'],
 where:['板块成交额变化','龙头是否放量下跌','机构重仓股是否同步走弱'],
 src:[['教材方法','Murphy：放量下跌先退出'],['业内经验','资金属性判断属经验，不作必答']],
 options:[
  {k:'short',label:'缩量，龙头只是小跌',mean:'短线在退，还没到崩。',next:'f3'},
  {k:'config',label:'放量，权重股同步走弱',mean:'配置资金也在撤，风险更高。',next:'f3'},
  {k:'unknown',label:'分不清，数据互相矛盾',mean:'按最坏情况处理。',next:'f3'}],
 next:'f3'},
f3:{short:'封板质量',title:'龙头还封得住吗？',
 plain:'{seal}是情绪的温度计。封住且不开板，接力还在；反复打开或{breakSeal}，分歧已经出现。',
 terms:['seal','breakSeal','ladder'],
 where:['龙头涨停封单量','开板次数与回封时间','同板块跟风股是否炸板'],
 src:[['业内经验','封板质量是盘口经验，不作必答依据'],['教材方法','Murphy：量价背离要先降级']],
 options:[
  {k:'sealed',label:'封住，全天没开板',mean:'情绪还在，接力未断。',next:'END'},
  {k:'open',label:'开过板，又回封',mean:'有分歧，但还能撑。',next:'END'},
  {k:'broken',label:'炸板后没回封',mean:'分歧转退潮，先退。',next:'END'}],
 next:'END'}
},
partial:function(id,a){
 if(id==='stage'){
  var t=a.s1==='fresh'?'刚点火':(a.s1==='mid'?'在发酵':(a.s1==='late'?'在退潮':'阶段未明'));
  return {t:t,tag:'还差资金',sub:'阶段只说明位置，不说明还有没有钱接力。退潮期再便宜也不要接。'};
 }
 return {t:a.f3==='broken'?'资金在撤':(a.f3==='sealed'?'接力还在':'有分歧'),tag:'还差阶段',sub:'资金只说明今天有没有人接。还要看它处在启动、发酵还是退潮，才能判断值不值得跟。'};
},
checks:function(a){
 return [
 {t:'阶段不在退潮',d:a.s1==='late'?'已进退潮':(a.s1==='fresh'?'启动期':(a.s1==='mid'?'发酵期':'还没查')),s:a.s1==='late'?'bad':(a.s1?'ok':'unk')},
 {t:'资金在集中或流入',d:a.f1==='down'?'占比下降':(a.f1==='up'?'占比上升':'还没查'),s:a.f1==='down'?'bad':(a.f1==='up'?'ok':'unk')},
 {t:'龙头封得住',d:a.f3==='broken'?'炸板未回封':(a.f3==='sealed'?'封住':'还没查'),s:a.f3==='broken'?'bad':(a.f3==='sealed'?'ok':'unk')}
 ];
},
verdict:function(a){
 if(a.s1==='late'||a.f3==='broken') return {t:'先退出来',tag:'退潮',sub:'阶段或封板已经转弱。退潮期的主要任务是别亏钱，不是找反弹。'};
 if(a.f1==='down') return {t:'不接力',tag:'资金在撤',sub:'占比下降说明钱在离开。没有资金接力的题材，涨也是最后一跳。'};
 if(a.s1==='fresh'&&a.f1==='up'&&a.f3==='sealed') return {t:'可以关注',tag:'等确认',sub:'启动、资金进、龙头封住，三个条件齐了。但新题材还要等第二天确认。'};
 if(a.s1==='mid'&&a.f3==='sealed') return {t:'只做最强',tag:'结构性',sub:'发酵期还能做，但只做龙头或最强二线，不扩散到跟风股。'};
 return {t:'降级观察',tag:'证据不足',sub:'阶段、资金、封板至少有一项不清楚。看不懂就不做。'};
},
foot:'来源锚定：趋势与量价（Murphy《Technical Analysis of the Financial Markets》，教材方法）；有效市场与信息定价（Bodie《Investments》，学术共识）；板块生命周期、涨停梯队与封板质量属业内经验，仅作参考，不作必答依据。'
});

/* ============================================================
   第三层：个股位置
   ============================================================ */
window.LAYERS.push({
id:'layer3',no:3,kicker:'Layer 03 / 个股位置',
title:'这只股票，现在站在什么位置？',
lede:'位置不是“涨了多少”，而是<strong>价格相对趋势、相对大盘、相对关键位</strong>各处在哪。位置错了，后面再好的信号也打折。',
preview:{ask:'趋势在什么位阶、相对强弱如何、离关键位多远',stop:'这只票该不该进观察池'},
fig:'l3trend',
entries:[
{id:'trend',mark:'A',label:'趋势在什么位阶？',desc:'用 20 日、60 日线和回踩结构，判断是上升、震荡还是下降。',steps:3,first:'p1'},
{id:'rs',mark:'B',label:'相对强弱如何？',desc:'和大盘、和板块比，再看大盘下跌时它抗不抗跌。',steps:3,first:'r1'}
],
nodes:{
p1:{short:'趋势位阶',title:'现价和 20 日线、60 日线，是什么关系？',
 plain:'看价格和{ma20}、{ma60}的关系，先定{trend}位阶。价格在两条线上方、两条线都向上，才算上升趋势。',
 terms:['ma20','ma60','trend'],
 where:['日线图上的 20 日、60 日均线','价格在均线上方还是下方','两条均线本身向上、走平还是向下'],
 src:[['教材方法','Murphy《Technical Analysis of the Financial Markets》：均线与趋势'],['学术共识','Bodie《Investments》：先看市场 β 再看个股']],
 options:[
  {k:'up',label:'价格在两条线上方，均线向上',mean:'上升趋势，回踩才有观察价值。',next:'p2_up'},
  {k:'range',label:'价格在两条线之间来回穿',mean:'震荡区间，方向未定。',next:'p2_range'},
  {k:'down',label:'价格在两条线下方，均线向下',mean:'下降趋势，反弹先当逃命。',next:'p2_down'}],
 next:'p2_up'},
p2_up:{short:'回踩守没守',title:'上涨趋势里，回踩 20 日线时守住了吗？',
 plain:'上升趋势看{pullback}：价格回到 20 日线附近，缩量守住是健康；放量跌破，说明{support}失守。',
 terms:['pullback','support'],
 where:['回踩当天的成交量','20 日线附近是否有长下影','收盘价是否收在 20 日线上方'],
 src:[['教材方法','Murphy：趋势中的回踩与支撑'],['业内经验','支撑有效性属盘口经验，仅作参考']],
 options:[
  {k:'hold',label:'缩量回踩，收盘守住',mean:'趋势还在，风险相对可控。',next:'p3'},
  {k:'brief',label:'盘中跌破，收盘收回',mean:'支撑被测试，但还没失守。',next:'p3'},
  {k:'break',label:'放量跌破，收不回来',mean:'趋势破坏，先退出观察。',next:'p3'}],
 next:'p3'},
p2_range:{short:'区间位置',title:'震荡区间里，现价靠近上沿、中部还是下沿？',
 plain:'{range}里，靠近上沿追突破最容易买假；靠近下沿才有{support}保护。先量出最近 20 日的高低点。',
 terms:['range','resistance','support'],
 where:['最近 20 日最高价和最低价','现价在区间中的百分位','区间上下沿是否被反复触碰'],
 src:[['教材方法','Murphy：区间与突破'],['业内经验','区间边界是观察工具，不是精确预测']],
 options:[
  {k:'upper',label:'靠近区间上沿',mean:'向上空间小，假突破风险高。',next:'p3'},
  {k:'middle',label:'在区间中部',mean:'不上不下，等方向。',next:'p3'},
  {k:'lower',label:'靠近区间下沿',mean:'有支撑可参考，但要看是否守住。',next:'p3'}],
 next:'p3'},
p2_down:{short:'反弹压力',title:'下降趋势里，反弹到 20 日线时被压回了吗？',
 plain:'下降趋势先看{ma20}：反弹到均线附近放量被压回，说明卖压还在；站上去并站稳，才谈反转。',
 terms:['ma20','trend'],
 where:['反弹到 20 日线时的成交量','上影线和收盘位置','是否创出新的低点'],
 src:[['教材方法','Murphy：下降趋势中的反弹'],['学术共识','Bodie：趋势不等于未来收益保证']],
 options:[
  {k:'rejected',label:'到均线就被压回',mean:'下降趋势延续，不接。',next:'p3'},
  {k:'newlow',label:'已经创出新低',mean:'还在下跌，先等止跌。',next:'p3'},
  {k:'base',label:'在低位横盘，均线走平',mean:'可能筑底，但还没确认。',next:'p3'}],
 next:'p3'},
p3:{short:'离关键位多远',title:'现价离最近的支撑和压力，有多远？',
 plain:'看离最近{support}和{resistance}的距离。离压力太近，赚的空间不够覆盖止损，就不值得动手。',
 terms:['support','resistance'],
 where:['最近一个明显前高或前低','现价到压力位、支撑位的距离','这段空间能不能覆盖你的止损'],
 src:[['业内经验','支撑压力是盘口经验，缺严格统计证据'],['学术共识','Damodaran《Investment Valuation》：价格要对应未来现金流']],
 fig:'l3rr',
 options:[
  {k:'close',label:'离压力不到 3 个点',mean:'空间太窄，风险收益比不划算。',next:'END'},
  {k:'mid',label:'离压力 3 到 8 个点',mean:'空间一般，要看止损位置。',next:'END'},
  {k:'far',label:'离压力 8 个点以上',mean:'空间足够，但仍要验证趋势。',next:'END'}],
 next:'END'},
r1:{short:'对大盘强弱',title:'近 20 日，它跑赢大盘了吗？',
 plain:'{relativeStrength}就是相对大盘的超额表现。还要看{beta}：高 β 的股票，大盘一跌它往往跌更多。',
 terms:['relativeStrength','beta'],
 where:['个股 20 日涨幅 vs 指数 20 日涨幅','上涨日是否比指数涨得多','下跌日是否比指数跌得少'],
 src:[['学术共识','Bodie《Investments》：风险调整后的超额收益'],['教材方法','相对强弱是趋势筛选工具']],
 options:[
  {k:'strong',label:'明显跑赢',mean:'资金偏爱，优先放观察池。',next:'r2_strong'},
  {k:'flat',label:'和大盘差不多',mean:'没有超额，跟着大盘走。',next:'r2_flat'},
  {k:'weak',label:'明显跑输',mean:'资金不认，先降级。',next:'r2_weak'}],
 next:'r2_strong'},
r2_strong:{short:'对板块强弱',title:'放在板块里，它是龙头还是一般跟风？',
 plain:'相对大盘强还不够，再看它在板块里的位置。既是板块{leader}、又保持{relativeStrength}，才值得优先。',
 terms:['leader','relativeStrength'],
 where:['板块内涨幅排名','板块上涨时它是否领涨','板块回落时它是否抗跌'],
 src:[['业内经验','板块内强弱属盘口观察，仅作参考'],['教材方法','Murphy：强者恒强是趋势假设']],
 options:[
  {k:'leader',label:'板块龙头，涨幅第一',mean:'最强分支，但波动也最大。',next:'r3'},
  {k:'inline',label:'板块中上，跟得上',mean:'不突出，但也没掉队。',next:'r3'},
  {k:'laggard',label:'板块后排，跟不动',mean:'相对强势是假的。',next:'r3'}],
 next:'r3'},
r2_flat:{short:'下跌抗不抗',title:'大盘下跌那天，它是抗跌还是跌更多？',
 plain:'大盘跌的时候看{beta}和{relativeStrength}：跌幅小于指数是抗跌，跌幅更大说明弹性高也更危险。',
 terms:['beta','relativeStrength'],
 where:['最近三次大盘下跌日的个股跌幅','是否出现独立走强','下跌时成交量是否放大'],
 src:[['学术共识','Bodie：β 衡量相对市场波动'],['业内经验','抗跌属性属盘口经验']],
 options:[
  {k:'resilient',label:'明显抗跌',mean:'有资金护，观察价值提高。',next:'r3'},
  {k:'follow',label:'跟大盘差不多',mean:'没有独立逻辑。',next:'r3'},
  {k:'fragile',label:'跌得比大盘多',mean:'高 β 高波动，仓位要更小。',next:'r3'}],
 next:'r3'},
r2_weak:{short:'反弹领不领',title:'反弹时，它能领涨还是继续掉队？',
 plain:'跑输的股票，只有在反弹时重新出现{relativeStrength}，才值得重新看。否则只是跟着弹。',
 terms:['relativeStrength','pullback'],
 where:['反弹前三天的涨幅排名','是否放量收复 20 日线','反弹后是否又创新低'],
 src:[['教材方法','Murphy：弱趋势中的反弹'],['业内经验','掉队股反抽多为逃命波']],
 options:[
  {k:'leads',label:'反弹领涨，放量收复均线',mean:'可能反转，重新观察。',next:'r3'},
  {k:'lags',label:'跟着弹，涨幅落后',mean:'只是反抽，不优先。',next:'r3'},
  {k:'none',label:'反弹无力，继续新低',mean:'下降趋势没结束。',next:'r3'}],
 next:'r3'},
r3:{short:'强弱一致吗',title:'相对强弱和趋势方向，一致吗？',
 plain:'最后做一致性检查：{relativeStrength}强、{trend}也向上，才是同一件事。强弱和趋势冲突时，先按趋势。',
 terms:['relativeStrength','trend'],
 where:['20 日趋势方向','20 日相对大盘强弱','两者是否互相确认'],
 src:[['教材方法','Murphy：多周期与多信号要一致'],['学术共识','Bodie：不要用单一信号做决定']],
 options:[
  {k:'aligned',label:'趋势向上，相对也强',mean:'信号一致，可信度更高。',next:'END'},
  {k:'conflict',label:'趋势和强弱互相打脸',mean:'信号冲突，先降级。',next:'END'},
  {k:'neutral',label:'两边都一般',mean:'没有优势，也没明显风险。',next:'END'}],
 next:'END'}
},
partial:function(id,a){
 if(id==='trend'){
  var t=a.p1==='up'?'上升趋势':(a.p1==='down'?'下降趋势':'区间震荡');
  return {t:t,tag:'还差强弱',sub:'趋势只说明方向。还要看它相对大盘和板块有没有超额，否则只是随波逐流。'};
 }
 return {t:a.r1==='strong'?'相对偏强':(a.r1==='weak'?'相对偏弱':'相对一般'),tag:'还差趋势',sub:'强弱只说明它比别人好或差。还要看趋势位阶和离关键位的距离，才知道能不能进。'};
},
checks:function(a){
 return [
 {t:'趋势位阶可做',d:a.p1==='up'?'上升趋势':(a.p1==='down'?'下降趋势':(a.p1==='range'?'区间震荡':'还没查')),s:a.p1==='up'?'ok':(a.p1==='down'?'bad':'unk')},
 {t:'相对强弱占优',d:a.r1==='strong'?'跑赢大盘':(a.r1==='weak'?'跑输大盘':(a.r1?'差不多':'还没查')),s:a.r1==='strong'?'ok':(a.r1==='weak'?'bad':'unk')},
 {t:'离压力有空间',d:a.p3==='close'?'不到 3 个点':(a.p3==='far'?'8 个点以上':(a.p3==='mid'?'3 到 8 个点':'还没查')),s:a.p3==='close'?'bad':(a.p3==='far'?'ok':'unk')}
 ];
},
verdict:function(a){
 if(a.p1==='down') return {t:'先不碰',tag:'下降趋势',sub:'均线向下、价格在下方，反弹先当逃命。等趋势走平再谈。'};
 if(a.p3==='close') return {t:'等位置',tag:'空间不足',sub:'离压力不到 3 个点，赚的空间不够覆盖止损。等回到支撑附近再看。'};
 if(a.r1==='weak') return {t:'不优先',tag:'跑输大盘',sub:'没有超额收益，说明资金不认。先放一边，等它重新跑赢。'};
 if(a.p1==='up'&&a.r1==='strong') return {t:'进观察池',tag:'趋势+强弱',sub:'趋势向上、相对也强，位置合格。但仍要等量价确认，不要直接追。'};
 if(a.p1==='range') return {t:'等突破',tag:'区间',sub:'震荡区间里追高最容易买假突破。等放量突破并回踩确认。'};
 return {t:'再等等',tag:'证据不足',sub:'趋势、强弱或距离有一项不清楚，先不下结论。'};
},
foot:'来源锚定：趋势与均线（Murphy《Technical Analysis of the Financial Markets》，教材方法）；市场 β 与风险调整收益（Bodie《Investments》，学术共识）；估值与价格（Damodaran《Investment Valuation》，学术共识）；支撑压力与抗跌属性属业内经验，仅作参考。'
});

/* ============================================================
   第四层：量价与指标共振
   ============================================================ */
window.LAYERS.push({
id:'layer4',no:4,kicker:'Layer 04 / 信号共振',
title:'量价和指标，在一起说话吗？',
lede:'单个信号很容易骗人。这一层只做一件事：看<strong>量价、指标、周期</strong>三个方向是不是同一句话。',
preview:{ask:'量价是否确认、指标是否背离、多周期是否同向',stop:'这个信号能不能当依据'},
fig:'l4resonance',
entries:[
{id:'pv',mark:'A',label:'量价确认了吗？',desc:'看新高或新低时，成交量是配合还是背离。',steps:2,first:'v1'},
{id:'ind',mark:'B',label:'指标同向吗？',desc:'MACD 和 RSI 是在确认，还是在和价格打架。',steps:2,first:'i1'},
{id:'tf',mark:'C',label:'周期一致吗？',desc:'日线、周线、60 分钟线是不是同一方向。',steps:2,first:'t1'}
],
nodes:{
v1:{short:'量价确认',title:'价格创新高或新低时，成交量是放大还是缩小？',
 plain:'看{priceVolume}：突破要有量，{breakout}才有确认；价格新高但量在缩，就是{divergence}。',
 terms:['priceVolume','breakout','divergence'],
 where:['价格是否创出 20 日新高或新低','当天成交量 vs 5 日均量','突破当天的分时量能'],
 src:[['教材方法','Murphy《Technical Analysis of the Financial Markets》：量价关系九法则'],['学术共识','Bodie：量价关系是统计倾向，不是定律']],
 fig:'l4div',
 options:[
  {k:'newHighVol',label:'创新高，成交量放大',mean:'量价同向，突破更可信。',next:'v2a'},
  {k:'newHighShrink',label:'创新高，成交量缩小',mean:'推力不足，警惕假突破。',next:'v2b'},
  {k:'fallVol',label:'下跌，成交量放大',mean:'放量下跌，先退出。',next:'v2c'}],
 next:'v2a'},
v2a:{short:'放量时机',title:'放量出现在突破当天，还是第二天才补量？',
 plain:'突破当天放量，说明买盘当场确认；第二天才补量，常常是追涨资金被动进场。',
 terms:['breakout','energy'],
 where:['突破日的成交量柱','次日量能是放大还是萎缩','突破后是否回踩守住'],
 src:[['教材方法','Murphy：突破需要即时量能确认'],['业内经验','补量真假要结合位置']],
 options:[
  {k:'day',label:'突破当天就放量',mean:'确认及时，信号更干净。',next:'END'},
  {k:'next',label:'第二天才补量',mean:'有追涨成分，降一级。',next:'END'},
  {k:'late',label:'第三天后才放量',mean:'更像情绪扩散，不是突破确认。',next:'END'}],
 next:'END'},
v2b:{short:'缩量新高',title:'缩量创新高，价格还在继续往上走吗？',
 plain:'缩量新高说明卖的人少，但也说明买的人不多。价格一旦走平，就要防{divergence}。',
 terms:['divergence','priceVolume'],
 where:['连续新高的天数','每天成交量是否递减','是否出现长上影'],
 src:[['教材方法','Murphy：缩量新高要警惕背离'],['业内经验','背离有效性与位置有关']],
 options:[
  {k:'still',label:'还在加速，没有上影',mean:'暂时强，但随时可能断。',next:'END'},
  {k:'stall',label:'走平，出现上影',mean:'推力在减弱，降级。',next:'END'},
  {k:'roll',label:'已经开始回落',mean:'背离兑现，先退。',next:'END'}],
 next:'END'},
v2c:{short:'下跌放量位置',title:'下跌放量，出现在高位、半山腰还是低位？',
 plain:'放量下跌的位置不同，含义完全不同。高位放量是出货，低位放量可能是恐慌换手。',
 terms:['energy','divergence'],
 where:['现价离 60 日线的距离','下跌了几周','放量后是否止跌'],
 src:[['教材方法','Murphy：放量下跌先退出'],['业内经验','低位放量需二次确认']],
 options:[
  {k:'high',label:'高位刚破位',mean:'出货概率高，别接。',next:'END'},
  {k:'mid',label:'跌到半山腰',mean:'趋势未止，继续等。',next:'END'},
  {k:'low',label:'低位长期横盘后放量',mean:'可能是恐慌换手，等止跌。',next:'END'}],
 next:'END'},
i1:{short:'MACD 方向',title:'MACD 和价格方向，同向还是背离？',
 plain:'{macd}看动能方向。价格新高、MACD 不新高，就是{divergence}；两者同向才叫{resonance}的一部分。',
 terms:['macd','divergence','resonance'],
 where:['日线 MACD 金叉还是死叉','MACD 柱在放大还是缩短','价格新高 vs MACD 高点'],
 src:[['教材方法','Murphy：MACD 与动能确认'],['业内经验','指标参数不同，信号会漂移']],
 options:[
  {k:'alignedUp',label:'价格涨，MACD 也向上',mean:'动能同向，信号加分。',next:'i2'},
  {k:'alignedDown',label:'价格跌，MACD 也向下',mean:'空头同向，不做多。',next:'i2'},
  {k:'against',label:'价格和 MACD 明显背离',mean:'信号打架，先降级。',next:'i2'}],
 next:'i2'},
i2:{short:'RSI 位置',title:'RSI 在超买、中性还是超卖？',
 plain:'{rsi}只说明短期强弱。{overbought}不代表马上跌，{oversold}也不代表马上涨；强趋势里会钝化。',
 terms:['rsi','overbought','oversold'],
 where:['日线 RSI 数值','RSI 是否和价格背离','超买持续了几天'],
 src:[['教材方法','Murphy：RSI 与超买超卖'],['学术共识','Bodie：单一指标不能保证收益']],
 options:[
  {k:'hot',label:'超买（70 以上）',mean:'强，但追高风险高。',next:'END'},
  {k:'neutral',label:'中性（30–70）',mean:'还有空间，适合等确认。',next:'END'},
  {k:'cold',label:'超卖（30 以下）',mean:'弱，可能反弹但没见底。',next:'END'}],
 next:'END'},
t1:{short:'日周方向',title:'周线和日线，方向一致吗？',
 plain:'{timeframe}里，大周期定方向。周线向上、日线回调，是顺势；周线向下、日线反弹，是逆势。',
 terms:['timeframe','weekly','resonance'],
 where:['周线收盘价 vs 20 周线','日线趋势方向','两者是否同向'],
 src:[['教材方法','Murphy：多周期分析'],['业内经验','周期冲突时以大周期为准']],
 options:[
  {k:'bothUp',label:'周线、日线都向上',mean:'大方向一致，回调可观察。',next:'t2'},
  {k:'conflict',label:'周线向上、日线向下',mean:'周期冲突，先等日线止跌。',next:'t2'},
  {k:'bothDown',label:'周线、日线都向下',mean:'大方向向下，不做多。',next:'t2'}],
 next:'t2'},
t2:{short:'60 分钟一致',title:'60 分钟线和日线，同向吗？',
 plain:'短周期用来找入场点，不能推翻大周期。60 分钟和日线同向，{resonance}才成立。',
 terms:['timeframe','resonance'],
 where:['60 分钟均线方向','60 分钟是否放量','和日线方向是否冲突'],
 src:[['教材方法','Murphy：小周期服从大周期'],['业内经验','盘中周期变化快，仅作参考']],
 options:[
  {k:'same',label:'同向',mean:'周期共振，信号更完整。',next:'END'},
  {k:'conflict',label:'冲突',mean:'入场时机不成熟，等。',next:'END'}],
 next:'END'}
},
partial:function(id,a){
 if(id==='pv') return {t:a.v1==='newHighVol'?'量价确认':(a.v1==='fallVol'?'放量下跌':'量价存疑'),tag:'还差指标',sub:'量价只说明资金认不认。还要看指标和周期，避免单一信号骗人。'};
 if(id==='ind') return {t:a.i1==='against'?'指标背离':(a.i1==='alignedUp'?'指标同向':'指标偏空'),tag:'还差周期',sub:'指标只说明动能。周期冲突时，指标再好看也要降级。'};
 return {t:a.t1==='bothUp'?'大周期向上':(a.t1==='bothDown'?'大周期向下':'周期冲突'),tag:'还差量价',sub:'周期只定方向。还要看量价确认，否则可能只是弱反弹。'};
},
checks:function(a){
 return [
 {t:'量价有确认',d:a.v1==='newHighVol'?'创新高放量':(a.v1==='fallVol'?'放量下跌':(a.v1?'量价存疑':'还没查')),s:a.v1==='newHighVol'?'ok':(a.v1==='fallVol'?'bad':'unk')},
 {t:'指标不背离',d:a.i1==='against'?'明显背离':(a.i1==='alignedUp'?'MACD 同向':'还没查'),s:a.i1==='against'?'bad':(a.i1==='alignedUp'?'ok':'unk')},
 {t:'多周期同向',d:a.t1==='bothUp'?'日周同向向上':(a.t1==='conflict'?'周期冲突':'还没查'),s:a.t1==='bothUp'?'ok':(a.t1==='conflict'||a.t1==='bothDown'?'bad':'unk')}
 ];
},
verdict:function(a){
 if(a.v1==='fallVol'||a.i1==='against') return {t:'不参与',tag:'信号打架',sub:'放量下跌或指标背离，说明资金和动能都不支持。别用“跌多了”当理由。'};
 if(a.t1==='conflict'||a.t1==='bothDown') return {t:'降级观察',tag:'周期不顺',sub:'小周期再好，也不能对抗大周期。等周线和日线同向再说。'};
 if(a.v1==='newHighVol'&&a.i1==='alignedUp'&&a.t1==='bothUp') return {t:'共振可看',tag:'三项同向',sub:'量价、指标、周期都指向同一方向。信号更完整，但仍要设止损。'};
 return {t:'再等等',tag:'缺一项',sub:'共振要求三个方向都说话。缺一项，就只当参考，不当依据。'};
},
foot:'来源锚定：量价、MACD 与 RSI（Murphy《Technical Analysis of the Financial Markets》，教材方法）；有效市场与单一信号的局限（Bodie《Investments》，学术共识）；指标参数与盘中周期经验仅作参考，不作必答依据。'
});

/* ============================================================
   第五层：筹码与利润质量
   ============================================================ */
window.LAYERS.push({
id:'layer5',no:5,kicker:'Layer 05 / 筹码与质量',
title:'筹码在谁手里？利润有现金撑吗？',
lede:'价格只是结果。这一层往下挖两层：<strong>上方有多少套牢盘</strong>，以及<strong>账面利润有没有现金撑</strong>。',
preview:{ask:'现价在筹码峰的哪一侧、利润的现金含量、债务与现金跑道',stop:'这家公司值不值得继续研究'},
fig:'l5chips',
entries:[
{id:'chips',mark:'A',label:'筹码在谁手里？',desc:'看平均成本、上方套牢盘和近期换手，判断反弹会遇到多少卖压。',steps:2,first:'c1'},
{id:'cash',mark:'B',label:'利润有现金撑吗？',desc:'经营现金流和净利润对照，再查应收和合同负债。',steps:2,first:'e1'},
{id:'debt',mark:'C',label:'杠杆和现金能扛吗？',desc:'有息负债、现金跑道，判断公司能不能熬过下行期。',steps:2,first:'l1'}
],
nodes:{
c1:{short:'现价对成本',title:'现价在平均成本上方、附近，还是下方？',
 plain:'打开{chips}分布，找{avgCost}的峰。现价在成本上方，获利盘多；在下方，上方全是等着解套的{trappedSupply}。',
 terms:['chips','avgCost','trappedSupply'],
 where:['筹码分布图或成本分布图','最长的筹码峰在哪个价位','现价相对筹码峰在上方还是下方'],
 src:[['业内经验','筹码分布是软件估算，不是真实持仓，仅作参考'],['教材方法','Penman《Financial Statement Analysis and Security Valuation》：价格与基本面要分开看']],
 fig:'l5chips',
 options:[
  {k:'above',label:'现价在平均成本上方',mean:'获利盘多，抛压可能来自止盈。',next:'c2'},
  {k:'near',label:'现价在平均成本附近',mean:'成本区附近，方向未定。',next:'c2'},
  {k:'below',label:'现价在平均成本下方',mean:'上方套牢盘重，反弹阻力大。',next:'c2'}],
 next:'c2'},
c2:{short:'套牢盘厚不厚',title:'现价上方，套牢盘是多还是少？',
 plain:'看上方筹码峰的厚度。上方越厚，反弹到那个价位越容易遇到卖压。筹码数据本身是估算，只能当辅助。',
 terms:['trappedSupply','turnover'],
 where:['现价上方一成到两成区间的筹码量','这些筹码形成的时间','近期换手是否已经消化'],
 src:[['业内经验','筹码估算受算法影响，不能当精确数据'],['教材方法','Murphy：反弹遇到前套牢区容易受阻']],
 options:[
  {k:'many',label:'上方筹码很厚',mean:'反弹阻力大，别指望一步到位。',next:'END'},
  {k:'few',label:'上方筹码很薄',mean:'阻力小，但还要看基本面。',next:'END'},
  {k:'unclear',label:'看不出来，数据很乱',mean:'当辅助信息，不作为依据。',next:'END'}],
 next:'END'},
e1:{short:'现金含量',title:'经营现金流净额，比净利润多还是少？',
 plain:'把{netProfit}和{ocf}放在一起比。经营现金流长期低于净利润，差额就是{accrual}，利润质量要打折。',
 terms:['netProfit','ocf','accrual'],
 where:['利润表：净利润','现金流量表：经营活动产生的现金流量净额','连续 3–5 年的趋势，不只看一年'],
 src:[['教材方法','Penman《Financial Statement Analysis and Security Valuation》：盈余质量与现金流'],['学术共识','Bodie：会计利润不等于现金流']],
 fig:'l5cash',
 options:[
  {k:'greater',label:'经营现金流大于净利润',mean:'利润有现金撑，质量较好。',next:'e2'},
  {k:'near',label:'两者接近',mean:'大致匹配，继续查应收。',next:'e2'},
  {k:'lower',label:'经营现金流明显低于净利润',mean:'应计利润高，质量要打折。',next:'e2'}],
 next:'e2'},
e2:{short:'应收与预收',title:'应收账款增速，比收入增速快还是慢？',
 plain:'再看{receivable}和{contractLiab}。应收涨得比收入快，可能在放宽赊账；合同负债增加，通常说明订单在变好。',
 terms:['receivable','contractLiab','accrual'],
 where:['应收账款增速 vs 营业收入增速','合同负债环比变化','经营现金流是否同步改善'],
 src:[['教材方法','Penman：应收、应计与收入质量'],['学术共识','Brealey《Principles of Corporate Finance》：现金流比会计利润更可靠']],
 options:[
  {k:'faster',label:'应收增速明显快于收入',mean:'可能在用赊账换收入，警惕。',next:'END'},
  {k:'same',label:'两者差不多',mean:'暂时正常，继续跟踪。',next:'END'},
  {k:'slower',label:'应收增速慢于收入',mean:'回款改善，质量加分。',next:'END'}],
 next:'END'},
l1:{short:'有息负债',title:'有息负债，相对一年经营现金流高不高？',
 plain:'用{interestDebt}除以一年{ocf}，看要几年才能还完。比例越高，收入下滑时越脆弱。',
 terms:['interestDebt','ocf'],
 where:['资产负债表：短期借款、长期借款、应付债券','现金流量表：经营活动现金流净额','有息负债 / 经营现金流'],
 src:[['教材方法','Brealey《Principles of Corporate Finance》：杠杆与财务风险'],['学术共识','Bodie：高风险要求更高回报']],
 options:[
  {k:'low',label:'不到 2 年',mean:'杠杆轻，抗风险能力较好。',next:'l2'},
  {k:'mid',label:'2–5 年',mean:'中等杠杆，要看行业稳定性。',next:'l2'},
  {k:'high',label:'5 年以上',mean:'杠杆重，收入一跌就难受。',next:'l2'}],
 next:'l2'},
l2:{short:'现金跑道',title:'现有现金，能撑几个月正常经营？',
 plain:'{cashRunway}＝现金及等价物 ÷ 每月经营支出。少于 6 个月就要警惕融资压力。',
 terms:['cashRunway','contractLiab'],
 where:['资产负债表：货币资金','近 12 个月经营支出','是否有大额到期债务'],
 src:[['教材方法','Brealey：流动性与企业生存'],['业内经验','现金跑道阈值因行业而异，仅作参考']],
 options:[
  {k:'long',label:'12 个月以上',mean:'跑道充足，不急。',next:'END'},
  {k:'mid',label:'6–12 个月',mean:'够用，但要盯融资和回款。',next:'END'},
  {k:'short',label:'不到 6 个月',mean:'跑道短，风险高。',next:'END'}],
 next:'END'}
},
partial:function(id,a){
 if(id==='chips') return {t:a.c1==='below'?'上方套牢重':(a.c1==='above'?'获利盘在上':'成本区附近'),tag:'还差利润',sub:'筹码只说明卖压在哪。还要看利润有没有现金撑，否则只是价格游戏。'};
 if(id==='cash') return {t:a.e1==='lower'?'利润缺现金':(a.e1==='greater'?'现金含量好':'大致匹配'),tag:'还差筹码',sub:'利润质量只说明公司赚不赚钱。还要看上方筹码和杠杆，才能判断股价能不能扛。'};
 return {t:a.l1==='high'?'杠杆偏重':(a.l1==='low'?'杠杆轻':'杠杆中等'),tag:'还差筹码与利润',sub:'债务只说明抗风险能力。还要把筹码和利润质量一起看。'};
},
checks:function(a){
 return [
 {t:'上方筹码不压顶',d:a.c1==='below'?'现价在成本下方':(a.c1==='above'?'现价在成本上方':'还没查'),s:a.c1==='below'?'bad':(a.c1==='above'?'ok':'unk')},
 {t:'利润有现金撑',d:a.e1==='lower'?'现金流低于利润':(a.e1==='greater'?'现金流高于利润':'还没查'),s:a.e1==='lower'?'bad':(a.e1==='greater'?'ok':'unk')},
 {t:'杠杆与跑道可扛',d:a.l1==='high'?'有息负债过高':(a.l1==='low'?'杠杆轻':'还没查'),s:a.l1==='high'?'bad':(a.l1==='low'?'ok':'unk')}
 ];
},
verdict:function(a){
 if(a.e1==='lower') return {t:'利润要打折',tag:'缺现金',sub:'账面利润没有现金撑，先别按“高增长”给它估值。去查应收和应计。'};
 if(a.c1==='below') return {t:'上方全是套牢',tag:'阻力大',sub:'现价在平均成本下方，反弹会遇到解套卖压。等筹码消化或基本面改变。'};
 if(a.l1==='high'||a.l2==='short') return {t:'先看能不能扛',tag:'杠杆风险',sub:'杠杆高或现金跑道短，先确认公司能活下去，再谈估值和上涨空间。'};
 if(a.e1==='greater'&&a.c1==='above'&&a.l1==='low') return {t:'可以深入',tag:'质量合格',sub:'现金含量、筹码位置、杠杆三项都合格。可以进入估值和买点研究。'};
 return {t:'继续查',tag:'有一项没过',sub:'筹码、利润质量或杠杆有一项不清楚。不要用单一指标下结论。'};
},
foot:'来源锚定：盈余质量与现金流（Penman《Financial Statement Analysis and Security Valuation》，教材方法）；杠杆与财务风险（Brealey《Principles of Corporate Finance》，学术共识）；筹码分布属软件估算与业内经验，仅作参考，不作必答依据。'
});

/* ============================================================
   第六层：退出与仓位
   ============================================================ */
window.LAYERS.push({
id:'layer6',no:6,kicker:'Layer 06 / 退出与仓位',
title:'错了在哪走？一次买多少？',
lede:'最后一层不是找买点，而是<strong>先写失败剧本</strong>。止损在哪、仓位多大、组合会不会一起跌，这三件事决定你能活多久。',
preview:{ask:'止损依据、单笔风险预算、组合同向暴露',stop:'这笔交易的计划能不能成立'},
fig:'l6risk',
entries:[
{id:'stop',mark:'A',label:'错了在哪走？',desc:'买入依据决定止损位置，触发后要按计划执行。',steps:3,first:'s1'},
{id:'size',mark:'B',label:'一次买多少？',desc:'用单笔风险预算和止损距离倒推仓位。',steps:2,first:'z1'},
{id:'port',mark:'C',label:'组合会不会一起跌？',desc:'看同方向暴露和相关性，避免多个仓位其实是一个仓位。',steps:2,first:'p1'}
],
nodes:{
s1:{short:'买入依据',title:'你买它，依据是技术位、事件，还是怕错过？',
 plain:'先写清楚买入依据，它决定{stopLoss}放哪。追涨买入没有结构依据，止损只能靠猜。',
 terms:['stopLoss','structureStop'],
 where:['买入前写下的理由','这个理由对应哪个价格结构','如果理由消失，价格会在哪'],
 src:[['教材方法','Murphy：结构破坏才退出'],['学术共识','Bodie：先定义风险再谈收益']],
 options:[
  {k:'technical',label:'技术位：突破或回踩',mean:'有价格结构，止损可以放在结构下方。',next:'s2'},
  {k:'event',label:'事件：业绩或政策催化',mean:'有事件依据，但要设时间止损。',next:'s2'},
  {k:'chase',label:'怕错过，先追了再说',mean:'没有依据，最容易把止损越改越低。',next:'s2'}],
 next:'s2'},
s2:{short:'止损位置',title:'止损放在结构下方、固定百分比，还是不设？',
 plain:'优先用{structureStop}：前低或支撑下方一点。没有结构时，才用{fixedFraction}的固定比例，不能“不设”。',
 terms:['structureStop','fixedFraction','stopLoss'],
 where:['最近一个有效前低或支撑','止损价到买入价的距离','这个距离对应多少百分位'],
 src:[['教材方法','Murphy：支撑跌破即结构破坏'],['教材方法','Jorion《Value at Risk》：先量化风险，再决定仓位']],
 options:[
  {k:'structure',label:'结构下方，留一点缓冲',mean:'依据清晰，触发条件明确。',next:'s3'},
  {k:'fixed',label:'固定比例，例如半成',mean:'简单，但可能被正常波动扫掉。',next:'s3'},
  {k:'none',label:'不设，跌了再说',mean:'没有退出规则，风险不可控。',next:'s3'}],
 next:'s3'},
s3:{short:'触发后动作',title:'止损真的触发了，你会怎么做？',
 plain:'规则写在纸上才算数。触发后执行、加仓摊平、还是再等等，必须提前定。{addToLoser}会把小错变大错。',
 terms:['addToLoser','stopLoss'],
 where:['交易计划里的退出条件','触发当天是否能执行','有没有“再等一天”的例外'],
 src:[['教材方法','Jorion：风险限额必须可执行'],['业内经验','执行纪律属行为经验，仅作参考']],
 options:[
  {k:'execute',label:'按计划卖出',mean:'规则成立，风险可控。',next:'END'},
  {k:'add',label:'加仓摊平',mean:'把小错放大，最危险。',next:'END'},
  {k:'wait',label:'再等一天看看',mean:'规则失效，等于没止损。',next:'END'}],
 next:'END'},
z1:{short:'单笔风险',title:'这一笔最多允许亏掉总资金的多少？',
 plain:'{riskPerTrade}先定死。常见上限是百分之一到二；超过半成，连续错几次就会伤到本金。',
 terms:['riskPerTrade','fixedFraction'],
 where:['账户总资金','单笔最大可亏金额','过去最大回撤能不能承受'],
 src:[['教材方法','Jorion《Value at Risk》：风险预算'],['学术共识','Brealey：风险与回报要匹配']],
 options:[
  {k:'one',label:'百分之一以内',mean:'保守，连续出错也能活。',next:'z2'},
  {k:'two',label:'百分之二到三',mean:'可接受，但要求执行严格。',next:'z2'},
  {k:'five',label:'半成以上',mean:'过重，几次错误就伤本金。',next:'z2'}],
 next:'z2'},
z2:{short:'仓位算法',title:'仓位是算出来的，还是凭感觉？',
 plain:'{positionSize}＝风险预算 ÷ 止损距离。止损越远，仓位越小；不是越有信心买得越多。',
 terms:['positionSize','rMultiple'],
 where:['单笔风险预算','止损距离百分比','仓位金额和仓位占比'],
 src:[['教材方法','Jorion：风险预算与头寸规模'],['学术共识','Bodie：仓位决定组合波动']],
 fig:'l6position',
 options:[
  {k:'formula',label:'按风险预算和止损距离算',mean:'仓位有上限，风险可计量。',next:'END'},
  {k:'feel',label:'凭感觉，看心情',mean:'没有上限，容易越亏越重。',next:'END'},
  {k:'full',label:'看好就满仓',mean:'一次错误可能结束游戏。',next:'END'}],
 next:'END'},
p1:{short:'同向暴露',title:'现有持仓里，同方向的暴露有多大？',
 plain:'{exposure}不是单笔仓位，是所有同方向仓位加起来。单笔都小，同向加满也可能很危险。',
 terms:['exposure','correlation'],
 where:['所有持仓的方向','同方向仓位占总资金比例','是否集中在同一板块'],
 src:[['教材方法','Jorion：组合风险不是单笔风险的加总'],['学术共识','Brealey：分散降低非系统性风险']],
 options:[
  {k:'low',label:'同方向不到两成',mean:'暴露低，还有空间。',next:'p2'},
  {k:'mid',label:'两成到四成',mean:'中等，要看相关性。',next:'p2'},
  {k:'high',label:'超过四成',mean:'同向过重，一次回撤会很痛。',next:'p2'}],
 next:'p2'},
p2:{short:'相关性',title:'这些持仓跌起来，会同时跌吗？',
 plain:'看{correlation}：同板块、同风格、同题材的股票，涨跌往往同向。多个仓位可能只是同一个仓位。',
 terms:['correlation','exposure'],
 where:['持仓是否同板块或同题材','过去一个月涨跌是否同步','大盘下跌时是否一起回撤'],
 src:[['学术共识','Brealey：相关性决定分散效果'],['教材方法','Jorion：组合 VaR 要考虑相关性']],
 options:[
  {k:'low',label:'行业和风格都分散',mean:'分散有效，组合风险更低。',next:'END'},
  {k:'some',label:'有一部分重叠',mean:'需要降低同向仓位。',next:'END'},
  {k:'high',label:'几乎同一方向',mean:'看似多笔，实际一笔。',next:'END'}],
 next:'END'}
},
partial:function(id,a){
 if(id==='stop') return {t:a.s2==='none'?'没有止损':(a.s2==='structure'?'结构止损':'固定比例止损'),tag:'还差仓位',sub:'止损决定单笔风险，但还没决定买多少。仓位过重，再好的止损也会伤本金。'};
 if(id==='size') return {t:a.z2==='formula'?'仓位有算法':(a.z2==='full'?'满仓风险':'仓位靠感觉'),tag:'还差组合',sub:'单笔仓位只是一部分。多个同方向仓位加起来，可能远超你的承受力。'};
 return {t:a.p1==='high'?'同向过重':(a.p1==='low'?'暴露较低':'暴露中等'),tag:'还差退出规则',sub:'组合暴露只说明总量。还要有止损和仓位规则，才知道错了怎么走。'};
},
checks:function(a){
 return [
 {t:'止损有依据且会执行',d:a.s2==='none'?'没有止损':(a.s3==='add'?'触发后加仓':(a.s3==='execute'?'按计划执行':'还没查')),s:(a.s2==='none'||a.s3==='add'||a.s3==='wait')?'bad':(a.s2&&a.s3?'ok':'unk')},
 {t:'仓位按风险算',d:a.z2==='formula'?'风险预算 ÷ 止损距离':(a.z2==='full'?'满仓':'还没查'),s:(a.z1==='five'||a.z2==='full')?'bad':(a.z2==='formula'?'ok':'unk')},
 {t:'组合不过度同向',d:a.p1==='high'?'同向超过四成':(a.p1==='low'?'同向不到两成':'还没查'),s:a.p1==='high'?'bad':(a.p1==='low'?'ok':'unk')}
 ];
},
verdict:function(a){
 if(a.s2==='none'||a.s3==='add'||a.s3==='wait') return {t:'规则没写完',tag:'不能下单',sub:'没有可执行的止损，就没有可控的风险。先把失败剧本写清楚。'};
 if(a.z1==='five'||a.z2==='full') return {t:'仓位过重',tag:'先减仓',sub:'单笔风险太大，几次错误就会伤到本金。先按百分之一到二重算。'};
 if(a.p1==='high'&&a.p2==='high') return {t:'同向过度',tag:'假分散',sub:'持仓看似多笔，其实是一个方向。降低同向暴露，再谈加仓。'};
 if(a.s3==='execute'&&a.z2==='formula'&&a.p1==='low') return {t:'计划成立',tag:'可执行',sub:'止损、仓位、组合三项都合格。这才是一笔可以交给纪律的交易。'};
 return {t:'还差一项',tag:'先补齐',sub:'退出、仓位或组合暴露有一项没定。补齐之前，不要用“信心”代替规则。'};
},
foot:'来源锚定：风险预算与组合风险（Jorion《Value at Risk》，教材方法）；风险与回报、分散（Brealey《Principles of Corporate Finance》，学术共识）；交易执行纪律属业内经验，仅作参考，不作必答依据。'
});

function optText(lay,nodeKey,optKey){
 var n=lay&&lay.nodes&&lay.nodes[nodeKey];if(!n||!optKey) return optKey||'';
 var o=n.options.filter(function(x){return x.k===optKey;})[0];
 return o?o.label:optKey;
}
/* ============================================================
   判断引擎数据：每个选项的权重（-2..+2）与 veto 标记。
   权重含义：正 = 支持动手，负 = 不支持；veto = 一票否决，直接落绿。
   覆盖度 = 本层已答节点数；本层满答步数无常量，运行时按 entries 求和。
   ============================================================ */
window.JUDGE={
layers:{
 layer1:{
  w:{a1:{white:0,yellow:1,flat:0},
     a2:{broad:2,narrow:-1,mixed:0},
     a3:{broad:2,one:1,failed:-2},
     b1:{up:2,flat:0,down:-2},
     b2:{high:1,mid:0,low:-1},
     b3:{upVol:2,upNo:-1,downVol:-2,downNo:0}},
  veto:{'b3.downVol':'放量下跌，资金在出逃'}
 },
 layer2:{
  w:{s1:{fresh:1,mid:2,late:-3},
     s2_fresh:{new:2,old:-1,rumor:-2},
     s2_mid:{broad:2,split:-1,weak:-2},
     s2_late:{fallen:-2,flat:0,handoff:1},
     s3:{expand:2,flat:0,shrink:-2},
     f1:{up:2,flat:0,down:-2},
     f2_up:{inflow:2,rotation:0,outflow:-2},
     f2_mid:{focus:-1,diffuse:2,unclear:0},
     f2_down:{short:0,config:-2,unknown:-1},
     f3:{sealed:2,open:0,broken:-2}},
  veto:{'s1.late':'已进退潮期','s2_fresh.rumor':'只有传闻，找不到原文','f3.broken':'炸板未回封，情绪转退潮','f2_up.outflow':'净流出，龙头放量下跌','f2_down.config':'放量下跌，配置资金也在撤'}
 },
 layer3:{
  w:{p1:{up:2,range:0,down:-3},
     p2_up:{hold:2,brief:1,break:-2},
     p2_range:{upper:-1,middle:0,lower:1},
     p2_down:{rejected:-2,newlow:-2,base:1},
     p3:{close:-2,mid:0,far:2},
     r1:{strong:2,flat:0,weak:-2},
     r2_strong:{leader:2,inline:1,laggard:-1},
     r2_flat:{resilient:2,follow:0,fragile:-1},
     r2_weak:{leads:2,lags:-1,none:-2},
     r3:{aligned:2,conflict:-1,neutral:0}},
  veto:{'p1.down':'均线向下、价格在均线下方','p2_up.break':'放量跌破支撑，趋势破坏'}
 },
 layer4:{
  w:{v1:{newHighVol:2,newHighShrink:-1,fallVol:-3},
     v2a:{day:2,next:1,late:-1},
     v2b:{still:1,stall:-1,roll:-2},
     v2c:{high:-2,mid:-2,low:1},
     i1:{alignedUp:2,alignedDown:-2,against:-2},
     i2:{hot:-1,neutral:1,cold:-1},
     t1:{bothUp:2,conflict:-1,bothDown:-2},
     t2:{same:2,conflict:-1}},
  veto:{'v1.fallVol':'放量下跌，资金先撤','v2b.roll':'缩量新高后回落，背离兑现','v2c.high':'高位放量破位','i1.against':'价格与 MACD 明显背离'}
 },
 layer5:{
  w:{c1:{above:2,near:0,below:-2},
     c2:{many:-2,few:1,unclear:0},
     e1:{greater:2,near:1,lower:-2},
     e2:{faster:-2,same:0,slower:1},
     l1:{low:2,mid:0,high:-2},
     l2:{long:2,mid:0,short:-2}},
  veto:{'e1.lower':'经营现金流明显低于净利润，利润没有现金撑','e2.faster':'应收增速快于收入，疑似赊账换收入','l2.short':'现金跑道不足 6 个月'}
 },
 layer6:{
  w:{s1:{technical:2,event:1,chase:-2},
     s2:{structure:2,fixed:0,none:-3},
     s3:{execute:2,add:-3,wait:-2},
     z1:{one:2,two:0,five:-2},
     z2:{formula:2,feel:-1,full:-3},
     p1:{low:2,mid:0,high:-2},
     p2:{low:2,some:0,high:-2}},
  veto:{'s2.none':'没有止损，风险不可控','s3.add':'止损触发后加仓摊平','s3.wait':'止损触发后不执行','z2.full':'满仓，一次错误可能结束游戏','p2.high':'几乎同一方向，是假分散'}
 }
},
phrase:{
 layer1:{good:{main:'量价齐升',nat:'有利',act:'买',full:'量价齐升、带动有宽度：今天的环境支持继续看个股。',pos:'首笔三成以内，个股仍要单独验证',stop:'指数跌破 5 日线就收手',flip:'量比回落到 1.0 以下，或涨跌家数转空'},
         neutral:{main:'方向未明',nat:'观望',act:'等',full:'方向未明：带动或量能有一项没确认。',pos:'不新开仓，先观察',stop:'没有仓位，不设止损',flip:'量能回到 1.2 以上且涨跌家数转多'},
         bad:{main:'量增下杀',nat:'不利',act:'空',full:'量增下杀或带动偏假：今天的环境不支持动手。',pos:'空仓，最多留底仓',stop:'已有仓位跌破前低就走',flip:'缩量止跌且涨跌家数转多'}},
 layer2:{good:{main:'主线接力',nat:'有利',act:'买',full:'主线在接力：阶段未退潮、资金在进、龙头封住。',pos:'只做龙头或最强二线，三成以内',stop:'龙头炸板未回封就退',flip:'板块成交额占比回落，或龙头开板'},
         neutral:{main:'阶段未明',nat:'观望',act:'等',full:'阶段未明：位置或资金有一项没确认。',pos:'不接力，等第二天确认',stop:'没有仓位，不设止损',flip:'次日龙头继续封板且占比上升'},
         bad:{main:'题材退潮',nat:'不利',act:'空',full:'题材退潮：资金在撤，接力已断。',pos:'不参与，已有仓位先减',stop:'跌破 5 日线清掉',flip:'新龙头接棒并放量'}},
 layer3:{good:{main:'位置合格',nat:'有利',act:'买',full:'位置合格：趋势向上、相对强、离压力有空间。',pos:'进观察池，不追高，回踩再买',stop:'跌破 20 日线',flip:'相对强弱转弱，或跌回区间内'},
         neutral:{main:'位置居中',nat:'观望',act:'等',full:'位置居中：趋势、强弱或距离有一项没确认。',pos:'等突破回踩确认再动',stop:'没有仓位，不设止损',flip:'放量突破前高并回踩守住'},
         bad:{main:'破位下行',nat:'不利',act:'空',full:'破位下行：趋势或位置不合格。',pos:'不碰，放在观察池外',stop:'已持仓反弹到均线就减',flip:'站回 60 日线且相对转强'}},
 layer4:{good:{main:'三项共振',nat:'有利',act:'买',full:'三项共振：量价、指标、周期都指向同一方向。',pos:'可按信号做，首笔三成，止损放结构下方',stop:'放量跌破突破位',flip:'MACD 背离，或周期转空'},
         neutral:{main:'只差一项',nat:'观望',act:'等',full:'只差一项：共振不完整，只能当参考。',pos:'只记录，不当依据',stop:'没有仓位，不设止损',flip:'缺的那一项补上（量能或周期）'},
         bad:{main:'信号打架',nat:'不利',act:'空',full:'信号打架：量价或指标不支持。',pos:'不参与，已持仓先退',stop:'跌破最近一根放量 K 线低点',flip:'放量收复前高且 MACD 金叉'}},
 layer5:{good:{main:'质地合格',nat:'有利',act:'持',full:'质地合格：现金含量、筹码位置、杠杆三项都合格。',pos:'可以深入，仓位等买点再定',stop:'现金流恶化或杠杆抬升就退出研究',flip:'应收增速超过收入'},
         neutral:{main:'证据不足',nat:'观望',act:'等',full:'证据不足：筹码或利润质量有一项没查清。',pos:'只做研究，不下单',stop:'没有仓位，不设止损',flip:'补齐筹码与现金流两项'},
         bad:{main:'利润存疑',nat:'不利',act:'减',full:'利润存疑或上方套牢重：先别按高增长估值。',pos:'不参与，已有仓位先减',stop:'反弹到筹码峰就减',flip:'经营现金流回到净利润之上'}},
 layer6:{good:{main:'计划成立',nat:'有利',act:'持',full:'计划成立：止损、仓位、组合三项都合格。',pos:'按风险预算 ÷ 止损距离算出的仓位执行',stop:'结构下方留缓冲，触发即走',flip:'止损触发，或同向暴露超过四成'},
         neutral:{main:'还差一项',nat:'观望',act:'等',full:'还差一项：退出、仓位或组合暴露没定。',pos:'补齐之前不下单',stop:'没有仓位，不设止损',flip:'三项齐了再下单'},
         bad:{main:'规则缺失',nat:'不利',act:'减',full:'规则缺失：没有可执行的止损，或仓位过重。',pos:'不下单，先把仓位减到风险预算内',stop:'先写出结构止损，再谈买入',flip:'止损与仓位都写成可执行规则'}},
 index:{good:{main:'六层同向',nat:'有利',act:'买',full:'六层同向：环境、板块、位置、共振、质量、仓位都给出有利信号。',pos:'按第六层算出的仓位执行',stop:'任一层转弱就退回上一层',flip:'任一层出现否决'},
        neutral:{main:'半数通过',nat:'观望',act:'等',full:'半数通过：有层还没走完，或结论中性。',pos:'只做观察，不新开仓',stop:'没有仓位，不设止损',flip:'六层都过，或出现否决'},
        bad:{main:'有层不通',nat:'不利',act:'空',full:'有层不通：至少一层给了否决。',pos:'空仓，或先减到风险预算内',stop:'按各层写好的止损执行',flip:'否决项消除'}}
}
};
})();

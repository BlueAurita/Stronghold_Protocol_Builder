(() => {
  const OPERATORS = window.OPERATORS || [];
  const CORE = ["염국","사르곤","빅토리아","쉐라그","라테라노","에기르","시라쿠사","카시미어"];
  const EXTRA = ["정밀","신속","기민","아케인","고수","조력","예견","기적","투자자","기습","불굴","조화","협동방어","독행","궁극기"];
  const EXTRA1 = EXTRA.slice(0,8), EXTRA2 = EXTRA.slice(8);
  const ALL_COVENANTS = [...CORE,...EXTRA];
  const TAG_ORDER = ["작전 능력","1회 중첩","지속 중첩","정비 능력","특이화"];
  const ACTIVATION = {"염국":3,"사르곤":3,"빅토리아":3,"쉐라그":3,"라테라노":3,"에기르":3,"시라쿠사":3,"카시미어":3,"정밀":2,"신속":2,"기민":2,"아케인":2,"고수":2,"조력":2,"예견":2,"기적":2,"투자자":3,"기습":2,"불굴":2,"조화":1,"협동방어":3,"독행":1,"궁극기":2};
  const COVENANT_DESCRIPTIONS = {"염국": "활성화 인원수 3\n[염국] 오퍼레이터의 공격력 (기본 +23, 중첩 수당 +0.9)%\n<전장에 서로 다른 [염국] 오퍼레이터 6명 배치> 전투 시작 후, 자율적으로 행동하는 '염의 가호' 소환 (공격력과 HP는 [염국] 오퍼레이터의 공격력 및 HP 총합의 30%). '염의 가호'는 동시에 목표 3명 공격, 공격 시 공격력의 20%에 해당하는 소각 손상을 입히며, 주변 적에게 20%의 원소 취약 효과 부여, 주기적으로 '악을 쫓는 불꽃' 사용\n<전장에 서로 다른 [염국] 오퍼레이터 9명 배치> '염의 가호' 2개 소환, '염의 가호'의 공격력이 1.5배로 증가, 받는 대미지 -90%", "사르곤": "활성화 인원수 3\n[사르곤] 오퍼레이터가 스킬 발동 시 모든 [사르곤] 오퍼레이터의 공격 속도 +12 (최대 +300), (기본 5, 중첩 수당 +0.22)초간 지속 (각 중첩별 지속 시간은 독립 계산)\n<전장에 서로 다른 [사르곤] 오퍼레이터 6명 배치> 스킬 발동 시 동일한 지속 시간 동안 모든 [사르곤] 오퍼레이터의 공격력 +12% (최대 +300%)\n전략에서 [나란투야] 선택 시 <전장에 서로 다른 [사르곤] 오퍼레이터 6명 배치>의 효과 변경", "빅토리아": "활성화 인원수 3\n장비를 장착한 [빅토리아] 오퍼레이터가 입히는 대미지가 (기본 125, 중첩 수당 +0.8)%로 증가\n<중첩 수 25회당> 랜덤 효과의 빅토리아 해머 1개 획득\n<전장에 서로 다른 [빅토리아] 오퍼레이터 6명 배치> [빅토리아] 오퍼레이터가 장비를 1개 장착할 때마다 공격력 +50%, 승급 장비일 경우 공격력 +80%", "쉐라그": "활성화 인원수 3\n[쉐라그] 오퍼레이터가 입히는 대미지가 125%로 증가, 냉기 및 빙결 상태의 적에게 추가로 (기본 135, 중첩 수당 +1)%로 증가\n<전장에 서로 다른 [쉐라그] 오퍼레이터 6명 배치> 25초마다 전장에 찬바람이 불어 적에게 (기본 20, 중첩 수당 +0.1)초간 냉기 효과 부여", "라테라노": "활성화 인원수 3\n[라테라노] 오퍼레이터가 스킬 발동 시 획득하는 탄약 (기본 +5, 중첩 수당 +1.5)% (소수 첫째 자리에서 반올림)\n<전장에 서로 다른 [라테라노] 오퍼레이터 6명 배치> [라테라노] 오퍼레이터가 소모하는 탄약 1발당 모든 [라테라노] 오퍼레이터의 공격력 +4%, 최대 +200%", "에기르": "활성화 인원수 3\n[에기르] 오퍼레이터의 HP (기본 +35, 중첩 수당 +1)%\n전투 시작 후, [에기르] 오퍼레이터가 차례대로 전방 1칸의 오퍼레이터를 포식해 5000 물리 대미지를 입히고, 상대의 기본 공격력과 저지 가능 수 획득, 포식당한 오퍼레이터의 티어만큼 [에기르]의 맹약 중첩 수 증가 ([에기르] 사이에는 왼쪽과 위쪽의 오퍼레이터를 우선으로 포식)\n<전장에 서로 다른 [에기르] 오퍼레이터 5명 배치> 최초로 쓰러진 [에기르] 오퍼레이터 3명 즉시 부활", "시라쿠사": "활성화 인원수 3\n[시라쿠사] 오퍼레이터가 배치 후 공격 속도 (기본 +25, 중첩 수당 +0.8), (기본 32, 중첩 수당 +0.4)초간 지속\n<전장에 서로 다른 [시라쿠사] 오퍼레이터 6명 배치> [시라쿠사] 오퍼레이터가 배치 후 같은 시간 동안 은신 효과 획득, [시라쿠사] 오퍼레이터가 은신 효과 획득 또는 해제 후 10초간 3% 확률로 적에게 (기본 5000, 중첩 수당 +50)의 트루 대미지를 입히며, 3초간 공포 효과 부여", "카시미어": "활성화 인원수 3\n오퍼레이터를 배치할 때마다 [카시미어] 오퍼레이터의 공격력 +20% (최대 (기본 +50, 중첩 수당 +1)%)\n<전장에 서로 다른 [카시미어] 오퍼레이터 6명 배치> [카시미어] 오퍼레이터가 적 저지 시 2초마다 주변 (0.8) 적에게 공격력의 120%에 해당하는 트루 대미지를 입히고 0.1초간 기절시킴, 적 미저지 시 공격력의 30%에 해당하는 트루 대미지를 입힘\n### 2.2. 부가 맹약[\\[편집\\]](https://namu.wiki/edit/%EC%9C%84%EC%88%98%20%ED%98%91%EC%9D%98:%20%EB%A7%B9%EC%95%BD/%ED%95%98%EB%B0%98%EA%B8%B0/%EB%A7%B9%EC%95%BD%20%EB%B0%8F%20%EC%98%A4%ED%8D%BC%EB%A0%88%EC%9D%B4%ED%84%B0?section=12)", "정밀": "활성화 인원수 2\n[정밀] 오퍼레이터의 공격력 (기본 +10, 중첩 수당 +1.2)%\n<전장에 서로 다른 [정밀] 오퍼레이터 3명 배치> 모든 [정밀] 및 원거리 오퍼레이터에게 효과 적용, 공격이 방어력 및 마법 저항 30% 무시", "신속": "활성화 인원수 2\n[신속] 오퍼레이터가 스킬 종료 시 (기본 20, 중첩 수당 +0.35)% 확률로 SP +12\n<중첩 수 40회 달성> 모든 오퍼레이터가 스킬 종료 시 같은 확률로 추가로 SP +15", "기민": "활성화 인원수 2\n[기민] 자신 및 주변 4칸 오퍼레이터의 공격 속도 (기본 +10, 중첩 수당 +1)\n<중첩 수 40회 달성> 범위가 [기민] 오퍼레이터 주변 8칸으로 변경", "아케인": "활성화 인원수 2\n[아케인] 오퍼레이터가 마법 대미지를 입힐 경우 목표가 받는 마법 대미지 (기본 20, 중첩 수당 +1)% 증가, 3초간 지속\n<전장에 서로 다른 [아케인] 오퍼레이터 3명 배치> [아케인] 오퍼레이터가 HP 50% 미만인 적에게 입히는 대미지 비율이 (기본 68, 중첩 수당 +1.4)%로 증가", "고수": "활성화 인원수 2\n모든 오퍼레이터의 HP (기본 +25, 중첩 수당 +1.2)%\n<전장에 서로 다른 [고수] 오퍼레이터 3명 배치> [고수]가 아닌 오퍼레이터가 받는 대미지의 40%를 모든 [고수] 오퍼레이터가 분담. [고수] 오퍼레이터가 대미지를 받을 시 대미지를 입힌 적에게 (기본 850, 중첩 수당 +10)의 마법 대미지를 입히고 (0.2초당 최대 1회 발동) 5초간 40%의 취약 효과 부여", "조력": "활성화 인원수 2\n모든 오퍼레이터의 방어력 (기본 +15, 중첩 수당 +1.2)%, 재배치 시간 -30%\n휴식 기간 종료 후 활성화된 모든 맹약의 중첩 수 +2\n<전장에 서로 다른 [조력] 오퍼레이터 3명 배치> 중첩 수 증가량이 +4로 변경", "예견": "활성화 인원수 2\n<중첩 수 10회당> 자금 2 획득\n<최초로 80회 중첩> [예견] 오퍼레이터의 구매 가격 영구 -1\n<최초로 150회 중첩> 상기 효과가 모든 오퍼레이터의 구매 가격 영구 -1로 변경\n정비 구역의 [예견] 오퍼레이터도 맹약 활성화 가능", "기적": "활성화 인원수 2\n보급센터를 갱신할 시 (기본 18, 중첩 수당 +0.3)% 확률로 다음 갱신이 무료\n<중첩 수 100회당> 자금 20 획득\n정비 구역의 [기적] 오퍼레이터도 맹약 활성화 가능", "투자자": "활성화 인원수 3\n오퍼레이터의 '획득 시' 특질이 매번 2회 발동\n<중첩 수 100회 달성> '획득 시' 특질이 매번 3회 발동\n정비 구역의 [투자자] 오퍼레이터도 맹약 활성화 가능", "기습": "활성화 인원수 2\n[기습] 오퍼레이터가 10초간 공격하지 않거나 스킬이 준비될 경우, 공격 범위에 적이 없으면 SP를 보류하고 즉시 지상 적 1명에게 이동, 해당 기간 동안 공격력 및 HP (기본 +25, 중첩 수당 +1)%\n<중첩 수 50회 달성> 모든 오퍼레이터의 공격 속도 +50", "불굴": "활성화 인원수 2\n지상 오퍼레이터가 쓰러질 경우 (기본 18, 중첩 수당 +0.4)% 확률로 즉시 부활\n<전장에 서로 다른 [불굴] 오퍼레이터 3명 배치> 지상 오퍼레이터가 쓰러질 경우 모든 오퍼레이터의 SP +5", "조화": "활성화 인원수 1\n활성화 시 전장에 있는 핵심 맹약의 활성화 인원 수 +1, [조화] 오퍼레이터는 상기 활성화된 핵심 맹약의 효과 획득", "협동방어": "활성화 인원수 3\n모든 오퍼레이터가 받는 물리 및 마법 대미지 -20%, [협동방어] 오퍼레이터가 입히는 대미지가 120%로 증가, 정예화 상태인 [협동방어] 오퍼레이터의 경우 입히는 대미지가 140%로 증가", "독행": "활성화 인원수 1\n<전장에 [독행] 오퍼레이터 1명 배치> [독행] 오퍼레이터의 공격력 및 HP +60%, 초기 SP +15 ([독행] 오퍼레이터 2명 이상 배치 시 무효)", "궁극기": "활성화 인원수 2\n<전장에 정예화 오퍼레이터 2명 배치> 정예화 오퍼레이터의 공격력 +30%\n<전장에 정예화 오퍼레이터 5명 배치> 정예화 오퍼레이터의 SP 소모 -30%\n(모든 정예화 오퍼레이터가 본 맹약 활성화 가능)"};
  const TIER_COLORS = {1:"#c5c5c5",2:"#ffffff",3:"#46efbc",4:"#33c9da",5:"#f6c60f",6:"#e88c1a"};
  const BOARD_SIZE=24,BENCH_SIZE=8,MAX_DEPLOY=9,STORAGE_KEY="arknights-deploy-sim-v10";
  const state={terrainTool:null,selectedCovenants:new Set(),selectedTags:new Set(),search:"",painting:false,board:Array.from({length:BOARD_SIZE},()=>({terrain:"normal",instance:null})),bench:Array(BENCH_SIZE).fill(null),nextInstanceId:1,dragSource:null,view:"catalog"};
  const $=id=>document.getElementById(id),boardEl=$("board"),benchEl=$("bench"),rowsEl=$("operatorRows"); let toastTimer;
  const assetPath=(g,n)=>`assets/${g}/${n}.webp`, shortName=n=>[...n.replace(/\s/g,"")].slice(0,2).join(""), getOperator=n=>OPERATORS.find(o=>o.name===n);
  function showToast(msg){const e=$("toast");e.textContent=msg;e.classList.add("show");clearTimeout(toastTimer);toastTimer=setTimeout(()=>e.classList.remove("show"),1500)}
  function clearTerrainTool(){state.terrainTool=null;syncTerrainTools()}
  function makeInstance(op){return{id:state.nextInstanceId++,name:op.name}}
  function placedCount(){return state.board.reduce((n,c)=>n+(c.instance?1:0),0)}
  function updateCounter(){const n=placedCount(),e=$("deployCounter");e.textContent=n===9?"9/9":`${n}/8`;e.classList.toggle("full-nine",n===9)}
  function imageWithFallback(group,name){const w=document.createElement("span"),i=document.createElement("img"),f=document.createElement("span");i.src=assetPath(group,name);i.alt=name;f.className="icon-fallback";f.textContent=shortName(name);f.style.display="none";i.onerror=()=>{i.style.display="none";f.style.display="flex"};w.append(i,f);return w}
  function syncTerrainTools(){document.querySelectorAll(".terrain-tool").forEach(b=>b.classList.toggle("selected",b.dataset.terrain===state.terrainTool))}
  function setTerrain(index,t){const c=state.board[index];if(t==="blocked"&&c.instance){showToast("오퍼레이터가 있는 칸은 배치 불가로 바꿀 수 없습니다.");return}c.terrain=t;renderBoard()}
  function addOperatorToBench(op){clearTerrainTool();const i=state.bench.findIndex(x=>!x);if(i<0){showToast("대기 슬롯 8칸이 모두 찼습니다.");return}state.bench[i]=makeInstance(op);renderBench();renderCovenantStatus();showToast(`${op.name} → 대기 슬롯 ${i+1}`)}
  function clearDropTargets(){document.querySelectorAll(".drop-target").forEach(e=>e.classList.remove("drop-target"))}
  function startDrag(area,index,e){clearTerrainTool();const inst=area==="board"?state.board[index].instance:state.bench[index];if(!inst){e.preventDefault();return}state.dragSource={area,index};e.dataTransfer.effectAllowed="move";e.dataTransfer.setData("text/plain",`${area}:${index}`);requestAnimationFrame(()=>e.currentTarget.classList.add("dragging"))}
  function endDrag(e){e.currentTarget.classList.remove("dragging");state.dragSource=null;clearDropTargets()}
  function dropTo(area,index){const s=state.dragSource;if(!s)return;if(area==="board"&&state.board[index].terrain==="blocked"){showToast("배치 불가 칸입니다.");return}if(s.area===area&&s.index===index)return;const sv=s.area==="board"?state.board[s.index].instance:state.bench[s.index];const dv=area==="board"?state.board[index].instance:state.bench[index];if(!sv)return;if(s.area==="bench"&&area==="board"&&!dv&&placedCount()>=MAX_DEPLOY){showToast("전장에는 최대 9명까지 배치할 수 있습니다.");return}if(s.area==="board")state.board[s.index].instance=dv||null;else state.bench[s.index]=dv||null;if(area==="board")state.board[index].instance=sv;else state.bench[index]=sv;renderBoard();renderBench();renderOperatorRows()}
  function miniCovenant(name){const h=document.createElement("span"),i=document.createElement("img"),f=document.createElement("span");i.src=assetPath("covenants",name);i.alt=name;i.title=name;f.className="op-covenant-fallback";f.textContent=shortName(name);f.title=name;f.style.display="none";i.onerror=()=>{i.style.display="none";f.style.display="flex"};h.append(i,f);return h}
  function opCard(inst,area,index){
    const op=getOperator(inst.name),d=document.createElement("div");
    d.className="op-card";d.draggable=true;
    const i=document.createElement("img");i.className="op-main-image";i.src=assetPath("operators",op.name);i.alt=op.name;
    const f=document.createElement("div");f.className="op-fallback";f.textContent=shortName(op.name);f.style.display="none";
    i.onerror=()=>{i.style.display="none";f.style.display="flex"};
    const tier=document.createElement("div");tier.className="op-tier";tier.textContent=op.tier;tier.style.setProperty("--tier-color",TIER_COLORS[op.tier]);
    const cov=document.createElement("div");cov.className="op-covenants";op.covenants.forEach(c=>cov.append(miniCovenant(c)));
    const nm=document.createElement("div");nm.className="op-name-mini";nm.textContent=op.name;
    d.append(i,f,tier,cov,nm);
    d.addEventListener("dragstart",e=>startDrag(area,index,e));
    d.addEventListener("dragend",endDrag);

    // 전장/벤치 공통: 우클릭으로 삭제
    d.addEventListener("contextmenu",e=>{
      e.preventDefault();e.stopPropagation();
      if(area==="board")state.board[index].instance=null;
      else state.bench[index]=null;
      renderBoard();renderBench();renderOperatorRows();renderCovenantStatus();
    });
    return d
  }
  function setupDropZone(el,area,index){el.addEventListener("dragover",e=>{if(!state.dragSource)return;if(area==="board"&&state.board[index].terrain==="blocked")return;e.preventDefault();e.dataTransfer.dropEffect="move";clearDropTargets();el.classList.add("drop-target")});el.addEventListener("dragleave",e=>{if(!el.contains(e.relatedTarget))el.classList.remove("drop-target")});el.addEventListener("drop",e=>{e.preventDefault();e.stopPropagation();el.classList.remove("drop-target");dropTo(area,index);state.dragSource=null})}
  function covenantCounts(){
    const counts=Object.fromEntries(ALL_COVENANTS.map(c=>[c,0]));
    const boardNames=new Set(state.board.filter(c=>c.instance).map(c=>c.instance.name));
    const benchNames=new Set(state.bench.filter(Boolean).map(i=>i.name));

    // 일반 맹약: 전장에 배치된 서로 다른 오퍼레이터만 집계
    boardNames.forEach(name=>{
      const op=getOperator(name);
      if(!op)return;
      op.covenants.forEach(c=>{if(c in counts)counts[c]++});
    });

    // 예견/기적/투자자만 정비 구역(벤치)의 해당 맹약 인원을 추가 집계.
    // 같은 이름이 전장에도 있으면 중복 집계하지 않는다.
    ["예견","기적","투자자"].forEach(covenant=>{
      const already=new Set();
      boardNames.forEach(name=>{
        const op=getOperator(name);
        if(op?.covenants.includes(covenant))already.add(name);
      });
      benchNames.forEach(name=>{
        if(already.has(name))return;
        const op=getOperator(name);
        if(op?.covenants.includes(covenant)){
          counts[covenant]++;
          already.add(name);
        }
      });
    });
    return counts;
  }
  function renderCovenantStatus(){
    const box=$("covenantStatus"),counts=covenantCounts();
    box.innerHTML="";
    ALL_COVENANTS.filter(name=>counts[name]>0).forEach(name=>{
      const count=counts[name],need=ACTIVATION[name],d=document.createElement("div");
      const isActive=name==="독행"?count===1:count>=need;
      d.className="covenant-count"+(isActive?" active":"");

      const i=document.createElement("img"),f=document.createElement("div");
      i.src=assetPath("covenants",name);i.alt=name;
      f.className="status-fallback";f.textContent=shortName(name);f.style.display="none";
      i.onerror=()=>{i.style.display="none";f.style.display="flex"};

      const nm=document.createElement("span");nm.className="name";nm.textContent=name;
      const ct=document.createElement("span");ct.className="count";ct.textContent=count;

      const tip=document.createElement("div");
      tip.className="covenant-tooltip";
      tip.textContent=COVENANT_DESCRIPTIONS[name] || `${name} 맹약`;

      d.append(i,f,nm,ct,tip);box.append(d);
    });
  }
  function renderBoard(){
    boardEl.innerHTML="";
    state.board.forEach((c,index)=>{
      const el=document.createElement("div");
      el.className=`grid-cell terrain-${c.terrain}`;
      if(c.instance)el.append(opCard(c.instance,"board",index));

      // 지형 설정은 드래그 칠하기 없이, 선택한 도구로 칸을 한 번 클릭할 때만 적용.
      el.addEventListener("click",e=>{
        if(!state.terrainTool)return;
        e.preventDefault();
        e.stopPropagation();
        setTerrain(index,state.terrainTool);
      });

      setupDropZone(el,"board",index);
      boardEl.append(el);
    });
    updateCounter();
    renderCovenantStatus();
  }
  function renderBench(){benchEl.innerHTML="";state.bench.forEach((inst,index)=>{const el=document.createElement("div");el.className="bench-slot";if(inst)el.append(opCard(inst,"bench",index));setupDropZone(el,"bench",index);benchEl.append(el)})}
  function badge(group,name){const d=document.createElement("div");d.className="image-badge";const im=imageWithFallback(group,name),s=document.createElement("span");s.textContent=name;d.append(im,s);return d}
  function filterChip(group,name){const b=document.createElement("button"),set=group==="covenants"?state.selectedCovenants:state.selectedTags;b.className="filter-chip"+(set.has(name)?" selected":"");b.append(imageWithFallback(group==="covenants"?"covenants":"tags",name),Object.assign(document.createElement("span"),{className:"chip-label",textContent:name}));b.onclick=()=>{set.has(name)?set.delete(name):set.add(name);renderFilters();renderOperatorRows()};return b}
  function renderFilters(){const a=$("coreCovenantFilters"),b=$("extraCovenantFilters1"),c=$("extraCovenantFilters2"),t=$("tagFilters");a.innerHTML=b.innerHTML=c.innerHTML=t.innerHTML="";CORE.forEach(x=>a.append(filterChip("covenants",x)));EXTRA1.forEach(x=>b.append(filterChip("covenants",x)));EXTRA2.forEach(x=>c.append(filterChip("covenants",x)));TAG_ORDER.forEach(x=>t.append(filterChip("tags",x)))}
  function filteredOperators(){
    const q=state.search.trim().toLowerCase();
    const selectedCore=[...state.selectedCovenants].filter(c=>CORE.includes(c));
    const selectedExtra=[...state.selectedCovenants].filter(c=>EXTRA.includes(c));
    return OPERATORS.filter(op=>{
      const coreOK=!selectedCore.length || op.covenants.some(c=>selectedCore.includes(c));
      const extraOK=!selectedExtra.length || op.covenants.some(c=>selectedExtra.includes(c));
      const tagOK=!state.selectedTags.size || op.tags.some(t=>state.selectedTags.has(t));
      const searchOK=!q || op.name.toLowerCase().includes(q) || op.ability.toLowerCase().includes(q);
      return coreOK && extraOK && tagOK && searchOK;
    });
  }
  function deployedOperators(){const m=new Map();state.board.filter(c=>c.instance).forEach(c=>m.set(c.instance.name,(m.get(c.instance.name)||0)+1));return [...m.entries()].map(([name,count])=>({...getOperator(name),instanceCount:count})).sort((a,b)=>a.tier-b.tier||a.name.localeCompare(b.name,"ko"))}
  function renderRow(op,isDeployed=false){const tr=document.createElement("tr"),tdT=document.createElement("td");tdT.className="tier-col";const tb=document.createElement("span");tb.className="tier-badge";tb.textContent=op.tier;tb.style.setProperty("--tier-color",TIER_COLORS[op.tier]);tdT.append(tb);const tdO=document.createElement("td"),oc=document.createElement("div");oc.className="operator-cell";const img=document.createElement("img");img.className="operator-portrait";img.src=assetPath("operators",op.name);img.alt=op.name;img.onerror=()=>img.style.visibility="hidden";const nm=document.createElement("div");nm.className="operator-name";nm.textContent=op.name;if(isDeployed&&op.instanceCount>1){const x=document.createElement("span");x.className="duplicate-count";x.textContent=`×${op.instanceCount}`;nm.append(x)}oc.append(img,nm);tdO.append(oc);const tdC=document.createElement("td"),cl=document.createElement("div");cl.className="badge-list";op.covenants.forEach(x=>cl.append(badge("covenants",x)));tdC.append(cl);const tdG=document.createElement("td"),gl=document.createElement("div");gl.className="badge-list";op.tags.forEach(x=>gl.append(badge("tags",x)));tdG.append(gl);const tdA=document.createElement("td");tdA.className="ability-cell";tdA.textContent=op.ability;tr.append(tdT,tdO,tdC,tdG,tdA);if(!isDeployed)tr.onclick=()=>addOperatorToBench(op);return tr}
  function renderOperatorRows(){const deployed=state.view==="deployed",list=deployed?deployedOperators():filteredOperators();$("browserTitle").textContent=deployed?"배치 정보":"오퍼레이터";$("resultCount").textContent=deployed?`${list.length}종 / ${placedCount()}명`:`${list.length}명`;$("filters").classList.toggle("hidden",deployed);$("searchInput").disabled=deployed;$("searchInput").style.opacity=deployed?".38":"1";$("searchInput").placeholder=deployed?"배치 정보 보기":"이름 또는 능력 검색";rowsEl.innerHTML="";list.forEach(op=>rowsEl.append(renderRow(op,deployed)))}
  function setView(v){state.view=v;$("catalogViewBtn").classList.toggle("active",v==="catalog");$("deployedViewBtn").classList.toggle("active",v==="deployed");renderOperatorRows()}
  function save(){localStorage.setItem(STORAGE_KEY,JSON.stringify({board:state.board,bench:state.bench,nextInstanceId:state.nextInstanceId}));showToast("현재 배치를 로컬 저장했습니다.")}
  function load(){try{const d=JSON.parse(localStorage.getItem(STORAGE_KEY));if(!d)return showToast("저장된 배치가 없습니다.");if(Array.isArray(d.board)&&d.board.length===24)state.board=d.board;if(Array.isArray(d.bench)&&d.bench.length===8)state.bench=d.bench;state.nextInstanceId=d.nextInstanceId||1;renderBoard();renderBench();renderOperatorRows();showToast("저장된 배치를 불러왔습니다.")}catch{showToast("저장 데이터를 읽을 수 없습니다.")}}
  function reset(){if(!confirm("현재 배치와 격자 설정을 모두 초기화할까요?"))return;state.board=Array.from({length:24},()=>({terrain:"normal",instance:null}));state.bench=Array(8).fill(null);state.nextInstanceId=1;clearTerrainTool();renderBoard();renderBench();renderOperatorRows()}
  document.querySelectorAll(".terrain-tool").forEach(btn=>btn.onclick=()=>{const t=btn.dataset.terrain;state.terrainTool=state.terrainTool===t?null:t;syncTerrainTools()});$("searchInput").oninput=e=>{state.search=e.target.value;renderOperatorRows()};$("clearCovenants").onclick=()=>{state.selectedCovenants.clear();renderFilters();renderOperatorRows()};$("clearTags").onclick=()=>{state.selectedTags.clear();renderFilters();renderOperatorRows()};$("saveBtn").onclick=save;$("loadBtn").onclick=load;$("resetBtn").onclick=reset;$("catalogViewBtn").onclick=()=>setView("catalog");$("deployedViewBtn").onclick=()=>setView("deployed");document.addEventListener("contextmenu",e=>{e.preventDefault()});document.addEventListener("keydown",e=>{if(e.key==="Escape")clearTerrainTool()});renderFilters();renderOperatorRows();renderBoard();renderBench();
})();

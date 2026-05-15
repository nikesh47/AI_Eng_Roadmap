import './style.css';
import { PHASES, PHASE_COLORS, MONTH_NAMES, DAY_LABELS, TIPS } from './data.js';

// ══════════════════════════════════════════
//  STATE
// ══════════════════════════════════════════

const LS = { cp:'aiet_cp', ss:'aiet_ss' };

let completedPhases = new Set();
let sessions = {}; // { 'YYYY-MM-DD': { phase, hours, notes } }

let calYear  = new Date().getFullYear();
let calMonth = new Date().getMonth();
let modalDate = null;

function load() {
  try {
    const cp = localStorage.getItem(LS.cp);
    if (cp) completedPhases = new Set(JSON.parse(cp));
    const ss = localStorage.getItem(LS.ss);
    if (ss) sessions = JSON.parse(ss);
  } catch(e) {}
}

function save() {
  try {
    localStorage.setItem(LS.cp, JSON.stringify([...completedPhases]));
    localStorage.setItem(LS.ss, JSON.stringify(sessions));
  } catch(e) {}
}

// ══════════════════════════════════════════
//  UTILS
// ══════════════════════════════════════════

function toDateStr(d) {
  return d.toISOString().slice(0,10);
}

function todayStr() {
  return toDateStr(new Date());
}

function getStreak() {
  let streak = 0;
  let d = new Date();
  // if today has no session, start checking from yesterday
  if (!sessions[toDateStr(d)]) d.setDate(d.getDate()-1);
  while (sessions[toDateStr(d)]) {
    streak++;
    d.setDate(d.getDate()-1);
  }
  return streak;
}

function getLongestStreak() {
  const dates = Object.keys(sessions).sort();
  if (!dates.length) return 0;
  let max=1, cur=1;
  for (let i=1;i<dates.length;i++){
    const prev = new Date(dates[i-1]);
    const curr = new Date(dates[i]);
    const diff = (curr-prev)/(1000*60*60*24);
    if (diff===1) { cur++; max=Math.max(max,cur); }
    else cur=1;
  }
  return max;
}

function getTotalHours() {
  return Object.values(sessions).reduce((a,s)=>a+(parseFloat(s.hours)||0),0);
}

function getStudyDays() {
  return Object.keys(sessions).length;
}

function getCurrentPhase() {
  for (let i=PHASES.length-1;i>=0;i--) {
    if (completedPhases.has(i)) return Math.min(i+1, PHASES.length-1);
  }
  return 0;
}

function getMonthHours(year, month) {
  let total = 0;
  Object.entries(sessions).forEach(([date,s])=>{
    const d = new Date(date);
    if (d.getFullYear()===year && d.getMonth()===month) total += parseFloat(s.hours)||0;
  });
  return total;
}

function getRecentSessions(n) {
  return Object.entries(sessions)
    .sort((a,b)=>b[0].localeCompare(a[0]))
    .slice(0,n);
}

function formatDate(str) {
  const d = new Date(str+'T00:00:00');
  return d.toLocaleDateString('en-US',{month:'short',day:'numeric'});
}

function formatFullDate(str) {
  const d = new Date(str+'T00:00:00');
  return d.toLocaleDateString('en-US',{weekday:'long',month:'long',day:'numeric',year:'numeric'});
}

// ══════════════════════════════════════════
//  TABS
// ══════════════════════════════════════════

window.switchTab = function(t) {
  document.querySelectorAll('.pane').forEach(p=>p.classList.remove('active'));
  document.querySelectorAll('.nav-tab').forEach(n=>n.classList.remove('active'));
  document.getElementById('pane-'+t).classList.add('active');
  const tabs = ['dashboard','roadmap','planner','stats'];
  document.querySelectorAll('.nav-tab')[tabs.indexOf(t)].classList.add('active');
  if (t==='dashboard') renderDashboard();
  if (t==='roadmap')   renderRoadmap();
  if (t==='planner')   renderCalendar();
  if (t==='stats')     renderStats();
}

// ══════════════════════════════════════════
//  HEADER
// ══════════════════════════════════════════

function updateHeader() {
  const streak = getStreak();
  const cp = getCurrentPhase();
  document.getElementById('hdr-streak').textContent = `🔥 ${streak} day streak`;
  document.getElementById('hdr-phase').textContent = `Phase ${PHASES[cp].num} · ${PHASES[cp].title}`;
}

// ══════════════════════════════════════════
//  DASHBOARD
// ══════════════════════════════════════════

function renderDashboard() {
  const streak = getStreak();
  const hours  = getTotalHours();
  const days   = getStudyDays();
  const phases = completedPhases.size;

  document.getElementById('d-streak').textContent = streak;
  document.getElementById('d-hours').textContent  = hours % 1 === 0 ? hours : hours.toFixed(1);
  document.getElementById('d-days').textContent   = days;
  document.getElementById('d-phases').textContent = phases;

  const pct = Math.round((phases / PHASES.length)*100);
  document.getElementById('prog-pct').textContent  = pct+'%';
  document.getElementById('prog-fill').style.width = pct+'%';

  // Phase pills
  const pills = document.getElementById('phase-pills');
  pills.innerHTML = PHASES.map(p=>{
    const done = completedPhases.has(p.id);
    return `<div class="pill ${done?'done':''}">P${p.num} ${p.title.split(' ')[0]}</div>`;
  }).join('');

  // Today focus
  const cp = getCurrentPhase();
  const ph = PHASES[cp];
  const tip = TIPS[new Date().getDate() % TIPS.length];
  const todaySess = sessions[todayStr()];
  let focusTxt = '';
  if (todaySess) {
    const pp = PHASES[todaySess.phase];
    focusTxt = `You studied <strong>${todaySess.hours}h</strong> today on <strong>${pp.title}</strong>. ${todaySess.notes ? '"'+todaySess.notes+'"' : ''}<br><br><em>${tip}</em>`;
  } else {
    focusTxt = `Today's focus: <strong>${ph.title}</strong><br>${ph.intro}<br><br><em>${tip}</em>`;
  }
  document.getElementById('today-focus').innerHTML = focusTxt;

  // Recent sessions
  const recent = getRecentSessions(6);
  const el = document.getElementById('dash-recent');
  if (!recent.length) {
    el.innerHTML = '<div class="empty-state">No sessions yet. Go to Planner to log your first study session.</div>';
  } else {
    el.innerHTML = recent.map(([date,s])=>logRowHTML(date,s)).join('');
  }

  updateHeader();
}

function logRowHTML(date, s) {
  const ph = PHASES[s.phase];
  const color = PHASE_COLORS[s.phase];
  return `<div class="log-row">
    <span class="log-d">${formatDate(date)}</span>
    <span class="log-pbadge" style="background:${color}22;border:1px solid ${color}55;color:${color};">P${ph.num}</span>
    <span class="log-h">${s.hours}h</span>
    <span class="log-n">${s.notes||ph.title}</span>
  </div>`;
}

// ══════════════════════════════════════════
//  ROADMAP
// ══════════════════════════════════════════

function renderRoadmap() {
  const el = document.getElementById('roadmap-list');
  el.innerHTML = PHASES.map((p,i)=>{
    const done = completedPhases.has(p.id);
    const isLast = i === PHASES.length-1;
    return `
    <div class="phase-item">
      ${!isLast?`<div class="phase-line ${done?'done':''}"></div>`:''}
      <div class="phase-card-r" id="pc-${p.id}" onclick="togglePhaseCard(${p.id})">
        <div class="pdot ${done?'done':''}" id="pd-${p.id}" onclick="event.stopPropagation();togglePhase(${p.id})" title="Mark complete">
          ${done?'<svg width="7" height="7" viewBox="0 0 8 8" fill="none"><path d="M1.5 4L3 5.5L6.5 2" stroke="#080808" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>':''}
        </div>
        <div class="pnum ${done?'done':''}">PHASE ${p.num} · ${p.duration}</div>
        <div class="ptitle ${done?'done':''}">${p.title}</div>
        <div class="pchev" id="pchev-${p.id}">▼</div>

        <div class="pbody" id="pb-${p.id}">
          <div class="pintro">${p.intro}</div>

          <div class="slabel">RESOURCES</div>
          <div class="res-list">
            ${p.resources.map(r=>`
              <div class="res-row">
                <span class="res-arr">→</span>
                ${r.u ? `<a href="${r.u}" target="_blank" rel="noopener">${r.t}</a>` : `<span>${r.t}</span>`}
              </div>
            `).join('')}
          </div>

          ${p.project?`
          <div class="build-box">
            <div class="build-lbl">BUILD THIS</div>
            <div class="build-txt">${p.project}</div>
          </div>`:''}

          ${p.tip?`<div class="tip-txt">⚡ ${p.tip}</div>`:''}

          <button class="mark-btn ${done?'done':''}" onclick="event.stopPropagation();togglePhase(${p.id})">
            ${done?'✓ PHASE COMPLETE':'MARK COMPLETE'}
          </button>
        </div>
      </div>
    </div>`;
  }).join('');
}

window.togglePhaseCard = function(id) {
  const body  = document.getElementById('pb-'+id);
  const card  = document.getElementById('pc-'+id);
  const chev  = document.getElementById('pchev-'+id);
  const open  = body.classList.contains('open');
  body.classList.toggle('open', !open);
  card.classList.toggle('open', !open);
  chev.classList.toggle('open', !open);
}

window.togglePhase = function(id) {
  if (completedPhases.has(id)) completedPhases.delete(id);
  else completedPhases.add(id);
  save();
  renderRoadmap();
  updateHeader();
}

// ══════════════════════════════════════════
//  CALENDAR
// ══════════════════════════════════════════

function renderCalendar() {
  const titleEl = document.getElementById('cal-month-title');
  if (!titleEl) return;
  titleEl.textContent = MONTH_NAMES[calMonth] + ' ' + calYear;

  // Legend
  const leg = document.getElementById('cal-legend');
  leg.innerHTML = PHASES.map(p=>`
    <div class="leg-item">
      <div class="leg-dot" style="background:${PHASE_COLORS[p.id]}"></div>
      <span>P${p.num} ${p.title.split(' ')[0]}</span>
    </div>
  `).join('');

  // Grid
  const grid = document.getElementById('cal-grid');
  grid.innerHTML = DAY_LABELS.map(d=>`<div class="cal-dlbl">${d}</div>`).join('');

  const today = todayStr();
  const firstDay = new Date(calYear, calMonth, 1).getDay();
  const daysInMonth = new Date(calYear, calMonth+1, 0).getDate();

  // Empty cells for offset
  for (let i=0;i<firstDay;i++) grid.innerHTML += '<div class="cal-day empty"></div>';

  for (let d=1;d<=daysInMonth;d++) {
    const dateStr = `${calYear}-${String(calMonth+1).padStart(2,'0')}-${String(d).padStart(2,'0')}`;
    const sess = sessions[dateStr];
    const isToday = dateStr === today;
    const isFuture = dateStr > today;
    let inner = `<div class="cal-dn">${d}</div>`;
    if (sess) {
      const color = PHASE_COLORS[sess.phase];
      inner += `<div class="cal-dot" style="background:${color}"></div>`;
      inner += `<div class="cal-hrs">${sess.hours}h</div>`;
      inner += `<div class="cal-plbl">${PHASES[sess.phase].title}</div>`;
    }
    grid.innerHTML += `<div class="cal-day ${isToday?'today':''} ${sess?'has-sess':''} ${isFuture?'future':''}" data-date="${dateStr}" onclick="openModal('${dateStr}')">${inner}</div>`;
  }

  // Planner log (recent 10)
  const logEl = document.getElementById('planner-log');
  const recent = getRecentSessions(10);
  if (!recent.length) {
    logEl.innerHTML = '<div class="empty-state">Click any day to log a study session.</div>';
  } else {
    logEl.innerHTML = recent.map(([date,s])=>logRowHTML(date,s)).join('');
  }
}

window.calMove = function(dir) {
  calMonth += dir;
  if (calMonth<0) { calMonth=11; calYear--; }
  if (calMonth>11) { calMonth=0; calYear++; }
  renderCalendar();
}

window.calToday = function() {
  const now = new Date();
  calYear  = now.getFullYear();
  calMonth = now.getMonth();
  renderCalendar();
}

// ══════════════════════════════════════════
//  MODAL
// ══════════════════════════════════════════

window.openModal = function(dateStr) {
  modalDate = dateStr;
  document.getElementById('modal-date-lbl').textContent = formatFullDate(dateStr);

  // Populate phase select
  const sel = document.getElementById('m-phase');
  sel.innerHTML = PHASES.map(p=>`<option value="${p.id}">Phase ${p.num} — ${p.title}</option>`).join('');

  const existing = sessions[dateStr];
  if (existing) {
    sel.value = existing.phase;
    document.getElementById('m-hours').value = existing.hours;
    document.getElementById('m-notes').value = existing.notes||'';
    document.getElementById('del-btn').style.display = 'block';
  } else {
    sel.value = getCurrentPhase();
    document.getElementById('m-hours').value = 2;
    document.getElementById('m-notes').value = '';
    document.getElementById('del-btn').style.display = 'none';
  }

  document.getElementById('modal-overlay').classList.add('open');
}

window.closeModal = function(e) {
  if (e && e.target !== document.getElementById('modal-overlay')) return;
  document.getElementById('modal-overlay').classList.remove('open');
  modalDate = null;
}

window.saveSession = function() {
  if (!modalDate) return;
  sessions[modalDate] = {
    phase: parseInt(document.getElementById('m-phase').value),
    hours: parseFloat(document.getElementById('m-hours').value)||1,
    notes: document.getElementById('m-notes').value.trim()
  };
  save();
  document.getElementById('modal-overlay').classList.remove('open');
  modalDate = null;
  renderCalendar();
  renderDashboard();
  if (document.getElementById('pane-stats').classList.contains('active')) renderStats();
}

window.deleteSession = function() {
  if (!modalDate) return;
  delete sessions[modalDate];
  save();
  document.getElementById('modal-overlay').classList.remove('open');
  modalDate = null;
  renderCalendar();
  renderDashboard();
}

// ══════════════════════════════════════════
//  STATS
// ══════════════════════════════════════════

function renderStats() {
  const hours   = getTotalHours();
  const days    = getStudyDays();
  const longest = getLongestStreak();
  const avg     = days ? (hours/days).toFixed(1) : 0;
  const mHours  = getMonthHours(new Date().getFullYear(), new Date().getMonth());

  document.getElementById('s-hrs').textContent     = hours % 1 === 0 ? hours : hours.toFixed(1);
  document.getElementById('s-lstreak').textContent = longest;
  document.getElementById('s-avg').textContent     = avg;
  document.getElementById('s-month').textContent   = mHours % 1 === 0 ? mHours : mHours.toFixed(1);

  // Heatmap — last 364 days (52 weeks)
  const hm = document.getElementById('heatmap');
  hm.innerHTML = '';
  const today = new Date();
  // Start from 363 days ago, aligned to Sunday
  const startDate = new Date(today);
  startDate.setDate(startDate.getDate() - 363);
  // Rewind to Sunday
  while (startDate.getDay() !== 0) startDate.setDate(startDate.getDate()-1);

  const cur = new Date(startDate);
  while (cur <= today) {
    const ds = toDateStr(cur);
    const sess = sessions[ds];
    let level = 0;
    if (sess) {
      const h = parseFloat(sess.hours)||0;
      level = h < 1.5 ? 1 : h < 3 ? 2 : 3;
    }
    const cell = document.createElement('div');
    cell.className = 'hcell';
    if (level) cell.setAttribute('data-h', level);
    cell.title = ds + (sess ? ` · ${sess.hours}h` : '');
    hm.appendChild(cell);
    cur.setDate(cur.getDate()+1);
  }

  // Phase bars
  const phaseHours = PHASES.map(p=>({p, h:0}));
  Object.values(sessions).forEach(s=>{
    if (phaseHours[s.phase]) phaseHours[s.phase].h += parseFloat(s.hours)||0;
  });
  const maxH = Math.max(...phaseHours.map(x=>x.h), 1);

  document.getElementById('phase-bars').innerHTML = phaseHours.map(({p,h})=>`
    <div class="pbar-row">
      <div class="pbar-lbl">P${p.num} ${p.title.split(' ')[0]}</div>
      <div class="pbar-track">
        <div class="pbar-fill" style="width:${(h/maxH)*100}%;background:${PHASE_COLORS[p.id]};"></div>
      </div>
      <div class="pbar-val">${h > 0 ? (h%1===0?h:h.toFixed(1))+'h' : '—'}</div>
    </div>
  `).join('');
}

// ══════════════════════════════════════════
//  INIT
// ══════════════════════════════════════════

load();
renderDashboard();
renderRoadmap();
renderCalendar();

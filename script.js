/* ---------- theme colors for JS/Chart.js ---------- */
const C = { accent:'#9B6FD8', accentDark:'#6C4FB0', success:'#2E9E5B', error:'#D32F2F',
  orange:'#F5A623', textTer:'#9AA0A6', border:'#E0E0E0', track:'#EFEAF7' };

/* ---------- nav ---------- */
const NAV = [
  {key:'dashboard', label:'Dashboard', icon:'i-grid'},
  {key:'users', label:'User management', icon:'i-users'},
  {key:'translations', label:'Translation history', icon:'i-clock'},
  {key:'quizzes', label:'Quiz management', icon:'i-book'},
  {key:'library', label:'Learning library', icon:'i-book'},
  {key:'dataset', label:'Dataset management', icon:'i-db'},
  {key:'model', label:'AI model', icon:'i-cpu'},
  {key:'feedback', label:'Feedback & issues', icon:'i-msg'},
  {key:'reports', label:'Reports', icon:'i-chart'},
  {key:'settings', label:'Settings', icon:'i-settings'},
];
const sidebar = document.getElementById('sidebar');
NAV.forEach((n,i)=>{
  const div = document.createElement('div');
  div.className = 'nav-item' + (i===0?' active':'');
  div.dataset.key = n.key;
  div.innerHTML = `<span class="n">${i+1}</span><svg><use href="#${n.icon}"/></svg>${n.label}`;
  div.onclick = () => switchSection(n.key);
  sidebar.insertBefore(div, sidebar.querySelector('.nav-foot'));
});
function switchSection(key){
  document.querySelectorAll('.nav-item').forEach(el=>el.classList.toggle('active', el.dataset.key===key));
  document.querySelectorAll('section').forEach(el=>el.classList.toggle('active', el.id==='sec-'+key));
}

/* ---------- mock data ---------- */
const USERS = [
  {name:'Ayesha Khan',email:'ayesha@mail.com',role:'learner',status:'active',lastLogin:'Today, 9:02am',topModule:'Sign → Text'},
  {name:'Bilal Ahmed',email:'bilal@mail.com',role:'learner',status:'active',lastLogin:'Today, 8:41am',topModule:'Quiz'},
  {name:'Sana Tariq',email:'sana@mail.com',role:'instructor',status:'blocked',lastLogin:'3 days ago',topModule:'Text → Sign'},
  {name:'Hina Malik',email:'hina@mail.com',role:'learner',status:'active',lastLogin:'Yesterday',topModule:'Learn',nested:true},
  {name:'Zain Abbas',email:'zain@mail.com',role:'instructor',status:'active',lastLogin:'2 hrs ago',topModule:'Sign → Text'},
];
const TRANSLATIONS = [
  {user:'Ayesha Khan',type:'Sign → Text',text:'I want some water',confidence:96,date:'24 Jul, 10:12am'},
  {user:'Bilal Ahmed',type:'Text → Sign',text:'Thank you',confidence:99,date:'24 Jul, 9:58am'},
  {user:'Zain Abbas',type:'Sign → Text',text:'Where is the bathroom',confidence:88,date:'24 Jul, 9:40am'},
];
let QUIZZES = [
  {title:'Alphabets A–Z',category:'Beginner',attempts:412,avgScore:78,failRate:12,missed:"Letter 'Q' sign"},
  {title:'Numbers & Days',category:'Beginner',attempts:356,avgScore:81,failRate:9,missed:"'Thursday' sign"},
  {title:'Family & People',category:'Intermediate',attempts:298,avgScore:64,failRate:31,missed:"'Cousin' sign"},
  {title:'Common Sentences',category:'Advanced',attempts:203,avgScore:58,failRate:38,missed:"'How are you?' sequence"},
  {title:'Emergency Phrases',category:'Advanced',attempts:145,avgScore:52,failRate:44,missed:"'Call ambulance' sequence"},
];
const CATEGORIES = [['Alphabets',26],['Numbers',20],['Greetings',14],['Family',18],['Food',22],['Emergency',12],['Common Sentences',30]];
const LIBRARY = [['Hello','Greetings','GIF'],['Thank you','Greetings','Avatar'],['Water','Food','Video']];
const DATASET = [['Batch 12','40','Emergency','18 Jul 2026'],['Batch 11','65','Common sentences','10 Jul 2026']];
const MODEL = {version:'v2.3',accuracy:92.4,precision:91.0,recall:89.7,f1:90.3};
const MODEL_HISTORY = [
  {version:'v2.3',accuracy:92.4,date:'14 Jul 2026',status:'active'},
  {version:'v2.2',accuracy:90.1,date:'02 Jun 2026',status:'archived'},
  {version:'v2.1',accuracy:87.6,date:'15 Apr 2026',status:'archived'},
];
const ISSUES = [
  {user:'Sana Tariq',module:'Sign → Text',message:'Camera hangs on capture after ~30 seconds',status:'open',date:'22 Jul 2026'},
  {user:'Usman Raza',module:'Quiz',message:"Score doesn't save after retrying a question",status:'resolved',date:'20 Jul 2026'},
  {user:'Hina Malik',module:'Text → Sign',message:'Avatar animation lags on older phones',status:'open',date:'19 Jul 2026'},
  {user:'Zain Abbas',module:'Learn',message:"Video not loading for 'Family' lesson",status:'open',date:'17 Jul 2026'},
];
const ACTIVITY = [
  'Admin blocked user Sana Tariq — 18m ago','Model v2.3 activated by admin — 1h ago',
  "New quiz 'Emergency Phrases' added — 3h ago",'Dataset updated: +40 training videos — 5h ago',
  'User Bilal Ahmed registered — 6h ago',
];

/* ---------- small render helpers ---------- */
const pill = (ok, text) => `<span class="pill ${ok?'ok':'no'}">${text}</span>`;
const toggle = (on) => `<span class="toggle ${on?'on':'off'}"><i></i></span>`;
const actions = () => `<div class="row-actions"><svg><use href="#i-eye"/></svg><svg><use href="#i-edit"/></svg></div>`;
const sr = (i) => String(i+1).padStart(2,'0');

/* ---------- DASHBOARD ---------- */
document.getElementById('dashStats').innerHTML = [
  ['Total users','1,284'],['New today','+42'],['Translations','3,910'],
  ['Quizzes attempted','1,706'],['Signs in library','142'],['Avg quiz score','71%'],
].map(([l,v])=>`<div class="card"><div class="lbl">${l}</div><div class="val">${v}</div></div>`).join('');

document.getElementById('activityList').innerHTML = ACTIVITY.map(a=>`<div class="activity-row">${a}</div>`).join('');

new Chart(document.getElementById('regChart'), {
  type:'line',
  data:{labels:['Mon','Tue','Wed','Thu','Fri','Sat','Sun'],
    datasets:[{data:[12,18,9,22,15,27,20],borderColor:C.accent,backgroundColor:C.accent,tension:.35,pointRadius:3}]},
  options:{plugins:{legend:{display:false}},scales:{y:{grid:{color:'#F1EEF6'}},x:{grid:{display:false}}}}
});
new Chart(document.getElementById('usageChart'), {
  type:'doughnut',
  data:{labels:['Sign → Text','Text → Sign','Quiz','Learn'],
    datasets:[{data:[42,27,18,13],backgroundColor:[C.accent,C.accentDark,C.orange,'#4E3D73']}]},
  options:{plugins:{legend:{position:'bottom',labels:{font:{size:11}}}}}
});

/* ---------- USERS ---------- */
function renderUsers(){
  document.getElementById('usersBody').innerHTML = USERS.map((u,i)=>`
    <tr>
      <td><input type="checkbox"></td><td>${sr(i)}</td>
      <td><div style="display:flex;align-items:center;gap:6px">${u.nested?'<svg width="13" height="13" style="color:var(--text-ter)"><use href="#i-nest"/></svg>':''}<b>${u.name}</b></div><div style="font-size:10.5px;color:var(--text-ter)">${u.role}</div></td>
      <td>${u.email}</td><td>${u.topModule}</td><td>${u.lastLogin}</td>
      <td>${pill(u.status==='active', u.status==='active'?'Active':'Blocked')}</td>
      <td><span class="toggle ${u.status==='active'?'on':'off'}" data-user-idx="${i}" onclick="toggleUserAccess(${i})"><i></i></span></td>
      <td>${actions()}</td>
    </tr>`).join('');
}
function toggleUserAccess(i){
  USERS[i].status = USERS[i].status === 'active' ? 'blocked' : 'active';
  renderUsers();
}
renderUsers();

/* ---------- TRANSLATIONS ---------- */
document.getElementById('translationsBody').innerHTML = TRANSLATIONS.map((t,i)=>`
  <tr><td>${sr(i)}</td><td>${t.user}</td><td>${t.type}</td><td>${t.text}</td>
  <td>${pill(t.confidence>=90, t.confidence+'%')}</td><td>${t.date}</td></tr>`).join('');

/* ---------- QUIZZES ---------- */
function renderQuizzes(){
  document.getElementById('quizzesBody').innerHTML = QUIZZES.map((q,i)=>`
    <tr><td>${sr(i)}</td><td><b>${q.title}</b></td><td>${q.category}</td><td>${q.attempts}</td>
    <td>${q.avgScore}%</td><td>${pill(q.failRate<25, q.failRate+'%')}</td><td>${q.missed}</td>
    <td>${toggle(true)}</td><td>${actions()}</td></tr>`).join('');
}
function sortQuizzes(key){
  QUIZZES = [...QUIZZES].sort((a,b)=>b[key]-a[key]);
  document.getElementById('sortAttempts').classList.toggle('on', key==='attempts');
  document.getElementById('sortFail').classList.toggle('on', key==='failRate');
  renderQuizzes();
}
renderQuizzes();

/* ---------- LIBRARY ---------- */
document.getElementById('catGrid').innerHTML = CATEGORIES.map(([n,c])=>`<div class="cat-card"><div class="v">${c}</div><div class="l">${n}</div></div>`).join('');
document.getElementById('libraryBody').innerHTML = LIBRARY.map((r,i)=>`
  <tr><td>${sr(i)}</td><td><b>${r[0]}</b></td><td>${r[1]}</td><td>${r[2]}</td><td>${toggle(true)}</td><td>${actions()}</td></tr>`).join('');

/* ---------- DATASET ---------- */
document.getElementById('datasetBody').innerHTML = DATASET.map((r,i)=>`
  <tr><td>${sr(i)}</td><td><b>${r[0]}</b></td><td>${r[1]}</td><td>${r[2]}</td><td>${r[3]}</td><td>${toggle(true)}</td></tr>`).join('');

/* ---------- MODEL ---------- */
document.getElementById('modelStats').innerHTML = [
  ['Version',MODEL.version],['Accuracy',MODEL.accuracy+'%'],['Precision',MODEL.precision+'%'],
  ['Recall',MODEL.recall+'%'],['F1 score',MODEL.f1+'%'],
].map(([l,v])=>`<div class="card" style="text-align:center"><div class="lbl">${l}</div><div class="val">${v}</div></div>`).join('');
document.getElementById('modelBody').innerHTML = MODEL_HISTORY.map(m=>`
  <tr><td><b>${m.version}</b></td><td>${m.accuracy}%</td><td>${m.date}</td>
  <td>${pill(m.status==='active', m.status)}</td>
  <td>${m.status!=='active'?'<button class="btn" style="padding:5px 10px"><svg width="12" height="12"><use href="#i-rollback"/></svg>Rollback to this</button>':''}</td></tr>`).join('');

/* ---------- FEEDBACK ---------- */
const byModule = {};
ISSUES.forEach(i=>{ byModule[i.module] = (byModule[i.module]||0)+1; });
new Chart(document.getElementById('issuesChart'), {
  type:'bar',
  data:{labels:Object.keys(byModule), datasets:[{data:Object.values(byModule), backgroundColor:C.accent, borderRadius:6}]},
  options:{indexAxis:'y', plugins:{legend:{display:false}}, scales:{x:{ticks:{stepSize:1},grid:{color:'#F1EEF6'}},y:{grid:{display:false}}}}
});
document.getElementById('issuesBody').innerHTML = ISSUES.map((f,i)=>`
  <tr><td>${sr(i)}</td><td>${f.user}</td><td><span class="tag">${f.module}</span></td><td>${f.message}</td>
  <td>${pill(f.status==='resolved', f.status==='resolved'?'Resolved':'Open')}</td><td>${f.date}</td>
  <td><div class="row-actions"><svg><use href="#i-msg"/></svg><svg><use href="#i-check"/></svg></div></td></tr>`).join('');

/* ---------- REPORTS ---------- */
document.getElementById('reportsGrid').innerHTML = ['User report','Translation report','Quiz report','Learning progress report','Issues report']
  .map(r=>`<div class="card"><h4>${r}</h4><div class="btnrow"><button class="btn" style="padding:6px 10px">PDF</button><button class="btn" style="padding:6px 10px">Excel</button><button class="btn" style="padding:6px 10px">CSV</button></div></div>`).join('');

/* ---------- SETTINGS ---------- */
document.getElementById('settingsCard').innerHTML = [
  ['App name','PSL-Bridge'],['Supported languages','Urdu, English'],['Avatar speed','1.0x'],
  ['Notifications','toggle'],['Theme','Light (matches app)'],
].map(([l,v])=>`<div class="settings-row"><span>${l}</span>${v==='toggle'?toggle(true):`<span style="font-size:12.5px;color:var(--text-sec);font-weight:400">${v}</span>`}</div>`).join('');

/* ---------- generic toggle click (visual only — for toggles with no paired status column, e.g. quizzes/library/dataset/settings) ---------- */
document.addEventListener('click', (e)=>{
  const t = e.target.closest('.toggle');
  if(t && !t.dataset.userIdx){ t.classList.toggle('on'); t.classList.toggle('off'); }
});

/* ---------- global search ---------- */
const SECTION_TABLE = {
  users:'usersBody', translations:'translationsBody', quizzes:'quizzesBody',
  library:'libraryBody', dataset:'datasetBody', model:'modelBody', feedback:'issuesBody',
};
function handleSearch(query){
  const q = query.trim().toLowerCase();
  const activeSection = document.querySelector('section.active');
  if(!activeSection) return;
  const key = activeSection.id.replace('sec-','');
  const bodyId = SECTION_TABLE[key];
  if(!bodyId) return; // dashboard, reports, settings have no searchable table
  document.querySelectorAll(`#${bodyId} tr`).forEach(row=>{
    row.style.display = row.textContent.toLowerCase().includes(q) ? '' : 'none';
  });
}
/* re-run current search whenever the user switches sections, so results stay filtered */
const _switchSection = switchSection;
switchSection = function(key){
  _switchSection(key);
  const box = document.getElementById('globalSearch');
  if(box && box.value) handleSearch(box.value);
};

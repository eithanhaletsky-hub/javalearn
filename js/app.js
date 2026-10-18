(function () {
  "use strict";

  const UNITS = window.UNITS;
  const ALL_LESSONS = [];
  UNITS.forEach(u => u.lessons.forEach(l => { l.unit = u; ALL_LESSONS.push(l); }));
  const lessonById = id => ALL_LESSONS.find(l => l.id === id);

  const RANKS = [
    { xp: 0, name: "מתחיל", icon: "🥚" },
    { xp: 100, name: "חניך", icon: "🐣" },
    { xp: 300, name: "מתכנת", icon: "💻" },
    { xp: 700, name: "מהנדס", icon: "⚙️" },
    { xp: 1300, name: "ארכיטקט", icon: "🏗️" },
    { xp: 2200, name: "אשף Java", icon: "🧙" }
  ];

  // ---------- storage (localStorage עטוף ב-try/catch) ----------
  const STORE_KEY = "javalearn-progress-v1";
  const defaultProgress = () => ({ xp: 0, done: {}, stars: {}, best: {}, challengeHigh: 0 });
  let progress = defaultProgress();
  try {
    const saved = JSON.parse(localStorage.getItem(STORE_KEY));
    if (saved) progress = Object.assign(defaultProgress(), saved);
  } catch (e) { /* storage unavailable */ }
  function save() {
    try { localStorage.setItem(STORE_KEY, JSON.stringify(progress)); } catch (e) { }
    renderXp();
  }
  function addXp(n) { progress.xp += n; save(); }

  function rankOf(xp) {
    let r = RANKS[0];
    for (const k of RANKS) if (xp >= k.xp) r = k;
    return r;
  }

  // ---------- theme ----------
  try {
    const t = localStorage.getItem("javalearn-theme");
    if (t) document.documentElement.dataset.theme = t;
  } catch (e) { }
  document.getElementById("themeBtn").onclick = () => {
    const isDark = document.documentElement.dataset.theme
      ? document.documentElement.dataset.theme === "dark"
      : matchMedia("(prefers-color-scheme: dark)").matches;
    const next = isDark ? "light" : "dark";
    document.documentElement.dataset.theme = next;
    try { localStorage.setItem("javalearn-theme", next); } catch (e) { }
  };

  // ---------- helpers ----------
  const app = document.getElementById("app");
  const esc = s => String(s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const shuffle = arr => { const a = arr.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
  function el(html) { const d = document.createElement("div"); d.innerHTML = html.trim(); return d.firstElementChild; }
  function toast(msg) {
    const t = document.getElementById("toast");
    t.textContent = msg; t.classList.add("show");
    clearTimeout(toast._t); toast._t = setTimeout(() => t.classList.remove("show"), 2200);
  }

  const KEYWORDS = new Set("public private protected static void int double char boolean long float byte short new return if else for while do switch case break default class extends implements interface this super null true false import final continue instanceof abstract".split(" "));
  function highlight(code) {
    const re = /(\/\/[^\n]*|\/\*[\s\S]*?\*\/)|("(?:[^"\\\n]|\\.)*")|('(?:[^'\\\n]|\\.)*')|(____)|\b(\d+(?:\.\d+)?)\b|\b([A-Za-z_]\w*)\b/g;
    let out = "", last = 0, m;
    while ((m = re.exec(code))) {
      out += esc(code.slice(last, m.index));
      const [tok, com, str, chr, blank, num, word] = m;
      if (com) out += `<span class="co">${esc(tok)}</span>`;
      else if (str || chr) out += `<span class="st">${esc(tok)}</span>`;
      else if (blank) out += `<span class="blank">____</span>`;
      else if (num) out += `<span class="nu">${tok}</span>`;
      else if (KEYWORDS.has(word)) out += `<span class="kw">${tok}</span>`;
      else if (/^[A-Z]/.test(word)) out += `<span class="ty">${tok}</span>`;
      else out += esc(tok);
      last = re.lastIndex;
    }
    return out + esc(code.slice(last));
  }
  function codeBlock(code, copy = true) {
    return `<pre class="code">${copy ? '<button class="copy-btn">העתק</button>' : ""}${highlight(code)}</pre>`;
  }
  app.addEventListener("click", e => {
    const b = e.target.closest(".copy-btn");
    if (!b) return;
    const text = b.parentElement.innerText.replace(/^העתק\s*/, "");
    navigator.clipboard && navigator.clipboard.writeText(text).then(() => toast("הקוד הועתק ✓"), () => { });
  });

  // ---------- answer checking ----------
  const normOutput = s => String(s).replace(/\r/g, "").split("\n").map(l => l.replace(/[ \t]+/g, " ").trim()).join("\n").trim();
  const normCode = s => String(s).replace(/\s+/g, "").replace(/;$/, "");

  /**
   * מציג שאלה בתוך container. onDone(correct) נקרא פעם אחת אחרי שהמשתמש עונה.
   * opts.shuffle – לערבב תשובות; opts.num – כותרת.
   */
  function renderQuestion(q, container, onDone, opts = {}) {
    const box = el(`<div class="question card">
      ${opts.num ? `<div class="q-num">${opts.num}</div>` : ""}
      <div class="q-text">${q.q}</div>
      ${q.code ? codeBlock(q.code, false) : ""}
      <div class="q-body"></div>
      <div class="feedback"></div>
    </div>`);
    container.appendChild(box);
    const body = box.querySelector(".q-body");
    const fb = box.querySelector(".feedback");
    let answered = false;

    function finish(correct, correctText) {
      if (answered) return;
      answered = true;
      fb.className = "feedback show " + (correct ? "ok" : "bad");
      fb.innerHTML = `<b>${correct ? "✓ נכון!" : "✗ לא נכון"}</b>` +
        (!correct && correctText != null ? `<div class="explain">התשובה הנכונה:</div><pre>${esc(correctText)}</pre>` : "") +
        (q.explain ? `<div class="explain">${q.explain}</div>` : "");
      if (!correct) box.classList.add("shake");
      onDone && onDone(correct);
    }
    box.finish = finish;  // מאפשר לטיימר של המשחק לסיים שאלה

    if (q.type === "mc") {
      const order = opts.shuffle ? shuffle(q.options.map((_, i) => i)) : q.options.map((_, i) => i);
      const wrap = el(`<div class="options"></div>`);
      order.forEach(i => {
        const b = el(`<button class="option${q.ltr ? " ltr" : ""}">${q.ltr ? esc(q.options[i]) : q.options[i]}</button>`);
        b.onclick = () => {
          if (answered) return;
          wrap.querySelectorAll(".option").forEach(o => o.disabled = true);
          const ok = i === q.answer;
          b.classList.add(ok ? "correct" : "wrong");
          wrap.children[order.indexOf(q.answer)].classList.add("correct");
          finish(ok, null);
        };
        wrap.appendChild(b);
      });
      body.appendChild(wrap);
      box.reveal = () => {
        wrap.querySelectorAll(".option").forEach(o => o.disabled = true);
        wrap.children[order.indexOf(q.answer)].classList.add("correct");
      };
    } else {
      const multi = q.type === "output";
      const row = el(`<div class="answer-row">
        ${multi ? `<textarea rows="2" placeholder="כתוב כאן את הפלט..." spellcheck="false"></textarea>` : `<input type="text" placeholder="השלמה..." spellcheck="false" autocomplete="off">`}
        <button class="btn">בדוק</button>
      </div>`);
      body.appendChild(row);
      if (multi) body.appendChild(el(`<div class="hint">כל שורת פלט בשורה נפרדת (Enter). Ctrl+Enter לבדיקה.</div>`));
      const input = row.querySelector("textarea, input");
      const btn = row.querySelector("button");
      const check = () => {
        if (answered || !input.value.trim()) return;
        let ok;
        if (multi) ok = normOutput(input.value) === normOutput(q.answer);
        else ok = q.answer.some(a => normCode(a) === normCode(input.value));
        input.disabled = btn.disabled = true;
        input.style.borderColor = ok ? "var(--ok)" : "var(--bad)";
        finish(ok, multi ? q.answer : q.answer[0]);
      };
      btn.onclick = check;
      input.addEventListener("keydown", e => {
        if (e.key === "Enter" && (!multi || e.ctrlKey || e.metaKey)) { e.preventDefault(); check(); }
      });
      box.reveal = () => { input.disabled = btn.disabled = true; };
      if (opts.autofocus) setTimeout(() => input.focus(), 50);
    }
    return box;
  }

  // ---------- sidebar & header ----------
  function renderXp() {
    const r = rankOf(progress.xp);
    document.getElementById("xpPill").textContent = `${r.icon} ${r.name} · ${progress.xp} XP`;
  }
  function renderSidebar(activeId) {
    const sb = document.getElementById("sidebar");
    let html = `<div class="mobile-nav"><h4>ניווט</h4>
      <a href="#/">🏠 בית</a><a href="#/game">🎮 משחק</a><a href="#/challenge">⚡ אתגר</a><a href="#/cheatsheet">📋 דף עזר</a></div>`;
    UNITS.forEach(u => {
      html += `<h4>${u.icon} ${u.title}</h4>`;
      u.lessons.forEach(l => {
        html += `<a href="#/lesson/${l.id}" class="${l.id === activeId ? "active" : ""}"><span class="check">${progress.done[l.id] ? "✓" : "•"}</span>${l.title}</a>`;
      });
    });
    sb.innerHTML = html;
  }
  document.getElementById("menuBtn").onclick = () => document.getElementById("sidebar").classList.toggle("open");
  document.getElementById("sidebar").addEventListener("click", e => {
    if (e.target.closest("a")) document.getElementById("sidebar").classList.remove("open");
  });

  // ---------- pages ----------
  function unitProgress(u) {
    const d = u.lessons.filter(l => progress.done[l.id]).length;
    return { d, n: u.lessons.length, pct: Math.round(100 * d / u.lessons.length) };
  }

  function pageHome() {
    const totalDone = ALL_LESSONS.filter(l => progress.done[l.id]).length;
    const totalStars = Object.values(progress.stars).reduce((a, b) => a + b, 0);
    const r = rankOf(progress.xp);
    const nextRank = RANKS.find(k => k.xp > progress.xp);
    const firstUndone = ALL_LESSONS.find(l => !progress.done[l.id]) || ALL_LESSONS[0];
    app.innerHTML = `
      <section class="hero">
        <h1>לומדים Java למדעי המחשב ☕</h1>
        <p>שיעורים, תרגול ומשחק לפי תוכנית הלימודים של משרד החינוך – יסודות, עיצוב תוכנה ומבני נתונים (5 יח"ל).</p>
        <div class="hero-actions">
          <a class="btn" href="#/lesson/${firstUndone.id}">${totalDone ? "המשך ללמוד" : "התחל ללמוד"} ←</a>
          <a class="btn ghost" href="#/game">🎮 למשחק</a>
        </div>
      </section>
      <div class="stats">
        <div class="card stat"><b>${totalDone}/${ALL_LESSONS.length}</b>שיעורים הושלמו</div>
        <div class="card stat"><b>${totalStars}⭐</b>כוכבים במשחק</div>
        <div class="card stat"><b>${r.icon} ${r.name}</b>${nextRank ? `עוד ${nextRank.xp - progress.xp} XP ל${nextRank.name}` : "הדרגה הגבוהה ביותר!"}</div>
        <div class="card stat"><b>${progress.challengeHigh}</b>שיא במצב אתגר</div>
      </div>
      <h2>יחידות הלימוד</h2>
      <div class="grid">
        ${UNITS.map(u => {
          const p = unitProgress(u);
          return `<div class="card unit-card">
            <div class="icon">${u.icon}</div>
            <h3>${u.title}</h3>
            <div class="muted">${u.desc}</div>
            <ul>${u.lessons.map(l => `<li>${progress.done[l.id] ? "✓ " : ""}${l.title}</li>`).join("")}</ul>
            <div class="progress"><div style="width:${p.pct}%"></div></div>
            <div class="muted" style="font-size:.85rem">${p.d} מתוך ${p.n} שיעורים</div>
            <a class="btn small" href="#/lesson/${u.lessons[0].id}">לשיעורים</a>
          </div>`;
        }).join("")}
      </div>
      <p class="muted" style="margin-top:28px;font-size:.9rem">💡 טיפ: את הקוד אפשר להעתיק ולהריץ ב-IDE (כמו IntelliJ / Eclipse / BlueJ) או בקומפיילר אונליין. ההתקדמות נשמרת בדפדפן שלך.</p>`;
    renderSidebar(null);
  }

  function pageLesson(id) {
    const l = lessonById(id);
    if (!l) return pageHome();
    const idx = ALL_LESSONS.indexOf(l);
    const prev = ALL_LESSONS[idx - 1], next = ALL_LESSONS[idx + 1];
    app.innerHTML = `
      <div class="lesson-head">
        <span class="tag">${l.unit.icon} ${l.unit.title} · שיעור ${l.unit.lessons.indexOf(l) + 1}</span>
        <h1>${l.title}</h1>
        <p class="muted">${l.intro}</p>
      </div>
      ${l.sections.map(s => `<div class="section card">
        <h2>${s.h}</h2>
        ${s.html || ""}
        ${s.code ? codeBlock(s.code) : ""}
      </div>`).join("")}
      <h2 style="margin-top:34px">✏️ תרגול</h2>
      <p class="muted">ענה על כל השאלות. כדי לסמן את השיעור כהושלם צריך לפחות 70% נכון.</p>
      <div id="qs"></div>
      <div class="card" id="lessonScore" style="display:none"></div>
      <div class="lesson-nav">
        ${prev ? `<a class="btn secondary" href="#/lesson/${prev.id}">→ ${prev.title}</a>` : "<span></span>"}
        <a class="btn secondary" href="#/game/play/${l.id}">🎮 שחק בשלב הזה</a>
        ${next ? `<a class="btn" href="#/lesson/${next.id}">${next.title} ←</a>` : `<a class="btn" href="#/game">לסיום – למשחק! ←</a>`}
      </div>`;
    const qs = app.querySelector("#qs");
    let answered = 0, correct = 0;
    l.questions.forEach((q, i) => {
      renderQuestion(q, qs, ok => {
        answered++; if (ok) { correct++; addXp(5); }
        if (answered === l.questions.length) {
          const pct = Math.round(100 * correct / l.questions.length);
          const passed = pct >= 70;
          const first = passed && !progress.done[l.id];
          if (passed) progress.done[l.id] = true;
          progress.best[l.id] = Math.max(progress.best[l.id] || 0, pct);
          if (first) progress.xp += 30;
          save();
          renderSidebar(l.id);
          const sc = app.querySelector("#lessonScore");
          sc.style.display = "block";
          sc.innerHTML = `<h3 style="margin:0 0 6px">${passed ? "🎉 כל הכבוד!" : "💪 כמעט!"} ${correct}/${l.questions.length} (${pct}%)</h3>
            <p style="margin:0 0 10px">${passed ? (first ? "השיעור סומן כהושלם, וקיבלת בונוס 30 XP." : "השיעור כבר הושלם בעבר.") : "צריך 70% כדי להשלים. קרא שוב את ההסבר ונסה שוב."}</p>
            <button class="btn small secondary" id="retry">נסה שוב</button>`;
          sc.querySelector("#retry").onclick = () => pageLesson(id);
          sc.classList.add("pop");
        }
      }, { num: `שאלה ${i + 1} מתוך ${l.questions.length}` });
    });
    renderSidebar(l.id);
    window.scrollTo(0, 0);
  }

  function starsHtml(n) {
    return [1, 2, 3].map(i => `<span class="${i <= n ? "star-on" : "star-off"}">★</span>`).join("");
  }
  function isUnlocked(l) {
    const i = l.unit.lessons.indexOf(l);
    return i === 0 || (progress.stars[l.unit.lessons[i - 1].id] || 0) >= 1 || progress.done[l.unit.lessons[i - 1].id];
  }

  function pageGameMap() {
    app.innerHTML = `
      <div class="lesson-head">
        <h1>🎮 מסע ה-Java</h1>
        <p class="muted">כל שיעור הוא שלב. בכל שלב 5 שאלות, 3 לבבות ו-45 שניות לשאלה. תשובות מהירות ורצף נכונות = יותר נקודות. השג לפחות כוכב אחד כדי לפתוח את השלב הבא.</p>
      </div>
      ${UNITS.map(u => `<div class="world">
        <h2>${u.icon} ${u.title}</h2>
        <div class="levels">
          ${u.lessons.map((l, i) => {
            const open = isUnlocked(l);
            return `<button class="level${open ? "" : " locked"}" data-id="${l.id}" ${open ? "" : 'title="השלם את השלב הקודם"'}>
              <div class="lv-num">${open ? "שלב " + (i + 1) : "🔒 נעול"}</div>
              <div class="lv-name">${l.title}</div>
              <div class="stars">${starsHtml(progress.stars[l.id] || 0)}</div>
            </button>`;
          }).join("")}
        </div>
      </div>`).join("")}
      <div class="card" style="text-align:center">
        <h3 style="margin-top:0">⚡ מצב אתגר</h3>
        <p class="muted">שאלות מכל הנושאים, עד שנגמרים הלבבות. השיא שלך: <b>${progress.challengeHigh}</b></p>
        <a class="btn" href="#/challenge">התחל אתגר</a>
      </div>`;
    app.querySelectorAll(".level").forEach(b => b.onclick = () => {
      const l = lessonById(b.dataset.id);
      if (!isUnlocked(l)) return toast("🔒 השג כוכב בשלב הקודם כדי לפתוח");
      location.hash = "#/game/play/" + l.id;
    });
    renderSidebar(null);
  }

  // ---------- game engine ----------
  let activeTimer = null;
  function stopTimer() { if (activeTimer) { clearInterval(activeTimer); activeTimer = null; } }

  function playGame({ title, pool, count, lives, onEnd }) {
    const qs = count ? shuffle(pool).slice(0, count) : null;
    let i = 0, score = 0, streak = 0, correct = 0, hearts = lives;
    const TIME = 45;
    let bag = [];
    const nextQuestion = () => {
      if (qs) return qs[i];
      if (!bag.length) bag = shuffle(pool);
      return bag.pop();
    };

    function draw() {
      stopTimer();
      if (hearts <= 0 || (qs && i >= qs.length)) return onEnd({ score, correct, total: qs ? qs.length : i, hearts });
      const q = nextQuestion();
      app.innerHTML = `
        <div class="play-head">
          <div><b>${title}</b> <span class="muted">· ${qs ? `שאלה ${i + 1}/${qs.length}` : `שאלה ${i + 1}`}</span></div>
          <div class="hearts">${"❤️".repeat(hearts)}${"🖤".repeat(Math.max(0, lives - hearts))}</div>
          <div><span class="streak">${streak >= 2 ? `🔥 x${streak}` : ""}</span> <span class="score">${score}</span> נק'</div>
        </div>
        <div class="timer"><div style="width:100%"></div></div>
        <div id="gq"></div>
        <div style="display:flex;justify-content:space-between;gap:10px;margin-top:6px">
          <a class="btn secondary small" href="#/game">יציאה</a>
          <button class="btn" id="nextBtn" style="display:none">הבא ←</button>
        </div>`;
      const timerBar = app.querySelector(".timer");
      let left = TIME;
      const box = renderQuestion(q, app.querySelector("#gq"), ok => {
        stopTimer();
        if (ok) {
          streak++; correct++;
          const gained = 10 + Math.round(left / 3) + Math.min(streak - 1, 5) * 2;
          score += gained;
          toast(`+${gained} נקודות`);
        } else {
          streak = 0; hearts--;
        }
        i++;
        const nb = app.querySelector("#nextBtn");
        nb.style.display = "inline-flex";
        nb.textContent = hearts <= 0 || (qs && i >= qs.length) ? "לתוצאות ←" : "הבא ←";
        nb.onclick = draw;
        nb.focus();
      }, { shuffle: true, autofocus: true });
      activeTimer = setInterval(() => {
        left--;
        timerBar.firstElementChild.style.width = (100 * left / TIME) + "%";
        timerBar.classList.toggle("low", left <= 10);
        if (left <= 0) {
          stopTimer();
          box.reveal && box.reveal();
          box.finish(false, q.type === "mc" ? q.options[q.answer] : (q.type === "output" ? q.answer : q.answer[0]));
          toast("⏰ נגמר הזמן");
        }
      }, 1000);
    }
    draw();
  }

  function pageGamePlay(id) {
    const l = lessonById(id);
    if (!l) return pageGameMap();
    if (!isUnlocked(l)) { toast("🔒 השלב נעול"); return pageGameMap(); }
    renderSidebar(null);
    playGame({
      title: `${l.unit.icon} ${l.title}`, pool: l.questions, count: Math.min(5, l.questions.length), lives: 3,
      onEnd: ({ score, correct, total, hearts }) => {
        const stars = hearts <= 0 ? 0 : correct === total ? 3 : correct >= total - 1 ? 2 : 1;
        const prevStars = progress.stars[l.id] || 0;
        if (stars > prevStars) progress.stars[l.id] = stars;
        progress.xp += score;
        save();
        const idx = l.unit.lessons.indexOf(l);
        const nextL = l.unit.lessons[idx + 1];
        app.innerHTML = `<div class="card result pop">
          <div class="big">${stars === 3 ? "🏆" : stars ? "🎉" : "💔"}</div>
          <h2>${stars ? "השלב הושלם!" : "נגמרו הלבבות"}</h2>
          <div class="stars">${starsHtml(stars)}</div>
          <p>${correct}/${total} תשובות נכונות · <b>${score}</b> נקודות (נוספו ל-XP)</p>
          ${stars > prevStars && prevStars ? "<p>⭐ שיא חדש לשלב!</p>" : ""}
          <div class="actions">
            <button class="btn secondary" id="again">שחק שוב</button>
            ${!stars ? `<a class="btn secondary" href="#/lesson/${l.id}">📖 חזור לשיעור</a>` : ""}
            ${stars && nextL ? `<a class="btn" href="#/game/play/${nextL.id}">לשלב הבא ←</a>` : `<a class="btn" href="#/game">למפה</a>`}
          </div></div>`;
        app.querySelector("#again").onclick = () => pageGamePlay(id);
      }
    });
  }

  function pageChallenge() {
    renderSidebar(null);
    app.innerHTML = `<div class="card result">
      <div class="big">⚡</div>
      <h2>מצב אתגר</h2>
      <p>שאלות אקראיות מכל ${ALL_LESSONS.length} הנושאים. יש לך 3 לבבות – כמה נקודות תצליח לצבור?</p>
      <p class="muted">השיא שלך: <b>${progress.challengeHigh}</b></p>
      <div class="actions"><button class="btn" id="go">יאללה, מתחילים!</button></div>
    </div>`;
    app.querySelector("#go").onclick = () => {
      const pool = ALL_LESSONS.flatMap(l => l.questions);
      playGame({
        title: "⚡ אתגר", pool, count: 0, lives: 3,
        onEnd: ({ score, correct }) => {
          const record = score > progress.challengeHigh;
          if (record) progress.challengeHigh = score;
          progress.xp += score;
          save();
          app.innerHTML = `<div class="card result pop">
            <div class="big">${record ? "🏆" : "🎯"}</div>
            <h2>${record ? "שיא חדש!" : "סוף המשחק"}</h2>
            <p>ענית נכון על <b>${correct}</b> שאלות וצברת <b>${score}</b> נקודות.</p>
            <p class="muted">השיא: ${progress.challengeHigh}</p>
            <div class="actions"><button class="btn" id="again">שוב!</button><a class="btn secondary" href="#/game">למפה</a></div>
          </div>`;
          app.querySelector("#again").onclick = () => { pageChallenge(); app.querySelector("#go").click(); };
        }
      });
    };
  }

  function pageCheatsheet() {
    renderSidebar(null);
    const table = rows => `<div class="table-wrap"><table class="api-table"><tr><th>פעולה</th><th>תיאור</th></tr>${rows.map(r => `<tr><td>${esc(r[0])}</td><td>${r[1]}</td></tr>`).join("")}</table></div>`;
    app.innerHTML = `
      <div class="lesson-head"><h1>📋 דף עזר</h1><p class="muted">סיכום מהיר של התחביר והממשקים – טוב לחזרה לפני מבחן.</p></div>
      <div class="section card"><h2>String</h2>${table([
        ["s.length()", "אורך"], ["s.charAt(i)", "תו במקום i"], ["s.substring(a, b)", "מ-a עד b (לא כולל)"],
        ["s.indexOf(c)", "מקום ראשון, או -1"], ["s.equals(t)", "השוואת תוכן"], ["s.compareTo(t)", "השוואה מילונית"],
        ["s.toUpperCase() / toLowerCase()", "המרת אותיות"]])}</div>
      <div class="section card"><h2>Math</h2>${table([
        ["Math.abs(x)", "ערך מוחלט"], ["Math.sqrt(x)", "שורש ריבועי"], ["Math.pow(a, b)", "חזקה a<sup>b</sup>"],
        ["Math.max(a, b) / Math.min(a, b)", "מקסימום / מינימום"], ["(int)(Math.random() * n)", "מספר אקראי 0 עד n-1"]])}</div>
      <div class="section card"><h2>Node&lt;T&gt; – חוליה</h2>${table([
        ["Node(T value) / Node(T value, Node<T> next)", "בנאים"], ["getValue() / setValue(T v)", "ערך"],
        ["getNext() / setNext(Node<T> n)", "החוליה הבאה"], ["hasNext()", "האם יש חוליה הבאה"]])}</div>
      <div class="section card"><h2>Stack&lt;T&gt; – מחסנית (LIFO)</h2>${table([
        ["push(T x)", "הכנסה לראש"], ["pop()", "הוצאה מהראש"], ["top()", "הצצה לראש"], ["isEmpty()", "האם ריקה"]])}</div>
      <div class="section card"><h2>Queue&lt;T&gt; – תור (FIFO)</h2>${table([
        ["insert(T x)", "הכנסה לסוף"], ["remove()", "הוצאה מהראש"], ["head()", "הצצה לראש"], ["isEmpty()", "האם ריק"]])}</div>
      <div class="section card"><h2>BinNode&lt;T&gt; – צומת בעץ בינארי</h2>${table([
        ["BinNode(T value)", "עלה"], ["BinNode(BinNode<T> l, T value, BinNode<T> r)", "צומת עם ילדים"],
        ["getValue() / setValue(T v)", "ערך"], ["getLeft() / getRight()", "בנים"], ["setLeft(..) / setRight(..)", "שינוי בנים"],
        ["hasLeft() / hasRight()", "האם קיים בן"]])}</div>
      <div class="section card"><h2>תבניות שכדאי לזכור</h2>
        ${codeBlock(`// ספרות של מספר
while (n > 0) { int d = n % 10; n /= 10; }

// מעבר על שרשרת
Node<Integer> p = chain;
while (p != null) { ...; p = p.getNext(); }

// מעבר על מחסנית עם שחזור
Stack<Integer> temp = new Stack<>();
while (!s.isEmpty()) { int x = s.pop(); ...; temp.push(x); }
while (!temp.isEmpty()) s.push(temp.pop());

// רקורסיה על עץ
if (t == null) return 0;
return f(t.getLeft()) + f(t.getRight()) + ...;`)}
      </div>`;
  }

  // ---------- router ----------
  function route() {
    stopTimer();
    const parts = location.hash.replace(/^#\/?/, "").split("/");
    const nav = parts[0] || "home";
    document.querySelectorAll(".topnav a").forEach(a => a.classList.toggle("active", a.dataset.nav === nav));
    if (parts[0] === "lesson") pageLesson(parts[1]);
    else if (parts[0] === "game" && parts[1] === "play") pageGamePlay(parts[2]);
    else if (parts[0] === "game") pageGameMap();
    else if (parts[0] === "challenge") pageChallenge();
    else if (parts[0] === "cheatsheet") pageCheatsheet();
    else pageHome();
    if (parts[0] !== "lesson") window.scrollTo(0, 0);
  }
  window.addEventListener("hashchange", route);
  renderXp();
  route();
})();

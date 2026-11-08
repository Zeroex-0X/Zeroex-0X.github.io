function el(tag, cls, text) {
  const n = document.createElement(tag);
  if (cls) n.className = cls;
  if (text) n.textContent = text;
  return n;
}

function renderRow(item, actionLabel) {
  const li = el("li", "row");
  const main = el("div", "row-main");
  if (item.icon) {
    const img = el("img", "app-icon");
    img.src = item.icon; img.alt = ""; img.width = 68; img.height = 68;
    main.appendChild(img);
  }
  const left = el("div");
  const titleLine = el("div", "title-line");
  titleLine.appendChild(el("h3", "", item.name));
  const ver = el("span", "ver");
  titleLine.appendChild(ver);
  left.appendChild(titleLine);
  left.appendChild(el("p", "muted", item.about));
  const meta = el("p", "muted meta");
  left.appendChild(meta);
  main.appendChild(left);
  li.appendChild(main);

  const links = item.links || (item.link ? [{ label: actionLabel, url: item.link }] : []);
  if (links.length) {
    const box = el("div", "row-actions");
    links.forEach((l, i) => {
      const a = el("a", i === 0 ? "btn" : "btn ghost", l.label);
      a.href = l.url; a.target = "_blank"; a.rel = "noopener";
      a.setAttribute("aria-label", l.label + " - " + item.name);
      box.appendChild(a);
    });
    li.appendChild(box);
  } else if (item.status) {
    li.appendChild(el("span", "pill", item.status));
  }
  li.metaEl = meta;
  li.verEl = ver;
  return li;
}

/* ---- GitHub release stats (version, size, date, downloads) ---- */
async function getReleases(repo) {
  const key = "zx-rel-" + repo;
  try {
    const c = JSON.parse(sessionStorage.getItem(key) || "null");
    if (c && Date.now() - c.t < 10 * 60000) return c.d;
  } catch (e) {}
  const r = await fetch("https://api.github.com/repos/" + repo + "/releases?per_page=100");
  if (!r.ok) throw new Error("github " + r.status);
  const d = (await r.json())
    .filter(x => !x.draft && !x.prerelease)
    .map(x => ({
      tag: x.tag_name, date: x.published_at,
      assets: (x.assets || []).map(a => ({ name: a.name, size: a.size, dl: a.download_count || 0 }))
    }));
  try { sessionStorage.setItem(key, JSON.stringify({ t: Date.now(), d })); } catch (e) {}
  return d;
}

async function showStats(app, metaEl, verEl) {
  const releases = await getReleases(app.repo);
  if (!releases.length) return 0;
  const rel = releases[0];
  let total = 0;
  releases.forEach(r => r.assets.forEach(a => { total += a.dl; }));
  verEl.textContent = "v" + String(rel.tag || "").replace(/^v/i, "");
  const parts = [
    rel.date ? new Date(rel.date).toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" }) : "",
    total > 0 ? total.toLocaleString() + " downloads" : ""
  ];
  metaEl.textContent = parts.filter(Boolean).join(" \u00b7 ");
  return total;
}

const appsList = document.getElementById("apps-list");
const jobs = [];
APPS.forEach(a => {
  const row = renderRow(a, "Get the app");
  appsList.appendChild(row);
  if (a.repo) jobs.push(showStats(a, row.metaEl, row.verEl).catch(() => 0));
});
Promise.all(jobs).then(list => {
  const sum = list.reduce((x, y) => x + y, 0);
  if (sum > 0) document.getElementById("total").textContent = sum.toLocaleString() + " downloads in total";
});

const projectsList = document.getElementById("projects-list");
if (PROJECTS.length) {
  PROJECTS.forEach(p => projectsList.appendChild(renderRow(p, "View project")));
} else {
  projectsList.replaceWith(Object.assign(el("p", "empty muted"), {
    innerHTML: 'Projects will be listed here soon. Until then, the source for everything is on <a href="https://github.com/Zeroex-0X" target="_blank" rel="noopener">GitHub</a>.'
  }));
}

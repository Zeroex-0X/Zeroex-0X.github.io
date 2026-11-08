const box = document.getElementById("methods");
METHODS.forEach(m => {
  const row = document.createElement("div");
  row.className = "method";
  const left = document.createElement("div");
  const h = document.createElement("h2"); h.textContent = m.name;
  const p = document.createElement("p"); p.textContent = m.about;
  left.append(h, p);
  const a = document.createElement("a");
  a.className = "btn"; a.href = m.url; a.target = "_blank"; a.rel = "noopener";
  a.textContent = m.cta;
  a.setAttribute("aria-label", m.cta + " (opens in a new tab)");
  row.append(left, a);
  box.appendChild(row);
});

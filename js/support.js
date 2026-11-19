const box = document.getElementById("methods");
METHODS.forEach((m, i) => {
  const li = document.createElement("li");
  li.className = "row" + (i === 0 ? " featured" : "");
  const left = document.createElement("div");
  const h = document.createElement("h3"); h.textContent = m.name;
  const p = document.createElement("p"); p.className = "muted"; p.textContent = m.about;
  left.append(h, p);
  if (m.handle) {
    const hl = document.createElement("p"); hl.className = "handle-line"; hl.textContent = m.handle;
    left.appendChild(hl);
  }
  const a = document.createElement("a");
  a.className = i === 0 ? "btn" : "btn ghost";
  a.href = m.url; a.target = "_blank"; a.rel = "noopener";
  a.textContent = m.cta;
  a.setAttribute("aria-label", m.cta + " (opens in a new tab)");
  li.append(left, a);
  box.appendChild(li);
});

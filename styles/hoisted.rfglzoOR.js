const z = "astro:before-preparation", J = "astro:after-preparation", Q = "astro:before-swap", Z = "astro:after-swap", ee = e => document.dispatchEvent(new Event(e)); class $ extends Event { from; to; direction; navigationType; sourceElement; info; newDocument; constructor(t, n, r, o, a, l, h, s, d) { super(t, n), this.from = r, this.to = o, this.direction = a, this.navigationType = l, this.sourceElement = h, this.info = s, this.newDocument = d, Object.defineProperties(this, { from: { enumerable: !0 }, to: { enumerable: !0, writable: !0 }, direction: { enumerable: !0, writable: !0 }, navigationType: { enumerable: !0 }, sourceElement: { enumerable: !0 }, info: { enumerable: !0 }, newDocument: { enumerable: !0, writable: !0 } }) } } class te extends $ { formData; loader; constructor(t, n, r, o, a, l, h, s, d) { super(z, { cancelable: !0 }, t, n, r, o, a, l, h), this.formData = s, this.loader = d.bind(this, this), Object.defineProperties(this, { formData: { enumerable: !0 }, loader: { enumerable: !0, writable: !0 } }) } } class ne extends $ { direction; viewTransition; swap; constructor(t, n, r) { super(Q, void 0, t.from, t.to, t.direction, t.navigationType, t.sourceElement, t.info, t.newDocument), this.direction = t.direction, this.viewTransition = n, this.swap = r.bind(this, this), Object.defineProperties(this, { direction: { enumerable: !0 }, viewTransition: { enumerable: !0 }, swap: { enumerable: !0, writable: !0 } }) } } async function re(e, t, n, r, o, a, l, h) { const s = new te(e, t, n, r, o, a, window.document, l, h); return document.dispatchEvent(s) && (await s.loader(), s.defaultPrevented || (ee(J), s.navigationType !== "traverse" && D({ scrollX, scrollY }))), s } async function oe(e, t, n) { const r = new ne(e, t, n); return document.dispatchEvent(r), r.swap(), r } const D = e => { history.state && (history.scrollRestoration = "manual", history.replaceState({ ...history.state, ...e }, "")) }, R = !!document.startViewTransition, x = () => !!document.querySelector('[name="astro-view-transitions-enabled"]'), F = (e, t) => e.pathname === t.pathname && e.search === t.search; let A, y, T = !1, _; const q = e => document.dispatchEvent(new Event(e)), C = () => q("astro:page-load"), ie = () => { let e = document.createElement("div"); e.setAttribute("aria-live", "assertive"), e.setAttribute("aria-atomic", "true"), e.className = "astro-route-announcer", document.body.append(e), setTimeout(() => { let t = document.title || document.querySelector("h1")?.textContent || location.pathname; e.textContent = t }, 60) }, w = "data-astro-transition-persist", U = "data-astro-transition", V = "data-astro-transition-fallback"; let P, g = 0; history.state ? (g = history.state.index, scrollTo({ left: history.state.scrollX, top: history.state.scrollY })) : x() && (history.replaceState({ index: g, scrollX, scrollY }, ""), history.scrollRestoration = "manual"); const se = (e, t) => { let n = !1, r = !1; return (...o) => { if (n) { r = !0; return } e(...o), n = !0, setTimeout(() => { r && (r = !1, e(...o)), n = !1 }, t) } }; async function ae(e, t) { try { const n = await fetch(e, t), r = n.headers.get("content-type")?.replace(/;.*$/, ""); return r !== "text/html" && r !== "application/xhtml+xml" ? null : { html: await n.text(), redirected: n.redirected ? n.url : void 0, mediaType: r } } catch { return null } } function W() { const e = document.querySelector('[name="astro-view-transitions-fallback"]'); return e ? e.getAttribute("content") : "animate" } function ce() { let e = Promise.resolve(); for (const t of Array.from(document.scripts)) { if (t.dataset.astroExec === "") continue; const n = document.createElement("script"); n.innerHTML = t.innerHTML; for (const r of t.attributes) { if (r.name === "src") { const o = new Promise(a => { n.onload = a }); e = e.then(() => o) } n.setAttribute(r.name, r.value) } n.dataset.astroExec = "", t.replaceWith(n) } return e } const X = (e, t, n, r) => { const o = F(t, e); let a = !1; if (e.href !== location.href && !r) if (n.history === "replace") { const l = history.state; history.replaceState({ ...n.state, index: l.index, scrollX: l.scrollX, scrollY: l.scrollY }, "", e.href) } else history.pushState({ ...n.state, index: ++g, scrollX: 0, scrollY: 0 }, "", e.href); A = e, o || (scrollTo({ left: 0, top: 0, behavior: "instant" }), a = !0), r ? scrollTo(r.scrollX, r.scrollY) : (e.hash ? (history.scrollRestoration = "auto", location.href = e.href) : a || scrollTo({ left: 0, top: 0, behavior: "instant" }), history.scrollRestoration = "manual") }; function le(e) { const t = []; for (const n of e.querySelectorAll("head link[rel=stylesheet]")) if (!document.querySelector(`[${w}="${n.getAttribute(w)}"], link[rel=stylesheet][href="${n.getAttribute("href")}"]`)) { const r = document.createElement("link"); r.setAttribute("rel", "preload"), r.setAttribute("as", "style"), r.setAttribute("href", n.getAttribute("href")), t.push(new Promise(o => { ["load", "error"].forEach(a => r.addEventListener(a, o)), document.head.append(r) })) } return t } async function I(e, t, n, r) { const o = (i, u) => { const m = i.getAttribute(w), p = m && u.head.querySelector(`[${w}="${m}"]`); if (p) return p; if (i.matches("link[rel=stylesheet]")) { const b = i.getAttribute("href"); return u.head.querySelector(`link[rel=stylesheet][href="${b}"]`) } return null }, a = () => { const i = document.activeElement; if (i?.closest(`[${w}]`)) { if (i instanceof HTMLInputElement || i instanceof HTMLTextAreaElement) { const u = i.selectionStart, m = i.selectionEnd; return { activeElement: i, start: u, end: m } } return { activeElement: i } } else return { activeElement: null } }, l = ({ activeElement: i, start: u, end: m }) => { i && (i.focus(), (i instanceof HTMLInputElement || i instanceof HTMLTextAreaElement) && (i.selectionStart = u, i.selectionEnd = m)) }, h = i => { const u = document.documentElement, m = [...u.attributes].filter(({ name: c }) => (u.removeAttribute(c), c.startsWith("data-astro-")));[...i.newDocument.documentElement.attributes, ...m].forEach(({ name: c, value: f }) => u.setAttribute(c, f)); for (const c of document.scripts) for (const f of i.newDocument.scripts) if (!c.src && c.textContent === f.textContent || c.src && c.type === f.type && c.src === f.src) { f.dataset.astroExec = ""; break } for (const c of Array.from(document.head.children)) { const f = o(c, i.newDocument); f ? f.remove() : c.remove() } document.head.append(...i.newDocument.head.children); const p = document.body, b = a(); document.body.replaceWith(i.newDocument.body); for (const c of p.querySelectorAll(`[${w}]`)) { const f = c.getAttribute(w), S = document.querySelector(`[${w}="${f}"]`); S && S.replaceWith(c) } l(b) }; async function s(i) { function u(c) { const f = c.effect; return !f || !(f instanceof KeyframeEffect) || !f.target ? !1 : window.getComputedStyle(f.target, f.pseudoElement).animationIterationCount === "infinite" } const m = document.getAnimations(); document.documentElement.setAttribute(V, i); const b = document.getAnimations().filter(c => !m.includes(c) && !u(c)); return Promise.all(b.map(c => c.finished)) } if (!T) document.documentElement.setAttribute(U, e.direction), r === "animate" && await s("old"); else throw new DOMException("Transition was skipped"); const d = await oe(e, y, h); X(d.to, d.from, t, n), q(Z), r === "animate" && !T && s("new").then(() => _()) } async function Y(e, t, n, r, o) { if (!x() || location.origin !== n.origin) { location.href = n.href; return } const a = o ? "traverse" : r.history === "replace" ? "replace" : "push"; if (a !== "traverse" && D({ scrollX, scrollY }), F(t, n) && n.hash) { X(n, t, r, o); return } const l = await re(t, n, e, a, r.sourceElement, r.info, r.formData, h); if (l.defaultPrevented) { location.href = n.href; return } async function h(s) { const d = s.to.href, i = {}; s.formData && (i.method = "POST", i.body = s.formData); const u = await ae(d, i); if (u === null) { s.preventDefault(); return } if (u.redirected && (s.to = new URL(u.redirected)), P ??= new DOMParser, s.newDocument = P.parseFromString(u.html, u.mediaType), s.newDocument.querySelectorAll("noscript").forEach(p => p.remove()), !s.newDocument.querySelector('[name="astro-view-transitions-enabled"]') && !s.formData) { s.preventDefault(); return } const m = le(s.newDocument); m.length && await Promise.all(m) } if (T = !1, R) y = document.startViewTransition(async () => await I(l, r, o)); else { const s = (async () => { await new Promise(d => setTimeout(d)), await I(l, r, o, W()) })(); y = { updateCallbackDone: s, ready: s, finished: new Promise(d => _ = d), skipTransition: () => { T = !0 } } } y.ready.then(async () => { await ce(), C(), ie() }), y.finished.then(() => { document.documentElement.removeAttribute(U), document.documentElement.removeAttribute(V) }), await y.ready } async function O(e, t) { await Y("forward", A, new URL(e, location.href), t ?? {}) } function ue(e) { if (!x() && e.state) { location.reload(); return } if (e.state === null) return; const t = history.state, n = t.index, r = n > g ? "forward" : "back"; g = n, Y(r, A, new URL(location.href), {}, t) } const M = () => { D({ scrollX, scrollY }) }; { (R || W() !== "none") && (A = new URL(location.href), addEventListener("popstate", ue), addEventListener("load", C), "onscrollend" in window ? addEventListener("scrollend", M) : addEventListener("scroll", se(M, 350), { passive: !0 })); for (const e of document.scripts) e.dataset.astroExec = "" } const B = new Set, v = new WeakSet; let L, K, H = !1; function fe(e) { H || (H = !0, L ??= e?.prefetchAll ?? !1, K ??= e?.defaultStrategy ?? "hover", de(), me(), he()) } function de() { for (const e of ["touchstart", "mousedown"]) document.body.addEventListener(e, t => { E(t.target, "tap") && k(t.target.href, { with: "fetch", ignoreSlowConnection: !0 }) }, { passive: !0 }) } function me() { let e; document.body.addEventListener("focusin", r => { E(r.target, "hover") && t(r) }, { passive: !0 }), document.body.addEventListener("focusout", n, { passive: !0 }), G(() => { for (const r of document.getElementsByTagName("a")) v.has(r) || E(r, "hover") && (v.add(r), r.addEventListener("mouseenter", t, { passive: !0 }), r.addEventListener("mouseleave", n, { passive: !0 })) }); function t(r) { const o = r.target.href; e && clearTimeout(e), e = setTimeout(() => { k(o, { with: "fetch" }) }, 80) } function n() { e && (clearTimeout(e), e = 0) } } function he() { let e; G(() => { for (const t of document.getElementsByTagName("a")) v.has(t) || E(t, "viewport") && (v.add(t), e ??= we(), e.observe(t)) }) } function we() { const e = new WeakMap; return new IntersectionObserver((t, n) => { for (const r of t) { const o = r.target, a = e.get(o); r.isIntersecting ? (a && clearTimeout(a), e.set(o, setTimeout(() => { n.unobserve(o), e.delete(o), k(o.href, { with: "link" }) }, 300))) : a && (clearTimeout(a), e.delete(o)) } }) } function k(e, t) { const n = t?.ignoreSlowConnection ?? !1; if (!pe(e, n)) return; if (B.add(e), (t?.with ?? "link") === "link") { const o = document.createElement("link"); o.rel = "prefetch", o.setAttribute("href", e), document.head.append(o) } else fetch(e).catch(o => { console.log(`[astro] Failed to prefetch ${e}`), console.error(o) }) } function pe(e, t) { if (!navigator.onLine || !t && j()) return !1; try { const n = new URL(e, location.href); return location.origin === n.origin && (location.pathname !== n.pathname || location.search !== n.search) && !B.has(e) } catch { } return !1 } function E(e, t) { if (e?.tagName !== "A") return !1; const n = e.dataset.astroPrefetch; return n === "false" ? !1 : t === "tap" && (n != null || L) && j() ? !0 : n == null && L || n === "" ? t === K : n === t } function j() { if ("connection" in navigator) { const e = navigator.connection; return e.saveData || /(2|3)g/.test(e.effectiveType) } return !1 } function G(e) { e(); let t = !1; document.addEventListener("astro:page-load", () => { if (!t) { t = !0; return } e() }) } function ye() { const e = document.querySelector('[name="astro-view-transitions-fallback"]'); return e ? e.getAttribute("content") : "animate" } function N(e) { return e.dataset.astroReload !== void 0 } (R || ye() !== "none") && (document.addEventListener("click", e => { let t = e.target; if (t instanceof Element && (t = t.closest("a, area")), !(t instanceof HTMLAnchorElement) && !(t instanceof SVGAElement) && !(t instanceof HTMLAreaElement)) return; const n = t instanceof HTMLElement ? t.target : t.target.baseVal, r = t instanceof HTMLElement ? t.href : t.href.baseVal, o = new URL(r, location.href).origin; N(t) || t.hasAttribute("download") || !t.href || n && n !== "_self" || o !== location.origin || e.button !== 0 || e.metaKey || e.ctrlKey || e.altKey || e.shiftKey || e.defaultPrevented || (e.preventDefault(), O(r, { history: t.dataset.astroHistory === "replace" ? "replace" : "auto", sourceElement: t })) }), document.addEventListener("submit", e => { let t = e.target; if (t.tagName !== "FORM" || N(t)) return; const n = t, r = e.submitter, o = new FormData(n, r); let a = r?.getAttribute("formaction") ?? n.action ?? location.pathname; const l = r?.getAttribute("formmethod") ?? n.method; if (l === "dialog") return; const h = { sourceElement: r ?? n }; if (l === "get") { const s = new URLSearchParams(o), d = new URL(a); d.search = s.toString(), a = d.toString() } else h.formData = o; e.preventDefault(), O(a, h) }), fe({ prefetchAll: !0 }));

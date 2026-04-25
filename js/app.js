/**
 * Adres Sorgulama — Ana Uygulama Mantığı
 * Genişletilebilir yapı: her modül kendi sorumluluğunu üstlenir.
 * İleride: API entegrasyonu için AddressService katmanını güncelle.
 */

/* ════════════════════════════════════════════════════════════
   ADDRESS SERVICE  — Veri erişim katmanı
   İleride gerçek API ile değiştirilecek
   ════════════════════════════════════════════════════════════ */
const AddressService = {
  /**
   * Anlık (senkron) veri döndürme — gerçek API'de await/fetch kullanılacak
   * Neredeyse 0ms gecikmeyle çalışır
   */
  getIller()      { return Promise.resolve(TURKEY_ADDRESS_DATA.iller); },
  getIlceler(ilId){ return Promise.resolve(TURKEY_ADDRESS_DATA.ilceler[ilId] || []); },

  getBucaklar(ilceId) {
    const data = TURKEY_ADDRESS_DATA.bucaklar[ilceId]
      || TURKEY_ADDRESS_DATA.bucaklar["DEFAULT"];
    return Promise.resolve(data);
  },

  getKoyler(bucakId) {
    const data = TURKEY_ADDRESS_DATA.koyler[bucakId]
      || TURKEY_ADDRESS_DATA.koyler["DEFAULT"];
    return Promise.resolve(data);
  },

  getMahalleler(koyId) {
    const data = TURKEY_ADDRESS_DATA.mahalleler[koyId]
      || TURKEY_ADDRESS_DATA.mahalleler["DEFAULT"];
    return Promise.resolve(data);
  },

  getCaddeSokaklar(mahalleId) {
    const data = TURKEY_ADDRESS_DATA.caddeSokaklar[mahalleId]
      || TURKEY_ADDRESS_DATA.caddeSokaklar["DEFAULT"];
    return Promise.resolve(data);
  },

  getDisKapilar(caddeId) {
    const data = TURKEY_ADDRESS_DATA.disKapilar[caddeId]
      || TURKEY_ADDRESS_DATA.disKapilar["DEFAULT"];
    return Promise.resolve(data);
  },

  getIcKapilar() {
    return Promise.resolve(TURKEY_ADDRESS_DATA.icKapilar["DEFAULT"]);
  },

  generateUAVTCode(adres) {
    return TURKEY_ADDRESS_DATA.generateUAVTCode(adres);
  },

  generateBinaCode(adres) {
    return TURKEY_ADDRESS_DATA.generateBinaCode(adres);
  },
};

/* ════════════════════════════════════════════════════════════
   FIELD DEFINITIONS — Sıralı hiyerarşi tanımı
   Yeni alan eklemek için buraya ekle
   ════════════════════════════════════════════════════════════ */
const FIELD_DEFS = [
  {
    id:          "il",
    label:       "İl Seçiniz",
    errorMsg:    "İl boş bırakılamaz",
    loader:      async ()       => AddressService.getIller(),
    dependsOn:   null,
  },
  {
    id:          "ilce",
    label:       "İlçe Seçiniz",
    errorMsg:    "İlçe boş bırakılamaz",
    loader:      async (vals)   => AddressService.getIlceler(vals.il),
    dependsOn:   "il",
  },
  {
    id:          "bucak",
    label:       "Bucak Seçiniz",
    errorMsg:    "Bucak boş bırakılamaz",
    loader:      async (vals)   => AddressService.getBucaklar(vals.ilce),
    dependsOn:   "ilce",
  },
  {
    id:          "koy",
    label:       "Köy / Belde Seçiniz",
    errorMsg:    "Köy / Belde boş bırakılamaz",
    loader:      async (vals)   => AddressService.getKoyler(vals.bucak),
    dependsOn:   "bucak",
  },
  {
    id:          "mahalle",
    label:       "Mahalle Seçiniz",
    errorMsg:    "Mahalle boş bırakılamaz",
    loader:      async (vals)   => AddressService.getMahalleler(vals.koy),
    dependsOn:   "koy",
  },
  {
    id:          "cadde",
    label:       "Cadde / Sokak Seçiniz",
    errorMsg:    "Cadde / Sokak boş bırakılamaz",
    loader:      async (vals)   => AddressService.getCaddeSokaklar(vals.mahalle),
    dependsOn:   "mahalle",
  },
  {
    id:          "disKapi",
    label:       "Dış Kapı No",
    errorMsg:    "Dış Kapı boş bırakılamaz",
    loader:      async (vals)   => AddressService.getDisKapilar(vals.cadde),
    dependsOn:   "cadde",
  },
  {
    id:          "icKapi",
    label:       "İç Kapı No",
    errorMsg:    "İç Kapı boş bırakılamaz",
    loader:      async ()       => AddressService.getIcKapilar(),
    dependsOn:   "disKapi",
  },
];

/* ════════════════════════════════════════════════════════════
   STATE
   ════════════════════════════════════════════════════════════ */
const state = {
  values:   {}, // { il: "34", ilce: "3423", ... }
  labels:   {}, // { il: "İSTANBUL", ilce: "KADIKÖY", ... }
  result:   null,
};

/* ════════════════════════════════════════════════════════════
   DOM HELPERS
   ════════════════════════════════════════════════════════════ */
const $ = (sel, ctx = document) => ctx.querySelector(sel);
const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];

function getWrap(fieldId)  { return $(`#wrap-${fieldId}`); }
function getSelect(fieldId){ return $(`#sel-${fieldId}`); }
function getError(fieldId) { return $(`#err-${fieldId}`); }

/* ════════════════════════════════════════════════════════════
   SELECT POPULATION
   ════════════════════════════════════════════════════════════ */
async function populateField(def, vals) {
  const sel  = getSelect(def.id);
  const wrap = getWrap(def.id);

  // Temizle
  sel.innerHTML = `<option value="">— ${def.label} —</option>`;
  sel.disabled = false;
  wrap.classList.remove("has-value");

  const items = await def.loader(vals);

  items.forEach(item => {
    const opt = document.createElement("option");
    // items can be strings (kapı numaraları) or objects {id, ad}
    if (typeof item === "string") {
      opt.value = item;
      opt.textContent = item;
    } else {
      opt.value = item.id;
      opt.textContent = item.ad;
    }
    sel.appendChild(opt);
  });
}

/* Bir alanı ve sonraki tüm alanları sıfırla */
function resetFrom(fieldIndex) {
  for (let i = fieldIndex; i < FIELD_DEFS.length; i++) {
    const def = FIELD_DEFS[i];
    const sel  = getSelect(def.id);
    const wrap = getWrap(def.id);

    sel.innerHTML = `<option value="">— ${def.label} —</option>`;
    sel.disabled = true;
    wrap.classList.remove("has-value");
    clearError(def.id);

    delete state.values[def.id];
    delete state.labels[def.id];
  }

  // İl hiçbir zaman disabled olmaz
  getSelect("il").disabled = false;
}

/* ════════════════════════════════════════════════════════════
   EVENT: SELECT CHANGE
   ════════════════════════════════════════════════════════════ */
async function onFieldChange(fieldId, selEl) {
  const fieldIndex = FIELD_DEFS.findIndex(d => d.id === fieldId);
  const def        = FIELD_DEFS[fieldIndex];
  const val        = selEl.value;
  const wrap       = getWrap(fieldId);

  // Önceki seçimleri sıfırla
  resetFrom(fieldIndex + 1);

  if (!val) {
    delete state.values[fieldId];
    delete state.labels[fieldId];
    wrap.classList.remove("has-value");
    return;
  }

  // State güncelle
  state.values[fieldId] = val;
  state.labels[fieldId] = selEl.options[selEl.selectedIndex].textContent;
  wrap.classList.add("has-value");
  clearError(fieldId);

  // Sonraki alanı doldur (varsa ve parent dolu ise)
  const nextDef = FIELD_DEFS[fieldIndex + 1];
  if (nextDef) {
    const nextSel = getSelect(nextDef.id);
    nextSel.disabled = false;
    await populateField(nextDef, state.values);
  }
}

/* ════════════════════════════════════════════════════════════
   VALIDATION
   ════════════════════════════════════════════════════════════ */
function showError(fieldId, msg) {
  const sel = getSelect(fieldId);
  const err = getError(fieldId);
  sel.classList.add("error");
  err.textContent = msg;
  err.classList.add("visible");
}

function clearError(fieldId) {
  const sel = getSelect(fieldId);
  const err = getError(fieldId);
  sel.classList.remove("error");
  err.classList.remove("visible");
}

function validateAll() {
  let valid = true;
  FIELD_DEFS.forEach(def => {
    if (!state.values[def.id]) {
      showError(def.id, def.errorMsg);
      valid = false;
    } else {
      clearError(def.id);
    }
  });
  return valid;
}

/* ════════════════════════════════════════════════════════════
   QUERY — Sorgula
   ════════════════════════════════════════════════════════════ */
async function handleQuery() {
  if (!validateAll()) {
    // İlk hata alanına scroll
    const firstErr = FIELD_DEFS.find(d => !state.values[d.id]);
    if (firstErr) getSelect(firstErr.id).scrollIntoView({ behavior: "smooth", block: "center" });
    return;
  }

  const btn = $("#btn-query");
  btn.classList.add("loading");

  // Gerçek API olsa burada await fetch(...) yapılacak
  await new Promise(r => setTimeout(r, 420)); // minimal simülasyon

  const uavtCode = AddressService.generateUAVTCode(state.values);
  const binaCode = AddressService.generateBinaCode(state.values);

  state.result = { uavtCode, binaCode, snapshot: { ...state.values }, snapshotLabels: { ...state.labels } };

  btn.classList.remove("loading");

  renderResult(state.result);
}

/* ════════════════════════════════════════════════════════════
   RESULT RENDER
   ════════════════════════════════════════════════════════════ */
function renderResult(res) {
  const { uavtCode, binaCode, snapshotLabels: L } = res;

  $("#result-uavt-code").textContent  = uavtCode;
  $("#result-bina-code").textContent  = binaCode;

  // Adres metni: Mahalle, Cadde/Sokak, Dış Kapı / İç Kapı, İlçe / İL
  const adresText = [
    L.mahalle,
    L.cadde,
    `No: ${L.disKapi}${L.icKapi ? " / Daire: " + L.icKapi : ""}`,
    `${L.ilce} / ${L.il}`,
  ].filter(Boolean).join(", ");

  $("#result-address-text").textContent = adresText;

  // Formu gizle, sonucu göster
  $("#query-form-area").style.display  = "none";
  $("#result-area").classList.add("visible");
}

/* ════════════════════════════════════════════════════════════
   RE-QUERY — Tekrar Sorgula
   ════════════════════════════════════════════════════════════ */
function handleReQuery() {
  // Sonuç alanını gizle, formu göster
  $("#result-area").classList.remove("visible");
  $("#query-form-area").style.display = "block";

  // State sıfırla
  resetFrom(0);

  // İl'i yeniden doldur (her zaman aktif)
  populateField(FIELD_DEFS[0], {});

  state.result = null;
  state.values = {};
  state.labels = {};
}

/* ════════════════════════════════════════════════════════════
   CLIPBOARD COPY
   ════════════════════════════════════════════════════════════ */
async function handleCopy() {
  const code = $("#result-uavt-code").textContent;
  try {
    await navigator.clipboard.writeText(code);
  } catch {
    // Fallback
    const ta = document.createElement("textarea");
    ta.value = code;
    ta.style.position = "fixed";
    ta.style.opacity  = "0";
    document.body.appendChild(ta);
    ta.select();
    document.execCommand("copy");
    document.body.removeChild(ta);
  }

  const btn = $("#btn-copy");
  btn.classList.add("copied");
  btn.innerHTML = `
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
      <polyline points="20 6 9 17 4 12"/>
    </svg>
    Kopyalandı`;

  showToast("UAVT kodu panoya kopyalandı ✓");

  setTimeout(() => {
    btn.classList.remove("copied");
    btn.innerHTML = `
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <rect x="9" y="9" width="13" height="13" rx="2" ry="2"/>
        <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
      </svg>
      Kodu Kopyala`;
  }, 2500);
}

/* ════════════════════════════════════════════════════════════
   TOAST
   ════════════════════════════════════════════════════════════ */
function showToast(msg) {
  const t = $("#toast");
  t.querySelector(".toast-msg").textContent = msg;
  t.classList.add("show");
  setTimeout(() => t.classList.remove("show"), 2800);
}

/* ════════════════════════════════════════════════════════════
   FAQ ACCORDION
   ════════════════════════════════════════════════════════════ */
function initFAQ() {
  $$(".faq-question").forEach(q => {
    q.addEventListener("click", () => {
      const item = q.closest(".faq-item");
      const isOpen = item.classList.contains("open");

      // Diğerlerini kapat (opsiyonel — tek açık mod)
      $$(".faq-item.open").forEach(i => {
        if (i !== item) i.classList.remove("open");
      });

      item.classList.toggle("open", !isOpen);
    });
  });
}

/* ════════════════════════════════════════════════════════════
   MOBILE NAV HAMBURGER
   ════════════════════════════════════════════════════════════ */
function initHamburger() {
  const btn   = $("#hamburger");
  const links = $("#nav-links");
  if (!btn || !links) return;

  btn.addEventListener("click", () => {
    links.classList.toggle("open");
    btn.setAttribute("aria-expanded", links.classList.contains("open"));
  });

  // Dışarı tıklayınca kapat
  document.addEventListener("click", e => {
    if (!btn.contains(e.target) && !links.contains(e.target)) {
      links.classList.remove("open");
    }
  });
}

/* ════════════════════════════════════════════════════════════
   FLOATING LABEL: select value change izleme
   ════════════════════════════════════════════════════════════ */
function syncFloatingLabel(sel) {
  const wrap = sel.closest(".fl-select-wrap");
  if (!wrap) return;
  if (sel.value) {
    wrap.classList.add("has-value");
  } else {
    wrap.classList.remove("has-value");
  }
}

/* ════════════════════════════════════════════════════════════
   INIT
   ════════════════════════════════════════════════════════════ */
async function init() {
  // İl dropdown'ı her zaman dolu olmalı
  await populateField(FIELD_DEFS[0], {});

  // İl hariç diğerleri disabled başlar
  FIELD_DEFS.slice(1).forEach(def => {
    getSelect(def.id).disabled = true;
  });

  // Her select için change event
  FIELD_DEFS.forEach((def, idx) => {
    const sel = getSelect(def.id);

    sel.addEventListener("change", async () => {
      await onFieldChange(def.id, sel);
      syncFloatingLabel(sel);
    });

    // Focus/blur için floating label
    sel.addEventListener("focus", () => syncFloatingLabel(sel));
  });

  // Sorgula butonu
  $("#btn-query").addEventListener("click", handleQuery);

  // Tekrar Sorgula
  $("#btn-requery").addEventListener("click", handleReQuery);

  // Kopyala
  $("#btn-copy").addEventListener("click", handleCopy);

  // FAQ
  initFAQ();

  // Hamburger
  initHamburger();

  // Smooth scroll nav linkleri
  $$(".nav-links a[href^='#']").forEach(a => {
    a.addEventListener("click", e => {
      e.preventDefault();
      const target = document.querySelector(a.getAttribute("href"));
      if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });
}

document.addEventListener("DOMContentLoaded", init);

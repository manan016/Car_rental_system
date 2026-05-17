/** Shared Admin Panel CSS – injected once via injectGlobalStyles("veloce-admin") */
export const ADMIN_CSS = `
/* ── Section animation ────────────────────────────────────────── */
.adm-section { animation: admFadeUp .35s ease both; }
@keyframes admFadeUp {
  from { opacity:0; transform:translateY(16px); }
  to   { opacity:1; transform:translateY(0); }
}

/* ── Section header ───────────────────────────────────────────── */
.adm-header {
  display:flex; align-items:flex-start;
  justify-content:space-between; margin-bottom:28px; gap:16px;
  flex-wrap:wrap;
}
.adm-section-title {
  font-family:'Syne',sans-serif; font-size:24px;
  font-weight:800; color:#fff; letter-spacing:-.5px; margin-bottom:4px;
}
.adm-section-sub { font-size:13px; color:#8696A0; }
.adm-header-actions { display:flex; gap:10px; flex-wrap:wrap; align-items:center; }

/* ── KPI grid ─────────────────────────────────────────────────── */
.adm-kpi-grid {
  display:grid;
  grid-template-columns:repeat(4,1fr);
  gap:14px; margin-bottom:24px;
}
@media(max-width:1100px){ .adm-kpi-grid { grid-template-columns:repeat(2,1fr); } }
@media(max-width:600px)  { .adm-kpi-grid { grid-template-columns:1fr; } }

.adm-kpi {
  background:#1C2B33; border:1px solid #2A3942;
  border-radius:14px; padding:20px;
  position:relative; overflow:hidden;
  transition:border-color .2s, transform .2s;
}
.adm-kpi:hover { border-color:rgba(37,211,102,.3); transform:translateY(-2px); }
.adm-kpi-label {
  font-size:11px; color:#8696A0; text-transform:uppercase;
  letter-spacing:.7px; margin-bottom:10px; font-weight:700;
}
.adm-kpi-val {
  font-family:'Syne',sans-serif; font-size:30px;
  font-weight:800; line-height:1; margin-bottom:8px;
}
.adm-kpi-change { font-size:12px; font-weight:600; }
.adm-kpi-icon {
  position:absolute; right:16px; top:16px;
  font-size:28px; opacity:.15;
}

/* ── Panel / card ─────────────────────────────────────────────── */
.adm-panel {
  background:#1C2B33; border:1px solid #2A3942;
  border-radius:16px; overflow:hidden; margin-bottom:16px;
}
.adm-panel-head {
  display:flex; align-items:center; justify-content:space-between;
  padding:16px 20px; border-bottom:1px solid #2A3942;
  gap:12px; flex-wrap:wrap;
}
.adm-panel-title {
  font-family:'Syne',sans-serif; font-size:16px;
  font-weight:700; color:#fff;
}
.adm-panel-body { padding:20px; }

/* ── Table ────────────────────────────────────────────────────── */
.adm-table-wrap { overflow-x:auto; }
.adm-table { width:100%; border-collapse:collapse; }
.adm-table thead tr { background:rgba(134,150,160,.04); }
.adm-table th {
  padding:12px 16px; text-align:left; font-size:11px;
  color:#8696A0; font-weight:700; text-transform:uppercase;
  letter-spacing:.5px; border-bottom:1px solid #2A3942; white-space:nowrap;
}
.adm-table td {
  padding:14px 16px; font-size:13px; color:#fff;
  border-bottom:1px solid rgba(42,57,66,.5);
}
.adm-table tbody tr { transition:background .15s; }
.adm-table tbody tr:hover td { background:rgba(37,211,102,.025); }
.adm-table tbody tr:last-child td { border-bottom:none; }

/* ── Badge ────────────────────────────────────────────────────── */
.adm-badge {
  display:inline-flex; align-items:center; gap:5px;
  font-size:11px; font-weight:700; padding:4px 10px;
  border-radius:100px; white-space:nowrap; border:1px solid transparent;
}

/* ── Buttons ──────────────────────────────────────────────────── */
.adm-btn {
  display:inline-flex; align-items:center; gap:7px;
  padding:9px 18px; border-radius:10px; border:none;
  font-family:'DM Sans',sans-serif; font-size:13px; font-weight:600;
  cursor:pointer; transition:all .2s; white-space:nowrap;
}
.adm-btn-primary {
  background:linear-gradient(135deg,#25D366,#128C7E);
  color:#111B21;
  box-shadow:0 4px 14px rgba(37,211,102,.25);
}
.adm-btn-primary:hover { transform:translateY(-1px); box-shadow:0 6px 20px rgba(37,211,102,.4); }
.adm-btn-ghost {
  background:transparent; color:#8696A0;
  border:1px solid #2A3942;
}
.adm-btn-ghost:hover { border-color:#25D366; color:#fff; background:rgba(37,211,102,.04); }
.adm-btn-danger { background:rgba(239,71,111,.1); color:#EF476F; border:1px solid rgba(239,71,111,.25); }
.adm-btn-danger:hover { background:rgba(239,71,111,.2); }
.adm-btn-sm { padding:5px 12px; font-size:12px; border-radius:8px; }
.adm-btn-icon { padding:7px 9px; border-radius:8px; font-size:15px; }

/* ── Search bar ───────────────────────────────────────────────── */
.adm-bar {
  display:flex; gap:10px; align-items:center;
  flex-wrap:wrap; margin-bottom:16px;
}
.adm-search-wrap { position:relative; flex:1; min-width:180px; max-width:340px; }
.adm-search-icon {
  position:absolute; left:12px; top:50%; transform:translateY(-50%);
  font-size:15px; pointer-events:none;
}
.adm-search {
  width:100%; padding:10px 12px 10px 38px;
  background:#111B21; border:1px solid #2A3942;
  border-radius:10px; font-size:13px; color:#fff;
  font-family:'DM Sans',sans-serif; outline:none;
  transition:border-color .2s, box-shadow .2s;
}
.adm-search:focus { border-color:rgba(37,211,102,.4); box-shadow:0 0 0 3px rgba(37,211,102,.07); }
.adm-search::placeholder { color:#8696A0; }

/* ── Filter pills ─────────────────────────────────────────────── */
.adm-pills { display:flex; gap:6px; flex-wrap:wrap; }
.adm-pill {
  padding:6px 14px; border-radius:100px; border:1px solid #2A3942;
  font-size:12px; font-weight:600; color:#8696A0;
  background:transparent; cursor:pointer; transition:all .2s;
  font-family:'DM Sans',sans-serif;
}
.adm-pill:hover { border-color:rgba(37,211,102,.3); color:#fff; }
.adm-pill.active {
  background:rgba(37,211,102,.1); border-color:rgba(37,211,102,.3); color:#25D366;
}

/* ── Toggle switch ────────────────────────────────────────────── */
.adm-toggle { position:relative; display:inline-block; width:40px; height:22px; flex-shrink:0; }
.adm-toggle input { opacity:0; width:0; height:0; }
.adm-toggle-slider {
  position:absolute; cursor:pointer; inset:0;
  background:#2A3942; border-radius:22px; transition:.3s;
}
.adm-toggle-slider:before {
  content:''; position:absolute;
  width:16px; height:16px; left:3px; bottom:3px;
  background:#fff; border-radius:50%; transition:.3s;
  box-shadow:0 1px 3px rgba(0,0,0,.3);
}
.adm-toggle input:checked + .adm-toggle-slider { background:#25D366; }
.adm-toggle input:checked + .adm-toggle-slider:before { transform:translateX(18px); }

/* ── Avatar ───────────────────────────────────────────────────── */
.adm-avatar {
  width:34px; height:34px; border-radius:50%;
  display:inline-flex; align-items:center; justify-content:center;
  font-size:14px; font-weight:800; font-family:'Syne',sans-serif;
  color:#111B21; flex-shrink:0;
}

/* ── Stat bar ─────────────────────────────────────────────────── */
.adm-bar-track {
  height:5px; background:rgba(134,150,160,.15);
  border-radius:3px; overflow:hidden; margin-top:6px;
}
.adm-bar-fill { height:100%; border-radius:3px; transition:width 1s ease; }

/* ── Modal ────────────────────────────────────────────────────── */
.adm-modal-overlay {
  position:fixed; inset:0; background:rgba(0,0,0,.7);
  backdrop-filter:blur(8px); z-index:1000;
  display:flex; align-items:center; justify-content:center;
  padding:24px; animation:admFadeIn .2s ease;
}
@keyframes admFadeIn { from{opacity:0} to{opacity:1} }
.adm-modal {
  background:#1C2B33; border:1px solid rgba(37,211,102,.15);
  border-radius:20px; width:100%; max-width:520px;
  max-height:90vh; overflow-y:auto;
  box-shadow:0 40px 80px rgba(0,0,0,.7);
  animation:admModalIn .3s cubic-bezier(.4,0,.2,1);
}
@keyframes admModalIn {
  from{opacity:0;transform:scale(.94) translateY(20px)}
  to{opacity:1;transform:scale(1) translateY(0)}
}
.adm-modal-head {
  display:flex; align-items:center; justify-content:space-between;
  padding:20px 24px; border-bottom:1px solid #2A3942;
}
.adm-modal-title { font-family:'Syne',sans-serif; font-size:18px; font-weight:800; color:#fff; }
.adm-modal-close {
  width:32px; height:32px; border-radius:8px; border:1px solid #2A3942;
  background:transparent; color:#8696A0; cursor:pointer; font-size:18px;
  display:flex; align-items:center; justify-content:center; transition:all .2s;
}
.adm-modal-close:hover { border-color:#EF476F; color:#EF476F; }
.adm-modal-body { padding:24px; }
.adm-modal-footer {
  padding:16px 24px; border-top:1px solid #2A3942;
  display:flex; justify-content:flex-end; gap:10px;
}

/* ── Form ─────────────────────────────────────────────────────── */
.adm-form-grid { display:grid; grid-template-columns:1fr 1fr; gap:16px; }
@media(max-width:480px){ .adm-form-grid{grid-template-columns:1fr;} }
.adm-field { display:flex; flex-direction:column; gap:6px; }
.adm-field-full { grid-column:1/-1; }
.adm-label { font-size:11px; font-weight:700; color:#8696A0; text-transform:uppercase; letter-spacing:.6px; }
.adm-input {
  background:#111B21; border:1px solid #2A3942; border-radius:10px;
  padding:10px 12px; font-size:13px; color:#fff;
  font-family:'DM Sans',sans-serif; outline:none; transition:border-color .2s, box-shadow .2s;
}
.adm-input:focus { border-color:rgba(37,211,102,.4); box-shadow:0 0 0 3px rgba(37,211,102,.07); }
.adm-input::placeholder { color:#8696A0; }
.adm-select {
  background:#111B21; border:1px solid #2A3942; border-radius:10px;
  padding:10px 12px; font-size:13px; color:#fff;
  font-family:'DM Sans',sans-serif; outline:none;
  transition:border-color .2s; appearance:none; cursor:pointer;
}
.adm-select:focus { border-color:rgba(37,211,102,.4); }
.adm-select option { background:#1C2B33; }

/* ── Grid helpers ─────────────────────────────────────────────── */
.adm-grid-4 { display:grid; grid-template-columns:repeat(4,1fr); gap:14px; }
.adm-grid-3 { display:grid; grid-template-columns:repeat(3,1fr); gap:14px; }
.adm-grid-2 { display:grid; grid-template-columns:1fr 1fr; gap:14px; }
@media(max-width:900px){
  .adm-grid-4 { grid-template-columns:repeat(2,1fr); }
  .adm-grid-3 { grid-template-columns:repeat(2,1fr); }
}
@media(max-width:600px){
  .adm-grid-4,.adm-grid-3,.adm-grid-2 { grid-template-columns:1fr; }
}

/* ── Activity item ────────────────────────────────────────────── */
.adm-activity-item {
  display:flex; align-items:flex-start; gap:12px;
  padding:12px 0; border-bottom:1px solid rgba(42,57,66,.5);
}
.adm-activity-item:last-child { border-bottom:none; }

/* ── Pricing card ─────────────────────────────────────────────── */
.adm-price-card {
  background:#111B21; border:1px solid #2A3942;
  border-radius:16px; padding:24px; transition:border-color .2s, transform .2s;
}
.adm-price-card:hover { border-color:rgba(37,211,102,.2); transform:translateY(-2px); }

/* ── Settings row ─────────────────────────────────────────────── */
.adm-setting-row {
  display:flex; align-items:center; justify-content:space-between;
  padding:16px 0; border-bottom:1px solid rgba(42,57,66,.5); gap:16px;
}
.adm-setting-row:last-child { border-bottom:none; }
.adm-setting-title { font-size:14px; font-weight:600; color:#fff; margin-bottom:3px; }
.adm-setting-desc { font-size:12px; color:#8696A0; }

/* ── Revenue bar chart ────────────────────────────────────────── */
.adm-chart-outer {
  display:flex; flex-direction:column; gap:0;
}
.adm-chart-bars {
  display:flex; align-items:flex-end; gap:5px;
  height:120px; padding:0 2px; flex-shrink:0;
  border-bottom:1px solid rgba(134,150,160,.12);
}
.adm-chart-bar-col {
  flex:1; display:flex; align-items:flex-end; height:100%;
}
.adm-chart-bar {
  width:100%; border-radius:4px 4px 0 0;
  background:linear-gradient(180deg,#25D366 0%,rgba(37,211,102,.3) 100%);
  min-height:3px;
  cursor:pointer; transition:opacity .15s;
}
.adm-chart-bar:hover { opacity:.8; }
.adm-chart-bar--blue {
  background:linear-gradient(180deg,#118AB2 0%,rgba(17,138,178,.3) 100%);
}
.adm-chart-labels {
  display:flex; gap:5px; padding:6px 2px 0;
}
.adm-chart-label-col {
  flex:1; text-align:center; font-size:10px; color:#8696A0;
  font-family:'DM Sans',sans-serif;
}
`;

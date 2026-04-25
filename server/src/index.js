require('dotenv').config();
const express = require('express');
const cors    = require('cors');

const addressRoutes = require('./routes/address');

const app  = express();
const PORT = process.env.PORT || 4000;

/* ── CORS ───────────────────────────────────────────────── */
const ALLOWED_ORIGINS = [
  'http://localhost:5173',
  'http://localhost:3000',
  'https://adreskodusorgula.com.tr',
  'https://www.adreskodusorgula.com.tr',
];

app.use(cors({
  origin: (origin, cb) => {
    if (!origin || ALLOWED_ORIGINS.includes(origin)) return cb(null, true);
    cb(new Error(`CORS: ${origin} izin verilmedi`));
  },
  methods: ['GET', 'POST'],
  credentials: true,
}));

app.use(express.json());

/* ── Routes ─────────────────────────────────────────────── */
app.use('/api/address', addressRoutes);

/* ── Health check ───────────────────────────────────────── */
app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', service: 'adreskodusorgula-api', ts: new Date().toISOString() });
});

/* ── 404 handler ────────────────────────────────────────── */
app.use((_req, res) => {
  res.status(404).json({ error: 'Endpoint bulunamadı' });
});

/* ── Global error handler ───────────────────────────────── */
app.use((err, _req, res, _next) => {
  console.error('[ERROR]', err.message);
  res.status(500).json({ error: 'Sunucu hatası', message: err.message });
});

app.listen(PORT, () => {
  console.log(`\n🚀 Adres Kodu API — http://localhost:${PORT}/api`);
  console.log(`   Domain: adreskodusorgula.com.tr\n`);
});

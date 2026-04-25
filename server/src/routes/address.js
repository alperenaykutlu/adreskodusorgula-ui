const express = require('express');
const { ADDRESS_DB, DIS_KAPI_LIST, IC_KAPI_LIST, lookup } = require('../data/turkeyAddress');

const router = express.Router();

/* ── GET /api/address/iller ─────────────────────────────── */
router.get('/iller', (_req, res) => {
  res.json(ADDRESS_DB.iller);
});

/* ── GET /api/address/ilceler/:ilId ─────────────────────── */
router.get('/ilceler/:ilId', (req, res) => {
  const data = lookup(ADDRESS_DB.ilceler, req.params.ilId);
  res.json(data);
});

/* ── GET /api/address/bucaklar/:ilceId ──────────────────── */
router.get('/bucaklar/:ilceId', (req, res) => {
  const data = lookup(ADDRESS_DB.bucaklar, req.params.ilceId);
  res.json(data);
});

/* ── GET /api/address/koyler/:bucakId ───────────────────── */
router.get('/koyler/:bucakId', (req, res) => {
  const data = lookup(ADDRESS_DB.koyler, req.params.bucakId);
  res.json(data);
});

/* ── GET /api/address/mahalleler/:koyId ─────────────────── */
router.get('/mahalleler/:koyId', (req, res) => {
  const data = lookup(ADDRESS_DB.mahalleler, req.params.koyId);
  res.json(data);
});

/* ── GET /api/address/caddesokaklar/:mahalleId ──────────── */
router.get('/caddesokaklar/:mahalleId', (req, res) => {
  const data = lookup(ADDRESS_DB.caddeSokaklar, req.params.mahalleId);
  res.json(data);
});

/* ── GET /api/address/diskapilar ────────────────────────── */
router.get('/diskapilar', (_req, res) => {
  res.json(DIS_KAPI_LIST);
});

/* ── GET /api/address/ickapilar ─────────────────────────── */
router.get('/ickapilar', (_req, res) => {
  res.json(IC_KAPI_LIST);
});

/* ── POST /api/address/uavt ─────────────────────────────── */
/*   Body: { il, ilce, bucak, koy, mahalle, cadde, disKapi, icKapi }
     Gerçek sistemde UAVT API'sine istek atılacak.            */
router.post('/uavt', (req, res) => {
  const { il, ilce, mahalle, disKapi, icKapi } = req.body;

  if (!il || !ilce) {
    return res.status(400).json({ error: 'il ve ilce zorunludur' });
  }

  // Simülasyon — gerçek UAVT API entegrasyonunda burası değişecek
  const seed = `${il}${ilce}${mahalle || '00'}${disKapi}${icKapi || '0'}`;
  const hash = seed
    .split('')
    .reduce((acc, c) => acc + c.charCodeAt(0), 0)
    .toString()
    .padStart(6, '0')
    .slice(-6);

  const timestamp = Date.now().toString().slice(-8);
  const uavtCode  = `TR${timestamp}${hash}`;
  const binaCode  = `BN${Math.random().toString(36).substring(2, 10).toUpperCase()}`;

  res.json({ uavtCode, binaCode });
});

module.exports = router;

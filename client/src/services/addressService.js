/**
 * Address Service — Veri Erişim Katmanı
 * USE_LOCAL = true  → sunucu gerekmez, anlık mock data
 * USE_LOCAL = false → Express API (production)
 */

import {
  ADDRESS_LOCAL,
  localLookup,
  buildKapiList,
  mockUAVT,
} from '../data/addressMockData';

const USE_LOCAL = true;

/* ── Local (anlık, 0ms) ──────────────────────────────────── */
const AddressService = {
  getIller:          () => Promise.resolve(ADDRESS_LOCAL.iller),
  getIlceler:        (ilId)      => Promise.resolve(localLookup(ADDRESS_LOCAL.ilceler,       ilId)),
  getBucaklar:       (ilceId)    => Promise.resolve(localLookup(ADDRESS_LOCAL.bucaklar,      ilceId)),
  getKoyler:         (bucakId)   => Promise.resolve(localLookup(ADDRESS_LOCAL.koyler,        bucakId)),
  getMahalleler:     (koyId)     => Promise.resolve(localLookup(ADDRESS_LOCAL.mahalleler,    koyId)),
  getCaddeSokaklar:  (mahalleId) => Promise.resolve(localLookup(ADDRESS_LOCAL.caddeSokaklar, mahalleId)),
  getDisKapilar:     ()          => Promise.resolve(buildKapiList(200)),
  getIcKapilar:      ()          => Promise.resolve(buildKapiList(50)),
  generateUAVT:      (adres)     => Promise.resolve(mockUAVT(adres)),
};

export default AddressService;

/**
 * useAddressForm — Adres formu state & mantık hook'u
 *
 * Sorumluluklar:
 *  - Her alanın seçenek listesini API'den yönetir
 *  - Cascade sıfırlama: üst alan değiştiğinde alt alanlar temizlenir
 *  - Validation: boş alan kontrolü
 *  - UAVT kodu oluşturma (POST /api/address/uavt)
 */

import { useState, useEffect, useCallback } from 'react';
import AddressService from '../services/addressService';

/* Alan sırası — genişletmek için buraya ekle */
export const FIELD_ORDER = ['il', 'ilce', 'bucak', 'koy', 'mahalle', 'cadde', 'disKapi', 'icKapi'];

export const FIELD_CONFIG = {
  il:      { label: 'İl Seçiniz',             errorMsg: 'İl boş bırakılamaz' },
  ilce:    { label: 'İlçe Seçiniz',           errorMsg: 'İlçe boş bırakılamaz' },
  bucak:   { label: 'Bucak Seçiniz',          errorMsg: 'Bucak boş bırakılamaz' },
  koy:     { label: 'Köy / Belde Seçiniz',    errorMsg: 'Köy/Belde boş bırakılamaz' },
  mahalle: { label: 'Mahalle Seçiniz',        errorMsg: 'Mahalle boş bırakılamaz' },
  cadde:   { label: 'Cadde / Sokak Seçiniz',  errorMsg: 'Cadde/Sokak boş bırakılamaz' },
  disKapi: { label: 'Dış Kapı No',            errorMsg: 'Dış Kapı boş bırakılamaz' },
  icKapi:  { label: 'İç Kapı No',             errorMsg: 'İç Kapı boş bırakılamaz' },
};

/** Seçenek listelerinin başlangıç state'i */
const EMPTY_OPTIONS = {
  il: [], ilce: [], bucak: [], koy: [], mahalle: [], cadde: [], disKapi: [], icKapi: [],
};

/** Değerlerin başlangıç state'i */
const EMPTY_VALUES = {
  il: '', ilce: '', bucak: '', koy: '', mahalle: '', cadde: '', disKapi: '', icKapi: '',
};

export default function useAddressForm() {
  const [values,   setValues  ] = useState(EMPTY_VALUES);
  const [labels,   setLabels  ] = useState(EMPTY_VALUES);
  const [options,  setOptions ] = useState(EMPTY_OPTIONS);
  const [errors,   setErrors  ] = useState(EMPTY_VALUES);
  const [loading,  setLoading ] = useState(false);
  const [result,   setResult  ] = useState(null); // { uavtCode, binaCode }

  /* ── İl listesini başlangıçta yükle ──────────────────── */
  useEffect(() => {
    AddressService.getIller()
      .then(data => setOptions(o => ({ ...o, il: data })))
      .catch(console.error);
  }, []);

  /* ── Bir alanın verilen indexten itibaren sıfırlanması ── */
  const resetFrom = useCallback((fromIndex) => {
    const fieldsToReset = FIELD_ORDER.slice(fromIndex);
    setValues(v => {
      const next = { ...v };
      fieldsToReset.forEach(f => (next[f] = ''));
      return next;
    });
    setLabels(l => {
      const next = { ...l };
      fieldsToReset.forEach(f => (next[f] = ''));
      return next;
    });
    setOptions(o => {
      const next = { ...o };
      fieldsToReset.forEach(f => (next[f] = []));
      return next;
    });
    setErrors(e => {
      const next = { ...e };
      fieldsToReset.forEach(f => (next[f] = ''));
      return next;
    });
  }, []);

  /* ── Bir alan değiştiğinde çağrılan handler ──────────── */
  const onFieldChange = useCallback(async (fieldId, selectedValue, selectedLabel) => {
    const idx = FIELD_ORDER.indexOf(fieldId);

    /* Seçili değeri güncelle, altındakileri sıfırla */
    setValues(v  => ({ ...v, [fieldId]: selectedValue }));
    setLabels(l  => ({ ...l, [fieldId]: selectedLabel }));
    setErrors(e  => ({ ...e, [fieldId]: '' }));
    resetFrom(idx + 1);

    if (!selectedValue) return;

    /* Alt alanın seçeneklerini yükle */
    const nextField = FIELD_ORDER[idx + 1];
    if (!nextField) return;

    try {
      let data = [];
      switch (nextField) {
        case 'ilce':    data = await AddressService.getIlceler(selectedValue);    break;
        case 'bucak':   data = await AddressService.getBucaklar(selectedValue);   break;
        case 'koy':     data = await AddressService.getKoyler(selectedValue);     break;
        case 'mahalle': data = await AddressService.getMahalleler(selectedValue); break;
        case 'cadde':   data = await AddressService.getCaddeSokaklar(selectedValue); break;
        case 'disKapi': data = await AddressService.getDisKapilar();              break;
        case 'icKapi':  data = await AddressService.getIcKapilar();               break;
        default: break;
      }
      setOptions(o => ({ ...o, [nextField]: data }));
    } catch (err) {
      console.error(`[useAddressForm] ${nextField} yüklenemedi:`, err);
    }
  }, [resetFrom]);

  /* ── Validation ──────────────────────────────────────── */
  const validate = useCallback(() => {
    const newErrors = {};
    let valid = true;
    FIELD_ORDER.forEach(f => {
      if (!values[f]) {
        newErrors[f] = FIELD_CONFIG[f].errorMsg;
        valid = false;
      } else {
        newErrors[f] = '';
      }
    });
    setErrors(newErrors);
    return valid;
  }, [values]);

  /* ── Sorgula ─────────────────────────────────────────── */
  const handleQuery = useCallback(async () => {
    if (!validate()) return false;
    setLoading(true);
    try {
      const data = await AddressService.generateUAVT(values);
      setResult({ ...data, snapshotValues: { ...values }, snapshotLabels: { ...labels } });
      return true;
    } catch (err) {
      console.error('[useAddressForm] UAVT hatası:', err);
      return false;
    } finally {
      setLoading(false);
    }
  }, [validate, values, labels]);

  /* ── Tekrar Sorgula — sıfırla ────────────────────────── */
  const handleReset = useCallback(() => {
    setValues(EMPTY_VALUES);
    setLabels(EMPTY_VALUES);
    setErrors(EMPTY_VALUES);
    setResult(null);
    /* İl listesi her zaman dolu kalır */
    AddressService.getIller()
      .then(data => setOptions({ ...EMPTY_OPTIONS, il: data }))
      .catch(console.error);
  }, []);

  return {
    values,
    labels,
    options,
    errors,
    loading,
    result,
    onFieldChange,
    handleQuery,
    handleReset,
    FIELD_ORDER,
    FIELD_CONFIG,
  };
}

export const RUH_HALLERI = {
  huzurlu: { etiket: 'Huzurlu', emoji: '😊', renk: 'border-emerald-400', yazi: 'text-emerald-300' },
  korkulu: { etiket: 'Korkulu', emoji: '😨', renk: 'border-rose-400', yazi: 'text-rose-300' },
  garip: { etiket: 'Garip', emoji: '🤔', renk: 'border-amber-300', yazi: 'text-amber-200' },
  huzunlu: { etiket: 'Hüzünlü', emoji: '😢', renk: 'border-sky-400', yazi: 'text-sky-300' },
}

export function bugun() {
  return new Date().toISOString().slice(0, 10)
}

export function yeniRuya(alanlar) {
  return {
    id: crypto.randomUUID(),
    baslik: '',
    icerik: '',
    tarih: bugun(),
    ruhHali: 'huzurlu',
    etiketler: [],
    netlik: 3,
    ...alanlar,
  }
}
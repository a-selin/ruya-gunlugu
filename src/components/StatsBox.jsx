import { RUH_HALLERI } from '../interfaces/dream'

export default function StatsBox({ ruyalar }) {
  if (ruyalar.length === 0) return null

 
  const sayac = {}
  ruyalar.forEach((r) => r.etiketler.forEach((t) => (sayac[t] = (sayac[t] || 0) + 1)))
  const enSik = Object.entries(sayac).sort((a, b) => b[1] - a[1])[0]
  const halSayac = {}
  ruyalar.forEach((r) => (halSayac[r.ruhHali] = (halSayac[r.ruhHali] || 0) + 1))


  const ortalama = ruyalar.reduce((toplam, r) => toplam + r.netlik, 0) / ruyalar.length

  return (
    <div className="rounded-2xl bg-indigo-900/40 border border-indigo-300/20 p-5 backdrop-blur space-y-4">
      <h2 className="text-lg font-semibold">📊 İstatistikler</h2>

      <div className="grid grid-cols-3 gap-3 text-center">
        <div className="rounded-xl bg-indigo-950/60 p-3">
          <div className="text-2xl font-bold">{ruyalar.length}</div>
          <div className="text-xs text-indigo-300/70">rüya</div>
        </div>
        <div className="rounded-xl bg-indigo-950/60 p-3">
          <div className="text-2xl font-bold">{ortalama.toFixed(1)}</div>
          <div className="text-xs text-indigo-300/70">ort. netlik</div>
        </div>
        <div className="rounded-xl bg-indigo-950/60 p-3">
          <div className="text-lg font-bold truncate">{enSik ? `#${enSik[0]}` : '-'}</div>
          <div className="text-xs text-indigo-300/70">
            {enSik ? `en sık tema (${enSik[1]}x)` : 'tema yok'}
          </div>
        </div>
      </div>

      <div className="space-y-2">
        {Object.entries(RUH_HALLERI).map(([anahtar, h]) => {
          const yuzde = Math.round(((halSayac[anahtar] || 0) / ruyalar.length) * 100)
          return (
            <div key={anahtar} className="flex items-center gap-2 text-sm">
              <span className="w-24">
                {h.emoji} {h.etiket}
              </span>
              <div className="flex-1 h-2 rounded-full bg-indigo-950/70 overflow-hidden">
                <div className="h-full bg-purple-400 transition-all" style={{ width: `${yuzde}%` }} />
              </div>
              <span className="w-10 text-right text-indigo-200">%{yuzde}</span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
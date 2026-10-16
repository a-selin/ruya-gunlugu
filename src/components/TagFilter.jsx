import { RUH_HALLERI } from '../interfaces/dream'

export default function TagFilter({ etiketler, seciliEtiket, seciliHal, onEtiket, onHal, onTemizle }) {
  const aktifMi = seciliEtiket || seciliHal

  const dugme = (aktif) =>
    `rounded-full px-3 py-1 text-sm transition ${
      aktif ? 'bg-purple-500 text-white' : 'bg-indigo-800/60 text-indigo-200 hover:bg-indigo-700/60'
    }`

  return (
    <div className="rounded-2xl bg-indigo-900/40 border border-indigo-300/20 p-5 backdrop-blur space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">🔎 Filtrele</h2>
        {aktifMi && (
          <button onClick={onTemizle} className="text-sm text-rose-300 hover:underline">
            Filtreleri temizle
          </button>
        )}
      </div>

      <div>
        <p className="text-sm text-indigo-300/70 mb-2">Ruh haline göre</p>
        <div className="flex flex-wrap gap-2">
          {Object.entries(RUH_HALLERI).map(([anahtar, h]) => (
            <button
              key={anahtar}
              onClick={() => onHal(seciliHal === anahtar ? '' : anahtar)}
              className={dugme(seciliHal === anahtar)}
            >
              {h.emoji} {h.etiket}
            </button>
          ))}
        </div>
      </div>

      <div>
        <p className="text-sm text-indigo-300/70 mb-2">Etikete göre</p>
        {etiketler.length === 0 ? (
          <p className="text-sm text-indigo-300/50">Henüz etiket yok.</p>
        ) : (
          <div className="flex flex-wrap gap-2">
            {etiketler.map((t) => (
              <button
                key={t}
                onClick={() => onEtiket(seciliEtiket === t ? '' : t)}
                className={dugme(seciliEtiket === t)}
              >
                #{t}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
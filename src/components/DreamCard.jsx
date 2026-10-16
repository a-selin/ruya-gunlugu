import { RUH_HALLERI } from '../interfaces/dream'

function tarihYaz(tarih) {
  const d = new Date(tarih + 'T00:00:00')
  return isNaN(d) ? tarih : d.toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' })
}

export default function DreamCard({ ruya, onDuzenle, onSil, onEtiket }) {
  const hal = RUH_HALLERI[ruya.ruhHali] ?? RUH_HALLERI.huzurlu

  function silOnayli() {
    if (window.confirm(`"${ruya.baslik}" rüyası silinsin mi?`)) onSil(ruya.id)
  }

  return (
    <article
      className={`kart-giris rounded-2xl bg-indigo-900/40 border-l-4 ${hal.renk} border border-indigo-300/10 p-5 backdrop-blur`}
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="text-lg font-semibold">{ruya.baslik}</h3>
          <p className="text-sm text-indigo-300/70">{tarihYaz(ruya.tarih)}</p>
        </div>
        <span className={`text-sm whitespace-nowrap ${hal.yazi}`}>
          {hal.emoji} {hal.etiket}
        </span>
      </div>

      {ruya.icerik && <p className="mt-3 text-indigo-100/90 whitespace-pre-line">{ruya.icerik}</p>}

      <div className="mt-3 text-sm text-indigo-200" title="Rüya netliği">
        Netlik: {'⭐'.repeat(ruya.netlik)}
        <span className="opacity-40">{'⭐'.repeat(5 - ruya.netlik)}</span>
      </div>

      {ruya.etiketler.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-2">
          {ruya.etiketler.map((t) => (
            <button
              key={t}
              onClick={() => onEtiket(t)}
              className="rounded-full bg-purple-500/20 hover:bg-purple-500/40 transition px-3 py-0.5 text-sm text-purple-200"
            >
              #{t}
            </button>
          ))}
        </div>
      )}

      <div className="mt-4 flex gap-3 text-sm">
        <button onClick={() => onDuzenle(ruya)} className="text-sky-300 hover:underline">
          ✏️ Düzenle
        </button>
        <button onClick={silOnayli} className="text-rose-300 hover:underline">
          🗑️ Sil
        </button>
      </div>
    </article>
  )
}
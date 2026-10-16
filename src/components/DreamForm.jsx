import { useState, useEffect } from 'react'
import { RUH_HALLERI, bugun } from '../interfaces/dream'

const BOS = { baslik: '', icerik: '', tarih: bugun(), ruhHali: 'huzurlu', etiketler: '', netlik: 3 }

export default function DreamForm({ duzenlenen, onKaydet, onIptal }) {
  const [form, setForm] = useState(BOS)

  useEffect(() => {
    if (duzenlenen) {
      setForm({ ...duzenlenen, etiketler: duzenlenen.etiketler.join(', ') })
    } else {
      setForm({ ...BOS, tarih: bugun() })
    }
  }, [duzenlenen])

  function degistir(alan, deger) {
    setForm((onceki) => ({ ...onceki, [alan]: deger }))
  }

  function gonder(e) {
    e.preventDefault()
    if (!form.baslik.trim()) return

    const etiketler = form.etiketler
      .split(',')
      .map((t) => t.trim().toLowerCase())
      .filter(Boolean)

    onKaydet({
      baslik: form.baslik.trim(),
      icerik: form.icerik.trim(),
      tarih: form.tarih,
      ruhHali: form.ruhHali,
      etiketler: [...new Set(etiketler)],
      netlik: Number(form.netlik),
    })
    if (!duzenlenen) setForm({ ...BOS, tarih: bugun() })
  }

  const alan =
    'w-full rounded-lg bg-indigo-950/70 border border-indigo-400/30 px-3 py-2 text-white placeholder-indigo-300/50 focus:outline-none focus:border-purple-400'

  return (
    <form
      onSubmit={gonder}
      className="rounded-2xl bg-indigo-900/40 border border-indigo-300/20 p-5 backdrop-blur space-y-4"
    >
      <h2 className="text-xl font-semibold">
        {duzenlenen ? '✏️ Rüyayı Düzenle' : '🌙 Yeni Rüya Ekle'}
      </h2>

      <div>
        <label className="block text-sm mb-1 text-indigo-200">Başlık</label>
        <input
          className={alan}
          value={form.baslik}
          onChange={(e) => degistir('baslik', e.target.value)}
          placeholder="Örn: Denizin üstünde uçmak"
          required
        />
      </div>

      <div>
        <label className="block text-sm mb-1 text-indigo-200">Rüyanı anlat</label>
        <textarea
          className={alan + ' min-h-24'}
          value={form.icerik}
          onChange={(e) => degistir('icerik', e.target.value)}
          placeholder="Ne gördün, ne hissettin..."
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm mb-1 text-indigo-200">Tarih</label>
          <input
            type="date"
            className={alan}
            value={form.tarih}
            onChange={(e) => degistir('tarih', e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm mb-1 text-indigo-200">Ruh hali</label>
          <select
            className={alan}
            value={form.ruhHali}
            onChange={(e) => degistir('ruhHali', e.target.value)}
          >
            {Object.entries(RUH_HALLERI).map(([anahtar, h]) => (
              <option key={anahtar} value={anahtar}>
                {h.emoji} {h.etiket}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label className="block text-sm mb-1 text-indigo-200">
          Etiketler <span className="text-indigo-300/60">(virgülle ayır)</span>
        </label>
        <input
          className={alan}
          value={form.etiketler}
          onChange={(e) => degistir('etiketler', e.target.value)}
          placeholder="uçmak, deniz, okul"
        />
      </div>

      <div>
        <label className="block text-sm mb-1 text-indigo-200">
          Netlik: {'⭐'.repeat(form.netlik)}{' '}
          <span className="text-indigo-300/60">({form.netlik}/5)</span>
        </label>
        <input
          type="range"
          min="1"
          max="5"
          value={form.netlik}
          onChange={(e) => degistir('netlik', e.target.value)}
          className="w-full accent-purple-400"
        />
      </div>

      <div className="flex gap-3">
        <button
          type="submit"
          className="flex-1 rounded-lg bg-purple-600 hover:bg-purple-500 transition px-4 py-2 font-medium"
        >
          {duzenlenen ? 'Güncelle' : 'Kaydet'}
        </button>
        {duzenlenen && (
          <button
            type="button"
            onClick={onIptal}
            className="rounded-lg bg-indigo-800 hover:bg-indigo-700 transition px-4 py-2"
          >
            Vazgeç
          </button>
        )}
      </div>
    </form>
  )
}
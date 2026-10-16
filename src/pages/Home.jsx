import { useState, useMemo } from 'react'
import useDreams from '../hooks/useDreams'
import DreamForm from '../components/DreamForm'
import DreamCard from '../components/DreamCard'
import TagFilter from '../components/TagFilter'
import StatsBox from '../components/StatsBox'

export default function Home() {
  const { ruyalar, ekle, guncelle, sil } = useDreams()

  const [duzenlenen, setDuzenlenen] = useState(null)
  const [seciliEtiket, setSeciliEtiket] = useState('')
  const [seciliHal, setSeciliHal] = useState('')

 
  const tumEtiketler = useMemo(
    () => [...new Set(ruyalar.flatMap((r) => r.etiketler))].sort(),
    [ruyalar],
  )

  const gorunenler = useMemo(
    () =>
      ruyalar
        .filter((r) => !seciliEtiket || r.etiketler.includes(seciliEtiket))
        .filter((r) => !seciliHal || r.ruhHali === seciliHal)
        .sort((a, b) => b.tarih.localeCompare(a.tarih)),
    [ruyalar, seciliEtiket, seciliHal],
  )

  function kaydet(alanlar) {
    if (duzenlenen) {
      guncelle(duzenlenen.id, alanlar)
      setDuzenlenen(null)
    } else {
      ekle(alanlar)
    }
  }

  function duzenlemeyeBasla(ruya) {
    setDuzenlenen(ruya)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  function temizle() {
    setSeciliEtiket('')
    setSeciliHal('')
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <header className="mb-8 text-center">
        <h1 className="text-4xl font-bold">🌙 Rüya Günlüğü</h1>
        <p className="mt-2 text-indigo-300/80">Uyanır uyanmaz yaz, rüyalar buharlaşmadan önce.</p>
      </header>

      <div className="grid gap-6 lg:grid-cols-[380px_1fr]">
        <aside className="space-y-6 lg:sticky lg:top-6 lg:self-start">
          <DreamForm duzenlenen={duzenlenen} onKaydet={kaydet} onIptal={() => setDuzenlenen(null)} />
          <TagFilter
            etiketler={tumEtiketler}
            seciliEtiket={seciliEtiket}
            seciliHal={seciliHal}
            onEtiket={setSeciliEtiket}
            onHal={setSeciliHal}
            onTemizle={temizle}
          />
          <StatsBox ruyalar={ruyalar} />
        </aside>


        <main className="space-y-4">
          {ruyalar.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-indigo-300/30 p-10 text-center text-indigo-300/70">
              <p className="text-5xl mb-3">💤</p>
              <p>Henüz hiç rüya eklemedin. Soldaki formdan ilkini yaz!</p>
            </div>
          ) : gorunenler.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-indigo-300/30 p-10 text-center text-indigo-300/70">
              Bu filtreye uyan rüya yok.
            </div>
          ) : (
            gorunenler.map((r) => (
              <DreamCard
                key={r.id}
                ruya={r}
                onDuzenle={duzenlemeyeBasla}
                onSil={sil}
                onEtiket={setSeciliEtiket}
              />
            ))
          )}
        </main>
      </div>
    </div>
  )
}
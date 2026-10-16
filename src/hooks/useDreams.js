import { useState, useEffect } from 'react'
import { yeniRuya } from '../interfaces/dream'

const ANAHTAR = 'ruya-gunlugu'

function yukle() {
  try {
    const kayit = localStorage.getItem(ANAHTAR)
    return kayit ? JSON.parse(kayit) : []
  } catch {
    return []
  }
}

export default function useDreams() {
  const [ruyalar, setRuyalar] = useState(yukle)

  useEffect(() => {
    try {
      localStorage.setItem(ANAHTAR, JSON.stringify(ruyalar))
    } catch {
    }
  }, [ruyalar])

  function ekle(alanlar) {
    setRuyalar((onceki) => [yeniRuya(alanlar), ...onceki])
  }

  function guncelle(id, alanlar) {
    setRuyalar((onceki) => onceki.map((r) => (r.id === id ? { ...r, ...alanlar } : r)))
  }

  function sil(id) {
    setRuyalar((onceki) => onceki.filter((r) => r.id !== id))
  }

  return { ruyalar, ekle, guncelle, sil }
}
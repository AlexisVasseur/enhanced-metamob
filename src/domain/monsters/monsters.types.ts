export type MonsterType = 'monstre' | 'archimonstre' | 'boss'

export interface Monster {
  id: number
  nom: string
  slug: string
  type: string // "monstre", "archimonstre", "boss"
  image_url: string
  etape: number
  zone: string
  souszone: string
  nom_normal: string
}

export interface MonsterTrade extends Monster {
  quantite: number
  recherche: number
  propose: number
}

export interface MonsterFilters {
  nom?: string
  etape?: number
  type?: MonsterType
}

export type TradeStatus = 'recherche' | 'aucun' | 'propose'
export interface UpdateMonster {
  id: number
  status: TradeStatus
  quantity: number // Peut être un nombre ou une string avec +/- pour incrément/décrément
}

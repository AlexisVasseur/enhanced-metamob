import type { MonsterTrade, TradeStatus, UpdateMonster } from './monsters.types'

export interface MonsterDto {
  id: string
  nom: string
  slug: string
  type: string // "monstre", "archimonstre", "boss"
  image_url: string
  etape: string
  zone: string
  souszone: string
  nom_normal: string
}

export interface MonsterTradeDto extends MonsterDto {
  quantite: string
  recherche: string
  propose: string
}

export function toMonsterTrade(monsterDto: MonsterTradeDto): MonsterTrade {
  return {
    id: parseInt(monsterDto.id),
    nom: monsterDto.nom,
    slug: monsterDto.slug,
    type: monsterDto.type, // "monstre", "archimonstre", "boss"
    image_url: monsterDto.image_url,
    etape: parseInt(monsterDto.etape, 10),
    zone: monsterDto.zone,
    souszone: monsterDto.souszone,
    nom_normal: monsterDto.nom_normal,
    quantite: parseInt(monsterDto.quantite, 10),
    recherche: parseInt(monsterDto.recherche, 10),
    propose: parseInt(monsterDto.propose, 10),
  }
}

export interface UpdateMonsterDto {
  id: string
  etat: TradeStatus
  quantite: string
}

export function toUpdateMonsterDto(monster: UpdateMonster): UpdateMonsterDto {
  return {
    id: `${monster.id}`,
    etat: monster.status,
    quantite: `${monster.quantity}`,
  }
}

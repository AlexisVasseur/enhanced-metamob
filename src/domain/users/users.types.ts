export interface User {
  pseudo: string;
  contact: string;
  presentation: string;
  image: string;
  image_url: string;
  etape: number;
  serveur: string;
  derniere_connexion: string; // Format YYYY-MM-DD HH:mm:ss
  lien: string;
}

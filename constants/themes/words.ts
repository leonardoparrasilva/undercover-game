// Listas de palavras por categoria
import { FILMES_SERIES } from "./filmes-series";
import { VIDEO_GAMES } from "./video-game";


// Mapeamento para facilitar o acesso no index.tsx
export const CATEGORIAS: Record<string, string[]> = {
  "Video Games": VIDEO_GAMES,
  "Filmes & Séries": FILMES_SERIES,
};
import { IUser } from '../@types/User'

export function useAnime() {
  function checkAnimeIsFavorite(animeSlug: string, animeList: any[]): boolean {
    return animeList.includes(animeSlug)
  }

  return {
    checkAnimeIsFavorite,
  }
}

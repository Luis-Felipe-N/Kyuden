export interface IProviderUserInfo {
  id: string
  displayName: string
  email: string
  providerId: string
}

export interface IUser {
  uid: string
  email: string
  displayName: string
  createAt: string
  watchedEpisodes: []
  watchedAnimes: []
  myListAnimes: []
  myListfriends: []
  watchingEpisodes: {
    updatedAt: number
    assistedTime: number
    id: string
  }[]
  banner: string | null
  avatar: string | null
}

export interface IComment {
  id: string
  episodeId: string
  userId: string
  comment: string
  createdAt: number
}

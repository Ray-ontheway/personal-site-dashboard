export interface UserCreate {
  name: string
  email: string
  password: string
  optCode: string
}

export interface UserUpdate {
  id: string
  userId: string
  username?: string
  avatar?: string
  short_bio?: string
}

export interface UserResp {
  id: number
  username: string
  avatar: string
  short_bio: string
  registeredAt: Date
  roles: RoleResp[]
}

export interface RoleResp {
  id: number
  name: string
  description: string
}

export interface UserLogin {
  email: string
  password: string
}

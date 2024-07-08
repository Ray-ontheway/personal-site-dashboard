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
  id: string
  username: string
  avatar: string
  short_bio: string
  registeredAt: Date
  roles: RoleResp[]
}

export interface UserLogin {
  email: string
  password: string
}

export interface RoleResp {
  id: string
  name: string
  description: string
}

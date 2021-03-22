export type LoginFxParams = {
  email: string
  password: string
}
export type IntroFxResponse = {
  access_token: string
  refresh_token: string
}
//
export type RegistrationFxParams = {
  email: string
  password: string
  repeat_password: string
  first_name: string
  last_name: string
  gender: string
  birth_date: Date
  phone: string
}
//
export type RestorePasswordFxParams = {
  email: string
}
//
export type PersonalInfoFxParams = {
  token: string
}
export type UpdatePersonalInfoParams = {
  user_id: number
  token: string
  first_name?: string,
  last_name?: string,
  email?: string,
  birth_date?: Date,
  phone?: string
}
export type ChangePasswordFxParams = {
  user_id: number
  token: string
  password: string
}
export type AvatarFxParams = {
  user_id: number
  token: string
  original_photo: File | null
  croped_photo: File | null
}
export type AvatarFxResponse = {
  original_photo: string
  croped_photo: string
  original_photo_name?: string
  croped_photo_name?: string
}
//
export interface User {
  id: number
  first_name: string
  last_name: string
  gender: string
  birth_date: Date
  phone: string
  original_photo: string | null
  croped_photo: string | null
}
export interface Profile extends User {
  email: string
}
export interface AllUsers extends User {
  exist_in_friend_list: boolean
}
export type UserInGrid = {
  id: number
  first_name: string
  last_name: string
  gender: string
  birth_date: Date
  phone: string
  photo: string
}
export interface AllUsersInGrid extends UserInGrid {
  exist_in_friend_list: boolean
}
export type ListFriendsFxResponse = {
  count: number
  next: boolean
  results: User[]
}
export type ListUsersFxResponse = {
  count: number
  next: boolean
  results: AllUsers[]
}
//
export type Message = {
  id: number
  first_name: string
  last_name: string
  photo: string
  status: string
  time: string
  message: string
}
export type ListChatParams = {
  user_id: number
  recipment_id: number
  offset?: number
  limit?: number
}
export type ListMessagesFxResponse = {
  count: number
  next: boolean
  results: Message[]
}
// common response
export type CommonFxParams = {
  user_id: number
  friend_id: number
}
export type UserId = {
  user_id: number
}
export type FriendId = {
  friend_id: number
}
export type CommonStatusAnswer = {
  statys: string
}

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
  birth_date: string
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
export type ListMessagesFxResponse = {
  messages: Message[]
}
//
export interface User {
  id: number
  first_name: string
  last_name: string
  gender: string
  birth_date: string
  phone: string
  photo: string | null
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
  birth_date: string
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
// // common response
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

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
  first_name?: string
  last_name?: string
  email?: string
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
  user_id: number
  first_name: string
  last_name: string
  gender: string
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
  user_id: number
  first_name: string
  last_name: string
  gender: string
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
  message_id: number
  chat_id: number
  author: number
  message: string
  date: string
  files: string[]
}
export type ListChatFxParams = {
  user_id: number
  recipient_id: number
  offset?: number
  limit?: number
}
export type ChatItem = {
  chat_id: number
  last_message: Message
  recipient_info: User
}
export type ListChatsFxResponse = {
  count: number
  next: boolean
  results: ChatItem[]
}
export type ListMessagesFxResponse = {
  count: number
  next: boolean
  results: {
    messages: Message[],
    chat_id: number | null
  }
}
export type SendMessageFxParams = {
  chat_id?: number
  author: number
  recipient?: number
  message: string
  date: Date
  files: File[]
}
export type SendMessageFxResponse = {
  chat_id: number
  message: Message
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
export type CommonGetParams = {
  user_id: number
  query: string
}

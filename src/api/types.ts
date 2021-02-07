export type LoginFxParams = {
  email: string
  password: string
}
export type IntroFxResponse = {
  accessToken: string
  refreshToken: string
  userId: string
}
//
export type RegistrationFxParams = {
  email: string
  password: string
  repeatPassword: string
  firstName: string
  lastName: string
  gender: string
  birthDate: string
}
//
export type RestorePasswordFxParams = {
  email: string
}
//
export type PersonalInfoFxParams = {
  token: string
}
export type ProfileFxParams = {
  id: string
}
export type ProfileFxResponse = {
  id: number
  email: string
  firstName: string
  lastName: string
  birthDate: string
  gender: string
  role: string
  location: string
  photo: string
}
//
export type RemoveAccountFxParams = {
  token: string
  id: string
}
export type RemoveAccountFxResponse = {
  status: string
}
//
export type Message = {
  id: number
  firstName: string
  lastName: string
  image: string
  status: string
  time: string
  message: string
}
export type ListMessagesFxResponse = {
  messages: Message[]
}
//
export type User = {
  id: number
  firstName: string
  lastName: string
  image: string
  status?: string
  gender: string
  birthDate: string
}
export type ListFriendsFxResponse = {
  friends: User[]
}
export type ListUsersFxResponse = {
  users: User[]
}

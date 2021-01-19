export type LoginFxParams = {
  email: string
  password: string
}
export type LoginFxResponse = {
  token: string
  refreshToken: string
}
export type RegistrationFxParams = {
  email: string
  password: string
  repeatPassword: string
  firstName: string
  lastName: string
}
export type RegistrationFxResponse = {
  token: string
  refreshToken: string
}
export type RestorePasswordFxParams = {
  email: string
}
export type RestorePasswordFxResponse = {
  token: string
  refreshToken: string
}
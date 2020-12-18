import React from 'react'
//
import LoginPage from '@/components/pages/login/LoginPage'
import RegistrationPage from '@/components/pages/registration/RegistrationPage'
import RestorePasswordPage from '@/components/pages/restore-password/RestorePasswordPage'
//
import MainPage from '@/components/pages/main-page/MainPage'
import EditProfilePage from '@/components/pages/profile/EditProfilePage'
import FriendsPage from '@/components/pages/friends/FriendsPage'

type RouterItem = {
  name: string
  path: string
  component: React.FC
}
export const IntroPages: RouterItem[] = [
  {
    name: 'login-page',
    path: '/login',
    component: LoginPage,
  },
  {
    name: 'registration-page',
    path: '/registration',
    component: RegistrationPage,
  },
  {
    name: 'restore-password-page',
    path: '/restore-password',
    component: RestorePasswordPage,
  },
]
export const MainRoutes: RouterItem[] = [
  {
    name: 'main-page',
    path: '/main',
    component: MainPage,
  },
  //
  {
    name: 'profile-page',
    path: '/profile',
    component: EditProfilePage,
  },
  {
    name: 'messages-page',
    path: '/messages',
    component: MainPage,
  },
  {
    name: 'friends-page',
    path: '/friends',
    component: FriendsPage,
  },
]
export const router: RouterItem[] = [...IntroPages, ...MainRoutes]

export const getRouterByName = (name: string) => {
  return router.find((item) => item.name === name) || router[0]
}
export const getRouterByPath = (path: string) => {
  return router.find((item) => item.path === path) || router[0]
}

import React from 'react'
import LoginPage from '@/components/pages/login/LoginPage'
import RegistrationPage from '@/components/pages/registration/RegistrationPage'
import RestorePasswordPage from '@/components/pages/restore-password/RestorePasswordPage'
import ContactsPage from '@/components/pages/contacts/ContactsPage'
import PolicyPage from '@/components/pages/policy/PolicyPage'

type RouterItem = {
  name: string
  path: string
  component: React.FC
}

export const router: RouterItem[] = [
  {
    name: 'login-page',
    path: '/login',
    component: LoginPage
  },
  {
    name: 'registration-page',
    path: '/registration',
    component: RegistrationPage
  },
  {
    name: 'restore-password-page',
    path: '/restore-password',
    component: RestorePasswordPage
  },
  {
    name: 'contacts',
    path: '/contacts',
    component: ContactsPage
  },
  {
    name: 'policy',
    path: '/policy',
    component: PolicyPage
  }
]

export const getRouterByName = (name: string) => {
  return router.find(item => item.name === name) || router[0]
}
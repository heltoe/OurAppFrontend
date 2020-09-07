import React from 'react'
import { Link } from 'react-router-dom'
import Icon from '@/components/ui/icon/Icon'
import test from '@/assets/images/arrow-left.svg'
import style from '@/components/ui/back-page/back-page.module.scss'

type BackPageType = {
  path: string
}

export const BackPage: React.FC<BackPageType> = ({ path = '' }) => {
  return (
    <Link to={path} className={`no-select ${style.back}`}>
      {/* <Icon type="arrow-back1" color="#fff" /> */}
      <img src={test} />
      {/* <p>Назад</p> */}
    </Link>
  )
}

export default BackPage

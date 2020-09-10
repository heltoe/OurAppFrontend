import React from 'react'
import style from '@/components/ui/loader/loader.module.scss'

export const Loader: React.FC = () => {
  return (
    <div className={style['lds-ring']}>
      <div />
      <div />
      <div />
      <div />
    </div>
  )
}

export default Loader

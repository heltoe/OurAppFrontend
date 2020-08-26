import React from 'react'

export const Header: React.FC = () => {
  return (
    <div className="header">
      <div className="logo">logo</div>
      <div className="person-info">
        <div className="notifications">notifications</div>
        <div className="avatar">avatar</div>
      </div>
    </div>
  )
}

export default Header

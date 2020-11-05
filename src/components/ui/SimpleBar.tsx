import React from 'react'
import SimpleBar from 'simplebar-react'
import 'simplebar-react/dist/simplebar.min.css'

type SimpleBarType = {
  maxHeight: string
}

export const Simple: React.FC<SimpleBarType> = ({ children, maxHeight }) => {
  return <SimpleBar style={{ maxHeight }}>{children}</SimpleBar>
}

export default Simple

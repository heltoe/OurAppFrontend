import React from 'react'
import { ThemeProvider } from 'styled-components'

const theme = {
  colors: {
    grey1: '159, 159, 159',
    grey2: '228, 228, 228',
    grey3: '243, 243, 243',
    grey4: '209, 209, 209',
    grey5: '235, 237, 241',
    grey6: '242, 244, 245',
    black: '0, 0, 0',
    white: '255, 255, 255',
    purple1: '116 129 235',
    purple2: '116, 129, 235',
    red: '254, 125, 139',
    darkBlue1: '39, 42, 70',
    green1: '30, 199, 172',
  },
  rgb: (color: string) => `rgb(${color})`,
  rgba: (color: string, opacity: number) => `rgba(${color}, ${opacity})`,
  transition: '0.3s ease-in-out',
  shadow: {
    shadow1: '0 2px 24px 0 rgba(0, 0, 0, 0.17)',
    shadow2: '1px 2px 16px 0 rgba(0, 0, 0, 0.1)',
  },
  Hheader: '70px',
  fontWeight: {
    bold: 'bold',
    middle: '600',
    light: '300',
  },
}

const Theme: React.FC = ({ children }) => (
  <ThemeProvider theme={theme}>{children}</ThemeProvider>
)

export default Theme

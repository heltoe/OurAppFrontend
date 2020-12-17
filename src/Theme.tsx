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
    lightBlue: `109, 170, 254`,
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
const size = {
  mobileS: '320px',
  mobileM: '375px',
  mobileL: '480px',
  tabletS: '600px',
  tabletL: '768px',
  laptop: '1024px',
  laptopL: '1440px',
  desktop: '2560px'
}
export const device = {
  mobileS: `(max-width: ${size.mobileS})`,
  mobileM: `(max-width: ${size.mobileM})`,
  mobileL: `(max-width: ${size.mobileL})`,
  tabletS: `(max-width: ${size.tabletS})`,
  tabletL: `(max-width: ${size.tabletL})`,
  laptop: `(max-width: ${size.laptop})`,
  laptopL: `(max-width: ${size.laptopL})`,
  desktop: `(max-width: ${size.desktop})`,
  desktopL: `(max-width: ${size.desktop})`
};

const Theme: React.FC = ({ children }) => (
  <ThemeProvider theme={theme}>{children}</ThemeProvider>
)

export default Theme

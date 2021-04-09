import React from 'react'
import styled from 'styled-components'

type GridImagesType = {
  images: string[]
}
type Image = {
  image: string
  width: string
  height: string
}
const PhotoWrapperStyled = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-top: 10px;
`
const ImageStyled = styled.div<{ width: string, height: string, image: string }>`
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  border: ${(props) => `4px solid ${props.theme.rgb(props.theme.colors.white)}`};
  border-radius: 8px;
  background-image: ${(props) => `url(${props.image})`};
  background-size: cover;
  background-position: center center;
  background-repeat: no-repeat;
  position: relative;
  cursor: pointer;
  &:after {
    content: '';
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 100%;
    height: 100%;
    border-radius: 8px;
    background-color: ${(props) => props.theme.rgba(props.theme.colors.purple2, 0)};
    transition: ${(props) => props.theme.transition};
    z-index: 10;
  }
  &:hover {
    &:after {
      background-color: ${(props) => props.theme.rgba(props.theme.colors.purple2, 0.1)};
    }
  }
`
const GridImages: React.FC<GridImagesType> = ({ images }) => {
  const builderGrid = (): Image[] => {
    switch(images.length) {
      case 1:
        return images.map(item => ({ image: item, width: '225px', height: '300px' }))
      case 2:
        return images.map(item => ({ image: item, width: '50%', height: '160px' }))
      case 3:
        return images.map((item, index) => ({ image: item, width: index < 1 ? '100%' : '50%', height: index < 1 ? '180px' : '130px' }))
      case 4:
        return images.map(item => ({ image: item, width: '50%', height: '130px' }))
      case 5:
        return images.map((item, index) => ({ image: item, width: index < 2 ? '50%' : 'calc(100% / 3)', height: index < 2 ? '160px' : '120px' }))
      case 6:
        return images.map(item => ({ image: item, width: 'calc(100% / 3)', height: '130px' }))
      case 7:
        return images.map((item, index) => ({ image: item, width: index < 3 ? 'calc(100% / 3)' : 'calc(100% / 4)', height: index < 3 ? '120px' : '100px' }))
      case 8:
        return images.map((item, index) => ({ image: item, width: index < 2 ? '50%' : 'calc(100% / 3)', height: index < 2 ? '120px' : '100px' }))
      case 9:
        return images.map(item => ({ image: item, width: 'calc(100% / 3)', height: '120px' }))
      case 10:
        return images.map((item, index) => ({ image: item, width: index < 2 ? '50%' : 'calc(100% / 8)', height: index < 2 ? '200px' : '60px' }))
      default:
        return images.map(item => ({ image: item, width: '50%', height: '160px' }))
    }
  }
  return (
    <PhotoWrapperStyled>
      {builderGrid().map((item, index) => 
        <ImageStyled
          key={index}
          image={item.image}
          width={item.width}
          height={item.height}
        />
      )}
    </PhotoWrapperStyled>
  )
}

export default GridImages

import React, { useRef, useEffect } from 'react'
import styled from 'styled-components'
import { debounce, isVisible } from '@/helpers/utils'
import { PageStyled } from '@/components/common/Page'

type PageInfiniteScrollig = {
  callBack(count: number): void
  callBackToLoadMore?(): void
  canLoadMore?: boolean
}
const ScrollingHelperStyled = styled.div`
  width: 560px;
  margin: 0 auto;
  background-color: ${(props) => props.theme.rgb(props.theme.colors.white)};
  text-align: center;
  padding: 15px;
  border-radius: 0 0 8px 8px;
  position: relative;
  &:after {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    transform: translateY(-100%);
    width: 100%;
    height: 5px;
    background-color: ${(props) => props.theme.rgb(props.theme.colors.white)};
  }
`
const PageInfiniteScrolling: React.FC<PageInfiniteScrollig> = ({
  children,
  callBack,
  callBackToLoadMore,
  canLoadMore = true
}) => {
  const scrolledPage = useRef(null)
  const loadMoreElement = useRef(null)
  const scrollPage = () => {
    const page = scrolledPage?.current as HTMLDivElement | null
    if (page) callBack(page.scrollTop)
    if (canLoadMore && callBackToLoadMore) {
      const toggler = loadMoreElement?.current as HTMLDivElement | null
      if (toggler && isVisible(toggler)) callBackToLoadMore()
    }
  }
  const handlerScrolling = debounce(() => {
    scrollPage()
  }, 300)
  useEffect(() => {
    const page = scrolledPage?.current as HTMLDivElement | null
    if (page) page.addEventListener('scroll', handlerScrolling)
    return () => {
      if (page) page.removeEventListener('scroll', handlerScrolling)
    }
  })
  return (
    <PageStyled ref={scrolledPage}>
      {children}
      {canLoadMore && callBackToLoadMore &&
        <ScrollingHelperStyled
          ref={loadMoreElement}
          className="no-select"
          onClick={() => callBackToLoadMore()}
        >
          Показать больше
        </ScrollingHelperStyled>
      }
    </PageStyled>
  )
}

export default PageInfiniteScrolling

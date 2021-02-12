import React, { useRef, useEffect } from 'react'
import { debounce, isVisible } from '@/helpers/utils'
import { PageStyled } from '@/components/common/Page'

type PageInfiniteScrollig = {
  callBack(count: number): void
  callBackToLoadMore?(): void
}

const PageInfiniteScrolling: React.FC<PageInfiniteScrollig> = ({ children, callBack, callBackToLoadMore }) => {
  const scrolledPage = useRef(null)
  const loadMoreElement = useRef(null)
  const scrollPage = () => {
    const page = scrolledPage?.current as HTMLDivElement | null
    if (page) callBack(page.scrollTop)
    if (callBackToLoadMore) {
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
      <div ref={loadMoreElement} />
    </PageStyled>
  )
}

export default PageInfiniteScrolling
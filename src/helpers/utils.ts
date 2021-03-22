export const isVisible = (target: HTMLElement) => {
  // Все позиции элемента
  const targetPosition = {
    top: window.pageYOffset + target.getBoundingClientRect().top,
    left: window.pageXOffset + target.getBoundingClientRect().left,
    right: window.pageXOffset + target.getBoundingClientRect().right,
    bottom: window.pageYOffset + target.getBoundingClientRect().bottom,
  }
  // Получаем позиции окна
  const windowPosition = {
    top: window.pageYOffset,
    left: window.pageXOffset,
    right: window.pageXOffset + document.documentElement.clientWidth,
    bottom: window.pageYOffset + document.documentElement.clientHeight,
  }

  return (
    targetPosition.bottom > windowPosition.top && // Если позиция нижней части элемента больше позиции верхней чайти окна, то элемент виден сверху
    targetPosition.top < windowPosition.bottom && // Если позиция верхней части элемента меньше позиции нижней чайти окна, то элемент виден снизу
    targetPosition.right > windowPosition.left && // Если позиция правой стороны элемента больше позиции левой части окна, то элемент виден слева
    targetPosition.left < windowPosition.right // Если позиция левой стороны элемента меньше позиции правой чайти окна, то элемент виден справа
  )
}

export const debounce = (f: any, ms: number) => {
  let timer: any = null
  return function (...args: any) {
    const onComplete = () => {
      f.apply(args)
      timer = null
    }
    if (timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(onComplete, ms)
  }
}

export const b64toBlob = (b64Data: string, contentType: string = '', sliceSize: number = 512) => {
  const byteCharacters = window.atob(b64Data)
  const byteArrays = []
  for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
    const slice = byteCharacters.slice(offset, offset + sliceSize)
    const byteNumbers = new Array(slice.length)
    for (let i = 0; i < slice.length; i++) {
      byteNumbers[i] = slice.charCodeAt(i)
    }
    const byteArray = new Uint8Array(byteNumbers)
    byteArrays.push(byteArray)
  }
  const blob = new Blob(byteArrays, { type: contentType })
  return blob
}

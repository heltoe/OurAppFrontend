export const validateEmail = (email: string) =>  {
  const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}
export const declOfNum = (number: number, words: string[]) => {  
  return words[(number % 100 > 4 && number % 100 < 20) ? 2 : [2, 0, 1, 1, 1, 2][(number % 10 < 5) ? number % 10 : 5]];
}
export const validatorForm = ({
  value,
  isEmail = false,
  isPhone = false,
  minSize = null
}: {
  value: string | Date | null,
  isEmail?: boolean,
  isPhone?: boolean,
  minSize?: number | null
}): string => {
  if (typeof value === 'string') {
    if (!value.length) return 'Поле обязательно к заполнению'
    if (minSize && typeof minSize === 'number' && value.length < minSize) return `Поле должно содержать минимум ${minSize} ${declOfNum(1, ['символ', 'символа', 'символов'])}`
    if (isEmail && !validateEmail(value)) return `Не валидный Email`
    if (isPhone && value.includes('_')) return `Не валидный телефон`
  }
  else if (!value) return 'Поле обязательно к заполнению'
  return ''
}
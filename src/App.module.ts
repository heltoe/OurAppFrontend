import { combine } from 'effector-root'
import { createEffectorField } from '@/helpers/effector-field'
import { $token } from '@/api/common/AuthorizedRequest'

// сторы
export const [$idUser, setIdUser] = createEffectorField({ defaultValue: '' })
export const $preparePersonDataId = combine({ id: $idUser })
export const $preparePersonalDataToken = combine({ token: $token })
export const $combinePersonalData = combine({ id: $idUser, token: $token })


export const required = value => value ? undefined : 'Preenchimento obrigatório'
export const valRequired = value => (value || typeof value === 'number' ? undefined : 'Preenchimento obrigatório')
export const valMaxLength = max => value => value && value.length > max ? `máximo de ${max} caracteres` : undefined
export const valMaxLength15 = valMaxLength(15)
export const valMinLength = min => value => value && value.length < min ? `mínimo de ${min} caracteres` : undefined
export const valMinLength2 = valMinLength(2)
export const valNumber = value => value && isNaN(Number(value)) ? 'Deve ser um número' : undefined
export const valMinValue = min => value => value && value < min ? `Valor mínimo é ${min}` : undefined
export const valMinValue13 = valMinValue(13)
export const valEmail = value => value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value) ? 'e-mail inválido' : undefined
export const tooYoung = value => value && value < 13 ? 'You do not meet the minimum age requirement!' : undefined
export const aol = value => value && /.+@aol\.com/.test(value) ? 'Really? You still use AOL for your email?' : undefined
export const valAlphaNumeric = value => value && /[^a-zA-Z0-9 ]/i.test(value) ? 'Only alphanumeric characters' : undefined
export const valPhoneNumber = value => value && !/^(0|[1-9][0-9]{9})$/i.test(value) ? 'Invalid phone number, must be 10 digits' : undefined
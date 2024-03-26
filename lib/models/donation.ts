import { CurrencyName } from '../constants/currency'

export type Method = 'Monthly' | 'Give once'

export interface DonationModel {
    method: Method
    charge: number
    dedicate?: boolean
}

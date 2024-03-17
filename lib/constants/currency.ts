export type CurrencyName = (typeof Currency)[number]

export const Currency = ['USD', 'EUR', 'CNY', 'BYN'] as const

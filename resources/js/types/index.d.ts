export interface User {
  id: number
  name: string
  email: string
  email_verified_at: string
}

export interface Trip {
  id: number
  name: string
  slug: string
  userId: number
  memberCount: number
  totalExpenses: Money
  description: string
  transactions: Transaction[]
  members?: User[]
  contribution: Money
  admin: User
}

export interface Money {
  amount: string
  currency: string
  formatted: string
}

export interface Transaction {
  id: number
  name: string
  user_id: number
  amount: Money
  payer: User
  created_at: string,
  updated_at: string,
  category: 'transportation' | 'food' | 'accomodation' | 'miscellaneous'
}

export interface Debt {
  id: number
  amount: Money
  name: string
  email: string
  isDebt: boolean
}

export type DebtTable = Record<number, { payer: User; debts: Debt[] }>

export type PageProps<
  T extends Record<string, unknown> = Record<string, unknown>,
> = T & {
  auth: {
    user: User
  }
}


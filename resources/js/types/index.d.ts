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
  userId: string
  memberCount: number
  totalExpenses: Money
  description: string
  transactions: Transaction[]
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
}

export interface Debt {
  user_id: number
  amount: Money
  payee: User
}

export type DebtTable = Record<number, { payee: User; debts: Debt[] }>

export type PageProps<
  T extends Record<string, unknown> = Record<string, unknown>,
> = T & {
  auth: {
    user: User
  }
}

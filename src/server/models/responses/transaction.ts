export type TransactionCasflow = {
  title: string
  created_at: Date
  amount: number
  movement: string
}

export type TransactionResponse = {
  total_income: number
  total_outcome: number
  total: number
  transactions: TransactionCasflow[]
}

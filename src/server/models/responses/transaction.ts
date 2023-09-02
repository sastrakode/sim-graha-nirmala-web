export type TransactionResponse = {
  total_income: number
  total_outcome: number
  total: number
  transactions: {
    title: string
    created_at: Date
    amount: number
    movement: string
  }[]
}

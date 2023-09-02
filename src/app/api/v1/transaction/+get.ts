import { db } from "@/server/db"
import { TransactionResponse } from "@/server/models/responses/transaction"
import { useAuth } from "@/server/security/auth"
import { defineHandler } from "@/server/web/handler"
import { sendData } from "@/server/web/response"
import { sql } from "drizzle-orm"

export const GET = defineHandler(async (req) => {
  useAuth(req)

  const results = await db().execute(
    sql`
    SELECT
        cashflow.title,
        cashflow.created_at,
        cashflow.amount,
        cashflow.movement
    FROM
        cashflow
    UNION
    SELECT
        'Pembayaran iuran',
        payment.created_at,
        payment.amount,
        'income'
    FROM
        payment
    WHERE
        payment.status = 'settlement'
    ORDER BY
        created_at desc`,
  )

  let response: TransactionResponse = {
    total_income: 0,
    total_outcome: 0,
    total: 0,
    transactions: [],
  }

  results.forEach((result) => {
    if (result.movement === "income") {
      response.total_income += parseInt(result.amount as string)
    } else if (result.movement === "outcome") {
      response.total_outcome += parseInt(result.amount as string)
    }

    response.transactions.push({
      title: result.title as string,
      created_at: result.created_at as Date,
      amount: parseInt(result.amount as string),
      movement: result.movement as string,
    })
  })

  response.total = response.total_income - response.total_outcome
  return sendData(200, response)
})

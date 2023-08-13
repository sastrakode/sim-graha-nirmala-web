import { db } from "@/server/db"
import { defineHandler } from "@/server/web/handler"
import { sendData } from "@/server/web/response"
import { sql } from "drizzle-orm"

type Response = {
  total_income: number
  total_outcome: number
  total: number
  cashflows: {
    name: string
    created_at: Date
    amount: number
    movement: string
  }[]
}

export const GET = defineHandler(async () => {
  const results = await db().execute(
    sql`
    SELECT
        cashflow_type.name,
        cashflow.created_at,
        cashflow.amount,
        cashflow.movement
    FROM
        cashflow
    INNER JOIN
        cashflow_type on cashflow_type.id = cashflow.cashflow_type_id
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

  let response: Response = {
    total_income: 0,
    total_outcome: 0,
    total: 0,
    cashflows: [],
  }

  results.forEach((result) => {
    if (result.movement === "income") {
      response.total_income += parseInt(result.amount as string)
    } else if (result.movement === "outcome") {
      response.total_outcome += parseInt(result.amount as string)
    }

    response.cashflows.push({
      name: result.name as string,
      created_at: result.created_at as Date,
      amount: parseInt(result.amount as string),
      movement: result.movement as string,
    })
  })

  response.total = response.total_income - response.total_outcome
  return sendData(200, response)
})

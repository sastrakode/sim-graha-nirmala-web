// @ts-ignore
import midtransClient from "midtrans-client"
import crypto from "crypto"
import { config } from "@/server/config"

let coreClient: any
let snapClient: any

const clientConfig = {
  isProduction: false,
  serverKey: config.midtrans.serverKey,
  clientKey: config.midtrans.clientKey,
}

export function core() {
  if (coreClient) return coreClient

  coreClient = new midtransClient.Core(clientConfig)
  return coreClient
}

export function snap() {
  if (snapClient) return snapClient

  snapClient = new midtransClient.Snap(clientConfig)
  return snapClient
}

export function generateOrderId() {
  return crypto.randomUUID().toString()
}

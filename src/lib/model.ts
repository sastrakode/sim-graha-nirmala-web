export interface Billing {
  account_id?: number,
  amount?: number,
  created_at?: string,
  id?: number,
  period?: string,
  transactions?: Transaction[]
}

export interface Cashflow {
  amount?: number,
  created_at?: string,
  id?: number,
  title?: string,
  transaction?: string,
  updated_at?: string
}

export interface Transaction {
  amount?: number,
  belong_id?: number,
  belong_type?: string,
  billing?: Billing,
  cashflow?: Cashflow
  created_at?: string,
  flow?: string,
  id?: number,
  invoice?: string,
  status?: string,
  token?: string,
  updated_at?: string
}

export interface Announcement {
  body?: string,
  created_at?: string,
  id?: number,
  title?: string,
  updated_at?: string
}
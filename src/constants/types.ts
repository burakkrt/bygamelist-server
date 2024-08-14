export interface MetaData {
  total: number
  page: number
  pageSize: number
  totalPages: number
  timestamp: string
}

export interface SuccessResponse {
  data: any[]
  meta?: MetaData
}

export interface ErrorResponse {
  error: {
    message: string
  }
}

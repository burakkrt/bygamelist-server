export interface MetaData {
  total: number
  page: number
  pageSize: number
  totalPages: number
  timestamp: string
}

export interface SuccessResponse {
  success: true
  data: any[]
  meta?: MetaData
}

export interface ErrorResponse {
  success: false
  error: {
    message: string
    details?: Array<any>
  }
}

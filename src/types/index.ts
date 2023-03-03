export interface State<T> {
  loading: boolean
  data?: T
  error?: string
}

export interface ApiResponse {
  status: number
  message: string
}

export interface ApiResponseData<T> extends ApiResponse {
  data?: T
}

export interface PagedResult<T> {
  total: number
  currentPage: number
  items: Array<T>
}

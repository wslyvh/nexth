export interface State<T> {
  loading: boolean
  data?: T
  error?: string
}

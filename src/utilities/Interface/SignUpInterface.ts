export interface SignUpInterface {
  email: string | undefined,
  password: string | undefined,
  first_name: string | undefined,
  last_name: string | undefined,
  confirmPassword?: string | undefined
}
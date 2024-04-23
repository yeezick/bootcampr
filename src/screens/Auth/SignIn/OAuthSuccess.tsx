import { useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { signInWithGoogle } from 'utils/api'

export const OAuthSuccess = () => {
  const [searchParams] = useSearchParams()
  const gCode = searchParams.get('code')
  useEffect(() => {
    const fetchClient = async () => {
      const res = await signInWithGoogle(gCode)
      console.log('signInWithGoogle', res)
    }
    console.log('gCode', gCode)
    if (gCode) {
      fetchClient()
    }
  }, [])

  return (
    <div>
      <h2>You've successfully authenticated with Google! </h2>
    </div>
  )
}

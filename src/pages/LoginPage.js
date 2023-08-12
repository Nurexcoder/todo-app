import React from 'react'
import { signInWithGoogle } from '../utils/Firebase'

const LoginPage = () => {
  return (
    <div>
        <button onClick={signInWithGoogle}>
            Signin
        </button>
    </div>
  )
}

export default LoginPage
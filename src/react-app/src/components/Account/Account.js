import React from 'react'
import { Auth } from 'aws-amplify'
import { Authenticator } from '@aws-amplify/ui-react'
import '@aws-amplify/ui-react/styles.css'

export default function Account() {
  return (
      <Authenticator
        loginMechanisms={['email']}
        className="auth-container"
        hideSignUp={true}
      ></Authenticator>
  )
}

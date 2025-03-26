import React, { useState } from 'react'
import { PreAuthLayout } from '../../../layouts/PreAuthLayout'
import { RegisterForm } from './partials/RegisterForm'
import { CodeValidation } from './partials/CodeValidation'
import { useLocation } from 'react-router-dom'

export const RegisterPage = () => {

  const [account, setAccount] = useState(false);

  return (
    <PreAuthLayout>
      { account ? 
        <CodeValidation account={account} /> :
        <RegisterForm setAccount={setAccount}/>
      }
    </PreAuthLayout>
  )
}

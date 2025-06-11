import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Amplify } from 'aws-amplify'
import awsExports from './aws-exports.js'

Amplify.configure({
  ...awsExports,
  Auth: {
    region: awsExports.aws_cognito_region,
    userPoolId: awsExports.aws_user_pools_id,
    userPoolWebClientId: awsExports.aws_user_pools_web_client_id,
    authenticationFlowType: 'USER_PASSWORD_AUTH', // Critical addition
    signUpVerificationMethod: 'none',
  }
});

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

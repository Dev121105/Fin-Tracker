import React from 'react'
import Header from './Header'
import SignupSignincomponent from './SignupSignin'

function signup() {
  return (
    <>
      <Header />
    <div className='wrapper'>
      <SignupSignincomponent />
    </div>
    </>
  )
}

export default signup
// import { sendLogInRequest } from 'apis/LogIn/logInApi';
// import { fetchEmailCheck } from 'apis/SignUp/signUpApi';
// import { AxiosResponse } from 'axios';
import { useRouter } from 'next/router';
import React, { useRef, useState } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  /* display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 150px;
  margin-top: 50px; */
`;

const Input = styled.input`
  position: relative;
  overflow: hidden;
  width: 100%;
  height: 40px;
  margin: 0 0 8px;
  padding: 5px 39px 5px 11px;
  border: solid 1px;
  border-radius: 5px;
  box-sizing: border-box;
`;

const Button = styled.button`
  font-size: 18px;
  font-weight: 700;
  line-height: 49px;
  display: block;
  width: 100%;
  height: 49px;
  margin: 20px 0 0 0;
  cursor: pointer;
  text-align: center;
  border: none;
  border-radius: 5px;
  background-color: rgba(148, 186, 101, 0.9);
`;

//이메일 값 받기
//값없으면 disabled
function LoginForm({ onClose, onOpenSignUp }) {
  const router = useRouter();
  const emailInput = useRef();
  const passwordInput = useRef();
  const [sendingMail, setSendingMail] = useState(false);
  const loginHandler = e => {
    e.preventDefault();
    localStorage.setItem('id', emailInput.current.value);
    onClose();
    router.reload();
  };

  return (
    <>
      {sendingMail ? (
        <LoadingBox>
          <img
            src='https://mblogthumb-phinf.pstatic.net/MjAxODEwMjNfNjAg/MDAxNTQwMjg2OTk2NTcw.mfWKPtzKVO1mJaBBIFKIkVBlMQQIF1Vc-yrlbbGaoP0g.KNJWAgMmhsfQrZI3n0UT-LMi_qpHAZls4qPMvbNaJBcg.GIF.chingguhl/Spinner-1s-200px.gif?type=w800'
            alt='loading'
          />
        </LoadingBox>
      ) : (
        <Container>
          <h2 class='mt-6 text-center text-3xl font-bold tracking-tight text-gray-900'>
            Sign in to your account
          </h2>
          <form className='mt-8 space-y-6' action='#' method='POST'>
            <input type='hidden' name='remember' value='true' />
            <div className='-space-y-px rounded-md shadow-sm'>
              <div>
                <label for='email-address' className='sr-only'>
                  Email address
                </label>
                <input
                  ref={emailInput}
                  id='email-address'
                  name='email'
                  type='email'
                  autocomplete='email'
                  required
                  className='bg-white relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm'
                  placeholder='Email address'
                />
              </div>
              <div>
                <label for='password' className='sr-only'>
                  Password
                </label>
                <input
                  ref={passwordInput}
                  id='password'
                  name='password'
                  type='password'
                  autocomplete='current-password'
                  required
                  className='bg-white relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm'
                  placeholder='Password'
                />
              </div>
            </div>

            <div className='flex items-center justify-between'>
              <div className='flex items-center'>
                <input
                  id='remember-me'
                  name='remember-me'
                  type='checkbox'
                  className='h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500'
                />
                <label
                  for='remember-me'
                  className='ml-2 block text-sm text-gray-900'>
                  Remember me
                </label>
              </div>

              <div className='text-sm'>
                <a
                  href='#'
                  className='font-medium text-indigo-600 hover:text-indigo-500'>
                  Forgot your password?
                </a>
              </div>
            </div>

            <div>
              <button
                onClick={loginHandler}
                type='submit'
                className='group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'>
                <span className='absolute inset-y-0 left-0 flex items-center pl-3'>
                  <svg
                    className='h-5 w-5 text-indigo-500 group-hover:text-indigo-400'
                    xmlns='http://www.w3.org/2000/svg'
                    viewBox='0 0 20 20'
                    fill='currentColor'
                    aria-hidden='true'>
                    <path
                      fill-rule='evenodd'
                      d='M10 1a4.5 4.5 0 00-4.5 4.5V9H5a2 2 0 00-2 2v6a2 2 0 002 2h10a2 2 0 002-2v-6a2 2 0 00-2-2h-.5V5.5A4.5 4.5 0 0010 1zm3 8V5.5a3 3 0 10-6 0V9h6z'
                      clip-rule='evenodd'
                    />
                  </svg>
                </span>
                로그인
              </button>
              <button
                type='submit'
                class=' mt-2 group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'>
                <span className='absolute inset-y-0 left-0 flex items-center pl-3'>
                  <svg
                    className='h-5 w-5 text-indigo-500 group-hover:text-indigo-400'
                    xmlns='http://www.w3.org/2000/svg'
                    viewBox='0 0 20 20'
                    fill='currentColor'
                    aria-hidden='true'>
                    <path
                      fill-rule='evenodd'
                      d='M10 1a4.5 4.5 0 00-4.5 4.5V9H5a2 2 0 00-2 2v6a2 2 0 002 2h10a2 2 0 002-2v-6a2 2 0 00-2-2h-.5V5.5A4.5 4.5 0 0010 1zm3 8V5.5a3 3 0 10-6 0V9h6z'
                      clip-rule='evenodd'
                    />
                  </svg>
                </span>
                가입하기
              </button>
            </div>
          </form>
        </Container>
      )}
    </>
  );
}

export default LoginForm;

const LoadingBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 300px;
  img {
    width: 100px;
  }
`;
const SignupBox = styled.div`
  display: flex;
  height: 60px;
  padding: 0 40px;
  justify-content: space-evenly;
  align-items: center;

  .signupButton {
    font-weight: 700;
    cursor: pointer;
  }
`;

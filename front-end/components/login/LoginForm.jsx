// import { sendLogInRequest } from 'apis/LogIn/logInApi';
// import { fetchEmailCheck } from 'apis/SignUp/signUpApi';
// import { AxiosResponse } from 'axios';
import { useRouter } from 'next/router';
import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import { LockClosedIcon } from '@heroicons/react/20/solid';
import axiosInstance from '../../pages/api';
import axios from 'axios';
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
  const registerHandler = async e => {
    e.preventDefault();
    const email = emailInput.current.value;
    const pw = passwordInput.current.value;
    const res = await axiosInstance.post('signup', {
      id: email,
      password: pw,
    });
    if (res.data) {
      alert('가입 성공');
      return;
    }
  };
  const loginHandler = async e => {
    e.preventDefault();
    const email = emailInput.current.value;
    const pw = passwordInput.current.value;
    const res = await axiosInstance.get('login', {
      params: { id: email, password: pw },
    });
    if (res.data) {
      localStorage.setItem('id', emailInput.current.value);
      onClose();
      router.reload();
      return;
    }
    alert('회원가입을 해주세요');
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
          <div className='flex min-h-full items-center justify-center  sm:px-6 lg:px-8'>
            <div className='w-full max-w-md space-y-8'>
              <div>
                <h2 className=' text-center text-3xl font-bold tracking-tight text-gray-900'>
                  Sign in to your account
                </h2>
              </div>
              <form className='mt-8 space-y-6' action='#' method='POST'>
                <input type='hidden' name='remember' defaultValue='true' />
                <div className='-space-y-px rounded-md shadow-sm'>
                  <div>
                    <label htmlFor='email-address' className='sr-only'>
                      Email address
                    </label>
                    <input
                      ref={emailInput}
                      id='email-address'
                      name='email'
                      type='email'
                      autoComplete='email'
                      required
                      className='bg-white relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm'
                      placeholder='Email address'
                    />
                  </div>
                  <div>
                    <label htmlFor='password' className='sr-only'>
                      Password
                    </label>
                    <input
                      ref={passwordInput}
                      id='password'
                      name='password'
                      type='password'
                      autoComplete='current-password'
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
                      htmlFor='remember-me'
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
                      <LockClosedIcon
                        className='h-5 w-5 text-indigo-500 group-hover:text-indigo-400'
                        aria-hidden='true'
                      />
                    </span>
                    로그인
                  </button>
                  <button
                    onClick={registerHandler}
                    type='submit'
                    className='mt-2 group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'>
                    <span className='absolute inset-y-0 left-0 flex items-center pl-3'>
                      <LockClosedIcon
                        className='h-5 w-5 text-indigo-500 group-hover:text-indigo-400'
                        aria-hidden='true'
                      />
                    </span>
                    가입하기
                  </button>
                </div>
              </form>
            </div>
          </div>
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

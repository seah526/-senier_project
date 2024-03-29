import { Children, Fragment, useState } from 'react';
import { Disclosure, Menu, Transition } from '@headlessui/react';
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { useRouter } from 'next/router';
import getLoginId from '../../pages/api/login';
import LoginModal from './../login/LoginModal';
import ExModal from '../login/ExModal';
const navigation = [
  { name: '전공필수', href: '/classes', current: true },
  { name: '전공일반', href: '/classes', current: false },
  { name: '스터디', href: '/study', current: false },
  { name: '아이캠퍼스', href: 'https://icampus.skku.edu/', current: false },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function Example({ children }) {
  const router = useRouter();
  const loginId = getLoginId();
  const [showLogInModal, setShowLogInModal] = useState(false);
  const loginClickhandler = () => {
    setShowLogInModal(true);
  };
  const logoutHandler = () => {
    localStorage.removeItem('id');
    router.reload();
  };
  return (
    <>
      {/* <ExModal show={showLogInModal} /> */}
      <LoginModal
        onClose={() => setShowLogInModal(false)}
        onOpenSignUp={() => setShowSignUpModal(true)}
        show={showLogInModal}
      />
      <div className='flex flex-col h-screen'>
        <Disclosure as='nav' className='bg-gray-800'>
          {({ open }) => (
            <>
              <div className='mx-auto max-w-7xl px-2 sm:px-6 lg:px-8'>
                <div className='relative flex h-16 items-center justify-between'>
                  <div className='absolute inset-y-0 left-0 flex items-center sm:hidden'>
                    {/* Mobile menu button*/}
                    <Disclosure.Button className='inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white'>
                      <span className='sr-only'>Open main menu</span>
                      {open ? (
                        <XMarkIcon
                          className='block h-6 w-6'
                          aria-hidden='true'
                        />
                      ) : (
                        <Bars3Icon
                          className='block h-6 w-6'
                          aria-hidden='true'
                        />
                      )}
                    </Disclosure.Button>
                  </div>
                  <div className=' flex flex-1 items-center justify-center sm:items-stretch sm:justify-start'>
                    <div
                      onClick={() => {
                        router.push('/');
                      }}
                      className=' cursor-pointer flex flex-shrink-0 items-center'>
                      <img
                        className='hidden h-12 w-auto lg:block '
                        // src='https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500'
                        src='https://cdn.pixabay.com/photo/2016/06/29/16/36/logo-1487245_1280.png'
                        alt='Your Company'
                      />
                    </div>
                    <div className='hidden sm:ml-6 sm:block'>
                      <div className='flex space-x-4 mt-3'>
                        {navigation.map(item => (
                          <Link
                            key={item.name}
                            href={item.href}
                            className={classNames(
                              item.current
                                ? 'bg-gray-900 text-white '
                                : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                              'px-3 py-2 rounded-md text-sm font-medium'
                            )}
                            aria-current={item.current ? 'page' : undefined}>
                            {item.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                  {loginId ? (
                    <div className='absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0'>
                      <button
                        type='button'
                        className='rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800'>
                        <span className='sr-only'>View notifications</span>
                        <BellIcon className='h-6 w-6' aria-hidden='true' />
                      </button>

                      {/* Profile dropdown */}
                      <Menu as='div' className='relative ml-3'>
                        <div>
                          <Menu.Button className='flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800'>
                            <span className='sr-only'>Open user menu</span>
                            <img
                              className='h-8 w-8 rounded-full'
                              src='https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
                              alt=''
                            />
                          </Menu.Button>
                        </div>
                        <Transition
                          as={Fragment}
                          enter='transition ease-out duration-100'
                          enterFrom='transform opacity-0 scale-95'
                          enterTo='transform opacity-100 scale-100'
                          leave='transition ease-in duration-75'
                          leaveFrom='transform opacity-100 scale-100'
                          leaveTo='transform opacity-0 scale-95'>
                          <Menu.Items className='absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'>
                            <Menu.Item>
                              {({ active }) => (
                                <a
                                  href='#'
                                  className={classNames(
                                    active ? 'bg-gray-100' : '',
                                    'block px-4 py-2 text-sm text-gray-700'
                                  )}>
                                  Your Profile
                                </a>
                              )}
                            </Menu.Item>
                            <Menu.Item>
                              {({ active }) => (
                                <a
                                  href='#'
                                  className={classNames(
                                    active ? 'bg-gray-100' : '',
                                    'block px-4 py-2 text-sm text-gray-700'
                                  )}>
                                  Settings
                                </a>
                              )}
                            </Menu.Item>

                            <Menu.Item>
                              {({ active }) => (
                                <a
                                  onClick={logoutHandler}
                                  href='#'
                                  className={classNames(
                                    active ? 'bg-gray-100' : '',
                                    'block px-4 py-2 text-sm text-gray-700'
                                  )}>
                                  Sign out
                                </a>
                              )}
                            </Menu.Item>
                          </Menu.Items>
                        </Transition>
                      </Menu>
                    </div>
                  ) : (
                    <button
                      onClick={loginClickhandler}
                      className=' bg-slate-500 py-2 px-3 text-sm shadow-inner shadow-gray-700 rounded-md hover:bg-gray-500 hover:text-white duration-300'>
                      로그인
                    </button>
                  )}
                </div>
              </div>

              <Disclosure.Panel className='sm:hidden'>
                <div className='space-y-1 px-2 pt-2 pb-3'>
                  {navigation.map(item => (
                    <Disclosure.Button
                      key={item.name}
                      as='a'
                      href={item.href}
                      className={classNames(
                        item.current
                          ? 'bg-gray-900 text-white'
                          : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                        'block px-3 py-2 rounded-md text-base font-medium'
                      )}
                      aria-current={item.current ? 'page' : undefined}>
                      {item.name}
                    </Disclosure.Button>
                  ))}
                </div>
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>
        <div className='container mx-auto max-w-7xl px-2 sm:px-6 lg:px-8 flex-grow'>
          {children}
        </div>
        <footer className='p-4 bg-gray-700'>
          <div className='container mx-auto max-w-7xl px-10 sm:px-8 lg:px-20 text-right'>
            <div className='m-1'>토론은 어떤 학습능력을 키우는가? </div>
            <div className='mt-1'>contact : bulljy@naver.com</div>
            <div className='md-1'>contact : seah526@naver.com</div>
            <div className='m-1'>Copyright 2022 ⓒ All rights reserved.</div>
          </div>
        </footer>
      </div>
    </>
  );
}

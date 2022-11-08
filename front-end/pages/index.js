import axios from 'axios';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
export default function Home() {
  const router = useRouter();
  
  return (
    <div className='flex grid-cols-2 gap-10 mt-36 justify-around mx-200'>
      <div className=' w-40'></div>
      <div
        onClick={() => {
          router.push('/classes');
        }}
        className='cursor-pointer border-4 border-indigo-500/50 text-center border-dashed w-96 px-3 py-20 hover:-rotate-12  duration-300'>
        <img
          className='my-3'
          src='https://cdn.pixabay.com/photo/2017/08/15/08/16/faq-2643072_960_720.jpg'></img>

        <div className='mt-10 text-3xl font-bold'>질문하러 가기</div>
      </div>
      <div
        onClick={() => {
          router.push('/study');
        }}
        className='cursor-pointer border-4 border-indigo-500/50 text-center border-dashed w-96 p-3 hover:rotate-12  duration-300'>
        <img
          className='mt-20'
          src='https://cdn.pixabay.com/photo/2018/03/10/12/00/teamwork-3213924_960_720.jpg'></img>

        <div className='text-3xl font-bold mt-3'>스터디 찾으러 가기</div>
      </div>
      <div className=' w-40'></div>
    </div>
  );
}

import { useRouter } from 'next/router';
import React from 'react';
import StudyBox from '../../components/study/StudyBox';
import getLoginId from '../api/login';

const index = () => {
  const loginId = getLoginId();
  const router = useRouter();
  return (
    <>
      <div className='flex justify-between mt-3'>
        <div className='text-4xl my-2 font-semibold'>Community</div>
        {loginId && (
          <button
            onClick={() => {
              router.push('/makestudy');
            }}
            className='mx-3 bg-slate-500 py-2 px-16 text-base shadow-inner shadow-gray-700 rounded-md hover:bg-gray-700 hover:text-white duration-300'>
            만들기
          </button>
        )}
      </div>
      <div className='grid grid-cols-4 gap-4 mt-5'>
        <StudyBox />
        <StudyBox />
        <StudyBox />
        <StudyBox />
        <StudyBox />
        <StudyBox />
        <StudyBox />
      </div>
    </>
  );
};

export default index;

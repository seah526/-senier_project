import React from 'react';
import { useRouter } from 'next/router';
const StudyBox = () => {
  const router = useRouter();

  return (
    <div
      onClick={() => {
        router.push('/study/1');
      }}
      className='container mx-auto px-4 md:container md:mx-auto border-white border-4 border-indigo-500/75 rounded-md p-5 cursor-pointer hover:scale-105 duration-500 border-dotted'>
      <img
        src='https://cdn.pixabay.com/photo/2022/05/24/04/38/study-7217599_960_720.jpg'
        alt='img'></img>
      <div className='text-center text-xl font-bold'>name</div>
      <div>desc</div>
    </div>
  );
};

export default StudyBox;

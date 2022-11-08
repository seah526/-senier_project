import React from 'react';
import StudyBox from '../../components/study/StudyBox';

const index = () => {
  return (
    <>
      <div className='text-4xl mt-10 font-bold'>Community</div>
      <div className='grid grid-cols-4 gap-4 mt-10'>
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

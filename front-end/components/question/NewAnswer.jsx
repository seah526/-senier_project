import { useRouter } from 'next/router';
import React, { useRef } from 'react';
import axiosInstance from '../../pages/api';
import getLoginId from '../../pages/api/login';

const NewAnswer = () => {
  const router = useRouter();
  const qId = router.query.questionId;
  const contentsInput = useRef();
  const submitHandler = e => {
    const contents = contentsInput.current.value;
    e.preventDefault();
    const ans = confirm('답변을 올리시겠습니까?');
    if (ans) {
      axiosInstance.post(`questions/${qId}/answers`, {
        author: getLoginId(),
        contents,
      });
      router.reload();
    }
  };
  return (
    <form onSubmit={submitHandler}>
      <div className='mt-1'>
        <textarea
          ref={contentsInput}
          id='about'
          name='about'
          rows={5}
          className='border-2 mt-2  block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm bg-white p-3 text-black'
          placeholder='내용을 입력해 주세요'
          defaultValue={''}
        />
      </div>
      <div className=' px-4 py-3 text-right sm:px-6'>
        <button
          type='submit'
          className=' mb-10 inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'>
          답변달기
        </button>
      </div>
    </form>
  );
};

export default NewAnswer;

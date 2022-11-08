import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import ProfessorTable from '../../components/classes/ProfessorTable';
import QuestionBox from '../../components/classes/QuestionBox';
import QuestionTable from '../../components/classes/QuestionTable';
const DUMMY_DATA = {
  id: 1,
  subject: '컴퓨터네트워크',
  professor: [
    { id: 1, name: '김oo' },
    { id: 2, name: '이oo' },
    { id: 3, name: '박oo' },
  ],
  questions: [
    {
      id: 1,
      title: 'ooo에 대한 질문입니다.',
      contents: 'ooo에 대한 내용입니다.',
      createdAt: '2020-11-21',
      answerCount: 10,
      author: { id: 1, nickname: 'abc' },
      professor: { id: 1, name: '김oo' },
    },
    {
      id: 2,
      title: 'xxx에 대한 질문입니다.',
      contents: 'xxx에 대한 내용입니다.',
      createdAt: '2022-5-21',
      answerCount: 4,
      author: { id: 2, nickname: 'lmn' },
      professor: { id: 2, name: '이oo' },
    },
    {
      id: 3,
      title: 'lll에 대한 질문입니다.',
      contents: 'lll에 대한 내용입니다.',
      createdAt: '2022-1-21',
      answerCount: 6,
      author: { id: 3, nickname: 'zzz' },
      professor: { id: 2, name: '이oo' },
    },
  ],
};
const ClassId = () => {
  const router = useRouter();
  const courseId = router.query.classId;
  const [data, setData] = useState(DUMMY_DATA);
  //TODO: api fetching
  return (
    <div className='my-20 '>
      <div className='text-3xl my-2 font-semibold'>{data.subject}</div>
      <div className='flex'>
        <ProfessorTable professor={data.professor} />
        <QuestionTable data={data} />
      </div>
    </div>
  );
};

export default ClassId;

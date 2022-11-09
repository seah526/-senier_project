import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import ProfessorTable from '../../../components/classes/ProfessorTable';
import QuestionBox from '../../../components/classes/QuestionBox';
import QuestionTable from '../../../components/classes/QuestionTable';
import axiosInstance from '../../api';
import getLoginId from '../../api/login';
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
  const loginId = getLoginId();
  const router = useRouter();
  const courseId = router.query.classId;
  const professorId = router.query.professor || 1;
  const [data, setData] = useState(DUMMY_DATA);
  const [professor, setProfessor] = useState([]);
  const [question, setQuestion] = useState([]);
  const path = router.asPath;
  useEffect(() => {
    if (router.isReady) {
      axiosInstance.get(`lectures/${courseId}/questions`).then(res => {
        setQuestion(res.data);
      });
      axiosInstance.get(`lectures/${courseId}/professors`).then(res => {
        setProfessor(res.data);
      });
    }
  }, [router.isReady]);
  //TODO: api fetching
  return (
    <div className='my-20 '>
      <div className='flex justify-between'>
        <div className='text-3xl my-2 font-semibold'>{data.subject}</div>
        {loginId && (
          <button
            onClick={() => {
              router.push(
                `/classes/${courseId}/makequestion?professor=${professorId}`
              );
            }}
            className='mx-3 bg-slate-500 py-2 px-16 text-base shadow-inner shadow-gray-700 rounded-md hover:bg-gray-700 hover:text-white duration-300'>
            질문하기
          </button>
        )}
      </div>
      <div className='flex'>
        <ProfessorTable professor={professor} />
        <QuestionTable data={data} question={question} />
      </div>
    </div>
  );
};

export default ClassId;

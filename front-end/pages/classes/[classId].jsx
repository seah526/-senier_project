import { useRouter } from 'next/router';
import React from 'react';
import ProfessorTable from '../../components/classes/ProfessorTable';
import QuestionBox from '../../components/classes/QuestionBox';
import QuestionTable from '../../components/classes/QuestionTable';
const DUMMY_QUESTION = {
  createdAt: new Date(),
  id: 1,
  title: '네트워크',
  author: {
    nickname: '2je0',
  },
  contents: '제목있음',
  answerCount: 10,
};
const ClassId = () => {
  const router = useRouter();
  const courseId = router.query.classId;
  console.log(courseId);

  return (
    <div className='my-20 '>
      <div className='text-3xl my-2 font-semibold'>{'컴퓨터 네트워크'}</div>
      <div className='flex'>
        <ProfessorTable />
        <QuestionTable />
      </div>
    </div>
  );
  //   return <QuestionBox question={DUMMY_QUESTION} courseName={"소프트웨어"} />;
};

export default ClassId;

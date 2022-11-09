import React from 'react';
import AnswerSet from '../../components/question/AnswerSet';
import NewAnswer from '../../components/question/NewAnswer';
import QuestionDetailQ from '../../components/question/QuestionDetailQ';
import getLoginId from '../api/login';
const DUMMY_QUESTION = {
  author: { nickname: 'nickname' },
  date: '2019-3-4',
  contents: '질문 내용',
  title: '질문 제목',
};
const DUMMY_ANSWERS = [
  {
    createdAt: '2020-10-24',
    id: 1,
    author: { nickname: 'test@test.com' },
    date: '2020-10-24',
    contents: '답변 내용',
  },
  {
    createdAt: '2020-10-24',
    id: 2,
    author: { nickname: 'nickname' },
    date: '2020-10-25',
    contents: '답변 내용',
  },
];
const questionId = () => {
  const loginId = getLoginId();
  return (
    <div>
      <QuestionDetailQ question={DUMMY_QUESTION} />
      <AnswerSet answers={DUMMY_ANSWERS} />
      {loginId && <NewAnswer />}
    </div>
  );
};

export default questionId;
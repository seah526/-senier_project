import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import LoadingBox from '../../components/loading/LoadingBox';
import AnswerSet from '../../components/question/AnswerSet';
import NewAnswer from '../../components/question/NewAnswer';
import QuestionDetailQ from '../../components/question/QuestionDetailQ';
import axiosInstance from '../api';
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
const a = [
  {
    id: 2,
    quetionId: 1,
    author: 'seah',
    contents: 'i dont know22',
    createdAt: '2022-11-19 13:08:58',
  },
  {
    id: 3,
    quetionId: 1,
    author: 'seah213',
    contents: 'i dont know22',
    createdAt: '2022-11-19 13:09:30',
  },
  {
    id: 4,
    quetionId: 1,
    author: 'seah213',
    contents: 'i dont know22',
    createdAt: '2022-11-19 14:14:00',
  },
];
const questionId = () => {
  const loginId = getLoginId();
  const [qdata, setQData] = useState(DUMMY_QUESTION);
  const [adata, setAData] = useState(DUMMY_ANSWERS);
  const router = useRouter();
  const qId = router.query.questionId;
  const [isLoadingA, setIsLoadingA] = useState(true);
  const [isLoadingB, setIsLoadingB] = useState(true);
  useEffect(() => {
    if (router.isReady) {
      axiosInstance.get(`questions/${qId}`).then(res => {
        res.data[0].author = {};
        res.data[0].author.nickname = res.Author || '익명';
        res.data[0].date = res.createdAt || '2022-11-23';
        setQData(res.data[0]);
      });

      setIsLoadingA(false);
    }
  }, [router.isReady]);
  useEffect(() => {
    if (router.isReady) {
      axiosInstance.get(`questions/${qId}/answers`).then(res => {
        res.data.map(ele => {
          ele.date = ele.createdAt;
          ele.author = { nickname: ele.author };
        });
        setAData(res.data);
      });
      setIsLoadingB(false);
    }
  }, [router.isReady]);
  return (
    <div>
      {isLoadingA ? <LoadingBox /> : <QuestionDetailQ question={qdata} />}
      {isLoadingB ? <LoadingBox /> : <AnswerSet answers={adata} />}
      {loginId && <NewAnswer />}
    </div>
  );
};

export default questionId;

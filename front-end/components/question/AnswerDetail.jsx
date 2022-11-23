import { useRouter } from 'next/router';
import React from 'react';
import styled from 'styled-components';
import axiosInstance from '../../pages/api';
import getLoginId from '../../pages/api/login';

const AnswerDetail = ({ answers }) => {
  const date = new Date(answers?.createdAt);
  const loginId = getLoginId();
  const router = useRouter();
  const deleteQuestionHandler = e => {
    const ans = confirm('정말 삭제하시겠습니까?');
    if (ans) {
      axiosInstance.delete(`answer`, {
        data: {
          answerID: answers.id,
          questionID: answers.quetionId,
          author: answers.author.nickname,
        },
      });
      router.reload();
    }
  };
  return (
    <div>
      <Wrapper>
        <div className='flex justify-between'>
          <div className='title'>
            <span className='a-title'>A. </span>
          </div>
          {loginId == answers.author.nickname && (
            <button
              onClick={deleteQuestionHandler}
              className='text-lg mr-2 cursor-pointer'>
              x
            </button>
          )}
        </div>

        <div className='title-date'>
          {answers?.author.nickname} · {date.toLocaleString()}
        </div>
        <div className='contents'>{answers?.contents || '내용없음'}</div>
      </Wrapper>
    </div>
  );
};

export default AnswerDetail;

const Wrapper = styled.div`
  /* width: 800px; */
  margin: 1.5rem auto;
  border: 1px solid #e9ecef;
  border-radius: 1.5rem;
  padding: 1rem;
  .title {
    font-size: 1.5rem;
    font-weight: bold;
  }
  .a-title {
    font-family: 'Gugi';
    color: #086ac5;
  }
  .q-title {
    font-family: 'Gugi';
    color: #ea0000;
  }
  .title-date {
    border-bottom: 1px solid #adb5bd;
    color: #adb5bd;
    padding: 7px 0;
    margin-bottom: 20px;
  }
  .contents {
    line-height: 1.7;
  }
`;

import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

const QuestionBox = ({ question, courseName, professor }) => {
  const router = useRouter();

  const handleClick = questionId => {
    router.push(`/questions/${questionId}`);
  };

  const [timeBefore, setTimeBefore] = useState('');
  useEffect(() => {
    const now = new Date();
    const createTime = new Date(question.createdAt);
    const yearDiff = now.getFullYear() - createTime.getFullYear();
    const monthDiff = now.getMonth() - createTime.getMonth();
    const dayDiff = now.getDay() - createTime.getDay();
    const hourDiff = now.getHours() - createTime.getHours();
    const minDiff = now.getMinutes() - createTime.getMinutes();
    const secDiff = now.getSeconds() - createTime.getSeconds();
    if (yearDiff) setTimeBefore(`${yearDiff}년 전`);
    else if (monthDiff) setTimeBefore(`${monthDiff}달 전`);
    else if (dayDiff) setTimeBefore(`${dayDiff}일 전`);
    else if (hourDiff) setTimeBefore(`${hourDiff}시간 전`);
    else if (minDiff) setTimeBefore(`${minDiff}분 전`);
    else setTimeBefore(`${secDiff}초 전`);
  }, [question.createdAt]);
  return (
    <Wapper
      onClick={() => {
        handleClick(question.id);
      }}>
      <div className='left  min-w-max'>
        <header className='title'>{question.title || '제목없음'}</header>
        <section className='contents'>{question.contents}</section>
        <div className='info'>
          {`${question.author.nickname} · ${timeBefore} · ${courseName} · ${question.professor.name} 교수님`}
        </div>
      </div>
      <div className='right min-w-max'>
        <div className='circle'>
          {question.answerCount}
          <div className='circle-text'>답변</div>
        </div>
      </div>
    </Wapper>
  );
};

export default QuestionBox;
const Wapper = styled.li`
  margin: auto;
  :hover {
    background-color: gray;
    transition: 0.3s;
  }
  cursor: pointer;
  padding: 20px;
  border-bottom: 1px solid #dee2e6;
  display: flex;
  list-style: none;
  text-overflow: ellipsis;
  .left {
    width: 85%;
  }
  .right {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 15%;
  }
  .title {
    font-weight: bold;
  }
  .contents {
    font-size: 0.8rem;
    color: #616568;
    margin: 10px 0;

    text-overflow: ellipsis;
    overflow: hidden;
    word-break: break-word;

    display: -webkit-box;
    -webkit-line-clamp: 3; // 원하는 라인수
    -webkit-box-orient: vertical;
  }
  .info {
    font-size: 0.8rem;
    color: white;
  }
  .circle {
    border: 1px solid #dee2e6;
    width: 60px;
    height: 60px;
    border-radius: 60px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .circle-text {
    font-size: 0.7rem;
  }
`;

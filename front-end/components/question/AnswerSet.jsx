// import { Container } from 'pages/questions/[questionId]';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import AnswerDetail from './AnswerDetail';

const AnswerSet = ({ answers }) => {
  const [orderedAnswer, setorderedAnswer] = useState([]);
  useEffect(() => {
    const orderedDate = answers?.sort(
      (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
    );
    setorderedAnswer(orderedDate);
  }, [answers]);
  return (
    <Wrapper>
      <div>
        <div className='answer-desc'>
          총 {answers?.length}개의 답변이 달렸습니다.
        </div>
      </div>
      {orderedAnswer?.map(answer => {
        return <AnswerDetail key={answer?.id} answers={answer} />;
      })}
    </Wrapper>
  );
};

export default AnswerSet;
const Wrapper = styled.div`
  margin: 2rem auto;
  .answer-desc {
    /* width: 800px; */
    margin: 1rem auto;
    font-weight: bold;
    padding-left: 1rem;
    font-size: 1.2rem;
  }
`;

import React from 'react';
import styled from 'styled-components';

const AnswerDetail = ({ answers }) => {
  const date = new Date(answers?.createdAt);
  return (
    <div>
      <Wrapper>
        <div className='title'>
          <span className='a-title'>A. </span>
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

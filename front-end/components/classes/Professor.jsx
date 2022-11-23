import React from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/router';
const Professor = ({ data }) => {
  const router = useRouter();
  const path = router.query.classId;
  const handleClick = id => {
    router.replace({ pathname: path, query: { professor: data.id } });
  };
  return (
    <Wapper
      active={router.query.professor == data.id ? 'gray' : ''}
      onClick={() => {
        handleClick(data.id);
      }}>
      <div>{`${data.name}${data.id == -1 ? '' : ' 교수님'}`}</div>
    </Wapper>
  );
};

export default Professor;
const Wapper = styled.li`
  :hover {
    background-color: gray;
    transition: 0.3s;
  }
  &:active {
    background-color: gray;
  }
  cursor: pointer;
  padding: 10px;
  border-bottom: 1px solid #dee2e6;
  display: flex;
  width: 150px;
  list-style: none;
  text-overflow: ellipsis;
  background-color: ${porps => porps.active};
`;

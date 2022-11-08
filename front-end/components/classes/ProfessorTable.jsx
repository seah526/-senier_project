import React from 'react';
import Professor from './Professor';
const DUMMY = [
  { name: '김ㅇㅇ', id: 1 },
  { name: '이ㅇㅇ', id: 2 },
  { name: '박ㅇㅇ', id: 3 },
  { name: '최ㅇㅇ', id: 4 },
];
const ProfessorTable = () => {
  return (
    <div className='mr-10 mt-10'>
      {DUMMY.map(ele => {
        return <Professor key={ele.id} data={ele} />;
      })}
    </div>
  );
};

export default ProfessorTable;

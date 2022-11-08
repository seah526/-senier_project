import React from 'react';
import Professor from './Professor';

const ProfessorTable = ({ professor }) => {
  return (
    <div className='mr-10 mt-10'>
      <Professor key={-1} data={{ id: -1, name: '전체보기' }} />
      {professor.map(ele => {
        return <Professor key={ele.id} data={ele} />;
      })}
    </div>
  );
};

export default ProfessorTable;

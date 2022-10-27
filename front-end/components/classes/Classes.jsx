import React from "react";
import Link from "next/link";
const Classes = (props) => {
  const { header, classes } = props.data;
  return (
    <div className='my-20'>
      <div className='text-2xl my-5'>{header}</div>
      <div className='grid grid-cols-4 gap-4'>
        {classes.map((ele) => {
          return (
            <Link href={`/classes/${ele.id}`}>
              <button
                key={ele.id}
                className='mx-3 bg-slate-500 py-2 px-3 text-lg shadow-inner shadow-gray-700 rounded-md hover:bg-gray-700 hover:text-white'>
                {ele.subject}
              </button>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Classes;

import axios from 'axios';
import { useEffect, useState } from 'react';
export default function Home() {
  const [data, setData] = useState(null);
  useEffect(()=>{axios.get('http://localhost:3000/lectures').then(res => {
    setData(res.data);
    console.log(res.data);
  });},[])
  
  return (
    <>
      <h1 className='text-3xl font-bold underline'> </h1>
      <div>{data?.map(ele => ele.title)}</div>
    </>
  );
}

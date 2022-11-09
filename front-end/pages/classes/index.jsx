import React from 'react';
import Classes from '../../components/classes/Classes';
import axiosInstance from '../api/index';
import { useState, useEffect } from 'react';
import LoadingBox from '../../components/loading/LoadingBox';

const index = () => {
  const [data1, setData1] = useState([]);
  const [data2, setData2] = useState([]);
  const [data3, setData3] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    axiosInstance.get('lectures').then(res => {
      setData1(
        res.data.filter(ele => {
          return ele.type == 0;
        })
      );
      setData2(
        res.data.filter(ele => {
          return ele.type == 1;
        })
      );
      setData3(
        res.data.filter(ele => {
          return ele.type == 2;
        })
      );
      setIsLoading(false);
    });
  }, []);
  if (isLoading) return <LoadingBox />;
  return (
    <div>
      <Classes key={'전공필수'} type={'전공필수'} data={data1} />
      <Classes key={'전공일반'} type={'전공일반'} data={data2} />
      <Classes key={'실험 및 실습'} type={'실험 및 실습'} data={data3} />
    </div>
  );
};

export default index;

import React from 'react';
import Classes from '../../components/classes/Classes';
import axiosInstance from '../api/index';
import { useState, useEffect } from 'react';
const DUMMY_DATA1 = {
  header: '전공필수',
  classes: [
    { id: 1, subject: '네트워크' },
    { id: 2, subject: '네트워크' },
    { id: 3, subject: '네트워크' },
    { id: 4, subject: '네트워크' },
    { id: 5, subject: '네트워크' },
    { id: 6, subject: '네트워크' },
  ],
};
const DUMMY_DATA2 = {
  header: '전공일반',
  classes: [
    { id: 1, subject: '네트워크' },
    { id: 2, subject: '네트워크' },
    { id: 3, subject: '네트워크' },
    { id: 4, subject: '네트워크' },
    { id: 5, subject: '네트워크' },
    { id: 6, subject: '네트워크' },
  ],
};

const index = () => {
  const [data1, setData1] = useState([]);
  const [data2, setData2] = useState([]);
  const [data3, setData3] = useState([]);
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
    });
  }, []);
  return (
    <div>
      <Classes key={'전공필수'} type={'전공필수'} data={data1} />
      <Classes key={'전공일반'} type={'전공일반'} data={data2} />
      <Classes key={'실험 및 실습'} type={'실험 및 실습'} data={data3} />
    </div>
  );
};

export default index;

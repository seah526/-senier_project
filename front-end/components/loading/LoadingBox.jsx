import React from 'react';
import styled from 'styled-components';

const LoadingBox = () => {
  return (
    <Box>
      <img
        src='https://mblogthumb-phinf.pstatic.net/MjAxODEwMjNfNjAg/MDAxNTQwMjg2OTk2NTcw.mfWKPtzKVO1mJaBBIFKIkVBlMQQIF1Vc-yrlbbGaoP0g.KNJWAgMmhsfQrZI3n0UT-LMi_qpHAZls4qPMvbNaJBcg.GIF.chingguhl/Spinner-1s-200px.gif?type=w800'
        alt='loading'
      />
    </Box>
  );
};

export default LoadingBox;
const Box = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 300px;
  img {
    width: 100px;
  }
`;

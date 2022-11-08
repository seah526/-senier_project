import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import getLoginId from '../../pages/api/login';
import LogInForm from './LoginForm';

function LoginModal({ show, onClose, onOpenSignUp, children }) {
  const [isBrowser, setIsBrowser] = useState(false);
  const loginId = getLoginId();
  useEffect(() => {
    setIsBrowser(true);
  }, []);

  const handleCloseClick = e => {
    e.preventDefault();
    onClose();
  };

  const modalContent = show ? (
    <StyledModalOverlay>
      <StyledModal>
        <StyledModalHeader>
          <div>
            <span className='cursor-pointer' onClick={handleCloseClick}>
              x
            </span>
          </div>
        </StyledModalHeader>

        <StyledModalBody>
          <LogInForm onClose={onClose} onOpenSignUp={onOpenSignUp} />
        </StyledModalBody>
      </StyledModal>
      <Backdrop onClick={handleCloseClick} />
    </StyledModalOverlay>
  ) : null;
  if (loginId) return null;
  if (isBrowser) {
    const portalDiv = document.getElementById('modal-root');
    return ReactDOM.createPortal(modalContent, portalDiv);
  } else {
    return null;
  }
}

export default LoginModal;

const StyledModalBody = styled.div`
  h1 {
    color: black;
    margin: 0;
  }
`;

const StyledModalHeader = styled.div`
  color: black;
  display: flex;
  justify-content: flex-end;
  font-size: 30px;
`;

const StyledModal = styled.div`
  z-index: 2;
  background: white;
  width: 450px;
  height: 450px;
  border-radius: 15px;
  padding: 40px 60px;
`;

const StyledModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Backdrop = styled.div`
  background-color: rgba(0, 0, 0, 0.5);
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;

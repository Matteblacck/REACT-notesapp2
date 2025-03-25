import styled from 'styled-components';
import Button from './Button'

// styled
const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContainer = styled.div`
  background: black;
  padding: 1.5rem;
  border-radius: 8px;
  width: 300px;
  text-align: center;
`;

const ModalButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 1rem;
  margin-left:2rem;
  margin-right:2rem;
`;
//styled^

interface ModalProps {
    onConfirm: () => void
    onCancel: () => void
}

const Modal: React.FC<ModalProps> = ({ onConfirm, onCancel }) => {
  return (
    <ModalOverlay>
      <ModalContainer>
        <div>You sure you want to delete this note?</div>
        <ModalButtonContainer>
            <Button style={{ border: "1px solid #4CAF50", color: "#4CAF50" }} onClick={onConfirm}>
            Ye
            </Button>
            <Button style={{ border: "1px solid #E74C3C", color: "#E74C3C" }} onClick={onCancel}>
            Nuuh
            </Button>
        </ModalButtonContainer>
      </ModalContainer>
    </ModalOverlay>
  );
};

export default Modal;
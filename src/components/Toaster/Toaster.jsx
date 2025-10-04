import { Toast, ToastContainer } from "react-bootstrap";

export const Toaster = ({ message, onClose, delay = 3000 }) => {
  return (
    <ToastContainer position="top-center">
      <Toast onClose={onClose} delay={delay} autohide>
        <Toast.Header>
          <strong>Github Finder</strong>
        </Toast.Header>
        <Toast.Body>{message}</Toast.Body>
      </Toast>
    </ToastContainer>
  );
};

import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
const ModalResult = (props) => {
  const { show, setShow, dataModal } = props;
  const handleClose = () => setShow(false);
  return (
    <>
      <Modal show={show} onHide={handleClose} backdrop="static">
        <Modal.Header closeButton>
          <Modal.Title>Your result:</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            Total question: <b>{dataModal.countTotal}</b>
          </div>
          <div>
            Total correct answer: <b>{dataModal.countCorrect}</b>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Show Answer
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalResult;

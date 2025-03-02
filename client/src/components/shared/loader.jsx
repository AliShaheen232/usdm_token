import React from "react";
import { Modal, Spinner } from "react-bootstrap";
import loader_gif from "../../assets/images/loader.gif"

const Loader = (props) => {
  return (
    <div>
      <Modal
        show={props.isShow}
        //   onHide={toggleInvestModal}
        animation={true}
        centered
        className="my-modal"
        size="lg"
      >
        <Modal.Body >
          <div className="loader-body" >
              <img src={loader_gif} alt="" className="src" width={300}/>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default Loader;

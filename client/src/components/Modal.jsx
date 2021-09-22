import React from 'react'
import { Modal, Button } from 'react-bootstrap';

export default function ModalController(props) {
    return (
        <Modal show={props.show} onHide={props.handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Log In Information</Modal.Title>
        </Modal.Header>
        <Modal.Body>{props.message}</Modal.Body>
      </Modal>
    );
};

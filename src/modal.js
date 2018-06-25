import React, { Component } from 'react';
import { Popover, Tooltip, Modal } from 'react-bootstrap';

export default class ModalPopup extends Component {
  constructor(props, context) {
    super(props, context);

    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);

    this.state = {
      show: false
    };
  }

  handleClose() {
    this.setState({ show: false });
  }

  handleShow() {
    this.setState({ show: true });
  }

  toggleModal = () => {
    this.setState({
      show: !this.state.show
    });
  }

  render() {
    return (
      <div>
        <button onClick={this.toggleModal}>
          Submit Nomination
        </button>

        <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Nomination Form</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <textarea rows="1" cols="60">Enter the name of the person you wish to nominate.</textarea>
            <textarea rows="4" cols="60">Enter a description about the person you wish to nominate. (Max 250 characters)</textarea>
            <p class="create_nom_popup">Country:
              <select>
                <option value="canada">Canada</option>
                <option value="us">US</option>
                <option value="uk">UK</option>
                <option value="australia">Australia</option>
              </select>
            </p>
            <textarea rows="1" cols="60">Add relevant tags to submission</textarea>
            <p class="create_nom_popup">Submit Nomination</p>
            <button onClick={this.toggleModal}>Cancel</button>
          </Modal.Body>
        </Modal>
      </div>
    );
  }
}
import React, { Component } from 'react';
import { Popover, Tooltip, Modal, FormGroup, ControlLabel, FormControl, HelpBlock } from 'react-bootstrap';
import axios from 'axios';

function FieldGroup({ id, label, help, ...props }) {
  return (
    <FormGroup controlId={id}>
      <ControlLabel>{label}</ControlLabel>
      <FormControl {...props} />
      {help && <HelpBlock>{help}</HelpBlock>}
    </FormGroup>
  );
}

export default class SubmitModal extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      show: false,
      name: "",
      description: "",
      country: "Canada",
      province: "Alberta",
      tags: ""
    };
  }

  resetDefaults = () => {
    this.setState({ name: "" })
    this.setState({ description: "" })
    this.setState({ country: "Canada" })
    this.setState({ province: "Alberta" })
    this.setState({ tags: "" })
  }

  handleClose = () => {
    this.setState({ show: false });
    this.resetDefaults()
  }

  handleShow = () => {
    this.setState({ show: true });
  }

  handleNameChange = (e) => {
    this.setState({ name: e.target.value });
  }

  handleDescChange = (e) => {
    this.setState({ description: e.target.value });
  }

  handleCountryChange = (e) => {
    this.setState({ country: e.target.value });
  }

  handleProvinceChange = (e) => {
    this.setState({ province: e.target.value });
  }

  handleTagsChange = (e) => {
    this.setState({ tags: e.target.value });
  }

  toggleModal = () => {
    this.setState({
      show: !this.state.show
    });
    if (this.state.show == false) {
      this.resetDefaults()
    }
  }

  submitNom = () => {
    var bodyFormData = new FormData();
    bodyFormData.set('name', this.state.name)
    bodyFormData.set('description', this.state.description)
    bodyFormData.set('country', this.state.country)
    bodyFormData.set('province', this.state.province)
    bodyFormData.set('tags', this.state.tags)
    axios({
    method: 'post',
    url: 'https://fast-cove-41298.herokuapp.com/nominations',
    data: bodyFormData,
    config: { headers: {'Content-Type': 'multipart/form-data' }}
    })
    .then(function (response) {
        //handle success
        console.log(response);
    })
    .catch(function (response) {
        //handle error
        console.log(response);
    });
    this.toggleModal()
  }

  render() {
    return (
      <div>
        <button onClick={this.toggleModal}>
          Submit Nomination
        </button>

        <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Submit Nomination Form</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <FieldGroup
              id="formControlsText"
              type="text"
              label="Name"
              placeholder="Enter the name of the person you wish to nominate."
              value={this.state.name}
              onChange={this.handleNameChange}
            />
            <FieldGroup
              id="formControlsText"
              type="text"
              label="Description"
              placeholder="Enter a description about the person you wish to nominate. (Max 250 characters)"
              value={this.state.description}
              onChange={this.handleDescChange}
            />
            <FieldGroup
              id="formControlsFile"
              type="file"
              label="Picture"
              help="Submit a picture of the person you wish to nominate."
            />
            <FormGroup controlId="formControlsSelect">
              <ControlLabel>Country</ControlLabel>
              <FormControl componentClass="select" placeholder="select" value={this.state.country} onChange={this.handleCountryChange}>
                <option value="Canada">Canada</option>
                <option value="United States">United States</option>
                <option value="United Kingdom">United Kingdom</option>
                <option value="Australia">Australia</option>
              </FormControl>
            </FormGroup>
            <FormGroup controlId="formControlsSelect">
              <ControlLabel>Province (CAN)</ControlLabel>
              <FormControl componentClass="select" placeholder="select" value={this.state.province} onChange={this.handleProvinceChange}>
                <option value="Alberta">Alberta</option>
                <option value="British Columbia">British Columbia</option>
                <option value="Manitoba">Manitoba</option>
                <option value="New Brunswick">New Brunswick</option>
                <option value="Newfoundland and Labrador">Newfoundland and Labrador</option>
                <option value="Northwest Territories">Northwest Territories</option>
                <option value="Nova Scotia">Nova Scotia</option>
                <option value="Nunavut">Nunavut</option>
                <option value="Ontario">Ontario</option>
                <option value="Prince Edward Island">Prince Edward Island</option>
                <option value="Quebec">Quebec</option>
                <option value="Saskatchewan">Saskatchewan</option>
                <option value="Yukon">Yukon</option>
              </FormControl>
            </FormGroup>
            {/*<FormGroup controlId="formControlsSelect">
              <ControlLabel>State (US)</ControlLabel>
              <FormControl componentClass="select" placeholder="select" value={this.state.province} onChange={this.handleProvinceChange}>
                <option value="Alabama">Alabama</option>
                <option value="Alaska">Alaska</option>
                <option value="Arizona">Arizona</option>
                <option value="Arkansas">Arkansas</option>
                <option value="California">California</option>
                <option value="Colorado">Colorado</option>
                <option value="Connecticut">Connecticut</option>
                <option value="Delaware">Delaware</option>
                <option value="Florida">Florida</option>
                <option value="Georgia">Georgia</option>
                <option value="Hawaii">Hawaii</option>
                <option value="Idaho">Idaho</option>
                <option value="Illinois">Illinois</option>
                <option value="Indiana">Indiana</option>
                <option value="Iowa">Iowa</option>
                <option value="Kansas">Kansas</option>
                <option value="Kentucky">Kentucky</option>
                <option value="Louisiana">Louisiana</option>
                <option value="Maine">Maine</option>
                <option value="Maryland">Maryland</option>
                <option value="Massachusetts">Massachusetts</option>
                <option value="Michigan">Michigan</option>
                <option value="Minnesota">Minnesota</option>
                <option value="Mississippi">Mississippi</option>
                <option value="Missouri">Missouri</option>
                <option value="Montana">Montana</option>
                <option value="Nebraska">Nebraska</option>
                <option value="Nevada">Nevada</option>
                <option value="New Hampshire">New Hampshire</option>
                <option value="New Jersey">New Jersey</option>
                <option value="New Mexico">New Mexico</option>
                <option value="New York">New York</option>
                <option value="North Carolina">North Carolina</option>
                <option value="North Dakota">North Dakota</option>
                <option value="Ohio">Ohio</option>
                <option value="Oklahoma">Oklahoma</option>
                <option value="Oregon">Oregon</option>
                <option value="Pennsylvania">Pennsylvania</option>
                <option value="Rhode Island">Rhode Island</option>
                <option value="South Carolina">South Carolina</option>
                <option value="South Dakota">South Dakota</option>
                <option value="Tennessee">Tennessee</option>
                <option value="Texas">Texas</option>
                <option value="Utah">Utah</option>
                <option value="Vermont">Vermont</option>
                <option value="Virginia">Virginia</option>
                <option value="Washington">Washington</option>
                <option value="West Virginia">West Virginia</option>
                <option value="Wisconsin">Wisconsin</option>
                <option value="Wyoming">Wyoming</option>
              </FormControl>
            </FormGroup>
            <FormGroup controlId="formControlsSelect">
              <ControlLabel>Country (UK)</ControlLabel>
              <FormControl componentClass="select" placeholder="select" value={this.state.province} onChange={this.handleProvinceChange}>
                <option value="England">England</option>
                <option value="Northern Ireland">Northern Ireland</option>
                <option value="Scotland">Scotland</option>
                <option value="Wales">Wales</option>
              </FormControl>
            </FormGroup>
            <FormGroup controlId="formControlsSelect">
              <ControlLabel>Province (AUS)</ControlLabel>
              <FormControl componentClass="select" placeholder="select" value={this.state.province} onChange={this.handleProvinceChange}>
                <option value="Central Australia">Central Australia</option>
                <option value="New South Wales">New South Wales</option>
                <option value="North Australia">North Australia</option>
                <option value="Queensland">Queensland</option>
                <option value="South Australia">South Australia</option>
                <option value="Tasmania">Tasmania</option>
                <option value="Victoria">Victoria</option>
                <option value="Western Australia">Western Australia</option>
              </FormControl>
            </FormGroup>*/}
            <FieldGroup
              id="formControlsText"
              type="text"
              label="Tags"
              placeholder="Add relevant tags to submission (ex. #community, #charity)"
              value={this.state.tags}
              onChange={this.handleTagsChange}
            />
          </Modal.Body>
          <Modal.Footer>
            <button type="button" class="btn btn-danger" onClick={this.toggleModal}>Cancel</button>
            <button type="button" class="btn btn-success" onClick={this.submitNom}>Submit</button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}
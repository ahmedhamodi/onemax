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
      tags: "",
      can_prov: ['Alberta', 'British Columbia', 'Manitoba', 'New Brunswick', 'Newfoundland and Labrador', 'Northwest Territories', 'Nova Scotia', 'Nunavut', 'Ontario', 'Prince Edward Island', 'Quebec', 'Saskatchewan', 'Yukon Territory'],
      us_prov: ['Alabama','Alaska','American Samoa','Arizona','Arkansas','California','Colorado','Connecticut','Delaware','District of Columbia','Federated States of Micronesia','Florida','Georgia','Guam','Hawaii','Idaho','Illinois','Indiana','Iowa','Kansas','Kentucky','Louisiana','Maine','Marshall Islands','Maryland','Massachusetts','Michigan','Minnesota','Mississippi','Missouri','Montana','Nebraska','Nevada','New Hampshire','New Jersey','New Mexico','New York','North Carolina','North Dakota','Northern Mariana Islands','Ohio','Oklahoma','Oregon','Palau','Pennsylvania','Puerto Rico','Rhode Island','South Carolina','South Dakota','Tennessee','Texas','Utah','Vermont','Virgin Island','Virginia','Washington','West Virginia','Wisconsin','Wyoming'],
      uk_prov: ["England", "Northern Ireland", "Scotland", "Wales"],
      aus_prov: ["Central Australia", "New South Wales", "North Australia", "Queensland", "South Australia", "Tasmania", "Victoria", "Western Australia"],
      active_prov: ['Alberta', 'British Columbia', 'Manitoba', 'New Brunswick', 'Newfoundland and Labrador', 'Northwest Territories', 'Nova Scotia', 'Nunavut', 'Ontario', 'Prince Edward Island', 'Quebec', 'Saskatchewan', 'Yukon Territory'],
      active_prov_label: "Province"
    };
  }

  resetDefaults = () => {
    this.setState({ name: "", description: "", country: "Canada", province: "Alberta", tags: "", active_prov: this.state.can_prov, active_prov_label: "Province" })
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
    if (e.target.value == "Canada") {
      this.setState({ active_prov: this.state.can_prov, active_prov_label: "Provinces" })
    } else if (e.target.value == "United States") {
      this.setState({ active_prov: this.state.us_prov, active_prov_label: "States" })
    } else if (e.target.value == "United Kingdom") {
      this.setState({ active_prov: this.state.uk_prov, active_prov_label: "Provinces" })
    } else {
      this.setState({ active_prov: this.state.aus_prov, active_prov_label: "Provinces" })
    }
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
    .catch(function (response) {
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
              <ControlLabel>{ this.state.active_prov_label }</ControlLabel>
              <FormControl componentClass="select" placeholder="select" value={this.state.province} onChange={this.handleProvinceChange}>
                {this.state.active_prov.map(prov => <option value={ prov }> { prov } </option>) }
              </FormControl>
            </FormGroup>

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
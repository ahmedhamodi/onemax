import React, { Component } from 'react';
import { Modal, FormGroup, ControlLabel, FormControl, HelpBlock, Glyphicon } from 'react-bootstrap';
import { toast } from 'react-toastify';
import Cropper from 'react-cropper';
import 'cropperjs/dist/cropper.css';
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

const max_description = 400

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
      us_prov: ['Alabama', 'Alaska', 'American Samoa', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware', 'District of Columbia', 'Federated States of Micronesia', 'Florida', 'Georgia', 'Guam', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Marshall Islands', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'North Dakota', 'Northern Mariana Islands', 'Ohio', 'Oklahoma', 'Oregon', 'Palau', 'Pennsylvania', 'Puerto Rico', 'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virgin Island', 'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'],
      eng_prov: ["East Midlands", "East of England", "London", "North East", "North West", "South East", "South West", "West Midlands", "Yorkshire and the Humber"],
      aus_prov: ["Central Australia", "New South Wales", "North Australia", "Queensland", "South Australia", "Tasmania", "Victoria", "Western Australia"],
      active_prov: ['Alberta', 'British Columbia', 'Manitoba', 'New Brunswick', 'Newfoundland and Labrador', 'Northwest Territories', 'Nova Scotia', 'Nunavut', 'Ontario', 'Prince Edward Island', 'Quebec', 'Saskatchewan', 'Yukon Territory'],
      active_prov_label: "Provinces",
      image: '',
      crop: {
        aspect: 1 / 1
      },
      croppedImg: "",
      chars_left: max_description
    };
  }

  resetDefaults = () => {
    this.setState({ name: "", description: "", country: "Canada", province: "Alberta", tags: "", active_prov: this.state.can_prov, active_prov_label: "Provinces", "image": "", "croppedImg": "", chars_left: max_description })
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

    this.setState({
      description: e.target.value,
      chars_left: max_description - e.target.value.length
    });
  }

  handleCountryChange = (e) => {
    this.setState({ country: e.target.value });
    if (e.target.value === "Canada") {
      this.setState({ active_prov: this.state.can_prov, active_prov_label: "Provinces", province: "Alberta" })
    } else if (e.target.value === "United States") {
      this.setState({ active_prov: this.state.us_prov, active_prov_label: "States", province: "Alabama" })
    } else if (e.target.value === "England") {
      this.setState({ active_prov: this.state.eng_prov, active_prov_label: "Provinces", province: "East Midlands" })
    } else {
      this.setState({ active_prov: this.state.aus_prov, active_prov_label: "Provinces", province: "Central Australia" })
    }
  }

  handleProvinceChange = (e) => {
    this.setState({ province: e.target.value });
  }

  handleTagsChange = (e) => {
    this.setState({ tags: e.target.value });
  }

  toggleModal = () => {
    if (this.props.isLoggedIn) {
      this.setState({
        show: !this.state.show
      });
      if (this.state.show === false) {
        this.resetDefaults()
      }
    } else {
      this.props.promptForLogin();
      this.resetDefaults();
    }
  }

  addFile = e => {
    if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader()
      reader.addEventListener(
        'load',
        () =>
          this.setState({
            image: reader.result,
          }),
        false
      )
      reader.readAsDataURL(e.target.files[0])
    }
  }

  _crop() {
    this.setState({
      croppedImg: this.refs.cropper.getCroppedCanvas().toDataURL()
    });
  }

  submitNom = () => {
    var bodyFormData = new FormData();
    bodyFormData.set('name', this.state.name)
    bodyFormData.set('description', this.state.description)
    bodyFormData.set('country', this.state.country)
    bodyFormData.set('province', this.state.province)
    bodyFormData.set('tags', this.state.tags)
    bodyFormData.set('userID', this.props.userID)
    bodyFormData.set('file', this.state.croppedImg)
    axios({
      method: 'post',
      url: 'https://fast-cove-41298.herokuapp.com/nominations',
      data: bodyFormData,
      config: { headers: { 'Content-Type': 'multipart/form-data' } }
    })
    .catch(function (response) {
      console.error(response);
      toast.error("Nominee submission unsuccessful. Missing mandatory fields!", {
        position: toast.POSITION.TOP_LEFT
      });
    });
    this.toggleModal()
  }

  render() {
    return (
      <div>
        <button onClick={this.toggleModal} className="action-button">
          <Glyphicon glyph="glyphicon glyphicon-plus" /> Submit Nomination
        </button>

        <Modal dialogClassName="submit_modal" show={this.state.show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title><h3><b>Submit Nomination Form</b></h3></Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h4><FieldGroup
              id="formControlsText"
              type="text"
              label={"Name *"}
              placeholder="Enter the name of the person you wish to nominate."
              value={this.state.name}
              onChange={this.handleNameChange}
            /></h4>

            <FormGroup controlId="formControlsTextarea">
              <h4><ControlLabel>Description *</ControlLabel></h4>
              <FormControl componentClass="textarea" placeholder="Enter a description about the person you wish to nominate. (Max 400 characters)"
                value={this.state.description}
                onChange={this.handleDescChange}
                maxLength={max_description}
              />
              <div className="chars_left">Characters Left: {this.state.chars_left}</div>
            </FormGroup>

            <FormGroup>
              <ControlLabel htmlFor="fileUpload" style={{ cursor: "pointer" }}><h4><ControlLabel bsStyle="success"><br/>Submit Picture</ControlLabel></h4>
                <input type="file" onChange={this.addFile} />
              </ControlLabel>
            </FormGroup>

            <Cropper
              ref='cropper'
              src={this.state.image}
              style={{ 'max-height': 400, width: '100%' }}
              // Cropper.js options
              aspectRatio={1 / 1}
              guides={false}
              crop={this._crop.bind(this)} />

            {this.state.croppedImg !== '' ? <div><h5><br/><br/><b>Preview:</b></h5> <img src={this.state.croppedImg} alt={this.state.image} style={{ height: 400 }} /><br/><br/></div> : null}


            <FormGroup controlId="formControlsSelect">
              <h4><ControlLabel>Country *</ControlLabel></h4>
              <FormControl componentClass="select" placeholder="select" value={this.state.country} onChange={this.handleCountryChange}>
                <option value="Canada">Canada</option>
                <option value="England">England</option>
                <option value="United States">United States</option>
                <option value="Australia">Australia</option>
              </FormControl>
            </FormGroup>

            <FormGroup controlId="formControlsSelect">
              <h4><ControlLabel>{this.state.active_prov_label + " *"}</ControlLabel></h4>
              <FormControl componentClass="select" placeholder="select" value={this.state.province} onChange={this.handleProvinceChange}>
                {this.state.active_prov.map(prov => <option value={prov}> {prov} </option>)}
              </FormControl>
            </FormGroup>

            <h4><FieldGroup
              id="formControlsText"
              type="text"
              label="Tags"
              placeholder="Add relevant tags to submission (ex. #community, #charity)"
              value={this.state.tags}
              onChange={this.handleTagsChange}
            /></h4>
          </Modal.Body>
          <Modal.Footer>
            <p className="required_field">All fields marked with <b>*</b> are required.</p>
            <button type="button" className="btn btn-danger" onClick={this.toggleModal}>Cancel</button>
            <button type="button" className="btn btn-success" onClick={this.submitNom}>Submit</button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

import React, { Component } from 'react';
import { Modal, FormGroup, ControlLabel, FormControl, HelpBlock, Glyphicon } from 'react-bootstrap';
import Cropper from 'react-cropper';
import axios from 'axios';
import { toast } from 'react-toastify';

const max_description = 400

function FieldGroup({ id, label, help, ...props }) {
  return (
    <FormGroup controlId={id}>
      <ControlLabel>{label}</ControlLabel>
      <FormControl {...props} />
      {help && <HelpBlock>{help}</HelpBlock>}
    </FormGroup>
  );
}

export default class Edit extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      show: false,
      deleteShow: false,
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
      editImage: '',
      crop: {
        aspect: 1 / 1
      },
      croppedImg: "",
      chars_left: max_description
    };
  }

  componentDidMount() {
    this.setActiveProvince(this.props.country[0].props.children)
    this.setState({ name: this.props.name[0].props.children, description: this.props.description[0].props.children, croppedImg: this.props.image[0].props.children, country: this.props.country[0].props.children, tags: this.props.tags[0].props.children, chars_left: max_description - this.props.description[0].props.children.length });
  }

  resetDefaults = () => {
    this.setState({ name: "", description: "", country: "Canada", province: "Alberta", tags: "", active_prov: this.state.can_prov, active_prov_label: "Provinces", "image": "", "croppedImg": "", chars_left: max_description })
  }

  handleClose = () => {
    this.setState({ show: false });
    this.resetDefaults()
  }

  handleShow = () => {
    if (this.props.userId == null) {
      toast.error("Login to submit nominations and give Duas!", {
        position: toast.POSITION.TOP_LEFT
      })
    } else {
      this.setState({ show: true });
    }
  }

  handleDeleteClose = () => {
    this.setState({ deleteShow: false });
  }

  handleDeleteShow = () => {
    this.setState({ deleteShow: true, show: false });
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

  setActiveProvince(country) {
    if (country === "Canada") {
      this.setState({ active_prov: this.state.can_prov, active_prov_label: "Provinces", province: "Alberta" })
    } else if (country === "United States") {
      this.setState({ active_prov: this.state.us_prov, active_prov_label: "States", province: "Alabama" })
    } else if (country === "England") {
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
    if (this.props.userId == null) {
      toast.error("Login to edit a nominee!", {
        position: toast.POSITION.TOP_LEFT
      })
    } else {
      this.setState({
        show: !this.state.show
      });
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

  deleteNom = () => {
    if (this.props.userId != null) {
      // axios.delete('https://fast-cove-41298.herokuapp.com/nominations/' + this.props.id[0].props.children, { headers: {'Content-Type': 'application/x-www-form-urlencoded' }, params: { userId: this.props.userId } })
      axios({
        method: 'delete',
        url: 'https://fast-cove-41298.herokuapp.com/nominations/' + this.props.id[0].props.children,
        config: { params: { userId: this.props.userId } }
      })
        .then(function (response) {
          toast.info("Nominee successfully deleted!", {
            position: toast.POSITION.TOP_LEFT
          })
        })
        .catch(function (response) {
          console.error(response);
          toast.error("Nominee deletion unsuccessful. You did not create this nominee!", {
            position: toast.POSITION.TOP_LEFT
          });
        });
    } else {
      toast.error("Please login to delete a nominee!", {
        position: toast.POSITION.TOP_LEFT
      });
    }
    this.handleDeleteClose()
  }

  editNom = () => {
    if (this.props.userId != null) {
      var bodyFormData = new FormData();
      bodyFormData.set('name', this.state.name)
      bodyFormData.set('description', this.state.description)
      bodyFormData.set('country', this.state.country)
      bodyFormData.set('province', this.state.province)
      bodyFormData.set('tags', this.state.tags)
      bodyFormData.set('userID', this.props.userID)
      bodyFormData.set('file', this.state.croppedImg)
      axios({
        method: 'put',
        url: 'https://fast-cove-41298.herokuapp.com/nominations/' + this.props.id[0].props.children,
        data: bodyFormData,
        config: { headers: { 'Content-Type': 'multipart/form-data', 'Access-Control-Allow-Origin': '*' } }
      })
        .then(function (response) {
          toast.info("Nominee successfully updated!", {
            position: toast.POSITION.TOP_LEFT
          })
        })
        .catch(function (response) {
          console.error(response);
          toast.error("Nominee update unsuccessful!", {
            position: toast.POSITION.TOP_LEFT
          });
        });
    } else {
      toast.error("Please login to update a nominee!", {
        position: toast.POSITION.TOP_LEFT
      });
    }
    this.toggleModal()
  }

  render() {
    return (
      <div>
        <div style={{
          display: "inline-block",
          float: "right",
          paddingRight: '5px',
          paddingTop: '5px'
        }} >
          <a className="edit-button" onClick={this.toggleModal}>
            <Glyphicon glyph="glyphicon glyphicon-edit" style={{
              fontSize: "25px",
            }} />
          </a>
        </div>

        <Modal dialogClassName="submit_modal" show={this.state.deleteShow} onHide={this.handleDeleteClose}>
          <Modal.Header>
            <Modal.Title>Are you sure you would like to delete nominee {this.props.name[0].props.children}?</Modal.Title>
          </Modal.Header>

          <Modal.Footer>
            <button type="button" className="btn btn-default" onClick={this.handleDeleteClose}>Close</button>
            <button type="button" className="btn btn-danger" onClick={this.deleteNom}>Yes - Delete!</button>
          </Modal.Footer>
        </Modal>

        <Modal dialogClassName="submit_modal" show={this.state.show} onHide={this.handleClose}>

          <Modal.Header closeButton>
            <Modal.Title><h3><b>Edit Nomination Form</b></h3></Modal.Title>
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
              <ControlLabel htmlFor="fileUpload" style={{ cursor: "pointer" }}><h4><ControlLabel bsStyle="success"><br />Submit Picture</ControlLabel></h4>
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

            {this.state.croppedImg !== '' ? <div><h5><br /><br /><b>Current Image:</b></h5> <img src={this.state.croppedImg} alt={this.state.image} style={{ height: 400 }} /><br /><br /></div> : null}

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
            <button type="button" className="btn btn-default" onClick={this.toggleModal}>Cancel</button>
            <button type="button" className="btn btn-danger" onClick={this.handleDeleteShow}>Delete</button>
            <button type="button" className="btn btn-success" onClick={this.editNom}>Update</button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}
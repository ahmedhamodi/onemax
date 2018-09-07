import React, { Component } from 'react';
import person from './images/person.png';
import { toast } from 'react-toastify';
import Dua from './dua.js';
import axios from 'axios';
import canada_flag from './images/Canada.png';
import america_flag from './images/America.png';
import england_flag from './images/England.png';
import australia_flag from './images/Australia.png';
import { Well, Glyphicon } from 'react-bootstrap';
import './index.css';
import Edit from './edit.js';

export default class Nominees extends Component {

  state = {
    persons: [],
    next_persons: [],
    showNoms: false,
    page: 2,
    filter: 'all',
    filter_on: false,
    sort: 'desc-duas',
    sort_on: false
  }

  promptForLogin = () => toast.error("Login to submit nominations and give Duas!", {
    position: toast.POSITION.TOP_LEFT
  })

  displayNoms = () => {
    let path = ''
    if (this.props.search === true) {
      path = 'https://fast-cove-41298.herokuapp.com/search?tags=' + this.props.tags.replace(/ /g, '%20') + '&page=' + (this.state.page + 1)
    } else {
      path = 'https://fast-cove-41298.herokuapp.com/paged_nominations?page=' + (this.state.page + 1)
    }
    this.setState({ persons: this.state.next_persons, page: this.state.page + 1 });
    axios.get(path)
      .then(res => {
        const newPersons = res.data['nominations']
        this.setState({ showNoms: true, next_persons: [...this.state.persons, ...newPersons] });
      })
      .catch(function (response) {
        console.error(response);
      });
  }

  displayFilteredNoms = () => {
    let path = ''
    if (this.props.tags !== undefined) {
      if (this.state.filter === 'all') {
        path = 'https://fast-cove-41298.herokuapp.com/search?tags=' + this.props.tags.replace(/ /g, '%20') + '&page=' + (this.state.page + 1)
      } else {
        path = 'https://fast-cove-41298.herokuapp.com/filter?search=' + this.props.tags.replace(/ /g, '%20') + '&filter=' + this.state.filter.replace(/ /g, '%20') + '&page=' + (this.state.page + 1)
      }
    } else {
      if (this.state.filter === 'all') {
        path = 'https://fast-cove-41298.herokuapp.com/paged_nominations?page=' + (this.state.page + 1)
      } else {
        path = 'https://fast-cove-41298.herokuapp.com/filter?search=&filter=' + this.state.filter.replace(/ /g, '%20') + '&page=' + (this.state.page + 1)
      }
    }
    this.setState({ persons: this.state.next_persons, page: this.state.page + 1 });
    axios.get(path)
      .then(res => {
        const newPersons = res.data['nominations']
        this.setState({ showNoms: true, next_persons: [...this.state.persons, ...newPersons] });
      })
      .catch(function (response) {
        console.error(response);
      });
  }

  firstFilteredNoms = () => {
    let path1 = ''
    let path2 = ''
    if (this.props.tags !== undefined) {
      if (this.state.filter === 'all') {
        path1 = 'https://fast-cove-41298.herokuapp.com/search?tags=' + this.props.tags.replace(/ /g, '%20') + '&page=1'
        path2 = 'https://fast-cove-41298.herokuapp.com/search?tags=' + this.props.tags.replace(/ /g, '%20') + '&page=2'
      } else {
        path1 = 'https://fast-cove-41298.herokuapp.com/filter?search=' + this.props.tags.replace(/ /g, '%20') + '&filter=' + this.state.filter.replace(/ /g, '%20') + '&page=1'
        path2 = 'https://fast-cove-41298.herokuapp.com/filter?search=' + this.props.tags.replace(/ /g, '%20') + '&filter=' + this.state.filter.replace(/ /g, '%20') + '&page=2'
      }
    } else {
      if (this.state.filter === 'all') {
        path1 = 'https://fast-cove-41298.herokuapp.com/paged_nominations'
        path2 = 'https://fast-cove-41298.herokuapp.com/paged_nominations?page=2'
      } else {
        path1 = 'https://fast-cove-41298.herokuapp.com/filter?search=&filter=' + this.state.filter.replace(/ /g, '%20') + '&page=1'
        path2 = 'https://fast-cove-41298.herokuapp.com/filter?search=&filter=' + this.state.filter.replace(/ /g, '%20') + '&page=2'
      }
    }
    axios.get(path1)
      .then(res => {
        const persons = res.data['nominations']
        const nextPage = 2
        this.setState({ page: nextPage, persons: persons });
        axios.get(path2)
          .then(res => {
            const newPersons = res.data['nominations']
            this.setState({ next_persons: [...persons, ...newPersons] });
          })
          .catch(function (response) {
            console.error(response);
          });
      })
      .catch(function (response) {
        console.error(response);
      });
  }

  displaySortedNoms = () => {
    let sort_method = this.state.sort.split('-')[0]
    let sort_type = this.state.sort.split('-')[1]
    let path = 'https://fast-cove-41298.herokuapp.com/paged_nominations?sort_by=' + sort_method + '&type=' + sort_type + '&page=' + (this.state.page + 1)
    this.setState({ persons: this.state.next_persons, page: this.state.page + 1 });
    axios.get(path)
      .then(res => {
        const newPersons = res.data['nominations']
        this.setState({ showNoms: true, next_persons: [...this.state.persons, ...newPersons] });
      })
      .catch(function (response) {
        console.error(response);
      });
  }

  firstSortedNoms = () => {
    let sort_method = this.state.sort.split('-')[0]
    let sort_type = this.state.sort.split('-')[1]
    let path1 = 'https://fast-cove-41298.herokuapp.com/paged_nominations?sort_by=' + sort_method + '&type=' + sort_type + '&page=1'
    let path2 = 'https://fast-cove-41298.herokuapp.com/paged_nominations?sort_by=' + sort_method + '&type=' + sort_type + '&page=2'
    axios.get(path1)
      .then(res => {
        const persons = res.data['nominations']
        const nextPage = 2
        this.setState({ page: nextPage, persons: persons });
        axios.get(path2)
          .then(res => {
            const newPersons = res.data['nominations']
            this.setState({ next_persons: [...persons, ...newPersons] });
          })
          .catch(function (response) {
            console.error(response);
          });
      })
      .catch(function (response) {
        console.error(response);
      });
  }

  displayViewButton = () => {
    if (this.state.next_persons.length > 18 * (this.state.page - 1)) {
      return (<button className="action-button">View More Nominees</button>)
    } else {
      return null
    }
  }

  sleep(time) {
    return new Promise((resolve) => setTimeout(resolve, time));
  }

  applyFilter = (e) => {
    this.setState({ filter: e.target.value, filter_on: true, sort: 'desc-duas', sort_on: false });
    this.sleep(500).then(() => {
      this.firstFilteredNoms()
      this.displayFilteredNoms()
    })
  }

  applySort = (e) => {
    this.setState({ sort: e.target.value, sort_on: true, filter: 'all', filter_on: false });
    this.sleep(500).then(() => {
      this.firstSortedNoms()
      this.displaySortedNoms()
    })
  }

  home_sort_filter = () => {
    return (
      <div>
        <p className='align_left_text'>Filter:</p>
        <select className='align_left' onChange={this.applyFilter} value={this.state.filter}>
          <option value="all">All Countries</option>
          <option value="australia">Australia</option>
          <option value="canada">Canada</option>
          <option value="england">England</option>
          <option value="united">United States</option>
        </select>
        <select className='align_right' onChange={this.applySort} value={this.state.sort}>
          <option value="desc-duas">Most Duas</option>
          <option value="asc-duas">Least Duas</option>
          <option value="asc-updated_at">Newest</option>
          <option value="desc-updated_at">Oldest</option>
          {/*Future filter option - not implemented yet.
          <option value="trending">Trending</option>*/}
        </select>
        <p className='align_right_text'>Sort:</p>
      </div>
    );
  }

  search_sort_filter = () => {
    return (
      <div>
        <p className='align_left_text'>Filter:</p>
        <select className='align_left' onChange={this.applyFilter} value={this.state.filter}>
          <option value="all">All Countries</option>
          <option value="australia">Australia</option>
          <option value="canada">Canada</option>
          <option value="england">England</option>
          <option value="united">United States</option>
        </select>
      </div>
    );
  }

  componentDidMount() {
    let user = localStorage.getItem('userId');
    if (this.props.approve === true) {
      let path = 'https://fierce-everglades-88127.herokuapp.com/submitted_nominees'
      let self = this;
      axios.get(path, { headers: { user: user } })
        .then(function (response) {
          const persons = response.data;
          self.setState({ persons: persons });
        })
        .catch(function (response) {
          console.error(response);
          toast.error("Submitted Nominees failed!", {
            position: toast.POSITION.TOP_LEFT
          });
        });
    } else {
      let path1 = ''
      let path2 = ''
      if (this.props.search === true) {
        path1 = 'https://fast-cove-41298.herokuapp.com/search?tags=' + this.props.tags.replace(/ /g, '%20') + '&page=1'
        path2 = 'https://fast-cove-41298.herokuapp.com/search?tags=' + this.props.tags.replace(/ /g, '%20') + '&page=2'
      } else {
        path1 = 'https://fast-cove-41298.herokuapp.com/paged_nominations'
        path2 = 'https://fast-cove-41298.herokuapp.com/paged_nominations?page=2'
      }
      axios.get(path1)
        .then(res => {
          const persons = res.data['nominations']
          const nextPage = 2
          this.setState({ page: nextPage, persons: persons });
          axios.get(path2)
            .then(res => {
              const newPersons = res.data['nominations']
              this.setState({ next_persons: [...persons, ...newPersons] });
            })
            .catch(function (response) {
              console.error(response);
            });
        })
        .catch(function (response) {
          console.error(response);
        });
    }
    axios.get(path1)
      .then(res => {
        const persons = res.data['nominations']
        const nextPage = 2
        this.setState({ page: nextPage, persons: persons });
        axios.get(path2)
          .then(res => {
            const newPersons = res.data['nominations']
            this.setState({ next_persons: [...persons, ...newPersons] });
          })
          .catch(function (response) {
            console.error(response);
          });
      })
      .catch(function (response) {
        console.error(response);
      });
  }

  componentWillReceiveProps() {
    let path1 = ''
    let path2 = ''
    if (this.props.search === true) {
      path1 = 'https://fast-cove-41298.herokuapp.com/search?tags=' + this.props.tags.replace(/ /g, '%20') + '&page=1'
      path2 = 'https://fast-cove-41298.herokuapp.com/search?tags=' + this.props.tags.replace(/ /g, '%20') + '&page=2'
    } else {
      path1 = 'https://fast-cove-41298.herokuapp.com/paged_nominations'
      path2 = 'https://fast-cove-41298.herokuapp.com/paged_nominations?page=2'
    }
    axios.get(path1)
      .then(res => {
        const persons = res.data['nominations']
        const nextPage = 2
        this.setState({ page: nextPage, persons: persons });
        axios.get(path2)
          .then(res => {
            const newPersons = res.data['nominations']
            this.setState({ next_persons: [...persons, ...newPersons] });
          })
          .catch(function (response) {
            console.error(response);
          });
      })
      .catch(function (response) {
        console.error(response);
      });
  }

  render() {
    return (
      <body>
        <div>
          {this.props.search ? this.search_sort_filter() : this.home_sort_filter()}
        </div>
        <div className="pageBody">
          {this.state.persons.map((x, i) =>
            <Nominee 
              userId={this.props.userId} 
              userName={this.props.userName} 
              isLoggedIn={this.props.isLoggedIn} 
              promptForLogin={this.promptForLogin} 
              name={this.state.persons.slice(i, i + 1).map(person => <p>{person.name}</p>)} 
              description={this.state.persons.slice(i, i + 1).map(person => <p>{person.description}</p>)} 
              duas={this.state.persons.slice(i, i + 1).map(person => <p>{person.duas}</p>)} 
              id={this.state.persons.slice(i, i + 1).map(person => <p>{person.id}</p>)} 
              image={this.state.persons.slice(i, i + 1).map(person => <p>{person.image}</p>)} 
              country={this.state.persons.slice(i, i + 1).map(person => <p>{person.country}</p>)} 
              province={this.state.persons.slice(i, i + 1).map(person => <p>{person.province}</p>)} 
              tags={this.state.persons.slice(i, i + 1).map(person => <p>{person.tags}</p>)} 
              approve={this.props.approve}
              />)}
          <div>
            {this.state.showNoms ? <RestOfNoms 
            userId={this.props.userId} 
            isLoggedIn={this.props.isLoggedIn} 
            promptForLogin={this.promptForLogin} 
            nominees={this.state.persons.slice(18 * (this.state.page - 1), this.state.persons.length)} /> : null}
          </div>
          <div onClick={this.displayNoms} >
            {this.displayViewButton()}
          </div>
        </div>
      </body>
    );
  }
}

class RestOfNoms extends Component {
  render() {
    return (
      <div className="pageBody">
        {this.props.nominees.map((x, i) =>
          <Nominee userId={this.props.userId} userName={this.props.userName} isLoggedIn={this.props.isLoggedIn} promptForLogin={this.props.promptForLogin} image={this.props.nominees.slice(i, i + 1).map(person => <p>{person.image}</p>)} name={this.props.nominees.slice(i, i + 1).map(person => <p>{person.name}</p>)} description={this.props.nominees.slice(i, i + 1).map(person => <p>{person.description}</p>)} duas={this.props.nominees.slice(i, i + 1).map(person => <p>{person.duas}</p>)} id={this.props.nominees.slice(i, i + 1).map(person => <p>{person.id}</p>)} country={this.props.nominees.slice(i, i + 1).map(person => <p>{person.country}</p>)} province={this.state.persons.slice(i, i + 1).map(person => <p>{person.province}</p>)} tags={this.state.persons.slice(i, i + 1).map(person => <p>{person.tags}</p>)} />)}
      </div>
    )
  }
}

class Nominee extends Component {
  constructor(props) {
    super(props);

    this.state = {
      flag: '',
      image: person,
      approved: false,
      rejected: false
    }
    this.approveNominee = this.approveNominee.bind(this);
    this.rejectNominee = this.rejectNominee.bind(this);
  }

  componentWillReceiveProps() {
    const country = this.props.country[0].props.children;
    if (country === "Australia") {
      this.setState({
        flag: australia_flag
      });
    } else if (country === "United States") {
      this.setState({
        flag: america_flag
      });
    } else if (country === "England") {
      this.setState({
        flag: england_flag
      });
    } else {
      this.setState({
        flag: canada_flag
      });
    }

    const image = this.props.image[0].props.children
    if (image !== "") {
      this.setState({
        image: image
      });
    } else {
      this.setState({
        image: person
      });
    }
  }

  approveNominee() {
    let self = this;
    let id = this.props.id[0].props.children;
    let user = localStorage.getItem('userId');
    console.log(id);
    let path = 'https://fierce-everglades-88127.herokuapp.com/approve_nominee/' + id
    axios.post(path, null, { headers: { user: user } })
      .then(function (response) {
        toast.info("Nominee successfully approved!", {
          position: toast.POSITION.TOP_LEFT
        })
        self.setState({ approved: true })
      })
      .catch(function (response) {
        console.error(response);
        toast.error("Nominee approval failed!", {
          position: toast.POSITION.TOP_LEFT
        });
      });
  }

  rejectNominee() {
    let self = this;
    let id = this.props.id[0].props.children
    let user = localStorage.getItem('userId');
    console.log(id);
    let path = 'https://fierce-everglades-88127.herokuapp.com/reject_nominee/' + id
    axios.post(path, null, { headers: { user: user } })
      .then(function (response) {
        toast.info("Nominee successfully rejected!", {
          position: toast.POSITION.TOP_LEFT
        })
        self.setState({ rejected: true })
      })
      .catch(function (response) {
        console.error(response);
        toast.error("Nominee rejection failed!", {
          position: toast.POSITION.TOP_LEFT
        });
      });
  }

  render() {
    return (
      <div className="columns" style={{ position: 'relative' }}>
        <ul className="person">
          <li className="header">
            <p className="nominee_name">{this.props.name}</p>
            <img className="nominee_flag" src={this.state.flag} alt="logo" />
          </li>
          <div className='person content'>
            <Edit isLoggedIn={this.props.isLoggedIn} promptForLogin={this.promptForLogin} userId={this.props.userId} id={this.props.id} name={this.props.name} country={this.props.country} province={this.props.province} description={this.props.description} image={this.props.image} tags={this.props.tags} />
            <img src={this.state.image} className="person-logo" alt="logo" />
            <Well bsSize="large" className="well">{this.props.description}</Well>
          </div>
          <li className="dua">
            {this.state.approved || this.state.rejected ? <Glyphicon className="btn btn-primary" glyph="glyphicon glyphicon-ok-circle" style={{
              fontSize: "75x"
            }} /> :
              this.props.approve ?
                <div>
                  <button className="btn btn-success" onClick={this.approveNominee}>
                    <Glyphicon glyph="glyphicon glyphicon-ok" /> APPROVE
                  </button>
                  <button className="btn btn-danger" onClick={this.rejectNominee}>
                    <Glyphicon glyph="glyphicon glyphicon-remove" /> REJECT
                </button>
                </div> :
                <Dua duas={this.props.duas} id={this.props.id} isLoggedIn={this.props.isLoggedIn} promptForLogin={this.props.promptForLogin} userId={this.props.userId} />
            }
          </li>
        </ul>
      </div>
    );
  }
}

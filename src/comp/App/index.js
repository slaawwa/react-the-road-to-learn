import React, { Component } from 'react';
// import logo from './logo.svg';
import './index.css';

import Search from '../Search';
import Table from '../Table';
import Button from '../Button';

import {
  API_URL,
  PARAM_PAGE,
  DEFAULT_QUERY,
} from '../../const';

class App extends Component {

  _isMounted = false;

  constructor(props) {
    super(props);

    this.state = {
      searchTerm: DEFAULT_QUERY,
      results: {},
      searchKey: '',
      error: null,
    }

    // this.onDismiss = this.onDismiss.bind(this);
  }

  // onDismiss(id) {
  onDismiss = (id) => {
    const {searchKey, results} = this.state;
    const {hits, page} = results[searchKey];

    const isNotId = item => item.objectID !== id;
    const updatedList = hits.filter(isNotId);
    
    this.setState({
      results: {
        ...results,
        [searchKey]: {
          hits: updatedList,
          page,
        },
      },
    });
  }

  needsToSearchTopStories = (searchTerm) => {
    return !this.state.results[searchTerm];
  }

  onSearchChange = (e) => {
    this.setState({ searchTerm: e.target.value });
  }

  setSearchTopStories = (result) => {
    const {hits, page} = result;
    const {searchKey, results} = this.state; 

    const oldHits = results && results[searchKey]
      ? results[searchKey].hits
      : [];

    const updatedHits = [
      ...oldHits,
      ...hits,
    ];

    this.setState({
      results: {
        ...results,
        [searchKey]: {
          hits: updatedHits,
          page,
        },
      },
    })
  }

  fetchSearchTopStories(searchTerm, page=0) {
    fetch(`${API_URL}${searchTerm}&${PARAM_PAGE}${page}`)
      .then(r => r.json())
      .then(result => this._isMounted && this.setSearchTopStories(result))
      .catch(error => this._isMounted && this.setState({error}));
  }

  onSearchSubmit = (e) => {
    e.preventDefault();
    const {searchTerm} = this.state;
    this.setState({searchKey: searchTerm});
    if (this.needsToSearchTopStories(searchTerm)) {
      this.fetchSearchTopStories(searchTerm);
    }
  }

  componentDidMount = () => {
    this._isMounted = true;
    const { searchTerm } = this.state;
    this.setState({searchKey: searchTerm});
    this.fetchSearchTopStories(searchTerm);
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
    const helloWorld = 'Добро пожаловать в Путь к изучению React!';

    const {
      searchTerm,
      results,
      searchKey,
      error,
    } = this.state;
    
    const page = (
      results
      && results[searchKey]
      && results[searchKey].page
    ) || 0;

    const list = (
      results &&
      results[searchKey] &&
      results[searchKey].hits
    ) || [];

    if (error) {
      console.error('Error:', error)
      return <p>Сталася якась помилка:(</p>
    }

    return (
      <div className="page">
        <div className="interactions">
          <h2>{helloWorld}</h2>
          <Search
            onSubmit={this.onSearchSubmit}
            onChange={this.onSearchChange}
            value={searchTerm}
          >
            Пошук
          </Search>
        </div>
        { list
          ? <Table
            list={list}
            pattern={searchTerm}
            onDismiss={this.onDismiss}
          />
          : null
        }
        <div className="interactions">
          <Button onClick={() => this.fetchSearchTopStories(searchKey, page + 1)}>
            Більше інфи!
          </Button>
        </div>
      </div>
    );
  }
}

export default App;

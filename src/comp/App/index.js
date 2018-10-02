
import React, { Component } from 'react';
// import logo from './logo.svg';
import './index.css';

import {
  Search,
  Table,
  ButtonWithLoading,
} from '../';

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
      isLoading: false,
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

    this.setState(prevState => {
      const {searchKey, results} = prevState; 

      const oldHits = results && results[searchKey]
        ? results[searchKey].hits
        : [];

      const updatedHits = [
        ...oldHits,
        ...hits,
      ];
      
      return {
        results: {
          ...results,
          [searchKey]: {
            hits: updatedHits,
            page,
          },
        },
        isLoading: false,
      }

    });

  }

  fetchSearchTopStories(searchTerm, page=0) {

    this.setState({isLoading: true});

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
      isLoading,
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
          <ButtonWithLoading
            isLoading={isLoading}
            onClick={() => this.fetchSearchTopStories(searchKey, page + 1)}
          >
            Більше інфи!
          </ButtonWithLoading>
        </div>
      </div>
    );
  }
}

export default App;

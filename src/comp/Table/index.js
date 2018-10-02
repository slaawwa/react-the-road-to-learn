
import React, { Component } from 'react';

import PropTypes from 'prop-types';

import {Button} from '../'

const isSearched = (searchTerm='') => ({title}) =>
  title
    .toLowerCase()
    .includes( searchTerm.toLowerCase() );

const largeColumn = {
    width: '40%',
};
const midColumn = {
    width: '30%',
};
const smallColumn = {
    width: '10%',
};

export default class Table extends Component {
  render() {
    const {list, pattern, onDismiss} = this.props;
    return (
        <div className="table">
            {list.filter(isSearched(pattern)).map(item =>
              <div key={item.objectID} className="table-row">
                <span style={largeColumn}>
                  <a href={item.url}>{item.title}</a>
                </span>
                <span style={midColumn}>{item.author}</span>
                <span style={smallColumn}>{item.num_comments}</span>
                <span style={smallColumn}>{item.points}</span>
                <span style={smallColumn}>
                  <Button
                    onClick={() => onDismiss(item.objectID)}
                    className="button-inline"
                  >
                    X
                  </Button>
                </span>
              </div>
            )}
        </div>
    )
  }
}

Table.propTypes = {
    list: PropTypes.arrayOf(
        PropTypes.shape({
            objectID: PropTypes.string.isRequired,
            author: PropTypes.string,
            url: PropTypes.string,
            num_comments: PropTypes.number,
            points: PropTypes.number,
        })
    ).isRequired,
    onDismiss: PropTypes.func.isRequired,
}


import React, { Component } from 'react';

import PropTypes from 'prop-types';

import {Sort, Button} from '../'

import {sortBy} from 'lodash';

const isSearched = (searchTerm='') => ({title}) => {
    title || (title = '')
    return title
        .toLowerCase()
        .includes( searchTerm.toLowerCase() );
}

const largeColumn = {
    width: '40%',
};
const midColumn = {
    width: '30%',
};
const smallColumn = {
    width: '10%',
};

const SORTS = {
    NONE: list => list,
    TITLE: list => sortBy(list, 'title'),
    AUTHOR: list => sortBy(list, 'author'),
    COMMENTS: list => sortBy(list, 'num_comments').reverse(),
    POINTS: list => sortBy(list, 'points'),
}

export default class Table extends Component {

    constructor(props) {
        super(props);

        this.state = {
            sortKey: 'NONE',
            isSortReverse: false,
        }
    }

    onSort = sortKey => {
        const isSortReverse = this.state.sortKey === sortKey && !this.state.isSortReverse;
        this.setState({sortKey, isSortReverse});
    }

    render() {
        const {
            list,
            pattern,
            onDismiss,
        } = this.props;
        
        const {
            sortKey,
            isSortReverse,
        } = this.state;

        const sortedList = SORTS[sortKey](list);
        const reverseSortedList = isSortReverse
            ? sortedList.reverse()
            : sortedList;

        return (
            <div className="table">
                <div className="table-header">
                    <span style={largeColumn}>
                        <Sort
                            sortKey={'TITLE'}
                            onSort={this.onSort}
                            activeSortKey={sortKey}
                        >
                          Заголовок
                        </Sort>
                    </span>
                    <span style={midColumn}>
                        <Sort
                            sortKey={'AUTHOR'}
                            onSort={this.onSort}
                            activeSortKey={sortKey}
                        >
                          Автор
                        </Sort>
                    </span>
                    <span style={smallColumn}>
                        <Sort
                            sortKey={'COMMENTS'}
                            onSort={this.onSort}
                            activeSortKey={sortKey}
                        >
                          Коментарі
                        </Sort>
                    </span>
                    <span style={smallColumn}>
                        <Sort
                            sortKey={'POINTS'}
                            onSort={this.onSort}
                            activeSortKey={sortKey}
                        >
                          Бали
                        </Sort>
                    </span>
                    <span style={smallColumn}>
                        Архів
                    </span>
                </div>
                {reverseSortedList.filter(isSearched(pattern)).map(item =>
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

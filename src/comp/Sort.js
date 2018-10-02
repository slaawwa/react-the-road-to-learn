
import React from 'react';

import Button from './Button';

export default ({ sortKey, onSort, children, activeSortKey, isSortReverse}) => {

    const sortClass = ['button-inline'];

    let arrow = '';

    if (sortKey === activeSortKey) {
        sortClass.push('button-active');
        arrow = isSortReverse
            ? '↑'
            : '↓'
    }

    console.log('activeSortKey:', activeSortKey)

    return <Button
        onClick={() => onSort(sortKey)}
        className={sortClass.join(' ')}
    >
        {children}
        {arrow}
    </Button>
}

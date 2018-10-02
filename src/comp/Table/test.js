
import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';

import {
    Table,
} from '../';


describe('Table', () => {

    const props = {
        list: [
            { title: '1', author: '1', num_comments: 1, points: 2, objectID: 'y' },
            { title: '2', author: '2', num_comments: 1, points: 2, objectID: 'z' },
        ],
    };

    it('renderer Table', () => {
        const div = document.createElement('div');
        ReactDOM.render(<Table { ...props} />, div);
        ReactDOM.unmountComponentAtNode(div);

    });

    test('snapshot Table', () => {

        const component = renderer.create(
            <Table {...props} />
        );

        const tree = component.toJSON();
        expect(tree).toMatchSnapshot();

    });

});

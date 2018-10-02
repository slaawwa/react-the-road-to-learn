
import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import {
    Table,
} from '../';

Enzyme.configure({ adapter: new Adapter() });


describe('Table', () => {

    const props = {
        onDismiss: () => {},
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

    it('shows two items in list', () => {
        const element = shallow(
            <Table {...props} />
        );

        expect(element.find('.table-row').length).toBe(2);
    });

    test('snapshot Table', () => {

        const component = renderer.create(
            <Table {...props} />
        );

        const tree = component.toJSON();
        expect(tree).toMatchSnapshot();

    });

});

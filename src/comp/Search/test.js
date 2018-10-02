
import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';

import {
    Search,
} from '../';


describe('Search', () => {

    it('renderer Search', () => {

        const div = document.createElement('div');

        ReactDOM.render(<Search>Пошук</Search>, div);
        ReactDOM.unmountComponentAtNode(div);

    });

    test('snapshot Search', () => {

        const component = renderer.create(
            <Search>Пошук</Search>
        );

        const tree = component.toJSON();
        expect(tree).toMatchSnapshot();

    });

});


import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';

// import App from './';
import {
    App,
} from '../';


describe('App', () => {

    it('renders App', () => {
      const div = document.createElement('div');
      ReactDOM.render(<App />, div);
      ReactDOM.unmountComponentAtNode(div);
    });

    test('Corect App snapshot', () => {
        const component = renderer.create(
            <App />
        );

        const tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });

});

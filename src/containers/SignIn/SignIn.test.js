import React from './node_modules/react';
import ReactDOM from './node_modules/react-dom';
import SignIn from './SignIn';

describe('SignIn component', () => {
	it('renders without crashing', () => {
		const div = document.createElement('div');
		ReactDOM.render(<SignIn />, div);
		ReactDOM.unmountComponentAtNode(div);
	});
});

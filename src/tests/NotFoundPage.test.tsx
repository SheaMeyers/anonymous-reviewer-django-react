import React from 'react';
import ReactDOM from 'react-dom';
import NotFoundPage from '../components/NotFoundPage';

it('renders NotFoundPage without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<NotFoundPage />, div);
  ReactDOM.unmountComponentAtNode(div);
});

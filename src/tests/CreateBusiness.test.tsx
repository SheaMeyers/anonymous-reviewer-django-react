import React from 'react';
import ReactDOM from 'react-dom';
import CreateBusiness from '../components/CreateBusiness';

it('renders CreateBusiness without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<CreateBusiness />, div);
  ReactDOM.unmountComponentAtNode(div);
});

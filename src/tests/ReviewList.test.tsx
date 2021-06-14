import React from 'react';
import ReactDOM from 'react-dom';
import ReviewList from '../components/ReviewList';

it('renders ReviewList without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<ReviewList id={'1'} rating={5} />, div);
  ReactDOM.unmountComponentAtNode(div);
});

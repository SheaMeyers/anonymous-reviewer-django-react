import React from 'react';
import ReactDOM from 'react-dom';
import CreateReview from '../components/CreateReview';

const test_company = {
    id: '1',
    created_datetime: 'now',
    modified_datetime: 'now',
    name: 'name',
    street_name: 'street',
    street_number: '4',
    city: 'voorburg',
    province: 'zuid holland',
    country: 'netherlands',
    postal_code: '2273',
}

it('renders CreateReview without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<CreateReview company={test_company} />, div);
  ReactDOM.unmountComponentAtNode(div);
});

from django.conf import settings

from rest_framework.test import APITestCase
from rest_framework.reverse import reverse

from backend.models import Company, Review


class TestGetCompanies(APITestCase):

    def setUp(self):
        super(TestGetCompanies, self).setUp()
        self.company = Company.objects.create(name='Test company')
        self.endpoint_path = reverse('get-companies')

    def test_get_companies(self):
        response = self.client.get(self.endpoint_path)

        self.assertEqual(response.status_code, 200)
        data = response.json()
        self.assertEqual(data['companies'][0]['name'], 'Test company')
        self.assertEqual(data['companies'][0]['street_name'], '')
        self.assertEqual(data['companies'][0]['street_number'], '')
        self.assertEqual(data['companies'][0]['city'], '')
        self.assertEqual(data['companies'][0]['province'], '')
        self.assertEqual(data['companies'][0]['country'], '')
        self.assertEqual(data['companies'][0]['postal_code'], '')


class TestGetCompanyReviewsView(APITestCase):

    def test_get_reviews_data(self):
        company = Company.objects.create(name='Test company')
        other_company = Company.objects.create(name='Other company')
        endpoint_path = reverse('get-company-reviews', kwargs={'id': company.id})

        Review.objects.create(company=company, rating=1, message='first review')
        Review.objects.create(company=company, rating=5, message='second review')
        Review.objects.create(company=other_company, rating=1, message='first other review')
        Review.objects.create(company=other_company, rating=5, message='second other review')

        response = self.client.get(endpoint_path)

        self.assertEqual(response.status_code, 200)
        response_data = response.json()
        self.assertEqual(len(response_data['reviews']), 2)
        for review in response_data['reviews']:
            self.assertEqual(review['company'], str(company.id))

    def test_pagination(self):
        company = Company.objects.create(name='Test company')
        endpoint_path = reverse('get-company-reviews', kwargs={'id': company.id})

        for i in range(0, (settings.PAGINATION_SIZE * 2)):
            Review.objects.create(company=company, rating=5, message=str(i))

        response = self.client.get(f"{endpoint_path}?page=1")
        first_page_data = response.json()['reviews']
        self.assertEqual(len(first_page_data), settings.PAGINATION_SIZE)
        first_page_messages = [review['message'] for review in first_page_data]

        response = self.client.get(f"{endpoint_path}?page=2")
        second_page_data = response.json()['reviews']
        self.assertEqual(len(second_page_data), settings.PAGINATION_SIZE)
        second_page_messages = [review['message'] for review in second_page_data]

        self.assertEqual([i for i in first_page_messages if i in second_page_messages], [])  # Ensure no duplicates

        response = self.client.get(f"{endpoint_path}?page=3")
        third_page_data = response.json()['reviews']
        self.assertEqual(third_page_data, [])

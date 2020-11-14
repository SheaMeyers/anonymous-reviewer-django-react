from rest_framework.test import APITestCase
from rest_framework.reverse import reverse

from backend.models import Company


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
from django.test import TestCase

from backend.models import Company, Review
from backend.tasks import create_review
from backend.utils import calculate_star_ratings


class TestCreateReview(TestCase):

    def test_create_review(self):
        company = Company.objects.create(name='Test company')
        Review.objects.create(company=company, rating=5, message='Five star review')
        Review.objects.create(company=company, rating=3, message='Three star review')
        calculate_star_ratings()

        create_review(str(company.id), 4, 'Four star review')

        company.refresh_from_db()

        self.assertEqual(company.rating_stats.number_four_star_ratings, 1)
        self.assertEqual(company.rating_stats.average_rating, 4)
        self.assertTrue(Review.objects.filter(company=company, rating=4, message='Four star review').exists())

    def test_create_review_with_new_company(self):
        company = Company.objects.create(name='Test company')

        create_review(str(company.id), 2, 'Two star review')

        company.refresh_from_db()

        self.assertEqual(company.rating_stats.number_two_star_ratings, 1)
        self.assertEqual(company.rating_stats.average_rating, 2)
        self.assertTrue(Review.objects.filter(company=company, rating=2, message='Two star review').exists())

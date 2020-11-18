from django.test import TestCase

from backend.models import Company, Review
from backend.utils import calculate_star_ratings


class TestCalculateStarRatings(TestCase):

    def test_calculate_star_rating(self):
        company = Company.objects.create(name='Test company')
        Review.objects.create(company=company, rating=5, message='Five star review')
        Review.objects.create(company=company, rating=4, message='Four star review')

        calculate_star_ratings()

        company.refresh_from_db()
        company.rating_stats.refresh_from_db()

        self.assertEqual(company.rating_stats.average_rating, 4.5)
        self.assertEqual(company.rating_stats.number_five_star_ratings, 1)
        self.assertEqual(company.rating_stats.number_four_star_ratings, 1)
        self.assertEqual(company.rating_stats.number_three_star_ratings, 0)
        self.assertEqual(company.rating_stats.number_two_star_ratings, 0)
        self.assertEqual(company.rating_stats.number_one_star_ratings, 0)

    def test_calculate_star_rating_with_filters(self):
        company = Company.objects.create(name='Test company')
        Review.objects.create(company=company, rating=5, message='Five star review')
        Review.objects.create(company=company, rating=4, message='Four star review')
        company = Company.objects.create(name='Test company 2')
        Review.objects.create(company=company, rating=3, message='Three star review')
        Review.objects.create(company=company, rating=2, message='Two star review')

        calculate_star_ratings(additional_filters={'name': 'Test company 2'})

        company.refresh_from_db()
        company.rating_stats.refresh_from_db()

        self.assertEqual(company.rating_stats.average_rating, 2.5)
        self.assertEqual(company.rating_stats.number_five_star_ratings, 0)
        self.assertEqual(company.rating_stats.number_four_star_ratings, 0)
        self.assertEqual(company.rating_stats.number_three_star_ratings, 1)
        self.assertEqual(company.rating_stats.number_two_star_ratings, 1)
        self.assertEqual(company.rating_stats.number_one_star_ratings, 0)

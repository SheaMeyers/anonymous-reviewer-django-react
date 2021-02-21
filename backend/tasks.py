from .celery import celery
from .models import Company, Review


@celery.task
def create_review(company_id, rating, message):
    company = Company.objects.get(id=company_id)

    if rating == 5:
        company.rating_stats.number_five_star_ratings += 1
    if rating == 4:
        company.rating_stats.number_four_star_ratings += 1
    if rating == 3:
        company.rating_stats.number_three_star_ratings += 1
    if rating == 2:
        company.rating_stats.number_two_star_ratings += 1
    if rating == 1:
        company.rating_stats.number_one_star_ratings += 1

    reviews_count = company.reviews.count()
    company.rating_stats.average_rating = (
                ((company.rating_stats.average_rating * reviews_count) + rating) / (reviews_count + 1)
    )

    company.rating_stats.save()

    Review.objects.create(company=company, rating=rating, message=message)

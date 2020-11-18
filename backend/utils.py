from .models import Company


def calculate_star_ratings(additional_filters=None):
    if not isinstance(additional_filters, dict):
        additional_filters = {}

    companies = Company.objects.filter(**additional_filters)

    for company in companies:

        reviews = company.reviews.all()
        total_star_review_value = 0

        for review in reviews:
            if review.rating == 5:
                company.rating_stats.number_five_star_ratings += 1
            if review.rating == 4:
                company.rating_stats.number_four_star_ratings += 1
            if review.rating == 3:
                company.rating_stats.number_three_star_ratings += 1
            if review.rating == 2:
                company.rating_stats.number_two_star_ratings += 1
            if review.rating == 1:
                company.rating_stats.number_one_star_ratings += 1

            total_star_review_value += review.rating

        if reviews:
            company.rating_stats.average_rating = total_star_review_value/reviews.count()

        company.rating_stats.save()

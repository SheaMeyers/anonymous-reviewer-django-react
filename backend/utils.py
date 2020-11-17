from .models import Company


def calculate_star_ratings(additional_filters=None):
    if not isinstance(additional_filters, dict):
        additional_filters = {}

    companies = Company.objects.filter(**additional_filters)

    for company in companies:

        reviews = company.reviews.all()
        total_star_review_value = 0
        number_5_star_reviews = 0
        number_4_star_reviews = 0
        number_3_star_reviews = 0
        number_2_star_reviews = 0
        number_1_star_reviews = 0

        for review in reviews:
            if review.rating == 5:
                number_5_star_reviews += 1
            if review.rating == 4:
                number_4_star_reviews += 1
            if review.rating == 3:
                number_3_star_reviews += 1
            if review.rating == 2:
                number_2_star_reviews += 1
            if review.rating == 1:
                number_1_star_reviews += 1

            total_star_review_value += review.rating

        company.rating_stats.number_five_star_ratings = number_5_star_reviews
        company.rating_stats.number_four_star_ratings = number_4_star_reviews
        company.rating_stats.number_three_star_ratings = number_3_star_reviews
        company.rating_stats.number_two_star_ratings = number_2_star_reviews
        company.rating_stats.number_one_star_ratings = number_1_star_reviews
        company.rating_stats.average_rating = total_star_review_value/reviews.count()
        company.rating_stats.save()

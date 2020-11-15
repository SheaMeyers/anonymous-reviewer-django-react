from django.conf import settings
from django.views.generic import TemplateView
from django.views.decorators.cache import never_cache, cache_page
from django.utils.decorators import method_decorator
from django.core.paginator import Paginator, EmptyPage

from rest_framework import permissions, status
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework.views import APIView

from backend.models import Company, Review
from backend.serializers import CompanySerializer, ReviewSerializer

# Serve Single Page Application
index = never_cache(TemplateView.as_view(template_name='index.html'))


class GetCompaniesView(APIView):

    permission_classes = (permissions.AllowAny,)

    @method_decorator(cache_page(settings.PAGE_CACHE))
    def get(self, request: Request) -> Response:

        companies = Company.objects.all()
        companies_data = CompanySerializer(companies, many=True).data

        return Response(data={'companies': companies_data}, status=status.HTTP_200_OK)


class GetCompanyReviewsView(APIView):

    permission_classes = (permissions.AllowAny,)

    def get(self, request: Request, id=None) -> Response:
        company_reviews = Review.objects.filter(company_id=id)

        paginator = Paginator(company_reviews, settings.PAGINATION_SIZE)
        page = request.GET.get('page') or 1  # Default to showing first page

        try:
            reviews = paginator.page(page)
        except EmptyPage:
            # If page is out of range (e.g. 9999), deliver last page of results.
            reviews = []

        reviews_data = ReviewSerializer(reviews, many=True).data

        return Response(status=status.HTTP_200_OK, data={'reviews': reviews_data})
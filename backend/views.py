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
from backend.serializers import CompanySerializer, ReviewSerializer, CreateReviewSerializers, CreateCompanySerializers
from backend.tasks import create_review

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


class CreateReviewsView(APIView):

    permission_classes = (permissions.AllowAny,)

    def post(self, request: Request) -> Response:
        serializer = CreateReviewSerializers(data=request.data)
        if not serializer.is_valid():
            # In case of error just return 200
            return Response(status=status.HTTP_200_OK)

        if serializer.validated_data['company_id']:
            create_review.delay(serializer.validated_data['company_id'],
                                serializer.validated_data['rating'],
                                serializer.validated_data['message'])

        return Response(status=status.HTTP_200_OK)


class CreateCompanyView(APIView):

    permission_classes = (permissions.AllowAny,)

    def post(self, request: Request) -> Response:
        company_serializer = CreateCompanySerializers(data=request.data)
        if not company_serializer.is_valid():
            # In case of error just return 200
            return Response(status=status.HTTP_200_OK)

        company = Company.objects.create(**company_serializer.validated_data)

        review_serializer = CreateReviewSerializers(data=request.data)
        if not review_serializer.is_valid():
            # In case of error just return 200
            return Response(status=status.HTTP_200_OK)

        create_review.delay(str(company.id),
                            review_serializer.validated_data['rating'],
                            review_serializer.validated_data['message'])

        return Response(status=status.HTTP_200_OK)
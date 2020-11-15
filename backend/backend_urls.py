from django.conf.urls import url

from .views import GetCompaniesView, GetCompanyReviewsView

urlpatterns = [
    url(r'^get-companies/$', GetCompaniesView.as_view(), name='get-companies'),
    url(r'^get-reviews/(?P<id>[0-9a-z-]+)/$', GetCompanyReviewsView.as_view(), name='get-company-reviews'),
]

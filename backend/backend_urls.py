from django.conf.urls import url

from .views import GetCompaniesView, GetCompanyReviewsView, CreateReviewsView

urlpatterns = [
    url(r'^get-companies/$', GetCompaniesView.as_view(), name='get-companies'),
    url(r'^get-reviews/(?P<id>[0-9a-z-]+)/$', GetCompanyReviewsView.as_view(), name='get-company-reviews'),
    url(r'^create-review/$', CreateReviewsView.as_view(), name='create-review')
]

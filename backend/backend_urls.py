from django.conf.urls import url

from .views import GetCompaniesView

urlpatterns = [
    url(r'^get-companies/$', GetCompaniesView.as_view(), name='get-companies'),
]

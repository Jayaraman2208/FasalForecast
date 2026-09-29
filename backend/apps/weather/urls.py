from django.urls import path
from .views import panchayat_forecast, downscale_forecast

urlpatterns = [
    path('forecast/<int:panchayat_id>/', panchayat_forecast, name='panchayat-forecast'),
    path('forecast/downscale/', downscale_forecast, name='downscale-forecast'),
]

from django.urls import path
from .views import (predict_pest, pest_history, irrigation_schedule,
                    downscale_forecast, check_early_warning)

urlpatterns = [
    path('pest/predict/', predict_pest, name='pest-predict'),
    path('pest/history/<int:panchayat_id>/', pest_history, name='pest-history'),
    path('irrigation/schedule/', irrigation_schedule, name='irrigation-schedule'),
    path('downscale/', downscale_forecast, name='downscale-forecast'),
    path('warning/check/', check_early_warning, name='early-warning'),
]

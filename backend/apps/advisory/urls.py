from django.urls import path
from .views import (panchayat_advisory, crop_specific_advisory,
                    CropViewSet, CropAdvisoryRuleViewSet)


urlpatterns = [
    # Custom views
    path('advisory/<int:panchayat_id>/', panchayat_advisory, name='panchayat-advisory'),
    path('advisory/crop-specific/', crop_specific_advisory, name='crop-specific-advisory'),

    # Crop list (manual path — no router)
    path('crops/', CropViewSet.as_view({'get': 'list'}), name='crop-list'),
    path('crops/<int:pk>/', CropViewSet.as_view({'get': 'retrieve'}), name='crop-detail'),

    # Crop rules
    path('crop-rules/', CropAdvisoryRuleViewSet.as_view({'get': 'list'}), name='crop-rule-list'),
    path('crop-rules/<int:pk>/', CropAdvisoryRuleViewSet.as_view({'get': 'retrieve'}), name='crop-rule-detail'),
]

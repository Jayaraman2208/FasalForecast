from rest_framework.routers import DefaultRouter
from .views import DistrictViewSet, BlockViewSet, PanchayatViewSet

router = DefaultRouter()
router.register(r'districts', DistrictViewSet, basename='district')
router.register(r'blocks', BlockViewSet, basename='block')
router.register(r'panchayats', PanchayatViewSet, basename='panchayat')

urlpatterns = router.urls

from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('apps.spatial.urls')),
    path('api/', include('apps.weather.urls')),
    path('api/', include('apps.advisory.urls')),
    path('api/', include('apps.ml_engine.urls')),
]

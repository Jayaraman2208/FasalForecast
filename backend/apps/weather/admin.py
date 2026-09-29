from django.contrib import admin
from .models import BlockForecast, PanchayatForecast
@admin.register(BlockForecast)
class BlockForecastAdmin(admin.ModelAdmin):
    list_display = ['block', 'date', 'temperature_max', 'temperature_min', 'rainfall', 'humidity']
@admin.register(PanchayatForecast)
class PanchayatForecastAdmin(admin.ModelAdmin):
    list_display = ['panchayat', 'date', 'temperature_max', 'temperature_min', 'rainfall', 'humidity']

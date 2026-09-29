from django.contrib import admin
from .models import District, Block, Panchayat
@admin.register(District)
class DistrictAdmin(admin.ModelAdmin):
    list_display = ['name', 'state']
@admin.register(Block)
class BlockAdmin(admin.ModelAdmin):
    list_display = ['name', 'district']
    list_filter = ['district']
@admin.register(Panchayat)
class PanchayatAdmin(admin.ModelAdmin):
    list_display = ['name', 'block', 'latitude', 'longitude']
    list_filter = ['block__district']
    search_fields = ['name']

from django.contrib import admin
from .models import Advisory, Crop, CropAdvisoryRule

@admin.register(Advisory)
class AdvisoryAdmin(admin.ModelAdmin):
    list_display = ['panchayat', 'date', 'category', 'severity']
    list_filter = ['category', 'severity', 'date']

@admin.register(Crop)
class CropAdmin(admin.ModelAdmin):
    list_display = ['name', 'tamil_name', 'season']
    list_filter = ['season']

@admin.register(CropAdvisoryRule)
class CropAdvisoryRuleAdmin(admin.ModelAdmin):
    list_display = ['crop', 'growth_stage', 'priority']
    list_filter = ['crop', 'priority', 'growth_stage']

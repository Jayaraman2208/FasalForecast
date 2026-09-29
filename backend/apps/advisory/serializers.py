from rest_framework import serializers
from .models import Advisory

class AdvisorySerializer(serializers.ModelSerializer):
    panchayat_name = serializers.CharField(source='panchayat.name', read_only=True)
    class Meta:
        model = Advisory
        fields = ['id', 'panchayat', 'panchayat_name', 'date', 'advisory_text', 'category', 'severity']
from rest_framework import serializers
from .models import Advisory, Crop, CropAdvisoryRule


class CropSerializer(serializers.ModelSerializer):
    class Meta:
        model = Crop
        fields = ['id', 'name', 'tamil_name', 'season', 'growth_stages', 'description']


class CropAdvisoryRuleSerializer(serializers.ModelSerializer):
    crop_name = serializers.CharField(source='crop.name', read_only=True)

    class Meta:
        model = CropAdvisoryRule
        fields = ['id', 'crop', 'crop_name', 'growth_stage', 'condition',
                  'advisory_text', 'advisory_tamil', 'priority']

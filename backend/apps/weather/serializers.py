from rest_framework import serializers
from .models import BlockForecast, PanchayatForecast

class BlockForecastSerializer(serializers.ModelSerializer):
    block_name = serializers.CharField(source='block.name', read_only=True)
    class Meta:
        model = BlockForecast
        fields = ['id', 'block', 'block_name', 'date', 'temperature_max', 'temperature_min', 'rainfall', 'humidity']

class PanchayatForecastSerializer(serializers.ModelSerializer):
    panchayat_name = serializers.CharField(source='panchayat.name', read_only=True)
    class Meta:
        model = PanchayatForecast
        fields = ['id', 'panchayat', 'panchayat_name', 'date', 'temperature_max', 'temperature_min', 'rainfall', 'humidity']

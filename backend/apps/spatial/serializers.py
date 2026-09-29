from rest_framework import serializers
from .models import District, Block, Panchayat

class DistrictSerializer(serializers.ModelSerializer):
    class Meta:
        model = District
        fields = ['id', 'name', 'state']

class BlockSerializer(serializers.ModelSerializer):
    district_name = serializers.CharField(source='district.name', read_only=True)
    class Meta:
        model = Block
        fields = ['id', 'name', 'district', 'district_name']

class PanchayatSerializer(serializers.ModelSerializer):
    block_name = serializers.CharField(source='block.name', read_only=True)
    district_name = serializers.CharField(source='block.district.name', read_only=True)
    class Meta:
        model = Panchayat
        fields = ['id', 'name', 'block', 'block_name', 'district_name', 'latitude', 'longitude', 'elevation']

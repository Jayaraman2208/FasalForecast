from rest_framework import viewsets
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.shortcuts import get_object_or_404

from .models import Advisory, Crop, CropAdvisoryRule
from .serializers import (AdvisorySerializer, CropSerializer,
                          CropAdvisoryRuleSerializer)
from apps.spatial.models import Panchayat


class CropViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Crop.objects.all()
    serializer_class = CropSerializer


class CropAdvisoryRuleViewSet(viewsets.ReadOnlyModelViewSet):
    serializer_class = CropAdvisoryRuleSerializer

    def get_queryset(self):
        queryset = CropAdvisoryRule.objects.all()
        crop_id = self.request.query_params.get('crop')
        stage = self.request.query_params.get('stage')
        if crop_id:
            queryset = queryset.filter(crop_id=crop_id)
        if stage:
            queryset = queryset.filter(growth_stage=stage)
        return queryset


@api_view(['GET'])
def panchayat_advisory(request, panchayat_id):
    panchayat = get_object_or_404(Panchayat, id=panchayat_id)
    advisories = Advisory.objects.filter(panchayat=panchayat).order_by('-date')[:10]
    serializer = AdvisorySerializer(advisories, many=True)
    return Response({
        'panchayat': panchayat.name,
        'advisories': serializer.data,
    })


@api_view(['POST'])
def crop_specific_advisory(request):
    crop_id = request.data.get('crop_id')
    stage = request.data.get('growth_stage')
    weather = request.data.get('weather', {})

    try:
        crop = Crop.objects.get(id=crop_id)
    except Crop.DoesNotExist:
        return Response({'error': 'Crop not found'}, status=404)

    rules = CropAdvisoryRule.objects.filter(crop=crop, growth_stage=stage)
    matched = []

    for rule in rules:
        cond = rule.condition
        match = True
        if 'temp_min' in cond and weather.get('temp', 0) < cond['temp_min']:
            match = False
        if 'temp_max' in cond and weather.get('temp', 0) > cond['temp_max']:
            match = False
        if 'humidity_min' in cond and weather.get('humidity', 0) < cond['humidity_min']:
            match = False
        if 'rainfall_max' in cond and weather.get('rainfall', 0) > cond['rainfall_max']:
            match = False
        if match:
            matched.append(rule)

    serializer = CropAdvisoryRuleSerializer(matched, many=True)
    return Response({
        'crop': crop.name,
        'growth_stage': stage,
        'advisories': serializer.data,
        'count': len(matched),
    })

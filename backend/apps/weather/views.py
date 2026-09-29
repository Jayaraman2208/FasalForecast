from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from .models import PanchayatForecast
from .serializers import PanchayatForecastSerializer
from apps.spatial.models import Panchayat

@api_view(['GET'])
def panchayat_forecast(request, panchayat_id):
    panchayat = get_object_or_404(Panchayat, id=panchayat_id)
    forecasts = PanchayatForecast.objects.filter(panchayat=panchayat).order_by('date')[:5]
    serializer = PanchayatForecastSerializer(forecasts, many=True)
    return Response({
        'panchayat': panchayat.name,
        'block': panchayat.block.name,
        'district': panchayat.block.district.name,
        'forecasts': serializer.data,
    })

@api_view(['POST'])
def downscale_forecast(request):
    return Response({
        'status': 'success',
        'message': 'Downscaling endpoint ready',
        'data': request.data,
    })

from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from datetime import date

from apps.spatial.models import Panchayat
from .models import PestPrediction
from .services import (pest_predictor, irrigation_scheduler,
                       weather_downscaler, early_warning)


@api_view(['POST'])
def predict_pest(request):
    temp = request.data.get('temperature', 28)
    humidity = request.data.get('humidity', 75)
    rainfall = request.data.get('rainfall', 5)
    wind = request.data.get('wind_speed', 2)
    panchayat_id = request.data.get('panchayat_id')

    result = pest_predictor.predict(temp, humidity, rainfall, wind)

    if panchayat_id:
        try:
            panchayat = Panchayat.objects.get(id=panchayat_id)
            PestPrediction.objects.update_or_create(
                panchayat=panchayat, date=date.today(),
                defaults={
                    'risk_level': result['risk_level'],
                    'confidence': result['confidence'],
                    'pest_types': result['pest_types'],
                    'temperature': temp,
                    'humidity': humidity,
                }
            )
        except Panchayat.DoesNotExist:
            pass

    return Response(result)


@api_view(['GET'])
def pest_history(request, panchayat_id):
    panchayat = get_object_or_404(Panchayat, id=panchayat_id)
    predictions = PestPrediction.objects.filter(panchayat=panchayat).order_by('-date')[:10]
    return Response([
        {
            'date': p.date,
            'risk_level': p.risk_level,
            'confidence': p.confidence,
            'pest_types': p.pest_types,
        }
        for p in predictions
    ])


@api_view(['POST'])
def irrigation_schedule(request):
    crop = request.data.get('crop', 'paddy')
    stage = request.data.get('growth_stage', 'mid')
    weather = request.data.get('weather', {})
    result = irrigation_scheduler.calculate_schedule(crop, stage, weather)
    return Response(result)


@api_view(['POST'])
def downscale_forecast(request):
    block_data = request.data.get('block_data', {
        'temperature': 30, 'rainfall': 5, 'humidity': 75, 'wind_speed': 2
    })
    panchayat_id = request.data.get('panchayat_id')

    if panchayat_id:
        panchayat = get_object_or_404(Panchayat, id=panchayat_id)
        result = weather_downscaler.downscale(block_data, panchayat)
        return Response(result)

    return Response({'error': 'panchayat_id required'}, status=400)


@api_view(['POST'])
def check_early_warning(request):
    forecast = request.data.get('forecast', {})
    alerts = early_warning.check_extremes(forecast)
    return Response({
        'alert_count': len(alerts),
        'alerts': alerts,
        'timestamp': date.today().isoformat(),
    })

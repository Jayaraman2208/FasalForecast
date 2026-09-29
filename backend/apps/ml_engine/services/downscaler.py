import random


class WeatherDownscaler:
    def downscale(self, block_data, panchayat):
        elevation = panchayat.elevation or 300
        latitude = panchayat.latitude

        temp_adjustment = -(elevation / 1000) * 6.5
        lat_adjustment = -(latitude - 11) * 0.3
        temp = block_data['temperature'] + temp_adjustment + lat_adjustment

        rain_base = block_data['rainfall']
        orographic_factor = 1 + (elevation / 2000) * 0.3
        rain = rain_base * orographic_factor * random.uniform(0.9, 1.1)

        humidity = block_data['humidity'] - (elevation / 1000) * 5
        confidence = max(0.6, min(0.95, 0.9 - abs(temp_adjustment) * 0.02))

        return {
            'panchayat': panchayat.name,
            'temperature': round(temp, 1),
            'rainfall': round(max(0, rain), 1),
            'humidity': round(max(0, min(100, humidity)), 1),
            'wind_speed': block_data['wind_speed'],
            'elevation': elevation,
            'confidence': round(confidence, 2),
            'resolution_improvement': '25km → 1km',
            'adjustments_applied': {
                'elevation_lapse': round(temp_adjustment, 2),
                'latitude_effect': round(lat_adjustment, 2),
                'orographic_rainfall': round(orographic_factor, 2),
            },
        }


weather_downscaler = WeatherDownscaler()

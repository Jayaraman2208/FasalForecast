class IrrigationScheduler:
    CROP_COEFFICIENTS = {
        'paddy': {'initial': 1.05, 'mid': 1.20, 'late': 0.90},
        'cotton': {'initial': 0.35, 'mid': 1.15, 'late': 0.70},
        'sugarcane': {'initial': 0.40, 'mid': 1.25, 'late': 0.75},
        'groundnut': {'initial': 0.40, 'mid': 1.15, 'late': 0.60},
        'maize': {'initial': 0.30, 'mid': 1.20, 'late': 0.50},
    }

    def calculate_schedule(self, crop_name, growth_stage, weather):
        et0 = self._calculate_et0(
            weather.get('temp', 28),
            weather.get('humidity', 75),
            weather.get('wind', 2)
        )
        kc = self._get_crop_coefficient(crop_name, growth_stage)
        etc = et0 * kc
        rainfall = weather.get('rainfall', 0)
        water_req = max(0, etc - rainfall)

        if water_req > 3:
            return {
                'irrigation_needed': True,
                'water_requirement_mm': round(water_req, 1),
                'et0': round(et0, 2),
                'kc': kc,
                'etc': round(etc, 2),
                'best_time': '6:00 AM' if weather.get('temp', 28) > 30 else '7:00 AM',
                'duration_minutes': int(water_req * 8),
                'water_saved_percent': round(max(0, 100 - water_req * 5), 1),
                'message': f'{round(water_req, 1)}mm water needed',
                'message_tamil': f'{round(water_req, 1)}mm நீர் தேவை',
            }

        return {
            'irrigation_needed': False,
            'water_requirement_mm': 0,
            'et0': round(et0, 2),
            'message': 'Rainfall sufficient — no irrigation needed',
            'message_tamil': 'மழை போதும் — irrigation தேவை இல்லை',
            'water_saved_percent': 100,
        }

    def _calculate_et0(self, temp, humidity, wind):
        return 0.0023 * (temp + 17.8) * ((temp - 10) ** 0.5) * (1 - humidity / 100) * (1 + 0.5 * wind)

    def _get_crop_coefficient(self, crop_name, stage):
        crop = self.CROP_COEFFICIENTS.get(crop_name.lower(), self.CROP_COEFFICIENTS['paddy'])
        if stage in ['initial', 'sowing']:
            return crop['initial']
        elif stage in ['mid', 'vegetative', 'flowering']:
            return crop['mid']
        return crop['late']


irrigation_scheduler = IrrigationScheduler()

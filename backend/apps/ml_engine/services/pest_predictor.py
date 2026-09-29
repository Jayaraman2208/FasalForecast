class PestPredictor:
    def predict(self, temp, humidity, rainfall, wind_speed):
        risk_score = 0
        if 25 <= temp <= 32: risk_score += 30
        elif 20 <= temp < 25 or 32 < temp <= 35: risk_score += 15
        if humidity > 75: risk_score += 35
        elif humidity > 60: risk_score += 20
        if rainfall > 5: risk_score += 20
        elif rainfall > 2: risk_score += 10
        if wind_speed < 3: risk_score += 15

        if risk_score >= 70:
            level = 'high'; confidence = 0.85
        elif risk_score >= 40:
            level = 'medium'; confidence = 0.72
        else:
            level = 'low'; confidence = 0.65

        pests = self._get_pest_types(temp, humidity, rainfall)

        return {
            'risk_level': level,
            'risk_score': risk_score,
            'confidence': confidence,
            'pest_types': pests,
            'recommendation': self._get_recommendation(level, pests),
        }

    def _get_pest_types(self, temp, humidity, rainfall):
        pests = []
        if temp > 28 and humidity > 70:
            pests.append({'name': 'Aphids', 'tamil': 'அசுவினி'})
        if temp > 30 and humidity < 50:
            pests.append({'name': 'Thrips', 'tamil': 'இலைசுரங்கப்புழு'})
        if rainfall > 5 and humidity > 80:
            pests.append({'name': 'Leaf Blight', 'tamil': 'இலை கருகல்'})
        if 25 <= temp <= 30 and humidity > 75:
            pests.append({'name': 'Stem Borer', 'tamil': 'தண்டு துளைப்பான்'})
        if not pests:
            pests.append({'name': 'No major risk', 'tamil': 'பெரிய ஆபத்து இல்லை'})
        return pests

    def _get_recommendation(self, level, pests):
        if level == 'high':
            return "உடனே approved pesticide spray பண்ணுங்க. Field inspect பண்ணுங்க."
        elif level == 'medium':
            return "Field monitor பண்ணுங்க. 2 days la spray plan பண்ணுங்க."
        return "Regular monitoring போதும். No immediate action needed."

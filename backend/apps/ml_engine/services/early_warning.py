from datetime import datetime, timedelta


class EarlyWarningSystem:
    """Extreme weather detection based on forecast"""

    def check_extremes(self, forecast):
        alerts = []

        if forecast.get('rainfall', 0) > 50:
            alerts.append({
                'type': 'flood',
                'severity': 'critical',
                'message': f"Heavy rain warning: {forecast['rainfall']}mm expected. Move livestock to higher ground.",
                'message_tamil': f"கனமழை எச்சரிக்கை: {forecast['rainfall']}mm. கால்நடைகளை பாதுகாப்பான இடத்திற்கு மாற்றுங்கள்.",
                'actions': ['Drainage channels clear pannunga', 'Harvested crops safe place la store pannunga'],
            })
        elif forecast.get('rainfall', 0) > 25:
            alerts.append({
                'type': 'flood',
                'severity': 'medium',
                'message': f"Moderate rain: {forecast['rainfall']}mm expected. Prepare drainage.",
                'message_tamil': f"மிதமான மழை: {forecast['rainfall']}mm. வடிகால் தயார் செய்யுங்கள்.",
                'actions': ['Field drainage check pannunga'],
            })

        if forecast.get('temperature_max', 0) > 40:
            alerts.append({
                'type': 'heatwave',
                'severity': 'critical',
                'message': f"Heatwave: {forecast['temperature_max']}°C. Irrigate early morning.",
                'message_tamil': f"வெப்ப அலை: {forecast['temperature_max']}°C. அதிகாலையில் நீர் பாய்ச்சுங்கள்.",
                'actions': ['Early morning irrigation', 'Mulching apply pannunga'],
            })

        if forecast.get('temperature_min', 100) < 5:
            alerts.append({
                'type': 'coldwave',
                'severity': 'high',
                'message': f"Cold wave: {forecast['temperature_min']}°C. Protect sensitive crops.",
                'message_tamil': f"குளிர் அலை: {forecast['temperature_min']}°C. பயிர்களை பாதுகாக்கவும்.",
                'actions': ['Smoke pannunga', 'Plastic mulch use pannunga'],
            })

        if forecast.get('rainfall', 0) < 1 and forecast.get('humidity', 0) < 30:
            alerts.append({
                'type': 'drought',
                'severity': 'medium',
                'message': "Dry conditions. Monitor soil moisture.",
                'message_tamil': "வறண்ட நிலை. மண் ஈரப்பதத்தை கவனிக்கவும்.",
                'actions': ['Drip irrigation use pannunga'],
            })

        return alerts


early_warning = EarlyWarningSystem()

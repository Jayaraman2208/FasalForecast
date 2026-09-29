from django.core.management.base import BaseCommand
from apps.advisory.models import Crop, CropAdvisoryRule


class Command(BaseCommand):
    help = 'Load crop data + advisory rules'

    def handle(self, *args, **kwargs):
        crops_data = [
            {'name': 'Paddy', 'tamil_name': 'நெல்', 'season': 'kharif',
             'growth_stages': ['sowing', 'vegetative', 'flowering', 'harvest'],
             'description': 'Main food crop of Tamil Nadu'},
            {'name': 'Cotton', 'tamil_name': 'பருத்தி', 'season': 'kharif',
             'growth_stages': ['sowing', 'vegetative', 'flowering', 'harvest'],
             'description': 'Cash crop'},
            {'name': 'Sugarcane', 'tamil_name': 'கரும்பு', 'season': 'zaid',
             'growth_stages': ['planting', 'tillering', 'grand_growth', 'harvest'],
             'description': 'Long duration crop'},
            {'name': 'Groundnut', 'tamil_name': 'வேர்க்கடலை', 'season': 'kharif',
             'growth_stages': ['sowing', 'flowering', 'pod_formation', 'harvest'],
             'description': 'Oil seed crop'},
            {'name': 'Maize', 'tamil_name': 'மக்காச்சோளம்', 'season': 'kharif',
             'growth_stages': ['sowing', 'vegetative', 'tasseling', 'harvest'],
             'description': 'Fodder + food crop'},
        ]

        for c in crops_data:
            Crop.objects.get_or_create(name=c['name'], defaults=c)

        paddy = Crop.objects.get(name='Paddy')
        cotton = Crop.objects.get(name='Cotton')
        groundnut = Crop.objects.get(name='Groundnut')

        rules = [
            {'crop': paddy, 'growth_stage': 'sowing',
             'condition': {'temp_min': 20, 'temp_max': 35, 'humidity_min': 60},
             'advisory_text': 'Ideal sowing conditions. Maintain 2-3 cm water level.',
             'advisory_tamil': 'நல்ல நடவு நிலை. 2-3 செ.மீ நீர் அளவு பராமரிக்கவும்.',
             'priority': 'high'},
            {'crop': paddy, 'growth_stage': 'flowering',
             'condition': {'temp_min': 25, 'temp_max': 35, 'humidity_min': 70},
             'advisory_text': 'Flowering stage. Avoid water stress. Apply potash.',
             'advisory_tamil': 'பூக்கும் நிலை. நீர் அழுத்தம் தவிர்க்கவும். பொட்டாஷ் இடவும்.',
             'priority': 'high'},
            {'crop': cotton, 'growth_stage': 'sowing',
             'condition': {'temp_min': 25, 'temp_max': 35, 'rainfall_max': 10},
             'advisory_text': 'Sowing window open. Use treated seeds.',
             'advisory_tamil': 'விதைப்பு காலம். சுத்திகரிக்கப்பட்ட விதைகளை பயன்படுத்தவும்.',
             'priority': 'high'},
            {'crop': cotton, 'growth_stage': 'flowering',
             'condition': {'temp_min': 25, 'temp_max': 32, 'humidity_min': 60},
             'advisory_text': 'High pest risk during flowering. Monitor bollworm.',
             'advisory_tamil': 'பூக்கும் நிலையில் பூச்சி ஆபத்து. காய்ப்புழுவை கண்காணிக்கவும்.',
             'priority': 'high'},
            {'crop': groundnut, 'growth_stage': 'sowing',
             'condition': {'temp_min': 25, 'temp_max': 35, 'humidity_min': 50},
             'advisory_text': 'Good sowing conditions. Treat seeds with fungicide.',
             'advisory_tamil': 'நல்ல விதைப்பு நிலை. பூஞ்சைக்கொல்லி கொண்டு விதைகளை நேர்த்தி செய்யவும்.',
             'priority': 'medium'},
        ]

        for r in rules:
            CropAdvisoryRule.objects.get_or_create(
                crop=r['crop'], growth_stage=r['growth_stage'],
                defaults=r
            )

        self.stdout.write(self.style.SUCCESS(
            f'✅ Loaded {Crop.objects.count()} crops, {CropAdvisoryRule.objects.count()} rules'
        ))

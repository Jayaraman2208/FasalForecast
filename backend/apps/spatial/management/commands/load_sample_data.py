from django.core.management.base import BaseCommand
from apps.spatial.models import District, Block, Panchayat
from apps.weather.models import PanchayatForecast
from apps.advisory.models import Advisory
from datetime import date, timedelta
import random


class Command(BaseCommand):
    help = 'Load sample data for FasalForecast'

    def handle(self, *args, **kwargs):
        self.stdout.write(self.style.WARNING('Loading sample data...'))

        # Districts
        d1, _ = District.objects.get_or_create(name="Coimbatore", state="Tamil Nadu")
        d2, _ = District.objects.get_or_create(name="Erode", state="Tamil Nadu")
        d3, _ = District.objects.get_or_create(name="Salem", state="Tamil Nadu")

        # Blocks
        b1, _ = Block.objects.get_or_create(name="Annur", district=d1)
        b2, _ = Block.objects.get_or_create(name="Mettupalayam", district=d1)
        b3, _ = Block.objects.get_or_create(name="Sathyamangalam", district=d2)
        b4, _ = Block.objects.get_or_create(name="Omalur", district=d3)

        # Panchayats
        p1, _ = Panchayat.objects.get_or_create(
            name="Kariyampalayam", block=b1,
            defaults={'latitude': 11.2345, 'longitude': 77.1234, 'elevation': 450.0}
        )
        p2, _ = Panchayat.objects.get_or_create(
            name="Velliankadu", block=b1,
            defaults={'latitude': 11.2456, 'longitude': 77.1345, 'elevation': 460.0}
        )
        p3, _ = Panchayat.objects.get_or_create(
            name="Sirumugai", block=b2,
            defaults={'latitude': 11.3567, 'longitude': 77.0123, 'elevation': 380.0}
        )
        p4, _ = Panchayat.objects.get_or_create(
            name="Bhavani", block=b3,
            defaults={'latitude': 11.4456, 'longitude': 77.6789, 'elevation': 320.0}
        )
        p5, _ = Panchayat.objects.get_or_create(
            name="Omalur Town", block=b4,
            defaults={'latitude': 11.6789, 'longitude': 78.0123, 'elevation': 280.0}
        )

        # Forecasts (next 5 days)
        panchayats = [p1, p2, p3, p4, p5]
        for p in panchayats:
            for i in range(5):
                PanchayatForecast.objects.get_or_create(
                    panchayat=p,
                    date=date.today() + timedelta(days=i),
                    defaults={
                        'temperature_max': round(28 + random.uniform(-2, 5), 1),
                        'temperature_min': round(20 + random.uniform(-2, 3), 1),
                        'rainfall': round(random.uniform(0, 15), 1),
                        'humidity': round(random.uniform(60, 90), 1),
                    }
                )

        # Advisories
        advisory_data = [
            (p1, 'Inniku irrigation vendaam — mazhai varum.', 'irrigation', 'high'),
            (p1, 'Humidity adhikam — pest attack chance irukku.', 'pest', 'medium'),
            (p2, 'Sowing-ku best time — temperature 25°C.', 'sowing', 'low'),
            (p3, 'Harvest-ku ready — next 3 days dry weather.', 'harvest', 'medium'),
            (p4, 'Urea apply pannunga — light rain expected.', 'irrigation', 'low'),
            (p5, 'Heavy rain warning — next 48 hours.', 'pest', 'high'),
        ]
        for p, text, cat, sev in advisory_data:
            Advisory.objects.get_or_create(
                panchayat=p, date=date.today(), category=cat,
                defaults={'advisory_text': text, 'severity': sev}
            )

        # Summary
        self.stdout.write(self.style.SUCCESS('\n✅ Sample data loaded!'))
        self.stdout.write(f'  Districts: {District.objects.count()}')
        self.stdout.write(f'  Blocks: {Block.objects.count()}')
        self.stdout.write(f'  Panchayats: {Panchayat.objects.count()}')
        self.stdout.write(f'  Forecasts: {PanchayatForecast.objects.count()}')
        self.stdout.write(f'  Advisories: {Advisory.objects.count()}')

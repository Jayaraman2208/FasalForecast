from apps.spatial.models import District, Block, Panchayat
from apps.weather.models import PanchayatForecast
from apps.advisory.models import Advisory
from datetime import date, timedelta

# Districts
d1, _ = District.objects.get_or_create(name="Coimbatore", state="Tamil Nadu")
d2, _ = District.objects.get_or_create(name="Erode", state="Tamil Nadu")
d3, _ = District.objects.get_or_create(name="Salem", state="Tamil Nadu")

# Blocks
b1, _ = Block.objects.get_or_create(name="Annur", district=d1)
b2, _ = Block.objects.get_or_create(name="Mettupalayam", district=d1)
b3, _ = Block.objects.get_or_create(name="Sathyamangalam", district=d2)

# Panchayats
p1, _ = Panchayat.objects.get_or_create(name="Kariyampalayam", block=b1, defaults={'latitude': 11.2345, 'longitude': 77.1234, 'elevation': 450.0})
p2, _ = Panchayat.objects.get_or_create(name="Velliankadu", block=b1, defaults={'latitude': 11.2456, 'longitude': 77.1345, 'elevation': 460.0})
p3, _ = Panchayat.objects.get_or_create(name="Sirumugai", block=b2, defaults={'latitude': 11.3567, 'longitude': 77.0123, 'elevation': 380.0})
p4, _ = Panchayat.objects.get_or_create(name="Bhavani", block=b3, defaults={'latitude': 11.4456, 'longitude': 77.6789, 'elevation': 320.0})

# Forecasts (next 5 days)
panchayats = [p1, p2, p3, p4]
import random
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
Advisory.objects.get_or_create(
    panchayat=p1, date=date.today(),
    defaults={'advisory_text': 'Inniku irrigation vendaam — mazhai varum.', 'category': 'irrigation', 'severity': 'high'}
)
Advisory.objects.get_or_create(
    panchayat=p1, date=date.today(),
    defaults={'advisory_text': 'Humidity adhikam — pest attack chance irukku.', 'category': 'pest', 'severity': 'medium'}
)

print("✅ Sample data loaded!")
print(f"Districts: {District.objects.count()}")
print(f"Blocks: {Block.objects.count()}")
print(f"Panchayats: {Panchayat.objects.count()}")
print(f"Forecasts: {PanchayatForecast.objects.count()}")
print(f"Advisories: {Advisory.objects.count()}")

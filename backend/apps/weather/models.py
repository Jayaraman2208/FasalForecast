from django.db import models
from apps.spatial.models import Block, Panchayat
class BlockForecast(models.Model):
    block = models.ForeignKey(Block, on_delete=models.CASCADE)
    date = models.DateField()
    temperature_max = models.FloatField()
    temperature_min = models.FloatField()
    rainfall = models.FloatField()
    humidity = models.FloatField()
    class Meta: unique_together = ['block', 'date']
    def __str__(self): return f"{self.block.name} - {self.date}"
class PanchayatForecast(models.Model):
    panchayat = models.ForeignKey(Panchayat, on_delete=models.CASCADE)
    date = models.DateField()
    temperature_max = models.FloatField()
    temperature_min = models.FloatField()
    rainfall = models.FloatField()
    humidity = models.FloatField()
    class Meta: unique_together = ['panchayat', 'date']
    def __str__(self): return f"{self.panchayat.name} - {self.date}"

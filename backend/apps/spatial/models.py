from django.db import models
class District(models.Model):
    name = models.CharField(max_length=100)
    state = models.CharField(max_length=100)
    def __str__(self): return self.name
class Block(models.Model):
    name = models.CharField(max_length=100)
    district = models.ForeignKey(District, on_delete=models.CASCADE)
    def __str__(self): return f"{self.name} ({self.district.name})"
class Panchayat(models.Model):
    name = models.CharField(max_length=100)
    block = models.ForeignKey(Block, on_delete=models.CASCADE)
    latitude = models.FloatField()
    longitude = models.FloatField()
    elevation = models.FloatField(null=True, blank=True)
    def __str__(self): return f"{self.name} ({self.block.name})"

from django.db import models
from apps.spatial.models import Panchayat
class Advisory(models.Model):
    CATEGORY_CHOICES = [('irrigation','Irrigation'),('pest','Pest Alert'),('sowing','Sowing'),('harvest','Harvest')]
    SEVERITY_CHOICES = [('low','Low'),('medium','Medium'),('high','High')]
    panchayat = models.ForeignKey(Panchayat, on_delete=models.CASCADE)
    date = models.DateField()
    advisory_text = models.TextField()
    category = models.CharField(max_length=50, choices=CATEGORY_CHOICES)
    severity = models.CharField(max_length=10, choices=SEVERITY_CHOICES)
    def __str__(self): return f"{self.panchayat.name} - {self.category} - {self.date}"
from django.db import models

class Crop(models.Model):
    SEASON_CHOICES = [
        ('kharif', 'Kharif (Jun-Oct)'),
        ('rabi', 'Rabi (Nov-Mar)'),
        ('zaid', 'Zaid (Apr-Jun)'),
    ]
    name = models.CharField(max_length=100, unique=True)
    tamil_name = models.CharField(max_length=100, blank=True)
    season = models.CharField(max_length=20, choices=SEASON_CHOICES)
    growth_stages = models.JSONField(default=list)
    description = models.TextField(blank=True)

    def __str__(self):
        return f"{self.name} ({self.season})"


class CropAdvisoryRule(models.Model):
    PRIORITY_CHOICES = [
        ('high', 'High'),
        ('medium', 'Medium'),
        ('low', 'Low'),
    ]
    crop = models.ForeignKey(Crop, on_delete=models.CASCADE, related_name='rules')
    growth_stage = models.CharField(max_length=50)
    condition = models.JSONField(default=dict)
    advisory_text = models.TextField()
    advisory_tamil = models.TextField(blank=True)
    priority = models.CharField(max_length=10, choices=PRIORITY_CHOICES, default='medium')

    def __str__(self):
        return f"{self.crop.name} - {self.growth_stage} - {self.priority}"
from django.db import models

class EarlyWarning(models.Model):
    WARNING_TYPES = [
        ('flood', 'Flood'),
        ('drought', 'Drought'),
        ('heatwave', 'Heatwave'),
        ('coldwave', 'Cold Wave'),
        ('storm', 'Storm'),
    ]
    SEVERITY_CHOICES = [
        ('low', 'Low'),
        ('medium', 'Medium'),
        ('high', 'High'),
        ('critical', 'Critical'),
    ]
    panchayat = models.ForeignKey('spatial.Panchayat', on_delete=models.CASCADE)
    warning_type = models.CharField(max_length=20, choices=WARNING_TYPES)
    severity = models.CharField(max_length=10, choices=SEVERITY_CHOICES)
    message = models.TextField()
    message_tamil = models.TextField(blank=True)
    valid_from = models.DateTimeField()
    valid_until = models.DateTimeField()
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f"{self.panchayat.name} - {self.warning_type} - {self.severity}"

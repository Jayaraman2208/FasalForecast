from django.db import models


class PestPrediction(models.Model):
    RISK_CHOICES = [
        ('low', 'Low'),
        ('medium', 'Medium'),
        ('high', 'High'),
    ]
    panchayat = models.ForeignKey('spatial.Panchayat', on_delete=models.CASCADE)
    date = models.DateField()
    risk_level = models.CharField(max_length=10, choices=RISK_CHOICES)
    confidence = models.FloatField()
    pest_types = models.JSONField(default=list)
    temperature = models.FloatField()
    humidity = models.FloatField()

    class Meta:
        unique_together = ['panchayat', 'date']

    def __str__(self):
        return f"{self.panchayat.name} - {self.date} - {self.risk_level}"

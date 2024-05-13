from django.db import models

# Create your models here.
class Job(models.Model):
    id = models.CharField(max_length=5, primary_key=True)
    name = models.CharField(max_length=255)
    status = models.BooleanField(default=False)
    xp = models.PositiveIntegerField(default=0) 
    des = models.TextField()
    salary = models.PositiveIntegerField(default=0) 
    admin = models.CharField(max_length=255)
    company = models.CharField(max_length=255)  
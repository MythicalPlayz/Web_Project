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

class Company(models.Model):
    name = models.CharField(max_length=255)
    jobid = models.CharField(max_length=5)

    class Meta:
        # Define a composite key
        unique_together = ('name', 'jobid')


class Applicant(models.Model):
    username = models.CharField(max_length=255)
    jobid = models.CharField(max_length=5)
    time = models.DateTimeField()
    fullname = models.CharField(max_length=255)
    email = models.EmailField()
    admin = models.CharField(max_length=255, null=True)
    status = models.CharField(max_length=20 ,default='pending')

    class Meta:
        # Define a composite key
        unique_together = ('username', 'jobid', 'time')
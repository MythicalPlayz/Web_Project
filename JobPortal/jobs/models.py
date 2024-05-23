from django.db import models
import uuid
import os

def generate_unique_filename(instance, filename):
    ext = filename.split('.')[-1]
    unique_filename = f"{uuid.uuid4().hex}.{ext}"
    return os.path.join('resumes/', unique_filename)

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
    class Meta:
        unique_together = ('name', 'jobid')

    jobid = models.CharField(max_length=5, primary_key=True)
    name = models.CharField(max_length=255)


class Applicant(models.Model):
    username = models.CharField(max_length=255)
    jobid = models.CharField(max_length=5)
    time = models.DateTimeField(auto_now_add=True)
    fullname = models.CharField(max_length=255)
    email = models.EmailField()
    admin = models.CharField(max_length=255, null=True, default=None)
    status = models.CharField(max_length=20 ,default='pending')
    resume = models.FileField(upload_to=generate_unique_filename)

    class Meta:
        # Define a composite key
        unique_together = ('username', 'jobid', 'time')
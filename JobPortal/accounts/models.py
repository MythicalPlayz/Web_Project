from django.db import models
from django.contrib.auth.models import AbstractUser

# Create your models here.
class Account(AbstractUser):
    username = models.CharField(max_length=255, primary_key=True)
    password = models.CharField(max_length=255)
    account_type = models.BooleanField(default=False)
    email = models.EmailField()
    company = models.CharField(max_length=255, null=True, default=None, blank=True)


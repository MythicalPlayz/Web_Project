# Generated by Django 5.0.6 on 2024-05-22 20:23

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('jobs', '0004_alter_company_jobid_alter_company_name'),
    ]

    operations = [
        migrations.AlterField(
            model_name='applicant',
            name='admin',
            field=models.CharField(default=None, max_length=255, null=True),
        ),
    ]
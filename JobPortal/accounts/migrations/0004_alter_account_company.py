# Generated by Django 5.0.6 on 2024-05-20 20:59

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0003_alter_account_company_alter_account_email_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='account',
            name='company',
            field=models.CharField(blank=True, default=None, max_length=255, null=True),
        ),
    ]

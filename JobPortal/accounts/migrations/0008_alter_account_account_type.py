# Generated by Django 5.0.6 on 2024-05-21 23:02

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0007_alter_account_account_type'),
    ]

    operations = [
        migrations.AlterField(
            model_name='account',
            name='account_type',
            field=models.IntegerField(choices=[(0, 'user'), (1, 'coadmin')], default=0),
        ),
    ]

# Generated by Django 5.0.6 on 2024-05-12 21:13

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('posts', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='post',
            name='length',
            field=models.IntegerField(default=8),
        ),
    ]

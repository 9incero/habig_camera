# Generated by Django 4.1.3 on 2023-10-09 06:57

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('events', '0002_img'),
    ]

    operations = [
        migrations.AddField(
            model_name='img',
            name='imgname',
            field=models.CharField(default='', max_length=200),
        ),
    ]

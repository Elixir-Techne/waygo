# Generated by Django 4.2.2 on 2023-07-09 03:36

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0003_alter_lotdata_rh'),
    ]

    operations = [
        migrations.AddField(
            model_name='lot',
            name='duration',
            field=models.DurationField(null=True),
        ),
        migrations.DeleteModel(
            name='StatusReport',
        ),
    ]

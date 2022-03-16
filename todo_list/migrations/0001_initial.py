# Generated by Django 3.2.12 on 2022-03-14 21:05

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Todo',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=100)),
                ('description', models.TextField(max_length=1000)),
                ('date', models.CharField(blank=True, max_length=30, null=True)),
                ('time', models.CharField(blank=True, max_length=30, null=True)),
            ],
        ),
    ]

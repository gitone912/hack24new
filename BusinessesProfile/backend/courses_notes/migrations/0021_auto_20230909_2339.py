# Generated by Django 3.2.8 on 2023-09-09 23:39

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('courses_notes', '0020_auto_20230909_2321'),
    ]

    operations = [
        migrations.AlterField(
            model_name='dashboard',
            name='videos',
            field=models.ManyToManyField(blank=True, related_name='dashboards', to='courses_notes.Videos'),
        ),
        migrations.AlterField(
            model_name='playlist',
            name='all_videos',
            field=models.ManyToManyField(blank=True, related_name='playlists', to='courses_notes.Videos'),
        ),
    ]

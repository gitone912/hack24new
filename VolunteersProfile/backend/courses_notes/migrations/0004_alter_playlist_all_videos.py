# Generated by Django 4.0 on 2023-07-15 20:22

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('courses_notes', '0003_dashboard_videos_alter_playlist_all_videos'),
    ]

    operations = [
        migrations.AlterField(
            model_name='playlist',
            name='all_videos',
            field=models.ManyToManyField(blank=True, related_name='playlists', to='courses_notes.Videos'),
        ),
    ]
# Generated by Django 4.0 on 2023-07-17 04:47

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('userAccount', '0003_alter_userposts_img_alter_userprofile_image'),
    ]

    operations = [
        migrations.AddField(
            model_name='userprofile',
            name='social_link1',
            field=models.CharField(default='', max_length=100),
        ),
        migrations.AddField(
            model_name='userprofile',
            name='social_link2',
            field=models.CharField(default='', max_length=100),
        ),
        migrations.AddField(
            model_name='userprofile',
            name='social_link3',
            field=models.CharField(default='', max_length=100),
        ),
    ]
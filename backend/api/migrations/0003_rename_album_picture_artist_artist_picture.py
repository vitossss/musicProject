# Generated by Django 4.0.4 on 2022-05-27 14:16

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0002_remove_track_duration'),
    ]

    operations = [
        migrations.RenameField(
            model_name='artist',
            old_name='album_picture',
            new_name='artist_picture',
        ),
    ]

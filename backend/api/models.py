from django.db import models


# Create your models here.

class User(models.Model):
    username = models.CharField(verbose_name='Username', max_length=100)
    email = models.EmailField(verbose_name='Email', max_length=100)
    password = models.CharField(verbose_name='Password', max_length=255)

    def __str__(self):
        return self.username


class Artist(models.Model):
    artist_name = models.CharField(verbose_name='Artist name', max_length=100)
    album_picture = models.ImageField(upload_to='media/artist_img', verbose_name='Picture',
                                      max_length=100, null=True, blank=True)

    def __str__(self):
        return self.artist_name


class Album(models.Model):
    album_title = models.CharField(verbose_name='Title', max_length=255)
    album_picture = models.ImageField(upload_to='media/album_img', verbose_name='Picture',
                                      max_length=100, null=True, blank=True)
    release_date = models.DateTimeField(auto_now=False, auto_now_add=True)
    artist = models.ForeignKey(Artist, on_delete=models.CASCADE)

    def __str__(self):
        return self.album_title


class Track(models.Model):
    track_title = models.CharField(verbose_name='Title', max_length=255)
    duration = models.TimeField(verbose_name='Duration', auto_now=False, auto_now_add=False)
    track_url = models.URLField(max_length=255)
    track_picture = models.ImageField(upload_to='media/track_img', verbose_name='Picture',
                                      max_length=100, null=True, blank=True)
    artist = models.ForeignKey(Artist, on_delete=models.CASCADE)
    album = models.ForeignKey(Album, on_delete=models.CASCADE, null=True, blank=True)

    def __str__(self):
        return self.track_title


class Like(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True)
    track = models.ForeignKey(Track, on_delete=models.CASCADE, null=True)

    def __str__(self):
        return f'{self.user}, {self.track}'

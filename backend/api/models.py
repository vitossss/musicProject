from django.db import models

from django.contrib.auth.models import (
    AbstractBaseUser, BaseUserManager, PermissionsMixin
)


class UserManager(BaseUserManager):

    def create_user(self, username, email, password=None):
        """ Створює і вертає юзера з емейлом, паролем і ім'ям """
        if username is None:
            raise TypeError('Users must have a username.')

        if email is None:
            raise TypeError('Users must have an email address.')

        user = self.model(username=username, email=self.normalize_email(email))
        user.set_password(password)
        user.save()

        return user

    def create_superuser(self, username, email, password):
        """ Вертає юзера з правами суперадміна """
        if password is None:
            raise TypeError('Superusers must have a password.')

        user = self.create_user(username, email, password)
        user.is_superuser = True
        user.is_staff = True
        user.save()

        return user


class User(AbstractBaseUser, PermissionsMixin):
    username = models.CharField(db_index=True, max_length=255, unique=True)
    email = models.EmailField(db_index=True, unique=True)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']

    objects = UserManager()

    def __str__(self):
        return self.email

    def get_full_name(self):
        return self.username

    def get_short_name(self):
        return self.username


class Artist(models.Model):
    artist_name = models.CharField(verbose_name='Artist name', max_length=100)
    artist_picture = models.ImageField(upload_to='media/artist_img', verbose_name='Picture',
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


class Playlist(models.Model):
    title = models.CharField(verbose_name='Title', max_length=50)
    user = models.ForeignKey(User, on_delete=models.CASCADE)

    def __str__(self):
        return self.title


class Track(models.Model):
    track_title = models.CharField(verbose_name='Title', max_length=255)
    track_url = models.URLField(max_length=255)
    track_picture = models.ImageField(upload_to='media/track_img', verbose_name='Picture',
                                      max_length=100, null=True, blank=True)
    artist = models.ManyToManyField(Artist)
    album = models.ForeignKey(Album, on_delete=models.CASCADE, null=True, blank=True)
    playlist = models.ManyToManyField(Playlist, null=True, blank=True)

    def __str__(self):
        return self.track_title


class Like(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True)
    track = models.OneToOneField(Track, on_delete=models.CASCADE, null=True)

    def __str__(self):
        return f'{self.user}, {self.track}'

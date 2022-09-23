from rest_framework import serializers
from .models import User, Artist, Album, Track, Like, Playlist

from django.contrib.auth.models import AnonymousUser


class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ['id', 'username', 'email']


class ArtistSerializer(serializers.ModelSerializer):

    class Meta:
        model = Artist
        fields = ['id', 'artist_name', 'artist_picture']


class AlbumsSerializer(serializers.ModelSerializer):

    class Meta:
        model = Album
        fields = ['id', 'album_title', 'album_picture', 'release_date', 'artist']


class PlaylistSerializer(serializers.ModelSerializer):

    class Meta:
        model = Playlist
        fields = ['id', 'title']


class TracksArtistSerializer(serializers.ModelSerializer):

    class Meta:
        model = Artist
        fields = ['id', 'artist_name', 'artist_picture']


class TracksSerializer(serializers.ModelSerializer):
    artist = TracksArtistSerializer(many=True)
    is_liked = serializers.SerializerMethodField()
    track_picture = serializers.SerializerMethodField()

    class Meta:
        model = Track
        fields = ['id', 'track_title', 'track_url', 'track_picture', 'artist', 'album', 'is_liked', 'playlist']

    def get_is_liked(self, obj):
        user = None
        request = self.context.get('request')
        if request:
            user = request.user
        else:
            return False
        if type(user) == AnonymousUser:
            return False
        return Like.objects.filter(user=user, track=obj).exists()

    def get_track_picture(self, track):
        request = self.context.get('request')
        try:
            track_picture = track.track_picture.url
            return request.build_absolute_uri(track_picture)
        except AttributeError:
            raise Exception('Vitaliy add context request')


class LikesSerializer(serializers.ModelSerializer):

    class Meta:
        model = Like
        fields = ['user', 'track']

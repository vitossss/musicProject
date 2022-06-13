from rest_framework import serializers
from .models import User, Artist, Album, Track, Like


class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'password']


class ArtistSerializer(serializers.ModelSerializer):

    class Meta:
        model = Artist
        fields = ['id', 'artist_name', 'artist_picture']


class AlbumsSerializer(serializers.ModelSerializer):

    class Meta:
        model = Album
        fields = ['id', 'album_title', 'album_picture', 'release_date', 'artist']


class TracksArtistSerializer(serializers.ModelSerializer):

    class Meta:
        model = Artist
        fields = ['id', 'artist_name', 'artist_picture']


class TracksSerializer(serializers.ModelSerializer):
    artist = TracksArtistSerializer(many=True)

    class Meta:
        model = Track
        fields = ['id', 'track_title', 'track_url', 'track_picture', 'artist', 'album']


class LikesSerializer(serializers.ModelSerializer):

    class Meta:
        model = Like
        fields = ['user', 'track']

from rest_framework import generics
from .models import Artist, Album, Track, Like
from .serializers import ArtistSerializer, AlbumsSerializer, TracksSerializer, LikesSerializer

# Artists
class ArtistAPI(generics.ListAPIView):
    queryset = Artist.objects.all()
    serializer_class = ArtistSerializer


# class ArtistCreateAPI(generics.CreateAPIView):
#     queryset = Artist.objects.all()
#     serializer_class = ArtistSerializer


# class ArtistUpdateAPI(generics.RetrieveUpdateAPIView):
#     queryset = Artist.objects.all()
#     serializer_class = ArtistSerializer


# class ArtistDeleteAPI(generics.DestroyAPIView):
#     queryset = Artist.objects.all()
#     serializer_class = ArtistSerializer

# Albums
class AlbumAPI(generics.ListAPIView):
    queryset = Album.objects.all()
    serializer_class = AlbumsSerializer


class AlbumCreateAPI(generics.CreateAPIView):
    queryset = Album.objects.all()
    serializer_class = AlbumsSerializer


class AlbumGetUpdateAPI(generics.RetrieveUpdateAPIView):
    queryset = Album.objects.all()
    serializer_class = AlbumsSerializer


class AlbumDeleteAPI(generics.DestroyAPIView):
    queryset = Album.objects.all()
    serializer_class = AlbumsSerializer


# Tracks
class TrackAPI(generics.ListAPIView):
    queryset = Track.objects.all()
    serializer_class = TracksSerializer


# class TrackCreateAPI(generics.CreateAPIView):
#     queryset = Track.objects.all()
#     serializer_class = TracksSerializer


class TrackGetUpdateAPI(generics.RetrieveUpdateAPIView):
    queryset = Track.objects.all()
    serializer_class = TracksSerializer


class TrackDeleteAPI(generics.DestroyAPIView):
    queryset = Track.objects.all()
    serializer_class = TracksSerializer


# Likes
class LikeAPI(generics.ListAPIView):
    queryset = Like.objects.all()
    serializer_class = LikesSerializer


class LikeCreateAPI(generics.CreateAPIView):
    queryset = Like.objects.all()
    serializer_class = LikesSerializer


class LikeGetUpdateAPI(generics.RetrieveUpdateAPIView):
    queryset = Like.objects.all()
    serializer_class = LikesSerializer


class LikeDeleteAPI(generics.DestroyAPIView):
    queryset = Track.objects.all()
    serializer_class = LikesSerializer

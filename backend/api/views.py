from rest_framework import generics
from .models import User, Artist, Album, Track, Like
from .serializers import UserSerializer, ArtistSerializer, AlbumsSerializer, TracksSerializer, LikesSerializer

# Create your views here.


class UserAPI(generics.ListAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer


class UserCreateAPI(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer


class UserUpdateAPI(generics.RetrieveUpdateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer


class UserDeleteAPI(generics.DestroyAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer


class ArtistAPI(generics.ListAPIView):
    queryset = Artist.objects.all()
    serializer_class = ArtistSerializer


class ArtistCreateAPI(generics.CreateAPIView):
    queryset = Artist.objects.all()
    serializer_class = ArtistSerializer


class ArtistUpdateAPI(generics.RetrieveUpdateAPIView):
    queryset = Artist.objects.all()
    serializer_class = ArtistSerializer


class ArtistDeleteAPI(generics.DestroyAPIView):
    queryset = Artist.objects.all()
    serializer_class = ArtistSerializer


class AlbumAPI(generics.ListAPIView):
    queryset = Album.objects.all()
    serializer_class = AlbumsSerializer


class AlbumCreateAPI(generics.CreateAPIView):
    queryset = Album.objects.all()
    serializer_class = AlbumsSerializer


class AlbumUpdateAPI(generics.RetrieveUpdateAPIView):
    queryset = Album.objects.all()
    serializer_class = AlbumsSerializer


class AlbumDeleteAPI(generics.DestroyAPIView):
    queryset = Album.objects.all()
    serializer_class = AlbumsSerializer


class TrackAPI(generics.ListAPIView):
    queryset = Track.objects.all()
    serializer_class = TracksSerializer


class TrackCreateAPI(generics.CreateAPIView):
    queryset = Track.objects.all()
    serializer_class = TracksSerializer


class TrackUpdateAPI(generics.RetrieveUpdateAPIView):
    queryset = Track.objects.all()
    serializer_class = TracksSerializer


class TrackDeleteAPI(generics.DestroyAPIView):
    queryset = Track.objects.all()
    serializer_class = TracksSerializer


class LikeAPI(generics.ListAPIView):
    queryset = Like.objects.all()
    serializer_class = LikesSerializer


class LikeCreateAPI(generics.CreateAPIView):
    queryset = Like.objects.all()
    serializer_class = LikesSerializer


class LikeUpdateAPI(generics.RetrieveUpdateAPIView):
    queryset = Like.objects.all()
    serializer_class = LikesSerializer


class LikeDeleteAPI(generics.DestroyAPIView):
    queryset = Track.objects.all()
    serializer_class = LikesSerializer

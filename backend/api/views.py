from rest_framework import generics, views, permissions, status
from rest_framework.response import Response

from .models import Artist, Album, Track, Like, Playlist
from .serializers import ArtistSerializer, AlbumsSerializer, TracksSerializer, LikesSerializer, PlaylistSerializer


# Artists
class ArtistAPI(generics.ListAPIView):
    queryset = Artist.objects.all()
    serializer_class = ArtistSerializer


class ArtistOneAPI(generics.RetrieveAPIView):
    queryset = Artist.objects.all()
    serializer_class = ArtistSerializer


class ArtistTracksAPI(views.APIView):

    def get(self, request, artist_id, *args, **kwargs):
        tracks = Track.objects.filter(artist__id=artist_id)
        if tracks.exists():
            serialized_data = TracksSerializer(tracks, many=True, context={'request': request})
            return Response(serialized_data.data, status=status.HTTP_200_OK)
        else:
            return Response(status=status.HTTP_404_NOT_FOUND)


class AlbumTracksAPI(views.APIView):

    def get(self, request, album_id, *args, **kwargs):
        tracks = Track.objects.filter(album=album_id)
        if tracks.exists():
            serialized_data = TracksSerializer(tracks, many=True, context={'request': request})
            return Response(serialized_data.data, status=status.HTTP_200_OK)
        else:
            return Response(status=status.HTTP_404_NOT_FOUND)


# Albums
class AlbumAPI(generics.ListAPIView):
    queryset = Album.objects.all()
    serializer_class = AlbumsSerializer


class AlbumOneAPI(generics.RetrieveAPIView):
    queryset = Album.objects.all()
    serializer_class = AlbumsSerializer


# Playlists
class PlaylistAPI(views.APIView):

    def get(self, request):
        playlists = Playlist.objects.all()
        serializer = PlaylistSerializer(playlists, many=True, context={'request': request})
        return Response(serializer.data)


class PlaylistOneAPI(views.APIView):

    def get(self, request, pk):
        playlist = Playlist.objects.get(id=pk)
        serializer = PlaylistSerializer(playlist, context={'request': request})
        return Response(serializer.data)


class PlaylistTracksAPI(views.APIView):

    def get(self, request, playlist_id, *args, **kwargs):
        tracks = Track.objects.filter(playlist__id=playlist_id)
        if tracks.exists():
            serialized_data = TracksSerializer(tracks, many=True, context={'request': request})
            return Response(serialized_data.data, status=status.HTTP_200_OK)
        else:
            return Response(status=status.HTTP_404_NOT_FOUND)


class PlaylistCreateAPI(views.APIView):
    permission_classes = (permissions.IsAuthenticated,)

    def post(self, request, *args, **kwargs):
        serialized_data = PlaylistSerializer(data=request.data)
        if serialized_data.is_valid():
            new_playlist = Playlist(title=serialized_data.validated_data["title"], user=request.user)
            new_playlist.save()
            return Response(PlaylistSerializer(new_playlist).data, status=status.HTTP_201_CREATED)
        return Response(serialized_data.errors, status=status.HTTP_400_BAD_REQUEST)


class PlaylistDeleteAPI(views.APIView):
    permission_classes = (permissions.IsAuthenticated,)

    def delete(self, request, playlist_id, *args, **kwargs):
        try:
            playlist = Playlist.objects.get(id=playlist_id)
            playlist.delete()
            return Response(status=status.HTTP_200_OK)
        except Playlist.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)


class PlaylistAddTrackAPI(views.APIView):

    def get(self, request, playlist_id, track_id, *args, **kwargs):
        try:
            track = Track.objects.get(id=track_id)
            playlist = Playlist.objects.get(id=playlist_id)
            track.playlist.add(playlist)
        except Track.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)


# Tracks
class TrackAPI(views.APIView):

    def get(self, request):
        track = Track.objects.all()
        serializer = TracksSerializer(track, many=True, context={'request': request})
        return Response(serializer.data)


class TrackLikeAPI(views.APIView):
    permission_classes = (permissions.IsAuthenticated,)

    def get(self, request, track_id, *args, **kwargs):
        try:
            track = Track.objects.get(id=track_id)
            like = Like.objects.filter(user=request.user, track=track)
            if like.exists():
                like.delete()
                return Response({"id": track.id, "is_liked": False}, status=status.HTTP_200_OK)
            else:
                new_like = Like.objects.create(user=request.user, track=track)
                new_like.save()
                return Response({"id": track.id, "is_liked": True}, status=status.HTTP_201_CREATED)
        except Track.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)


# Likes
class LikeAPI(generics.ListAPIView):
    queryset = Like.objects.all()
    serializer_class = LikesSerializer

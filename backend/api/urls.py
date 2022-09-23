from django.urls import path
from . import views

urlpatterns = [
    path('artists/', views.ArtistAPI.as_view()),
    path('artists/<int:pk>', views.ArtistOneAPI.as_view()),
    path('artists/<int:artist_id>/tracks', views.ArtistTracksAPI.as_view()),
    path('albums/', views.AlbumAPI.as_view()),
    path('albums/<int:pk>', views.AlbumOneAPI.as_view()),
    path('albums/<int:album_id>/tracks', views.AlbumTracksAPI.as_view()),
    path('playlists/', views.PlaylistAPI.as_view()),
    path('playlists/create', views.PlaylistCreateAPI.as_view()),
    path('playlists/<int:playlist_id>/delete', views.PlaylistDeleteAPI.as_view()),
    path('playlists/<int:pk>', views.PlaylistOneAPI.as_view()),
    path('playlists/<int:playlist_id>/tracks', views.PlaylistTracksAPI.as_view()),
    path('playlists/<int:playlist_id>/<int:track_id>', views.PlaylistAddTrackAPI.as_view()),
    path('tracks/', views.TrackAPI.as_view()),
    path('tracks/<int:track_id>/like', views.TrackLikeAPI.as_view()),
    path('likes/', views.LikeAPI.as_view())
]

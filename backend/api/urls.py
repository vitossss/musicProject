from django.urls import path
from . import views

urlpatterns = [
    path('artists/', views.ArtistAPI.as_view()),
    path('artists/create/', views.ArtistCreateAPI.as_view()),
    path('artists/<int:pk>/update/', views.ArtistUpdateAPI.as_view()),
    path('artists/<int:pk>/delete/', views.ArtistDeleteAPI.as_view()),
    path('albums/', views.AlbumAPI.as_view()),
    path('albums/create/', views.AlbumCreateAPI.as_view()),
    path('albums/<int:pk>/update/', views.AlbumUpdateAPI.as_view()),
    path('albums/<int:pk>/delete/', views.AlbumDeleteAPI.as_view()),
    path('tracks/', views.TrackAPI.as_view()),
    path('tracks/create/', views.TrackCreateAPI.as_view()),
    path('tracks/<int:pk>/update/', views.TrackUpdateAPI.as_view()),
    path('tracks/<int:pk>/delete/', views.TrackDeleteAPI.as_view()),
    path('likes/', views.LikeAPI.as_view()),
    path('likes/create/', views.LikeCreateAPI.as_view()),
    path('likes/<int:pk>/update/', views.LikeUpdateAPI.as_view()),
    path('likes/<int:pk>/delete/', views.LikeDeleteAPI.as_view()),
]

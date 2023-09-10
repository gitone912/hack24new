from django.urls import path
from .views import *

urlpatterns = [
    path('userprofiles/', UserProfileCreateView.as_view(), name='userprofile-list-create'),
    path('getuserprofile/', UserProfileRetrieveView.as_view(), name='user-profile'),
    path('posts/', PostsListCreateView.as_view(), name='posts-list-create'),
    path('posts/<int:pk>/', PostsRetrieveDestroyView.as_view(), name='posts-retrieve-destroy'),
    path('likes/', LikesCreateView.as_view(), name='likes-create'),
    path('comments/', CommentsCreateView.as_view(), name='comments-create'),
    path('comments/<int:pk>/', CommentsRetrieveUpdateDestroyView.as_view(), name='comments-retrieve-update-destroy'),
    path('myposts/', MyPosts.as_view(), name='my-posts'),
    path('update-profile/', UserProfileRetrieveUpdateView.as_view(), name='profile-retrieve-update'),



]

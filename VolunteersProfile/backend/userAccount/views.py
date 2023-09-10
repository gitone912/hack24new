from rest_framework import generics
from .models import *
from .serializers import *
from rest_framework.response import Response
from rest_framework.views import APIView
class UserProfileCreateView(APIView):
    serializer_class = UserProfileSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=201)
        return Response(serializer.errors, status=400)


class UserProfileRetrieveView(generics.RetrieveAPIView):
    serializer_class = UserProfileSerializer

    def post(self, request, *args, **kwargs):
        # Extract the email ID from the request
        email = request.data.get('email')

        # Retrieve the UserProfile instance based on the email ID
        try:
            user_profile = UserProfile.objects.get(user__email=email)
            serializer = self.get_serializer(user_profile)
            return Response(serializer.data)
        except UserProfile.DoesNotExist:
            return Response({'error': 'User profile Id not found.'}, status=404)
        
class UserProfileRetrieveUpdateView(APIView):
    serializer_class = UserProfileSerializer

    def get_object(self):
        email = self.request.data.get('user')
        try:
            return UserProfile.objects.get(user=email)
        except UserProfile.DoesNotExist:
            return None

    def post(self, request, *args, **kwargs):
        instance = self.get_object()
        if instance is None:
            return Response({'error': 'User profile not found.'}, status=404)
        
        serializer = self.serializer_class(instance, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=400)
    
class PostsListCreateView(generics.ListCreateAPIView):
    queryset = UserPosts.objects.all()
    serializer_class = PostsSerializer

class PostsRetrieveDestroyView(generics.RetrieveDestroyAPIView):
    queryset = UserPosts.objects.all()
    serializer_class = PostsSerializer
        

class LikesCreateView(generics.CreateAPIView):
    queryset = Likes.objects.all()
    serializer_class = LikesSerializer

class CommentsCreateView(generics.CreateAPIView):
    queryset = Comments.objects.all()
    serializer_class = CommentsSerializer

class CommentsRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Comments.objects.all()
    serializer_class = CommentsSerializer


class MyPosts(APIView):
    serializer_class = PostsSerializer

    def post(self, request, *args, **kwargs):
        # Extract the email ID from the request
        email = request.data.get('email')

        # Retrieve the user based on the email ID
        try:
            user = MyUser.objects.get(email=email)
        except MyUser.DoesNotExist:
            return Response({'error': 'User not found.'}, status=404)

        # Retrieve the posts for the user
        posts = UserPosts.objects.filter(user=user)
        serializer = self.serializer_class(posts, many=True)
        return Response(serializer.data)
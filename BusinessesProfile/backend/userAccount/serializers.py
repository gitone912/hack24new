from rest_framework import serializers
from .models import *

class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserProfile
        fields = '__all__'

class PostsSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserPosts
        fields = '__all__'


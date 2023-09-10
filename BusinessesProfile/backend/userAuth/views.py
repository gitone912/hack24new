from django.shortcuts import render
from django.contrib.auth import authenticate, login, logout
from rest_framework.views import APIView
from rest_framework import status
from rest_framework.response import Response

from userAuth.models import MyUser
from .serializers import UserSerializer , UserLoginSerializer, UserProfileSerializer, UserChangePasswordSerializer,SendMailSerializer,SetNewPasswordSerializer
from .renderer import UserRenderer
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.permissions import IsAuthenticated 

def get_tokens_for_user(user):
    refresh = RefreshToken.for_user(user)

    return {
        'refresh': str(refresh),
        'access': str(refresh.access_token),
    }
class UserRegistration(APIView):
    renderer_classes = [UserRenderer]
    def post(self, request,format=None):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            user = serializer.save()
            token = get_tokens_for_user(user)
            return Response({"token":token,"message":"registration successfull"},status=status.HTTP_201_CREATED)
        return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)
    

class UserLogin(APIView):
    renderer_classes = [UserRenderer]
    def post(self, request,format=None):
        serializer = UserLoginSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            email = serializer.data.get("email")
            password = serializer.data.get("password")
            user = authenticate(email=email, password=password)
            if user is not None:
                token = get_tokens_for_user(user)
                return Response({"token":token,"message":"login successfull"},status=status.HTTP_200_OK)
            else:
                return Response({"errors":"invalid credentials"},status=status.HTTP_400_BAD_REQUEST)
        return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)
    

class UserProfile(APIView):
    renderer_classes = [UserRenderer]
    permission_classes = [IsAuthenticated]
    def get(self, request,format=None):
        serializer = UserProfileSerializer(request.user)
        if serializer.is_valid:
            return Response(serializer.data,status=status.HTTP_200_OK)
        return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)

class UserChangePassword(APIView):
    renderer_classes = [UserRenderer]
    permission_classes = [IsAuthenticated]
    def post(self, request,format=None):
        serializer = UserChangePasswordSerializer(data=request.data,context={"user":request.user})
        if serializer.is_valid(raise_exception=True):
            return Response({"message":"password changed successfully"},status=status.HTTP_200_OK)
        else:
            return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)
        
class SendPasswordResetMail(APIView):
    renderer_classes = [UserRenderer]
    def post(self, request,format=None):
        serializer = SendMailSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            return Response({"message":"password reset mail sent successfully"},status=status.HTTP_200_OK)
        return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)

class UserPasswordResetView(APIView):
    renderer_classes = [UserRenderer]
    def post(self, request,uid,token,format=None):
        serializer = SetNewPasswordSerializer(data=request.data,context={"uid":uid,"token":token})
        if serializer.is_valid(raise_exception=True):
            return Response({"message":"password reset successfully"},status=status.HTTP_200_OK)
        return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)
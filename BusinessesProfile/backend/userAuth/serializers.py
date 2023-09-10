from rest_framework import serializers
from .models import MyUser
from django.utils.encoding import smart_str , force_bytes , smart_bytes , DjangoUnicodeDecodeError
from django.utils.http import urlsafe_base64_encode , urlsafe_base64_decode
from django.contrib.auth.tokens import PasswordResetTokenGenerator
from .utils import Util

class UserSerializer(serializers.ModelSerializer):
    confirmPassword = serializers.CharField(style={"input_type": "password"}, write_only=True, required=True)
    class Meta:
        model = MyUser
        fields = [ "email", "name","terms","password","confirmPassword"]
        extra_kwargs = {"password": {"write_only": True, "required": True}}

    def create(self, validated_data):
        password = validated_data.get("password", None)
        confirmPassword = validated_data.get("confirmPassword", None)
        if password != confirmPassword:
            raise serializers.ValidationError({"password": "Password mismatch"})
        user = MyUser.objects.create_user(**validated_data)
        return user
    
class UserLoginSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(max_length=255, min_length=3)
    class Meta:
        model = MyUser
        fields = ["email", "password"]

class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = MyUser
        fields = ["email", "name"]

class UserChangePasswordSerializer(serializers.ModelSerializer):
    password = serializers.CharField(style={"input_type": "password"}, write_only=True, required=True)
    confirmPassword = serializers.CharField(style={"input_type": "password"}, write_only=True, required=True)
    class Meta:
        model = MyUser
        fields = ["password", "confirmPassword"]

    def validate(self, attrs):
        password = attrs.get("password", None)
        confirmPassword = attrs.get("confirmPassword", None)
        user = self.context.get("user")
        if user is None:
            raise serializers.ValidationError({"user": "User not found"})
        if password != confirmPassword:
            raise serializers.ValidationError({"password": "Password mismatch"})    
        user.set_password(password)
        user.save()
        return attrs
    
class SendMailSerializer(serializers.Serializer):
    email = serializers.EmailField(max_length=255, min_length=3)
    class Meta:
        fields = ["email"]

    def validate(self, attrs):
        email = attrs.get("email", None)
        if MyUser.objects.filter(email=email).exists():
            user = MyUser.objects.get(email=email)
            uid = urlsafe_base64_encode(force_bytes(user.id))
            token = PasswordResetTokenGenerator().make_token(user)
            link = "http://localhost:8000/auth/reset-password/"+uid+"/"+token+"/"
            print(link)
            data = {
                
                "email_body": "Hello "+user.name+" use the link below to reset your password \n"+link,
                "to_email": user.email,
                "email_subject": "Reset your password"
            }

            Util.send_email(data)
            return attrs
        else:
            raise serializers.ValidationError({"email": "Email not found user not registered"})
        
class SetNewPasswordSerializer(serializers.Serializer):
    password = serializers.CharField(style={"input_type": "password"}, write_only=True, required=True)
    confirmPassword = serializers.CharField(style={"input_type": "password"}, write_only=True, required=True)
    class Meta:
        model = MyUser
        fields = ["password", "confirmPassword"]

    def validate(self, attrs):
        password = attrs.get("password", None)
        confirmPassword = attrs.get("confirmPassword", None)
        uid = self.context.get("uid")
        token = self.context.get("token")
        if password != confirmPassword:
            raise serializers.ValidationError({"password": "Password mismatch"})
        try:
            id = smart_str(urlsafe_base64_decode(uid))
            user = MyUser.objects.get(id=id)
            if not PasswordResetTokenGenerator().check_token(user,token):
                raise serializers.ValidationError({"errors": "invalid link"})
            user.set_password(password)
            user.save()
        except DjangoUnicodeDecodeError as identifier:
            PasswordResetTokenGenerator().check_token(user)
            raise serializers.ValidationError({"errors": "invalid link"})
        return attrs
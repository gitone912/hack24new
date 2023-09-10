from django.db import models
from userAuth.models import MyUser
#create a model unique for every user and store the data like adress skills they like etc

class UserProfile(models.Model):
    user = models.OneToOneField(MyUser, on_delete=models.CASCADE, to_field='email')
    about= models.CharField(max_length=100, default='')
    description = models.TextField(max_length=500, blank=True)
    location = models.CharField(max_length=100, default='')
    skills = models.CharField(max_length=100, default='')
    image = models.ImageField(upload_to='profile_img', blank=True)
    mobile_number = models.CharField(max_length=10, default='')
    name = models.CharField(max_length=100)
    social_link1 = models.CharField(max_length=100, default='')
    social_link2 = models.CharField(max_length=100, default='')
    social_link3 = models.CharField(max_length=100, default='')
    def __str__(self):
        return self.user.name



class UserPosts(models.Model):
    user = models.ForeignKey(MyUser, on_delete=models.CASCADE, to_field='email')
    title = models.CharField(max_length=100, blank=True, null=True)
    description = models.TextField(max_length=500, blank=True, null=True)
    img = models.ImageField(upload_to='post_img', blank=True)
    tag = models.CharField(max_length=100, default='')
    post_id = models.IntegerField(primary_key=True)
    timestamp = models.DateTimeField(auto_now_add=True , null=True)  # Field to store the timestamp

    likes_count = models.IntegerField(default=0)  # Number of likes
    comments_count = models.IntegerField(default=0)  # Number of comments
    shares_count = models.IntegerField(default=0)  # Number of shares

    location = models.CharField(max_length=100, blank=True, null=True)  # Location field
    hashtags = models.CharField(max_length=50, blank=True, null=True)  # ArrayField for hashtags

    privacy = models.CharField(max_length=50, default='public')  # Privacy settings
    
    def __str__(self):
        return self.user.email


class Likes(models.Model):
    user = models.ForeignKey(MyUser, on_delete=models.CASCADE, to_field='email')
    post = models.ForeignKey(UserPosts, on_delete=models.CASCADE, related_name='likes')

class Comments(models.Model):
    user = models.ForeignKey(MyUser, on_delete=models.CASCADE, to_field='email')
    post = models.ForeignKey(UserPosts, on_delete=models.CASCADE, related_name='comments')
    comment = models.TextField(max_length=500, blank=True,null=True)

    def __str__(self):
        return self.comment


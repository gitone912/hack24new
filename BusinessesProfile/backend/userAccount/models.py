from django.db import models
from userAuth.models import MyUser
#create a model unique for every user and store the data like adress skills they like etc

class UserProfile(models.Model):
    user = models.OneToOneField(MyUser, on_delete=models.CASCADE, to_field='email')
    location = models.CharField(max_length=30, blank=True)
    image = models.ImageField(upload_to='profile_img', blank=True)
    occupation = models.CharField(max_length=255, blank=True)
    experience = models.IntegerField(blank=True, null=True)
    skills = models.TextField(blank=True)
    portfolio = models.URLField(blank=True)
    languages = models.CharField(max_length=255, blank=True)
    references = models.TextField(blank=True)
    education = models.CharField(max_length=255, blank=True)
    def __str__(self):
        return self.user.name



class UserPosts(models.Model):
    user = models.ForeignKey(MyUser, on_delete=models.CASCADE, to_field='email')

    contact_person = models.CharField(max_length=255,null=True, blank= True)
    contact_email = models.EmailField(null=True, blank= True)
    contact_phone = models.CharField(max_length=20,null=True, blank= True)
    business_address = models.CharField(max_length=255,null=True, blank= True)
    city = models.CharField(max_length=100,null=True, blank= True)
    state_province = models.CharField(max_length=100,null=True, blank= True)
    
    job_title = models.CharField(max_length=255,null=True, blank= True)
    job_description = models.TextField(null=True, blank= True)
    job_type = models.CharField(max_length=50,null=True, blank= True)  # Full-time, Part-time, Contract, etc.
    job_category = models.CharField(max_length=100,null=True, blank= True)
    required_skills = models.TextField(null=True, blank= True)
    experience_level = models.CharField(max_length=50,null=True, blank= True)
    education_requirements = models.CharField(max_length=100,null=True, blank= True)
    salary_range = models.CharField(max_length=100,null=True, blank= True)
    job_location = models.CharField(max_length=100,null=True, blank= True)  # On-site, Remote, Hybrid

    how_to_apply = models.TextField(null=True, blank= True)
    application_deadline = models.DateField(blank=True, null=True)
    application_instructions = models.TextField(null=True, blank= True)

    job_poster_linkedin = models.URLField(null=True, blank= True)

    terms_and_conditions_accepted = models.BooleanField(null=True, blank= True)
    privacy_policy_accepted = models.BooleanField(null=True, blank= True)


    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.job_title


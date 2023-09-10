from django.db import models
from userAuth.models import MyUser


class Course(models.Model):
    title = models.CharField(max_length=255)
    description = models.TextField()
    image_link = models.CharField(max_length=255, blank=True, null=True)
    def __str__(self):
        return self.title


class Videos(models.Model):
    title = models.CharField(max_length=255)
    description = models.TextField()
    course = models.ForeignKey(Course, on_delete=models.CASCADE)
    codes = models.TextField(blank=True, null=True)
    video_link = models.CharField(max_length=255, blank=True, null=True)
    videoNumber = models.IntegerField(blank=True, null=True)
    videoDurationInHours = models.IntegerField(blank=True, null=True)
    
    def __str__(self):
        return self.title

class AllNotes(models.Model):
    title = models.CharField(max_length=255)
    content = models.TextField(blank=True, null=True)
    course = models.ForeignKey(Course, on_delete=models.CASCADE)
    notes_link = models.CharField(max_length=255, blank=True, null=True)
    notesNumber = models.IntegerField(blank=True, null=True)
    def __str__(self):
        return self.title

class Playlist(models.Model):
    title = models.CharField(max_length=255)
    description = models.TextField(blank=True, null=True)
    course = models.ForeignKey(Course, on_delete=models.CASCADE)
    all_videos = models.ManyToManyField(Videos, related_name='playlists', blank=True)
    color= models.CharField( max_length=50,blank=True, null=True)
    icon= models.CharField( max_length=50,blank=True, null=True)
    total_hours_playlist = models.CharField(max_length=50, blank=True, null=True)
    footerLabel = models.CharField(max_length=50, blank=True, null=True)
    image_link = models.CharField(max_length=255, blank=True, null=True)
    
    def __str__(self):
        return self.title


class Note(models.Model):
    title = models.CharField(max_length=255)
    content = models.TextField(blank=True, null=True)
    course = models.ForeignKey(Course, on_delete=models.CASCADE)
    all_notes = models.ManyToManyField(AllNotes, related_name='notes', blank=True)
    icon = models.CharField(max_length=50, blank=True, null=True)
    color = models.CharField(max_length=50, blank=True, null=True)
    image_link = models.CharField(max_length=255, blank=True, null=True)
    def __str__(self):
        return self.title
    


class Dashboard(models.Model):
    user = models.OneToOneField(MyUser, on_delete=models.CASCADE, to_field='email')
    courses = models.ManyToManyField(Course, related_name='dashboards', blank=True )
    playlists = models.ManyToManyField(Playlist, related_name='dashboards', blank=True )
    notes = models.ManyToManyField(Note, related_name='dashboards', blank=True )
    videos = models.ManyToManyField(Videos, related_name='dashboards', blank=True )
    all_notes = models.ManyToManyField(AllNotes, related_name='dashboards', blank=True )
    def __str__(self):
        return self.user.email



MONTH_CHOICES = (
        (1, "January"),
        (2, "February"),
        (3, "March"),
        (4, "April"),
        (5, "May"),
        (6, "June"),
        (7, "July"),
        (8, "August"),
        (9, "September"),
        (10, "October"),
        (11, "November"),
        (12, "December"),
    )
class MonthlyUserProgress(models.Model):
    MONTH_CHOICES = (
        (1, "January"),
        (2, "February"),
        (3, "March"),
        (4, "April"),
        (5, "May"),
        (6, "June"),
        (7, "July"),
        (8, "August"),
        (9, "September"),
        (10, "October"),
        (11, "November"),
        (12, "December"),
    )
    user = models.ForeignKey(MyUser, on_delete=models.CASCADE, to_field='email')
    hours_watched = models.IntegerField(blank=True, null=True)
    playlists_completed = models.IntegerField(blank=True, null=True)
    month = models.IntegerField(choices=MONTH_CHOICES, default=1)
    year = models.IntegerField(default=2023)
    def __str__(self):
        return f"{self.user.email} - {self.get_month_display()}"

    

class weeklyProgress(models.Model):
    WEEKDAYS_CHOICES = (
        (0, "Monday"),
        (1, "Tuesday"),
        (2, "Wednesday"),
        (3, "Thursday"),
        (4, "Friday"),
        (5, "Saturday"),
        (6, "Sunday"),
    )
    WEEK_NUMBER_CHOICES = (
        (1, "Week 1"),
        (2, "Week 2"),
        (3, "Week 3"),
        (4, "Week 4"),
        (5, "Week 5"),
    )
    user = models.ForeignKey(MyUser, on_delete=models.CASCADE, to_field='email')
    hours_watched = models.IntegerField(blank=True, null=True)
    playlists_completed = models.IntegerField(blank=True, null=True)
    weekday = models.IntegerField(choices=WEEKDAYS_CHOICES, default=0)
    week_number = models.IntegerField(choices=WEEK_NUMBER_CHOICES, default=1)
    month_number = models.IntegerField(choices=MONTH_CHOICES, default=1)

    def __str__(self):
        return f"{self.user.email} - {self.get_weekday_display()}"

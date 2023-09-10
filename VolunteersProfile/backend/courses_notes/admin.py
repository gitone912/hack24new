from django.contrib import admin
from .models import Course, Videos, AllNotes, Playlist, Note, Dashboard, MonthlyUserProgress, weeklyProgress

# Custom admin class for Course
class CourseAdmin(admin.ModelAdmin):
    list_display = ['id', 'title', 'description']

# Custom admin class for Videos
class VideosAdmin(admin.ModelAdmin):
    list_display = ['id', 'title', 'description', 'course', 'codes', 'video_link', 'videoNumber', 'videoDurationInHours']

# Custom admin class for AllNotes
class AllNotesAdmin(admin.ModelAdmin):
    list_display = ['id', 'title', 'content', 'course', 'notes_link', 'notesNumber']

# Custom admin class for Playlist
class PlaylistAdmin(admin.ModelAdmin):
    list_display = ['id', 'title', 'description', 'course', 'color', 'icon', 'total_hours_playlist', 'footerLabel']

# Custom admin class for Note
class NoteAdmin(admin.ModelAdmin):
    list_display = ['id', 'title', 'content', 'course', 'icon', 'color']

# Custom admin class for Dashboard

# Custom admin class for MonthlyUserProgress
class MonthlyUserProgressAdmin(admin.ModelAdmin):
    list_display = ['id', 'user', 'hours_watched', 'playlists_completed', 'month', 'year']

# Custom admin class for weeklyProgress
class WeeklyProgressAdmin(admin.ModelAdmin):
    list_display = ['id', 'user', 'hours_watched', 'playlists_completed', 'weekday', 'week_number', 'month_number']

# Register models with their custom admin classes
admin.site.register(Course, CourseAdmin)
admin.site.register(Videos, VideosAdmin)
admin.site.register(AllNotes, AllNotesAdmin)
admin.site.register(Playlist, PlaylistAdmin)
admin.site.register(Note, NoteAdmin)
admin.site.register(Dashboard)
admin.site.register(MonthlyUserProgress, MonthlyUserProgressAdmin)
admin.site.register(weeklyProgress, WeeklyProgressAdmin)

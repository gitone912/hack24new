import json
from django.http import JsonResponse
from django.shortcuts import get_object_or_404
from rest_framework import viewsets
from .models import Course, Playlist, Note, Dashboard, Videos, AllNotes, weeklyProgress, MonthlyUserProgress
from .serializers import (
    CourseSerializer,
    PlaylistSerializer,
    NoteSerializer,
    DashboardSerializer,
    VideosSerializer,
    AllNotesSerializer,
    UpdateDashboardSerializer,
    weeklyProgressSerializer,
    MonthlyUserProgressSerializer
)
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_POST
from rest_framework.views import APIView
from rest_framework import status
from userAuth.models import MyUser
from datetime import datetime



def get_current_month_number():
    today = datetime.now()
    return today.month

def get_current_week_number():
    today = datetime.now()
    week_number = today.strftime("%U")
    day_of_month = today.day
    week_number_in_month = (day_of_month - 1) // 7 + 1
    return week_number_in_month

class CourseViewSet(viewsets.ModelViewSet):
    queryset = Course.objects.all()
    serializer_class = CourseSerializer


class VideosViewSet(viewsets.ModelViewSet):
    queryset = Videos.objects.all()
    serializer_class = VideosSerializer


class PlaylistViewSet(viewsets.ModelViewSet):
    queryset = Playlist.objects.all()
    serializer_class = PlaylistSerializer


class NoteViewSet(viewsets.ModelViewSet):
    queryset = Note.objects.all()
    serializer_class = NoteSerializer


class DashboardViewSet(viewsets.ModelViewSet):
    queryset = Dashboard.objects.all()
    serializer_class = DashboardSerializer

class AllNotesViewSet(viewsets.ModelViewSet):
    queryset = AllNotes.objects.all()
    serializer_class = AllNotesSerializer

@csrf_exempt
@require_POST
def find_dashboard_id_by_email(request):
    try:
        data = json.loads(request.body)
        email = data.get('email', None)
        if email:
            dashboard = get_object_or_404(Dashboard, user__email=email)
            # Assuming Dashboard model has an 'id' field that you want to retrieve
            response_data = {
                'dashboard_id': dashboard.id
            }
            return JsonResponse(response_data)
        else:
            return JsonResponse({"error": "Email parameter is missing."}, status=400)
    except json.JSONDecodeError:
        return JsonResponse({"error": "Invalid JSON payload."}, status=400)
    except Dashboard.DoesNotExist:
        return JsonResponse({"error": "No dashboard found for the given email."}, status=404)
    
@csrf_exempt
@require_POST
def update_dashboard(request, dashboard_id):
    try:
        data = json.loads(request.body)
        dashboard = get_object_or_404(Dashboard, id=dashboard_id)
        serializer = UpdateDashboardSerializer(dashboard, data=data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data)
        return JsonResponse(serializer.errors, status=400)
    except json.JSONDecodeError:
        return JsonResponse({"error": "Invalid JSON payload."}, status=400)
    except Dashboard.DoesNotExist:
        return JsonResponse({"error": "No dashboard found for the given ID."}, status=404)
    

class weeklyProgressViewSet(viewsets.ModelViewSet):
    queryset = weeklyProgress.objects.all()
    serializer_class = weeklyProgressSerializer

class MonthlyUserProgressViewSet(viewsets.ModelViewSet):
    queryset = MonthlyUserProgress.objects.all()
    serializer_class = MonthlyUserProgressSerializer


@api_view(['POST'])
def monthly_user_progress_view(request):
    if request.method == 'POST':
        email = request.data.get('email')
        if not email:
            return Response({"error": "Please provide an 'email' in the JSON payload."}, status=400)
        
        try:
            user_progress = MonthlyUserProgress.objects.filter(user__email=email)
            serializer = MonthlyUserProgressSerializer(user_progress,many=True)
            return Response(serializer.data)
        except MonthlyUserProgress.DoesNotExist:
            return Response({"error": f"No user found with email: {email}"}, status=404)
        except MonthlyUserProgress.DoesNotExist:
            return Response({"error": f"No data found for the user with email: {email}"}, status=404)

@api_view(['POST'])
def weekly_progress_view(request):
    if request.method == 'POST':
        email = request.data.get('email')
        if not email:
            return Response({"error": "Please provide an 'email' in the JSON payload."}, status=400)
        try:
            weekly_progress = weeklyProgress.objects.filter(user__email=email)
            if weekly_progress.exists():
                serializer = weeklyProgressSerializer(weekly_progress, many=True)
                return Response(serializer.data)
            else:
                return Response({"error": f"No data found for the user with email: {email}"}, status=404)
        except weeklyProgress.DoesNotExist:
            return Response({"error": f"No data found for the user with email: {email}"}, status=404)


class WeeklyProgressUpdateView(APIView):
    def post(self, request, *args, **kwargs):
        # Get the user email and hours spent from the request JSON
        user_email = request.data.get('user_email')  # Assuming you pass the user's email in the JSON data
        hours_spent = request.data.get('hours_spent')
        playlists = request.data.get('playlists_completed')
        if playlists:
            playlists_completed = playlists
        else:
            playlists_completed = 0
        print(user_email)
        print(hours_spent)
        print(playlists_completed)
        if not user_email:
            return Response({"error": "User email is required."}, status=status.HTTP_400_BAD_REQUEST)
        #get the id of the email from my user
        try:

            userId = MyUser.objects.get(email=user_email)
            print(userId)
        except MyUser.DoesNotExist:
            return Response({"error": "User does not exist."}, status=status.HTTP_404_NOT_FOUND)
        try:
            # Get the weekly progress instance for the current week and user
            current_week_number = get_current_week_number()
            current_month_number = get_current_month_number()
            current_date = datetime.now()
            current_weekday = current_date.weekday()

            weekly_progress_queryset = weeklyProgress.objects.filter(
            user__email=user_email,
            week_number=current_week_number,
            month_number=current_month_number,
            weekday=current_weekday,
        )

            if weekly_progress_queryset.exists():
                for weekly_progress in weekly_progress_queryset:
                    weekly_progress.hours_watched += hours_spent
                    weekly_progress.playlists_completed += playlists_completed
                    weekly_progress.save()
            else:
                # If no objects found, create a new one
                print(user_email)
                weeklyProgress.objects.create(
                    user=userId,
                    hours_watched=hours_spent,
                    week_number=current_week_number,
                    weekday=current_weekday,
                    month_number=current_month_number,
                    playlists_completed=playlists_completed
                )
        except weeklyProgress.DoesNotExist:
            weeklyProgress.objects.create(user=user_email, hours_watched=hours_spent, week_number=current_week_number, weekday=current_weekday, month_number=current_month_number)

        return Response({"message": "Weekly progress updated successfully."})



class MonthlyProgressUpdateView(APIView):
    def post(self, request, *args, **kwargs):
        # Get the user email and hours spent from the request JSON
        user_email = request.data.get('user_email', None)
        hours_spent = request.data.get('hours_spent', 0)

        if not user_email:
            return Response({"error": "User email is required."}, status=status.HTTP_400_BAD_REQUEST)

        try:
            # Check if the user exists based on the provided email
            user = MyUser.objects.get(email=user_email)
        except MyUser.DoesNotExist:
            return Response({"error": "User does not exist."}, status=status.HTTP_404_NOT_FOUND)

        try:
            # Get the monthly progress instance for the current month and user
            current_month_number = datetime.now().month
            current_year = datetime.now().year

            # Fetch or create the monthly progress instance
            monthly_progress, created = MonthlyUserProgress.objects.get_or_create(
                user=user,
                month=current_month_number,
                year=current_year,
                defaults={'hours_watched': 0}  # Set default value for hours_watched if the object is created
            )

            # Update the hours_watched field
            monthly_progress.hours_watched += hours_spent
            monthly_progress.save()

        except MonthlyUserProgress.DoesNotExist:
            return Response({"error": "Monthly progress instance not found."}, status=status.HTTP_404_NOT_FOUND)

        return Response({"message": "Monthly progress updated successfully."})

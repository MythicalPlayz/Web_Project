from django.urls import path
from . import views

urlpatterns = [
    path('api/', views.welcome),
    path('api/jobs/', views.getJobsAll),
    path('api/jobs/id/<str:jid>/', views.getJob),
    path('api/jobs/filter/<str:sname>/<int:exp>/', views.getJobFilter),
    path('api/applicants/<str:jid>/', views.getApplicantFilter),
    path('api/username/<str:username>/', views.isvalidUsername),
    path('api/job/<str:id>/', views.isvalidJob),
    path('api/applicants/<str:id>/you/', views.getUserJobHistory),

]
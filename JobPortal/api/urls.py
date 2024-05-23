from django.urls import path
from . import views

urlpatterns = [
    path('api/', views.welcome, name='members'),
    path('api/jobs/', views.getJobsAll, name='members'),
    path('api/jobs/id/<str:jid>/', views.getJob, name='members'),
    path('api/jobs/filter/<str:sname>/<int:exp>/', views.getJobFilter, name='members'),
]
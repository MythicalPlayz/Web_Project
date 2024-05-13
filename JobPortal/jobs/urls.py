from django.urls import path
from . import views

urlpatterns = [
    path('jobs/', views.jobs, name='jobs'),
    path('jobs/details/<str:id>/', views.details, name='details'),
]
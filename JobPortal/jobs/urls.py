from django.urls import path
from . import views

urlpatterns = [
    path('jobs/', views.jobs, name='jobs'),
    path('jobs/details/<str:id>/', views.details, name='details'),
    path('jobs/add/', views.add, name='add'),
    path('jobs/details/<str:id>/edit/', views.edit, name='edit'),
    path('jobs/details/<str:id>/delete/', views.delete, name='delete'),

    #TODO: Add Success/Fail
]
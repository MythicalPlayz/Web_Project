from django.urls import path
from . import views

urlpatterns = [
    path('jobs/', views.jobs, name='jobs'),
    path('jobs/details/<str:id>/', views.details, name='details'),
    path('jobs/add/', views.add, name='add'),
    path('jobs/details/<str:id>/edit/', views.edit, name='edit'),
    path('jobs/details/<str:id>/delete/', views.delete, name='delete'),
    path('jobs/fail/', views.fail, name='fail'),
    path('jobs/add/success/', views.create, name='success add'),
    path('jobs/edit/success/', views.modify, name='success edit'),
    path('jobs/delete/success/', views.free, name='success delete'),
]
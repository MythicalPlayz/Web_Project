from django.urls import path
from . import views

urlpatterns = [
    path('home/', views.home, name='home'),
    path('', views.loginP, name='login (index)'),
    path('login/', views.loginP, name='login'),
    path('signup/',views.signup,name='signup'),
    path('logout/',views.logoutP, name='logout'),
]
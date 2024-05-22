from django.urls import path
from . import views
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('jobs/', views.jobs, name='jobs'),
    path('jobs/details/<str:id>/', views.details, name='details'),
    path('jobs/add/', views.add, name='add'),
    path('jobs/details/<str:id>/edit/', views.edit, name='edit'),
    path('jobs/details/<str:id>/delete/', views.delete, name='delete'),
    path('jobs/fail/', views.fail, name='fail job'),
    path('jobs/add/success/', views.create, name='success add'),
    path('jobs/edit/success/', views.modify, name='success edit'),
    path('jobs/delete/success/', views.free, name='success delete'),
    path('jobs/details/<str:id>/apply/', views.apply, name='apply'),
    path('jobs/apply/success/', views.applysuccess, name='success apply'),
    path('jobs/apply/fail/', views.applyfail, name='fail apply'),
]


if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
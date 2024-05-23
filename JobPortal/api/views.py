from django.shortcuts import render
from django.http import HttpResponse, Http404, JsonResponse

def welcome(request):
    return JsonResponse({'status': 'success', 'message': 'Hello World!'})

def getJobs(request):
    return JsonResponse({'status': 'success'})
from django.shortcuts import render
from django.http import HttpResponse, Http404, JsonResponse
from jobs.models import Job

def welcome(request):
    return JsonResponse({'status': 'success', 'message': 'Hello World!'})

def getJobsAll(request):
    jobs = Job.objects.all().values()
    jobs = list(jobs)
    return JsonResponse({'status': 'success','jobs': jobs})

def getJob(request, jid):
    try:
        jobs = Job.objects.get(id=jid)
    except:
        return JsonResponse({'status': 'error', 'reason': 'No Job Found'})
    job = {
        'id': jobs.id,
        'name': jobs.name,
        'status': jobs.status,
        'des': jobs.des,
        'salary': jobs.salary,
        'admin': jobs.admin,
        'company': jobs.company,
    }
    return JsonResponse({'status': 'success','jobs': job})

def getJobFilter(request, sname, exp):
    if sname != 'NULL_NAME':
        jobs = Job.objects.filter(name__startswith=sname , xp__gte=exp).values()
    else:
        jobs = Job.objects.filter(xp__gte=exp).values()
    jobs = list(jobs)
    return JsonResponse({'status': 'success','jobs': jobs})
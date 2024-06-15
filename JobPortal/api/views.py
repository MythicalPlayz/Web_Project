from django.shortcuts import render
from django.http import HttpResponse, Http404, JsonResponse
from jobs.models import Job, Applicant, Company
from accounts.models import Account

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

def getApplicantFilter(request, jid):
    if request.user.is_anonymous or not request.user.account_type:
        return JsonResponse({'status': 'error', 'reason': 'unauthorised'}, status = 401)
    
    company = request.user.company
    ids = Company.objects.filter(name=company).values()
    for id in ids:
        id = id['job_id']
        jobapps = []
        if jid == 'NULL_ID':
            jobapps = Applicant.objects.filter(job=id).order_by('-time').values()
        else:
            jobs = Job.objects.filter(id__startswith=jid)
            for app in jobs:
                jobapps += Applicant.objects.filter(job=id).order_by('-time').values()
    for x in jobapps:
        id = x['job_id']
        x['name'] = Job.objects.get(id=id).name
    jobapps = list(jobapps)
    return JsonResponse({'status': 'success', 'apps': jobapps})

def isvalidUsername(request,username):
    valid = True
    user = Account.objects.filter(username=username)
    if user or len(username) < 8:
        valid = False
    return JsonResponse({'status': 'success', 'valid': valid})

def isvalidJob(request,id):
    valid = True
    job = Job.objects.filter(id=id)
    if job or len(id) < 2:
        valid = False
    return JsonResponse({'status': 'success', 'valid': valid})
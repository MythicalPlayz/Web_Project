from django.shortcuts import render
from django.http import HttpResponse, Http404, JsonResponse
from jobs.models import Job, Applicant
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
    ids = Job.objects.filter(company=company).values()
    jobapps = []
    for id in ids:
        id = id['id']
        if jid == 'NULL_ID':
            newapps = Applicant.objects.filter(job=id).order_by('-time').values()
            for x in newapps:
                x['name'] = Job.objects.get(id=id).name
            jobapps += newapps
        else:
            if not id.lower().startswith(jid.lower()):
                continue
            newapps = Applicant.objects.filter(job=id).order_by('-time').values()
            for x in newapps:
                x['name'] = Job.objects.get(id=id).name
            jobapps += newapps
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
    if job or len(id) < 2 or id == 'NULL_ID':
        valid = False
    return JsonResponse({'status': 'success', 'valid': valid})

def getUserJobHistory(request,id):
    if request.user.is_anonymous or request.user.account_type:
        return JsonResponse({'status': 'error', 'reason': 'unauthorised'}, status = 401)
    applicants = Applicant.objects.filter(job=id, username=request.user.username).order_by('-time').values()[:3]
    applicants = list(applicants)
    return JsonResponse({'status': 'success', 'applicants': applicants})

def getHome(request):
    if request.user.is_anonymous:
        return JsonResponse({'status': 'error', 'reason': 'unauthorised'}, status = 401)
    if request.user.account_type == 0:
        applicants = Applicant.objects.filter(username=request.user.username).order_by('-time').values()[:3]
        for app in applicants:
            job = Job.objects.get(id=app['job_id'])
            app['job_name'] = job.name
            app['job_company'] = job.company
        applicants = list(applicants)
        return JsonResponse({'status': 'success', 'applicants': applicants})
    else:
        company = request.user.company
        ids = Job.objects.filter(company=company).values()
        jobapps = []
        for id in ids:
            newapps = Applicant.objects.filter(job=id['id']).order_by('-time').values()
            for app in newapps:
                app['job_name'] = id['name']
                app['time'] = int(app['time'].timestamp())
            jobapps += newapps
        jobapps = sorted(jobapps,key=lambda x: x['time'],reverse=True)[:3]
        return JsonResponse({'status': 'success', 'applicants': jobapps})
from django.http import HttpResponse, Http404
from django.template import loader
from .models import Job, Company, Applicant
from django.contrib.auth.decorators import login_required
from django.views.decorators.csrf import csrf_exempt
from django.shortcuts import redirect, render

def isadmin(type):
    return type

@login_required(login_url='/login/')
def jobs(request):
    jobsobject = Job.objects.all().values()
    template = loader.get_template('jobs.html')
    user = request.user
    prameters = {
        'jobs': jobsobject,
        'username': user.username,
        'type': user.account_type
    }
    return HttpResponse(template.render(prameters, request))

@login_required(login_url='/login/')
def details(request, id):
    try:
        jobobject = Job.objects.get(id=id)
    except Job.DoesNotExist:
        raise Http404("Job does not exist")
    
    template = loader.get_template('details.html')
    user = request.user
    prameters = {
        'job': jobobject,
        'username': user.username,
        'type': user.account_type,
        'company': user.company
    }
    return HttpResponse(template.render(prameters, request))

@login_required(login_url='/login/')
@csrf_exempt
def add(request):
    user = request.user
    if not isadmin(user.account_type):
        return HttpResponse('Unauthorized', status=401)
    
    if request.method == 'GET':
        template = loader.get_template('add_job.html')
        parameters = {
            'username': user.username
        }
        return HttpResponse(template.render(parameters, request))
    elif request.method == 'POST':
        try:
            id = request.POST['id']
            name = request.POST['name']
            status = False
            if request.POST['status'] == 'Open':
                status = True
            xp = request.POST['xp']
            desc = request.POST['description']
            salary = request.POST['salary']
            admin = user.username
            company = user.company
            
            job = Job(id,name,status,xp,desc,salary,admin,company)
            job.save()

            comp = Company(id,company)
            comp.save()
            return redirect('/jobs/add/success/')
        except:
            return redirect('/jobs/fail/')
    else:
        return HttpResponse("UNSUPPORTED METHOD")
    # POST REQUEST

@login_required(login_url='/login/')
@csrf_exempt
def edit(request, id):
    user = request.user
    if not isadmin(user.account_type):
        return HttpResponse('Unauthorized', status=401)
    
    if request.method == 'GET':
        try:
            jobobject = Job.objects.get(id=id)
        except Job.DoesNotExist:
            raise Http404("Job does not exist")
        
        if jobobject.company != user.company:
            return HttpResponse('Unauthorized', status=401)

        template = loader.get_template('edit_job.html')
        prameters = {
            'job': jobobject,
        }
        return HttpResponse(template.render(prameters, request))
    elif request.method == 'POST':
        try:
            jobobject = Job.objects.get(id=id)
        except Job.DoesNotExist:
            raise Http404("Job does not exist")
        try:
            name = request.POST['name']
            status = False
            if request.POST['status'] == 'Open':
                status = True
            xp = request.POST['xp']
            desc = request.POST['description']
            salary = request.POST['salary']

            if jobobject.company != user.company:
                return HttpResponse('Unauthorized', status=401)
            jobobject.name = name
            jobobject.status = status
            jobobject.xp = xp
            jobobject.desc = desc
            jobobject.salary = salary
            jobobject.save()
            return redirect('/jobs/edit/success/')
        except:
            return redirect('/jobs/fail/')

    else:
        return HttpResponse("UNSUPPORTED METHOD")
    # POST REQUEST

@login_required(login_url='/login/')
@csrf_exempt
def delete(request, id):
    user = request.user
    if not isadmin(user.account_type):
        return HttpResponse('Unauthorized', status=401)
    
    if request.method == 'DELETE':
        try:
            try:
                jobobject = Job.objects.get(id=id)
            except Job.DoesNotExist:
                raise Http404("Job does not exist")
            if jobobject.company != user.company:
                    return HttpResponse('Unauthorized', status=401)
            jobobject.delete()
            companyid = Company.objects.get(jobid=id)
            companyid.delete()
            Applicant.objects.filter(jobid=id).delete()
            return redirect('/jobs/delete/success/')
        except:
            return redirect('/jobs/fail/')

    else:
        return HttpResponse("UNSUPPORTED METHOD")

@login_required(login_url='/login/')
@csrf_exempt
def fail(request):
    user = request.user
    prameters = {
        'username': user.username,
    }
    template = loader.get_template('job_fail.html')
    return HttpResponse(template.render(prameters, request))

@csrf_exempt
def create(request):
    user = request.user
    prameters = {
        'username': user.username,
    }
    template = loader.get_template('job_create.html')
    return HttpResponse(template.render(prameters, request))

@login_required(login_url='/login/')
@csrf_exempt
def modify(request):
    user = request.user
    prameters = {
        'username': user.username,
    }
    template = loader.get_template('job_edit.html')
    return HttpResponse(template.render(prameters, request))

@login_required(login_url='/login/')
@csrf_exempt
def free(request):
    user = request.user
    prameters = {
        'username': user.username,
    }
    template = loader.get_template('job_delete.html')
    return HttpResponse(template.render(prameters, request))

@login_required(login_url='/login/')
@csrf_exempt
def apply(request, id):
    user = request.user
    if isadmin(user.account_type):
        return HttpResponse('Unauthorized', status=401)
    
    try:
        jobobject = Job.objects.get(id=id)
    except Job.DoesNotExist:
        raise Http404("Job does not exist")
    
    
    if request.method == 'GET':
        template = loader.get_template('apply.html')
        parameters = {
            'job': jobobject,
            'username': user.username
        }
        return HttpResponse(template.render(parameters, request))
    elif request.method == 'POST':
        try:
            username = user.username
            jobid = id
            fullname = request.POST.get('fname')
            email = request.POST.get('email')
            resume = request.FILES.get('resume')
            print(fullname)
            applicant = Applicant(
                username=username,
                jobid=jobid,
                fullname=fullname,
                email=email,
                resume=resume
            )
            applicant.save()
            return redirect('/jobs/apply/success/')
        except:
            return redirect('/jobs/apply/fail/')
        

@login_required(login_url='/login/')
@csrf_exempt
def applysuccess(request):
    user = request.user
    prameters = {
        'username': user.username,
    }
    template = loader.get_template('submit_success.html')
    return HttpResponse(template.render(prameters, request))

@login_required(login_url='/login/')
@csrf_exempt
def applyfail(request):
    user = request.user
    prameters = {
        'username': user.username,
    }
    template = loader.get_template('submit_fail.html')
    return HttpResponse(template.render(prameters, request))

@login_required(login_url='/login/')
def history(request):
    user = request.user
    if isadmin(user.account_type):
        return HttpResponse('Unauthorized', status=401)
    applied = Applicant.objects.filter(username=user.username).order_by('-time')
    names = {}
    for x in applied:
        jobid = x.jobid
        x.name = Job.objects.get(id=jobid).name
    prameters = {
        'applied': applied,
        'username': user.username,
    }
    template = loader.get_template('history.html')
    return HttpResponse(template.render(prameters, request))

@login_required(login_url='/login/')
def joblist(request):
    user = request.user
    if not isadmin(user.account_type):
        return HttpResponse('Unauthorized', status=401)
    jobsobjects = Job.objects.filter(company=user.company).order_by('id')
    prameters = {
        'jobs': jobsobjects,
        'username': user.username,
    }
    template = loader.get_template('list_jobs.html')
    return HttpResponse(template.render(prameters, request))

@login_required(login_url='/login/')
def applicants(request, id):
    try:
        jobobject = Job.objects.get(id=id)
    except Job.DoesNotExist:
        raise Http404("Job does not exist")
    user = request.user
    if not isadmin(user.account_type):
        return HttpResponse('Unauthorized', status=401)
    
    applicants = Applicant.objects.filter(jobid=id).order_by('-time')
    for x in applicants:
        x.name = jobobject.name
    prameters = {
        'applicants': applicants,
        'username': user.username,
    }
    template = loader.get_template('applicants.html')
    return HttpResponse(template.render(prameters, request))

@login_required(login_url='/login/')
def applicantsall(request):
    user = request.user
    if not isadmin(user.account_type):
        return HttpResponse('Unauthorized', status=401)
    
    company = user.company
    ids = Company.objects.filter(name=company).values()
    applicants = []
    print(ids)
    for id in ids:
        jid = id.get('jobid')
        jobapps = Applicant.objects.filter(jobid=jid).order_by('-time')
        print(jobapps)
        for x in jobapps:
            x.name = Job.objects.get(id=jid).name
            applicants.insert(len(applicants),x)
    print(applicants)
    prameters = {
        'applicants': applicants,
        'username': user.username,
    }
    template = loader.get_template('applicants.html')
    return HttpResponse(template.render(prameters, request))
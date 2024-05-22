from django.http import HttpResponse, Http404
from django.template import loader
from .models import Job, Company
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
        'type': user.account_type
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
            return redirect('/jobs/success/')
        except:

            return redirect('/jobs/fail/')
            pass
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
        
        template = loader.get_template('edit_job.html')
        prameters = {
            'job': jobobject,
        }
        return HttpResponse(template.render(prameters, request))
    elif request.method == 'POST':
        pass
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
            jobobject = Job.objects.get(id=id)
        except Job.DoesNotExist:
            raise Http404("Job does not exist")
        # DELETE REQUEST
    else:
        return HttpResponse("UNSUPPORTED METHOD")

def fail(request):
    user = request.user
    prameters = {
        'username': user.username,
    }
    template = loader.get_template('job_fail.html')
    return HttpResponse(template.render(prameters, request))

def success(request):
    user = request.user
    prameters = {
        'username': user.username,
    }
    template = loader.get_template('job_success.html')
    return HttpResponse(template.render(prameters, request))

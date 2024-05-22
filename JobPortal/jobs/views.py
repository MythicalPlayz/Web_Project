from django.http import HttpResponse, Http404
from django.template import loader
from .models import Job
from django.contrib.auth.decorators import login_required

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
def add(request):
    user = request.user
    if not isadmin(user.account_type):
        return HttpResponse('Unauthorized', status=401)
    
    if request.method == 'GET':
        template = loader.get_template('add_job.html')
        return HttpResponse(template.render())
    elif request.method == 'POST':
        pass
    else:
        return HttpResponse("UNSUPPORTED METHOD")
    # POST REQUEST

@login_required(login_url='/login/')
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

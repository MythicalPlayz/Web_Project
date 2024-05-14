from django.http import HttpResponse, Http404
from django.template import loader
from .models import Job

def jobs(request):
    jobsobject = Job.objects.all().values()
    template = loader.get_template('jobs.html')
    prameters = {
        'jobs': jobsobject,
    }
    return HttpResponse(template.render(prameters, request))

def details(request, id):
    try:
        jobobject = Job.objects.get(id=id)
    except Job.DoesNotExist:
        raise Http404("Job does not exist")
    
    template = loader.get_template('details.html')
    prameters = {
        'job': jobobject,
    }
    return HttpResponse(template.render(prameters, request))

def add(request):
    if request.method == 'GET':
        template = loader.get_template('add_job.html')
        return HttpResponse(template.render())
    elif request.method == 'POST':
        pass
    else:
        return HttpResponse("UNSUPPORTED METHOD")
    # POST REQUEST

def edit(request, id):
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

def delete(request, id):
    if request.method == 'DELETE':
        try:
            jobobject = Job.objects.get(id=id)
        except Job.DoesNotExist:
            raise Http404("Job does not exist")
        # DELETE REQUEST
    else:
        return HttpResponse("UNSUPPORTED METHOD")

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

# Create your views here.

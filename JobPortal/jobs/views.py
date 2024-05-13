from django.http import HttpResponse
from django.template import loader
from .models import Job

def jobs(request):
    jobsobject = Job.objects.all().values()
    template = loader.get_template('jobs.html')
    prameters = {
        'jobs': jobsobject,
    }
    return HttpResponse(template.render(prameters, request))

# Create your views here.

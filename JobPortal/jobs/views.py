from django.http import HttpResponse
from django.template import loader

def jobs(request):
    template = loader.get_template('jobs.html')
    return HttpResponse(template.render())

# Create your views here.

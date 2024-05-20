from django.shortcuts import redirect, render
from django.http import HttpResponse
from django.template import loader
from .forms import SignupForm
from django.views.decorators.csrf import csrf_protect
from django.contrib.auth import login

def home(request):  
    template = loader.get_template('home.html')
    return HttpResponse(template.render())

@csrf_protect
def signup(request):
    if request.method == 'POST':
        form = SignupForm(request.POST)
        if form.is_valid():
            user = form.save()
            login(request, user)
            return redirect('home')  
        else:
            print(form.errors)
            return render(request, 'signup.html', {'form': form})  

    else:
        form = SignupForm()
        return render(request, 'signup.html', {'form': form}) 

def loginP(request):
    template = loader.get_template('login.html')
    return HttpResponse(template.render())

def logout(request):
    pass
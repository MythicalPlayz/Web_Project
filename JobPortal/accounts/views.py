from django.shortcuts import redirect, render
from django.http import HttpResponse
from django.template import loader
from .forms import SignupForm, LoginForm
from django.views.decorators.csrf import csrf_protect
from django.contrib.auth import login, authenticate, logout
from django.contrib import messages
from django.contrib.auth.decorators import login_required

@login_required(login_url='/login/')
def home(request):  
    user = request.user
    prameters = {
        'username': user.username,
        'type': user.account_type
    }
    template = loader.get_template('home.html')
    return HttpResponse(template.render(prameters,request))

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
    if request.method == 'POST':
        form = LoginForm(request.POST)
        if form.is_valid():
            usernameF = form.cleaned_data['username']
            passwordF = form.cleaned_data['password']
            user = authenticate(request, username=usernameF, password=passwordF)
            if user is not None:
                login(request, user)
                return redirect('home')
            else:
                form.add_error(None, 'Invalid username or password. Please try again.')
        else:
            print(form.errors)
    else:
        form = LoginForm()
    return render(request, 'login.html', {'form': form})

def logoutP(request):
    logout(request)
    return redirect('login')
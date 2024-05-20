from django.shortcuts import redirect, render
from django.http import HttpResponse
from django.template import loader
from .forms import SignupForm, LoginForm
from django.views.decorators.csrf import csrf_protect
from django.contrib.auth import login, authenticate
from django.contrib import messages

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
    if request.method == 'POST':
        form = LoginForm(request.POST)
        if form.is_valid():
            usernameF = form.cleaned_data['username']
            passwordF = form.cleaned_data['password']
            user = authenticate(request, username=usernameF, password=passwordF)
            print(user)
            if user is not None:
                login(request, user)
                return redirect('home')
            else:
                print(usernameF, passwordF)
                messages.error(request, 'Invalid Username or Password')
        else:
            print(form.errors)
    else:
        form = LoginForm()
    return render(request, 'login.html', {'form': form})

def logout(request):
    pass
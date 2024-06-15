# forms.py
from django import forms
from django.contrib.auth.forms import UserCreationForm
from .models import Account

class SignupForm(forms.ModelForm):
    password1 = forms.CharField(widget=forms.PasswordInput)
    password2 = forms.CharField(widget=forms.PasswordInput)

    class Meta:
        model = Account
        fields = ('username', 'password1', 'password2', 'email', 'account_type', 'company')

    account_type = forms.ChoiceField(
        choices=[('user', 'User'), ('coadmin', 'Admin')],
        widget=forms.RadioSelect)

    def clean_password2(self):
        password1 = self.cleaned_data.get('password1')
        password2 = self.cleaned_data.get('password2')
        if password1 and password2 and password1 != password2:
            raise forms.ValidationError("Passwords do not match.")
        return password2

    def clean(self):
        cleaned_data = super().clean()
        account_type = cleaned_data.get('account_type')
        print(account_type)
        company = cleaned_data.get('company')
        if account_type == 'coadmin':
            cleaned_data['account_type'] = 1
            if not company:
                raise forms.ValidationError("Company is required for coadmin accounts.")
        else:
            cleaned_data['account_type'] = 0
            cleaned_data['company'] = None

        return cleaned_data

    def save(self, commit=True):
        user = super().save(commit=False)
        user.set_password(self.cleaned_data["password1"])
        if commit:
            user.save()
        return user

        
class LoginForm(forms.Form):
    username = forms.CharField()
    password = forms.CharField(widget=forms.PasswordInput)
    error_messages = {
        'invalid_login': "Username or password do not match. Please try again.",
    }
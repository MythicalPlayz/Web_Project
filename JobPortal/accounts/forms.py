from django import forms
from django.contrib.auth.forms import UserCreationForm
from .models import Account

class SignupForm(forms.ModelForm):

    email = forms.EmailField(required=True)
    account_type = forms.ChoiceField(choices=[('user', 'User'), ('coadmin', 'Admin')], required=True)
    company = forms.CharField(required=False)
    

    class Meta:
        model = Account
        fields = ('username', 'password', 'email', 'account_type', 'company')

    def clean_account_type(self):
        account_type = self.cleaned_data.get('account_type')
        if account_type == 'user':
            self.cleaned_data['company'] = None
            return False
        elif account_type == 'coadmin':
            return True
        else:
            raise forms.ValidationError("Invalid account type.")
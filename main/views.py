from django.shortcuts import render



# Create your views here.
render homepage:
def main_view(request):
    return render(request, 'main.html')
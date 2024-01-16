# yourappname/urls.py
from django.urls import path
from .views import YourModelListCreateView

urlpatterns = [
    path('materii/', YourModelListCreateView.as_view(), name='materii'),
    # Add more paths for other views if needed
]

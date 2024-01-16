# yourappname/urls.py
from django.urls import path
from .views import YourModelListCreateView, StudentCreateView

urlpatterns = [
    path('materii/', YourModelListCreateView.as_view(), name='materii'),
    path('students/create/', StudentCreateView.as_view(), name='student-create'),
]

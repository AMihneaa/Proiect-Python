# yourappname/urls.py
from django.urls import path
from .views import YourModelListCreateView, StudentCreateView, MateriiUpdateStudentsView, StudentListView, \
    StudentDeleteView, StudentDetailView

urlpatterns = [
    path('materii/', YourModelListCreateView.as_view(), name='materii'),
    path('students/create/', StudentCreateView.as_view(), name='student-create'),
    path('materii/<int:id>/update-students/', MateriiUpdateStudentsView.as_view(), name='materii-update-students'),
    path('students/', StudentListView.as_view(), name='student-list'),
    path('students/<int:id>/', StudentDetailView.as_view(), name='student-detail'),
    path('materii/<int:id>/update-students/', MateriiUpdateStudentsView.as_view(), name='materii-update-students'),
]

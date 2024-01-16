from rest_framework import generics
from .models import Materii, Student
from .serializers import YourModelSerializer, StudentSerializer

class YourModelListCreateView(generics.ListCreateAPIView):
    queryset = Materii.objects.all()
    serializer_class = YourModelSerializer


class StudentCreateView(generics.CreateAPIView):
    queryset = Student.objects.all()
    serializer_class = StudentSerializer

    def perform_create(self, serializer):
        # Extrageți id-urile materiilor asociate din cererea POST
        materii_ids = self.request.data.get('materii_ids', [])

        # Crează studentul și salvează asocierea cu materiile
        student = serializer.save()

        # Adaugă studentul la materiile selectate
        student.materii.set(Materii.objects.filter(id__in=materii_ids))


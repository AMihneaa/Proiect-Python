from rest_framework import generics
from .models import Materii
from .serializers import YourModelSerializer

class YourModelListCreateView(generics.ListCreateAPIView):
    queryset = Materii.objects.all()
    serializer_class = YourModelSerializer
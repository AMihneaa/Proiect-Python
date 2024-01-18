from rest_framework import generics
from rest_framework.response import Response

from .models import Materii, Student
from .serializers import YourModelSerializer, StudentSerializer

class YourModelListCreateView(generics.ListCreateAPIView):
    queryset = Materii.objects.all() # queryset = Materii.object.all() = cauta toate materiile si le baga intr un query, care e o lista
    serializer_class = YourModelSerializer


class StudentCreateView(generics.CreateAPIView):
    queryset = Student.objects.all()
    serializer_class = StudentSerializer

    def perform_create(self, serializer):
        materii_ids = self.request.data.get('materii_ids', [])

        student = serializer.save()

        student.materii.set(Materii.objects.filter(id__in=materii_ids))


class MateriiUpdateStudentsView(generics.UpdateAPIView):
    queryset = Materii.objects.all()
    serializer_class = YourModelSerializer
    lookup_url_kwarg = 'id'

    def update(self, request, *args, **kwargs):
        instance = self.get_object()
        student_id = request.data.get('student_id')

        # Verificați dacă studentul există
        try:
            student = Student.objects.get(id=student_id)
        except Student.DoesNotExist:
            return Response({"error": "Studentul nu există."}, status=404)

        # Adăugați studentul la lista de studenți asociată materiei
        instance.studenti.add(student)
        instance.save()

        serializer = self.get_serializer(instance)

        # Verificați dacă actualizarea a fost un succes și trimiteți un răspuns corespunzător
        if instance.studenti.filter(id=student_id).exists():
            return Response({"message": "Studentul a fost adăugat cu succes la materie."})
        else:
            return Response({"error": "Adăugarea studentului la materie a eșuat."}, status=400)

    # Permiteți doar metoda POST pentru această vizualizare
    def post(self, request, *args, **kwargs):
        return self.update(request, *args, **kwargs)
class StudentListView(generics.ListAPIView):
    queryset = Student.objects.all()
    serializer_class = StudentSerializer

class StudentDeleteView(generics.DestroyAPIView):
    queryset = Student.objects.all()
    serializer_class = StudentSerializer
    lookup_field = 'id'

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        self.perform_destroy(instance)
        return Response({"message": "Studentul a fost șters cu succes."})


class StudentDetailView(generics.RetrieveAPIView):
    queryset = Student.objects.all()
    serializer_class = StudentSerializer
    lookup_field = 'id'
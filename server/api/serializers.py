# yourappname/serializers.py
from rest_framework import serializers
from .models import Materii, Student

class YourModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = Materii
        fields = '__all__'


class StudentSerializer(serializers.ModelSerializer):
    # Adăugați un câmp pentru a stoca id-urile materiilor asociate
    materii_ids = serializers.ListField(write_only=True, required=False)

    class Meta:
        model = Student
        fields = '__all__'
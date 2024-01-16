# yourappname/serializers.py
from rest_framework import serializers
from .models import Materii, Student


class YourModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = Materii
        fields = '__all__'


class StudentSerializer(serializers.ModelSerializer):
    materii_ids = serializers.ListField(write_only=True, required=False)

    class Meta:
        model = Student
        fields = '__all__'

class YourModelSerializer(serializers.ModelSerializer):
    studenti = StudentSerializer(many=True, read_only=True);

    class Meta:
        model = Materii
        fields = '__all__'
# yourappname/serializers.py
from rest_framework import serializers
from .models import Materii

class YourModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = Materii
        fields = '__all__'

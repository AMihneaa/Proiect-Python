# models.py

from django.db import models

class Student(models.Model):
    nume = models.CharField(max_length=100)
    prenume = models.CharField(max_length=100)
    serie = models.CharField(max_length=10)
    nota = models.IntegerField()

    def __str__(self):
        return f"{self.nume} {self.prenume}"


class Materii(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField()
    anLicenta = models.CharField(max_length=4, default='2022')
    studenti = models.ManyToManyField(Student, blank=True)

    def __str__(self):
        return self.name

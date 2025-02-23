from rest_framework import serializers
from .models import Contact, Animal, AnimalDiagnosis, Appointment, Medicine, Sale

# Contact Serializer
class ContactSerializer(serializers.ModelSerializer):
    class Meta:
        model = Contact
        fields = '__all__'


# Animal (Patient) Serializer
class AnimalSerializer(serializers.ModelSerializer):
    class Meta:
        model = Animal
        fields = '__all__'


# Animal Diagnosis Serializer
class AnimalDiagnosisSerializer(serializers.ModelSerializer):
    class Meta:
        model = AnimalDiagnosis
        fields = '__all__'


# Appointment Serializer
class AppointmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Appointment
        fields = '__all__'


# Medicine Serializer
class MedicineSerializer(serializers.ModelSerializer):
    stock_value = serializers.ReadOnlyField()

    class Meta:
        model = Medicine
        fields = '__all__'


# Sales Serializer
class SaleSerializer(serializers.ModelSerializer):
    total_price = serializers.ReadOnlyField()

    class Meta:
        model = Sale
        fields = '__all__'
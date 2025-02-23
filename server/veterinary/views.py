from rest_framework import viewsets
from .models import Contact, Animal, AnimalDiagnosis, Appointment, Medicine, Sale
from .serializers import ContactSerializer, AnimalSerializer, AnimalDiagnosisSerializer, AppointmentSerializer, MedicineSerializer, SaleSerializer

# Contact ViewSet
class ContactViewSet(viewsets.ModelViewSet):
    queryset = Contact.objects.all()
    serializer_class = ContactSerializer


# Animal (Patient) ViewSet
class AnimalViewSet(viewsets.ModelViewSet):
    queryset = Animal.objects.all()
    serializer_class = AnimalSerializer


# Animal Diagnosis ViewSet
class AnimalDiagnosisViewSet(viewsets.ModelViewSet):
    queryset = AnimalDiagnosis.objects.all()
    serializer_class = AnimalDiagnosisSerializer


# Appointment ViewSet
class AppointmentViewSet(viewsets.ModelViewSet):
    queryset = Appointment.objects.all()
    serializer_class = AppointmentSerializer


## Medicine ViewSet
class MedicineViewSet(viewsets.ModelViewSet):
    queryset = Medicine.objects.all()
    serializer_class = MedicineSerializer


# Sales ViewSet
class SaleViewSet(viewsets.ModelViewSet):
    queryset = Sale.objects.all()
    serializer_class = SaleSerializer
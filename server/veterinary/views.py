from rest_framework import viewsets,status
from django.db.models import Sum
from .models import Contact, Animal, AnimalDiagnosis, Appointment, Medicine, Sale
from .serializers import ContactSerializer, AnimalSerializer, AnimalDiagnosisSerializer, AppointmentSerializer, MedicineSerializer, SaleSerializer
from rest_framework.decorators import action
from rest_framework.response import Response
from django.shortcuts import get_object_or_404


# Contact ViewSet
class ContactViewSet(viewsets.ModelViewSet):
    queryset = Contact.objects.all()
    serializer_class = ContactSerializer
    
    @action(detail=False, methods=['get'], url_path='count')
    def get_contact_count(self, request):
        count=Contact.objects.count()
        return Response({"total_contacts":count})


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
    
    @action(detail=False, methods=['get'], url_path='count')
    def get_appointment_count(self, request):
        count=Appointment.objects.count()
        return Response({"total_appointments":count})


class MedicineViewSet(viewsets.ModelViewSet):
    queryset = Medicine.objects.all()
    serializer_class = MedicineSerializer

    @action(detail=False, methods=['get'], url_path='count')
    def get_medicine_count(self, request):
        """Count the total number of medicines."""
        count = Medicine.objects.count()
        return Response({"total_medicines": count})

    @action(detail=False, methods=['get'], url_path='low-stock')
    def get_low_stock_medicines(self, request):
        """Retrieve medicines that have low stock (less than 5 units)."""
        low_stock_medicines = Medicine.objects.filter(quantity__lt=5)
        serializer = self.get_serializer(low_stock_medicines, many=True)
        return Response(serializer.data)
    

class SaleViewSet(viewsets.ModelViewSet):
    queryset = Sale.objects.all()
    serializer_class = SaleSerializer

    def create(self, request, *args, **kwargs):
        """Custom sale logic - prevent selling more than available stock."""
        medicine_id = request.data.get('medicine')
        quantity_sold = int(request.data.get('quantity_sold', 0))

        if not medicine_id:
            return Response({"error": "Medicine ID is required"}, status=status.HTTP_400_BAD_REQUEST)

        medicine = get_object_or_404(Medicine, id=medicine_id)

        if medicine.quantity < quantity_sold:
            return Response({"error": "Not enough stock available"}, status=status.HTTP_400_BAD_REQUEST)

        total_price = quantity_sold * medicine.price  # Ensure total_price is calculated

        request.data['total_price'] = total_price  # Inject total_price before saving

        try:
            return super().create(request, *args, **kwargs)
        except ValueError as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)
        
    @action(detail=False, methods=['get'], url_path='count')
    def get_sale_count(self, request):
        count = Sale.objects.count()
        return Response({"total_sales": count})
    
    @action(detail=False, methods=['get'], url_path='total-revenue')
    def get_total_revenue(self, request):
        """Calculate the total revenue of all sales."""
        total_revenue = Sale.objects.aggregate(total_revenue=Sum('total_price'))['total_revenue'] or 0
        return Response({"total_revenue": total_revenue})
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
        

class MedicineSerializer(serializers.ModelSerializer):
    stock_value = serializers.SerializerMethodField()  # Compute stock value dynamically

    class Meta:
        model = Medicine
        fields = '__all__'

    def get_stock_value(self, obj):
        """Calculate the total stock value of the medicine."""
        return obj.stock_value()


class SaleSerializer(serializers.ModelSerializer):
    total_price = serializers.DecimalField(max_digits=10, decimal_places=2, required=False)
    medicine_name = serializers.SerializerMethodField()

    class Meta:
        model = Sale
        fields = ['id', 'total_price', 'quantity_sold', 'sale_date', 'medicine', 'medicine_name']

    def get_medicine_name(self, obj):
        return obj.medicine.name
    

class CountSerializer(serializers.Serializer):
    count = serializers.IntegerField()
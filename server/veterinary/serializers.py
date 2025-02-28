from rest_framework import serializers
from django.contrib.auth import authenticate
from rest_framework.authtoken.models import Token
from .models import Contact, Animal, AnimalDiagnosis, Appointment, Medicine, Sale, CustomUser


class UserRegistrationSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = CustomUser
        fields = ('full_name', 'email', 'password')

    def create(self, validated_data):
        # Automatically set username to email
        validated_data['username'] = validated_data['email']
        
        user = CustomUser.objects.create_user(
            email=validated_data['email'],
            full_name=validated_data['full_name'],
            password=validated_data['password'],
            username=validated_data['username']  # Pass the username explicitly
        )
        return user

class UserLoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True)

    def validate(self, data):
        email = data.get('email')
        password = data.get('password')

        if email and password:
            user = authenticate(email=email, password=password)
            if user:
                if not user.is_active:
                    raise serializers.ValidationError("User account is disabled.")
                data['user'] = user
            else:
                raise serializers.ValidationError("Unable to log in with provided credentials.")
        else:
            raise serializers.ValidationError("Must include 'email' and 'password'.")
        return data
    

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
from rest_framework import serializers
from .models import GuestBook

class GuestBookserializer(serializers.ModelSerializer):

    class Meta:
        model=GuestBook
        fields="__all__"

        #fields=['title','writer','content']
        #exclude=['password']

class ViewGuestserializer(serializers.ModelSerializer):

    class Meta:
        model=GuestBook
        exclude=['password']
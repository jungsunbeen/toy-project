from django.shortcuts import render
from django.http import JsonResponse # 추가 
from django.shortcuts import get_object_or_404 # 추가
from django.views.decorators.http import require_http_methods
from .models import GuestBook
import json
from .serializer import GuestBookserializer
from .serializer import ViewGuestserializer
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.views import status
from rest_framework import status
from django.http import Http404

#Password 다 숨겨야 함. 

# Create your views here.
class GuestBookList(APIView):
    def post(self,request, format=None):
        serializer = GuestBookserializer(data=request.data)
        if(serializer.is_valid()):
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def get(self, request, format=None):
        guestbook=GuestBook.objects.order_by('-created_at')
        serializers=ViewGuestserializer(guestbook, many=True)
        return Response(serializers.data,)
    

class GuestBookDetail(APIView):  # 목록으로 불러오기 
    def get(self, request, id):
        guestbook= get_object_or_404(GuestBook, id=id)
        serializer=ViewGuestserializer(guestbook)
        return Response(serializer.data)
    
    def post(self, request, id):
        guestbook=get_object_or_404(GuestBook, id=id)
        if 'password' in request.data:
            if guestbook.password == request.data.get('password'):
                guestbook.delete()
                return Response({'success': '게시글 삭제성공'}, status=status.HTTP_204_NO_CONTENT)
            return Response({'error':'비밀번호가 틀립니다'}, status=status.HTTP_400_BAD_REQUEST)
        return Response({'error': 'POST 요청이 필요하며, 비밀번호가 필요합니다.'}, status=status.HTTP_400_BAD_REQUEST)
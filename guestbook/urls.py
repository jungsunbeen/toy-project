from django.urls import path
from guestbook.views import *

urlpatterns= [

    path('', GuestBookList.as_view()),
    path('<int:id>/', GuestBookDetail.as_view())
    
]
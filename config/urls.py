from django.contrib import admin
from django.urls import path, include
from guestbook.views import *

urlpatterns = [
    path("admin/", admin.site.urls),
    path('guestbook/', include('guestbook.urls')),
]

from django.db import models
from django.conf import settings

class BaseModel(models.Model):
    created_at=models.DateTimeField(verbose_name="작성일시", auto_now_add=True)

    class Meta:
        abstract=True

class GuestBook(BaseModel):

    id=models.AutoField(primary_key=True)
    title =models.CharField(verbose_name="제목", max_length=20)
    content= models.TextField(verbose_name="내용")
    writer= models.CharField(verbose_name="작성자", max_length=10)
    password=models.CharField(verbose_name="게시글비밀번호",max_length=10)


# Create your models here.

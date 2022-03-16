from django.urls import path
from . import views

urlpatterns = [
    path('', views.home),
    path('register/', views.register_user),
    path('login/', views.login_user),
    path('todos/', views.todos),
    path('save_todo/', views.save_todo),
    path('update_todo/', views.update_todo),
    path('delete_todo/<int:id>/', views.delete_todo)
]
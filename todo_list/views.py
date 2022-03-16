from django.shortcuts import render
from django.contrib.auth.models import User, auth
from .models import *
from django.http import JsonResponse, HttpResponse
import json
import datetime

# Create your views here.
def home(request):
    return render(request, 'index.html')


def register_user(request):
    data = json.loads(request.body)

    username = data['username']
    email = data['email']
    password1 = data['password1']
    password2 = data['password2']

    if password1 == password2:
        if User.objects.filter(username=username).exists():
            return JsonResponse({'message': 'Username already taken'})
        else:
            User.objects.create_user(username=username, password=password1, email=email)    
            user = auth.authenticate(username=username, password=password1)
            if user is not None:
                auth.login(request, user)
            
            return JsonResponse({'message': 'User created'})
    else:
        return JsonResponse({'message': 'Passwords do not match'})


def login_user(request):
    data = json.loads(request.body)

    email = data['email']
    password = data['password']
    user = User.objects.get(email=email)

    user = auth.authenticate(username=user.username, password=password)
    if user is not None:
        auth.login(request, user)
        return JsonResponse({'message': 'User is logged in'})
    else:
        return JsonResponse({'message': 'username or password is incorrect'})    


def todos(request):
    context = {}
    data = []
    message = ''
    if request.user.is_authenticated:
        todos = Todo.objects.filter(user=request.user, deleted_at=None, updated_at=None)
        for todo in todos:
            data.append({
                'id': todo.id,
                'title': todo.title,
                'description': todo.description,
                'date': todo.date,
                'time': todo.time
            })
        context = {"todos": data, "message": "user is logged in"}
        return JsonResponse(context)
    else:
        context = {"todos": data, "message": "user not logged in"}
        return JsonResponse(context) 


def save_todo(request):
    if request.user.is_authenticated:
        data = json.loads(request.body)
        title = data['title']
        description = data['description']
        date = data['date']
        time = data['time']

        Todo.objects.create(
            user=request.user,
            title=title,
            description=description,
            date=date,
            time=time,
            created_by=request.user.id
        )

        print('Todo saved successfully')
        return HttpResponse('Todo saved successfully')


def update_todo(request):
    if request.user.is_authenticated:
        data = json.loads(request.body)
        id = data['id']
        title = data['title']
        description = data['description']
        date = data['date']
        time = data['time']

        todo = Todo.objects.get(id=id)
        todo.updated_at = datetime.datetime.now()
        todo.updated_by = request.user.id
        todo.save()

        Todo.objects.create(
            user=request.user,
            title=title,
            description=description,
            date=date,
            time=time
        )

        print('Todo updated successfully')
        return HttpResponse('Todo updated successfully')


def delete_todo(request, id):
    if request.user.is_authenticated:
        todo = Todo.objects.get(id=id)
        todo.deleted_at = datetime.datetime.now()
        todo.deleted_by = request.user.id
        todo.save()

        print('Todo deleted successfully')
        return HttpResponse('Todo deleted successfully')

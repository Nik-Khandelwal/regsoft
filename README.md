# BOSM Regsoft

This is the repository for the registration software used in the BITS Open Sports Meet (BOSM), The sport's fest of BITS Pilani, Pilani Campus

**Requirements**

- Python 3+
- Django 2.1+
- Redis-Server

**Installation**

- Download Python 3+ from the Official Python Website and install
- For Installing Redis-Server
  - For Windows - Follow this [Stack Overflow Question](https://stackoverflow.com/questions/6476945/how-do-i-run-redis-on-windows)
  - For Ubuntu - Follow [Official Quickstart Guide](https://redis.io/topics/quickstart) or the one on [Digital Ocean](https://www.digitalocean.com/community/tutorials/how-to-install-and-configure-redis-on-ubuntu-16-04)
  
- Download or pull the repository to your local computer and install all the dependencies using ```pip install -r requirements.txt```
- All the dependencies may or may not be installed so when running any command if you get any error of a dependency not being installed don't panic and just install it using ```pip install <dependency-name>```

**Running the Server**

- Before getting started up with running the server first migrate the models using ```python manage.py makemigrations``` followed by ```python manage.py migrate```
- The SQLite3 Database in this repository is not empty and has some data in it. So don't clean it :)
- The next step would be creating your own superuser for logging in into the Admin Panel. You can do this using ```python manage.py createsuperuser```
- Next collect the static files into the /static folder using ```python manage.py collectstatic``` followed by yes
- Finally type ```python manage.py runserver``` to start the server.
- If you go to ```127.0.0.1:8000``` and see a server error kind of thing even when the runserver command started the server without any issues then check if your redis server is working or not. Its most likely because of it not working that you are encountering issues.

# BOSM Regsoft

This is the repository for the registration software used in the BITS Open Sports Meet (BOSM), The Annual Sport's Festival of BITS Pilani, Pilani Campus.
Website: http://bits-bosm.org/

## Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

- Python3
- pip & virtualenv
- Django 1.11+
- Redis-Server

### Installing

1. For Installing Python3 and Setting up pip, virtualenv & Django:

  - Download Python3 from the [Official Website](https://www.python.org/downloads/). Don't forget to add it to the PATH if you are using Windows.
  - Set up [pip, virtualenv and django](https://www.codingforentrepreneurs.com/blog/install-python-django-on-windows/)

2. For Installing Redis-Server:

  - For Windows - Follow [Stack Overflow Question](https://stackoverflow.com/questions/6476945/how-do-i-run-redis-on-windows)
  - For Ubuntu - Follow [Official Quickstart Guide](https://redis.io/topics/quickstart) or the one on [Digital Ocean](https://www.digitalocean.com/community/tutorials/how-to-install-and-configure-redis-on-ubuntu-16-04)

3. Clone the project locally from GitHub by running the following and cd into regsoft directory:

  ```
  git clone https://github.com/Nik-Khandelwal/regsoft.git
  cd regsoft
  ```

4. Create a virtual environment with Python3 and install the dependencies (commands slightly vary in Windows).

  ```
  $ virtualenv venv
  $ source venv/bin/activate
  $ pip install -r requirements.txt
  ```

5. Run Django migrations to migrate the models.

  ```
  python manage.py makemigrations
  python manage.py migrate
  ```

6. Collect the static files into /static directory using the folowing command. Type 'yes' to continue.  

  ```
  python manage.py collectstatic
  ```

7. Create a Superuser to generate Django Admin Panel login credentials.

  ```
  python manage.py createsuperuser
  ```

8. Start the server.

  ```
  python manage.py runserver
  ```

9. Modify all email addresses to avoid sending out emails during testing

  ```
  python manage.py shell < modify_emails.py
  ```
  
##### Note: If you get a server error at ```127.0.0.1:8000``` but are having no issues when starting the server then check if the Redis server is working or not.

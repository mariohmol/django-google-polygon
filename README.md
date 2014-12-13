django-google-polygon
=====================

Easy example using django and gmap to draw and validate polygons

# Instalation

Install Python 2.7.3 and PIP, to see full details about how to install all to get django working properly, see at:
* https://docs.djangoproject.com/en/1.7/intro/install/

If you already works with python and pip:
* pip install Django==1.7.1

Then clone this project:
* git clone git@github.com:mariohmol/django-google-polygon.git

Aditional libs:
* apt-get install binutils libproj-dev gdal-bin python-mysqldb mysql-client-core-5.6
* pip install MySQL-python

Configure database setting using environment, example:
* export DGPOLYGON_DB=dgpolygon
* export DGPOLYGON_USER=root
* export DGPOLYGON_PASS=123456

Or force it at:
* settings.py

To create initial database, use:
* python manage.py migrate


Create an admin user and access using localhost:8000/admin/. In this example it uses user admin and 123456:
* python manage.py createsuperuser

To run use the command above and it will be available at localhost:8000 : 
* python manage.py runserver



## AWS Install

Launch a EC2, here i'm using  Ubuntu Server 14.04 LTS (HVM), t2.micro instance and use all default options.
Launch a RDS , for testing choose a No Multi-AZ Deployment and all minimal requirements. 


# Development 



To create the database do: 
* python manage.py sqlmigrate gmappolygons 0001


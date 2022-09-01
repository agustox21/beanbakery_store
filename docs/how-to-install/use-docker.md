# Use Docker

1. Clone source code to the _<mark style="color:green;">**'/home/beanbakery**</mark>**'**_ folder is the home folder of the 'beanbakery' user.\
   \- sudo useradd -m -U -r -d /home/beanbakery -s /bin/bash beanbakery\
   \- sudo su - beanbakery\
   \- git clone https://github.com/thebeanus/beanbakery\_store.git \~/app
2. Go to the Odoo folder:\
   \- cd /home/beanbakery/app
3. Setup the Nginx proxy:
   * sudo apt install nginx -y
   *   Turn off the nginx default setting:

       `sudo nano /etc/nginx/nginx.conf`
   * comment the line that have the following info "include /etc/nginx/sites-enabled/\*" and save file
   *   **Create nginx default without SSL config file** by following command:

       `sudo cp /home/beanbakery/beanbakery_app/nginx/conf/nginx_bean.conf /etc/nginx/conf.d/`
   *   Or **Create nginx default with SSL config file**

       `sudo cp /home/beanbakery/beanbakery_app/nginx/conf/nginx_bean_ssl.conf /etc/nginx/conf.d/`
   * Copy your SSL key to '/etc/ssl/nginx/' folder
   * Test NGINX: `sudo nginx -t`
   * If everything is OK, then reload nginx: `sudo nginx -s reload`
4. `Start docker:`
   * Run `docker-compose up -d` on the root of project

Now the Bean Bakery v15 system will run on port 8069 and for external request via port 80 / 443 wil be redirect to Odoo system.

# Ubuntu 20.04 and python 3.8.\*



Commonly, Ubuntu 20.04 VPS will come with python 3.8.\*. We start to set up Odoo environment as following

1. Update all library that installed with Ubuntu 20.04: \
   `sudo apt update`
2. Install the dependencies that required for Odoo system:  \
   `sudo apt install libxml2-dev libxslt1-dev libldap2-dev libsasl2-dev libtiff5-dev libjpeg8-dev libopenjp2-7-dev zlib1g-dev libfreetype6-dev liblcms2-dev libwebp-dev libharfbuzz-dev libfribidi-dev libxcb1-dev libpq-dev xfonts-75dpi git python3-pip python3.8-venv python3.8-dev -y`
3. Install **pip and virtualenv** lib:
   * `sudo python3 -m pip install pip`
   * `pip install virtualenv`
4. Install **wkhtmltopdf library**:\
   `wget https://github.com/wkhtmltopdf/packaging/releases/download/0.12.6-1/wkhtmltox_0.12.6-1.focal_amd64.deb && sudo apt install ./wkhtmltox_0.12.6-1.focal_amd64.deb`
5. Install **nodejs and rltcss library**:
   * `curl -sL https://deb.nodesource.com/setup_16.x | sudo -E bash -`
   * `sudo apt-get install -y nodejs`&#x20;
   * `sudo npm install -g rtlcss`
6. Install PostgresSQL:\

   * _Create the file repository configuration:_ \
     `sudo sh -c 'echo "deb http://apt.postgresql.org/pub/repos/apt $(lsb_release -cs)-pgdg main" > /etc/apt/sources.list.d/pgdg.list'`
   *   _Import the repository signing key:_

       `wget --quiet -O - https://www.postgresql.org/media/keys/ACCC4CF8.asc | sudo apt-key add -`
   *   _Update the package lists:_

       `sudo apt-get update`
   *   _Install the latest version of PostgreSQL. If you want a specific version, use 'postgresql-14' or similar instead of 'postgresql':_

       `sudo apt install postgresql postgresql-contrib -y`
   * _Create Postgres user:_
     * `sudo su - postgres`
     * `psql -U postgres`
     * `CREATE ROLE beanbakery WITH CREATEDB LOGIN ENCRYPTED PASSWORD 'P@assword#@!321';`
   * You can check the Created Postges user by command `\du` and exit Postgres command line by 'Ctrl+D' then 'exit'
7.  Clone source code and we need to create a new system user for BeanBakery v15 installation. Make sure the username is the same as the PostgreSQL user that we created in the previous step (username maybe different if you want it). In the following command, I use the _<mark style="color:green;">**'/home/beanbakery**</mark>**'**_ folder is the home of the 'beanbakery' user.

    ```
    - `sudo useradd -m -U -r -d /home/beanbakery -s /bin/bash beanbakery`
    - `sudo su - beanbakery`
    - `git clone https://github.com/thebeanus/beanbakery_store.git ~/app`
           
    ```
8. Install Virtual Enviroment for python and setup BeanBakery v15:
   * _install env lib:_&#x20;
     * `cd ~ && python3 -m venv beanbakery-venv`&#x20;
     * `source ~/beanbakery-venv/bin/activate`
   * _install odoo dependencies library :_
     * `pip install setuptools wheel`
     * `pip install -r ~/app/requirements.txt`
   * Optional: we can install Odoo as a python library with following CLI:
     * `pip install -e /home/beanbakery/app/`
9.  Make BeanBakery v15 public folder and data folder:

    * `mkdir ~/local_data && mkdir ~/local_data/addons && mkdir ~/local_data/log && mkdir ~/local_data/share && mkdir ~/local_data/config && chmod 777 ~/local_data/ -R`\
      `Note: the`` `**`local_data`**`folder structure as following:`

    &#x20; `local_data`\
    &#x20;  `|---config`\
    &#x20;  `|---log`\
    &#x20;  `|---share`
10. Init BeanBakery v15 system for the first time:\
    `cp ~/app/odoo_prod.conf ~/local_data/`\
    `~/beanbakery-venv/bin/python3 ~/app/odoo-bin -c ~/app/odoo_prod.conf -d beanbakery -i base --stop-after-init`&#x20;
11. Setup Odoo as System service:
    * `sudo cp /home/beanbakery/beanbakery_app/beanbakery.service /etc/systemd/system/`
    *   _To start service:_

        `sudo systemctl start beanbakery.service`
    *   _To stop service:_

        `sudo systemctl stop beanbakery.service`
    *   _To check service status:_

        `sudo systemctl status beanbakery.service`
12. Setup the Nginx proxy:
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
    *   If everything is OK, then reload nginx: `sudo nginx -s reload`

        Now the Bean Bakery v15 system will run on port 8069 and for external request via port 80 / 443 wil be redirect to Odoo system.&#x20;
13. Next step, just config the domain DNS to connect with VPS via IP address and done.

sudo apt install nginx
sudo cp /home/ubuntu/checkbox/local-conf/default /etc/nginx/sites-available/default
sudo cp /home/ubuntu/checkbox/local-conf/nginx.conf /etc/nginx/nginx.conf
sudo service nginx restart


# React-JS-Snippets
React Js Components Snippets

#Installing React
sudo npm install -g create-react-app
cd /Users/yashpreet.singh/
mkdir reactJs
cd reactJs
create-react-app reactfirst
cd reactfirst
npm start (--hot for auto deploy on code change)
npm run build (every time code changes when running via nginx)
serve -s build


#Install nginx
brew install nginx
sudo nginx
sudo nginx -s stop
nginx -s reload


#Redirect rule via nginx
Nginx changes for server
/usr/local/etc/nginx/nginx.conf
server{
       listen 80;
       server_name domainName.tld;
       location / {
            #root /Users/yashpreet.singh/reactfirst/build;
            #index index.html;
            root   html;
            index  index.html index.htm;
            proxy_pass http://localhost:3800;
        }
}

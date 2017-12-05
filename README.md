# React-JS-Snippets
React Js Components Snippets

## Installing React
```

sudo npm install -g create-react-app
cd /Users/yashpreet.singh/
mkdir reactJs
cd reactJs
create-react-app reactfirst
cd reactfirst
npm start (--hot for auto deploy on code change)
npm run build (every time code changes when running via nginx)
serve -s build

```


## Install nginx

```
brew install nginx
sudo nginx
sudo nginx -s stop
nginx -s reload
```

## Redirect rule via nginx

```
Nginx changes for server (Mac OSX)
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

```
## React Component LifeCycle
> 
* **Initial** 
	- *getDefaultProps* -- can be used to define any default props which can be accessed via this.props
	- *getInitialState* -- it enables to set the initial state value,that is accessible inside the component via this.state
	- *componentWillMount* -- is called before the render method is executed.making changes to state here will not trigger a re-render.
	- *render* -- returns the needed component markup, which can be a single child component or null or false.
			  Neither props nor state should be modified inside this function.
			  render is prefered to be a pure function.
	- *componentDidMount* -- is called after the render method is called.
* **State Change functions** 
	- *shouldComponentUpdate* -- is always called before render returns a boolean value indicating if rendering should take place or not.
	- *componentWillUpdate* -- called just after shouldComponentUpdate no state change should occur in this function.
	- *componentDidUpdate* -- called after render method.
* **Prop Change functions**
	- *componentWillRecieveProps* -- will only be called if props have changed and its not initial rendering.
	- *shouldComponentUpdate* -- similar to state function
	- *componentWillUpdate* -- similar to state function
	- *componentDidUpdate* -- similar to state function
* **Unmounting**
	- *componentWillUnmount* -- it is called when component is removed from the DOM. method can be used to perform cleanup operations.

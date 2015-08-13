# Cloudflare DDNS
## A Node script to update a Cloudflare record just from calling an URL.

## How to use 
Make a ``GET`` request to this URL :
```
http://ddns.yourserver.com/:secret/:ip
```
Replace ``:secret`` with your secret key and ``:ip`` with your new IP. You should get something like this : 
```
http://ddns.yourserver.com/RGIz3lct2R25lHNks4b3/127.0.0.1
```  

## How to setup
```
git clone git@github.com:th3m4ri0/cloudflare-ddns.js.git
npm install
export API_KEY=
export EMAIL=
export SECRET=
export DOMAIN=
export SUBDOMAIN=
node index.js
```

## How setup on Heroku

```
git clone git@github.com:th3m4ri0/cloudflare-ddns.js.git
heroku create
git push heroku master
heroku config:set API_KEY=
heroku config:set EMAIL=
heroku config:set SECRET=
heroku config:set DOMAIN=
heroku config:set SUBDOMAIN=
```

You can generate secret keys on [random.org](https://www.random.org/strings/?num=1&len=20&digits=on&upperalpha=on&loweralpha=on&unique=on&format=html&rnd=new)



## Credits :
- [Cloudflare API module](https://github.com/sheknows/node-cloudflare) by [sheknows](https://github.com/sheknows)
- [CloudFlareDDNS](https://github.com/ScottHelme/CloudFlareDDNS) by [ScottHelme](https://github.com/ScottHelme)
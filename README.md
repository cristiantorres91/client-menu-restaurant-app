# client menu app 


# Demo

[https://admin-menu-restaurant.netlify.app](https://client-menu-resturant.netlify.app/)

## Configuration
1. create file .env
 ```bash
API_APP=URL_API-FIREBASE-REALTIME-DATABASE
API_CLOUDINARY=URL_API-CLOUDINARY
```
2. Create project firebase(realtime-database) with the following structure(
you can import the data-app.json file in src>fake-data) replace in .env API_APP
```bash
{
  "config": {
    "isWorkDay": false,
    "password": "admin123*",
    "user": "menu-app"
  },
  "menu": {
    "-MwYssigAzrNhPsXSFYb": {
      "available": true,
      "description": "pollo  + Arroz + Chirimol + 2 tortillas",
      "name": "POLLO ASADO",
      "picture": "https://res.cloudinary.com/do6nlugt0/image/upload/v1645574624/hvm8olm2thdbd0rr2u4a.jpg",
      "price": 3.75
    }
  },
  "orders": {
    "-NdGJMIUm4BmpESN3Jm5": {
      "comments": "",
      "date": "2023-09-01 09:16:47",
      "delivered": false,
      "email": "cristiantorresalfaro91@gmail.com",
      "name": "Leonel",
      "order": "2 POLLO ASADO, 1 Carne Asada",
      "phone": "7129-5944",
      "status": "p",
      "statusDescription": "pending",
      "total": "11.50"
    }
  }
}
```
3. Create a new project to host images in cloudinary and replace in the .env file API_CLOUDINARY

## Authors

- [@cristiantorres91](https://www.github.com/cristiantorres91)

## Admin Menu App 
[https://github.com/cristiantorres91/client-menu-restaurant-app](https://github.com/cristiantorres91/admin-menu-restaurant-app)

## Install the dependencies
```bash
yarn
# or
npm install
```

### Start the app in development mode (hot-code reloading, error reporting, etc.)
```bash
quasar dev
```


### Lint the files
```bash
yarn lint
# or
npm run lint
```


### Format the files
```bash
yarn format
# or
npm run format
```



### Build the app for production
```bash
quasar build
```

### Customize the configuration
See [Configuring quasar.config.js](https://v2.quasar.dev/quasar-cli-vite/quasar-config-js).

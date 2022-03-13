# siwca Frontend

## Entorno de desarrollo local

### Dependencias

* Node 8
* NPM >=5.6.0
* GNU/Linux, MacOS o Windows
* Cordova (para build mobile)
* Android Studio

Instalar dependencias

```
npm install
```

Correr servidor local

```
npm run dev
```

## Build de app mobile

### Generar distribuible de la aplicación


```
npm run build:mobile
```

Añadir plataformas correspondientes:


```
cordova platform add android
cordova platform add ios
```

Correr en celular

```
cordova run <android|ios>
```


## Configuración por entorno

Fijarse en config/{entorno}.env.js

## Generar distribuible del sitio

### Entorno dev

```
npm run build:dev
```

### Entorno test

```
npm run build:test
```

### Entorno producción

```
npm run build:prod
```

Pushear los cambios al servidor, y taggear con la correspondiente versión (editar tambien version en package.json)
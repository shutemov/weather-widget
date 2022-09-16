# ⛅\<weather-widget \/\>
Meet the weather-widget as a web component for your application based on Vue 3.   

You can see how the widget works here: [https://shutemov.github.io/weather-widget/](https://shutemov.github.io/weather-widget/)  

Just add <weather-widget /> as an html tag and upload the script:


Current link to the app.js: [https://cdn.jsdelivr.net/gh/shutemov/weather-widget/docs/js/app.211b5ef5.js](https://cdn.jsdelivr.net/gh/shutemov/weather-widget/docs/js/app.211b5ef5.js)  

```
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Awesome example</title>
</head>
<body>
    <weather-widget />
    <script type="text/javascript" src="https://cdn.jsdelivr.net/gh/shutemov/weather-widget/docs/js/app.211b5ef5.js"></script>
</body>
</html>
```

### ✨ Features:
+ Saves the state between site visits
+ Interact with the geolocation (waiting for switching permissions, shows the empty state of the application)
+ Uses data from [https://openweathermap.org/](https://openweathermap.org/)
+ Uses vue-router to control the application

### 🚧 Current restrictions:
+ 1 widget per site
+ There is no support for props

+ It is necessary to serve html using a web server for the correct operation of the geo location api. It seems to be due to browser restrictions when working with files from the file system (_file:_//).

### 🔨What need to add:  
+ Props support in the web component (currently it is impossible to build a web component using the vue 3 cli).

## Project setup
```
yarn install
```

### Compiles and hot-reloads for development
```
yarn serve
```

### Compiles and minifies for production
```
yarn build
```

### Lints and fixes files
```
yarn lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

# ⛅\<weather-widget \/\>
Meet the weather-widget as a web component for your application based on Vue 3.   

You can see how the widget works here: [https://shutemov.github.io/weather-widget/](https://shutemov.github.io/weather-widget/)  

Just add <weather-widget /> as an html tag and upload the script:


Current link to the app.js: [https://cdn.jsdelivr.net/gh/shutemov/weather-widget/docs/js/app.624ad1fb.js](https://cdn.jsdelivr.net/gh/shutemov/weather-widget/docs/js/app.624ad1fb.js)  

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
    <script type="text/javascript" src="https://cdn.jsdelivr.net/gh/shutemov/weather-widget/docs/js/app.624ad1fb.js"></script>
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

### 🐞 Bug

There is a bug with the geo-location that I can't track in the allotted time.  
When trying to use a component in an html _file_, navigator.geolocation.getCurrentPosition calls prompt every time it is called, while on github pages and with local serve everything works as expected.

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

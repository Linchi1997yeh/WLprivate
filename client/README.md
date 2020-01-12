# :desktop_computer: Client

## :spiral_notepad: Change Log
### 2020/01/12

* 更換 favicon.ico

* 清除沒有到的dependency：vue-resource, @ionic/vue, vue-scroll

  > 若是需要，請重新安裝使用

* dependency 新增 axios-observable, rxjs, rxjs-compat, vue-rx, vue-cookies

* 使用 axios-observable 取代 axios

  * 等同從promise變成rxjs
  
* 新增 ApiService 來溝通後端

* 新增 UserService來管理使用者的登入登出

* 使用js-beautify, html-beautify, css-beautify排版

* 修改並簡化一些html寫法

* .......等等


## :wrench: Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

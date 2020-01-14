// need vue-cookies
import Axios from 'axios-observable'
/*
import {
    map
} from 'rxjs/operators'
*/

function plugin(Vue, baseURL) {
    const instance = new ApiService(Vue.prototype.$cookies, baseURL)
    Vue.prototype.$http = instance
    Vue.$http = instance
}

const TOKEN = "Token"
const Auth = "Authorization"
class ApiService {
    constructor(cookies, baseURL = '') {
        this.cookies = cookies
        this._token = this._readToken()
        this._globalPipes = []

        this.raw = Axios.create({
            baseURL,
        })
        this.raw.interceptors.response.use((response) => {
            console.log(response.data)
            return response.data
        }, (error) => {
            console.log(error)
            throw error
        });
    }

    getFullPath(url) {
        if(!url || url.startsWith('http')) return url
        url = url.split('\\').join('/')

        const baseURL = this.raw.defaults.baseURL
        if(url.startsWith('/'))
            return baseURL + url
        else 
            return baseURL + '/' + url
    }

    addGlobalPipe(pipeFn) {
        this._globalPipes.push(pipeFn)
    }

    _makeFormData(body, fileField) {
        const data = new FormData()
        for(const key of Object.keys(body)) {
            if(key == fileField && Array.isArray(body[key])) {
                const files = body[key]
                for(let i = 0; i < files.length; i++) {
                    data.append(fileField, files[i])
                }
            } else {
                data.append(key, body[key])
            }
        }
        return data
    }

    postFile(url, body, fileField, options = {}, useGlobalPipe = true) {
        options = this._addFormHeader(options)
        const data = this._makeFormData(body, fileField)
        return this.post(url, data, options, useGlobalPipe)
    }

    patchFile(url, body, fileField, options = {}, useGlobalPipe = true) {
        options = this._addFormHeader(options)
        const data = this._makeFormData(body, fileField)
        return this.patch(url, data, options, useGlobalPipe)
    }

    post(url, body, options = {}, useGlobalPipe = true) {
        options = this._addAuth(options)
        const result$ = this.raw.post(url, body, options)
        return (useGlobalPipe) ? this._makePipes(result$) : result$
    }

    get(url, options = {}, useGlobalPipe = true) {
        options = this._addAuth(options)
        const result$ = this.raw.get(url, options)
        return (useGlobalPipe) ? this._makePipes(result$) : result$
    }

    patch(url, body, options = {}, useGlobalPipe = true) {
        options = this._addAuth(options)
        const result$ = this.raw.patch(url, body, options)
        return (useGlobalPipe) ? this._makePipes(result$) : result$
    }

    delete(url, body, options = {}, useGlobalPipe = true) {
        options = this._addAuth(options)
        const result$ = this.raw.delete(url, body, options)
        return (useGlobalPipe) ? this._makePipes(result$) : result$
    }

    _makePipes(observable) {
        return observable.pipe(...this._globalPipes)
    }

    _addAuth(options) {
        if (this.hasToken()) {
            if (!options) options = {}
            if (!options.headers) options.headers = {}
            options.headers[Auth] = `Bearer ${this._token}`
        }
        return options
    }

    _addFormHeader(options) {
        if (!options) options = {}
        if (!options.headers) options.headers = {}
        options.headers['Content-Type'] = 'multipart/form-data'
    }

    _readToken() {
        return this.cookies.get(TOKEN)
    }

    _saveToken(token) {
        this.cookies.set(TOKEN, token, '1d')
    }

    _removeToken() {
        this.cookies.remove(TOKEN)
    }

    hasToken() {
        return this._token != null
    }

    set token(token) {
        console.log(`token = ${token}`)

        this._token = token
        if (token)
            this._saveToken(token)
        else
            this._removeToken()
    }

    get token() {
        return this._token
    }
}

export default plugin

// need vue-cookies
import Axios from 'axios-observable'
import {
    map
} from 'rxjs/operators'

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

    getEvents$() {
        return this.get('/data/events').pipe(map(
            events => events.map(event => {
                event.date = new Date(event.date)
                return event
            })
        ))
    }

    addGlobalPipe(pipeFn) {
        this._globalPipes.push(pipeFn)
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

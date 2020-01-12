// need  api service
import {
    ReplaySubject
} from 'rxjs'
import {
    tap
} from 'rxjs/operators'

function plugin(Vue, ) {
    const instance = new UserService(Vue.$http, Vue.$cookies)
    Vue.prototype.$user = instance
    Vue.$user = instance
}

class UserService {
    constructor(apiService, cookies) {
        this.api = apiService
        this.cookies = cookies
        this.isLoggedIn$ = new ReplaySubject(1)
        this.profile = {}

        // 1. check if user has been logged in
        if (!this.api.hasToken()) {
            this.isLoggedIn$.next(false)
            return
        }

        // 2. check if user's login is valid
        this.api.get('index').subscribe(() => {
            this.isLoggedIn$.next(true)
            this.profile.email = this.cookies.get("Email")
            alert("已登入")
        }, () => {
            this.isLoggedIn$.next(false)
            this.api.removeToken()
            alert("尚未登入")
        })
    }

    login$(email, password) {
        return this.api.post('user/login', {
            email,
            password
        }).pipe(
            tap(data => {
                this.profile.email = email
                this.cookies.set("Email", email, '1d')
                this.api.token = data.token
                this.isLoggedIn$.next(true)
            })
        )
    }

    logout$() {
        this.profile = {}
        this.api.token = null
        this.cookies.remove("Email")
        this.isLoggedIn$.next(false)
    }
}

export default plugin

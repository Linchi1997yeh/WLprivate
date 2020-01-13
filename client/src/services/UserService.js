// need  api service
import {
    ReplaySubject
} from 'rxjs'
import {
    tap,
    take,
    share,
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
        this._profile$ = new ReplaySubject(1)
        this.profile = {}

        // 1. check if user has been logged in
        if (!this.api.hasToken()) {
            this.isLoggedIn$.next(false)
            return
        }

        // 2. check if user's login is valid
        this.api.get('index').subscribe(() => {
            const email = this.cookies.get("Email")
            this.fetchUserProfile(email)
            this.isLoggedIn$.next(true)
            // alert("已登入")
        }, () => {
            this._reset()
            // alert("尚未登入")
        })
    }

    get profile$() {
        return this._profile$.pipe(take(1), share())
    }

    login$(email, password) {
        return this.api.post('user/login', {
            email,
            password
        }).pipe(
            tap(data => {
                // this.profile.email = email
                this.fetchUserProfile(email)
                this.cookies.set("Email", email, '1d')
                this.api.token = data.token
                this.isLoggedIn$.next(true)
            })
        )
    }

    fetchUserProfile(email) {
        this.api.post('member/profile', { email }).subscribe(
            data => {
                this.profile = data
                this._profile$.next(data)
            }
        )
    }

    logout$() {
        this._reset()
    }

    _reset() {
        this.api.token = null
        this.cookies.remove("Email")
        this.isLoggedIn$.next(false)
        this.profile = {}
        this._profile$.next(null)
    }
}

export default plugin

// need  api service
import {
    ReplaySubject
} from 'rxjs'
import {
    tap,
    take,
    share,
    switchMap,
} from 'rxjs/operators'

function plugin(Vue, ) {
    const instance = new UserService(Vue.$http)
    Vue.prototype.$user = instance
    Vue.$user = instance
}

class UserService {
    constructor(apiService) {
        this.api = apiService
        // this.cookies = cookies
        this.isLoggedIn$ = new ReplaySubject(1)
        this._profile$ = new ReplaySubject(1)
        this.profile = {}

        // 1. check if user has been logged in
        if (!this.api.hasToken()) {
            this.isLoggedIn$.next(false)
            return
        }

        // 2. check if user's login is valid
        this.fetchUserProfile$.subscribe(() => {
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
                this.api.token = data.token
                this.fetchUserProfile$.subscribe(() => this.isLoggedIn$.next(true))
            })
        )
    }

    // deprecated
    fetchUserProfile(email) {
        this.api.post('member/profile', {
            email
        }).subscribe(data => this._setProfile(data))
    }

    get fetchUserProfile$() {
        return this.api.get('user/profile')
            .pipe(tap(data => this._setProfile(data)))
    }

    updateProfile$(newUser) {
        const oldUser = this.profile
        const body = {}
        for (const key of Object.keys(newUser)) {
            if (newUser[key] != oldUser[key]) {
                body[key] = newUser[key]
            }
        }
        return this.api.patchFile('user/profile', body, 'photo')
            .pipe(switchMap(() => this.fetchUserProfile$))
    }

    _setProfile(data) {
        this.profile = data
        this._profile$.next(data)
    }

    logout$() {
        this._reset()
    }

    _reset() {
        this.api.token = null
        // this.cookies.remove("Email")
        this.isLoggedIn$.next(false)
        this._setProfile(null)
    }
}

export default plugin

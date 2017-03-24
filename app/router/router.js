export default function (defaultRoute) {
    return new Router(defaultRoute)
}

class Router {
    constructor(config, defaultRoute = 'default') {
        this.config = config;
        this.defaultRoute = defaultRoute;
    }

    startRouter() {
        if (!this.config) {
            throw new Error('no config for Router!')
        }
        this.initEventListeners();
    }

    initEventListeners() {
        document.addEventListener('DOMContentLoaded', this.__domLoadedCallBack.bind(this));
        window.addEventListener('hashchange', this.__hashChangeCallBack.bind(this), true);
    }

    changeUrl(state) {
        if (!state) {
            throw new Error('No State for changeUrl')
        }

        window.history.pushState(state.url, false, state.url);

        $.get(state.template, function (data) {
            document.getElementById('view-main').innerHTML = data;
            state.controller();
        });
    }

    __domLoadedCallBack() {
        const pathname = document.location.pathname;

        let state;

        Object.keys(this.config).findIndex(key => {
            if (this.config[key].url === pathname) {
                state = this.config[key]
            }
            return this.config[key].url === pathname;
        });

        if (!state) {
            return;
        }
        this.changeUrl(state);
    }

    __hashChangeCallBack() {
        const hash = document.location.hash;

        if (!this.__isValidState(hash)) {
            return;
        }

        const state = this.config[hash];

        this.changeUrl(state);
    }

    __isValidState(hash) {
        return this.config[hash] && this.config[hash].template;
    }
}



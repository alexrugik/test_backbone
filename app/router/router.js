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

        if (state.params) {
            const parsedUrl = state.url.split(':');
            const paramToUrl = parsedUrl[1];
            const url = parsedUrl[0];
            window.history.pushState(`${url}/${state.params[paramToUrl]}`, false, `${url}/${state.params[paramToUrl]}`);
        } else {
            window.history.pushState(state.url, false, state.url);
        }

        $.get(state.template, function (data) {
            document.getElementById('view-main').innerHTML = data;
            state.controller(state.params);
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
        const state = this.__getStateByHash(this.config);
        console.log('state', state);
        this.changeUrl(state);
    }

    __getStateByHash(config) {
        const hash = document.location.hash;

        // если точное совпадение, то возвращаем стейт
        if (this.__isValidState(hash)) {
            return config[hash];
        }

        if (!hash.includes('/')) {
            return;
        }

        const keysWithInclude = Object.keys(config).filter(key => hash.includes(key.split(':')[0]));

        const params = {};
        if (keysWithInclude.length === 1) {
            keysWithInclude.forEach(key => {
                params[key.split(':')[1]] = hash.split('/')[1];
            });
            const state = config[keysWithInclude.pop()];
            state.params = params;
            return state;
        }
    }

    __isValidState(hash) {
        return this.config[hash] && this.config[hash].template;
    }
}



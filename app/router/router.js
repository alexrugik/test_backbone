export default function (config, defaultRoute) {
    return new Router(config, defaultRoute)
}

class Router {
    constructor(config, defaultRoute) {
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
        window.onpopstate = this.__onPopStateCallBack.bind(this);
    }

    __domLoadedCallBack() {
        this.changeStateByUrl();
        window.changeState = this.changeState.bind(this);
    }

    __onPopStateCallBack(event) {
        this.changeStateByUrl();
    }

    changeStateByUrl() {
        const state = this.__findStateByUrl(window.location.pathname);
        this.changeUrl(state);
    }

    changeState(state, params) {
        if (!this.config[state]) {
            return;
        }
        if (params) {
            this.config[state].params = params;
        }
        this.changeUrl(this.config[state]);
    }

    changeUrl(state) {
        if (!state) {
            state = this.config[this.defaultRoute];
        }

        if (state.params) {
            const parsedUrl = state.url.split(':');
            const url = parsedUrl[0];
            const paramToUrl = parsedUrl[1];
            window.history.replaceState(`${url}${state.params[paramToUrl]}`, false, `${url}${state.params[paramToUrl]}`);
        } else {
            window.history.replaceState(state.url, false, state.url);
        }

        fetch(state.template)
            .then(data => {
                data.text().then(text => {
                    document.getElementById('view-main').innerHTML = text;
                    try {
                        state.controller(state.params);
                    }
                    catch (e) {
                        console.warn(e);
                    }
                });
            });
    }

    __findStateByUrl(url) {
        if (this.config[url.replace('/', '')]) {
            return this.config[url.replace('/', '')];
        }

        let state;
        Object.keys(this.config).forEach(key => {
            if (!this.config[key].urlPattern) {
                return;
            }
            if (this.config[key].urlPattern.test(url)) {
                state = this.config[key];
                const param = state.url.split(':')[1];
                state.params = {[param]: url.split('/')[2]};
            }
        });
        return state;
    }
}



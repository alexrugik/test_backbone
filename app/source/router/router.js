import Routes from './routes';


export default function (defaultRoute) {
    return new Router(defaultRoute)
}

class Router {
    constructor(defaultRoute = 'default') {
        this.defaultRoute = defaultRoute;
    }

    startRouter() {
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
        });
    }

    __domLoadedCallBack() {
        const pathname = document.location.pathname;

        let state;

        Object.keys(Routes).findIndex(key => {
            if (Routes[key].url === pathname) {
                state = Routes[key]
            }
            return Routes[key].url === pathname;
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

        const state = Routes[hash];

        this.changeUrl(state);
    }

    __isValidState(hash) {
        return Routes[hash] && Routes[hash].template;
    }
}



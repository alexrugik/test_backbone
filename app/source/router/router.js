import Routes from './routes';


export default function (defaultRoute) {
    return new Router(defaultRoute)
}

class Router {
    constructor(defaultRoute = 'default') {
        this.defaultRoute = defaultRoute;
    }

    startRouter() {
        window.addEventListener('hashchange', (event) => {
            const hash = document.location.hash;

            if (!this.isValidState(hash)) {
                return;
            }

            window.history.pushState(hash, 'Title fdg', `/${hash.slice(1)}`);
            $.get(Routes[hash].template, function (data) {
                document.getElementById('view-main').innerHTML = data;
            });
        });
    }

    isValidState(hash) {
        return Routes[hash] && Routes[hash].template;
    }
}



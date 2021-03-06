import Router from './router/router';
import RouterConfig from './config/app-routes';

const AppView = Backbone.View.extend({
    el: 'body',
    initialize() {
        Router(RouterConfig, 'users').startRouter();
    }
});

const App = new AppView();
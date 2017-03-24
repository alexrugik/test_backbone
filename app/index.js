import Router from './router/router';
import RouterConfig from './config/app-routes';
import usersView from './source/components/users/users';

const AppView = Backbone.View.extend({
    el: 'body',
    initialize() {
        Router(RouterConfig, 'default').startRouter();
        usersView.render();
    }
});

const App = new AppView();
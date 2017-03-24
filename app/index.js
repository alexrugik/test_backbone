import Router from './source/router/router';
import usersView from './source/components/users/users';

const AppView = Backbone.View.extend({
    el: 'body',
    initialize() {
        Router('default').startRouter();
        usersView.render();
    }
});

const App = new AppView();
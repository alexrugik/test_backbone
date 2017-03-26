import listViewController from '../source/views/list-view/list-view.controller';
import  userViewController from '../source/views/user-view/user-view.controller';

export default {
    users: {
        url: '/users',
        template: 'source/views/list-view/list-view.template.html',
        controller: listViewController
    },
    user: {
        url: '/user/:id',
        urlPattern: /\/user\/.+/,
        template: 'source/views/user-view/user-view.template.html',
        controller: userViewController
    }
}
import viewOneController from '../source/views/list-view/list-view.controller';
import viewTwoController from '../source/views/test-two/test-two';
import  userViewController from '../source/views/user-view/user-view.controller';

export default {
    'default': {
        template: false
    },
    '#users': {
        url: '/users',
        template: 'source/views/list-view/list-view.template.html',
        controller: viewOneController
    },
    '#view-two': {
        url: '/second',
        template: 'source/views/test-two/test-two.template.html',
        controller: viewTwoController
    },
    '#user/:id': {
        url: '/user:id',
        template: 'source/views/user-view/user-view.template.html',
        controller: userViewController
    }
}
import viewOneController from '../source/components/test-one/test-one';
import viewTwoController from '../source/components/test-two/test-two';

export default {
    'default': {
        template: false
    },
    '#view-one': {
        url: '/first',
        template: 'source/components/test-one/test-one.template.html',
        controller: viewOneController
    },
    '#view-two': {
        url: '/second',
        template: 'source/components/test-two/test-two.template.html',
        controller: viewTwoController
    },
    '#user/:id': {
        url: '/user:id',
        template: 'source/components/test-two/test-two.template.html',
        controller: viewTwoController
    }
}
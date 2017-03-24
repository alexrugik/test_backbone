import _ from 'underscore';

export default Backbone.View.extend({
    el: '#users',
    template: '#usersTemplate',
    initialize() {
        console.log('users view = ', this);
        this.listenTo(this.model, 'sync', () => {
            this.render();
        });
        this.model.fetch();
    },
    render(eventName) {
        const template = _.template($(this.template).html());
        _.each(this.model.models, (user) => {
            $(this.el).append(template(user.toJSON()));
        }, this);
        return this;
    },
    events: {}
});

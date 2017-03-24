import _ from 'underscore';

export default Backbone.View.extend({
    el: '#users',
    template: _.template($('#usersTemplate').html()),

    initialize() {
        console.log('users view = ', this);
        this.listenTo(this.model, 'sync', () => {
            this.render();
        });
        this.model.fetch();
    },
    render(eventName) {
        _.each(this.model.models, (user) => {
            $(this.el).append(this.template(user.toJSON()));
        }, this);
        return this;
    },
    events: {}

});

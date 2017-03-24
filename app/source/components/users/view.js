import _ from 'underscore';

export default Backbone.View.extend({
    el: '#users',
    template: '#usersTemplate',
    initialize() {
        this.listenTo(this.model, 'sync', () => {
            this.render();
        });
        this.model.fetch();
    },
    render() {
        const template = _.template($(this.template).html());
        _.each(this.model.models, (user) => {
            $(this.el).append(template(user.toJSON()));
        }, this);
        return this;
    },
    events: {}
});

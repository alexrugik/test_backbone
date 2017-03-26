import _ from 'underscore';

export default Backbone.View.extend({
    el: '#users',
    template: '#usersTemplate',
    initialize() {
        this.listenTo(this.model, 'sync', () => {
            this.render();
        });
        this.listenTo(this.model, 'change', () => {
            this.render();
        });
        this.listenTo(this.model, 'remove', (model) => {
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
    events: {
        'click .delete': 'deleteModelView'
    },
    deleteModelView(event) {
        event.preventDefault();
        try {
            const id = event.target.attributes.identity.textContent;
            let modelToDelete = this.model.models.find(model => id === model.get('id'));
            this.model.remove(modelToDelete).unbind(modelToDelete);
            this.el.removeChild(document.getElementById(`user-${id}`));
        }
        catch (e) {
        }
    }
});

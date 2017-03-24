import _ from 'underscore';

export default Backbone.View.extend({
    el: '#user',
    template: '#userTemplate',
    initialize() {
        this.listenTo(this.model, 'sync', () => {
            this.render();
        });
        this.model.fetch();
    },
    render() {
        const template = _.template($(this.template).html());
        $(this.el).append(template(this.model.toJSON()));
        return this;
    },
    events: {}
});

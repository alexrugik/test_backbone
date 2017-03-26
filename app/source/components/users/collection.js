export default function(Model) {
    return Backbone.Collection.extend({
        model: Model,
        url: 'data/users.json',
        initialize() {
        },
    });
}

export default function(Model) {
    return Backbone.Collection.extend({
        model: Model,
        url: `${window.location.origin}/data/users.json`,
        initialize() {
        },
    });
}

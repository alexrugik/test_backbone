export default function(Model) {
    return Backbone.Collection.extend({
        model: Model,
        url: 'data/users.json',
        initialize() {
            console.log('users collection = ', this);
            window.users = this;
        },
    });
}

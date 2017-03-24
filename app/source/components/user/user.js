import UserModel from './model';
import UserView from './view';

export default {
    mount(params, View = UserView, Model = UserModel) {
        return new View({
            model: new Model({id: `${params.id}.json`})
        })
    }
}

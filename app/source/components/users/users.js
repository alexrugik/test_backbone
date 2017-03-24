import UserModel from './model';
import getUsersCollection from './collection';
import UsersCollectionView from './view';

const UsersCollection = getUsersCollection(UserModel);

export default {
    mount(View = UsersCollectionView, Collection = UsersCollection) {
        return new View({
            model: new Collection()
        })
    }
}

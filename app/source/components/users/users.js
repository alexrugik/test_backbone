import UserModel from './model';
import getUsersCollection from './collection';
import UsersCollectionView from './view';

const UsersCollection = getUsersCollection(UserModel);

export default new UsersCollectionView({
    model: new UsersCollection()
});

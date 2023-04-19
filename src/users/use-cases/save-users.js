import { userModerToLocalHost } from '../mappers/user-to-localhost.mapper';
import {User} from '../models/users';


/**
 * 
 * @param {Like<User>} userLike 
 */
export const saveUser = async(userLike) =>{

    

    const user = new User(userLike);

    if(user.firstName || !user.lastName)
    throw 'First & last name are required';
    
    const userToSave = userModerToLocalHost(user);

    if(user.id){
        throw 'No implementada la actualizacion'
        return;
    }

    const updateUser =  await createUser(userToSave);
    return updateUser;
}

/**
 * 
 * @param {Like<User>} user 
 */
const createUser = async(user) =>{

    const url = `${import.meta.env.VITE_BASE_URL}/users`;
    const resp = await fetch(url,{
        method:'Post',
        body:JSON.stringify(user),
        headers:{
            'Content-Type': 'application/json'
        }
    });

    const newUser  = await resp.json();

    console.log({newUser});

    return newUser

}





import { localhostUserToModel } from '../mappers/localhost-user.mapper';
import { userModerToLocalHost } from '../mappers/user-to-localhost.mapper';
import {User} from '../models/users';


/**
 * 
 * @param {Like<User>} userLike 
 */
export const saveUser = async(userLike) =>{

    

    const user = new User(userLike);

    if(!user.firstName || !user.lastName)
    throw 'First & last name are required';
    
    const userToSave = userModerToLocalHost(user);
    let userUpdated; 
    if(user.id){
        userUpdated =  await updateUser(userToSave);
    
    }else{
        userUpdated = await createUser(userToSave);
    }

    return localhostUserToModel(userUpdated);
    
}

/**
 * 
 * @param {Like<User>} user 
 */
const createUser = async(user) =>{

    const url = `${import.meta.env.VITE_BASE_URL}/users`;
    const resp = await fetch(url,{
        method:'POST',
        body:JSON.stringify(user),
        headers:{
            'Content-Type': 'application/json'
        }
    });

    const newUser  = await resp.json();

    console.log({newUser});

    return newUser

}

/**
 * 
 * @param {Like<User>} user 
 */
 const updateUser = async(user) =>{

    const url = `${import.meta.env.VITE_BASE_URL}/users/${user.id}`;
    const resp = await fetch(url,{
        method:'PATCH',
        body:JSON.stringify(user),
        headers:{
            'Content-Type': 'application/json'
        }
    });

    const updateUser  = await resp.json();

    console.log({updateUser});

    return updateUser

}






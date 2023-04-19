/**
 * 
 * @param {String|Number} id 
 */
 export const deleteUserById = async(id) =>{

    const url = `${import.meta.env.VITE_BASE_URL}/users/${id}`;
    const resp = await fetch(url,{
        method:'DELETE'
        
    });

    const deleteResult  = await resp.json();

    console.log({deleteResult});

    return true;

}





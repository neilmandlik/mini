export async function getData(url){
    const response=await fetch(url)
    if(!response.ok){
            
    }
    const data=response.json() 
    return data
}

export async function putData(toPut,url){
    if(!toPut){
        console.log("Empty Parameter")
        return null
    }
    else{
        try{
            const put=await fetch(url,{
                method: "PUT",
                headers: {
                    "Content-Type":'application/json'
                },
                body: JSON.stringify(toPut)
            })

            const data=await put.json()
            if(!put.ok){
                throw {
                    message:"Error while Updating Data",
                    statusText:put.statusText,
                    status: put.status
                }
            }
            return data
        }
        catch(error){
            console.log(error)
            throw error                        
        }
    }
}

export async function postData(toPost,url){
    if(!toPost){
        console.log("Empty Parameter")
        return null
    }
    else{
        try{
            const post=await fetch(url,{
                method: "POST",
                headers: {
                    "Content-Type":'application/json'
                },
                body: JSON.stringify(toPost)
            })

            const data=await post.json()
            if(!post.ok){
                throw {
                    message:"Error while Updating Data",
                    statusText:post.statusText,
                    status: post.status
                }
            }
            return data
        }
        catch(error){
            console.log(error)
            throw error                        
        }
    }
}

export async function deleteData(url){
    try {
        const response = await fetch(url, {
            method: "DELETE",
            headers: {
                "Content-Type": 'application/json'
            }
        });

        if (!response.ok) {
            throw {
                message: "Error while Deleting Data",
                statusText: response.statusText,
                status: response.status
            };
        }

        return await response.json();
    } catch (error) {
        console.log(error);
        throw error;
    }
}
const STARS_API_URL = 'https://swapi.dev/api';
const STARS_WARS_API_RESOURCE=['people', 'planets','films']

const createAPI =(url,acceptedResources) => {
    return new Proxy({},{
        get:(target,prop)=>{
            return async (id,queryParams) =>{
                //console.log(prop,id,queryParams)
                if(!acceptedResources.includes(prop))
                    return Promise.reject({error:`Resource ${prop} not accepted`});
                let qs = queryParams
                    ?`?${new URLSearchParams(queryParams).toString()}`
                    :''
                const resource =`${url}/${prop}/${id}${qs}`
                console.log(resource)
                const res = await globalThis.fetch(resource)
                if(res.ok) return res.json()
                return Promise.reject({error:`Something went wrong ${resource}`});
            }
        }
    })
}

const starWarApi = createAPI(STARS_API_URL,STARS_WARS_API_RESOURCE);
const luke = await starWarApi.people(1,{page:2})
console.log(luke)
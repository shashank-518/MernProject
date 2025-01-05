import {useState , useCallback, useRef, useEffect} from 'react'

export const useHttp = ()=>{

    const [error , isError] = useState()
    const [Loading , isloading] = useState(false)

    const activeHttpRequest = useRef([])
    
    
    const sendRequest = useCallback( async ( url , method = "GET" , body = null,headers = {} )=>{
        isloading(true)
        const httpAbrot = new AbortController()
        activeHttpRequest.current.push(httpAbrot)
        
        try{
            const response = await fetch(url ,{
                method,
                body,
                headers,
                signal:httpAbrot.signal
            })
    
            const responseData = await response.json();

            activeHttpRequest.current = activeHttpRequest.current.filter(reqCtrl => reqCtrl !== httpAbrot)
    
            if(!response.ok){
                throw new Error(responseData?.message || "Something went wrong!");
            }

            isloading(false)
            return responseData;

        }catch(e){
            isError(e.message)
            isloading(false)
            throw e 
        }

        
    },[])
    
    

    const errorCancel = ()=>{
        isError(null)
    }


    useEffect(()=>{

        return ()=>{
            activeHttpRequest.current.forEach(abort => abort.abort())
        }

    }, [])


    return {Loading , error , sendRequest , errorCancel}


}
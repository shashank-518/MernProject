import React, { useEffect , useState} from "react";
import UserList from "../components/UserList";
import ErrorModal from "../../shared/components/UIElement/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElement/LoadingSpinner";

const User = () => {

  const [error , setError] = useState();
  const [isloading , setisLoading] = useState(false)
  const [LoadedData , setLoadedData] =  useState()
  
  useEffect( ()=>{

    const responsefun = async ()=>{

      setisLoading(true)
      try{

        const response = await fetch('http://localhost:5000/api/users')
        const responseData = await response.json();

        if(!response.ok){
            throw new Error(responseData.message)
        }

        setLoadedData(responseData.users)

      }catch(e){
        setError(e.message)
      }
      setisLoading(false)
    }

      responsefun();
  } , [])


  const errorhandle = ()=>{
    setError(null)
  }

  return  (

    <>
    <ErrorModal error = {error} onClear = {errorhandle} /> 
    <div className="center">
    {isloading && <LoadingSpinner overlay/>}
    </div>
    {!isloading && LoadedData && <UserList items={LoadedData} />}

    </>


  )

};

export default User;

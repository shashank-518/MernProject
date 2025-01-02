import React, { useEffect, useState } from 'react'
import PlaceList from '../components/PlaceList';
import ErrorModal from '../../shared/components/UIElement/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElement/LoadingSpinner';
import { useParams } from 'react-router-dom';
import { useHttp } from '../../shared/hooks/httphooks';

const UserPlace = () => {

  const [LoadedData , setLoadedData] = useState()

  const param = useParams().uid;

  const {Loading , error , sendRequest , errorCancel} = useHttp()
  

  useEffect(()=>{

    const fetchPlaces = async ()=>{

      try{
        
        const responseData = await sendRequest(`http://localhost:5000/api/places/user/${param}`)
        setLoadedData(responseData.places)
      }
      catch(e){
      }
    }

    fetchPlaces()

  } , [sendRequest , param])

  


  return (

    <>

    <ErrorModal error ={error} onClear = {errorCancel} />
    {Loading && <div className='center'>
      <LoadingSpinner overlay/>
    </div> }
    {
      !Loading && LoadedData && <PlaceList items = {LoadedData}  />
    }
    
    
    
    
    </>

  );
}

export default UserPlace

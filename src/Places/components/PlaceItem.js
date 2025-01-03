import React, { useState  , useContext} from "react";

import Card from "../../shared/components/UIElement/Card";
import Button from "../../shared/components/FormElements/Button";
import Modal from "../../shared/components/UIElement/Modal";
import Map from "../../shared/components/UIElement/Map.js";
import AuthContext from "../../shared/context/AuthContext.js";
import LoadingSpinner from "../../shared/components/UIElement/LoadingSpinner.js";
import ErrorModal from "../../shared/components/UIElement/ErrorModal.js";
import { useHttp } from "../../shared/hooks/httphooks.js";

import "./PlaceItem.css";

const PlaceItem = (props) => {

  const auth = useContext(AuthContext)
  const [mapHandler, setmapHander] = useState(false);

  const {Loading , error , sendRequest , errorCancel} = useHttp()

  const [showConfirmModal , setshowConfirmModal] = useState(false)

  const openMapHander = () => setmapHander(true);

  const closeMapHander = () => setmapHander(false);

  const showWarning = ()=> setshowConfirmModal(true)

  const showCancel = ()=> setshowConfirmModal(false)

  const showDeleting = async()=> {
    setshowConfirmModal(false)

    try{
      await sendRequest(`http://localhost:5000/api/places/${props.id}` , 'DELETE');
      props.onDelete(props.id)
    }
    catch(e){
      
    }
    



  }

  return (
    <>
      <Modal
        show={mapHandler}
        onCancel={closeMapHander}
        header={props.address}
        contentClass="place-item__modal-content"
        footerClass="place-item__modal-actions"
        footer={<Button onClick={closeMapHander}>Close</Button>}
      >
        <div className="map-container" >
            <Map  coordinate = {props.coordinates} />
        </div>

      </Modal>

      <Modal
      show = {showConfirmModal}
      onCancel = {showCancel}
      header = "Are You Sure?"
      footerClass = "place-item__modal-actions"
      footer ={
        <>
          <Button inverse onClick ={showCancel} >Cancel</Button>
          <Button danger onClick = {showDeleting} >Delete</Button>
        </>
      }
      
      >
        <p>Do you want to delete this place? please note that this cant be undone once delete</p>
      </Modal>


      <ErrorModal error = {error} onClear ={errorCancel} />

      <li className="place-item">
        <Card className="place-item__content">
          {Loading && <LoadingSpinner asOverlay/>}
          <div className="place-item__image">
            <img src={props.imageURL} alt={props.title} />
          </div>
          <div className="place-item__info">
            <h2>{props.title}</h2>
            <h3>{props.address}</h3>
            <p>{props.descrption}</p>
          </div>
          <div className="place-item__actions">
            <Button inverse onClick = {openMapHander}>VIEW ON MAP</Button>
            {
              auth.userId === props.creator && (<>
              <Button to={`/places/${props.id}`}>EDIT</Button>
              <Button danger onClick = {showWarning} >DELETE</Button>
              
              </>)
            }
          </div>
        </Card>
      </li>
    </>
  );
};

export default PlaceItem;

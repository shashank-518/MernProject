import React, { useState } from "react";

import Card from "../../shared/components/UIElement/Card";
import Button from "../../shared/components/FormElements/Button";
import Modal from "../../shared/components/UIElement/Modal";
import Map from "../../shared/components/UIElement/Map.js";

import "./PlaceItem.css";

const PlaceItem = (props) => {
  const [mapHandler, setmapHander] = useState(false);

  const openMapHander = () => setmapHander(true);

  const closeMapHander = () => setmapHander(false);

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

      <li className="place-item">
        <Card className="place-item__content">
          <div className="place-item__image">
            <img src={props.image} alt={props.title} />
          </div>
          <div className="place-item__info">
            <h2>{props.title}</h2>
            <h3>{props.address}</h3>
            <p>{props.descrption}</p>
          </div>
          <div className="place-item__actions">
            <Button inverse onClick = {openMapHander}>VIEW ON MAP</Button>
            <Button to={`/places/${props.id}`}>EDIT</Button>
            <Button danger>DELETE</Button>
          </div>
        </Card>
      </li>
    </>
  );
};

export default PlaceItem;

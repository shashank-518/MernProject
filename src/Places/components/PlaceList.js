import React from "react";

import "./PlaceList.css";
import Card from "../../shared/components/UIElement/Card";
import PlaceItem from "./PlaceItem";
import Button from "../../shared/components/FormElements/Button";

const PlaceList = (props) => {
  if (props.items.length === 0) {
    return (
      <div className="place_list center">
        <Card>
          <h2>No Place is Found. May Be Create One</h2>
          <Button to = "/places/new" >Share Place</Button>
        </Card>
      </div>
    );
  }

  return (
    <ul className="place-list">
      {props.items.map((place) => (
        <PlaceItem
          key={place.id}
          id={place.id}
          title={place.title}
          imageURL={place.imageURL}
          descrption={place.descrption}
          address={place.address}
          creator={place.creator}
          coordinates={place.location}
        />
      ))}
    </ul>
  );
};

export default PlaceList;

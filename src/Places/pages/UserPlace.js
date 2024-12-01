import React from 'react'
import PlaceList from '../components/PlaceList';
import { useParams } from 'react-router-dom';

const UserPlace = () => {

  const DUMMY_VALUES = [
    {
      id:'p1',
      title: 'Burj Khalifa',
      imageURL: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR8yfKNUZIfC9qe-Vz5SkVWSpPhDONel-ek-A&s',
      address: '1 Sheikh Mohammed bin Rashid Blvd - Downtown Dubai - Dubai - United Arab Emirates',
      descrption : 'The Burj Khalifa is a skyscraper in Dubai, United Arab Emirates. It is the worlds tallest structure.',
      location : {
        lat : 25.197197 ,
        long: 55.2743764,
      },
      creator : 'u1'
    },
    {
      id:'p2',
      title: 'Burj.. Khalifa',
      imageURL: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR8yfKNUZIfC9qe-Vz5SkVWSpPhDONel-ek-A&s',
      address: '1 Sheikh Mohammed bin Rashid Blvd - Downtown Dubai - Dubai - United Arab Emirates',
      descrption : 'The Burj Khalifa is a skyscraper in Dubai, United Arab Emirates. It is the worlds tallest structure.',
      location : {
        lat : 25.197197 ,
        long: 55.2743764,
      },
      creator : 'u2'
    },

  ]

  const param = useParams().uid;

  const loaded_values = DUMMY_VALUES.filter(place  => place.creator === param)


  return (
    <PlaceList items = {loaded_values}  />
  );
}

export default UserPlace

import React from "react";
import { useParams } from 'react-router-dom';
import PlaceList from "../components/PlaceList";

const DUMMY_PLACES =[
    {
        id: 'p1',
        title: 'Empire state building',
        description: 'One of the most famous skyscrapers in the world!',
        imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/b/b0/Empire_State_Building_%28HDR%29.jpg',
        address: '20 W 34th St., New York, NY 10001, USA',
        location: {
            lat: 40.7484112,
            lng:-74.0680653
        },
        creator: 'u1'
    },
    
    {
        id: 'p2',
        title: 'Emp. state building',
        description: 'One of the most famous skyscrapers in the world!',
        imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/b/b0/Empire_State_Building_%28HDR%29.jpg',
        address: '20 W 34th St., New York, NY 10001, USA',
        location: {
            lat: 40.7484112,
            lng:-74.0680653
        },
        creator: 'u2'
    }
]

const UserPlaces = () => {
    const userId = useParams().userId;
    const loadedPlaces = DUMMY_PLACES.filter(place => place.creator === userId);
    return <PlaceList items={loadedPlaces} />
};

export default UserPlaces;
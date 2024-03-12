import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import PlaceList from "../components/PlaceList";
import { useHttpClient } from "../../shared/hooks/http-hook";
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';

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

    const {isLoading, error, sendRequest, clearError} = useHttpClient();
    const [loadedPlaces, setloadedPlaces] = useState();

    const userId = useParams().userId;

    useEffect(() => {

    const fetchPlaces = async () => {           
        try{
            const responseData = await sendRequest(`http://localhost:5000/api/places/user/${userId}`); 
            setloadedPlaces(responseData.places)
            //const loadedPlaces = responseData.filter(place => place.creator === userId);          
        }catch(err){               
        }
    } ;

    fetchPlaces();
}, [sendRequest, userId]);

const placeDeleteHandler = (deletedPlaceId) => {
    setloadedPlaces(prevPlaces => prevPlaces.filter(place => place.id == deletedPlaceId))

}

   
    return <React.Fragment>
        <ErrorModal error={error} onClear={clearError} />
        {isLoading && <div className="center"><LoadingSpinner/></div> }
        {!isLoading && loadedPlaces && <PlaceList items={loadedPlaces} onDeletePlace={placeDeleteHandler} />} 
    </React.Fragment>
};

export default UserPlaces;
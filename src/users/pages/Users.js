import React, { useEffect, useState } from "react";
import UserList from "../components/UsersList";
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';

const Users = () => {
    // const USERS = [
    //     {
    //         id:'u1', 
    //         name: 'Niya K', 
    //         image: 'https://buffer.com/cdn-cgi/image/w=1000,fit=contain,q=90,f=auto/library/content/images/size/w600/2023/10/free-images.jpg',
    //         places: 3 
    //     },

    //     {
    //         id:'u2', 
    //         name: 'Oyku C', 
    //         image: 'https://images.pexels.com/photos/920382/pexels-photo-920382.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
    //         places: 2 
    //     }

    // ];

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState();
    const [loadedUsers, setLoadedUsers] = useState();

    useEffect(() => {
        const sendRequest = async () => {
            setIsLoading(true);
            try{
                const response = await fetch('http://localhost:5000/api/users');
                const responseData = await response.json();

                if(!response.ok){
                    throw new Error(responseData.message)
                }
    
                setLoadedUsers(responseData.users);
            }catch(err){
                setError(err.message);
            }
            
            setIsLoading(false);
        } ;

        sendRequest();

        console.log(loadedUsers);

    }, [])

    const errorHandler = () => {
        setError(null);
    }

    return (
        <React.Fragment>
            <ErrorModal error={error} onCancel={errorHandler} />
            {isLoading && (
                <div className="center">
                    <LoadingSpinner/>
                </div>
            )}
            {!isLoading && loadedUsers && <UserList items={loadedUsers} />}
        </React.Fragment>        
    );
   
};

export default Users;
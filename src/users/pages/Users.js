import React from "react";
import UserList from "../components/UsersList";

const Users = () => {
    const USERS = [
        {
            id:'u1', 
            name: 'Niya K', 
            image: 'https://buffer.com/cdn-cgi/image/w=1000,fit=contain,q=90,f=auto/library/content/images/size/w600/2023/10/free-images.jpg',
            places: 3 
        },

        {
            id:'u2', 
            name: 'Oyku C', 
            image: 'https://images.pexels.com/photos/920382/pexels-photo-920382.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
            places: 2 
        }

    ];
    return <UserList items={USERS} />;
};

export default Users;
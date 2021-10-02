import React from 'react';

import Avatar from './Avatar';

import styles from './styles/Avatars.module.css';
import profileIcon from '../img/profileIcon.png';

const avatars = [
    {
        name: 'Default',
        image: profileIcon,
    },
    {
        name: 'Default',
        image: profileIcon,
    },
    {
        name: 'Default',
        image: profileIcon,
    },
    {
        name: 'Default',
        image: profileIcon,
    },
];

export default function Avatars({set}) {
    return (
        <>
            <h4 className={styles.title}> Elegí tu Avatar: </h4>
            <div className={styles.avatarsContainer}>
                {
                    avatars && avatars.map(avatar => {
                        return <Avatar 
                                    name={avatar.name} 
                                    image={avatar.image} 
                                    set={set}
                                />
                    })
                }
            </div>
        </>
    );
};
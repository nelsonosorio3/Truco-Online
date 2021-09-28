import React from 'react';

import Avatar from './Avatar';

import styles from './styles/Avatars.module.css';
import profileIcon from '../img/profileIcon.png';

const avatars = [
    {
        name: 'Default',
        img: profileIcon,
    },
    {
        name: 'Default',
        img: profileIcon,
    },
    {
        name: 'Default',
        img: profileIcon,
    },
    {
        name: 'Default',
        img: profileIcon,
    },
];

export default function Avatars() {
    return (
        <>
            <h4> Choose your Avatar: </h4>
            <div className={styles.avatarsContainer}>
                {
                    avatars && avatars.map(avatar => {
                        return <Avatar name={avatar.name} img={avatar.img} />
                    })
                }
            </div>
        </>
    );
};
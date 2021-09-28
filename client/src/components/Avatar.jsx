import React from 'react';

import styles from './styles/Avatar.module.css';

export default function Avatar({name, img}) {
    return (
        <div className={styles.avatarContainer}>
            <img src={img} alt={`Imagen de Avatar ${name}.`} />
            <p>{name}</p>
        </div>
    );
};
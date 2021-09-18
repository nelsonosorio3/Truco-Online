import NavBar from './NavBar';

import style from './styles/ErrorPage.module.css';

export default function ErrorPage() {
    return (
        <>
            <NavBar />
            <div className={style.contError}>
                <h3> Esta página no existe... </h3>
            </div>
        </>
    );
};
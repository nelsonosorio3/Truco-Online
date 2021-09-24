import styles from './styles/Modal.module.css';

export default function Modal({ children, isOpen, closeModal, removeFriend, deleteButtons }) {

  const handleModalContainerClick = (e) => e.stopPropagation();
  const conditionalOpen = isOpen ? styles.isOpen : null;

  const confirmation = (flag) => {
    removeFriend(flag)
    closeModal()
  }

  return (
    <article className={styles.modal + ' ' + conditionalOpen} onClick={closeModal}>
      <div className={styles.container} onClick={handleModalContainerClick}>
        <button className={styles.close} onClick={closeModal}>
          X
        </button>
        {children}

        {
          deleteButtons === true ?
          <div>
            <p>¿estas seguro de que deseas eliminar esta amistad?</p> 
            <div className={styles.btnDiv}>
              <button className={styles.leftBtn} onClick={() => confirmation(true)}>
                Yes
              </button>
              <button className={styles.rightBtn} onClick={() => confirmation(false)}>
                No
              </button>
            </div>
           
          </div> : null
          
        }
      
      </div>
    </article>
  );
};
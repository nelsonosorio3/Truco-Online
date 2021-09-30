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
          deleteButtons === "delete" ?
          <div>
            <p>¿estas seguro de que deseas eliminar esta amistad?</p> 
            <div className={styles.btnDiv}>
              <button className={styles.leftBtn} onClick={() => confirmation(true)}>
                Si
              </button>
              <button className={styles.rightBtn} onClick={() => confirmation(false)}>
                No
              </button>
            </div>
           
          </div> 
          : deleteButtons === "success" ?
          <div className={styles.successDiv}>
              <h5>Amigo Eliminado con Exito</h5>
              <button onClick={closeModal} className={styles.successBtn}>Cerrar</button>
          </div>
          : null
          
        }
      
      </div>
    </article>
  );
};
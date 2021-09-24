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
            <p>Are you Sure you want to delete this friend?</p> 
            <button onClick={() => confirmation(true)}>
              Yes
            </button>
            <button onClick={() => confirmation(false)}>
              No
            </button>
          </div> : null
          
        }
      
      </div>
    </article>
  );
};
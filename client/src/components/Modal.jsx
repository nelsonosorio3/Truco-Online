import styles from './styles/Modal.module.css';

export default function Modal({ children, isOpen, closeModal, removeFriend, deleteButtons, friend }) {

  const handleModalContainerClick = (e) => e.stopPropagation();
  const conditionalOpen = isOpen ? styles.isOpen : null;

  // const confirmation = (flag) => {
  //   removeFriend(flag)
  //   closeModal()
  // }

  console.log(children )

  return (
    <article className={styles.modal + ' ' + conditionalOpen} onClick={closeModal}>
      <div className={styles.container} onClick={handleModalContainerClick}>
        <button className={styles.close} onClick={closeModal}>
          X
        </button>
        {children}
      </div>
    </article>
  );
};
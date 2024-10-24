import React from 'react'
import styles from "./Modal.module.css"
import { useNavigate } from 'react-router-dom'

const Modal = ({handleIsOpen, deleteNote}) => {
    const navigate = useNavigate()

    const handleDeleteNote = ()=>{
        handleIsOpen()
        deleteNote()
        navigate("/")
    }
  return (
    <div className={styles.c_modal_overlay}>
        <div className={styles.c_modal}>
            <button className={styles.close_button} onClick={handleIsOpen}>x</button>
            <div className={styles.c_modal_content}>
                <h2>Delete Note</h2>
                <p>Are you sure to delete this note?</p>
                <span className='d-flex justify-content-center'>
                    <button className={`${styles.btn} ${styles.btn_danger} me-3`} onClick={handleDeleteNote}>Delete</button>
                    <button className={`${styles.btn} ${styles.btn_primary}`} onClick={handleIsOpen}>Cancel</button>
                </span>
            </div>
        </div>
    </div>
  )
}

export default Modal
import React, { useEffect, useState } from "react";
import styles from "./NoteDetailPage.module.css"
import { BiSolidTrashAlt } from "react-icons/bi";
import { FiEdit } from "react-icons/fi";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { FormatDate } from "../components/FormatDate";
import Modal from "../components/Modal";

const NoteDetailPage = ({deleteNote}) => {
  const [isOpen, setIsOpen] = useState(false)
  const [note, setNote] = useState({});

  const { slug } = useParams();

  const handleIsOpen = () => {
    setIsOpen(!isOpen)
  }

  useEffect(() => {
    axios
      .get(`http://127.0.0.1:8000/notes/${slug}/`)
      .then((response) => {
        setNote(response.data);
      })
      .catch((error) => {
        console.log(error.message);
      });
  }, [slug]);

  return (
    <>
      <div className={styles.note_container}>
        <h3 className={styles.title}>{note.title}</h3>
        <span className="d-flex justify-content-center">
          <p className="note-date font-12 text-muted me-5">
            created: {FormatDate(note.created_at)}
          </p>
          <p className="note-date font-12 text-muted me-5">
            last updated: {FormatDate(note.updated_at)}
          </p>
        </span>
        <span className={styles.button_group}>
          <Link to={`/edit-note/${slug}`}>
            <button className={`${styles.btn} ${styles.btn_primary}`}>
              <FiEdit />
              <span>Edit</span>
            </button>
          </Link>
          <Link>
            <button onClick={handleIsOpen} className={`${styles.btn} ${styles.btn_danger}`} >
              <BiSolidTrashAlt />
              <span>Delete</span>
            </button>
          </Link>
        </span>
        <p className={styles.description}>
          {note.body}
        </p>
      </div>
      {isOpen && <Modal handleIsOpen={handleIsOpen} deleteNote={()=>deleteNote(slug)}/>}
    </>
  );
};

export default NoteDetailPage;

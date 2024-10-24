import { useEffect, useState } from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import HomePage from "./pages/HomePage";
import MainLayout from "./layouts/MainLayout";
import AddNotePage from "./pages/AddNotePage";
import NoteDetailPage from "./pages/NoteDetailPage";
import EditNotePage from "./pages/EditNotePage";

function App() {
  const [notes, setNotes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchText, setSearchText] = useState("")
  const [filterText, setFilterText] = useState("");

  const handleFilterText = (val) => {
    setFilterText(val);
  };

  const handleSearchText = (val) =>{
    setSearchText(val)
  }

  const filteredNote =
    filterText === "BUSINESS"
      ? notes.filter((note) => note.category == "BUSINESS")
      : filterText == "PERSONAL"
      ? notes.filter((note) => note.category == "PERSONAL")
      : filterText == "IMPORTANT"
      ? notes.filter((note) => note.category == "IMPORTANT")
      : notes;


  useEffect(()=>{
    if(searchText.length <3) return;
    axios.get(`http://127.0.0.1:8000/notes-search/?search=${searchText}`)
    
    .then(response=>{
      setNotes(response.data)
    })
    .catch(error=>{
      console.log(error.message)
    })
  },[searchText])

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(`http://127.0.0.1:8000/notes/`)
      .then((response) => {
        setNotes(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error.message);
      });
  }, []);

  const addNote = (data) => {
    axios
      .post("http://127.0.0.1:8000/notes/", data)
      .then((response) => {
        setNotes([...notes, data]);
        toast.success("A new note has been added!");
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  const updateNote = (data, slug) => {
    axios
      .put(`http://127.0.0.1:8000/notes/${slug}/`, data)
      .then((response) => {
        toast.success("Note updated successfully!");
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  const deleteNote = (slug) => {
    axios
      .delete(`http://127.0.0.1:8000/notes/${slug}/`)
      .then((response) => {
        setNotes([...notes]);
        toast.success("Note deleted successfully!");
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<MainLayout searchText={searchText} handleSearchText={handleSearchText} />}>
        <Route
          index
          element={
            <HomePage
              notes={filteredNote}
              isLoading={isLoading}
              handleFilterText={handleFilterText}
            />
          }
        />
        <Route path="/add-note" element={<AddNotePage addNote={addNote} />} />
        <Route
          path="/edit-note/:slug"
          element={<EditNotePage updateNote={updateNote} />}
        />
        <Route
          path="/note/:slug"
          element={<NoteDetailPage deleteNote={deleteNote} />}
        />
      </Route>
    )
  );
  return <RouterProvider router={router} />;
}

export default App;

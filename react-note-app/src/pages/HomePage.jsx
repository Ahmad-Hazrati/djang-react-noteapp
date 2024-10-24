import React from "react";
import Filter from "../components/Filter";
import NoteCardContainer from "../components/NoteCardContainer";

const HomePage = ({ notes, isLoading, handleFilterText }) => {
  return (
    <>
      {notes.length < 1 ? <h4 style={{textAlign: "center", marginTop:"20px"}}>No result found for the typed keyword! Please, try again with a different keyword.</h4> : <Filter handleFilterText={handleFilterText} />}
      <NoteCardContainer notes={notes} isLoading={isLoading} />
    </>
  );
};

export default HomePage;

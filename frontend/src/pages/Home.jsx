import { useEffect, useState } from "react";
import api from "../api";
import Note from "../components/Note";
import "../styles/Home.css"

const Home = () => {
  const [notes, setNotes] = useState([]);
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");

  useEffect(() => {
    getNotes();
  }, []);

  const getNotes = async () => {
    try {
      const { data } = await api.get("/api/notes/");
      setNotes(data);
      console.log(data);
    } catch (error) {
      alert(error);
    }
  };
  //   const getNotes = () => {
  //     api
  //       .get("/api/notes/")
  //       .then((res) => res.data)
  //       .then((data) => {setNotes(data);console.log(data)})
  //       .catch((err) => alert(err));
  //   };

  const deleteNote = async (id) => {
    try {
      const { status } = await api.delete(`/api/notes/delete/${id}/`);
      if (status === 204) alert("Note deleted!");
      else alert("Failed to delete note.");
      getNotes();
    } catch (error) {
      alert(error);
    }
  };
  //   const deleteNote = (id) => {
  //     api
  //       .delete(`/api/notes/delete/${id}/`)
  //       .then((res) => {
  //         if (res.status === 204) alert("Note deleted!");
  //         else alert("Failed to delete note.");
  //       })
  //       .catch((error) => alert(error));
  //     getNotes();
  //   };

  const createNote = async (e) => {
    e.preventDefault();
    try {
      const { status } = await api.post("/api/notes/", { content, title });
      if (status === 201) alert("Note created!");
      else alert("Failed to make note.");
      setContent("")
      setTitle("")
      getNotes();
    } catch (error) {
      alert(error);
    }
  };
  //   const createNote = (e) => {
  //     e.preventDefault();
  //     api
  //       .post("/api/notes/", { content, title })
  //       .then((res) => {
  //         if (res.status === 201) alert("Note created!");
  //         else alert("Failed to make note.");
  //       })
  //       .catch((error) => alert(error));
  //     getNotes();
  //   };

  return (
    <div>
      <div>
        <h2>Notes</h2>
        {notes.map((note)=><Note key={note.id} note={note} onDelete={deleteNote} />)}
      </div>
      <div>
        <h2>Create a Note</h2>
        <form onSubmit={createNote}>
          <label htmlFor="title">Title:</label>
          <br />
          <input
            type="text"
            id="title"
            name="title"
            required
            onChange={(e) => setTitle(e.target.value)}
            value={title}
          />
          <label htmlFor="content">Content:</label>
          <br />
          <textarea
            id="content"
            name="content"
            required
            onChange={(e) => setContent(e.target.value)}
            value={content}
          />
          <br />
          <input type="submit" value="Submit" />
        </form>
      </div>
    </div>
  );
};

export default Home;

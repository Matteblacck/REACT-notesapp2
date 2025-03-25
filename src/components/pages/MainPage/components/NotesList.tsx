import styled from "styled-components";
import Input from "../../../widgets/Input";
import Button from "../../../widgets/Button";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Modal from "../../../widgets/ModalConfirm";
import Tags from "../../../widgets/Tags/Tags";

//Styled
const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh; /* Вся высота экрана */
  overflow: hidden; /* Запрещаем прокрутку всей страницы */
  /* border-right: 1px solid gray;
  border-left: 1px solid gray;
  border-top: 1px solid gray; */
`;
const FunctionalBar = styled.div`
  width: 100%;
`;
const AddBar = styled.div`
  width: 100%;
  padding-left: 10px;
  display: flex;
  gap: 10px;
  align-items: center;
`;
const Divider = styled.div`
  width: 100%; /* Половина ширины */
  border-bottom: 1px solid gray; /* Это будет линия */
  margin: 10px;
`;
const NotesWrapper = styled.div`
  flex: 1; /* Занимает всю оставшуюся высоту */
  overflow-y: auto; /* Только здесь скроллим */
  display: flex;
  flex-direction: column; /* Элементы будут располагаться вертикально */
  padding: 10px;
`;
export const Note = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  width: 100%;
  position: relative;

  button {
    opacity: 0;
    transform: translateX(10px);
    transition: opacity 0.2s ease, transform 0.2s ease;
  }

  &:hover {
    transform: translateX(6px);
    box-shadow: 2px 2px 10px rgba(255, 255, 255, 0.1);
    border-left: 2px solid gray;

    /* Показываем кнопку при наведении */
    button {
      opacity: 1;
      transform: translateX(0);
    }
  }
`;
export const StyledLink = styled(Link)`
  text-decoration: none;
  color: inherit;
  outline: none; /* Убираем стандартное выделение */
  caret-color: gray;
`;
//Styled^

export interface INote {
  id: string;
  title: string;
  date: string;
  content?: string;
  tags?: string[];
}
const tags = [
  { name: "Work", color: "#FFD966" }, // светло-желтый
  { name: "Studies", color: "#F28D8C" }, // мягкий красный
  { name: "Project", color: "#A3C1D1" }, // бледно-голубой
  { name: "Family", color: "#8EC9A1" }, // мягкий зеленый
  { name: "Home", color: "#F4A261" }, // теплый оранжевый
];

// Компонент
export default function NotesList() {
  const [notes, setNotes] = useState<INote[]>(() => {
    const savedNotes = localStorage.getItem("notes");
    return savedNotes ? JSON.parse(savedNotes) : [];
  });
  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);
  const [newNoteTitle, setNewNoteTitle] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [noteToDeleteID, setNoteToDeleteID] = useState("");
  const [neededNote, setNeededNote] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  //funcs
  const handleAdd = () => {
    if (!newNoteTitle) {
      alert("Enter the name");
    } else {
      const currentDate = new Date().toLocaleString("en-GB", {
        day: "numeric", // число месяца
        month: "short", // короткий месяц
      });

      const newNote: INote = {
        id: String(notes.length + 1),
        title: newNoteTitle,
        date: currentDate,
        tags: selectedTags,
      };
      setNotes((prevNotes) => [newNote, ...prevNotes]);
      setNewNoteTitle("");
      setSelectedTags([]);
    }
  };
  const handleDelete = (note: INote) => {
    setNoteToDeleteID(note.id);
    setIsModalOpen(true);
  };
  const confirmDelete = () => {
    setNotes((prevNotes) => prevNotes.filter((n) => n.id !== noteToDeleteID));
    setIsModalOpen(false);
  };
  const cancelDelete = () => {
    setIsModalOpen(false);
  };
  const handleTagSelection = (tag: string) => {
    setSelectedTags((prevSelectedTags) => {
      // Если тег уже выбран, то удаляем его из списка
      if (prevSelectedTags.includes(tag)) {
        return prevSelectedTags.filter((t) => t !== tag);
      }
      // Если тег не выбран, добавляем его в список выбранных
      return [...prevSelectedTags, tag];
    });
  };
  //funcs^

  return (
    <Container>
      <div>
        <h1 style={{ padding: "10px", color: "gray" }}>All notes</h1>
      </div>
      <FunctionalBar className="pb-2">
        <AddBar>
          <Input
            style={{ width: "50%" }}
            value={newNoteTitle}
            onChange={(e) => setNewNoteTitle(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleAdd();
              }
            }}
            type="text"
            placeholder="Enter the name..."
          />

          <Button onClick={handleAdd}>Add</Button>
        </AddBar>
        <div
          className="d-flex align-items-center gap-2"
          style={{ color: "gray", paddingTop: "10px", paddingLeft: "10px" }}
        >
          <div>
            <h3>Tags:</h3>
          </div>
          <Tags selectedTags={selectedTags} onToggleAdd={handleTagSelection} />
        </div>
      </FunctionalBar>
      <Divider />
      <NotesWrapper>
        <div className="mb-5">
          <div
            style={{
              position: "fixed",
              backgroundColor: "black",
              marginBottom: "20px",
            }}
          >
            <Input
              style={{ position: "relative" }}
              placeholder="Search..."
              onChange={(e) => setNeededNote(e.target.value)}
            />
          </div>
        </div>
        {notes
          .filter((note) =>
            note.title.toLowerCase().includes(neededNote.toLowerCase())
          )
          .map((note) => (
            <StyledLink to={`/note/${note.id}`} key={note.id}>
              <Note>
                <div>
                  <div>
                    <h3 style={{ fontSize: "20px" }}>{note.title}</h3>
                    <p>{note.date}</p>
                  </div>

                  {note.tags && (
                    <div className="d-flex align-items-center">
                      {note.tags.map((tagName, index) => {
                        // Найдем цвет для тега по его имени
                        const tag = tags.find((t) => t.name === tagName);
                        
                        return tag ? (
                          
                          
                          <div
                            className="pe-1"
                            key={index}
                            style={{
                              padding: "5px",
                              borderRadius: "15px",
                              color: tag.color, // Цвет текста контрастирует с фоном
                            }}
                          >
                            <span style={{color:'gray'}}>
                            #
                            </span>
                            {tag.name}
                          </div>
                        ) : null;
                      })}
                    </div>
                  )}
                </div>
                <div>
                  <Button
                    onClick={(e) => {
                      e.preventDefault();
                      handleDelete(note);
                    }}
                  >
                    Delete
                  </Button>
                </div>
              </Note>
            </StyledLink>
          ))}
      </NotesWrapper>
      {isModalOpen && (
        <Modal onConfirm={confirmDelete} onCancel={cancelDelete} />
      )}
    </Container>
  );
}

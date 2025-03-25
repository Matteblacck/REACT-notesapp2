import styled from "styled-components";
import { useParams, Link } from "react-router-dom";
import { INote } from "../MainPage/components/NotesList";
import { useState, useEffect } from "react";
import Button from "../../widgets/Button";
import HoverNotesMenu from '../../widgets/HoverNotesMenu';

// Стили для контейнера страницы
const PageWrapper = styled.div`
  display: flex;
`;

// Стили для основного контейнера с контентом
const Container = styled.div`
  flex: 1; /* Занимает оставшееся пространство */
  padding: 1rem 1rem 1rem 1rem;
  overflow-y: auto; /* Добавляем прокрутку, если контент слишком длинный */
`;

// Стили для текстового поля
const StyledTextArea = styled.textarea`
  all: unset;  /* Убирает все стандартные стили */
  width: 100%;
  height: calc(100vh - 150px); /* Высота с учетом отступов */
  background-color: transparent;
  padding: 0;  /* Убирает стандартные отступы */
  border: none; /* Убирает стандартную рамку */
  outline: none; /* Убирает обводку при фокусе */
  resize: none; /* Отключает изменение размера */
  padding-top: 10px;
`;

// Стили для панели функций
const FunctionBar = styled.div`
  padding: 10px;
`;

// Стили для ссылки
const StyledLink = styled(Link)`
  text-decoration: none;
  color: inherit;
  outline: none; /* Убираем стандартное выделение */
  caret-color: gray;
`;

// Стили для кнопки
const StyledButton = styled(Button)`
  border: none;
  &:hover {
    background-color: transparent;
    color: white;
  }
`;
const HeaderContainer = styled.div`
    border-bottom: 1px solid gray;
`
// Иконка стрелки влево
const ArrowLeftIcon = () => (
  <svg
    width="40px"
    height="40px"
    viewBox="0 0 512 512"
    fill="white"
    xmlns="http://www.w3.org/2000/svg"
  >
    <polygon points="352,128.4 319.7,96 160,256 319.7,416 352,383.6 224.7,256" />
  </svg>
);

export default function NotePage() {
  const { id } = useParams(); 
  const [content, setContent] = useState("");

  const notes: INote[] = JSON.parse(localStorage.getItem("notes") || "[]");
  
  let note = notes.find((n: INote) => n.id === id);

  if (!note) {
    return <h1>Note is not found</h1>;
  }

  // Обновление контента заметки
  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const updatedContent = e.target.value;
    setContent(updatedContent);

    note.content = updatedContent;

    const updatedNotes = notes.map((n) =>
      n.id === id ? { ...n, content: updatedContent } : n
    );
    localStorage.setItem("notes", JSON.stringify(updatedNotes));
  };

  // Устанавливаем контент заметки в state при первоначальной загрузке
  useEffect(() => {
    if (note) {
      setContent(note.content || ""); // Инициализируем контент в textarea
    }
  }, [note]);

  return (
    <PageWrapper>
      {/* Меню с заметками */}
      <HoverNotesMenu notes={notes} />
      
      {/* Основной контент страницы */}
      
      <Container className='container'>
        <HeaderContainer className="pt-1 pb-2 d-flex align-items-center">
            <div>
                <StyledLink to="/">
                    <StyledButton style={{ color: 'gray', borderColor:'transparent' }}>
                    <ArrowLeftIcon />
                    </StyledButton>
                </StyledLink>
            </div>
            <div>
                <FunctionBar>
                    <h1 style={{ fontSize: "25px" }}>{note.title}</h1>
                </FunctionBar>
            </div>
            
        </HeaderContainer>
        <div className="pt-2">
          
          <StyledTextArea
            value={content}
            onChange={handleContentChange}
            placeholder="Enter note"
          ></StyledTextArea>
        </div>
      </Container>
    </PageWrapper>
  );
}
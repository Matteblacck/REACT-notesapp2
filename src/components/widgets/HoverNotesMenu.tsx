import styled from "styled-components";
import { useState } from "react";
import { StyledLink } from "../pages/MainPage/components/NotesList";
import { INote } from '../pages/MainPage/components/NotesList';

// Стили для контейнера меню
const MenuWrapper = styled.div`
  position: relative;
  height: 100vh; /* Меню занимает всю высоту экрана */
  width: 20px; /* Ширина области активации */
  z-index: 1000; /* Убедитесь, что меню находится поверх других элементов */
`;

// Стили для самого меню
const Menu = styled.div`
  position: fixed; /* Меню фиксировано */
  top: 0;
  left: -300px; /* Начальная позиция меню скрыта слева */
  width: 300px;
  height: 100vh; /* Меню занимает всю высоту экрана */
  background-color: #0c0c0c;
  color: #fff;
  transition: left 0.3s ease;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  border-right: 1px solid gray;

  /* Пункт меню */
  div {
    padding: 7px;
    cursor: pointer;
  }

  /* Когда меню активно, оно выдвигается */
  &.open {
    left: 0;
  }
`;

// Стили для области активации меню
const MenuTriggerArea = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 20px; /* Ширина области, которая активирует меню при наведении */
  height: 100%;
  background-color: transparent;
  z-index: 1;
`;

// Стили для каждой заметки в меню
const Note = styled.div`
  align-items: start;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  width: 100%;
  display: flex;
  justify-content: space-between; /* Для выравнивания заголовка и кнопки */
  flex-direction: column; /* Располагаем текст и кнопку вертикально */

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

// Стили для заголовка "Other notes"
const OtherNotesHeader = styled.div`
  padding: 15px;

  color: gray;
  font-size: 18px;
`;

type HoverNotesMenuProps = {
  notes: INote[];
  tags?: string[];
};
const tags = [
    { name: 'Work', color: '#FFD966' },  // светло-желтый
    { name: 'Studies', color: '#F28D8C' },  // мягкий красный
    { name: 'Project', color: '#A3C1D1' },  // бледно-голубой
    { name: 'Family', color: '#8EC9A1' },  // мягкий зеленый
    { name: 'Home', color: '#F4A261' }  // теплый оранжевый
  ];

export default function HoverNotesMenu({ notes}: HoverNotesMenuProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Функция для закрытия меню при клике на ссылку
  const handleLinkClick = () => {
    setIsMenuOpen(false);
  };

  return (
    <MenuWrapper>
        <MenuTriggerArea onMouseEnter={() => setIsMenuOpen(true)} />
        <Menu
        className={isMenuOpen ? "open" : ""}
        onMouseLeave={() => setIsMenuOpen(false)}
        >
            {/* Заголовок "Other notes" */}
            <OtherNotesHeader>
                <h3>Other notes:</h3>
            </OtherNotesHeader>

            {notes.map((n) => (
                <StyledLink to={`/note/${n.id}`} key={n.id} onClick={handleLinkClick}>
                <Note>
                    <div>
                        <h4 style={{fontSize:'20px'}}>{n.title}</h4>
                        <p>{n.date}</p>
                    </div>
                    <div>
                    {n.tags?.map((tag, index) => {
                    // Находим тег по его имени и извлекаем цвет
                    const tagObj = tags.find(t => t.name === tag);
                    return tagObj ? (
                        <h6 key={index} style={{ color: tagObj.color }}>{tag}</h6>
                    ) : null;
                    })}
                    </div>
                </Note>
                </StyledLink>
            ))}
        </Menu>
    </MenuWrapper>
  );
}
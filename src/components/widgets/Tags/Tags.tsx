import styled from 'styled-components';
import Button from '../Button';
import { FC } from 'react';

//styled
const TagsContainer = styled.div`
  display: flex;
  gap: 7px;
`;
//styled^

type Tag = {
  name: string;
  color: string;
};
type SelectedTagsProps = {
  selectedTags: string[];
  onToggleAdd: (tag: string) => void;
};

const tags: Tag[] = [
  { name: 'Work', color: '#FFD966' },  // светло-желтый
  { name: 'Studies', color: '#F28D8C' },  // мягкий красный
  { name: 'Project', color: '#A3C1D1' },  // бледно-голубой
  { name: 'Family', color: '#8EC9A1' },  // мягкий зеленый
  { name: 'Home', color: '#F4A261' }  // теплый оранжевый
];

const Tags: FC<SelectedTagsProps> = ({ selectedTags, onToggleAdd }) => {
  return (
    <TagsContainer>
      {tags.map((tag, index) => (
        <Button
          key={index} // Уникальный ключ
          id={`tag-${tag.name.toLowerCase()}-${index}`} // Уникальный id на основе имени и индекса
          style={{
            color: `${tag.color}`,
            border: `1px solid ${tag.color}`,
            padding: '5px 10px',
            borderRadius: '15px',
            backgroundColor: selectedTags.includes(tag.name) 
              ? `${tag.color}80`  // Полупрозрачный фон для выбранного тега
              : 'transparent',
            transition: 'background-color 0.3s, box-shadow 0.3s', // Плавный переход
          }}
          onClick={() => onToggleAdd(tag.name)}
        >
          {tag.name}
        </Button>
      ))}
    </TagsContainer>
  );
};

export default Tags;
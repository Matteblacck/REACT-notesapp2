import styled from "styled-components"
import { useTheme } from "./Theme/ThemeContext";

const Iinput = styled.input`
    background-color: ${(props) => props.theme.inputBackground};
    border: 1px solid gray;
    border-radius: 5px;
    height: 35px;
    padding: 8px 12px;
    width:100%;
    outline: none; /* Убираем стандартное выделение */
    caret-color: gray;
    color:white;
    
`
export default function Input(props: React.InputHTMLAttributes<HTMLInputElement>){
    const { theme } = useTheme(); // Получаем текущую тему
    return(
        <Iinput
        theme={theme}
        {...props}
        />
    )
}
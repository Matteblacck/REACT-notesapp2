import styled from "styled-components";
import { useTheme } from "./ThemeContext";

const ToggleButton = styled.button`
  width: 50px;
  height: 25px;
  background: ${(props) => props.theme.toggleBg};
  border: none;
  border-radius: 15px;
  position: relative;
  cursor: pointer;
  transition: background 0.3s ease-in-out;

  &::after {
    content: "";
    position: absolute;
    width: 20px;
    height: 20px;
    background: ${(props) => props.theme.toggleCircle};
    border-radius: 50%;
    top: 50%;
    left: ${(props) => props.theme.circlePosition};
    transform: translateY(-50%);
    transition: left 0.3s ease-in-out, background 0.3s ease-in-out;
  }
`;

export default function ThemeToggler() {
  const { toggleTheme } = useTheme();

  return <ToggleButton onClick={toggleTheme} />;
}
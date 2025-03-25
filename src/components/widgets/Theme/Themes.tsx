// theme.ts


export interface ThemeType {
    buttonText: string;
    buttonBorder: string;
    buttonHover: string;
    buttonActive: string;
    toggleBg: string,  // фон кнопки
    toggleCircle: string,  // цвет круга
    circlePosition: string,  // начальная позиция круга
    inputBackground: string;

}

export const lightTheme: ThemeType = {

    buttonText: "black",
    buttonBorder: 'gray',
    buttonHover: "rgba(0, 0, 0, 0.1)",
    buttonActive: "rgba(0, 0, 0, 0.2)",
    toggleBg: "#ccc",  // фон кнопки
    toggleCircle: "#fff",  // цвет круга
    circlePosition: "26px",  // начальная позиция круга
    inputBackground: 'white'
  };
  
export const darkTheme: ThemeType = {
    buttonText: "#fff",
    buttonBorder: "gray",
    buttonHover: "rgba(255, 255, 255, 0.1)",
    buttonActive: "rgba(255, 255, 255, 0.2)",
    toggleBg: "#555",  // фон кнопки для темной темы
    toggleCircle: "#fff",  // цвет круга для темной темы
    circlePosition: "3px",  // позиция круга для темной темы
    inputBackground: 'black'
  };
// Здесь мы расширяем тип DefaultTheme для использования в styled-components
declare module "styled-components" {
  export interface DefaultTheme extends ThemeType {}
}
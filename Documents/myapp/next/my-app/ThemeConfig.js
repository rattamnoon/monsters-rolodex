import { createGlobalStyle } from "styled-components";

export const lightTheme = {
  body: "#f5f5f4",
  text: "#0f172a",
};

export const darkTheme = {
  body: "#0f172a",
  text: "#f8fafc",
};

export const GlobalStyles = createGlobalStyle`
  body {
    background: ${({ theme }) => theme.body};
    color: ${({ theme }) => theme.text};
    font-family: Tahoma, Helvetica, Arial, Roboto, sans-serif;
    transition: all 0.50s linear;
  }
`;

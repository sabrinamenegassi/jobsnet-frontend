import { createGlobalStyle } from 'styled-components'

export default createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;

    &::before,
    &::after {
      box-sizing: inherit;
    }
  }

  *:focus {
    outline: none;
  }

  body {
    font-family: 'Work Sans', sans-serif;
    font-size: 14px;
  }

  h1 {
    font-size: 40px;
  }

  h2 {
    font-size: 32px;
  }

  h3 {
    font-size: 24px;
  }

  h1, h2, h3 {
    font-family: 'Barlow', sans-serif;
    font-weight: 700;
  }

  button {
    cursor: pointer;
  }
`

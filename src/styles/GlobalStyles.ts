import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';
const globalStyles = createGlobalStyle`
${reset}
* {
    box-sizing: border-box;
}
body{
    background-color: #ffffff;
    font-family: 'Noto Sans CJK KR', sans-serif;
    font-size: 14px;
    letter-spacing: -0.05em;
    color: rgb(29, 29, 31);
}
a {
    color: inherit;
    text-decoration: none;
}
input, button {
    font-family:'Noto Sans CJK KR', sans-serif;
    background-color: transparent;
    border: none;
    outline: none;
}
input[type='checkbox'] {
    margin : 0px;
}
h1, h2, h3, h4, h5, h6{
    font-family:'Noto Sans CJK KR', sans-serif;
}
ol, ul, li {
    list-style: none;
}
img {
    width: 100%;
    height: 100%;
}
button {
    cursor: pointer;
}
textarea {
    font-family:'Noto Sans CJK KR', sans-serif;
}
`;
export default globalStyles;

import styled, { keyframes, css } from 'styled-components';

export const Form = styled.form`
  margin-top: 30px;
  display: flex;
  input {
    flex: 1;
    background-color: #0b0c10;
    color: #66fcf1;
    border: ${props => (props.error ? '1px solid #ff6b6b' : '0')};
    padding: 10px 15px;
    border-radius: 4px;
    font-size: 16px;
  }
`;
const rotate = keyframes`
from{
  transform: rotate(0deg)
}
to{
  transform: rotate(360deg)
}`;
export const SubmitButton = styled.button.attrs(props => ({
  type: 'submit',
  disabled: props.loading,
}))`
  background-color: #1f2833;
  border: 0;
  padding: 0 15px;
  margin-left: 10px;
  border-radius: 4px;
  color: #66fcf1;
  display: flex;
  justify-content: center;
  align-items: center;
  &[disabled] {
    cursor: not-allowed;
    opacity: 0.6;
  }
  ${props =>
    props.loading &&
    css`
      svg {
        animation: ${rotate} 2s linear infinite;
      }
    `}
`;

export const List = styled.ul`
  list-style: none;
  margin-top: 30px;
  li {
    padding: 15px 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    button {
      padding: 0;
      border: none;
      background: none;
    }
    & + li {
      border-top: 1px solid #666;
    }
    a {
      color: #0b0c10;
      text-decoration: none;
    }
  }
`;

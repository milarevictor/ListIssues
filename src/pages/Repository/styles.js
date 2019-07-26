import styled, { keyframes, css } from 'styled-components';

const rotate = keyframes`
from{
  transform: rotate(0deg)
}
to{
  transform: rotate(360deg)
}`;

export const Loading = styled.div`
  background-color: rgba(255, 255, 255, 0.1);
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  ${props =>
    props.loading &&
    css`
      svg {
        width: 500px;
        color: #fff;
        animation: ${rotate} 2s linear infinite;
      }
    `};
`;

export const Owner = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  a {
    text-decoration: none;
    color: #0b0c10;
    font-size: 16px;
  }
  img {
    width: 120px;
    border-radius: 50%;
    margin-top: 20px;
  }
  h1 {
    font-size: 24px;
    margin-top: 10px;
  }
  p {
    margin-top: 5px;
    font-size: 14px;
    color: #666;
    line-height: 1.4;
    text-align: center;
    max-width: 400px;
  }
`;

export const IssueList = styled.ul`
  list-style: none;
  padding-top: 30px;
  margin-top: 30px;
  border-top: 1px solid #666;
  li {
    display: flex;
    padding: 15px 10px;
    -webkit-box-shadow: 0px 0px 18px -6px rgba(0, 0, 0, 0.71);
    box-shadow: 0px 0px 18px -6px rgba(0, 0, 0, 0.71);
    border-radius: 4px;

    & + li {
      margin-top: 10px;
    }
    img {
      width: 36px;
      height: 36px;
      border: 2px solid #eee;
      border-radius: 50%;
    }
    div {
      flex: 1;
      margin-left: 15px;
      strong {
        font-size: 16px;
        width: 100%;
        a {
          text-decoration: none;
          color: #333;
          &:hover {
            color: #0b0c10;
          }
        }
        span {
          background-color: #0b0c10;
          color: #66fcf1;
          font-size: 12px;
          font-weight: 600;
          height: 20px;
          padding: 3px 4px;
          margin-left: 10px;
        }
      }
      p {
        margin-top: 5px;
        font-size: 12px;
        color: #666;
      }
    }
  }
`;
export const IssueFilter = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;

  p {
    font-size: 14px;
    margin-right: 10px;
    font-weight: bold;
  }
`;
export const FilterButton = styled.button.attrs(props => ({
  type: 'button',
  disabled: Boolean(props.disabled),
  active: props.active,
}))`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2px 3px;
  width: 80px;
  height: 30px;
  margin-right: 10px;
  border: 0;
  border-radius: 4px;
  &[disabled] {
    cursor: not-allowed;
    opacity: 0.6;
  }
`;

export const Footer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding-top: 20px;
  strong {
    margin: 0;
    padding-right: 10px;
    font-size: 16px;
  }
`;

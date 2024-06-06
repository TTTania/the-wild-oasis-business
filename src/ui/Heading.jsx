import styled, { css } from "styled-components";

const Heading = styled.h1`
  display: flex;
  align-items: center;
  gap: 0.8rem;

  ${(props) =>
    props.as === "h1" &&
    css`
      font-size: 3 rem;
      font-weight: 600;
    `}

  ${(props) =>
    props.as === "h2" &&
    css`
      font-size: 2 rem;
      font-weight: 500;
    `}

    ${(props) =>
    props.as === "h3" &&
    css`
      font-size: 2 rem;
      font-weight: 300;
    `}

    ${(props) =>
    props.as === "h4" &&
    css`
      font-size: 3 rem;
      font-weight: 600;
      text-align: center;
    `}

  line-height:1.4;
`;

export default Heading;

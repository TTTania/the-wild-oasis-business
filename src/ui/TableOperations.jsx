import styled from "styled-components";
import { screenSizes } from "../utils/constants";

const TableOperations = styled.div`
  display: flex;
  align-items: center;
  gap: 1.6rem;

  @media (max-width: ${screenSizes.tablet}) {
    flex-direction: column;
    gap: 0.8rem;
    width: 10rem;
  }
`;

export default TableOperations;

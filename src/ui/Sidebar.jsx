import styled from "styled-components";
import Logo from "./Logo";
import MainNav from "./MainNav";
// import Uploader from "../data/Uploader";
import { screenSizes } from "../utils/constants";

const StyledSidebar = styled.aside`
  background-color: var(--color-grey-0);
  padding: 3.2rem 2.4rem;
  border-right: 1px solid var(--color-grey-100);

  display: grid;
  width: 26rem;
  grid-template-rows: auto 1fr;
  grid-template-columns: 1fr;
  /* grid-row: 1/-1;
  display: flex;
  */
  flex-direction: column;
  gap: 3.2rem;
  z-index: 100;

  @media (max-width: ${screenSizes.laptop}) {
    position: fixed;
    bottom: 0;
    width: 100%;
    float: left;
    padding: 0.4rem;
    gap: 0.4rem;
  }
`;

function Sidebar() {
  return (
    <StyledSidebar>
      <Logo />
      <MainNav />
      {/* <Uploader /> */}
    </StyledSidebar>
  );
}

export default Sidebar;

import { NavLink } from "react-router-dom";
import styled from "styled-components";
import {
  HiOutlineCalendarDays,
  HiOutlineCog6Tooth,
  HiOutlineHome,
  HiOutlineHomeModern,
  HiOutlineUserGroup,
  HiOutlineUsers,
} from "react-icons/hi2";
import { screenSizes } from "../utils/constants";

const NavList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;

  @media (max-width: ${screenSizes.laptop}) {
    flex-direction: row;
    justify-content: space-between;
  }
`;

const StyledNavLink = styled(NavLink)`
  &:link,
  &:visited {
    display: flex;
    gap: 1.2rem;

    color: var(--color-grey-600);
    font-size: 1.6rem;
    font-weight: 500;
    padding: 1.2rem 2.4rem;
    transition: all 0.3s;

    @media (max-width: ${screenSizes.laptop}) {
      padding: 0.6rem;
    }
    @media (max-width: ${screenSizes.mobile}) {
      padding: 0;
    }
  }

  /* This works because react-router places the active class on the active NavLink */
  &:hover,
  &:active,
  &.active:link,
  &.active:visited {
    color: var(--color-grey-800);
    background-color: var(--color-grey-50);
    border-radius: var(--border-radius-sm);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    color: var(--color-grey-400);
    transition: all 0.3s;
  }

  &:hover svg,
  &:active svg,
  &.active:link svg,
  &.active:visited svg {
    color: var(--color-brand-600);
  }
`;

const StyledSpan = styled.span`
  @media (max-width: ${screenSizes.tablet}) {
    display: none;
  }
`;

const StyledLi = styled.li`
  @media (max-width: ${screenSizes.laptop}) {
    padding: 1.2rem 1rem;
  }
`;

function MainNav() {
  return (
    <div>
      <NavList>
        <StyledLi>
          <StyledNavLink to="/dashboard">
            <HiOutlineHome />
            <StyledSpan>Home</StyledSpan>
          </StyledNavLink>
        </StyledLi>
        <StyledLi>
          <StyledNavLink to="/bookings">
            <HiOutlineCalendarDays />
            <StyledSpan>Bookings</StyledSpan>
          </StyledNavLink>
        </StyledLi>
        <StyledLi>
          <StyledNavLink to="/cabins">
            <HiOutlineHomeModern />
            <StyledSpan>Cabins</StyledSpan>
          </StyledNavLink>
        </StyledLi>
        <StyledLi>
          <StyledNavLink to="/guests">
            <HiOutlineUserGroup />
            <StyledSpan>Guests</StyledSpan>
          </StyledNavLink>
        </StyledLi>
        <StyledLi>
          <StyledNavLink to="/users">
            <HiOutlineUsers />
            <StyledSpan>Users</StyledSpan>
          </StyledNavLink>
        </StyledLi>
        <StyledLi>
          <StyledNavLink to="/settings">
            <HiOutlineCog6Tooth />
            <StyledSpan>Settings</StyledSpan>
          </StyledNavLink>
        </StyledLi>
      </NavList>
    </div>
  );
}

export default MainNav;

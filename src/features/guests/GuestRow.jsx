import styled from "styled-components";
import Table from "../../ui/Table";
import Modal from "../../ui/Modal";
import Menus from "../../ui/Menus";
import { HiPencil, HiTrash } from "react-icons/hi2";
import { Flag } from "../../ui/Flag";
import ConfirmDelete from "../../ui/ConfirmDelete";
import CreateGuestForm from "./CreateGuestForm";
import { useDeleteGuest } from "./useDeleteGuest";

const Guest = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const Stacked = styled.div`
  & span:first-child {
    font-weight: 500;
    }
  }
  & span:last-child {
    color: var(--color-grey-500);
  }
`;

const Number = styled.div`
  font-family: "Sono";
  font-weight: 500;
`;

function GuestRow({ guest }) {
  const { deleteGuest, isDeleting } = useDeleteGuest();

  const {
    id: guestId,
    fullName,
    email,
    nationality,
    nationalID,
    countryFlag,
  } = guest;

  return (
    <>
      <Table.Row>
        <Guest>{guestId}</Guest>

        <Stacked>
          <span>{fullName}</span>
        </Stacked>

        <Stacked>
          <span>{email}</span>
        </Stacked>

        <Number>
          <span>{nationalID}</span>
        </Number>

        <Stacked>
          <span>{nationality}</span>
        </Stacked>

        <Stacked>
          {countryFlag && (
            <Flag src={countryFlag} alt={`Flag of ${nationality}`} />
          )}
        </Stacked>
        <div>
          <Modal>
            <Menus.Menu>
              <Menus.Toggle id={guestId} />
              <Menus.List id={guestId}>
                <Modal.Open opens="edit-guest">
                  <Menus.Button icon={<HiPencil />}>Edit</Menus.Button>
                </Modal.Open>
                <Modal.Open opens="delete">
                  <Menus.Button icon={<HiTrash />}>Delete</Menus.Button>
                </Modal.Open>
              </Menus.List>

              <Modal.Window name="edit-guest">
                <CreateGuestForm />
              </Modal.Window>
            </Menus.Menu>
            <Modal.Window name="delete">
              <ConfirmDelete
                resourceName="guest"
                disabled={isDeleting}
                onConfirm={() => deleteGuest(guestId)}
              />
            </Modal.Window>
          </Modal>
        </div>
      </Table.Row>
    </>
  );
}
export default GuestRow;

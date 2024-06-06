import GuestTable from "../features/guests/guestTable";
import Heading from "../ui/Heading";
import Row from "../ui/Row";

function Guests() {
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">All guests</Heading>
        <p>Add Guest</p>
      </Row>
      <Row>
        <GuestTable />
      </Row>
    </>
  );
}

export default Guests;

import Table from "react-bootstrap/Table";

import { todoApi } from "../services/todos";
import Row from "./Row";

function TodoList() {
  // const { data: todos } = todoApi.useGetTodosQuery();
  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>#</th>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Username</th>
        </tr>
      </thead>
      <tbody>
        <Row />
      </tbody>
    </Table>
  );
}

export default TodoList;

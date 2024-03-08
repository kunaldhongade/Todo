import { Container } from "react-bootstrap";
import AppModal from "./AppModal";
import TodoList from "./TodoList";

export default function TodoApp() {
  return (
    <Container>
      <AppModal />
      <TodoList />
    </Container>
  );
}

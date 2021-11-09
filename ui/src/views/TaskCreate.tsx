import { FC, useState, FormEvent } from "react";
import { useNavigate } from "react-router";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";
import Container from "react-bootstrap/Container";

import { addTask } from "../api/task";
import { Task } from "../store/tasks/types";

const sampleTasks: string[] = [
  "feed the dog...",
  "call the boss...",
  "finish maths homework...",
  "create an awesome todo app...",
];

const TaskCreate: FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);

  const [task, setTask] = useState<Task>({
    content: "",
    priority: 1,
  });

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      await addTask(task);
      setTask({
        content: "",
        priority: 1,
      });
      setLoading(false);
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Container>
      <Row>
        <Col xs={12} sm={{ offset: 3, span: 6 }} md={{ offset: 3, span: 6 }}>
          <h3>add new task</h3>
          <hr />
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>task content body</Form.Label>
              <Form.Control
                rows={3}
                autoFocus
                as="textarea"
                disabled={loading}
                value={task.content}
                onChange={(e) => setTask({ ...task, content: e.target.value })}
                placeholder={
                  sampleTasks[Math.floor(Math.random() * sampleTasks.length)]
                }
              />
            </Form.Group>
            <Form.Label>task priority level</Form.Label>
            <Form.Group className="mb-3">
              <Form.Select
                required
                disabled={loading}
                value={task.priority}
                onChange={(e) =>
                  setTask({ ...task, priority: parseInt(e.target.value) })
                }
              >
                <option value="1">One 💤</option>
                <option value="2">Two ✏️</option>
                <option value="3">Three 🔥</option>
              </Form.Select>
              <Form.Text id="passwordHelpBlock" muted>
                select 1 for lowest and 3 for highest
              </Form.Text>
            </Form.Group>
            <Form.Group>
              <Button variant="success" type="submit" disabled={loading}>
                {loading ? (
                  <Spinner
                    as="span"
                    size="sm"
                    role="status"
                    animation="border"
                    aria-hidden="true"
                  />
                ) : (
                  "add task"
                )}
              </Button>
            </Form.Group>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default TaskCreate;

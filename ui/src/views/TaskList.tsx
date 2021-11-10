import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { FC, useEffect, useState } from "react";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Spinner from "react-bootstrap/Spinner";
import Container from "react-bootstrap/Container";

import { getTasks } from "../api/task";
import { useTasks } from "../store/tasks/hooks";
import { setTasks } from "../store/tasks/actions";
import TaskListItem from "../components/TaskListItem";

const TaskList: FC = () => {
  const tasks = useTasks();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    getTasks()
      .then((tasks) => {
        dispatch(setTasks(tasks));
      })
      .catch(() => {
        alert("failed to load tasks");
      })
      .finally(() => setLoading(false));
  }, [dispatch]);

  return (
    <Container fluid>
      <Row>
        <Col xs={12} sm={12} md={{ offset: 3, span: 6 }}>
          <h3>my tasks</h3>
          <hr />
          {loading ? (
            <Spinner animation="border" />
          ) : tasks.length > 0 ? (
            tasks.map((task, index) => <TaskListItem key={index} task={task} />)
          ) : (
            <p>
              no tasks found. perhaps you'd like to{" "}
              <Link to="/new">add one</Link>?
            </p>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default TaskList;

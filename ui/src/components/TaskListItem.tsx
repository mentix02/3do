import { useDispatch } from "react-redux";
import { FormEvent, useState, useEffect } from "react";

import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import { BsTrash, BsPencil, BsCheckLg, BsCircle } from "react-icons/bs";

import { Task } from "../store/tasks/types";
import { updateTask, deleteTask } from "../api/task";
import {
  removeTask,
  updateTask as updateTaskAction,
} from "../store/tasks/actions";

interface TaskListItemProps {
  task: Task;
}

const TaskListItem = ({ task }: TaskListItemProps) => {
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const [clonedTask, setClonedTask] = useState<Task>(task);

  let priorityHeading = `level `;

  switch (task.priority) {
    case 1:
      priorityHeading += ` one 💤`;
      break;
    case 2:
      priorityHeading += ` two ✏️`;
      break;
    case 3:
      priorityHeading += ` three 🔥`;
      break;
  }

  if (task.completed) {
    priorityHeading += " | completed 🎉";
  } else {
    priorityHeading += " | not completed 🚫";
  }

  useEffect(() => {
    if (clonedTask.priority !== task.priority) {
      updateTask(clonedTask).then((updatedTask) => {
        dispatch(updateTaskAction(updatedTask));
      });
    }
  }, [clonedTask, dispatch, task]);

  const handleContentUpdate = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    updateTask(clonedTask).then((updatedTask) => {
      dispatch(updateTaskAction(updatedTask));
      setIsEditing(false);
    });
  };

  const toggleCompletedStatus = () => {
    const statusToggledTask = {
      ...task,
      completed: !task.completed,
    };
    updateTask(statusToggledTask).then((updatedTask) => {
      dispatch(updateTaskAction(updatedTask));
    });
  };

  const handleEditing = () => {
    setIsEditing(!isEditing);
  };

  const handleDelete = () => {
    deleteTask(task._id!).then(() => {
      dispatch(removeTask(task._id!));
    });
  };

  return (
    <Card className="mb-3" border={task.completed ? "success" : "dark"}>
      <Card.Header>
        {isEditing ? (
          <Form.Select
            value={clonedTask.priority}
            onChange={(e) =>
              setClonedTask({ ...task, priority: parseInt(e.target.value) })
            }
          >
            <option value="1">One 💤</option>
            <option value="2">Two ✏️</option>
            <option value="3">Three 🔥</option>
          </Form.Select>
        ) : (
          <span style={{ fontFamily: "monospace" }}>{priorityHeading}</span>
        )}
      </Card.Header>
      <Card.Body className="clickable" onClick={toggleCompletedStatus}>
        <Card.Text as="div">
          {isEditing ? (
            <Form onSubmit={handleContentUpdate}>
              <Form.Control
                autoFocus
                type="text"
                value={clonedTask.content}
                onChange={(e) => {
                  setClonedTask({ ...task, content: e.target.value });
                }}
              />
              <button hidden type="submit" />
            </Form>
          ) : (
            <span className={task.completed ? "completed" : ""}>
              {task.content}
            </span>
          )}
        </Card.Text>
      </Card.Body>
      <Card.Footer>
        <ButtonGroup>
          <Button
            title="delete task"
            onClick={handleDelete}
            variant="outline-danger"
          >
            <BsTrash />
          </Button>
          <Button
            title="edit task"
            onClick={handleEditing}
            variant="outline-primary"
          >
            <BsPencil />
          </Button>
          {task.completed ? (
            <Button
              title="mark task as pending"
              onClick={toggleCompletedStatus}
              variant="outline-warning"
            >
              <BsCircle />
            </Button>
          ) : (
            <Button
              title="mark task as complete"
              onClick={toggleCompletedStatus}
              variant="outline-success"
            >
              <BsCheckLg />
            </Button>
          )}
        </ButtonGroup>
      </Card.Footer>
    </Card>
  );
};

export default TaskListItem;

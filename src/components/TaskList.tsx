import { useEffect, useState } from "react";
import { List, ListItem, Button, Checkbox, Box } from "@mui/material";
import CreateTaskComponent from "./CreateTaskComponent";
import ApiService from "../services/ApiService";
import AddCsvFile from "./AddCsvFile";
import ModalEdit from "./modals/ModalEdit";

function formatDate(dateString: string): string {
  const date = new Date(dateString);

  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();

  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");

  return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
}

const TaskList = () => {
  const [openEdit, setOpenEdit] = useState<boolean>(false);
  const [idEditTask, setIdEditTask] = useState<string>("");

  const [listTasks, setListTasks] = useState<
    | {
        completed: boolean;
        description: string;
        title: string;
        id: string;
        user_id: string;
        created_at: string;
      }[]
    | false
  >(false);
  const removeTask = async (id: string) => {
    try {
      await ApiService.deleteTask(id);
      alert("task deleted");
      getTasks();
    } catch (error) {
      alert("error 'deleted'");
    }
  };
  const getTasks = async (): Promise<void> => {
    try {
      const response = await ApiService.getAllTasks();
      setListTasks(response);
    } catch (error) {
      setListTasks(false);
    }
  };
  useEffect(() => {
    getTasks();
  }, []);
  return (
    <List>
      <Box sx={{ display: "flex", gap: "20px" }}>
        <CreateTaskComponent getTasks={getTasks} />
        <AddCsvFile getTasks={getTasks} />
      </Box>

      {listTasks ? (
        <>
          {listTasks
            .sort(
              (a, b) =>
                new Date(a.created_at).getTime() -
                new Date(b.created_at).getTime()
            )
            .map(({ completed, created_at, description, id, title }) => (
              <ListItem
                key={id}
                divider
                sx={{ display: "flex", flexDirection: "column" }}
              >
                <p>title: {title}</p>
                <p>description: {description}</p>
                <p>{formatDate(created_at)}</p>
                <Box sx={{ display: "flex", gap: "20px" }}>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => {
                      setOpenEdit(true);
                      setIdEditTask(id);
                    }}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => {
                      removeTask(id);
                    }}
                  >
                    Delete
                  </Button>
                  <Checkbox checked={completed} disabled={true} />
                </Box>
              </ListItem>
            ))}
        </>
      ) : (
        "loading"
      )}

      {openEdit && (
        <ModalEdit
          id={idEditTask}
          setOpenEdit={setOpenEdit}
          getTasks={getTasks}
        />
      )}
    </List>
  );
};

export default TaskList;

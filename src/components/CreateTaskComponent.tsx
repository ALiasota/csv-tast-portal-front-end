import React, { useState } from "react";
import {
  TextField,
  Button,
  Checkbox,
  FormControlLabel,
  Box,
} from "@mui/material";
import ApiService from "../services/ApiService";
import CustomModal from "./modals/Modal";

interface Task {
  title: string;
  description: string;
  completed: boolean;
}
const CreateTaskComponent: React.FC<{ getTasks: () => Promise<void> }> = ({
  getTasks,
}) => {
  const [task, setTask] = useState<Task>({
    title: "",
    description: "",
    completed: false,
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, checked, type } = event.target;
    setTask((prevTask) => ({
      ...prevTask,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      const response = await ApiService.createTask(task);
      console.log("task created successfully:", response);

      setTask({ title: "", description: "", completed: false });
      getTasks();
    } catch (error) {
      alert("Error creating task");
      console.error("Error creating task:", error);
    }
  };

  return (
    <>
      <CustomModal buttonText="create task">
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
          <TextField
            label="Title"
            name="title"
            value={task.title}
            onChange={handleChange}
            required
            fullWidth
            margin="normal"
          />
          <TextField
            label="Description"
            name="description"
            value={task.description}
            onChange={handleChange}
            required
            fullWidth
            margin="normal"
            multiline
            rows={4}
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={task.completed}
                onChange={handleChange}
                name="completed"
              />
            }
            label="Completed"
          />
          <Button type="submit" variant="contained" color="primary">
            Create Task
          </Button>
        </Box>
      </CustomModal>
    </>
  );
};

export default CreateTaskComponent;

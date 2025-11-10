import { Box, Button, Paper, TextField, Typography, } from "@mui/material";
import type { FormEvent } from "react";
import { useTodos } from "../../../lib/hooks/useTodos";

type Props = {
 todo?:ToDo
 closeForm: () => void
}

export default function TodoForm({todo, closeForm}: Props) {
const {updateTodo, createTodo} = useTodos();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
   event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const data : {[key: string] : FormDataEntryValue} = {};
    formData.forEach((value, key) => {
      data[key] = value;
    });
    if(todo){
      data.id = todo.id;
      await updateTodo.mutateAsync(data as unknown as ToDo);
      closeForm();
    }else{
await createTodo.mutateAsync(data as unknown as ToDo);
closeForm();
    }
  }

  return (
    <Paper sx={{borderRadius: 3, padding: 3}}>
      <Typography variant="h5" color="primary" gutterBottom>
        Create Task
      </Typography>

      <Box component="form" onSubmit={handleSubmit} display='flex' flexDirection='column' gap={3}>
          <TextField name="title" label="Title" defaultValue={todo?.title}/>
           <TextField name="description" label="Description" defaultValue={todo?.description}/>
            <TextField name="duedate" label="Due date" type="date"
            defaultValue={todo?.dueDate
              ? new Date(todo.dueDate).toISOString().split('T')[0]
              : new Date().toISOString().split('T')[0]
            }
            />
             <TextField name="status" label="Status" defaultValue={todo?.status}/>
              <TextField name="pariority" label="Pariority" defaultValue={todo?.pariority}/>



          <Box display="flex" justifyContent="end" gap={3}>
            <Button onClick={closeForm} color="inherit">
              Cancel
            </Button>
            <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={updateTodo.isPending || createTodo.isPending}
            >Submit
            </Button>
          </Box>
      </Box>
    </Paper>
  );
}


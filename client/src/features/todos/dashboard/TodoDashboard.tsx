import { Grid, } from "@mui/material";
import TodoList from "./TodoList";
import TodoDetails from "../details/TodoDetails";
import TodoForm from "../form/TodoForm";

type Props = {
    todos: ToDo[];
    selectTodo: (id: string) => void
    cancelSelectTodo: () => void
    selectedTodo?: ToDo;
    openForm: (id: string) => void
    closeForm: () => void
    editMode: boolean
}

export default function TodoDashboard({
  todos,
  cancelSelectTodo,
  selectTodo,
  selectedTodo,
  openForm,
  closeForm,
  editMode
}: Props) {

  return (
    <Grid container spacing={3}>
        <Grid size={7}>
            <TodoList
            todos={todos}
            selectTodo={selectTodo}
             />
        </Grid>
        <Grid size={5}>
            {selectedTodo && !editMode &&
            <TodoDetails
            selectedTodo={selectedTodo}
            cancelSelectTodo={cancelSelectTodo}
            openForm={openForm}
            />
            }
            {editMode &&
            <TodoForm
            closeForm ={closeForm}
            todo={selectedTodo}
            />}
        </Grid>

    </Grid>
  )
}

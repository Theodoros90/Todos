import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Chip,
  Divider,
  Stack,
  Typography,
} from '@mui/material';
import { useTodos } from '../../../lib/hooks/useTodos';

type Props = {
  selectedTodo: ToDo;
  cancelSelectTodo: () => void;
  openForm: (id: string) => void;
};

export default function TodoDetails({ selectedTodo, cancelSelectTodo, openForm }: Props) {
  const {todos} = useTodos();
  const todo = todos?.find(x=>x.id === selectedTodo.id);

  if(!todo) return <Typography>Loading...</Typography>

  return (
    <Card sx={{ borderRadius: 3, p: 2 }}>
      <CardContent>
        <Stack spacing={2}>
          <Typography variant="h5" fontWeight="bold">
            {todo.title}
          </Typography>

          <Typography variant="body1" color="text.secondary">
            {todo.description}
          </Typography>

          <Box>
            <Typography variant="subtitle2" color="text.secondary">
              Meta
            </Typography>
            <Stack spacing={0.5} sx={{ pl: 1 }}>
              <Typography variant="caption">Created: {todo.createAt}</Typography>
              <Typography variant="caption">Updated: {todo.updateAt}</Typography>
              <Typography variant="caption">Due: {todo.dueDate}</Typography>
            </Stack>
          </Box>
          <Divider />

          <Stack direction="row" spacing={1}>
            <Chip
              label={`Status: ${todo.status}`}
              color={
                todo.status === 'Completed'
                  ? 'success'
                  : todo.status === 'Cancelled'
                  ? 'error'
                  : 'warning'
              }
              variant="outlined"
            />
            <Chip
              label={`Priority: ${todo.pariority}`}
              color={
                todo.pariority === 'High'
                  ? 'error'
                  : todo.pariority === 'Medium'
                  ? 'warning'
                  : 'default'
              }
              variant="outlined"
            />
          </Stack>
        </Stack>
      </CardContent>

      <CardActions sx={{ justifyContent: 'flex-end' }}>
        <Button onClick={() => openForm(todo.id)} variant="outlined" color="primary">
          Edit
        </Button>
        <Button onClick={cancelSelectTodo} color="inherit">
          Cancel
        </Button>
      </CardActions>
    </Card>
  );
}

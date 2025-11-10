import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import agent from "../api/agent";

export const useTodos = ()=>{

  const queryClient = useQueryClient();
   const{data: todos, isPending} =useQuery({
    queryKey: ['todos'],
    queryFn: async () => {
      const response = await agent.get<ToDo[]>('/todos');
      return response.data;
    }
    });
    const updateTodo = useMutation({
      mutationFn: async(todo: ToDo) =>{
        await agent.put('/todos',todo)
      },
      onSuccess: async ()=>{
        await queryClient.invalidateQueries({
          queryKey: ['todos']
        })

      }
    });

     const createTodo = useMutation({
      mutationFn: async(todo: ToDo) =>{
        await agent.post('/todos',todo)
      },
      onSuccess: async ()=>{
        await queryClient.invalidateQueries({
          queryKey: ['todos']
        })

      }
    });

     const deleteTodo = useMutation({
      mutationFn: async(id: string) =>{
        await agent.delete(`/todos/${id}`)
      },
      onSuccess: async ()=>{
        await queryClient.invalidateQueries({
          queryKey: ['todos']
        })

      }
    });
    return {
      todos,
      isPending,
      updateTodo,
      createTodo,
      deleteTodo
    }
}

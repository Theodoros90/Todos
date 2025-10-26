using System;
using MediatR;
using Persistence;

namespace Application.Todos.Commands;

public class DeleteToDo
{
    public class Command : IRequest
    {
        public required string Id { get; set; }
    }
    public class Handler(AppDbContext context) : IRequestHandler<Command>
    {
        public async Task Handle(Command request, CancellationToken cancellationToken)
        {
            var todo = await context.Todos
             .FindAsync([request.Id], cancellationToken)
             ?? throw new Exception("Todo not found");
            context.Todos.Remove(todo);
            await context.SaveChangesAsync(cancellationToken);
        }
    }
}

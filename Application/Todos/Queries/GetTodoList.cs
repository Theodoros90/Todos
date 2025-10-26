using System;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Todos.Queries;

public class GetTodoList
{
    public class Query : IRequest<List<Todo>> { }
    public class Handler(AppDbContext context) : IRequestHandler<Query, List<Todo>>
    {
        public async Task<List<Todo>> Handle(Query request, CancellationToken cancellationToken)
        {
            return await context.Todos.ToListAsync(cancellationToken);
           
        }
        
    }
}

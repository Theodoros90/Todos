using System;

namespace Domain;

public class Todo
{
    public string Id { get; set; } = Guid.NewGuid().ToString();
    public required string Title { get; set; }
    public required string Description { get; set; }
    public required string Status { get; set; }
    public DateTime CreateAt { get; set; } = DateTime.Now;
    public DateTime UpdateAt { get; set; }
    public DateTime? DueDate { get; set; }
    public required string Pariority { get; set; }

}

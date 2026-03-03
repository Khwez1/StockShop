using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace api.Models
{
    [Table("Comments")]
    public class Comment
    {
        public int Id { get; set; }
        public string? Title { get; set; }
        public string? Content { get; set; }
        public DateTime CreatedOn { get; set; } = DateTime.Now;
        public int? StockId { get; set; }
        //Navigation
        public Stock? Stock { get; set; }
        public string UserId { get; set; }
        public User User { get; set; }
    }
}
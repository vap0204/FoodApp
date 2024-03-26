using Microsoft.EntityFrameworkCore;

namespace FoodApp.Models
{
    public class Context : DbContext
    {
        public Context()
        {
            
        }

        public Context(DbContextOptions<Context> dbContextOptions):base(dbContextOptions)
        {

        }

        public virtual DbSet<Food> Foods { get; set; }
    }
}

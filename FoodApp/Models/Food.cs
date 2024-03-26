using System.ComponentModel.DataAnnotations;

namespace FoodApp.Models
{
    public class Food
    {
        public int Id { get; set; }

        [Required]
        public string Name { get; set; }

        [Required]
        public int Calories { get; set; }

        [Required]
        public int Protein { get; set; }

        [Required]
        public int Fat { get; set; }

        [Required]
        public int Carbs { get; set; }
    }
}

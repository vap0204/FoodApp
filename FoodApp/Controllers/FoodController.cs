using FoodApp.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace FoodApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FoodController : ControllerBase
    {
        private readonly Context _context;

        public FoodController(Context context)
        {
            _context = context;
        }

        [HttpGet]
        [Route("GetFoods")]
        public IActionResult GetFoods()
        {
            try
            {
                var foods = _context.Foods.ToList();
                return StatusCode(StatusCodes.Status200OK,foods);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        [HttpPost]
        [Route("AddFood")]
        public IActionResult AddFood([FromBody] Food food)
        {
            if (food == null)
            {
                return BadRequest("Food object is null");
            }

            if (!ModelState.IsValid)
            {
                return BadRequest("Invalid model object");
            }

            _context.Foods.Add(food);
            _context.SaveChanges();

            return CreatedAtRoute("GetFoods", new { id = food.Id }, food);
        }
    }
}

using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Authorization;
using dot_net_core_with_angular.Data;

namespace dot_net_core_with_angular.Controllers
{
    [Route("api/[controller]")]
    public class SampleDataController : Controller
    {
        private static string[] Summaries = new[]
        {
            "Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
        };

        private readonly SampleDbContext _context;
        public SampleDataController(SampleDbContext context)
        {
            _context = context;
        }

        [HttpGet("[action]")] //api/SampleData/WeatherForecasts (ver [action])
        public ActionResult<IEnumerable<WeatherForecast>> WeatherForecasts()
        {
            var query = _context.Persons.ToList();
                    
            try {
                var rng = new Random();
                
                //code 200
                return Ok(Enumerable.Range(1, 5).Select(index => new WeatherForecast
                {
                    DateFormatted = DateTime.Now.AddDays(index).ToString("d"),
                    TemperatureC = rng.Next(-20, 55),
                    Summary = Summaries[rng.Next(Summaries.Length)]
                }));
            }catch(Exception ex) {
                //code 400
                return BadRequest("There was an error: " + ex.Message);
            }
            
        }

        //[Authorize]
        [HttpPost]//api/SampleData/
        public IActionResult Post([FromBody] WeatherForecast wf)
        {
            if(ModelState.IsValid){
                //TODO: usar automapper para asignar propiedades de wf a un nuevo objeto
                //...

                //code 201
                return Created("", wf);
            }else{
                //code 400 
                //return BadRequest("Error"); //Ver como mostrar mensaje completo
                return BadRequest(ModelState); //Le paso el model state directamente
            }
        }

        public class WeatherForecast
        {
            public string DateFormatted { get; set; }
            public int TemperatureC { get; set; }
            [Required]
            public string Summary { get; set; }

            public int TemperatureF
            {
                get
                {
                    return 32 + (int)(TemperatureC / 0.5556);
                }
            }
        }
    }
}

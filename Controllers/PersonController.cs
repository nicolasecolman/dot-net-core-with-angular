using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Authorization;
using dot_net_core_with_angular.Data;
using dot_net_core_with_angular.Data.Entities;

namespace dot_net_core_with_angular.Controllers
{   
    [Route("api/[controller]")]
    public class PersonController : Controller
    {

        private readonly SampleDbContext _context;
        public PersonController(SampleDbContext context)
        {
            _context = context;
        }
        
        [HttpGet]
        public ActionResult Get()
        {
            try {
                //If persons is empty?
                //return NoContent(); //204
                return Ok(_context.Persons.ToList());
            } catch (Exception ex) {
                return BadRequest(ex.Message);
            }

        }

        [HttpGet("{id}")]
        public ActionResult Get(int id)
        {
            try {
                var person = _context.Persons.Where(p => p.Id == id).FirstOrDefault();
                if(person != null) {
                    return Ok(person);
                } else {
                    return NotFound();
                }                
            } catch (Exception ex) {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost]
        public ActionResult Post([FromBody] Person p) 
        {
            try {
                //TODO: usar automapper para asignar propiedades de wf a un nuevo objeto
                var person = new Person {
                    Name = p.Name
                };

                _context.Persons.Add(person);

                _context.SaveChanges();

                return Created("", person);

            } catch (Exception ex) {
                return BadRequest(ex.Message);
            }
        }

        [HttpPut("{id}")]
        public ActionResult Put(int id, [FromBody] Person p)
        {
            try {
                var person = _context.Persons.Where(_p => _p.Id == id).FirstOrDefault();

                if(person != null) {
                    person.Name = p.Name;

                    _context.SaveChanges();

                    return Ok(person);
                } else {
                    return NotFound();
                }

            } catch (Exception ex) {
                return BadRequest(ex.Message);
            }           
        }

        [HttpDelete("{id}")]
        public ActionResult Delete(int id)
        {
            try {
                var person = _context.Persons.Where(_p => _p.Id == id).FirstOrDefault();

                if(person != null) {
                    _context.Persons.Remove(person);

                    _context.SaveChanges();

                    return Ok(person);
                } else {
                    return NotFound();
                }

            } catch (Exception ex) {
                return BadRequest(ex.Message);
            }             
        }
    }
}
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using dot_net_core_with_angular.Data.Entities;

namespace dot_net_core_with_angular.Data
{
    public class SampleDbContext : DbContext
    {
        public DbSet<Person> Persons { get; set; }

        public SampleDbContext(DbContextOptions<SampleDbContext> options)
        : base(options)
        {
            
        }
    }
}
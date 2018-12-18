using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Authorization;

namespace dot_net_core_with_angular.Data.Entities
{
    public class Person
    {
        public int Id { get; set; }
        public string Name { get; set; }
    }
}

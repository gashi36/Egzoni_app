using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace Egzoni_app.Products
{
    public class Product
    {
        public int Id { get; set; }
        public string? Kodi { get; set; }
        public string? Tipi { get; set; }
        public string? Masa { get; set; }
        [Precision(10, 2)]
        public decimal? Sasia { get; set; }
        public string? Ngjyra { get; set; }
        [Precision(10, 2)]
        public decimal? CmimiIBlerjes { get; set; }
        [Precision(10, 2)]
        public decimal? CmimiIShitjes { get; set; }

        public decimal? Fitimi()
        {
            return CmimiIShitjes - CmimiIBlerjes;
        }
    }
}
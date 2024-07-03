using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace Egzoni_app.Products
{
    public class Product
    {
        public int Id { get; set; }
        public string? Code { get; set; }
        public string? Description { get; set; }

        public string? Size { get; set; }
        [Precision(10, 2)]
        public decimal? Quantity { get; set; }
        public string? Color { get; set; }
        [Precision(10, 2)]
        public decimal? PurchasePrice { get; set; }
        [Precision(10, 2)]
        public decimal? RetailPrice { get; set; }

        public decimal? Profit()
        {
            return RetailPrice - PurchasePrice;
        }
        // [GraphQLType(typeof(NonNullType<UploadType>))] // ? QETU e ki problemin, kjo perdoret veq nInput per mi i kallzu qe osht UploadType, jo ktu, nuk ka logjik.
        public string? PictureUrl { get; set; }
        [Required]
        public int? BrandId { get; set; }
        public Brand? Brand { get; set; }
        [Required]
        public int? CategoryId { get; set; }
        public Category? Category { get; set; }

    }
}
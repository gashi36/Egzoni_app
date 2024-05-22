using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Egzoni_app.Products
{
    public class AddProductsPayload
    {
        public AddProductsPayload(Product product)
        {
            Products = product;
        }
        public Product Products { get; }
    }
}
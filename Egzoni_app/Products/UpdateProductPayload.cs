using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Egzoni_app.Products
{
    public class UpdateProductPayload
    {
        public UpdateProductPayload(Product product)
        {
            Products = product;
        }
        public Product Products { get; }
    }
}
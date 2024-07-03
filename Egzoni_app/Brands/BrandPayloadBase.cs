using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Egzoni_app.Products;

namespace Egzoni_app.Brands
{
    public class BrandPayloadBase : Payload
    {
        protected BrandPayloadBase(Brand brand)
        {
            Brand = brand;
        }
        protected BrandPayloadBase(IReadOnlyList<UserError> errors) : base(errors)
        {

        }
        public Brand? Brand { get; }
    }
}
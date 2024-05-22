using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Egzoni_app.Products
{
    public class Payload
    {
        protected Payload(IReadOnlyList<UserError>? errors = null)
        {
            Errors = errors;
        }
        public IReadOnlyList<UserError>? Errors { get; }
    }
}
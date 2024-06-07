using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Egzoni_app.Products;

namespace Egzoni_app.Admin
{
    public class AdminPayloadBase : Payload
    {

        public AdminPayloadBase(Administrator administrator)
        {
            Administrator = administrator;

        }

        public AdminPayloadBase(IReadOnlyList<UserError> errors) : base(errors)
        {

        }
        public Administrator? Administrator { get; }

    }
}
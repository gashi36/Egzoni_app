using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Egzoni_app.Products;

namespace Egzoni_app.Admin
{
    public class AdminPayload : Payload
    {
        public AdminPayload(Administrator administrator)
        {
            Administrator = administrator;

        }

        public Administrator? Administrator { get; set; }

    }
}
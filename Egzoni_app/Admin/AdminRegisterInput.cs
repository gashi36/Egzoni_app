using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography.X509Certificates;
using System.Threading.Tasks;

namespace Egzoni_app.Admin
{
    public record AdminRegisterInput
   (
     string? Username,
     string? Password
   );
}
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Egzoni_app.Admin
{
    public record LoginInput(
     string Username,
     string Password
    );
}
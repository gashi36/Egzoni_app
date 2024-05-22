using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Egzoni_app.Products
{
    public class UserError
    {
        public UserError(string message, string code)
        {
            Message = message;
            Code = code;
        }
        public String Message { get; }
        public String Code { get; }
    }
}
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Egzoni_app.Checkout
{
    public class PayloadBase
    {
        public bool Success { get; set; }
        public List<string>? Errors { get; set; }

        public PayloadBase(bool success, List<string>? errors = null)
        {
            Success = success;
            Errors = errors ?? new List<string>();
        }
    }

}
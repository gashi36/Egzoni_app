using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Egzoni_app.Database;

namespace Egzoni_app.Admin
{
    public class AdminQuery
    {
        [UseDbContext(typeof(ApplicationDbContext))]
        [UseFiltering]
        [UseSorting]

        public IQueryable<Administrator> GetAdministrators(ApplicationDbContext context)
        {
            return context.Admins;
        }
    }
}
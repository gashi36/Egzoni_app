using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Egzoni_app.Brands
{
    public record AddBrandInput
(
    string Name,
    [GraphQLType(typeof(NonNullType<UploadType>))] IFile? Logo
);
}
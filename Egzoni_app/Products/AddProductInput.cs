using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Egzoni_app.Products
{
    public record AddProductInput
    (
        string? Code,
        string? Size,
        decimal? Quantity,
        string? Color,
        string? Description,
        decimal? PurchasePrice,
        decimal? RetailPrice,
        int? Id,
        [GraphQLType(typeof(NonNullType<UploadType>))] IFile? Image,
        int? BrandId,
        int? CategoryId

    );
}
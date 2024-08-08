using System.Collections.Generic;
using Microsoft.AspNetCore.Http;
using HotChocolate.Types;

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
  [GraphQLType(typeof(NonNullType<ListType<UploadType>>))] IReadOnlyList<IFile>? Image,
     [GraphQLType(typeof(UploadType))] // Use UploadType for single file upload
        IFile? Thumbnail,

       int? BrandId,
        int? CategoryId
    );
}

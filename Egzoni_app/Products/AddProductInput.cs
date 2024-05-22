using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Egzoni_app.Products
{
    public record AddProductInput
    (
        string? Kodi,
        string? Tipi,
        string? Masa,
        decimal? Sasia,
        string? Ngjyra,
        decimal? CmimiIBlerjes,
        decimal? CmimiIShitjes
    );
}
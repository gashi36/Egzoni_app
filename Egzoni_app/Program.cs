using Egzoni_app.Database;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory;
using HotChocolate;
using HotChocolate.Types;
using Microsoft.EntityFrameworkCore;
using Egzoni_app.Products;
using HotChocolate.Data;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddPooledDbContextFactory<ApplicationDbContext>(options => options.UseSqlite("Data Source=egzoni.db"));

builder.Services.AddControllers();

builder.Services.AddScoped<ApplicationDbContext, ApplicationDbContext>();

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddGraphQL();
builder.Services.AddCors();
builder.Services
    .AddGraphQLServer()
    .RegisterDbContext<ApplicationDbContext>()
     .AddFiltering()
    .AddSorting()
    .AddTypes()
    .AddDataLoader<ProductByIdDataLoader>();



// builder.Services.AddGraphQLServer()
//     .ModifyRequestOptions(o =>
//     {
//         o.ExecutionTimeout = TimeSpan.FromSeconds(60);
//     });
// builder.Services.AddGraphQLServer()
//     .SetMaxAllowedValidationErrors(5);
// builder.Services.AddGraphQLServer()
// .ModifyOptions(o => o.MaxAllowedNodeBatchSize = 1);
// builder.Services.AddSha256DocumentHashProvider();
// var signingKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("MySuperSecretKey"));

// builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
//     .AddJwtBearer(options =>
//     {
//         options.TokenValidationParameters = new TokenValidationParameters
//         {
//             ValidateIssuer = true,
//             ValidateAudience = true,
//             ValidateIssuerSigningKey = true,
//             ValidIssuer = "https://auth.chillicream.com",
//             ValidAudience = "https://graphql.chillicream.com",
//             IssuerSigningKey = signingKey
//         };
//     });


var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}
app.UseAuthentication();
app.UseHttpsRedirection();
app.MapGraphQL();
app.MapControllers();
app.UseCors(options =>
{
    options.AllowAnyHeader();
    options.AllowAnyOrigin();
    options.AllowAnyMethod();

});


app.Run();

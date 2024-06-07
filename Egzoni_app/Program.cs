using Egzoni_app.Database;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory;
using HotChocolate;
using HotChocolate.Types;
using Microsoft.EntityFrameworkCore;
using Egzoni_app.Products;
using HotChocolate.Data;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Egzoni_app.Admin;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddPooledDbContextFactory<ApplicationDbContext>(options =>
{
    options.UseSqlServer(builder.Configuration.GetConnectionString("DevConnection"));

});

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
    .AddAuthorization();

builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
 .AddJwtBearer(options =>
 {
     options.TokenValidationParameters = new TokenValidationParameters
     {
         ValidateIssuer = true,
         ValidateAudience = true,
         ValidateLifetime = true,
         ValidateIssuerSigningKey = true,
         //  ValidIssuer = jwtIssuer,
         //  ValidAudience = jwtIssuer,
         //  IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtKey))
     };
 });

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}
app.UseAuthentication();
app.UseAuthorization();
app.UseWebSockets();
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

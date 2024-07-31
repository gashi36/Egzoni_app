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

builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
 .AddJwtBearer(options =>
 {
     options.TokenValidationParameters = new TokenValidationParameters
     {
         ValidIssuer = builder.Configuration["Jwt:Issuer"],
         ValidAudience = builder.Configuration["Jwt:Audience"],
         ValidateIssuerSigningKey = true,
         IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["Jwt:Key"]!))
     };
 });

builder.Services.AddAuthorization();

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddGraphQL();
builder.Services.AddCors();

builder.Services
    .AddGraphQLServer()

    .AddAuthorization()
    .RegisterDbContext<ApplicationDbContext>()
    .AddFiltering()
    .AddSorting()
    .AddUploadType()
    .AddTypes();


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
app.UseStaticFiles();
// app.UseHttpsRedirection();
app.MapGraphQL();
app.MapControllers();
app.UseCors(options =>
{
    options.AllowAnyHeader();
    options.AllowAnyOrigin();
    options.AllowAnyMethod();

});


app.Run();

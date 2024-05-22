using Egzoni_app.Database;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory;
using HotChocolate;
using HotChocolate.Types;
using Microsoft.EntityFrameworkCore;
using Egzoni_app.Products;

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
    .AddTypes()
    .AddDataLoader<ProductByIdDataLoader>()
    .AddFiltering();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

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

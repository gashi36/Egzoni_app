﻿// <auto-generated />
using Egzoni_app.Database;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

#nullable disable

namespace Egzoni_app.Migrations
{
    [DbContext(typeof(ApplicationDbContext))]
    [Migration("20240521072647_init")]
    partial class init
    {
        /// <inheritdoc />
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder.HasAnnotation("ProductVersion", "8.0.4");

            modelBuilder.Entity("Egzoni_app.Products.Product", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<string>("CmimiIBlerjes")
                        .HasColumnType("TEXT");

                    b.Property<string>("Kodi")
                        .HasColumnType("TEXT");

                    b.Property<string>("Masa")
                        .HasColumnType("TEXT");

                    b.Property<string>("Ngjyra")
                        .HasColumnType("TEXT");

                    b.Property<string>("Sasia")
                        .HasColumnType("TEXT");

                    b.Property<string>("Tipi")
                        .HasColumnType("TEXT");

                    b.HasKey("Id");

                    b.ToTable("Products");
                });
#pragma warning restore 612, 618
        }
    }
}

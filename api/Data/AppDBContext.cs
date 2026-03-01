using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace api.Data
{
    public class AppDBContext : IdentityDbContext<User>
    {
        public AppDBContext(DbContextOptions dbContextOptions) 
        : base(dbContextOptions)
        {
            
        }
        public DbSet<Stock> Stock { get; set; }
        public DbSet<Comment> Comments { get; set; }
        public DbSet<Portfolio> Portfolios { get; set; }
        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            builder.Entity<Portfolio>(x => x.HasKey(p => new { p.UserId, p.StockId }));

            builder.Entity<Portfolio>()
                .HasOne(u => u.User)
                .WithMany(P => P.Portfolios)
                .HasForeignKey(U => U.UserId);

            builder.Entity<Portfolio>()
                .HasOne(s => s.Stock)
                .WithMany(P => P.Portfolios)
                .HasForeignKey(S => S.StockId);

            List<IdentityRole> roles = new List<IdentityRole>
            {
                new IdentityRole
                {
                    Id = "admin-role-id",
                    Name = "Admin",
                    NormalizedName = "ADMIN",
                    ConcurrencyStamp = "admin-role-id"
                },
                new IdentityRole
                {
                    Id = "user-role-id",
                    Name = "User",
                    NormalizedName = "USER",
                    ConcurrencyStamp = "user-role-id"
                } 
            };
            builder.Entity<IdentityRole>().HasData(roles);
        }
    }
}
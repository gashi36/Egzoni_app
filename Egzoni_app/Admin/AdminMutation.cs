using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Egzoni_app.Database;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;

namespace Egzoni_app.Admin
{

    [MutationType]
    public class AuthMutations
    {

        public async Task<AdminPayloadBase> AddRegisterAsync(AdminRegisterInput adminRegisterInput, ApplicationDbContext context)
        {
            var (hashedPassword, salt) = PasswordHasher.HashPassword(adminRegisterInput.Password);
            var user = new Administrator
            {
                Username = adminRegisterInput.Username,
                Password = hashedPassword,
                Salt = salt
            };
            context.Admins.Add(user);
            await context.SaveChangesAsync();
            return new AdminPayloadBase(user);
        }


        public async Task<AdminPayloadBase> LoginAsync(LoginInput loginInput, ApplicationDbContext _context, [Service] IConfiguration _config)
        {
            var user = await _context.Admins.FirstOrDefaultAsync(u => u.Username == loginInput.Username);

            if (user == null || !PasswordHasher.VerifyPassword(user.Password!, user.Salt, loginInput.Password))
            {
                throw new Exception("Invalid username or password.");
            }

            if (user.Username != null)
            {
                string token = GenerateJwtToken(user.Username, _config);
                user.Token = token;

                await _context.SaveChangesAsync();

                return new AdminPayloadBase(user);
            }
            else
            {
                throw new ArgumentNullException("user.Username", "Username is null.");
            }
        }
        private static string GenerateJwtToken(string username, IConfiguration _config)
        {
            var key = _config["Jwt:Key"];
            if (key == null)
            {
                throw new ArgumentNullException("_config[\"Jwt:Key\"]", "Jwt:Key is not set in the configuration.");
            }
            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(key));
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);
            var claims = new[]{
                new Claim(JwtRegisteredClaimNames.Sub,username),
                new Claim(JwtRegisteredClaimNames.Jti,Guid.NewGuid().ToString())
            };
            var token = new JwtSecurityToken(
                issuer: _config["Jwt:Issuer"],
                audience: _config["Jwt:Audience"],
                claims: claims,
                expires: DateTime.Now.AddMinutes(120),
                signingCredentials: credentials);

            return new JwtSecurityTokenHandler().WriteToken(token);
        }


    }
}
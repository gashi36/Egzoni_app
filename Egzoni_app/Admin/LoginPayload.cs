using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using HotChocolate.AspNetCore;
using Microsoft.AspNetCore.Authentication;

namespace Egzoni_app.Admin
{
    public class LoginPayload
    {
        public string Token { get; }
        public Administrator User { get; }

        public LoginPayload(string token, Administrator user)
        {
            Token = token;
            User = user;
        }
    }

    public interface IAuthenticationService
    {
        Task<Administrator> GetUserByUsernameAsync(string username);
        string GenerateToken(Administrator user);
    }


}
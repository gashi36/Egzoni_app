using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Threading.Tasks;

namespace Egzoni_app.Admin
{
    public class PasswordHasher
    {
        private const int SaltSize = 16;
        private const int KeySize = 32;
        private const int Iterations = 10000;

        public static (string hash, string salt) HashPassword(string password)
        {
            using var algorithm = new Rfc2898DeriveBytes(password, SaltSize, Iterations, HashAlgorithmName.SHA256);
            var key = Convert.ToBase64String(algorithm.GetBytes(KeySize));
            var salt = Convert.ToBase64String(algorithm.Salt);
            return (key, salt);
        }
        public static bool VerifyPassword(string hash, string salt, string password)
        {
            var saltBytes = Convert.FromBase64String(salt);
            using var algorithm = new Rfc2898DeriveBytes(password, saltBytes, Iterations, HashAlgorithmName.SHA256);
            var keyToCheck = algorithm.GetBytes(KeySize);
            var hashBytes = Convert.FromBase64String(hash);
            return keyToCheck.SequenceEqual(hashBytes);

        }
    }
}
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Egzoni_app.Interfaces;
using MailKit.Net.Smtp;
using MimeKit;

namespace Egzoni_app.EmailSender
{
    public class EmailService : IEmailService
    {
        private readonly string _smtpServer;
        private readonly int _port;
        private readonly string _fromAddress;
        private readonly string _username;
        private readonly string _password;

        public EmailService(string smtpServer, int port, string fromAddress, string username, string password)
        {
            _smtpServer = smtpServer;
            _port = port;
            _fromAddress = fromAddress;
            _username = username;
            _password = password;
        }

        public async Task SendEmailAsync(string to, string subject, string body)
        {
            var message = new MimeMessage();
            // Check if _fromAddress is not null and use it
            var fromAddress = !string.IsNullOrEmpty(_fromAddress) ? _fromAddress : "egzonicenter@gmail.com";

            message.From.Add(new MailboxAddress("egzonicenter", fromAddress));
            message.To.Add(new MailboxAddress("", to));
            message.Subject = subject;

            var builder = new BodyBuilder { HtmlBody = body };
            message.Body = builder.ToMessageBody();

            using (var client = new SmtpClient())
            {
                await client.ConnectAsync(_smtpServer, _port, MailKit.Security.SecureSocketOptions.StartTls);
                await client.AuthenticateAsync(_username, _password);
                await client.SendAsync(message);
                await client.DisconnectAsync(true);
            }
        }
    }
}

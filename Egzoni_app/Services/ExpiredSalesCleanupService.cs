using System;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.DependencyInjection;
using Egzoni_app.Database;
using System.Linq;
using Microsoft.EntityFrameworkCore;

public class ExpiredSalesCleanupService : BackgroundService
{
    private readonly IServiceProvider _serviceProvider;
    private readonly ILogger<ExpiredSalesCleanupService> _logger;

    public ExpiredSalesCleanupService(IServiceProvider serviceProvider, ILogger<ExpiredSalesCleanupService> logger)
    {
        _serviceProvider = serviceProvider;
        _logger = logger;
    }

    protected override async Task ExecuteAsync(CancellationToken stoppingToken)
    {
        while (!stoppingToken.IsCancellationRequested)
        {
            await RemoveExpiredSales();
            // Wait for a specified period (e.g., every hour)
            await Task.Delay(TimeSpan.FromHours(1), stoppingToken);
        }
    }

    private async Task RemoveExpiredSales()
    {
        using (var scope = _serviceProvider.CreateScope())
        {
            var context = scope.ServiceProvider.GetRequiredService<ApplicationDbContext>();
            var currentDate = DateTime.UtcNow;

            var expiredSales = await context.Sales
                .Where(s => s.EndDate < currentDate)
                .ToListAsync();

            if (expiredSales.Any())
            {
                context.Sales.RemoveRange(expiredSales);
                await context.SaveChangesAsync();
                _logger.LogInformation($"Removed {expiredSales.Count} expired sales.");
            }
        }
    }
}

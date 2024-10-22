using HotChocolate.Types;

namespace Egzoni_app.OnSale
{
    public class SalesType : ObjectType<Sales>
    {
        protected override void Configure(IObjectTypeDescriptor<Sales> descriptor)
        {
            descriptor.BindFieldsImplicitly();

            // Optional: Explicitly define fields if you want to customize behavior
            descriptor.Field(s => s.DiscountedPrice)
                      .Description("The price after applying the discount.")
                      .Type<DecimalType>(); // Ensure this field returns a decimal type

            descriptor.Field(s => s.DiscountPercentage)
                      .Description("The percentage discount applied.");
        }
    }
}

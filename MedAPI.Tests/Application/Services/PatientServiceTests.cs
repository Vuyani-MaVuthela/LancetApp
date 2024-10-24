namespace MedAPI.Tests
{
    using MedAPI.Core.Interfaces;
    using Xunit;

    public class PatientServiceTests
    {
        private readonly IPatientService _testClass;

        public PatientServiceTests()
        {
            _testClass = new PatientService();
        }

        [Fact]
        public void CanConstruct()
        {
            // Act
            var instance = new PatientService();

            // Assert
            Assert.NotNull(instance);
        }
   }
}
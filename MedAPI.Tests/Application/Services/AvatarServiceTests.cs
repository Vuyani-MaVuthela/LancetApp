namespace MedAPI.Tests.Application.Services
{
    using System;
    using System.Threading.Tasks;
    using MedAPI.Application.Services;
    using NUnit.Framework;

    [TestFixture]
    public class AvatarServiceTests
    {
        private AvatarService _testClass;

        [SetUp]
        public void SetUp()
        {
            _testClass = new AvatarService();
        }

        [Test]
        public async Task CanCallGetAvatarById()
        {
            // Arrange
            var patientId = new Guid("443cca73-83a6-4a65-9ab3-4bb39633fc71");

            // Act
            var result = await _testClass.GetAvatarById(patientId);

            // Assert
            Assert.Fail("Create or modify test");
        }

        [Test]
        public async Task CanCallDeleteAvatarById()
        {
            // Arrange
            var patientId = new Guid("51c8938c-89f0-42f4-80dd-09aabd2dab26");

            // Act
            var result = await _testClass.DeleteAvatarById(patientId);

            // Assert
            Assert.Fail("Create or modify test");
        }
    }
}
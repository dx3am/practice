using Xunit;
using Game;

namespace Game.Tests
{
    public class NumberGuesserTests
    {
        [Fact]
        public void Guess_ShouldReturnCorrect_WhenNumberIsCorrect()
        {
            var guesser = new NumberGuesser(5);

            var result = guesser.Guess("5");

            Assert.True(result.IsCorrect);
            Assert.Contains("вгадане за", result.Message, System.StringComparison.OrdinalIgnoreCase);
        }

        [Fact]
        public void Guess_ShouldReturnMessage_WhenNumberIsTooLow()
        {
            var guesser = new NumberGuesser(5);

            var result = guesser.Guess("3");

            Assert.False(result.IsCorrect);
            Assert.Contains("недооцінювати", result.Message, System.StringComparison.OrdinalIgnoreCase);
        }

        [Fact]
        public void Guess_ShouldReturnMessage_WhenNumberIsTooHigh()
        {
            var guesser = new NumberGuesser(5);

            var result = guesser.Guess("7");

            Assert.False(result.IsCorrect);
            Assert.Contains("великі числа", result.Message, System.StringComparison.OrdinalIgnoreCase);
        }

        [Fact]
        public void Guess_ShouldReturnErrorMessage_WhenInputIsNotANumber()
        {
            var guesser = new NumberGuesser(5);

            var result = guesser.Guess("abc");

            Assert.False(result.IsCorrect);
            Assert.Contains("число злякається", result.Message, System.StringComparison.OrdinalIgnoreCase);
        }

        [Fact]
        public void Guess_ShouldIncrementAttempts_OnEachGuess()
        {
            var guesser = new NumberGuesser(5);

            guesser.Guess("2");
            guesser.Guess("4");
            guesser.Guess("5");

            Assert.Equal(3, guesser.Attempts);
        }

        [Fact]
        public void Guess_ShouldReturnErrorMessage_WhenNumberIsOutOfRange()
        {
            var guesser = new NumberGuesser(5);

            var resultLow = guesser.Guess("0");
            var resultHigh = guesser.Guess("8");

            Assert.False(resultLow.IsCorrect);
            Assert.False(resultHigh.IsCorrect);
            Assert.Contains("в межах 1–7", resultLow.Message, System.StringComparison.OrdinalIgnoreCase);
            Assert.Contains("в межах 1–7", resultHigh.Message, System.StringComparison.OrdinalIgnoreCase);
        }

        [Fact]
        public void Guess_ShouldNotIncrementAttempts_AfterCorrectGuess()
        {
            var guesser = new NumberGuesser(5);

            guesser.Guess("3");
            guesser.Guess("5"); // правильний варіант
            var attemptsAfterCorrect = guesser.Attempts;

            guesser.Guess("4"); // не повинно рахуватись
            Assert.Equal(attemptsAfterCorrect, guesser.Attempts);
        }
    }
}
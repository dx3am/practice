namespace Game
{
    public class GuessResult
    {
        public bool IsCorrect { get; }
        public string Message { get; }

        public GuessResult(bool isCorrect, string message)
        {
            IsCorrect = isCorrect;
            Message = message;
        }
    }
}

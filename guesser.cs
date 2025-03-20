public class GuessResult
{
    public bool IsCorrect { get; set; }
    public string Message { get; set; }
}

public class NumberGuesser
{
    private int targetNumber;

    public NumberGuesser(int target)
    {
        targetNumber = target;
    }

    public GuessResult Guess(string input)
    {
        if (!int.TryParse(input, out int number))
        {
            return new GuessResult { IsCorrect = false, Message = "Оригінально. Якщо вводити літери, можливо, число злякається і саме назветься?" };
        }
        if (number < 1 || number > 7)
        {
            return new GuessResult { IsCorrect = false, Message = "Сміливо! Але давай все ж таки в межах 1-7." };
        }
        if (number < targetNumber)
        {
            return new GuessResult { IsCorrect = false, Message = "Цікава стратегія – недооцінювати." };
        }
        if (number > targetNumber)
        {
            return new GuessResult { IsCorrect = false, Message = "Занадто завищена оцінка!" };
        }

        return new GuessResult { IsCorrect = true, Message = "Вітаю! Ви вгадали число!" };
    }
}
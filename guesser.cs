public class NumberGuesser
{
    private readonly int _target;
    public int Attempts { get; private set; }

    public NumberGuesser(int target)
    {
        _target = target;
        Attempts = 0;
    }

    public string Guess(string input)
    {
        if (!int.TryParse(input, out int number))
            return "Оригінально. Якщо вводити літери, можливо, число злякається і саме назветься?";

        if (number < 1 || number > 7)
            return "Сміливо! Але давай все ж таки в межах 1–7.";

        Attempts++;

        if (number < _target)
            return "Цікава стратегія – недооцінювати ситуацію.";
        if (number > _target)
            return "Ого, хтось явно вірить у великі числа.";

        return $"Оце так, {Attempts} спроб(и) – і успіх! Справжній аналітик…";
    }
}
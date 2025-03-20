namespace Game
{
    public class NumberGuesser
    {
        private readonly int _target;
        public int Attempts { get; private set; }
        private bool _isGameOver;

        public NumberGuesser(int target)
        {
            _target = target;
            Attempts = 0;
            _isGameOver = false;
        }

        public GuessResult Guess(string input)
        {
            if (_isGameOver) 
                return new GuessResult(true, "Гра вже закінчена! Ти вгадав число.");

            if (!int.TryParse(input, out int number))
                return new GuessResult(false, "Оригінально. Якщо вводити літери, можливо, число злякається і саме назветься?");

            if (number < 1 || number > 7)
                return new GuessResult(false, "Сміливо! Але давай все ж таки в межах 1–7.");

            Attempts++;

            if (number == _target)
            {
                _isGameOver = true;
                return new GuessResult(true, $"Вітаю! Число вгадане за {Attempts} спроб(и)!");
            }

            return number < _target
                ? new GuessResult(false, "Цікава стратегія – недооцінювати ситуацію.")
                : new GuessResult(false, "Ого, хтось явно вірить у великі числа.");
        }
    }
}

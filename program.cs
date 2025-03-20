using System;

class Program
{
    static void Main()
    {
        NumberGuesser game = new NumberGuesser(new Random().Next(1, 8));

        Console.WriteLine("Комп'ютер загадав число від 1 до 7. Твоє завдання — вгадати!");

        while (true)
        {
            Console.Write("Введи число: ");
            string? input = Console.ReadLine();

            if (string.IsNullOrEmpty(input))  
            {
                Console.WriteLine("Будь ласка, введи число!");
                continue;
            }

            GuessResult result = game.Guess(input);
            Console.WriteLine(result.Message);

            if (result.IsCorrect)
                break;
        }
    }
}
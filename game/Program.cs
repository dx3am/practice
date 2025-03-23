using System;

namespace Game
{
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
                    Console.WriteLine("Будь ласка, введи число! Або будемо сидіти тут вічно...");
                    continue;
                }

                GuessResult result = game.Guess(input);
                Console.WriteLine(result.Message);

                if (result.IsCorrect)
                {
                    Console.WriteLine(game.Attempts switch
                    {
                        1 => "Оце так, з першого разу? Ти що, телепат?",
                        2 => "Дві спроби – і успіх! Гарний темп!",
                        <= 5 => $"Ну, {game.Attempts} спроб – ще не рекорд, але все ж непогано.",
                        _ => $"Фух, аж {game.Attempts} спроб(и)... Але головне – результат!"
                    });
                    break;
                }
            }
        }
    }
}

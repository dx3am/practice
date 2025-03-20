using System;

class Program
{
    static void Main()
    {
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
        }
    }
}
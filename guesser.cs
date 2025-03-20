public class NumberGuesser
{
    private readonly int _target;
    public int Attempts { get; private set; }

    public NumberGuesser(int target)
    {
        _target = target;
        Attempts = 0;
    }
}
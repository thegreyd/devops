# csc_519_devops
Repo for CSC 519 - DevOps

java parser: 
- [github](https://github.com/mazko/jsjavaparser)
- [npm module](https://www.npmjs.com/package/java-parser)

# `sample.java`

```java
public class Factorial
{
    public static void main(String[] args)
    {   final int NUM_FACTS = 100;
        for(int i = 0; i < NUM_FACTS; i++)
            System.out.println( i + "! is " + factorial(i));
    }
    
    public static int factorial(int n)
    {   int result = 1;
        for(int i = 2; i <= n; i++)
            result *= i;
        return result;
    }
}
```

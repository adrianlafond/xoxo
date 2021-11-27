# xoxo
A code-breaking command-line game. Based on [Bulls and Cows](https://en.wikipedia.org/wiki/Bulls_and_Cows).

## how to play

After cloning the repo and running `npm i` to install dependencies, run:

```
npm start
```
or
```
node src/xoxo
```

## options

Options can be run after `node src/xoxo`. For example:

```
node src/xoxo -a 24 -w -d 3 -r
```

| short | long    | description                                                |
|-------|---------|------------------------------------------------------------|
| -d | --digits   | Length of the code, from 3 to 5; default is 4              |
| -w | --word     | Code will be a word instead of a number                    |
| -r | --repeats  | Digits in the code can repeat; default is false            |
| -a | --attempts | Attemps allowed to break the code; default is 12           |

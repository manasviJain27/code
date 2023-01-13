import random
import time
used=[ ]
ml=0

try:
    name=input('Enter your name: ')
except:
    print('That is an invalid name. Please enter your actual name.')
#Introduction with Instructions
def get_option():
    choice=0
    print()
    print('Welcome to Hangman',name,'. Are you ready to die?')
    print()
    print('1 - Play Again')
    print()
    print('2 - Display Instructions')
    print()
    print('3 - Quit')
    print()
#Error check to make sure user enters valid input
    while choice != 1 or choice != 2 or choice != 3:
        try:
            choice=int(input('Enter your choice: '))
        except:
            print('Try again')
        if(choice != 1) or (choice != 2) or (choice != 3):
            print('You did not enter a valid number. Try again.')
            print()
        if (choice == 1):
            get_word(ml)
        if(choice == 2):
            print('To play Hangman you need to guess the word correctly so, you do not die.')
            print('For every guess you get wrong the closer you will get to loosing the game. You will have 10 tries to get  the word.')
            print()
        if(choice == 3):
            exit()
#Graphics to be used if the user enters the wrong guess
def hangman_graphics(wrong):
    if(wrong == 1):
        print('|-----------------------')
        print('|                                     |')
        print('|                                    0')
        print('|')
        print('|')
        print('|')
    if(wrong == 2):
        print('|-----------------------')
        print('|                                     |')
        print('|                                    0')
        print('|                                  / |  ' )
        print('|')
        print('|')
    if(wrong == 3):
        print('|-----------------------')
        print('|                                     |')
        print('|                                    0'  )
        print("|                                  / | \ ")
        print('|')
        print('|')
    if(wrong == 4):
        print('|-----------------------')
        print('|                                     |')
        print('|                                    0')
        print('|                                  / | \ ')
        print('|                                   /')
        print('|')
    if(wrong == 5):
        print('|-----------------------')
        print('|                                     |')
        print('|                                    0')
        print('|                                  / | \ ')
        print('|                                   / \ ')
        print('|')


def get_word(ml):
    wrong = 0
    #Master list where the code will randomly pick a word
    master_list= ['kitchen','fridge','stove','oven','shoes','clothes','people',
             'television','food','iron','games','beds','books','furniture','sofa',
             'tables','dining tables','knife','showers','laptop','phones','chargers','car',
             'automobile','bicycles','blankets','toys','family','parties','friends','microwave',
             'counter','cupboards','grandmother','washer','dryer','wallet', 'safe','soap','',
             'paintings','mother','father','sister','brother','pet','love' ]
              
    word=random.shuffle(master_list)
    words1= list(master_list[0])
    alphabet='abcdefghijklmnopqrstuvwxyz'
    guessed = ["__"] * len(words1)
    time.sleep(1)
    print(guessed)
    print()

#This will make sure that if the user won't enter more than 5 wrong tries
    while wrong <= 5:
        print("\n") 
        guess=input('Enter a letter: ')
        used.append(guess)
        while guess not in alphabet:
            print('That is an invalid letter. Try again')
            print()
            guess=input('Enter a letter to guess: ')
            used.append(guess)
        
        if(guess not in words1):
            time.sleep(1)
            wrong += 1
            wrong1=5-wrong
            print('Too bad.',guess,'is not in the word. You have ',wrong1, 'wrong guesses left.')
            print(hangman_graphics(wrong))
            if(wrong1 == 0):
                break
                get_option()
        else:
            print('Here are the letters you have used: ', used)
        for i in range (len(words1)):
            if words1[i] == guess:
                guessed[i]=guess
            
        print(guessed)
#If user wins
        if "__" not in guessed:
            time.sleep(1)
            print("You win!")
            print()
            print()
            print(get_option())
            used.clear()
            win = True
            break
#If user looses
    if wrong == 5:
        print("You lose! It was: ", words1)
        used.clear()
        print(get_option())

option=get_option()
words=get_word(ml)
print(option)
print(words)

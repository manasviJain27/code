#Defining Variables
main= 0
roll=0
roll1=0
roll2=0
roll3= 0
roll4=0
roll5=0
play=0
chance=False
count=1
lost=0
loose=0
win=0
won=0

while (play != -1):
    print('You are on game: ', count)
    main= int(input('Choose a number between 5 and 9:   '))
    count= count+1
    
    print('Press enter to roll.')
    
    #Printing the outcome of each roll of the die
    import random
    roll= random.randint(1,6)
    input()
    
    #Possible surfaces of dice 1
    if(roll == 1):
        print('[----------------------]')
        print('[                 o                ]')
        print('[----------------------]')
        
    if(roll == 2):
        print('[-----------------------]')
        print('[                o o                ]')
        print('[-----------------------]')

    if(roll == 3):
        print('[-----------------------]')
        print('[                          o         ]')
        print('[                 o                  ]')
        print('[        o                           ]')
        print('[-----------------------]')
        
    if(roll == 4):
        print('[----------------------]')
        print('[               o     o           ]')
        print('[               o     o           ]')
        print('[----------------------]')
        
    if(roll == 5):
        print('[-----------------------]')
        print('[             o       o            ]')
        print('[                  o                ]')
        print('[             o       o            ]')
        print('[-----------------------]')
        
    if(roll == 6):
        print('[-----------------------]')
        print('[               o       o          ]')
        print('[               o       o          ]')
        print('[               o       o          ]')
        print('[-----------------------]')     
    print('The first number is:',roll)
    
    roll1= random.randint(1,6)
    input()
    #Possible surfaces of dice 2
    if(roll1 == 1):
        print('[----------------------]')
        print('[                 o                ]')
        print('[----------------------]')
    if(roll1 == 2):
        print('[-----------------------]')
        print('[                o o                ]')
        print('[-----------------------]')
    if(roll1 == 3):
        print('[-----------------------]')
        print('[                          o         ]')
        print('[                 o                  ]')
        print('[        o                           ]')
        print('[-----------------------]')
    if(roll1 == 4):
        print('[----------------------]')
        print('[               o     o           ]')
        print('[               o     o           ]')
        print('[----------------------]')
    if(roll1 == 5):
        print('[-----------------------]')
        print('[             o       o            ]')
        print('[                  o                ]')
        print('[             o       o            ]')
        print('[-----------------------]')
    if(roll1 == 6):
        print('[-----------------------]')
        print('[               o       o          ]')
        print('[               o       o          ]')
        print('[               o       o          ]')
        print('[-----------------------]')
    print('The second number is: ',roll1)
    
    roll2= roll+roll1
    print('Together it is: ', roll2)
    print()
    
    #Printing if the user wins or looses the game
    if(roll2 == main):
        print('You won')
        win='win'
        won=won+1
        play= 'again'
        
    elif(roll2 == 2) or (roll2 == 3):
        print('You lost')
        loose='loose'
        lost=lost+1
        play='again'
        
    elif(roll2== 11) or (roll2== 12):
        if(main == 5) or (main == 9):
            print('You loose.')
            loose='loose'
            lost=lost+1
            play= 'again'
                
        if(main == 6) or (main == 8):
            if(roll2 == 11):
                print('You loose.')
                loose='loose'
                lost=lost+1
                play= 'again'
                
        if(main == 6) or (main == 8):
            if(roll2 == 12):
                print('You won.')
                win='win'
                won=won+1
                play= 'again'
                
        if(main ==7):
            if(roll2 == 11):
                print('You win')
                win='win'
                won=won+1
                play= 'again'
                
        if(main ==7):
            if(roll2 ==12):
                print('You lost.')
                loose='loose'
                lost=lost+1
                play='again'

    else:
        while(roll5 != main) and (roll5 != roll2):
            import random
            roll3= random.randint(1,6)
            input()
            #Possible surfaces of die 3
            if(roll3 == 1):
                print('[----------------------]')
                print('[                 o                ]')
                print('[----------------------]')
            if(roll3 == 2):
                print('[-----------------------]')
                print('[                o o                ]')
                print('[-----------------------]')
            if(roll3 == 3):
                print('[-----------------------]')
                print('[                          o         ]')
                print('[                 o                  ]')
                print('[        o                           ]')
                print('[-----------------------]')
            if(roll3 == 4):
                print('[----------------------]')
                print('[               o     o           ]')
                print('[               o     o           ]')
                print('[----------------------]')
            if(roll3 == 5):
                print('[-----------------------]')
                print('[             o       o            ]')
                print('[                  o                ]')
                print('[             o       o            ]')
                print('[-----------------------]')
            if(roll3 == 6):
                print('[-----------------------]')
                print('[               o       o          ]')
                print('[               o       o          ]')
                print('[               o       o          ]')
                print('[-----------------------]')
            print('The first number is: ',roll3)
            roll4= random.randint(1,6)
            input()
            print('The second number is: ',roll4)
            #Possible surfaces of die 4
            if(roll4 == 1):
                print('[----------------------]')
                print('[                 o                ]')
                print('[----------------------]')
            if(roll4 == 2):
                print('[-----------------------]')
                print('[                o o                ]')
                print('[-----------------------]')
            if(roll4 == 3):
                print('[-----------------------]')
                print('[                          o         ]')
                print('[                 o                  ]')
                print('[        o                           ]')
                print('[-----------------------]')
            if(roll4 == 4):
                print('[----------------------]')
                print('[               o     o           ]')
                print('[               o     o           ]')
                print('[----------------------]')
            if(roll4 == 5):
                print('[-----------------------]')
                print('[             o       o            ]')
                print('[                  o                ]')
                print('[             o       o            ]')
                print('[-----------------------]')
            if(roll4 == 6):
                print('[-----------------------]')
                print('[               o       o          ]')
                print('[               o       o          ]')
                print('[               o       o          ]')
                print('[-----------------------]')
    #Outcome
            roll5= roll3+roll4
            print('Together that is: ', roll5)
            if(roll5 == roll2):
                print(roll5)
                print('You won.')
                win='win'
                won=won+1
                play= 'again'
                
            if(roll5 == main):
                chance= True
                print('You lost.')
                loose='loose'
                lost=lost+1
                play='again'
            
#User's choice to play again
    if(play == 'again'):
        print(' ')
        print('Enter,-1, to quit.')
        print(' ')
        print('Enter,0, to play again.')
        print(' ')
        play= int(input('Enter your choice: '))
        print(' ')
        print('------------------------------')

#Farewell Message
        if(lost == 'lost') and (play == -1):
            print('You lost: ',loose, 'games')
        if(win == 'win') and (play == -1):
            print('You won: ',won, 'games.')

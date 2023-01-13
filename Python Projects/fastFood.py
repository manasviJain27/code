print("Welcome to Burger King")
print(' ')
#Burgers and Drinks
print('Burgers:\t\t\t\t Drinks:')
print('***********  \t\t\t\t*********')
print('1 - Cheeseburger \t\t        1 - Soft Drink')
print('2 - Veggie Burger \t\t        2 - Orange Juice')
print('3 - Sandwich \t\t\t        3 - Milk')
print(' ')

#Side Orders and Desserts
print('Side Orders: \t\t\t\t Desserts: ')
print('************* \t\t\t\t **********')
print('1 - Fries \t\t\t\t 1 - Apple Pie')
print('2 - Baked Potato Wedges \t\t 2 - Sundae')
print('3 - Vegetarian Salad \t\t\t 3 - Icecream')
print('Please take a moment to read our menu. Press enter to continue ...')
print(' ')
print('Enter 4 if you do not want an item.')
print(' ')

#Order
burger_choice= int(input('Burger choice: '))
drink_choice= int(input('Drink choice: '))
side_order= int(input('Side order choice: '))
dessert_choice= int(input('Dessert choice: '))

#Burgers
#The cal in the variable represents the variable for the calorie value
if(burger_choice == 1):
    burger_cal= int(461)
    burger_choice = str('cheeseburger')
      
elif(burger_choice == 2):
    burger_cal= int(431)
    burger_choice = str('veggie burger')
       
elif(burger_choice == 3):
    burger_cal= int(420)
    burger_choice = str('sandwich')
       
else:
    burger_cal= int(0)
    burger_choice= str('none')
    
#Drinks
if(drink_choice== 1):
    drink_cal= int(100)
    drink_choice= str('soft drink')
      
elif(drink_choice == 2):
    drink_cal= int(57)
    drink_choice= str('orange juice')
       
elif(drink_choice == 3):
    drink_cal= int(70)
    drink_choice = str('milk')
     
else:
    drink_cal=int(0)
    drink_choice= str('none')
       
#Side Orders
if(side_order == 1):
    side_cal= int(130)
    side_order= str('fries')
        
elif(side_order == 2):
    side_cal = int(160)
    side_order = str('cookies')
     
elif(side_order == 3):
    side_cal = int(118)
    side_order = str('soup')
      
else:
    side_cal =int(0)
    side_order = str('none')

#Desserts
if(dessert_choice == 1):
    dessert_cal= int(167)
    dessert_choice = str('apple pie')
    
elif(dessert_choice == 2):
    dessert_cal= int(266)
    dessert_choice = str('sundae')
    
elif(dessert_choice == 3):
    dessert_cal= int(75)
    dessert_choice = str('icecream')
    
else:
    dessert_cal=int(0)
    dessert_choice = str('none')
    
total_calorie= burger_cal + side_cal + drink_cal + dessert_cal

print('Your order: ', burger_choice, drink_choice, side_order, dessert_choice)
print('Calorie count: ', total_calorie, 'calories')

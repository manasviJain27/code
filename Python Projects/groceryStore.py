print("Welcome to Manasvi's Food Store")
print(' ')

print('Enter the amount of each item you would like to buy.')
print(' ')

#num represents the amount of apples
num= int(input('1. How many apples would you like to buy: '))
print(' ')
         
#num1 represents the amount of cookies
num1= int(input('2. How many boxes of cookies would you like: '))
print(' ')

#num2 represents the amount of lettuces
num2= int(input('3. How many lettuces would you like: '))
print(' ')
          
#num3 represents the bags of carrots
num3= int(input('4. How many bags of carrots would you like: '))
print(' ')

#num4 represents the cartons of milk
num4= int(input('5. How many cartons of milk would you like: '))
print(' ')

#Apples
#Cost of apples below
apples= float(2.99)
apples1= apples*num

#apples2 represents the rounded cost of the apples
apples2= round(apples1, 2)
print('Apples: $ ', apples2)
print(' ')

#Cookies
#cost of cookies below
cookies= float(4.99)
cookies1= cookies*num1
#cookies2 represents the rounded cost of the apples
cookies2= round(cookies1, 2)
print('Cookies: $', cookies2)
print(' ')

#Lettuce
#Cost of lettuce below
lettuce= float(3.99)
lettuce1= lettuce*num2

#lettuce2 represents the rounded value of the cost of lettuces
lettuce2= round(lettuce1, 2)
print('Lettuce: $ ', lettuce2)
print(' ')

#Carrots
#cost of carrots below
carrots= float(6.99)
carrots1= carrots*num3

#carrots2 represents the rounded value of the cost of carrots
carrots2= round(carrots1, 2)
print('Carrots: $ ', carrots2)
print(' ')

#Milk
#Cost of milk below
milk= float(5.99)
milk1= milk*num4

#milk2= represents the rounded cost of the cost of carrots
milk2= round(milk1, 2)
print('Milk: $ ', milk2)
print(' ')

#Subtotal
subtotal= apples2+ cookies2+ lettuce2+ carrots2+ milk2
subtotal1= round(subtotal, 2)
print('The subtotal is: $ ', subtotal1)
print(' ')

#Tax
tax= float(subtotal*0.13)
tax2=round(tax, 2)
print('Tax: $', tax2)
print(' ')

#Total
total= tax2+ subtotal
round(total, 2)
print('Total: $ ', total)
print(' ')

pay= float(input('Enter the amount of money you would like to pay: ',))
print(' ')
#If Statements
if(pay < total):
    leftover= total-pay
    leftover1= round(leftover, 2)
    print('You still have to pay: $ ',leftover1)

if (pay > total):
    change= pay-total
    change1= round(change, 2)
    print('You will recieve: $ ', change1)

if (pay == total):
    print('Have a good day')

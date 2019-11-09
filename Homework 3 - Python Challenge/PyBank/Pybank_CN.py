import os
import csv

# Path to collect data from the Resources folder, name the csv and join data
Pybank = os.path.join('..', 'Resources', 'budget_data.csv')

Months = []
Revenue = []
Profitchange = []

with open(Pybank, 'r') as csvfile:
    csvread = csv.reader(csvfile)
    next(csvread, None)

    for row in csvread:
        Months.append(row[0])
        Revenue.append(int(row[1]))
          
    for i in range(len(Revenue)-1):
        Profitchange.append(Revenue[i+1]-Revenue[i])

# The total number of months included in the dataset
total_months = len(Months)
#print(total_months)

# The net total amount of "Profit/Losses" over the entire period
total_revenue = int(sum(Revenue))
#print(total_revenue)

# The average of the changes in "Profit/Losses" over the entire period
average_changes = sum(Profitchange)/len(Profitchange)
#print(average_changes)

# The greatest increase in profits (date and amount) over the entire period
max_increase_value = max(Profitchange)
#print(max_increase_value)
max_increase_month = str(Months[Profitchange.index(max(Profitchange)) + 1]) 
#print(max_increase_month)

#The greatest decrease in losses (date and amount) over the entire period
max_decrease_value = min(Profitchange)
#print(max_decrease_value)
max_decrease_month = str(Months[Profitchange.index(min(Profitchange)) + 1]) 
#print(max_decrease_month)

#Print stuff
print("Financial Analysis")
print("----------------------------")
print(f"Total Months: {(total_months)}")
print(f"Total: ${(total_revenue)}")
print(f"Average Change: ${round(average_changes,2)}")
print(f"Greatest Increase in Profits: {max_increase_month} (${(str(max_increase_value))})")
print(f"Greatest Decrease in Profits: {max_decrease_month} (${(str(max_decrease_value))})")

#Export to text file
output = open("output.txt", "w")

line1 = "Financial Analysis"
line2 = "---------------------"
line3 = (f"Total Months: {(total_months)}")
line4 = (f"Total: ${(total_revenue)}")
line5 = (f"Average Change: ${round(average_changes,2)}")
line6 = (f"Greatest Increase in Profits: {max_increase_month} (${(str(max_increase_value))})")
line7 = (f"Greatest Decrease in Profits: {max_decrease_month} (${(str(max_decrease_value))})")
output.write('{}\n{}\n{}\n{}\n{}\n{}\n{}\n'.format(line1,line2,line3,line4,line5,line6,line7))
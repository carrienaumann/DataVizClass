#You will be give a set of poll data called election_data.csv. 
# The dataset is composed of three columns: Voter ID, County, and Candidate. 
# Your task is to create a Python script that analyzes the votes and calculates each of the following:

import os
import csv

pypoll = os.path.join("..", "Resources","election_data.csv")

# The total number of votes cast 
total_votes = 0

# A complete list of candidates who received votes
candidates = []

# The percentage of votes each candidate won
percent_votes = []

# The total number of votes each candidate won
candidate_votes = []

with open(pypoll, newline = "") as csvfile:
    csvreader = csv.reader(csvfile, delimiter = ",")
    csv_header = next(csvreader)

    #to calculate total votes variable, add a vote (+=), if the candidate isn't in the row yet, 
    # add the candidate name and then add the vote count, othwerise, add the vote for the pre-exising candidate 
    for row in csvreader:
        total_votes += 1 
        
        if row[2] not in candidates:
            candidates.append(row[2])
            index = candidates.index(row[2])
            candidate_votes.append(1)
        else:
            index = candidates.index(row[2])
            candidate_votes[index] += 1
    
    # Now that I have totalled up the candidate votes, I need to get the total percentages in percent_votes list. 
    # x represents the # of my candidate votes list. Calc the % as usual, then round it  (based on example provided, I need 3 decimals places for the %).
    # Once calculated, add the percentage into the percent_votes bucket.
    for x in candidate_votes:
        percentage = (x/total_votes) * 100
        percentage = round(percentage)
        percentage = "%.3f%%" % percentage
        percent_votes.append(percentage)
    
    # Finally, to find the winning candidate, I need to figure out who had the most votes. 
    #To get the person associated with the most votes, use index to see the name that is in the first spot along with the # of votes
    mostvotes = max(candidate_votes)
    #print(mostvotes)
    positionmostvotes = candidate_votes.index(mostvotes)
    winner = candidates[positionmostvotes]
    #print(winner)
   

# Displaying results
print("Election Results")
print("--------------------------")
print(f"Total Votes: {str(total_votes)}")
print("--------------------------")
for i in range(len(candidates)):
    print(f"{candidates[i]}: {str(percent_votes[i])} ({str(candidate_votes[i])})")
print("--------------------------")
print(f"Winner: {winner}")
print("--------------------------")

# Export to file
output = open("Pypoll.txt", "w")
line1 = "Election Results"
line2 = "--------------------------"
line3 = str(f"Total Votes: {str(total_votes)}")
line4 = str("--------------------------")
output.write('{}\n{}\n{}\n{}\n'.format(line1, line2, line3, line4))
for i in range(len(candidates)):
    line = str(f"{candidates[i]}: {str(percent_votes[i])} ({str(candidate_votes[i])})")
    output.write('{}\n'.format(line))
line5 = "--------------------------"
line6 = str(f"Winner: {winner}")
line7 = "--------------------------"
output.write('{}\n{}\n{}\n'.format(line5, line6, line7))
  

seed = 3999

# Generate fuel cell grid
cells = [[int(str(((x + 10 + 1) * (y+1) + seed) * (x + 10 + 1))[-3:-2] or "0") - 5 for x in range(300)] for y in range(300)]

def total_power(cells, gridsize):
	upperbound = len(cells) - gridsize
	winner = ( (0, 0), -10000)

	for y in range(0, upperbound):
		for x in range(0, upperbound):
			total = 0
			for gy in range(0, gridsize):
				for gx in range(0, gridsize):
					total += cells[y + gy][x + gx]

			if total > winner[1]:
				winner = ((x+1, y+1), total)

	return winner


overall_winner = ( (0, 0), -10000, 0)

print(total_power(cells, 3))

for i in range(300):
	print("Checking grid ", i)
	thiswinner = total_power(cells, i)
	
	if thiswinner[1] > overall_winner[1]:
		overall_winner = ( thiswinner[0], thiswinner[1], i )

	print("Current leader: ", overall_winner)

print(overall_winner)
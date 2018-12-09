#!/usr/bin/env python 

players = 438
last = 71626

# Initialise scores
scores = [0] * players
# Init the marble ring
ring = [0]
currentMarble = 0

for turn in range(1, last + 1):
	player = (turn - 1) % players

	# Marble is a multiple of 23
	if not turn % 23:
		currentMarble = (currentMarble - 7 + len(ring)-1) % (len(ring)) + 1
		scores[player] += turn + ring.pop(currentMarble)
	else:
		insertIndex = (currentMarble + 2 - 1) % (len(ring)) + 1
		# if insertIndex > 0:
		ring.insert(insertIndex, turn)
		currentMarble = insertIndex
		# else:
		# 	ring.append(turn)
		# 	currentMarble = len(ring) - 1

print("Winning elf scored", max(scores))
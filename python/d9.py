#!/usr/bin/env python 

import collections

players = 438
last = 7162600

# Initialise scores
scores = [0] * players
# Init the marble ring
ring = collections.deque([0])
currentMarble = 0

for turn in range(1, last + 1):
	player = (turn - 1) % players

	# Marble is a multiple of 23
	if not turn % 23:
		ring.rotate(-7)
		scores[player] += turn + ring.pop()
	else:
		insertIndex = (currentMarble + 2 - 1) % (len(ring)) + 1
		ring.rotate(2)
		ring.append(turn)

print("Winning elf scored", max(scores))
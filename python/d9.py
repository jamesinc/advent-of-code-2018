#!/usr/bin/env python 

import collections

players = 438
last = 7162600

# Initialise scores
scores = [0] * players
# Init the marble ring
ring = collections.deque([0])

for turn in range(1, last + 1):
	# If marble is a multiple of 23
	if not turn % 23:
		ring.rotate(-7)
		scores[(turn - 1) % players] += turn + ring.pop()
	else:
		ring.rotate(2)
		ring.append(turn)

print("Winning elf scored", max(scores))
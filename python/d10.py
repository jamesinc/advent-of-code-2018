
from collections import deque

# This script works on the assumption that that answer will be found at the point
# where the bounding box area of all points is at its smallest.

# For the sake of completing the challenge quickly, I took the results generated by the
# script and chucked them into this scatter plot generator: https://plot.ly/create/
# (this script has been updated to include an ASCII-art printer for the commandline)

def generate(frame):
	positions = list()
	# Calculate the bounds of all points
	for px, py, vx, vy in data:
		positions.append( (px + (vx * frame), py + (vy * frame)) )

	bounds = (
		min(positions, key = lambda p: p[0])[0],
		min(positions, key = lambda p: p[1])[1],
		max(positions, key = lambda p: p[0])[0],
		max(positions, key = lambda p: p[1])[1],
	)

	area = (bounds[3] - bounds[1]) * (bounds[2] - bounds[0])

	return (positions, bounds, area)

def ascii_art(bounds, positions):
	width = bounds[2] - bounds[0] + 1
	height = bounds[3] - bounds[1] + 1

	grid = [[" "] * width for i in range(height)]

	for coords in positions:
		print("Placing", coords[0]-bounds[0], coords[1]-bounds[1])
		grid[coords[1] - bounds[1]][coords[0] - bounds[0]] = "#"

	for line in grid:
		print("".join(line))

# Read data
with open('d10data.txt', 'r') as f:
	file = f.read()


data = list()
# Parse to list. It's a fixed-width format! The ATO would approve.
for line in file.split("\n"):
	px = int(line[10:16])
	py = int(line[18:24])
	vx = int(line[36:38])
	vy = int(line[40:42])

	data.append((px, py, vx, vy))

bailout_frame = 100000
minarea = (999999999999999, 0)

for frame in range(bailout_frame):
	positions, bounds, area = generate(frame)

	if area < minarea[0]:
		minarea = (area, frame)

	if frame >= minarea[1] + 100:
		# We have moved 100 frames since we last found a minimum area
		# Assume we have found the solution about 100 frames back
		# print("Plot is smallest at frame:", minarea[1])
		break

positions, bounds, area = generate(minarea[1])


ascii_art( bounds, positions )
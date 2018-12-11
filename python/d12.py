
with open('d12data.txt', 'r') as f:
	file = f.read()

lines = file.split("\n")
# print(lines.pop(0))
state = lines.pop(0).split(":")[1].strip()
transforms = [(p[0], p[1]) for p in (line.split(" => ") for line in lines[1:])]

generations = 20
offset = 0

def get_state(state, pos):
	compare = [''] * 5

	compare[0] = state[pos - 2] or '.'
	compare[1] = state[pos - 1] or '.'
	compare[2] = state[pos]
	compare[3] = state[pos + 1] or '.'
	compare[4] = state[pos + 2] or '.'

	return compare

def new_state(initial_state, transforms):

	nstate = initial_state

	# Find the matching transform
	for tfm in transforms:
		if tfm[0] == initial_state:
			nstate[2] = tfm[1]
			break

	return nstate

# print("Initial state:")
# print(state)

for gen in range(generations):
	# new_state = ''
	# Iterate through state and set thingos
	for pos in range(len(state)):
		istate = get_state(state, pos)
		state[pos - 2: pos + 2] = new_state(istate, transforms)

	print(state)
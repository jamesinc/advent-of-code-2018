#!/usr/bin/env python 

def getTreeSize( node ):
	return 2 + len(node["metadata"]) + sum([ getTreeSize(child) for child in node["children"] ])

metadataSum = 0

# We need to work our way to the bottom of the tree and then build out from there
# So recurse in to find nodes with no children, then traverse siblings, then move out
# and continue that process
def generateNodes( header, body ):
	childNodeCount = header[0]
	metadataLength = header[1]
	global metadataSum

	if len(body[-metadataLength:]) != metadataLength:
		print "Needed %s but got %s from %s" % (metadataLength, len(body[-metadataLength:]), len(body))

	if childNodeCount == 0:
		metadataSum += sum(body[0:metadataLength])

		return {
			"header": header,
			"metadata": body[0:metadataLength],
			"children": [ ],
			"size": len(header) + len(body[0:metadataLength])
		}		
	else:
		offset = 0
		childNodes = [ ]
		# To know where one child ends and the next begins, we need to know the total amount of data
		while len(childNodes) != childNodeCount:
			# We pass in everything (even though it might include a sibling's data)
			childNodes.append(generateNodes(body[offset:offset+2], body[offset+2:-metadataLength]))
			offset += childNodes[-1]["size"]

		metadataSum += sum(body[-metadataLength:])

		return {
			"header": header,
			"metadata": body[-metadataLength:],
			"children": childNodes,
			"size": len(header) + len(body[-metadataLength:]) + sum([child["size"] for child in childNodes])
		}

# Read data
with open('d8data.txt', 'r') as f:
	file = f.read()

# Parse to list
data = [int(x) for x in file.split()]

tree = generateNodes( data[0:2], data[2:] )

# print(tree)

print("Data size: %s" % len(data))
print("Tree size: %s" % getTreeSize(tree))

# Recurse the tree, adding up metadata entries
print( "Summed metadata: %s" % metadataSum )

from GraphBuilder import *
from JsBuilder import *
import sys

def buildGraph(path):
    print "building graph for path:" + path
    builder = GraphBuilder()
    return builder.build(path)

def buildJs(path, nodes, startFrom, prefix):
    jsBuilder = JsBuilder()
    jsBuilder.build(path, nodes, startFrom, prefix)

if len(sys.argv) < 5:
    print """Not enough arguments
    Usage: python builder.py [pathToScanForJS] [pathToScanForJspOrHtmlOrPy] [stringToStartJsPathFrom] [prefix]
    """
    sys.exit()

nodes = buildGraph(sys.argv[1] + '/');
buildJs(sys.argv[2] + '/', nodes, sys.argv[3], sys.argv[4])

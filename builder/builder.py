from GraphBuilder import *
from JsBuilder import *
import sys

def buildGraph(path):
    print "building graph for path:" + path
    builder = GraphBuilder()
    return builder.build(path)

def buildJs(path, nodes):
    jsBuilder = JsBuilder()
    jsBuilder.build(path,nodes)

if len(sys.argv) < 3:
    print "Not enough arguments"
    sys.exit()

nodes = buildGraph(sys.argv[1] + '/');
buildJs(sys.argv[2] + '/',nodes)
from Node import *
from os import listdir
from os.path import isfile, join, isdir
import re
import glob
import fnmatch

from Tools import *

class GraphBuilder:
    def __init__(self):
        #self.fileList = []
        self.excludeList = ["/i18n/"]
        self.includeList = []
        self.nodeMap = {}
        self.nodeList = []
        self.sortedNodeList = []
       
    
    def findChildren(self, node):
        for k in self.nodeMap:
            childNode = self.nodeMap[k]
            if node.name in childNode.depends:
                node.appendChild(childNode)
                print "adding child " + node.name + " --> " + childNode.name 
                self.findChildren(childNode)
    
    def _buildSorted(self):
        movedNodes = []
        for node in self.nodeList:
            foundDeps = 0
            toRemove = []
            for dep in node.depends:
                for sortedNode in self.sortedNodeList:
                    if dep == sortedNode.name:
                        toRemove.append(sortedNode.name)
            for dep in set(toRemove):
                node.depends.remove(dep)
            if len(node.depends) == 0:
                movedNodes.append(node)
        for node in movedNodes:
            #print "removing: " + str(node) + " found: " + str(foundDeps)
            self.nodeList.remove(node)
            self.sortedNodeList.append(node)
        return len(movedNodes)
    
    def build(self, path):
            jsList = getList(path, "*.js", self.excludeList)
            self.nodeMap = {}
            self.nodeList = []
            for f in jsList:
                node = Node(f)
                self.nodeMap[node.name] = node
                self.nodeList.append(node)
                
            heads = []
            for k in self.nodeMap:
                if self.nodeMap[k].isIndependent():
                    heads.append(self.nodeMap[k])
            
            self.sortedNodeList = []
            print "Calling first"
            while (self._buildSorted() > 0):
                pass

            if len(self.nodeList) > 0:
                print "Error, can't resolve, or cyclic dependency in:" + str(self.nodeList)
            return self.sortedNodeList
            
           
            
            
            
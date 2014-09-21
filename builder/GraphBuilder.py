from Node import *
from os import listdir
from os.path import isfile, join, isdir
import re
import glob
import fnmatch

class GraphBuilder:
    def __init__(self):
        #self.fileList = []
        self.excludeList = ["/i18n/"]
        self.includeList = []
        self.nodeMap = {}
    
    def getList(self, path, filter = "*", excludeList = []):
        result = []
        files = listdir(path)
        for f in files:
            fileName = path + f
            match = False
            for excludeString in excludeList:
                if re.search(excludeString, fileName):
                    print "Ignoring " + fileName
                    match = True
                    break
            if match:
                continue
            if isdir(fileName):
                result += self.getList(fileName + "/", filter, excludeList)
            else:
                result.append(fileName)
        return fnmatch.filter(result, filter)
        
    def makeNode(self, fileName):
        return Node(".".join(fileName.split("/")[-1].split(".")[0:-1]), fileName)
    
    def findChildren(self, node):
        for k in self.nodeMap:
            childNode = self.nodeMap[k]
            if node.name in childNode.depends:
                node.appendChild(childNode)
                print "adding child " + node.name + " --> " + childNode.name 
                self.findChildren(childNode)
                 
    def build(self, path):
            jsList = self.getList(path, "*.js", self.excludeList)
            self.nodeMap = {}
            for f in jsList:
                node = self.makeNode(f)
                self.nodeMap[node.name] = node
                node.loadDeps()
            heads = []
            for k in self.nodeMap:
                if self.nodeMap[k].isIndependent():
                    heads.append(self.nodeMap[k])
            
            for node in heads:
                self.findChildren(node)
            list = []
            for node in heads:
                list.append(node)
                list += node.buildChildList()
            print list
            
            
            
            
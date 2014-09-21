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
    
    def build(self, path):
            jsList = self.getList(path, "*.js", self.excludeList)
            nodeMap = {}
            for f in jsList:
                node = self.makeNode(f)
                nodeMap[node.name] = node
                node.loadDeps()
            #print nodeMap
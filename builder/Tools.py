from os import listdir
from os.path import isfile, join, isdir
import re
import fnmatch

class Tools:
    @staticmethod
    def fread(file):
        f = open(file)
        data = f.read()
        f.close()
        return data
    
def getList(path, filter = "*", excludeList = []):
        #print "getting file list: %s, %s" % (path, filter)
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
                result += getList(fileName + "/", filter, excludeList)
            else:
                result.append(fileName)
        return fnmatch.filter(result, filter)
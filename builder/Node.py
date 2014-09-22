from Tools import *
import re
class Node:
    def __init__(self, file):
        self.name = ".".join(file.split("/")[-1].split(".")[0:-1])
        self.file = file
        self.children = []
        self.depends = []
        self.load()
        
        
    def load(self):
        data = Tools.fread(self.file)
        #-------------------------------------------- if "@@@dependsOn" in data:
            #------- result = re.search("\@\@\@dependsOn:([ A-Za-z0-9]+)", data)
            #---------------------- self.depends.append(result.group(1).strip())
        #----------------------------------------------- if self.name != "Util":
            #----------------------------------------- if "Util.extend" in data:
                # result = re.search("Util.extend[ ]{0,1}\\(([ A-Za-z0-9]+),([ A-Za-z0-9]+)\\)", data)
                #------------------ self.depends.append(result.group(2).strip())
        self.depends += self.findTagValues("\@\@\@dependsOn:([ A-Za-z0-9]+)", data, True)
        if "Util.extend" in data:
            self.depends += self.findTagValues("Util.extend[ ]{0,1}\\([ A-Za-z0-9]+,([ A-Za-z0-9]+)\\)", data, True)
        self.name = self.findOneTag("\@\@\@name:([ A-Za-z0-9]+)", data, self.name)
        self.name = self.findOneTag("\@\@\@namePreffix:([ A-Za-z0-9]+)", data, "") + self.name
        self.name += self.findOneTag("\@\@\@nameSuffix:([ A-Za-z0-9]+)", data, "")
        
    def appendChild(self, child):
        self.children.append(child)
    
    def isIndependent(self):
        return len(self.depends) == 0
    
    def buildChildList(self):
        result = self.children
        for child in self.children:
            result += child.buildChildList()
        return result
    
    def __str__(self):
        return self.name + ":" + self.file + " depends:" + ",".join(self.depends)
    
    def __repr__(self):
        return "[Node:" + self.__str__() + "]"
    
    def findTagValues(self, tag, data, returnEmpty = False):
        result = re.findall(tag, data)
        if len(result) == 0:
            if returnEmpty:
                return []
            return False
        lastResult = []
        for occurance in result:
             lastResult.append(occurance.strip())
        return lastResult
    
    def findOneTag(self, tag, data, default = False):
        res = self.findTagValues(tag, data)
        if (res):
            return res[0]
        return default
        

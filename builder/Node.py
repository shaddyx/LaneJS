from Tools import *
import re
class Node:
    def __init__(self, name, file):
        self.name = name
        self.file = file
        self.children = []
        self.depends = []
        
    def loadDeps(self):
        data = Tools.fread(self.file)
        if "@@@dependsOn" in data:
            result = re.search("\@\@\@dependsOn:([ A-Za-z0-9]+)", data)
            self.depends.append(result.group(1).strip())
        if self.name != "Util":
            if "Util.extend" in data:
                result = re.search("Util.extend[ ]{0,1}\\(([ A-Za-z0-9]+),([ A-Za-z0-9]+)\\)", data)
                self.depends.append(result.group(2).strip())
    def appendChild(self, child):
        self.children.append(child)
    
    def __str__(self):
        return self.name + ":" + self.file + " depends:" + ",".join(self.depends)
    
    def __repr__(self):
        return "[Node:" + self.__str__() + "]"
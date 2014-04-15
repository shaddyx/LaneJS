'''
Created on Jun 3, 2013

@author: "Anatolii Yakushko"
'''
import os
class FileTools:
    cache={}
    @staticmethod
    def fileGetContents(name,cache=False):
        """
            returns contents of a file
        """
        if cache and FileTools.cache.has_key(name):
            return FileTools.cache[name]
            
        f=open(name,"r")
        data = f.read()
        f.close()
        if cache:
            FileTools.cache[name] = data
        return data
    @staticmethod
    
    def filePutContents(name,data):
        f=open(name,"w+")
        f.write(data)
        f.close()
        
    @staticmethod    
    def readDir(d, recursive = True, arr = False):
        if not arr: arr = []
        content = os.listdir(d)
        for k in content:
            f = d + "/" + k
            if os.path.isfile(f):
                arr.append(f)
            elif recursive:
                FileTools.readDir(f, True, arr)
        return arr
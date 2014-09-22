from Tools import *

class JsBuilder:
    excludeList = []
    def build(self, path, nodeList):
        
        files = []
        lines = []
        for node in nodeList:
            files.append(node.file)
            lines.append("""<script type="text/javascript" src="%s"></script>""" % (node.file))
        print "\t\n".join(lines)
            
        
        list = []
        list += getList(path, "*.jsp", self.excludeList)
        list += getList(path, "*.java", self.excludeList)
        list += getList(path, "*.html", self.excludeList)
        list += getList(path, "*.htm", self.excludeList)
        list += getList(path, "*.py", self.excludeList)
        
        print list
        
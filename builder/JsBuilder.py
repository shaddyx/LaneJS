from Tools import *
includeTag = "<!-- includeLane -->"
includeCloseTag = "<!-- /includeLane -->"
joiner = "    \n"
class JsBuilder:
    excludeList = []
    def build(self, path, nodeList, startFrom, prefix):
        
        files = []
        lines = []
        for node in nodeList:
            files.append(node.file)
            lines.append("""<script type="text/javascript" src="%s"></script>""" % (prefix + node.file[node.file.find(startFrom):]))
            
        
        list = []
        list += getList(path, "*.jsp", self.excludeList)
        list += getList(path, "*.java", self.excludeList)
        list += getList(path, "*.html", self.excludeList)
        list += getList(path, "*.htm", self.excludeList)
        list += getList(path, "*.py", self.excludeList)
        
        for file in list:
            data = Tools.fread(file)
            if includeTag in data and includeCloseTag in data:
                data = data[:data.find(includeTag) + len(includeTag)] + "\n" + joiner.join(lines) + joiner + data[data.find(includeCloseTag):]
                f = open(file, "w+")
                f.write(data)
                f.close()
            #print data
        
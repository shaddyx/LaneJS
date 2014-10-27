from Tools import *
joiner = "    \n"
class JsBuilder:
    excludeList = []
    def build(self, path, nodeList, startFrom, prefix, tagName):
        includeTag = "<!-- %(tagName)s -->"
        includeCloseTag = "<!-- /%(tagName)s -->"
        
        includeTag = includeTag % {"tagName":tagName}
        includeCloseTag = includeCloseTag % {"tagName":tagName}
        print "Building js with tags: %(includeTag)s and %(includeCloseTag)s" %{"includeTag":includeTag, "includeCloseTag":includeCloseTag}
        files = []
        lines = []
        for node in nodeList:
            files.append(node.file)
            if (node.file.find(startFrom) != -1):
                lines.append("""<script type="text/javascript" src="%s"></script>""" % (prefix + node.file[node.file.find(startFrom):]))
            else:
                pass
                #print "file is not in path:" + str(node)
            
        
        list = []
        list += getList(path, "*.jsp", self.excludeList)
        list += getList(path, "*.gsp", self.excludeList)
        list += getList(path, "*.java", self.excludeList)
        list += getList(path, "*.html", self.excludeList)
        list += getList(path, "*.htm", self.excludeList)
        list += getList(path, "*.py", self.excludeList)
        
        for file in list:
            data = Tools.fread(file)
            if includeTag in data and includeCloseTag in data:
                print "changing file:" + file
                data = data[:data.find(includeTag) + len(includeTag)] + "\n" + joiner.join(lines) + joiner + data[data.find(includeCloseTag):]
                f = open(file, "w+")
                f.write(data)
                f.close()
            #print data
        
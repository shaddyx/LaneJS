from Tools import *
includeTag = "<!-- includeLane -->
<script type="text/javascript" src="<%=path%>/resources/js/LaneJS/lane/js/lzw.js"></script>    
<script type="text/javascript" src="<%=path%>/resources/js/LaneJS/lane/js/CoreException.js"></script>    
<script type="text/javascript" src="<%=path%>/resources/js/LaneJS/lane/js/Constants.js"></script>    
<script type="text/javascript" src="<%=path%>/resources/js/LaneJS/lane/js/SpeedUtil.js"></script>    
<script type="text/javascript" src="<%=path%>/resources/js/LaneJS/lane/js/Util/SpeedUtil.js"></script>    
<script type="text/javascript" src="<%=path%>/resources/js/LaneJS/lane/js/Util/Util.js"></script>    
<script type="text/javascript" src="<%=path%>/resources/js/LaneJS/lane/js/Util/LocalStorage.js"></script>    
<script type="text/javascript" src="<%=path%>/resources/js/LaneJS/lane/js/BrowserProperties.js"></script>    
<script type="text/javascript" src="<%=path%>/resources/js/LaneJS/lane/js/3rdParty/excanvas.js"></script>    
<script type="text/javascript" src="<%=path%>/resources/js/LaneJS/lane/js/3rdParty/json2.js"></script>    
<script type="text/javascript" src="<%=path%>/resources/js/LaneJS/lane/js/3rdParty/jquery.js"></script>    
<script type="text/javascript" src="<%=path%>/resources/js/LaneJS/lane/js/3rdParty/Chart.js"></script>    
<script type="text/javascript" src="<%=path%>/resources/js/LaneJS/lane/js/Types.js"></script>    
<script type="text/javascript" src="<%=path%>/resources/js/LaneJS/lane/js/BaseObject.js"></script>    
<script type="text/javascript" src="<%=path%>/resources/js/LaneJS/lane/js/3rdParty/jqGrid.js"></script>    
<script type="text/javascript" src="<%=path%>/resources/js/LaneJS/lane/js/3rdParty/jquery-ui.js"></script>    
<script type="text/javascript" src="<%=path%>/resources/js/LaneJS/lane/js/BoxElement/BoxElement.js"></script>    
<script type="text/javascript" src="<%=path%>/resources/js/LaneJS/lane/js/Collections/BasicCollection.js"></script>    
<script type="text/javascript" src="<%=path%>/resources/js/LaneJS/lane/js/Collections/BasicMap.js"></script>    
<script type="text/javascript" src="<%=path%>/resources/js/LaneJS/lane/js/Collections/BasicList.js"></script>    
<script type="text/javascript" src="<%=path%>/resources/js/LaneJS/lane/js/FormElements/FormElement.js"></script>    
<script type="text/javascript" src="<%=path%>/resources/js/LaneJS/lane/js/FormElements/TimeGraph/TimeGraphRuler.js"></script>    
<script type="text/javascript" src="<%=path%>/resources/js/LaneJS/lane/js/FormElements/TimeGraph/TimeGraphBar.js"></script>    
<script type="text/javascript" src="<%=path%>/resources/js/LaneJS/lane/js/FormElements/TimeGraph/TimeGraphCaption.js"></script>    
<script type="text/javascript" src="<%=path%>/resources/js/LaneJS/lane/js/FormElements/TreeNode.js"></script>    
<script type="text/javascript" src="<%=path%>/resources/js/LaneJS/lane/js/FormElements/Grid/GridColumn.js"></script>    
<script type="text/javascript" src="<%=path%>/resources/js/LaneJS/lane/js/FormElements/Grid/GridRow.js"></script>    
<script type="text/javascript" src="<%=path%>/resources/js/LaneJS/lane/js/FormElements/Grid/GridCell.js"></script>    
<script type="text/javascript" src="<%=path%>/resources/js/LaneJS/lane/js/FormElements/Grid/JqGridColumn.js"></script>    
<script type="text/javascript" src="<%=path%>/resources/js/LaneJS/lane/js/Browser.js"></script>    
<script type="text/javascript" src="<%=path%>/resources/js/LaneJS/lane/js/Data/DataSource.js"></script>    
<script type="text/javascript" src="<%=path%>/resources/js/LaneJS/lane/js/Dialogs.js"></script>    
<script type="text/javascript" src="<%=path%>/resources/js/LaneJS/lane/js/BoxElement/BoxElementEvents.js"></script>    
<script type="text/javascript" src="<%=path%>/resources/js/LaneJS/lane/js/BoxElement/BoxElementPropertyManager.js"></script>    
<script type="text/javascript" src="<%=path%>/resources/js/LaneJS/lane/js/BoxElement/BoxElementRenderManager.js"></script>    
<script type="text/javascript" src="<%=path%>/resources/js/LaneJS/lane/js/BoxElement/BoxElementRedrawManager.js"></script>    
<script type="text/javascript" src="<%=path%>/resources/js/LaneJS/lane/js/BoxElement/BoxElementCore.js"></script>    
<script type="text/javascript" src="<%=path%>/resources/js/LaneJS/lane/js/BoxElement/BoxElementProperties.js"></script>    
<script type="text/javascript" src="<%=path%>/resources/js/LaneJS/lane/js/Collections/ElementMap.js"></script>    
<script type="text/javascript" src="<%=path%>/resources/js/LaneJS/lane/js/Collections/TypedMap.js"></script>    
<script type="text/javascript" src="<%=path%>/resources/js/LaneJS/lane/js/skins/Panel.js"></script>    
<script type="text/javascript" src="<%=path%>/resources/js/LaneJS/lane/js/skins/TabBar.js"></script>    
<script type="text/javascript" src="<%=path%>/resources/js/LaneJS/lane/js/skins/ChartField.js"></script>    
<script type="text/javascript" src="<%=path%>/resources/js/LaneJS/lane/js/skins/ChartLegend.js"></script>    
<script type="text/javascript" src="<%=path%>/resources/js/LaneJS/lane/js/skins/Image.js"></script>    
<script type="text/javascript" src="<%=path%>/resources/js/LaneJS/lane/js/skins/DirectDropDown.js"></script>    
<script type="text/javascript" src="<%=path%>/resources/js/LaneJS/lane/js/skins/FloatingContainer.js"></script>    
<script type="text/javascript" src="<%=path%>/resources/js/LaneJS/lane/js/skins/Label.js"></script>    
<script type="text/javascript" src="<%=path%>/resources/js/LaneJS/lane/js/skins/TimeGraph.js"></script>    
<script type="text/javascript" src="<%=path%>/resources/js/LaneJS/lane/js/skins/CheckBox.js"></script>    
<script type="text/javascript" src="<%=path%>/resources/js/LaneJS/lane/js/skins/FieldSet.js"></script>    
<script type="text/javascript" src="<%=path%>/resources/js/LaneJS/lane/js/skins/MenuItem.js"></script>    
<script type="text/javascript" src="<%=path%>/resources/js/LaneJS/lane/js/skins/RadioButton.js"></script>    
<script type="text/javascript" src="<%=path%>/resources/js/LaneJS/lane/js/skins/Span.js"></script>    
<script type="text/javascript" src="<%=path%>/resources/js/LaneJS/lane/js/skins/Tab.js"></script>    
<script type="text/javascript" src="<%=path%>/resources/js/LaneJS/lane/js/skins/Window.js"></script>    
<script type="text/javascript" src="<%=path%>/resources/js/LaneJS/lane/js/skins/PopupMenu.js"></script>    
<script type="text/javascript" src="<%=path%>/resources/js/LaneJS/lane/js/skins/TreeList.js"></script>    
<script type="text/javascript" src="<%=path%>/resources/js/LaneJS/lane/js/skins/Dialogs.js"></script>    
<script type="text/javascript" src="<%=path%>/resources/js/LaneJS/lane/js/skins/Splitter.js"></script>    
<script type="text/javascript" src="<%=path%>/resources/js/LaneJS/lane/js/skins/Grid.js"></script>    
<script type="text/javascript" src="<%=path%>/resources/js/LaneJS/lane/js/skins/JqGrid.js"></script>    
<script type="text/javascript" src="<%=path%>/resources/js/LaneJS/lane/js/skins/Slider.js"></script>    
<script type="text/javascript" src="<%=path%>/resources/js/LaneJS/lane/js/skins/Canvas.js"></script>    
<script type="text/javascript" src="<%=path%>/resources/js/LaneJS/lane/js/skins/Button.js"></script>    
<script type="text/javascript" src="<%=path%>/resources/js/LaneJS/lane/js/skins/InputBox.js"></script>    
<script type="text/javascript" src="<%=path%>/resources/js/LaneJS/lane/js/skins/TextArea.js"></script>    
<script type="text/javascript" src="<%=path%>/resources/js/LaneJS/lane/js/skins/Container.js"></script>    
<script type="text/javascript" src="<%=path%>/resources/js/LaneJS/lane/js/FormElements/ChartLegend.js"></script>    
<script type="text/javascript" src="<%=path%>/resources/js/LaneJS/lane/js/FormElements/TimeGraph/TimeGraph.js"></script>    
<script type="text/javascript" src="<%=path%>/resources/js/LaneJS/lane/js/FormElements/Input/DirectDropDown.js"></script>    
<script type="text/javascript" src="<%=path%>/resources/js/LaneJS/lane/js/FormElements/Label.js"></script>    
<script type="text/javascript" src="<%=path%>/resources/js/LaneJS/lane/js/FormElements/InputElement.js"></script>    
<script type="text/javascript" src="<%=path%>/resources/js/LaneJS/lane/js/FormElements/MenuItem.js"></script>    
<script type="text/javascript" src="<%=path%>/resources/js/LaneJS/lane/js/FormElements/Splitter.js"></script>    
<script type="text/javascript" src="<%=path%>/resources/js/LaneJS/lane/js/FormElements/Button.js"></script>    
<script type="text/javascript" src="<%=path%>/resources/js/LaneJS/lane/js/FormElements/Grid/JqGridImageColumn.js"></script>    
<script type="text/javascript" src="<%=path%>/resources/js/LaneJS/lane/js/FormElements/Grid/GridTextCell.js"></script>    
<script type="text/javascript" src="<%=path%>/resources/js/LaneJS/lane/js/FormElements/Grid/Grid.js"></script>    
<script type="text/javascript" src="<%=path%>/resources/js/LaneJS/lane/js/FormElements/Grid/JqGrid.js"></script>    
<script type="text/javascript" src="<%=path%>/resources/js/LaneJS/lane/js/FormElements/Container.js"></script>    
<script type="text/javascript" src="<%=path%>/resources/js/LaneJS/lane/js/Util/TextUtils.js"></script>    
<script type="text/javascript" src="<%=path%>/resources/js/LaneJS/lane/js/Data/DataGrid.js"></script>    
<script type="text/javascript" src="<%=path%>/resources/js/LaneJS/lane/js/Data/DataColumn.js"></script>    
<script type="text/javascript" src="<%=path%>/resources/js/LaneJS/lane/js/FormElements/Panel.js"></script>    
<script type="text/javascript" src="<%=path%>/resources/js/LaneJS/lane/js/FormElements/TabBar.js"></script>    
<script type="text/javascript" src="<%=path%>/resources/js/LaneJS/lane/js/FormElements/Input/HourPicker.js"></script>    
<script type="text/javascript" src="<%=path%>/resources/js/LaneJS/lane/js/FormElements/Input/CheckBox.js"></script>    
<script type="text/javascript" src="<%=path%>/resources/js/LaneJS/lane/js/FormElements/Input/Data/DataElement.js"></script>    
<script type="text/javascript" src="<%=path%>/resources/js/LaneJS/lane/js/FormElements/Input/RadioButtonGroup.js"></script>    
<script type="text/javascript" src="<%=path%>/resources/js/LaneJS/lane/js/FormElements/Input/Slider.js"></script>    
<script type="text/javascript" src="<%=path%>/resources/js/LaneJS/lane/js/FormElements/Input/InputBox.js"></script>    
<script type="text/javascript" src="<%=path%>/resources/js/LaneJS/lane/js/FormElements/Input/TextArea.js"></script>    
<script type="text/javascript" src="<%=path%>/resources/js/LaneJS/lane/js/FormElements/FloatingContainer.js"></script>    
<script type="text/javascript" src="<%=path%>/resources/js/LaneJS/lane/js/FormElements/FieldSet.js"></script>    
<script type="text/javascript" src="<%=path%>/resources/js/LaneJS/lane/js/FormElements/Tab.js"></script>    
<script type="text/javascript" src="<%=path%>/resources/js/LaneJS/lane/js/skins/HourPicker.js"></script>    
<script type="text/javascript" src="<%=path%>/resources/js/LaneJS/lane/js/FormElements/Image.js"></script>    
<script type="text/javascript" src="<%=path%>/resources/js/LaneJS/lane/js/FormElements/Input/Data/RadioButton.js"></script>    
<script type="text/javascript" src="<%=path%>/resources/js/LaneJS/lane/js/FormElements/Span.js"></script>    
<script type="text/javascript" src="<%=path%>/resources/js/LaneJS/lane/js/FormElements/Window.js"></script>    
<script type="text/javascript" src="<%=path%>/resources/js/LaneJS/lane/js/FormElements/PopupMenu.js"></script>    
<script type="text/javascript" src="<%=path%>/resources/js/LaneJS/lane/js/FormElements/TreeList.js"></script>    
<script type="text/javascript" src="<%=path%>/resources/js/LaneJS/lane/js/FormElements/Canvas.js"></script>    
<script type="text/javascript" src="<%=path%>/resources/js/LaneJS/lane/js/FormElements/ChartField.js"></script>    
<script type="text/javascript" src="<%=path%>/resources/js/LaneJS/lane/js/FormElements/ChartFieldBackup.js"></script>    
<script type="text/javascript" src="<%=path%>/resources/js/LaneJS/lane/js/FormElements/ChartField1.js"></script>    
<script type="text/javascript" src="<%=path%>/resources/js/LaneJS/lane/js/FormElements/Charts/Curve.js"></script>    
<!-- /includeLane -->"
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
        
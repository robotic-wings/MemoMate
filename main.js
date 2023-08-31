function getWordCount (text) {
    if (text.length === 0) return 0;
    text = text.replaceAll(/\n+/g, " ");
    console.log(text);
    text = text.replaceAll(/\s+/g, " ");
    text = text.trim();
    return text.split(" ").length;        
}

function download(data, filename, type) {
    var file = new Blob([data], {type: type});
    if (window.navigator.msSaveOrOpenBlob) 
        window.navigator.msSaveOrOpenBlob(file, filename);
    else { // Others
        var a = document.createElement("a"),
                url = URL.createObjectURL(file);
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        setTimeout(function() {
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);  
        }, 0); 
    }
}

function getCheckboxState(elem) {
    if (elem.checked)
        return true;
    else
        return false;
}

function setCheckboxState(elem, state) {
    if (state)
        elem.checked = true;
    else
        elem.checked = false;
}

function loadSettings() {
        const l = localStorage;
        // default
        if (l.whiteText == null)
            l.whiteText = "false";
        if (l.fontSize == null)
            l.fontSize = 18;
        if (l.bgColor == null)
            l.bgColor = "#fbf0a0";

        // settings display
        memocolor.value = l.bgColor;
        fontsize.value = l.fontSize;
        const wt = l.whiteText === "true" ? true : false;
        setCheckboxState(document.getElementById("whitetext"), wt);
}
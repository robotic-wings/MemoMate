document.addEventListener("DOMContentLoaded", function () {
    /*** Page load */
    loadSettings();
})

/*** Settings */

openSettings.addEventListener("click", () => settings.style.display = 'block');

closeSettings.addEventListener("click", () => {
    settings.style.display = 'none';
    // revert
    loadSettings();
});

document.getElementById("saveSettings").addEventListener("click", () => {
    const l = localStorage;
    l.whiteText = getCheckboxState(document.getElementById("whitetext"));
    console.log(l.whiteText);
    l.fontSize = fontsize.value;
    l.bgColor = memocolor.value;
    //console.log(l);
    MemosObject.changeStyle(l.bgColor, l.fontSize, l.whiteText);
    alert("Settings saved");
});

/*** Front page */

createMemo.addEventListener("click", () => {
    showEditor();
    MemosObject.items = [""];
    MemosObject.memoIndex = 0;
})


openMemo.addEventListener("change", () => {
    choosenFile = openMemo.files[0];
    if (!choosenFile || choosenFile["name"].split(".").at(-1) != "memo") {
        alert("Invalid MEMO File!");
        return;
    }
    openMemo.files[0].text().then(txt => {
        // check if the txt is a json file
        const arr = JSON.parse(txt);
        if (Array.isArray(arr)) {
            return arr;
        } else {
            throw new Error("The file you selected is not a memo.");
        }
    }).then(arr => {
        for (memo of arr) {
            if (getWordCount(memo) > 140) {
                throw new Error("The memo cannot be opened because one of your memo has surpassed the word limit (140 words).");
            }
        }
        return arr;
    }).then(arr => {
        MemosObject.items = arr;
        MemosObject.memoIndex = 0;
        showEditor();
    }).catch(err => alert(err.message));
})


/** Editor */

function showEditor() {
    editor.style.display = "block";
    frontPage.style.display = "none";
    const l = localStorage;
    MemosObject.changeStyle(l.bgColor, l.fontSize, l.whiteText);
}

ctlPrev.addEventListener("click", () => {
    MemosObject.prev();
})

ctlNext.addEventListener("click", () => {
    MemosObject.next();
})

ctlSave.addEventListener("click", ()=>{
    const items = MemosObject.items;
    for (txt of items) {
        if (getWordCount(txt) > 140) {
            alert("One of your memo has surpassed the word limit (140 words). Please remove some words and try again.");
            return;
        }
    }
    download(JSON.stringify(MemosObject.items),"myMemo.memo", "plain/text");
    alert("Your memo have been saved.");
})
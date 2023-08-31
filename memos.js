const MemosObject = {
    _currentMemoIndex: null,
    // setter has no power to reject arr
    set items(arr) {
        let html = "";
        for (i in arr) {
            html += `
            <div class="memo"><textarea class="memo-content">${arr[i]}</textarea></div>
            `;
        }
        memoTape.innerHTML = html;
        this.changeStyle(this.backgroundColor, this.fontSize, this.whiteText);
    },
    get memoCount() {
        return document.getElementsByClassName("memo-content").length;
    },
    get items() {
        const memoContents = document.getElementsByClassName("memo-content");
        const arr = [];
        for (memo of memoContents) {
            arr.push(memo.value);
        }
        return arr;
    },
    get whiteText() {
        return this._whiteText;
    },
    set whiteText(val) {
        const memoContents = document.getElementsByClassName("memo-content");
        if (val === "true") val = true;
        if (val === "false") val = false;
        for (memo of memoContents) {
            if (val)
                memo.style.color = "white";
            else {
                memo.style.color = "black";
            }
        }
        this._whiteText = val;
    },
    get backgroundColor() {
        return this._backgroundColor;
    },
    set backgroundColor(val) {
        const memoContents = document.getElementsByClassName("memo-content");
        for (memo of memoContents) {
            memo.style.backgroundColor = val;
        }
        this._backgroundColor = val;
    },
    get fontSize() {
        return this._fontSize;
    },
    set fontSize(val) {
        const memoContents = document.getElementsByClassName("memo-content");
        for (memo of memoContents) {
            memo.style.fontSize = val + "px";
        }
        this._fontSize = val;
    },
    get memoIndex() {
        return this._currentMemoIndex;
    },
    set memoIndex(targetMemoIndex) {
        clearInterval(this._currentInterval);
        const that = this;
        const targetTapeLeft = -62.5 * (targetMemoIndex);
        const currentInterval = setInterval(function() {
            const currentTapeLeft = parseFloat(document.getElementById("memoTape").style.left.toString());
            if (currentTapeLeft > targetTapeLeft) {
                memoTape.style.left = (currentTapeLeft - 6.25) + "vw";
            } else if (currentTapeLeft < targetTapeLeft) {
                memoTape.style.left = (currentTapeLeft + 6.25) + "vw";
            } else {
                clearInterval(currentInterval);
                that._currentMemoIndex = targetMemoIndex;
            }
        }, 20);
    },
    prev() {
        if (this.memoIndex>0) {
            this.memoIndex = this._currentMemoIndex-1;
        } else {
            alert("This is the first memo");
        }
        
    },
    next() {
        if (this.memoIndex+1<this.memoCount) {
            this.memoIndex += 1;
        } else if (this.memoIndex+1==this.memoCount && this.items[this.memoIndex].length > 0) {
            this.newMemo();
        } else {
            alert("This is the last memo");
        }
    },
    changeStyle(memoColor, fontSize, whiteText) {
        this.backgroundColor = memoColor;
        this.fontSize = parseInt(fontSize);
        this.whiteText = whiteText;
    },
    newMemo() {
        this.items = this.items.concat("");
        this.memoIndex +=1;
    }
}

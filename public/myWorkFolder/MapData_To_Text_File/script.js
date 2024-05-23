let insert_data = new Map();

const insertBtn = document.getElementById("insert-btn");
insertBtn.addEventListener("click", () => {
    let key = document.getElementById("input_key").value;
    let value = document.getElementById("input_value").value;

    if(!key){
        alert('key is null!!!');
        return;
    }

    insert_data.set(key, value);
    document.getElementById("input_key").value = null;
    document.getElementById("input_value").value = null;
});

const downloadBtn = document.getElementById("download-btn");
downloadBtn.addEventListener("click", () => {
    createTxtFileFromMap(insert_data, "MapDataFile.txt");
});

function createTxtFileFromMap(dataMap, filename) {
    let fileContent = "";
    dataMap.forEach((value, key) => {
        fileContent += `${key} : ${value}\n`;
    });

    const element = document.createElement("a");
    element.setAttribute(
        "href",
        "data:text/plain;charset=utf-8," + encodeURIComponent(fileContent)
    );
    element.setAttribute("download", filename);

    element.style.display = "none";
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
}



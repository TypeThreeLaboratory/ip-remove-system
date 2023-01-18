function doGet(e) {
    const ip = e.parameter.ip;

    const spreadsheet = SpreadsheetApp.openById(SpreadsheetID);
    const sheet = spreadsheet.getSheetByName(SheetName);
    if (removeList(sheet, Cells, ip)) {
        return ContentService.createTextOutput(`${ip} このIPの同意を削除しました`);
    }
    return ContentService.createTextOutput(`${ip} このIPはリストにありませんでした`);
}

function removeList(sheet, calls, ip) {
    const cache = sheet.getRange(calls).getValues();
    let status = false;
    sheet.getRange(calls).setValues(cache.map(item => {
        if (item == ip) {
            status = true;
            return [""];
        } return item;
    }));
    return status;
}
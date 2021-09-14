var selectedRow = null;

function onFormSubmit() {

    if (validate()) {
        var formData = readFormData();
        let getLocalStorage = localStorage.getItem("myData");
        getLocalStorage == null ? arrEntry = [] : arrEntry = JSON.parse(getLocalStorage)
        arrEntry.push(formData);
        localStorage.setItem("myData", JSON.stringify(arrEntry));

        if (selectedRow == null) {
            insertNewRecord(arrEntry);
        }
        // else
        //     updateRecord(formData);

        resetForm();
        var a = document.getElementById("submit");

        a.value = "Submit";
    }
}

function readFormData() {
    var formData = {};
    formData["fullName"] = document.getElementById("fullName").value;
    formData["gender"] = document.getElementById("gender").value;
    formData["status"] = document.getElementById("status").value;
    formData["city"] = document.getElementById("city").value;
    return formData;
}

function insertNewRecord(data) {
    // var table = document.getElementById("employeeList").getElementsByTagName('tbody')[0];
    // var newRow = table.insertRow(table.length);
    // cell1 = newRow.insertCell(0);
    // cell1.innerHTML = data.fullName;
    // cell2 = newRow.insertCell(1);
    // cell2.innerHTML = data.gender;
    // cell3 = newRow.insertCell(2);
    // cell3.innerHTML = data.status;
    // cell4 = newRow.insertCell(3);
    // cell4.innerHTML = data.city;
    // cell4 = newRow.insertCell(4);
    // cell4.innerHTML = `<a onClick="onEdit(this)">Edit</a>
    //                 <a onClick="onDelete(this)">Delete</a>`;
    var hst = document.getElementById("employeeList");
    hst.innerHTML = "<th>Full Name</th><th>Gender</th><th>Status</th><th>City</th><th>action</th>";
    var arr = [];
    var arr = JSON.parse(localStorage.getItem("myData"));
    console.log(arr.length)
    for (var i = 0; i < arr.length; i++) {
        hst.innerHTML += "<tr><td>" + arr[i].fullName + "</td><td>" + arr[i].gender + "</td><td>" + arr[i].status + "</td><td>" + arr[i].city + "</td><td> <a onclick='onEdit(this)'>Edit</a> <a onClick='onDelete(this)'>Delete</a> </td></tr>  ";
    }



    // var localRecord = ["fullName", "gender", "status", "city"];
    // let arr = localStorage.setItem("myData", JSON.stringify(localRecord));
    //     console(localRecord[fullName]);
    //     let data1 = {
    //         fullname: fullName,
    //         gender: gender,
    //         status: status,
    //         city: city,

    //     }
    //     arr.push(data1);
    // // storing our array as a string
    // localStorage.setItem("myData", JSON.stringify(arr));
    //  console.log(localRecord)
    // // retrieving our data and converting it back into an array
    // var retrievedData = localStorage.getItem("myData");
    // var localRecord1 = JSON.parse(retrievedData);         

}

function resetForm() {
    document.getElementById("fullName").value = "";
    document.getElementById("gender").value = "";
    document.getElementById("status").value = "";
    document.getElementById("city").value = "";
    selectedRow = null;
}

function onEdit(td) {
    selectedRow = td.parentElement.parentElement;
    document.getElementById("fullName").value = selectedRow.cells[0].innerHTML;
    document.getElementById("gender").value = selectedRow.cells[1].innerHTML;
    document.getElementById("status").value = selectedRow.cells[2].innerHTML;
    document.getElementById("city").value = selectedRow.cells[3].innerHTML;
    var a = document.getElementById("submit");

    a.value = "Update";

}
function updateRecord(formData) {
    selectedRow.cells[0].innerHTML = formData.fullName;
    selectedRow.cells[1].innerHTML = formData.gender;
    selectedRow.cells[2].innerHTML = formData.status;
    selectedRow.cells[3].innerHTML = formData.city;
}

function onDelete(td) {
    if (confirm('Are You serious to delete this data 😡 ?')) {
        row = td.parentElement.parentElement;
        document.getElementById("employeeList").deleteRow(row.rowIndex);
        resetForm();
    }
}
function validate() {
    isValid = true;
    if (document.getElementById("fullName").value == "") {
        isValid = false;
        document.getElementById("fullNameValidationError").classList.remove("hide");
    } else {
        isValid = true;
        if (!document.getElementById("fullNameValidationError").classList.contains("hide"))
            document.getElementById("fullNameValidationError").classList.add("hide");
    }
    return isValid;
}

var lastId = people.list[people.list.length-1].id
for (let i = 0; i < people.list.length; i++) {
    const element = people.list[i];
    var comp;
    for (let j = 0; j < companies.list.length; j++) {
        const object = companies.list[j];
        if (object.id==element.companyCode) {
            comp = object.name;
            break;
        }
    }

    $('#table').append(`<tr id="row-${element.id}">
    <td>${element.id}</td><td>${element.firstName}</td>
<td>${element.lastName}</td><td>${element.email}</td>
<td>${element.gender}</td><td>${comp}</td>
<td><button onclick="editar('row-${element.id}')">edit</button></td>
<td><button onclick="eliminar('row-${element.id}')">delete</button></td></tr>`);
}
function crear(){
    var comp;
    for (let j = 0; j < companies.list.length; j++) {
        const object = companies.list[j];
        if (object.id==$("#company").val()) {
            comp = object.name;
            break;
        }
    }
    if($('#id').val()==""){
        people.list.push({id:lastId+1, firstName:$("#firstName").val(),
         lastName:$("#lastName").val(), email:$("#email").val(),
         gender:$("#gender").val(), companyCode:$("#company").val()})
        $('#table').append(`<tr id="row-${lastId+1}"><td>${lastId+1}</td>
        <td>${$("#firstName").val()}</td><td>${$("#lastName").val()}</td>
        <td>${$("#email").val()}</td><td>${$("#gender").val()}</td>
        <td>${comp}</td>
        <td><button onclick="editar('row-${lastId+1}')">edit</button></td>
        <td><button onclick="eliminar('row-${lastId+1}')">delete</button></td></tr>`);
        lastId++;
    }
    else {
        people.list[window.editIndex].firstName = $("#firstName").val();
        people.list[window.editIndex].lastName = $("#lastName").val();
        people.list[window.editIndex].email = $("#email").val();
        people.list[window.editIndex].gender = $("#gender").val();
        people.list[window.editIndex].company = $("#company").val();
        $(`#row-${people.list[window.editIndex].id}`).html(`
        <td>${people.list[window.editIndex].id}</td>
        <td>${$("#firstName").val()}</td>
        <td>${$("#lastName").val()}</td>
        <td>${$("#email").val()}</td>
        <td>${$("#gender").val()}</td>
        <td>${comp}</td>
        <td><button onclick="editar('row-${people.list[window.editIndex].id}')">edit</button></td>
        <td><button onclick="eliminar('row-${people.list[window.editIndex].id}')">delete</button></td>`)
    
    }
};
function editar(idRow) {
    var peop;
    let idEdit = parseInt(idRow.split("-")[1]);
    for (let i = 0; i < people.list.length; i++) {
        const element = people.list[i];
        if (element.id==idEdit) {
            peop = element;
        $('#id').val(peop.id);
        $('#firstName').val(peop.firstName);
        $('#lastName').val(peop.lastName);
        $('#email').val(peop.email);
        $('#gender').val(peop.gender);
        $('#company').val(peop.companyCode);
        window.editIndex = i;
        } 
    }
}
function borrar() {
    $('#id').val("")
    $('#firstName').val("");
    $('#lastName').val("");
    $('#email').val("");
    $('#gender').val("");
    $('#company').val("");
}
function eliminar(idRow){
    var peop;
    let idDelete = parseInt(idRow.split("-")[1]);
    for (let i = 0; i < people.list.length; i++) {
        const element = people.list[i];
        if (element.id==idDelete) {
            peop = element;
            $(`#row-${peop.id}`).remove();
            people.list.splice(i, 1);
        }
    }
    borrar();
}
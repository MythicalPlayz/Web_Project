function validate(val){
    if (typeof val === 'string' ){
        return val.length >= 2;
    }
    if (typeof val === 'number'){
        return val >= 0;
    }
    return true;
}

const submitButton = document.getElementById('submit')
const updateButton = document.getElementById('update')

function val(){
    let name = document.getElementById('name').value;
    let id = document.getElementById('id').value;
    let status = (document.getElementById('status').value === 'Open') ? true : false;
    let xp = parseInt(document.getElementById('xp').value);
    let desc = document.getElementById('description').value;
    let salary = parseInt(document.getElementById('salary').value);

    if (!validate(name) || !validate(id) || !validate(name) || !validate(status) || !validate(xp) || !validate(desc) || !validate(salary)){
        alert('Invalid Input');
        return 0;
    }
}
if (submitButton)
    submitButton.addEventListener('click', function() {
        val()
    })

if (updateButton)
updateButton.addEventListener('click', function() {
    val()
})
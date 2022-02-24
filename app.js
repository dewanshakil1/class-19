const skills = document.querySelector('#skill_list');
const devs_add_form = document.querySelector('#devs_add_form');
const devs_edit_form = document.querySelector('#devs_edit_form');
const devs_data_list = document.querySelector('#devs_data_list');
const devs_edit_btns = document.querySelectorAll('.devs_edit_btn');

//  form api
const loadS = () => {
    axios.get("http://localhost:5050/skill").then(skill => {


        let skill_list = "";
        skill.data.map(skill => {
            skill_list += `
                <option value="${ skill.id }">${ skill.name }</option>
            `;
        });
        skills.insertAdjacentHTML('beforeend', skill_list);

    });

}
loadS();


/**
 * All devs Load
 */
 getDevelopers();
function getDevelopers() {

    axios.get('http://localhost:5050/devs').then(res => {
        let devData = '';
        res.data.map((dev, index) => {
            devData += `
            <tr>
                <td>${ index + 1 }</td>
                <td  class="text-center">${ dev.name }</td>
                <td  class="text-center">${ dev.email }</td>
                <td  class="text-center">${ dev.Phone }</td>
                <td  class="text-center"><img style="object-fit:cover; width:40px;height:40px;" src="${ dev.photo }" alt=""></td>
                <td  class="text-center">
                    <a data-bs-toggle="modal" class="btn btn-info" onclick="vDeveloper(${ dev.id })"  href="#modal_view"><i class="fa fa-eye"></i></a>
                    <a data-bs-toggle="modal" class="btn btn-warning " onclick="editDeveloper(${ dev.id })"  href="#modal_edit"><i class="fa fa-edit"></i></a>
                    <a  class="btn btn-danger"  onclick="dDeveloper(${ dev.id })" ><i class="fa fa-trash"></i></a>
                </td>
            </tr>
            `;
        });

        devs_data_list.innerHTML = devData;

    });

}

/**
 * Add new devs
 */
 devs_add_form.addEventListener('submit', function(e){
    e.preventDefault();
    let name = this.querySelector('#name');
    let email = this.querySelector('#email');
    let Phone = this.querySelector('#Phone');
    let photo = this.querySelector('#photo');
    let skill = this.querySelector('#skill_list');


    if( name.value == '' || email.value == '' || skill.value == '' ){
        alert('All fields are required !');
    }else {


        axios.post('http://localhost:5050/devs', {
            id : "",
            name : name.value,
            email : email.value,
            Phone:Phone.value,
            photo : photo.value,
            skillId : skill.value
        }).then( res =>  {

            name.value = '';
            email.value = '';
            photo.value = '';
            skill.value = '';
            getDevelopers();

        });

    }

 });
 /**
  *  Data Edit
  */
function editDeveloper(id){

    let name = document.getElementById('ename');
    let email = document.getElementById('eemail');
    let photo = document.getElementById('ephoto');
    let phone = document.getElementById('ephone');
    let skill = document.getElementById('eskill_list');
    let edit_id = document.getElementById('edit_id');

    axios.get(`http://localhost:5050/devs/${id}`).then(rese => {
        photo.setAttribute('src', rese.data.photo);
        name.value = rese.data.name;
        email.value = rese.data.email;
        phone.value = rese.data.Phone;
        skill.value = rese.data.skillId;
        edit_id.value = id;


    });
}
/**
 * veiew
 */
 function vDeveloper(id){

    let name = document.getElementById('vname');
    let email = document.getElementById('vemail');
    let photo = document.getElementById('vphoto');
    let  phone= document.getElementById('vphone');
    let skill = document.getElementById('vskill_list');
    let vid = document.getElementById('vdit_id');

    axios.get(`http://localhost:5050/devs/${id}`).then(rese => {
        photo.setAttribute('src', rese.data.photo);

        name.innerHTML= rese.data.name;
        email.innerHTML = rese.data.email;
        phone.innerHTML = rese.data.Phone;
        vid.innerHTML =  rese.data.id;


    });
}
devs_edit_form.addEventListener('submit', function(e){
    e.preventDefault();

    let name = this.querySelector('#ename');
    let email = this.querySelector('#eemail');
    let photo = this.querySelector('#ephoto');
    let skill = this.querySelector('#eskill_list');
    let edit_id = this.querySelector('#edit_id');


    axios.patch(`http://localhost:5050/devs/${edit_id.value}`, {
            id : "",
            name : name.value,
            email : email.value,
            photo : photo.value,
            skillId : skill.value
    }).then(res => {
        name.value = '';
        email.value = '';
        photo.value = '';
        skill.value = '';
        getDevelopers();

    });
});

/**
 * delete
 */
///delete click kore browser reload dile delete hoy instant delete hoy te se na
function dDeveloper(id){
    let yesno = confirm('Are you sre ?');

    if(yesno){
        axios.delete(`http://localhost:5050/devs/${id}`);

    }else{
        return false;
    }

}


const dogTable= document.querySelector('.blue')

function fetchDogs () {
    fetch (`http://localhost:3000/dogs`)
    .then (resp => resp.json())
    .then(json => renderDogs(json))
}

function renderDogs(dogs) {
    dogs.forEach(dog=> {
        const dogNewTableRow=document.createElement('tr')
        dogNewTableRow.className='white'
        dogNewTableRow.id=`${dog.id}`
        dogTable.appendChild(dogNewTableRow)
        //creates new row in table for each dog
        const dogName = document.createElement('td')
        dogName.innerText=`${dog.name}`
        const dogBreed=document.createElement('td')
        dogBreed.innerText=`${dog.breed}`
        const dogSex= document.createElement('td')
        dogSex.innerText=`${dog.sex}`
        const btnTd = document.createElement('td')
        const editBtn=document.createElement('button')
        editBtn.innerText='Edit'
        //populates table based on dog info
        editBtn.addEventListener('click', (e) => {
            // e.preventDefault()
            let editForm=document.querySelector('#dog-form')
            const idInput=document.createElement('input')
            idInput.className='hidden'
            idInput.innerText=`${dog.id}`
            editForm.appendChild(idInput)
            editForm.name.value= dogName.innerText
            editForm.breed.value =dogBreed.innerText
            editForm.sex.value=dogSex.innerText
        },
        )
        //add's dog info to form
        dogNewTableRow.appendChild(dogName)
        dogNewTableRow.appendChild(dogBreed)
        dogNewTableRow.appendChild(dogSex)
        dogNewTableRow.appendChild(btnTd)
        btnTd.appendChild(editBtn)
        //appends all info to the table
    })
}
fetchDogs()

document.addEventListener('DOMContentLoaded', () => {
    let editForm=document.querySelector('#dog-form')
    editForm.addEventListener('submit', (e) => {
        e.preventDefault()
        editDog(e.target)
})
})

function editDog(dog) {
    let id = document.querySelector('.hidden').innerText
    
    let dogObj = {
        id: id,
        name: dog.name.value,
        breed:dog.breed.value,
        sex: dog.sex.value
    }
            fetch(`http://localhost:3000/dogs/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-type': 'application/json',
                'Accepts':'application/json'
            },
            body:JSON.stringify (dogObj)
        })
        setTimeout(() => {
            document.location.reload();
        },2000);
}

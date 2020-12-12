const dataCategories = document.querySelector('[data-categories]') 
const dataListTasks = document.querySelector('[data-list-tasks]')
const btnAddCategory = document.getElementById('btn-add-category')
const btnDeleteCategory = document.getElementById('btn-delete-category')
const dataInputCategory = document.querySelector('[data-input-category]')// cose que aprendí
const dataInputTask = document.querySelector('[data-input-task]')
const btnAddTask = document.getElementById('btn-add-task')
const containerTask = document.querySelector('.container-horizontal')
const categoryName = document.querySelector('.category-name-h2')
const numerOfTasks = document.querySelector('.number-of-tasks')

var persistentData = {
    categorySelected : ''
}

var categories = []
var tasks = []

function actionTaskList(){
    
    //complete task listener
    dataListTasks.addEventListener('click', e => {
        if(e.target.tagName.toLowerCase() === 'li'){
            tasks.forEach(item => {
                if (e.target.textContent === item.text) {
                    item.isDoing = toggleIsDoing(item.isDoing)
                }
            })
            e.target.classList.toggle('task-complete')
        }
    })
    
    btnAddTask.addEventListener('click',(e) => {
        e.preventDefault()
        //validations
        if (persistentData.categorySelected === null || persistentData.categorySelected === '') return 
        if (dataInputTask.value === null || dataInputTask.value === '') return
        let task = createTask(dataInputTask.value, persistentData.categorySelected)
        tasks.push(task)   
        clearTasks()
        dataInputTask.value = ''
        renderTaksList()
        dataInputTask.focus()
    })

}

function toggleIsDoing(isDoing){
    if(isDoing === true){
        isDoing = false
    }else{
        isDoing = true
    }
    return isDoing
}

function clearTasks(){
    dataListTasks.innerHTML = ''
}

function createTask(task){
    return { category: persistentData.categorySelected, id: new Date().toString(), text: task, isDoing: false } 
}

function actionsCategories(){

    //select category
    dataCategories.addEventListener('click',(e)=>{
        e.preventDefault()
        if (e.target.tagName.toLowerCase() === 'li') {//elemento aprendido
            if(e.target.classList.contains('active-li')) return 
            dataCategories.childNodes.forEach(item => {
                if(item.classList.contains('active-li')) item.classList.remove('active-li')
            })
            e.target.classList.add('active-li')
            btnDeleteCategory.disabled = false //elemento aprendido
            persistentData.categorySelected = e.target.textContent//reemplazar con las Cookies
            clearTasks()
            containerTask.style.display = ''
            processParameterCurrentCategory()
            renderTaksList()
            dataInputTask.focus()
        }
    })

    btnAddCategory.addEventListener('click',(e) => {
        e.preventDefault()
        if (dataInputCategory.value === null || dataInputCategory.value === '') return 
        clearCategory()
        let category = createCategory(dataInputCategory.value)
        categories.push(category)
        renderCategories()
        dataInputCategory.value = ''
        dataInputCategory.focus()
    })

    btnDeleteCategory.addEventListener('click' , (e) => {
        e.preventDefault()
        clearCategory()
        categories.forEach((item,index)=>{
            if(item === persistentData.categorySelected)
                categories[index] = null
        })
        btnDeleteCategory.disabled = true //elemento aprendido
        renderCategories()
        containerTask.style.display = 'none'
        dataInputCategory.focus()
    })

}

function clearCategory() {
    dataCategories.innerHTML = ''
}

function createCategory(data) {
    return data
}

function actionsApp(){
    actionsCategories()
    actionTaskList()
}

function renderCategories() {

    categories.forEach((item) => {
        if(item !== null){
            let liList = document.createElement('li')
            liList.classList.add('category-name')
            liList.textContent = item
            dataCategories.appendChild(liList)
        }
    })

}

function countTasks(){
    let count = tasks.length;
    numerOfTasks.textContent = `there are ${count} task written`
}

function setH2TaskList(){
   categoryName.textContent = persistentData.categorySelected;
}

function processParameterCurrentCategory(){
    countTasks()
    setH2TaskList()
}

function renderTaksList() {

    tasks.forEach(item => {
        if(persistentData.categorySelected === item.category){
            let liList = document.createElement('li')
            liList.classList.add('task-style')
            if (item.isDoing === true) liList.classList.add('task-complete')
            liList.textContent = item.text
            countTasks(persistentData.categorySelected)
            dataListTasks.appendChild(liList) 
        }
    })

}

function configurationsBeforeStart(){
    dataInputCategory.focus()
}

function render() {
    containerTask.style.display = 'none'
    renderCategories()
    //renderTaksList() //provisional
}

function app(){
    actionsApp()
    configurationsBeforeStart()
    render()
}

app()
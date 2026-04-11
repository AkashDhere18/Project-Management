const renderDataElement = document.querySelector('#renderData')
const searchProjectElement = document.querySelector("#searchProject")
const filterelement = document.querySelector('#filter')

let allproject=[]

function renderData(dataFromApi){
    renderDataElement.innerHTML =
                dataFromApi.map((proj,id) => `
                
                <tr>
                    <td>${(proj.id)-3}</td>
                    <td>
                        <b>${proj.ProjectName}</b>
                        <p class="text-secondary">${proj.Details}</p>
                    </td>    
                    <td>${proj.priority}</td>
                    <td>${proj.status}</td>
                    <td>${proj.Department}</td>
                    <td>${proj.startDate}</td>
                    <td>${proj.EndDate}</td>
                </tr>
    `
    ).join('');                          
}


async function fetchAPI(){
    await fetch('https://674e84f1635bad45618eebc1.mockapi.io/api/v1/projects')
    .then(resp => resp.json())
    .then(data => {
        console.log(data)
        allproject = data;
        renderData(data);
    })
    .catch(err => console.log(err))
}



searchProjectElement.addEventListener('input' , () => {
        const inputvalue = searchProjectElement.value.toLowerCase().trim();

        const reRenderData = allproject.filter((proj) => proj.ProjectName.toLowerCase().includes(inputvalue));
        renderData(reRenderData)
})  
   
filterelement.addEventListener('change' , function(data){
    // console.log(data.target.value)

    const selectedValue = data.target.value;
    console.log(selectedValue)

    if(selectedValue === "ALL"){
        renderData(allproject)
    }else{
        
        const renderD = allproject.filter((proj) => proj.status.includes(selectedValue))
        renderData(renderD)
    }  
    
})
    
  


window.addEventListener('DOMContentLoaded' , () => {
    fetchAPI()
})
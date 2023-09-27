const dataLoad = async () => {
    const res = await fetch('https://openapi.programming-hero.com/api/ai/tools')
    const data = await res.json();
    const mainData = data.data.tools
    console.log(mainData);
    dipsPlayData(mainData);
};


const dipsPlayData = (data) => {
    const dataContainer = document.getElementById('ai-container');
    // console.log(dataContainer);
    let count = 0;
    data.slice(0, 6).forEach(element => {
        // console.log(element)
        const div = document.createElement('div')
        div.classList = `card  bg-base-100 shadow-xl p-5`;
        div.innerHTML = `
        <figure class ="mb-4"><img class="w-300px" src=${element.image ? element.image : "image not fond"} /></figure>
        <h2 class="card-title">Features</h2>
        <ul>
         <li>${element.features[0] ? element.features[0] : ""}</li>
         <li>${element.features[1] ? element.features[1] : ""}</li>
         <li>${element.features[3] ? element.features[3] : ""}</li>
         </ul>
         <hr class="my-6">
         <div class="flex items-center justify-around">
         <div class="flex-1">
         <h2>${element.name ? element.name : ""}</h2>
         <div class="flex items-center gap-2">
           <i class="fa-solid fa-calendar-days"></i>
           <h2>${element.published_in ? element.published_in : ""}</h2>
         </div>
         </div>
          <div class="p-4"> 
         <button onclick ="details('${element.id}') ; my_modal_4.showModal()" class="btn bg-[#FEF7F7] rounded-full"> <i class="fa-solid fa-arrow-right text-[#EB5757]"></i></button>
          </div>
         </div>
         
        `
        dataContainer.appendChild(div);
    })
}


const details = async (id) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/ai/tool/${id}`)
    const data = await res.json();
    const detailsData = data.data;
    console.log(detailsData);
    //
    const detailContainer = document.getElementById('details-container');
    const divLeft = document.createElement('div');
    divLeft.classList = 'border-2 border-[#EB5757] p-7'
    const divRight = document.createElement('div');
    divRight.classList = 'shadow p-7 rounded'
    detailContainer.textContent = '';

    // array.forEach(element => {
    const featureData = [];
    // detailsData.features.map(element => {
    //     console.log(element);
    // })
    console.log(detailsData.features[1].feature_name);
    divLeft.innerHTML = `
            <h2>${detailsData?.description ? detailsData.description : "not available"}</h2>
           <div class="flex">
              <div>${detailsData.pricing[0].price} ${detailsData.pricing[0].plan}</div>
              <div>${detailsData.pricing[1].price} ${detailsData.pricing[1].plan}</div>
              <div>${detailsData.pricing[2].price} ${detailsData.pricing[2].plan}</div>
           </div>
           <div class="flex justify-around">
              <div>
                <h1>features</h1>
                <h1>${detailsData.features[0]}}</h1>
              </div>
              <div>
                <h1>Integrations</h1>
                    <li class="">${detailsData.integrations[0]}</li>
                    <li class="">${detailsData.integrations[1]}</li>
                    <li class="">${detailsData.integrations[2]}</li>
            </div>
           </div>
       `
    divRight.innerHTML = `
    <img class="w-300px" src=${detailsData?.image_link[0]} />
    <h2 class="text-center font-semibold text-2xl mt-5">${detailsData.input_output_examples[0].input}</h2>
    <h2 class="text-center text-[#585858] font-normal mt-2 px-4">${detailsData.input_output_examples[0].output}</h2>
       `
    detailContainer.appendChild(divLeft);
    detailContainer.appendChild(divRight);
}


dataLoad();

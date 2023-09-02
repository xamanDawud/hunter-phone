async function loadPhones(name) {
  let res = await fetch(
    `https://openapi.programming-hero.com/api/phones?search=${name}`
  );
  let dataa = await res.json();
  let data = dataa.data;

  displayPhone(data);
}

function displayPhone(data) {
  let phoneParentDiv = document.getElementById("phone-card");
  phoneParentDiv.textContent = "";

  for (let phone of data) {
    let newDiv = document.createElement("div");
    newDiv.innerHTML = `
    <div class="card w-96 bg-base-100 shadow-xl">
    <figure class="px-10 pt-10">
        <img src="${phone.image}" class="rounded-xl" />
    </figure>
    <div class="card-body items-center text-center">
        <h2 class="card-title">${phone.phone_name}</h2>
        <p>If a dog chews shoes whose shoes does he choose?</p>
        <div class="card-actions">
            <button class="btn btn-primary" onclick="openModal('${phone.slug}')" >Buy Now</button>
        </div>
    </div>
</div> 

    `;

    phoneParentDiv.appendChild(newDiv);
  }
}

function search() {
  let searchField = document.getElementById("search-text");
  let searchText = searchField.value;
  loadPhones(searchText);
}

async function openModal(id) {
  my_modal_5.showModal();
  let phoneRes = await fetch(
    `https://openapi.programming-hero.com/api/phone/${id}`
  );
  let dataa = await phoneRes.json();
  let data = dataa.data;
  modalDetailsDisplay(data);
  console.log(data);
}

let modalDetailsDisplay = (data) => {
  let name = document.getElementById("phone-name");
  name.innerText = data.name;
  let phoneImage = document.getElementById("phone-image");
  phoneImage.src = data.image;
};
loadPhones("iphone");

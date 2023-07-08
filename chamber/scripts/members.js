const url = 'https://chesnaanderson.github.io/wdd230/chamber/data/members.json';
const cards = document.querySelector('#cards');

async function getCompanyData() {
    const response = await fetch(url);
    const data = await response.json();
    //console.table(data.prophets); // temporary testing of data retreival
    displayCompany(data.companies);
  }
  
  const displayCompany = (companies) => {
    companies.forEach((company) => {
      // Create elements to add to the div.cards element
      let card = document.createElement('section');
      let fullName = document.createElement('span'); // fill in the blank
      let address = document.createElement('span'); 
      let phonenumber = document.createElement('span'); 
      let members= document.createElement('span'); 
      let website = document.createElement('span'); 
      let membership = document.createElement('span'); 
      let portrait = document.createElement('img');
  
      // Build the h2 content out to show the prophet's full name
      fullName.textContent = `${company.name}`; // fill in the blank
      address.textContent = `${company.address}`;
      phonenumber.textContent = `${company.phonenumber}`;
      members.textContent = `${company.members}`;
      website.textContent = `${company.website}`;
      membership.textContent = `${company.membership}`;
      // Build the image portrait by setting all the relevant attributes
      portrait.setAttribute('src', company.imageurl);
      portrait.setAttribute('alt', `Portrait of ${prophet.name} ${prophet.lastname}`); // fill in the blank
      portrait.setAttribute('loading', 'lazy');
      portrait.setAttribute('width', '340');
      portrait.setAttribute('height', '440');
  
      // Append the section(card) with the created elements
      card.appendChild(fullName); //fill in the blank
      card.appendChild(portrait);
      card.appendChild(address);
      card.appendChild(phonenumber);
      card.appendChild(members);
      card.appendChild(website);
      card.appendChild(membership);
  
      cards.appendChild(card);
    }); // end of arrow function and forEach loop
  }

  getCompanyData();
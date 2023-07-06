const baseURL = "https://chesnaanderson.github.io/wdd230/";
const linksURL = "https://chesnaanderson.github.io/wdd230/data/links.json";

async function getLinks(url) {
    const response = await fetch(linksURL);
    const data = await response.json();
    //console.log(data);
    displayLinks(data);

  }
  const displayLinks = (data) => {
    data.forEach((data) => {
      // Create elements to add to the div.cards element
      let weeks = document.createElement('section');
      let week = document.createElement('span'); // fill in the blank
      let links = document.createElement('span'); // fill in the blank
      let title = document.createElement('span'); // fill in the blank
    
  
      // Build the h2 content out to show the prophet's full name
      fullName.textContent = `${week} ${links} ${title}`; // fill in the blank

  
      // Append the section(card) with the created elements
      weeks.appendChild(fullName); //fill in the blank
  
      linksURL.appendChild(linksURL);
    }); // end of arrow function and forEach loop
  }
  getLinks(url);
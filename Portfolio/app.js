const pagesContainer = document.querySelector("[pages-container]");
const currentPage = document.querySelector("[current-page]");
const nextPage = document.querySelector("[next-page]");

const templates = [...document.getElementsByTagName('template')];
const navLinks = [...document.getElementsByClassName('navItem')];

const getTemplate = name => templates.find(t => t.getAttribute('name') === name).content;

//Init state
currentPage.appendChild(getTemplate('home').cloneNode(true));
nextPage.appendChild(getTemplate('home').cloneNode(true)); 


const animation = [
    {left: '0'},
    {left: '-100%'}
];

const options = {
    duration: 800,
    iterations: 1,
}

navLinks.forEach(link => {
    link.onclick = e => {
        const pageName = e.currentTarget.getAttribute('name');
        const pageTemplate = getTemplate(pageName);

        if(pageTemplate.firstElementChild.className !== currentPage.firstElementChild.className){
            nextPage.replaceChild(pageTemplate.cloneNode(true), nextPage.firstElementChild);
            pagesContainer.animate(animation, options).finished
            .then(() => {
                currentPage.replaceChild(pageTemplate.cloneNode(true), currentPage.firstElementChild);
            });
        }
    }
});

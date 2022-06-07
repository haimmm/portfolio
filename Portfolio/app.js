const pagesContainer = document.querySelector("[pages-container]");
const currentPage = document.querySelector("[current-page]");
const nextPage = document.querySelector("[next-page]");

const templates = [...document.getElementsByTagName('template')];
const navLinks = [...document.getElementsByClassName('navItem')];

const getTemplate = name => templates.find(t => t.getAttribute('name') === name).content;

//INIT
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
            navLinks.find(link => link.classList.contains('orange')).classList.remove('orange');
            link.classList.add('orange');
            nextPage.replaceChild(pageTemplate.cloneNode(true), nextPage.firstElementChild);
            pagesContainer.animate(animation, options).finished
            .then(() => {
                currentPage.replaceChild(pageTemplate.cloneNode(true), currentPage.firstElementChild);
                if(pageName === 'projects') handleProjectsPage();
            });
        }
    }
});


//ON PROJECT PAGE ENTER
const handleProjectsPage = () => {
    const projects = document.querySelector("[projects]");
    pageWidth = currentPage.offsetWidth;
    const ulMiddle = projects.offsetWidth / 2;
    //const distanceFromMiddle = Math.abs(ulMiddle - element.offsetLeft); - USE LATER

    console.log("entered project page", projects.children);
    projects.onclick = e => {
        if(e.target.tagName === 'IMG'){
            //const li = e.target.offsetParent;
            //fadeOut(li, -1);
            [...projects.children].forEach(li => {
                const sign = li.offsetLeft > ulMiddle ? 1:-1;
                fadeOut(li, pageWidth * sign);
            });
        }
    };
}



const fadeOut = (element, distance) => {
    console.log("fading out");
    //const pageWidth = currentPage.offsetWidth;
    //const ulWidth = element.offsetParent.offsetWidth;
    //const distanceFromMiddle = Math.abs(ulWidth/2 - element.offsetLeft);

    const animation = [
        {transform: `translateX(${distance}px)`},
    ];
    
    const options = {
        duration: 1000,
        iterations: 1,
    }

    element.animate(animation, options);
}

// 29 - left
// 357 - right
// 328 - middle
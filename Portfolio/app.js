const pagesContainer = document.querySelector("[pages-container]");
const currentPage = document.querySelector("[current-page]");
const nextPage = document.querySelector("[next-page]");

let pagesTemplates = [...document.getElementsByTagName('template')];
const navLinks = [...document.getElementsByClassName('navItem')];

const getByAttribute = (list, key, value) => list.find(t => t.getAttribute(key) === value).content;

//INIT
currentPage.appendChild(getByAttribute(pagesTemplates, 'name','home').cloneNode(true));
nextPage.appendChild(getByAttribute(pagesTemplates, 'name','home').cloneNode(true));


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
        const pageTemplate = getByAttribute(pagesTemplates, 'name', pageName);
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
    const [header, projectsContainer] =  [...document.querySelector("[projects-page]").children];
    const projectPagesTemplates = [...currentPage.getElementsByTagName('template')]
    pageWidth = currentPage.offsetWidth;
    const ulMiddle = projectsContainer.offsetWidth / 2;

    const projects = [...projectsContainer.children].sort((p1,p2) => {
        const p1Distance = Math.abs(ulMiddle - p1.offsetLeft);
        const p2Distance = Math.abs(ulMiddle - p2.offsetLeft);
        return p2Distance - p1Distance;
    });

    projectsContainer.onclick = e => {
        if(e.target.tagName === 'IMG'){
            const projectName = e.target.getAttribute('name');
            const template = getByAttribute(projectPagesTemplates, 'name',projectName); // HERE
            console.log(template);
            let time = 300;
            setTimeout(() => fadeOut(header, pageWidth, 1000, 'up'), time); 

            projects.forEach(li => {
                const direction = li.offsetLeft > ulMiddle ? 'right':'left';
                setTimeout(() => fadeOut(li, pageWidth, 1000, direction), time);
                time += 100;
            });
            time += 500;
            setTimeout(() => {
                currentPage.replaceChild(template.cloneNode(true), currentPage.firstElementChild);
            }, time);
        }
    };
}



const fadeOut = (element, distance, duration, direction) => {
    const effect = {};
    switch(direction){
        case 'up':
            effect.transform = `translateY(${-distance}px)`
            break;
        case 'down':
            effect.transform = `translateY(${distance}px)`
            break;
        case 'right':
            effect.transform = `translateX(${distance}px)`
            break;
        case 'left':
            effect.transform = `translateX(${-distance}px)`
            break;
        default:
            console.error("bad argument at fadeOut direction argument")
    }
    
    const options = {
        duration,
        iterations: 1,
    }

    const animation = element.animate([effect], options);
    setTimeout(() => animation.pause(), duration*0.9);
     
}

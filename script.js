document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Fetch and render projects
    fetch('data.json')
        .then(response => response.json())
        .then(data => {
            const projectsContainer = document.getElementById('projects-container');
            data.projects.forEach(project => {
                const projectElement = createProjectElement(project);
                projectsContainer.appendChild(projectElement);
            });
        });

    // Fetch and render education
    fetch('data.json')
        .then(response => response.json())
        .then(data => {
            const educationContainer = document.getElementById('education-container');
            data.education.forEach(edu => {
                const eduElement = createEducationElement(edu);
                educationContainer.appendChild(eduElement);
            });
        });

    // Animate skill bars
    gsap.utils.toArray('.skill-bar').forEach(bar => {
        const skill = bar.getAttribute('data-skill');
        const percentage = bar.getAttribute('data-percentage');
        
        const progressBar = document.createElement('div');
        progressBar.className = 'progress';
        
        const progressBarInner = document.createElement('div');
        progressBarInner.className = 'progress-bar bg-warning';
        progressBarInner.style.width = '0%';
        progressBarInner.setAttribute('role', 'progressbar');
        progressBarInner.setAttribute('aria-valuenow', '0');
        progressBarInner.setAttribute('aria-valuemin', '0');
        progressBarInner.setAttribute('aria-valuemax', '100');
        
        progressBar.appendChild(progressBarInner);
        
        const label = document.createElement('div');
        label.className = 'd-flex justify-content-between mb-1';
        label.innerHTML = `<span>${skill}</span><span>${percentage}%</span>`;
        
        bar.appendChild(label);
        bar.appendChild(progressBar);
        
        
        gsap.to(progressBarInner, {
            width: `${percentage}%`,
            duration: 1.5,
            ease: 'power2.out',
            scrollTrigger: {
                trigger: bar,
                start: 'top 80%',
            },
        });
    });

    // Animate social media buttons
    gsap.utils.toArray('.social-btn').forEach(btn => {
        gsap.to(btn, {
            scale: 1.1,
            duration: 0.5,
            repeat: -1,
            yoyo: true,
            ease: 'power1.inOut',
            scrollTrigger: {
                trigger: '#social-media',
                start: 'top 80%',
            },
        });
    });
});

function createProjectElement(project) {
    const colDiv = document.createElement('div');
    colDiv.className = 'col-md-6 mb-4';

    const cardDiv = document.createElement('div');
    cardDiv.className = 'card project-card h-100';

    const cardBody = document.createElement('div');
    cardBody.className = 'card-body';

    const title = document.createElement('h5');
    title.className = 'card-title';
    title.textContent = project.title;

    const date = document.createElement('p');
    date.className = 'card-text text-muted';
    date.textContent = project.date;

    const description = document.createElement('p');
    description.className = 'card-text';
    description.textContent = project.description;

    cardBody.appendChild(title);
    cardBody.appendChild(date);
    cardBody.appendChild(description);
    cardDiv.appendChild(cardBody);
    colDiv.appendChild(cardDiv);

    return colDiv;
}

function createEducationElement(edu) {
    const colDiv = document.createElement('div');
    colDiv.className = 'col-md-4 mb-4';

    const cardDiv = document.createElement('div');
    cardDiv.className = 'card education-card h-100';

    const cardBody = document.createElement('div');
    cardBody.className = 'card-body';

    const title = document.createElement('h5');
    title.className = 'card-title';
    title.textContent = edu.name;

    const degree = document.createElement('p');
    degree.className = 'card-text';
    degree.textContent = `${edu.degree} ${edu.year}`;

    const grade = document.createElement('p');
    grade.className = 'card-text';
    grade.textContent = edu.grade;

    cardBody.appendChild(title);
    cardBody.appendChild(degree);
    cardBody.appendChild(grade);
    cardDiv.appendChild(cardBody);
    colDiv.appendChild(cardDiv);

    return colDiv;
}
// FAQ

(function(){
    const educationTitle = [...document.querySelectorAll('.education-title')];
    
    educationTitle.forEach(education => {
        education.addEventListener('click', ()=>{
            let height = 0;
            let answer = education.nextElementSibling;
            let addPadding = education.parentElement.parentElement;

            addPadding.classList.toggle('education-padding--add');
            education.children[0].classList.toggle('education-arrow');

            if(answer.clientHeight === 0){
                height = answer.scrollHeight;
            }

            answer.style.height = `${height}px`;
        });
    });
})();


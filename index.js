document.getElementById('contact-form').addEventListener('submit', function(e){
    e.preventDefault();

    const Status = document.getElementById('form-status');
    const name = document.getElementById('name').value;

    if(name.length < 2){
        Status.innerHTML = 'Please enter a valid name.';
        Status.style.color = 'red';
        return;
    }
    Status.innerHTML = 'Thank you for contacting me, ' + name + '! I will get back to you soon.';
    Status.className = "success-msg";
    this.reset(); 
}); 

const btn = document.getElementById('read-more-btn');
const moreInfo = document.getElementById('more-info');

btn.addEventListener('click', function(){
    if(moreInfo.classList.contains('hidden')){
        moreInfo.classList.remove('hidden');
        btn.textContent = 'Read Less';
    }else{
        moreInfo.classList.add('hidden');
        btn.textContent = 'Read My Story';
    }
});

const modal = document.getElementById("project-modal");
const closeBtn = document.querySelector(".close-btn");


closeBtn.addEventListener('click', () => {
    modal.style.display = "none";
});


window.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.style.display = "none";
    }
});


document.querySelectorAll('.project-card .btn').forEach(button => {
    button.addEventListener('click', (e) => {
        e.preventDefault(); 
        
       
        const card = button.closest('.project-card');
        const title = card.querySelector('h3').innerText;
        const desc = card.querySelector('p').innerText;
        
      
        const imgDiv = card.querySelector('.project-img');
        const bgImg = imgDiv.style.backgroundImage.slice(5, -2); 

       
        document.getElementById('modal-title').innerText = title;
        document.getElementById('modal-desc').innerText = desc;
        document.getElementById('modal-img').src = bgImg;

       
        modal.style.display = "flex";
    });
});


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
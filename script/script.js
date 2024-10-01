function sendEmail() {
    const firstName = document.getElementById("firstName").value;
    const lastName = document.getElementById("lastName").value;
    const subject = document.getElementById("subject").value;
    const message = document.getElementById("message").value;
  
    if (!firstName || !lastName || !subject || !message) {
      alert("Please fill in all fields.");
      return;
    }
  
    const emailBody = `Name: ${firstName} ${lastName}\n\nMessage:\n${message}`;
  
    window.location.href = `mailto:alanzayon82@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(emailBody)}`;
  }

  function scrollToSection() {
    document.getElementById("contact").scrollIntoView({
        behavior: 'smooth'
    });
}
  

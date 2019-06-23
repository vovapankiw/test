function showAlert(message, success = true) {
    const alertTemplate = 
        `<div class="alert alert-dismissible ${success ? 'alert-success' : 'alert-danger'}" role="alert">
          <span><strong>${message}</strong></span>
          <span class="closebtn" onclick="this.parentElement.style.display='none';">&times;</span>
        </div>`;
    const alertElement = $('body').append(alertTemplate);
    setTimeout(() => {
      const elem = document.querySelector('.alert')
      elem.parentNode.removeChild(elem);
    }, 1000);
}

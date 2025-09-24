document.querySelector('button').addEventListener('click', function () {
  const textarea = document.querySelector('textarea');
  if (textarea.value.trim() !== '') {
    alert("Message envoyé : " + textarea.value);
    textarea.value = '';
  }
});

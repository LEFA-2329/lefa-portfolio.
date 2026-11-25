// The practice page checks the input locally so it also works offline.
const form = document.querySelector('#enquiry');
const item = document.querySelector('#item');
const status = document.querySelector('#status');
document.querySelector('#check').disabled = false;

form.addEventListener('input', () => {
  item.setCustomValidity('');
  status.textContent = '';
});

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const valid = item.value.trim().length >= 5;
  item.setCustomValidity(valid ? '' : 'Describe the item in at least five characters.');
  if (form.reportValidity()) {
    status.textContent = 'Preview accepted locally. No enquiry was sent.';
  }
});

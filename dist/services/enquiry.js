(() => {
  'use strict';
  const form = document.querySelector('#enquiry-form');
  const status = document.querySelector('#enquiry-status');
  const fallback = document.querySelector('#enquiry-fallback');
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    if (!form.reportValidity()) return;
    const fields = new FormData(form);
    const read = (name) => String(fields.get(name) || '').trim();
    if (!read('name') || !read('brief')) {
      status.textContent = 'Please enter your name and a short project description.';
      return;
    }
    const text = [
      'Website development enquiry',
      '',
      'Name: ' + read('name'),
      'Organisation: ' + (read('organisation') || 'Not specified'),
      'Service: ' + read('service'),
      '',
      read('brief'),
      '',
      'Budget: ' + (read('budget') || 'To discuss'),
      'Preferred timing: ' + (read('timing') || 'To discuss')
    ].join('\n');
    const whatsapp = event.submitter?.value === 'whatsapp';
    const url = whatsapp
      ? 'https://wa.me/27697294309?text=' + encodeURIComponent(text)
      : 'mailto:lazylefa@gmail.com?subject=' + encodeURIComponent('Project enquiry - ' + read('service')) + '&body=' + encodeURIComponent(text);
    fallback.href = url;
    fallback.hidden = false;
    fallback.textContent = whatsapp ? 'Open the prepared WhatsApp message' : 'Open the prepared email';
    status.textContent = 'Your message is prepared. Review it in ' + (whatsapp ? 'WhatsApp' : 'your email app') + ' before sending. If the app did not open, use the link below.';
    if (whatsapp) window.open(url, '_blank', 'noopener,noreferrer');
    else window.location.href = url;
  });
})();

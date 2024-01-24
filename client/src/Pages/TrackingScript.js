function trackInteraction(type, page) {
  fetch(`http://localhost:5141/api/tracking/${type}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      Page: page,
    }),
  })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => console.log(`Tracking ${type} data sent successfully:`, data))
    .catch(error => console.error(`Error sending tracking ${type} data:`, error));
}



document.addEventListener('DOMContentLoaded', function () {
  const buttons = document.querySelectorAll('button');

  buttons.forEach(button => {
    button.addEventListener('click', function () {
      trackInteraction('click', window.location.pathname);
    });

    button.addEventListener('mouseenter', function () {
      trackInteraction('hover', window.location.pathname);
    });
  });
});


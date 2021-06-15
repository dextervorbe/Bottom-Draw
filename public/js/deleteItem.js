async function deleteFormHandler(event) {
    event.preventDefault();
    
    // const id = window.location.toString().split('/')[
    //     window.location.toString().split('/').length - 1
    //   ];

    const { id } = event.target.dataset;

    const response = await fetch(`/api/items/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });
  
    if (response.ok) {
      document.location.replace('/dashboard/');
    } else {
      alert(response.statusText);
    }
  }
  
  document.querySelector('#delete-item-btn').addEventListener('click', deleteFormHandler);
async function deleteFormHandler(event) {
    event.preventDefault();
    
    // const id = window.location.toString().split('/')[
    //     window.location.toString().split('/').length - 1
    //   ];

    const { id } = event.target.dataset;

    console.log(id)
    console.log(event.target)

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
  
  let deleteButtons = document.getElementsByClassName('delete-item-btn')

  for (let btn of deleteButtons) {

    btn.addEventListener('click', deleteFormHandler);
  }
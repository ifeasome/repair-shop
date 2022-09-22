const deviceList = document.querySelector('.device-list');
const deviceForm = document.querySelector('.device-form');

const createRow = (device) => {
  const deviceEl = document.createElement('tr');
  deviceEl.setAttribute('data-id', device.id);
  deviceEl.innerHTML = `
    <td>${device.model}</td>
    <td>${device.platform}</td>
    <td>${device.screen_size}"</td>
    <td>${formatDate(device.date_received)}</td>
    <td>${device.condition}</td>
    <td>
      <form>
        <textarea 
          class="form-input" 
          data-type="update" 
          data-id="${device.id}"
        >${device.notes || ''}</textarea>
      </form>
    </td>
    <td>
      <button class="btn btn-danger" data-type="remove" data-id="${device.id}">X</button>
    </td>
  `;

  return deviceEl;
};

const getData = async () => {
  const modelData = await fetch('/api/models').then((res) => res.json());
  const modelSelect = deviceForm.querySelector('[name="model_id"]');

  for (model of modelData) {
    const modelOption = document.createElement('option');
    modelOption.value = model.id;
    modelOption.textContent = model.name;

    modelSelect.appendChild(modelOption);
  }
  
  const deviceData = await fetch('/api/devices').then((res) => res.json());
  
  for (device of deviceData) {
    const newDeviceRow = createRow(device);

    deviceList.appendChild(newDeviceRow);
  }
};

deviceList.addEventListener('click', (event) => {
  if (event.target.getAttribute('data-type') === 'remove') {
    const id = event.target.getAttribute('data-id');

    fetch(`/api/devices/${id}`, { method: 'DELETE' });

    deviceList.removeChild(document.querySelector(`tr[data-id="${id}"]`));
  }
});

deviceList.addEventListener('change', (event) => {
  if (event.target.getAttribute('data-type') === 'update') {
    const id = event.target.getAttribute('data-id');

    fetch(`/api/devices/${id}`, { 
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        notes: event.target.value
      })
    });
  }
});

deviceForm.addEventListener('submit', async (event) => {
  event.preventDefault();

  const formData = new FormData(deviceForm);

  const response = await fetch('/api/devices', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      model_id: formData.get('model_id'),
      condition: formData.get('condition'),
      notes: formData.get('notes')
    })
  });
  
  const newDeviceRow = createRow(await response.json());
  deviceList.prepend(newDeviceRow);

  deviceForm.reset();
});

getData();

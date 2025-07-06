document.getElementById('add-product').addEventListener('click', addProduct);

let cardsData = loadCards();

function saveCards() {
  localStorage.setItem('cardsData', JSON.stringify(cardsData));
}

function loadCards() {
  const data = localStorage.getItem('cardsData');
  if (!data) return [];
  try {
    return JSON.parse(data);
  } catch {
    return [];
  }
}

function renderCards() {
  const dashboard = document.getElementById('dashboard');
  dashboard.innerHTML = '';
  cardsData.forEach(cardData => {
    dashboard.appendChild(createCard(cardData));
  });
}

async function addProduct() {
  const urlInput = document.getElementById('product-url');
  const url = urlInput.value.trim();
  if (!url) return alert('Por favor ingresa una URL válida.');

  try {
    const { title, price } = await fetchProductData(url);
    const cardData = { url, title, price, image: '', imagePosition: 'top' };
    cardsData.push(cardData);
    saveCards();
    renderCards();
    urlInput.value = '';
  } catch (err) {
    console.error(err);
    alert('Error al obtener datos del producto.');
  }
}

async function fetchProductData(url) {
  const proxyUrl = 'https://api.allorigins.win/raw?url=' + encodeURIComponent(url);
  const response = await fetch(proxyUrl);
  if (!response.ok) throw new Error('Network response was not ok');
  const text = await response.text();
  const parser = new DOMParser();
  const doc = parser.parseFromString(text, 'text/html');

  const title = doc.querySelector('meta[property="og:title"]')?.content || doc.title;
  let price = doc.querySelector('meta[property="product:price:amount"]')?.content;
  if (!price) {
    const priceEl = doc.querySelector('[itemprop="price"]') || doc.querySelector('.price') || doc.querySelector('.product-price');
    price = priceEl ? priceEl.textContent.trim() : 'N/A';
  }
  return { title, price };
}

function createCard({ url, title, price, image, imagePosition }) {
  const card = document.createElement('div');
  card.className = 'card';
  card.dataset.url = url;

  // Imagen (si existe)
  let imgEl = null;
  if (image) {
    imgEl = document.createElement('img');
    imgEl.src = image;
    imgEl.className = 'card-image';
    imgEl.alt = title;
  }

  const content = document.createElement('div');
  content.className = 'card-content';

  const titleEl = document.createElement('h3');
  titleEl.className = 'card-title';
  titleEl.textContent = title;
  content.appendChild(titleEl);

  const priceEl = document.createElement('p');
  priceEl.className = 'card-price';
  priceEl.textContent = price;
  content.appendChild(priceEl);

  const btnContainer = document.createElement('div');
  btnContainer.className = 'card-buttons';

  // Botón quitar
  const removeBtn = document.createElement('button');
  removeBtn.className = 'remove-btn';
  removeBtn.textContent = 'Quitar';
  removeBtn.addEventListener('click', e => {
    e.stopPropagation();
    showPasswordModal(() => {
      // Eliminar del array y guardar
      cardsData = cardsData.filter(c => !(c.url === url && c.title === title));
      saveCards();
      renderCards();
    });
  });

  // Botón modificar
  const modifyBtn = document.createElement('button');
  modifyBtn.className = 'modify-btn';
  modifyBtn.textContent = 'Modificar';
  modifyBtn.addEventListener('click', e => {
    e.stopPropagation();
    openModifyModal(card, { url, title, price, image, imagePosition });
  });

  btnContainer.appendChild(removeBtn);
  btnContainer.appendChild(modifyBtn);
  content.appendChild(btnContainer);

  // Posicionar imagen según imagePosition
  card.innerHTML = '';
  if (imgEl && (imagePosition === 'top' || !imagePosition)) {
    card.appendChild(imgEl);
    card.appendChild(content);
  } else if (imgEl && imagePosition === 'bottom') {
    card.appendChild(content);
    card.appendChild(imgEl);
  } else if (imgEl && imagePosition === 'left') {
    const row = document.createElement('div');
    row.style.display = 'flex';
    row.style.alignItems = 'center';
    imgEl.style.width = '100px';
    imgEl.style.height = '100px';
    imgEl.style.marginRight = '10px';
    row.appendChild(imgEl);
    row.appendChild(content);
    card.appendChild(row);
  } else if (imgEl && imagePosition === 'right') {
    const row = document.createElement('div');
    row.style.display = 'flex';
    row.style.alignItems = 'center';
    imgEl.style.width = '100px';
    imgEl.style.height = '100px';
    imgEl.style.marginLeft = '10px';
    row.appendChild(content);
    row.appendChild(imgEl);
    card.appendChild(row);
  } else {
    card.appendChild(content);
  }

  // Click en la tarjeta abre el link (excepto botones)
  card.addEventListener('click', e => {
    if (!e.target.matches('button')) {
      window.open(card.dataset.url, '_blank');
    }
  });

  return card;
}

function showPasswordModal(onSuccess) {
  const overlay = document.createElement('div');
  overlay.className = 'modal-overlay';
  const modal = document.createElement('div');
  modal.className = 'modal';
  modal.innerHTML = `
    <h2>Contraseña requerida</h2>
    <label>Contraseña:<input type="password" id="modal-password"></label>
    <div class="modal-buttons">
      <button id="modal-ok">Aceptar</button>
      <button id="modal-cancel">Cancelar</button>
    </div>
    <p id="modal-error" style="color:red;display:none;">Contraseña incorrecta</p>
  `;
  overlay.appendChild(modal);
  document.body.appendChild(overlay);

  modal.querySelector('#modal-cancel').onclick = () => overlay.remove();
  modal.querySelector('#modal-ok').onclick = () => {
    const pass = modal.querySelector('#modal-password').value;
    if (pass === 'admin') {
      overlay.remove();
      onSuccess();
    } else {
      modal.querySelector('#modal-error').style.display = 'block';
    }
  };
}

function openModifyModal(card, cardData) {
  // Overlay
  const overlay = document.createElement('div');
  overlay.className = 'modal-overlay';

  // Modal
  const modal = document.createElement('div');
  modal.className = 'modal';
  modal.innerHTML = `
    <h2>Modificar Tarjeta</h2>
    <label>Nombre:<input type="text" id="modal-title" value="${cardData.title}"></label>
    <label>URL:<input type="text" id="modal-url" value="${cardData.url}"></label>
    <label>Precio:<input type="text" id="modal-price" value="${cardData.price.startsWith('$') ? cardData.price : '$ ' + cardData.price}"></label>
    <label>Imagen (URL):<input type="text" id="modal-image" value="${cardData.image || ''}"></label>
    <label>Posición de imagen:
      <select id="modal-image-pos">
        <option value="top" ${!cardData.imagePosition || cardData.imagePosition === 'top' ? 'selected' : ''}>Arriba</option>
        <option value="bottom" ${cardData.imagePosition === 'bottom' ? 'selected' : ''}>Abajo</option>
        <option value="left" ${cardData.imagePosition === 'left' ? 'selected' : ''}>Izquierda</option>
        <option value="right" ${cardData.imagePosition === 'right' ? 'selected' : ''}>Derecha</option>
      </select>
    </label>
    <div class="modal-buttons">
      <button id="modal-save">Guardar</button>
      <button id="modal-cancel">Cancelar</button>
    </div>
  `;

  overlay.appendChild(modal);
  document.body.appendChild(overlay);

  overlay.querySelector('#modal-cancel').addEventListener('click', () => overlay.remove());

  overlay.querySelector('#modal-save').addEventListener('click', () => {
    const newTitle = modal.querySelector('#modal-title').value.trim();
    const newUrl = modal.querySelector('#modal-url').value.trim();
    let newPrice = modal.querySelector('#modal-price').value.trim();
    const newImage = modal.querySelector('#modal-image').value.trim();
    const newImagePos = modal.querySelector('#modal-image-pos').value;

    // Formatear precio: asegurar que empiece con "$ " y tenga separadores
    newPrice = newPrice.replace(/[^0-9.,]/g, '');
    if (newPrice) {
      newPrice = newPrice.replace(/,/g, '.');
      let [entero, decimal] = newPrice.split('.');
      entero = entero.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
      newPrice = decimal ? `${entero},${decimal}` : entero;
      newPrice = '$ ' + newPrice;
    } else {
      newPrice = '$ ';
    }

    // Actualizar en cardsData
    const idx = cardsData.findIndex(c => c.url === cardData.url && c.title === cardData.title);
    if (idx !== -1) {
      cardsData[idx] = {
        url: newUrl,
        title: newTitle,
        price: newPrice,
        image: newImage,
        imagePosition: newImagePos
      };
      saveCards();
      renderCards();
    }
    overlay.remove();
  });
}

// Renderizar al cargar
renderCards();
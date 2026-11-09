const products = [
	{ id: 'iphone-15-pro-max', brand: 'Apple', name: 'iPhone 15 Pro Max', spec: '256 GB · Natural Titanium', price: 12499000, oldPrice: 13999000, badge: 'HEMAT 11%', image: './gambarhandphone/apple_iphone_15_pro_max_natural_titanium_1_1_2.jpg', description: 'iPhone 15 Pro Max dengan rangka titanium dan sistem kamera Pro. Ruang penyimpanan 256 GB memberi tempat untuk aplikasi, foto, dan video.', featured: 1 },
	{ id: 'galaxy-s26', brand: 'Samsung', name: 'Galaxy S26', spec: '256 GB · Silver', price: 11999000, oldPrice: 13499000, badge: 'BEST SELLER', tag: 'NEW', image: './samsung-s26-845x442.jpg', description: 'Samsung Galaxy S26 dengan desain ramping dan penyimpanan 256 GB. Pilihan ponsel untuk aktivitas harian, komunikasi, dan hiburan.', featured: 2 },
	{ id: 'oppo-cph2825', brand: 'OPPO', name: 'OPPO CPH2825', spec: '8/256 GB · Putih', price: 9999000, oldPrice: null, badge: 'GARANSI RESMI', image: './gambarhandphone/CPH2825_8-256_AW.webp', description: 'Ponsel OPPO dengan RAM 8 GB dan penyimpanan 256 GB. Kapasitas lega untuk aplikasi, foto, dan video sehari-hari.', featured: 3 },
	{ id: 'iphone-17-pro', brand: 'Apple', name: 'iPhone 17 Pro', spec: '256 GB · Deep Blue, Cosmic Orange, Silver', price: 29999000, oldPrice: null, badge: 'NEW', tag: 'NEW', image: './ugnqNFb8Lx2w3Sj5SgzRXLD4B1aUj4wN5bpgldRp.png', description: 'iPhone 17 Pro dengan sistem tiga kamera belakang, ditampilkan dalam pilihan warna Deep Blue, Cosmic Orange, dan Silver. Penyimpanan 256 GB memberi ruang untuk aplikasi, foto, dan video.', featured: 4 },
	{ id: 'galaxy-a23', brand: 'Samsung', name: 'Galaxy A23 5G', spec: '128 GB · Black', price: 8499000, oldPrice: null, badge: 'GARANSI RESMI', image: './gambarhandphone/_samsung_hp_samsung_galaxy_a23_5g_6-128gb_original_garansi_resmi_full01_rgbril88.webp', description: 'Samsung Galaxy A23 5G dengan penyimpanan 128 GB. Pilihan untuk komunikasi, aplikasi, dan menikmati konten sehari-hari.', featured: 5 },
	{ id: 'galaxy-a16', brand: 'Samsung', name: 'Galaxy A16', spec: '128 GB · Gray', price: 5999000, oldPrice: 6499000, badge: 'HEMAT 8%', image: './Tampilan-Galaxy-A16-Gray-1000x667.jpg', description: 'Samsung Galaxy A16 dengan layar luas dan penyimpanan 128 GB. Cocok untuk komunikasi, hiburan, dan berbagai aplikasi harian.', featured: 6 },
	{ id: 'realme-c71', brand: 'Realme', name: 'realme C71 NFC', spec: '256 GB · NFC', price: 4299000, oldPrice: 4799000, badge: 'HEMAT 10%', image: './realme-C71-NFC-desain.jpg', description: 'realme C71 NFC dengan desain berwarna dan dukungan NFC. Kapasitas penyimpanan 256 GB untuk aplikasi, foto, dan video.', featured: 7 },
	{ id: 'oppo-reno-11', brand: 'OPPO', name: 'Reno 11 5G', spec: '256 GB · Wave Green', price: 5499000, oldPrice: null, badge: 'GARANSI RESMI', image: './YOTHXFbXckNszEoJ.png', description: 'OPPO Reno11 5G menonjolkan kamera portrait untuk membantu menghasilkan foto dengan subjek yang lebih menonjol. Desainnya ramping dan nyaman dibawa.', featured: 8 },
	{ id: 'vivo-v30', brand: 'Vivo', name: 'V30 5G', spec: '256 GB · Bloom White', price: 6499000, oldPrice: 6999000, badge: 'MODEL BARU', image: './Wave_20Aqua.webp', description: 'Vivo V30 5G mengutamakan pengalaman fotografi portrait dengan Aura Light dan layar AMOLED. Pilihan untuk pengguna yang sering memotret dan menikmati konten di ponsel.', featured: 9 }
];

const productGrid = document.querySelector('#product-grid');
const filters = document.querySelector('#filters');
const searchInput = document.querySelector('#search-input');
const sortSelect = document.querySelector('#sort-select');
const resultCount = document.querySelector('#result-count');
const emptyState = document.querySelector('#empty-state');
const cartDrawer = document.querySelector('#cart-drawer');
const drawerBackdrop = document.querySelector('#drawer-backdrop');
const cartItems = document.querySelector('#cart-items');
const cartCount = document.querySelector('#cart-count');
const drawerCount = document.querySelector('#drawer-count');
const cartSubtotal = document.querySelector('#cart-subtotal');
const checkoutCount = document.querySelector('#checkout-count');
const cartEmpty = document.querySelector('#cart-empty');
const drawerFooter = document.querySelector('#drawer-footer');
const selectAllCart = document.querySelector('#select-all-cart');
const toast = document.querySelector('#toast');
const productDialog = document.querySelector('#product-dialog');
const checkoutDialog = document.querySelector('#checkout-dialog');
const checkoutForm = document.querySelector('#checkout-form');
const checkoutSummaryItems = document.querySelector('#checkout-summary-items');
const checkoutTotal = document.querySelector('#checkout-total');
const checkoutSubmitTotal = document.querySelector('#checkout-submit-total');
const mainNav = document.querySelector('.main-nav');
const navIndicator = document.querySelector('#nav-indicator');
const themeToggle = document.querySelector('#theme-toggle');
const themeColorMeta = document.querySelector('meta[name="theme-color"]');

function setTheme(theme) {
	document.documentElement.dataset.theme = theme;
	const isDark = theme === 'dark';
	themeToggle.setAttribute('aria-pressed', String(isDark));
	themeToggle.setAttribute('aria-label', `Aktifkan mode ${isDark ? 'terang' : 'gelap'}`);
	themeToggle.title = `Aktifkan mode ${isDark ? 'terang' : 'gelap'}`;
	themeColorMeta.content = isDark ? '#261218' : '#fefaf3';
}

setTheme(localStorage.getItem('katalog-andyn-theme') === 'dark' ? 'dark' : 'light');

const formatPrice = (price) => new Intl.NumberFormat('id-ID', {
	style: 'currency',
	currency: 'IDR',
	maximumFractionDigits: 0
}).format(price);

let activeBrand = 'Semua';
let cart = {};
const selectedCart = new Set();
let toastTimer;

function renderFilters() {
	const brands = ['Semua', ...new Set(products.map((product) => product.brand))];
	filters.innerHTML = brands.map((brand) => `
		<button class="filter-button${brand === activeBrand ? ' active' : ''}" type="button" data-brand="${brand}" aria-pressed="${brand === activeBrand}">${brand}</button>
	`).join('');
}

function getVisibleProducts() {
	const query = searchInput.value.trim().toLocaleLowerCase('id');
	const visible = products.filter((product) => {
		const matchesBrand = activeBrand === 'Semua' || product.brand === activeBrand;
		const matchesSearch = `${product.brand} ${product.name} ${product.spec}`.toLocaleLowerCase('id').includes(query);
		return matchesBrand && matchesSearch;
	});

	switch (sortSelect.value) {
		case 'price-asc': visible.sort((a, b) => a.price - b.price); break;
		case 'price-desc': visible.sort((a, b) => b.price - a.price); break;
		case 'name': visible.sort((a, b) => a.name.localeCompare(b.name, 'id')); break;
		default: visible.sort((a, b) => a.featured - b.featured);
	}
	return visible;
}

function renderProducts() {
	const visible = getVisibleProducts();
	resultCount.textContent = `${visible.length} produk`;
	emptyState.hidden = visible.length > 0;
	productGrid.hidden = visible.length === 0;
	productGrid.innerHTML = visible.map((product, index) => `
		<article class="product-card" style="animation-delay:${Math.min(index * 45, 250)}ms">
			<button class="product-detail-trigger" type="button" data-detail="${product.id}" aria-label="Lihat detail ${product.name}">
				<span class="product-image-wrap">
					<img class="product-image" src="${product.image}" alt="" loading="lazy">
					<span class="product-badge">${product.badge}</span>
					${product.tag ? `<span class="product-tag">${product.tag}</span>` : ''}
				</span>
				<span class="product-info">
					<span class="product-brand">${product.brand}</span>
					<span class="product-name">${product.name}</span>
					<span class="product-spec">${product.spec}</span>
					<span class="product-price"><strong>${formatPrice(product.price)}</strong>${product.oldPrice ? `<span class="product-old-price">${formatPrice(product.oldPrice)}</span>` : ''}</span>
					<span class="product-link-label">Lihat detail <span aria-hidden="true">→</span></span>
				</span>
			</button>
			<button class="add-button" type="button" data-add="${product.id}" aria-label="Tambah ${product.name} ke keranjang" title="Tambah ke keranjang">+</button>
		</article>
	`).join('');
}

function renderCart() {
	const entries = Object.entries(cart).filter(([, quantity]) => quantity > 0);
	const totalQuantity = entries.reduce((total, [, quantity]) => total + quantity, 0);
	const selectedEntries = entries.filter(([id]) => selectedCart.has(id));
	const selectedQuantity = selectedEntries.reduce((total, [, quantity]) => total + quantity, 0);
	const subtotal = selectedEntries.reduce((total, [id, quantity]) => {
		const product = products.find((item) => item.id === id);
		return total + product.price * quantity;
	}, 0);

	cartCount.textContent = totalQuantity;
	drawerCount.textContent = `(${totalQuantity})`;
	cartSubtotal.textContent = formatPrice(subtotal);
	checkoutCount.textContent = `(${selectedQuantity})`;
	selectAllCart.checked = entries.length > 0 && selectedEntries.length === entries.length;
	selectAllCart.indeterminate = selectedEntries.length > 0 && selectedEntries.length < entries.length;
	document.querySelector('#checkout-button').disabled = selectedQuantity === 0;
	cartEmpty.hidden = entries.length > 0;
	drawerFooter.hidden = entries.length === 0;
	cartItems.innerHTML = entries.map(([id, quantity]) => {
		const product = products.find((item) => item.id === id);
		return `
			<article class="cart-row">
				<input class="cart-select" type="checkbox" data-select="${id}" aria-label="Pilih ${product.name}" ${selectedCart.has(id) ? 'checked' : ''}>
				<img src="${product.image}" alt="" loading="lazy">
				<div>
					<h3>${product.name}</h3>
					<p>${formatPrice(product.price)}</p>
					<div class="quantity-control" aria-label="Jumlah ${product.name}">
						<button type="button" data-quantity="${id}" data-change="-1" aria-label="Kurangi ${product.name}">−</button>
						<span>${quantity}</span>
						<button type="button" data-quantity="${id}" data-change="1" aria-label="Tambah ${product.name}">+</button>
					</div>
				</div>
				<span class="cart-row-total">${formatPrice(product.price * quantity)}</span>
			</article>
		`;
	}).join('');
}

function openCheckoutDialog() {
	const selectedEntries = Object.entries(cart).filter(([id, quantity]) => quantity > 0 && selectedCart.has(id));
	const total = selectedEntries.reduce((sum, [id, quantity]) => {
		const product = products.find((item) => item.id === id);
		return sum + product.price * quantity;
	}, 0);

	checkoutSummaryItems.innerHTML = selectedEntries.map(([id, quantity]) => {
		const product = products.find((item) => item.id === id);
		return `<div class="checkout-summary-row"><span>${product.name} × ${quantity}</span><strong>${formatPrice(product.price * quantity)}</strong></div>`;
	}).join('');
	checkoutTotal.textContent = formatPrice(total);
	checkoutSubmitTotal.textContent = `(${formatPrice(total)})`;
	checkoutDialog.showModal();
}

function showToast(message) {
	window.clearTimeout(toastTimer);
	toast.textContent = message;
	toast.classList.add('show');
	toastTimer = window.setTimeout(() => toast.classList.remove('show'), 2600);
}

function moveNavIndicator(link) {
	if (!link || !navIndicator) return;
	navIndicator.style.width = `${link.offsetWidth}px`;
	navIndicator.style.transform = `translateX(${link.offsetLeft}px)`;
}

function addToCart(productId) {
	const product = products.find((item) => item.id === productId);
	if (!product) return;
	if (!cart[product.id]) selectedCart.add(product.id);
	cart[product.id] = (cart[product.id] || 0) + 1;
	renderCart();
	showToast(`${product.name} ditambahkan ke keranjang`);
}

function openProductDetail(productId) {
	const product = products.find((item) => item.id === productId);
	if (!product) return;
	productDialog.dataset.productId = product.id;
	productDialog.querySelector('#detail-image').src = product.image;
	productDialog.querySelector('#detail-image').alt = product.name;
	productDialog.querySelector('#detail-brand').textContent = product.brand;
	productDialog.querySelector('#detail-name').textContent = product.name;
	productDialog.querySelector('#detail-spec').textContent = product.spec;
	productDialog.querySelector('#detail-description').textContent = product.description;
	productDialog.querySelector('#detail-price').textContent = formatPrice(product.price);
	productDialog.showModal();
}

function setDrawerOpen(isOpen) {
	cartDrawer.classList.toggle('open', isOpen);
	cartDrawer.setAttribute('aria-hidden', String(!isOpen));
	cartDrawer.inert = !isOpen;
	drawerBackdrop.hidden = !isOpen;
	document.body.style.overflow = isOpen ? 'hidden' : '';
	if (isOpen) {
		requestAnimationFrame(() => drawerBackdrop.classList.add('open'));
		document.querySelector('#close-cart').focus();
	} else {
		drawerBackdrop.classList.remove('open');
		document.querySelector('#cart-trigger').focus();
	}
}

filters.addEventListener('click', (event) => {
	const button = event.target.closest('[data-brand]');
	if (!button) return;
	activeBrand = button.dataset.brand;
	renderFilters();
	renderProducts();
});

searchInput.addEventListener('input', renderProducts);
sortSelect.addEventListener('change', renderProducts);

productGrid.addEventListener('click', (event) => {
	const detailButton = event.target.closest('[data-detail]');
	if (detailButton) {
		openProductDetail(detailButton.dataset.detail);
		return;
	}
	const button = event.target.closest('[data-add]');
	if (!button) return;
	addToCart(button.dataset.add);
});

document.querySelector('#close-detail').addEventListener('click', () => productDialog.close());
document.querySelector('#detail-add').addEventListener('click', () => {
	addToCart(productDialog.dataset.productId);
	productDialog.close();
});
productDialog.addEventListener('click', (event) => {
	if (event.target === productDialog) productDialog.close();
});

mainNav.addEventListener('click', (event) => {
	const link = event.target.closest('.nav-link');
	if (!link) return;
	mainNav.querySelectorAll('.nav-link').forEach((item) => item.classList.toggle('active', item === link));
	moveNavIndicator(link);
});
window.addEventListener('resize', () => moveNavIndicator(mainNav.querySelector('.nav-link.active')));

cartItems.addEventListener('click', (event) => {
	const checkbox = event.target.closest('[data-select]');
	if (checkbox) {
		const id = checkbox.dataset.select;
		if (checkbox.checked) selectedCart.add(id);
		else selectedCart.delete(id);
		renderCart();
		cartItems.querySelector(`[data-select="${id}"]`).focus();
		return;
	}
	const button = event.target.closest('[data-quantity]');
	if (!button) return;
	const id = button.dataset.quantity;
	cart[id] = (cart[id] || 0) + Number(button.dataset.change);
	if (cart[id] <= 0) {
		delete cart[id];
		selectedCart.delete(id);
	}
	renderCart();
});

selectAllCart.addEventListener('change', () => {
	const entries = Object.entries(cart).filter(([, quantity]) => quantity > 0);
	if (selectAllCart.checked) entries.forEach(([id]) => selectedCart.add(id));
	else entries.forEach(([id]) => selectedCart.delete(id));
	renderCart();
	selectAllCart.focus();
});

document.querySelector('#cart-trigger').addEventListener('click', () => setDrawerOpen(true));
document.querySelector('#close-cart').addEventListener('click', () => setDrawerOpen(false));
document.querySelector('#continue-shopping').addEventListener('click', () => setDrawerOpen(false));
drawerBackdrop.addEventListener('click', () => setDrawerOpen(false));
themeToggle.addEventListener('click', () => {
	const theme = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
	setTheme(theme);
	localStorage.setItem('katalog-andyn-theme', theme);
});
document.querySelector('#checkout-button').addEventListener('click', openCheckoutDialog);
document.querySelector('#close-checkout').addEventListener('click', () => checkoutDialog.close());
checkoutDialog.addEventListener('click', (event) => {
	if (event.target === checkoutDialog) checkoutDialog.close();
});
checkoutDialog.addEventListener('close', () => document.querySelector('#checkout-button').focus());
checkoutForm.addEventListener('submit', (event) => {
	event.preventDefault();
	const formData = new FormData(checkoutForm);
	const items = Object.entries(cart)
		.filter(([id, quantity]) => quantity > 0 && selectedCart.has(id))
		.map(([id, quantity]) => {
			const product = products.find((item) => item.id === id);
			return `- ${product.name} × ${quantity}: ${formatPrice(product.price * quantity)}`;
		});
	const total = Object.entries(cart)
		.filter(([id, quantity]) => quantity > 0 && selectedCart.has(id))
		.reduce((sum, [id, quantity]) => sum + products.find((item) => item.id === id).price * quantity, 0);
	const message = [
		'Halo, saya ingin membuat pesanan:',
		...items,
		`Total produk: ${formatPrice(total)}`,
		'',
		`Nama penerima: ${formData.get('name')}`,
		`WhatsApp: ${formData.get('phone')}`,
		`Alamat pengiriman: ${formData.get('address')}`,
		`Metode pembayaran: ${formData.get('payment')}`,
		'Ongkir mohon dikonfirmasi.'
	].join('\n');
	const whatsappWindow = window.open(`https://wa.me/?text=${encodeURIComponent(message)}`, '_blank');
	if (!whatsappWindow) {
		showToast('Izinkan pop-up di browser untuk melanjutkan pesanan melalui WhatsApp.');
		return;
	}
	whatsappWindow.opener = null;
	checkoutDialog.close();
	showToast('Pesanan siap. Periksa dan kirim pesan melalui WhatsApp.');
});
document.addEventListener('keydown', (event) => {
	if (event.key === 'Escape' && cartDrawer.classList.contains('open')) setDrawerOpen(false);
});

renderFilters();
renderProducts();
renderCart();
moveNavIndicator(mainNav.querySelector('.nav-link.active'));

const catalog={
 tortas:[
 ['Red Velvet','9fbc78ef01fe762d.png','Una torta para hacer de la celebración un momento dulce.'],
 ['Banano y almendras','d75cab3461aad91a.png','Banano y almendras en una creación artesanal.'],
 ['Zanahoria y frosting','adb083dd3f3051c9.png','Torta de zanahoria con cobertura de frosting.'],
 ['Chocolate','ba596309107825df.png','Para quienes siempre eligen chocolate.'],
 ['Naranja y amapola','e7d89e86c8d9cf90.png','El encuentro de la naranja y las semillas de amapola.']],
 brownies:[
 ['Box de brownies × 4','ebb27885e1623c9c.png','Una caja de cuatro brownies para personalizar con tus toppings favoritos.'],
 ['Brownie','d2a8099226b52502.png','Elige tu topping favorito y date un gusto.'],
 ['Brownie bites','c99f299162080995.png','Pequeños bocados de brownie para disfrutar a tu ritmo.']],
 alfajores:[
 ['Alfajores box','1ae1f0d239d69998.png','Una caja de alfajores para regalar, compartir o darte un gusto.'],
 ['Alfajores Lovers box','ca476bba93b78606.png','Una selección de alfajores para los que no se conforman con uno.']],
 galletas:[['Galletas de mantequilla','dd49e8404872a2a5.png','Galletas artesanales para acompañar tus pequeñas pausas.']]
};
const labels={tortas:'Tortas',brownies:'Brownies',alfajores:'Alfajores',galletas:'Galletas'};
const products=document.querySelector('#products');
const dialog=document.querySelector('#product-dialog');
let category='tortas';
function renderProducts(type){category=type;products.replaceChildren();catalog[type].forEach((product,i)=>{const article=document.createElement('article');article.className='product';const button=document.createElement('button');button.className='product-button';button.setAttribute('aria-label',`Ver detalle de ${product[0]}`);button.innerHTML=`<div class="product-image"><img src="assets/${product[1]}" alt="${product[0]}, catálogo original de Dulce Crucita" loading="lazy" width="500" height="500"><span class="view-detail" aria-hidden="true">↗</span></div><div class="product-line"><h3>${product[0]}</h3><span class="product-type">ARTESANAL</span></div><p>Ver detalles y consultar</p>`;button.addEventListener('click',()=>openProduct(type,i));article.append(button);products.append(article)});document.querySelectorAll('[data-category]').forEach(button=>button.setAttribute('aria-pressed',String(button.dataset.category===type)))}
function openProduct(type,index){const [name,img,description]=catalog[type][index];document.querySelector('#dialog-title').textContent=name;document.querySelector('#dialog-category').textContent=labels[type];document.querySelector('#dialog-description').textContent=description;document.querySelector('#dialog-image').src=`assets/${img}`;document.querySelector('#dialog-image').alt=`Ficha de ${name} de Dulce Crucita`;document.querySelector('#dialog-order').href=`https://wa.me/573127881069?text=${encodeURIComponent(`Hola, Dulce Crucita. Me gustaría consultar disponibilidad, presentaciones y precio de ${name}.`)}`;dialog.showModal();document.body.style.overflow='hidden'}
document.querySelectorAll('[data-category]').forEach(b=>b.addEventListener('click',()=>renderProducts(b.dataset.category)));
document.querySelector('.close-dialog').addEventListener('click',()=>dialog.close());
dialog.addEventListener('close',()=>document.body.style.overflow='');
dialog.addEventListener('click',e=>{if(e.target===dialog){const r=dialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)dialog.close()}});
renderProducts(category);
const journey=document.querySelector('.journey');const stage=document.querySelector('.stage');const header=document.querySelector('#header');
const names=['ALFAJORES ARTESANALES','PEQUEÑOS GUSTOS','MOMENTOS PARA COMPARTIR'];let current=-1,scheduled=false;
function updateJourney(){scheduled=false;const r=journey.getBoundingClientRect();const travel=journey.offsetHeight-stage.offsetHeight;const progress=Math.max(0,Math.min(1,-r.top/Math.max(1,travel)));const next=Math.min(2,Math.floor(progress*3));if(next!==current){current=next;document.querySelectorAll('[data-scene]').forEach(el=>el.classList.toggle('is-active',Number(el.dataset.scene)===next));document.querySelectorAll('[data-copy]').forEach(el=>{const active=Number(el.dataset.copy)===next;el.classList.toggle('is-active',active);el.inert=!active;el.setAttribute('aria-hidden',String(!active))});document.querySelectorAll('[data-go]').forEach(el=>{const active=Number(el.dataset.go)===next;el.classList.toggle('active',active);if(active)el.setAttribute('aria-current','true');else el.removeAttribute('aria-current')});document.querySelector('#scene-name').textContent=names[next]}header.classList.toggle('scrolled',window.scrollY>40)}
window.addEventListener('scroll',()=>{if(!scheduled){scheduled=true;requestAnimationFrame(updateJourney)}},{passive:true});window.addEventListener('resize',updateJourney);
document.querySelectorAll('[data-go]').forEach(el=>el.addEventListener('click',()=>{const travel=journey.offsetHeight-stage.offsetHeight;const index=Number(el.dataset.go);window.scrollTo({top:journey.offsetTop+travel*(index===0?0:(index+.25)/3),behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'})}));
document.querySelector('#year').textContent=new Date().getFullYear();updateJourney();
if(document.modelContext?.registerTool){
 const lifecycle=new AbortController();
 try{Promise.resolve(document.modelContext.registerTool({name:'show_catalog_category',title:'Mostrar categoría de Dulce Crucita',description:'Muestra los productos de una categoría en el catálogo. No envía pedidos ni mensajes.',inputSchema:{type:'object',properties:{category:{type:'string',enum:Object.keys(catalog)}},required:['category'],additionalProperties:false},annotations:{readOnlyHint:false,untrustedContentHint:false},execute(input){if(!input||typeof input!=='object'||Object.keys(input).length!==1||!Object.hasOwn(catalog,input.category))throw new Error('Categoría inválida');renderProducts(input.category);document.querySelector('#coleccion').scrollIntoView({behavior:'instant'});return {category:input.category,products:catalog[input.category].map(p=>p[0]),confirmation:'Disponibilidad, valor final y entrega se confirman con el negocio.'}}},{signal:lifecycle.signal})).catch(()=>{});}catch{}
 window.addEventListener('pagehide',()=>lifecycle.abort(),{once:true});
}

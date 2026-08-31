/* Nexo Security Demo: interfaz de exhibición sin bóveda, cifrado ni almacenamiento de credenciales. */
(() => {
  'use strict';
  const CONTACT = '957 963 320';
  const $ = id => document.getElementById(id);
  const icons = {
    menu:'<path d="M4 6h16M4 12h16M4 18h16"/>', moon:'<path d="M21 12.8A8.5 8.5 0 1 1 11.2 3 6.6 6.6 0 0 0 21 12.8Z"/>', sun:'<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>', gem:'<path d="m12 3 8 6-8 12L4 9l8-6Z"/><path d="m4 9 8 4 8-4M12 13V3"/>', lock:'<rect x="5" y="10" width="14" height="11" rx="2"/><path d="M8 10V7a4 4 0 0 1 8 0v3"/>', file:'<path d="M6 2h8l4 4v16H6z"/><path d="M14 2v5h5"/>', key:'<circle cx="8" cy="15" r="4"/><path d="m11 12 9-9M15 6l3 3M17 4l3 3"/>', backup:'<path d="M20 12a8 8 0 1 1-2.3-5.7"/><path d="M20 4v6h-6"/>', settings:'<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.9l.1.1-2.1 2.1-.1-.1a1.7 1.7 0 0 0-1.9-.3 1.7 1.7 0 0 0-1 1.5v.2h-3v-.2a1.7 1.7 0 0 0-1-1.5 1.7 1.7 0 0 0-1.9.3l-.1.1L6.6 17l.1-.1A1.7 1.7 0 0 0 7 15a1.7 1.7 0 0 0-1.5-1H5.3v-3h.2A1.7 1.7 0 0 0 7 10a1.7 1.7 0 0 0-.3-1.9l-.1-.1L8.7 5.9l.1.1a1.7 1.7 0 0 0 1.9.3 1.7 1.7 0 0 0 1-1.5v-.2h3v.2a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.9-.3l.1-.1L19.8 8l-.1.1a1.7 1.7 0 0 0-.3 1.9 1.7 1.7 0 0 0 1.5 1h.2v3h-.2a1.7 1.7 0 0 0-1.5 1Z"/>', plus:'<path d="M12 5v14M5 12h14"/>', search:'<circle cx="11" cy="11" r="6"/><path d="m16 16 4 4"/>', alert:'<path d="M10.3 3.8 2.2 18a2 2 0 0 0 1.8 3h16a2 2 0 0 0 1.8-3L13.7 3.8a2 2 0 0 0-3.4 0Z"/><path d="M12 9v4M12 17h.01"/>'
  };
  const icon = name => `<svg viewBox="0 0 24 24" aria-hidden="true">${icons[name] || icons.gem}</svg>`;
  function modal(feature = 'esta función') {
    $('premiumFeature').textContent = feature;
    $('premiumModal').classList.add('show');
  }
  function closeModal() { $('premiumModal').classList.remove('show'); }
  function applyTheme(theme) {
    const dark = theme === 'dark';
    document.documentElement.dataset.theme = dark ? 'dark' : 'light';
    $('themeBtn').innerHTML = icon(dark ? 'sun' : 'moon');
    $('themeSwitch').classList.toggle('on', dark);
    $('themeText').textContent = dark ? 'Modo oscuro · Negro y dorado' : 'Modo claro';
    localStorage.setItem('nexo-security-demo-theme', dark ? 'dark' : 'light');
  }
  function go(page) {
    document.querySelectorAll('.page').forEach(x => x.classList.toggle('active', x.id === 'page-' + page));
    document.querySelectorAll('.navBtn').forEach(x => x.classList.toggle('active', x.dataset.page === page));
    $('sidebar').classList.remove('open'); $('overlay').classList.remove('show');
  }
  function fillStaticContent() {
    $('docCount').textContent = '3'; $('passCount').textContent = '3'; $('weakCount').textContent = '1'; $('backupCount').textContent = '—'; $('lastBackup').textContent = 'Demo';
    ['docStat','passStat','weakStat','backupStat','lastStat'].forEach((id,i) => $(id).innerHTML = icon(['file','key','alert','backup','lock'][i]));
    $('healthBadge').textContent = 'Demo'; $('strongMeter').style.width='67%'; $('strongPct').textContent='67%'; $('duplicateMeter').style.width='100%'; $('duplicatePct').textContent='100%'; $('backupMeter').style.width='0%'; $('backupPct').textContent='—';
    $('securityAlerts').innerHTML = '<div class="alert info"><div class="alertIcon">'+icon('gem')+'</div><div><strong>Modo demostración</strong><br><span>Los datos son de muestra y no se guardan.</span></div></div><div class="alert warn"><div class="alertIcon">'+icon('lock')+'</div><div><strong>Funciones premium protegidas</strong><br><span>Solicita la versión final para usar tu bóveda local.</span></div></div>';
    $('activityList').innerHTML = '<div class="activityItem"><strong>Demo abierta</strong><small>Sin datos reales ni almacenamiento local.</small></div><div class="activityItem"><strong>Protección comercial activada</strong><small>Las acciones de bóveda requieren la versión Premium.</small></div>';
    $('docList').innerHTML = '<table><thead><tr><th>Documento</th><th>Categoría</th><th>Etiquetas</th><th>Acciones</th></tr></thead><tbody><tr><td><strong>Política de acceso</strong></td><td>Legal</td><td>muestra, seguridad</td><td><button class="btn btnSecondary premiumAction">Ver opción</button></td></tr><tr><td><strong>Inventario de equipos</strong></td><td>Inventario</td><td>demo</td><td><button class="btn btnSecondary premiumAction">Ver opción</button></td></tr></tbody></table>';
    $('passList').innerHTML = '<table><thead><tr><th>Sitio</th><th>Usuario</th><th>Contraseña</th><th>Estado</th><th>Acciones</th></tr></thead><tbody><tr><td><strong>Correo corporativo</strong></td><td>usuario@ejemplo.com</td><td>••••••••••••</td><td><span class="strength strong"><span class="dot"></span>Fuerte</span></td><td><button class="btn btnSecondary premiumAction">Gestionar</button></td></tr><tr><td><strong>Panel interno</strong></td><td>admin@ejemplo.com</td><td>••••••••••••</td><td><span class="strength medium"><span class="dot"></span>Media</span></td><td><button class="btn btnSecondary premiumAction">Gestionar</button></td></tr></tbody></table>';
    $('backupList').innerHTML = '<div class="empty" style="padding:25px">En la demo no se crean ni importan backups.</div>';
    $('userList').innerHTML = '<table><thead><tr><th>Usuario</th><th>Rol</th><th>Correo</th><th>Acciones</th></tr></thead><tbody><tr><td><strong>Administrador demo</strong></td><td>Administrador</td><td>demo@nexosecurity.pe</td><td><button class="btn btnSecondary premiumAction">Administrar</button></td></tr></tbody></table>';
  }
  function init() {
    document.title='Nexo Security Demo';
    document.body.innerHTML = document.body.innerHTML.replaceAll('Nexosegurity', 'Nexo Security Demo');
    $('setupModal').classList.remove('show'); $('lockScreen').classList.add('hidden'); $('app').removeAttribute('inert'); $('app').setAttribute('aria-hidden','false'); document.body.classList.remove('auth-locked');
    $('themeBtn').insertAdjacentHTML('beforebegin', '<button class="iconBtn" id="premiumBtn" aria-label="Ver versión Premium" title="Versión Premium">'+icon('gem')+'</button>');
    document.body.insertAdjacentHTML('beforeend', `<div class="modal" id="premiumModal" role="dialog" aria-modal="true" aria-labelledby="premiumTitle"><div class="modalCard wide"><div class="modalHeader"><h2 id="premiumTitle">Nexo Security Premium</h2><button class="iconBtn" id="premiumClose" aria-label="Cerrar">${icon('lock')}</button></div><div style="padding:20px"><p class="confirmText"><strong id="premiumFeature">Esta función</strong> está disponible en la versión final de pago. La demo solo permite recorrer la interfaz.</p><div class="grid" style="grid-template-columns:1fr 1fr;margin:16px 0"><div class="card" style="padding:14px"><h3 style="margin:0 0 8px">Demo GitHub</h3><p class="confirmText">✓ Interfaz y navegación<br>✓ Datos ficticios<br>✕ Sin bóveda real<br>✕ Sin cifrado ni backups<br>✕ Sin guardar credenciales</p></div><div class="card" style="padding:14px"><h3 style="margin:0 0 8px">Premium final</h3><p class="confirmText">✓ Bóveda local cifrada<br>✓ Contraseña maestra<br>✓ Gestión de documentos<br>✓ Backups y restauración<br>✓ Configuración completa</p></div></div><div class="warning" style="margin:0">Para adquirir Nexo Security Premium, contáctanos al <strong>${CONTACT}</strong>.</div><div class="modalActions"><button class="btn btnSecondary" id="premiumCancel">Seguir viendo demo</button><a class="btn btnPrimary" href="tel:+51957963320">Contactar: ${CONTACT}</a></div></div></div></div>`);
    const nav=[['dashboard','Dashboard','settings'],['documents','Documentos','file'],['passwords','Contraseñas','key'],['backups','Backups','backup'],['users','Usuarios','lock'],['settings','Configuración','settings']];
    $('nav').innerHTML=nav.map(([id,label,ic])=>`<button class="navBtn ${id==='dashboard'?'active':''}" data-page="${id}">${icon(ic)}<span class="label">${label}</span></button>`).join('');
    $('brandIcon').innerHTML=icon('lock'); $('menuBtn').innerHTML=icon('menu'); $('lockBtn').innerHTML=icon('lock');
    const labels={quickBackup:['backup','Backup cifrado'],goDocuments:['file','Documentos'],goPasswords:['key','Contraseñas'],goBackups:['backup','Backups'],goSettings:['settings','Configuración'],newDocBtn:['plus','Nuevo documento'],newPassBtn:['plus','Nueva contraseña'],generateTopBtn:['key','Generar'],backupBtn:['backup','Hacer backup'],restoreBtn:['backup','Restaurar'],exportBtn:['backup','Exportar backup cifrado'],demoBtn:['plus','Cargar datos demo'],newUserBtn:['plus','Nuevo usuario'],clearBtn:['alert','Reinicio total'],docTrashBtn:['alert','Papelera'],duplicateBtn:['alert','Repetidas'],docSearchIcon:['search',''],passSearchIcon:['search','']};
    Object.entries(labels).forEach(([id,[ic,text]])=>{if($(id)) $(id).innerHTML=icon(ic)+(text?' '+text:'');});
    fillStaticContent(); applyTheme(localStorage.getItem('nexo-security-demo-theme') || 'light');
    $('premiumBtn').onclick=()=>modal('La versión Premium'); $('premiumClose').onclick=closeModal; $('premiumCancel').onclick=closeModal;
    $('premiumModal').onclick=e=>{if(e.target===$('premiumModal'))closeModal()};
    $('themeBtn').onclick=()=>applyTheme(document.documentElement.dataset.theme==='dark'?'light':'dark'); $('themeSwitch').onclick=()=>$('themeBtn').click();
    $('menuBtn').onclick=()=>{if(innerWidth<=780){$('sidebar').classList.toggle('open');$('overlay').classList.toggle('show')}else $('sidebar').classList.toggle('collapsed')}; $('overlay').onclick=()=>$('sidebar').classList.remove('open');
    $('nav').onclick=e=>{const b=e.target.closest('.navBtn');if(b)go(b.dataset.page)}; [['goDocuments','documents'],['goPasswords','passwords'],['goBackups','backups'],['goSettings','settings']].forEach(([id,page])=>$(id).onclick=()=>go(page));
    document.querySelectorAll('.premiumAction, button:not(#themeBtn):not(#themeSwitch):not(#menuBtn):not(#premiumBtn):not(#premiumClose):not(#premiumCancel):not(.navBtn)').forEach(b=>b.addEventListener('click',e=>{e.preventDefault(); if(!b.closest('#premiumModal')) modal(b.textContent.trim() || 'Esta función');}));
    document.querySelectorAll('input,select,textarea').forEach(el=>el.addEventListener('focus',()=>{el.blur();modal('La edición de datos')}));
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
})();

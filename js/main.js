document.addEventListener('DOMContentLoaded', () => {

  // ==================== NAVIGATION ====================
  const navLinks = document.querySelectorAll('.nav-link');
  const hamburger = document.getElementById('navHamburger');
  const navLinksContainer = document.querySelector('.nav-links');

  hamburger?.addEventListener('click', () => {
    navLinksContainer.classList.toggle('open');
  });

  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      navLinksContainer.classList.remove('open');
    });
  });

  const sections = document.querySelectorAll('.section');
  const observerNav = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        navLinks.forEach(l => l.classList.remove('active'));
        document.querySelector(`.nav-link[data-section="${id}"]`)?.classList.add('active');
      }
    });
  }, { threshold: 0.3 });

  sections.forEach(s => observerNav.observe(s));

  // ==================== GLOBAL MASK REVEAL ====================
  const bgTop = document.getElementById('bgTop');

  if (bgTop) {
    let mouseX = -200, mouseY = -200;
    const REVEAL_RADIUS = 94;

    document.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      drawMask();
    });

    document.addEventListener('mouseleave', () => {
      mouseX = -200;
      mouseY = -200;
      drawMask();
    });

    function drawMask() {
      if (mouseX < 0) {
        bgTop.style.mask = 'none';
        bgTop.style.webkitMask = 'none';
        return;
      }

      const gradient = `radial-gradient(circle ${REVEAL_RADIUS}px at ${mouseX}px ${mouseY}px, transparent 0%, transparent 60%, black 100%)`;
      bgTop.style.mask = gradient;
      bgTop.style.webkitMask = gradient;
    }

    document.addEventListener('touchmove', (e) => {
      const touch = e.touches[0];
      mouseX = touch.clientX;
      mouseY = touch.clientY;
      drawMask();
    }, { passive: true });
  }

  // ==================== SURPRISE MODULE ====================
  const surpriseMessage = document.getElementById('surpriseMessage');
  const surpriseIcon = document.getElementById('surpriseIcon');
  const surpriseBox = document.getElementById('surpriseBox');
  let clickCount = 0;

  const messages = [
    '我是王大螂，风吹屁股凉……',
    '王燕鹏，你最棒了！',
    '别点了看看别的吧',
  ];

  function handleSurprise() {
    if (clickCount >= 4) return;

    if (clickCount < 3) {
      surpriseMessage.classList.remove('show');

      setTimeout(() => {
        surpriseMessage.textContent = messages[clickCount];
        surpriseMessage.classList.add('show');

        surpriseBox.style.transform = 'scale(1.15) rotate(5deg)';
        setTimeout(() => { surpriseBox.style.transform = ''; }, 300);

        clickCount++;
      }, 150);
    } else {
      const knotSection = document.getElementById('knot');
      knotSection.style.display = '';
      knotSection.scrollIntoView({ behavior: 'smooth' });
      surpriseMessage.classList.remove('show');
      setTimeout(() => {
        surpriseMessage.textContent = '↓ 往下看吧 ↓';
        surpriseMessage.classList.add('show');
      }, 150);
      clickCount++;
    }
  }

  surpriseBox?.addEventListener('click', handleSurprise);

  // ==================== DECORATIVE STICKERS ====================
  const stickersLayer = document.getElementById('stickersLayer');
  const stickerImages = [
    'images/stickers/sticker-cat.png',
    'images/stickers/sticker-girl1.png',
    'images/stickers/sticker-girl2.png',
    'images/stickers/sticker-girl3.png',
    'images/stickers/sticker-girl4.png',
    'images/stickers/sticker-photo1.png',
    'images/stickers/sticker-photo2.png',
    'images/stickers/sticker-photo3.png',
  ];

  function placeStickers() {
    if (!stickersLayer) return;
    stickersLayer.innerHTML = '';

    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const count = Math.min(16, Math.floor(vw / 120));

    for (let i = 0; i < count; i++) {
      const sticker = document.createElement('div');
      sticker.className = 'deco-sticker';
      const img = document.createElement('img');
      img.src = stickerImages[i % stickerImages.length];
      img.alt = '';
      sticker.appendChild(img);

      const size = 70 + Math.random() * 80;
      sticker.style.width = size + 'px';
      sticker.style.height = size + 'px';

      const edge = Math.floor(Math.random() * 4);
      if (edge === 0) {
        sticker.style.left = Math.random() * (vw - size) + 'px';
        sticker.style.top = Math.random() * 80 + 'px';
      } else if (edge === 1) {
        sticker.style.right = Math.random() * 80 + 'px';
        sticker.style.top = Math.random() * (vh - size) + 'px';
      } else if (edge === 2) {
        sticker.style.left = Math.random() * (vw - size) + 'px';
        sticker.style.bottom = Math.random() * 80 + 'px';
      } else {
        sticker.style.left = Math.random() * 80 + 'px';
        sticker.style.top = Math.random() * (vh - size) + 'px';
      }

      sticker.style.transform = `rotate(${(Math.random() - 0.5) * 40}deg)`;
      stickersLayer.appendChild(sticker);
    }
  }

  placeStickers();
  window.addEventListener('resize', placeStickers);

  // ==================== TREE HOLE ====================
  const treeholePost = document.getElementById('treeholePost');
  const treeholeInput = document.getElementById('treeholeInput');
  const treeholeFile = document.getElementById('treeholeFile');
  const treeholeBoard = document.getElementById('treeholeBoard');
  const uploadPreview = document.getElementById('uploadPreview');
  const noteModal = document.getElementById('noteModal');
  const noteModalContent = document.getElementById('noteModalContent');
  const noteModalClose = document.getElementById('noteModalClose');

  let pendingFile = null;

  const stickyColors = [
    '#fff9c4', '#f8bbd0', '#c8e6c9', '#b3e5fc',
    '#e1bee7', '#ffe0b2', '#dcedc8', '#f0f4c3'
  ];

  let savedNotes = JSON.parse(localStorage.getItem('treeholeNotes') || '[]');
  savedNotes.forEach(note => createStickyNote(note, false));

  treeholeFile?.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (!file) return;
    pendingFile = file;
    uploadPreview.innerHTML = '';
    if (file.type.startsWith('image/')) {
      const img = document.createElement('img');
      img.src = URL.createObjectURL(file);
      uploadPreview.appendChild(img);
    } else if (file.type.startsWith('video/')) {
      const vid = document.createElement('video');
      vid.src = URL.createObjectURL(file);
      vid.controls = true;
      vid.muted = true;
      uploadPreview.appendChild(vid);
    }
  });

  treeholePost?.addEventListener('click', () => {
    const text = treeholeInput.value.trim();
    if (!text && !pendingFile) return;

    const note = {
      id: Date.now(),
      text: text,
      mediaUrl: pendingFile ? URL.createObjectURL(pendingFile) : null,
      mediaType: pendingFile ? (pendingFile.type.startsWith('image/') ? 'image' : 'video') : null,
      time: new Date().toLocaleString('zh-CN'),
      x: Math.random() * (treeholeBoard.offsetWidth - 200),
      y: Math.random() * Math.max(400, treeholeBoard.offsetHeight - 200),
      rotation: (Math.random() - 0.5) * 12,
      color: stickyColors[Math.floor(Math.random() * stickyColors.length)]
    };

    const noteForStorage = { ...note, mediaUrl: null };
    savedNotes.push(noteForStorage);
    localStorage.setItem('treeholeNotes', JSON.stringify(savedNotes));

    createStickyNote(note, true);

    treeholeInput.value = '';
    pendingFile = null;
    uploadPreview.innerHTML = '';
    treeholeFile.value = '';
  });

  function createStickyNote(note, animate) {
    const el = document.createElement('div');
    el.className = 'sticky-note';
    el.style.left = note.x + 'px';
    el.style.top = note.y + 'px';
    el.style.transform = `rotate(${note.rotation}deg)`;
    el.style.backgroundColor = note.color;
    if (animate) {
      el.style.opacity = '0';
      el.style.transform += ' scale(0.5)';
    }

    let html = `<button class="note-delete-btn" data-note-id="${note.id}">&times;</button>`;
    if (note.text) html += `<div class="note-text">${escapeHtml(note.text)}</div>`;
    if (note.mediaUrl && note.mediaType === 'image') {
      html += `<img class="note-media" src="${note.mediaUrl}" alt="">`;
    } else if (note.mediaUrl && note.mediaType === 'video') {
      html += `<video class="note-media" src="${note.mediaUrl}" muted></video>`;
    }
    html += `<div class="note-time">${note.time}</div>`;
    el.innerHTML = html;

    el.querySelector('.note-delete-btn').addEventListener('click', (e) => {
      e.stopPropagation();
      deleteNote(note.id, el);
    });

    el.addEventListener('click', (e) => {
      if (e.target.classList.contains('note-delete-btn')) return;
      openNoteModal(note, el);
    });

    makeDraggable(el);

    treeholeBoard.appendChild(el);

    if (animate) {
      requestAnimationFrame(() => {
        el.style.transition = 'opacity 0.4s, transform 0.4s';
        el.style.opacity = '1';
        el.style.transform = `rotate(${note.rotation}deg) scale(1)`;
      });
    }

    const neededHeight = note.y + 220;
    if (neededHeight > treeholeBoard.offsetHeight) {
      treeholeBoard.style.minHeight = neededHeight + 'px';
    }
  }

  function deleteNote(noteId, el) {
    el.style.transition = 'opacity 0.3s, transform 0.3s';
    el.style.opacity = '0';
    el.style.transform += ' scale(0.3)';
    setTimeout(() => el.remove(), 300);

    savedNotes = savedNotes.filter(n => n.id !== noteId);
    localStorage.setItem('treeholeNotes', JSON.stringify(savedNotes));
  }

  function openNoteModal(note, el) {
    let html = '';
    if (note.text) html += `<p style="font-size:1.1rem;margin-bottom:16px">${escapeHtml(note.text)}</p>`;
    if (note.mediaUrl && note.mediaType === 'image') {
      html += `<img src="${note.mediaUrl}" alt="">`;
    } else if (note.mediaUrl && note.mediaType === 'video') {
      html += `<video src="${note.mediaUrl}" controls style="max-width:100%;border-radius:8px"></video>`;
    }
    html += `<p style="font-size:0.8rem;color:rgba(255,255,255,0.3);margin-top:16px">${note.time}</p>`;
    html += `<button class="modal-delete-btn" style="margin-top:16px;padding:8px 24px;background:#ff4444;color:#fff;border:none;border-radius:6px;cursor:pointer;font-size:0.85rem;">删除这条</button>`;
    noteModalContent.innerHTML = html;
    noteModal.classList.add('active');

    noteModalContent.querySelector('.modal-delete-btn').addEventListener('click', () => {
      deleteNote(note.id, el);
      noteModal.classList.remove('active');
    });
  }

  noteModalClose?.addEventListener('click', () => {
    noteModal.classList.remove('active');
  });

  noteModal?.addEventListener('click', (e) => {
    if (e.target === noteModal) noteModal.classList.remove('active');
  });

  function makeDraggable(el) {
    let isDragging = false;
    let startX, startY, origX, origY;

    el.addEventListener('mousedown', (e) => {
      isDragging = true;
      startX = e.clientX;
      startY = e.clientY;
      origX = parseInt(el.style.left) || 0;
      origY = parseInt(el.style.top) || 0;
      el.style.zIndex = 50;
      e.preventDefault();
    });

    document.addEventListener('mousemove', (e) => {
      if (!isDragging) return;
      el.style.left = (origX + e.clientX - startX) + 'px';
      el.style.top = (origY + e.clientY - startY) + 'px';
    });

    document.addEventListener('mouseup', () => {
      if (isDragging) {
        isDragging = false;
        el.style.zIndex = '';
      }
    });
  }

  // ==================== LIGHTBOX ====================
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxClose = document.getElementById('lightboxClose');

  window.openLightbox = function(imgEl) {
    lightboxImg.src = imgEl.src;
    lightbox.classList.add('active');
  };

  lightboxClose?.addEventListener('click', () => {
    lightbox.classList.remove('active');
  });

  lightbox?.addEventListener('click', (e) => {
    if (e.target === lightbox) lightbox.classList.remove('active');
  });

  // ==================== SCROLL ANIMATIONS ====================
  const timelinePosts = document.querySelectorAll('.timeline-post');
  const observerPosts = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

  timelinePosts.forEach(p => observerPosts.observe(p));

  // ==================== KEYBOARD ====================
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      lightbox?.classList.remove('active');
      noteModal?.classList.remove('active');
    }
  });

  // ==================== UTILITY ====================
  function escapeHtml(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  }

});

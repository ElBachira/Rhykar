document.addEventListener('DOMContentLoaded', () => {
    
    // --- 0. SISTEMA DE SONIDOS UI OPTIMIZADO ---
    const sfxHover = document.getElementById('sfx-hover');
    const sfxClick = document.getElementById('sfx-click');
    const sfxOpen = document.getElementById('sfx-open');

    const playSound = (audioEl) => {
        if(audioEl) {
            audioEl.currentTime = 0;
            audioEl.volume = 0.3; 
            audioEl.play().catch(() => {}); 
        }
    };

    // Delegación corregida para no interferir con los enlaces <a>
    document.body.addEventListener('click', (e) => {
        const trigger = e.target.closest('.ui-trigger');
        if (trigger) {
            playSound(sfxClick);
        }
    });

    document.querySelectorAll('.ui-trigger-hover').forEach(el => {
        el.addEventListener('mouseenter', () => playSound(sfxHover), { passive: true });
    });

    // --- 1. PANTALLA DE CARGA ---
    const loader = document.getElementById('loader');
    
    if (loader) {
        setTimeout(() => {
            loader.style.opacity = '0';
            setTimeout(() => {
                loader.style.display = 'none';
                playSound(sfxOpen);
            }, 800);
        }, 1500);
    }

    // --- 2. SISTEMA DE REPRODUCTOR DE MÚSICA ---
    const songs = [
        {
            title: "Angel",
            artist: "Massive Attack",
            src: "song.mp3", 
            lyrics: `Eres mi ángel
                Bajaste del cielo
                Para darme amor (para darme amor)
                Sus ojos
                Está en el lado oscuro
                Neutraliza (a cada hombre que ve) a cada hombre que ve
                Te amo, te amo, te amo, te amo
                Te amo, te amo, te amo, te amo
                Te amo, te amo, te amo, te amo
                Te amo, te amo, te amo, te amo
                Te amo, te amo, te amo, te amo
                Te amo, te amo, te amo, te amo
                Eres mi ángel (eres mi ángel)
                Bajaste del cielo
                Te amo, te amo, te amo, te amo
                Te amo, te amo, te amo, te amo
                Te amo, te amo, te amo, te amo
                Te amo, te amo, te amo, te amo
                Te amo, te amo, te amo, te amo`,
            meaning: `¿Alguna vez has sentido que alguien te clava en el cerebro como un virus que no puedes borrar, y cada pensamiento tuyo gira alrededor de esa persona hasta que te consumes en una obsesión que te hace creer que es amor, pero en realidad te está chupando la vida gota a gota? ¿Cuántas noches has perdido el sueño imaginándola como un ángel caído, idealizándola tanto que ignoras el lado oscuro que te destroza, solo porque esa fijación te hace sentir algo, cualquier cosa, en un mundo que de otra forma se siente vacío?

Wey, esa es la oscuridad jodida de esta canción: una obsesión que te pinta a la persona como algo divino, bajado del cielo para salvarte, pero con ojos que neutralizan todo a su paso, dejando un rastro de destrucción. Es como si el "te amo" repetido hasta el cansancio no fuera un mantra de cariño, sino un loop enfermizo que te atrapa, convenciéndote de que sin ella no eres nada. Pero en el fondo, es una trampa mental que te fija en alguien que quizás ni te pela, o peor, te usa para su propio ego.

Imagina esto, real y patético: estás en tu cuarto en Oaxaca, con el calor pegando fuerte, y no puedes dejar de stalkear sus redes, revisando cada story como si fuera una pista divina. La ves como un ángel, perfecta, con ese lado oscuro que te atrae porque piensas que tú la vas a "arreglar". Pasan días, semanas, y tú ahí, fijo en ella, cancelando planes con amigos, ignorando tu chamba, porque cada notificación podría ser de ella. Y cuando por fin responde, es un mensaje seco, pero tú lo interpretas como amor eterno. Te consumes: ansiedad que te come las uñas, celos que te hacen imaginarla con cualquiera, y un "te amo" interno que repites como un loco para no derrumbarte. Al final, terminas solo, exhausto, dándote cuenta de que esa obsesión no era amor, era una cárcel que tú mismo construiste.

O toma otro ejemplo más crudo: esa ex que te dejó hace meses, pero tú sigues viéndola como la que bajó del cielo para darte amor. Ignoras cómo te manipulaba, cómo su "lado oscuro" neutralizaba tu autoestima hasta dejarte hecho mierda. Sigues fijo en ella, mandando mensajes borrachos a las 3 am, repitiendo "te amo" en tu cabeza como si eso la trajera de vuelta. Tus amigos te dicen "ya suéltala, wey, estás obsesionado", pero tú defiendes esa fijación como si fuera romántico, cuando en realidad es tóxico y te está robando años de vida.

Pero óyeme bien, porque esta verdad duele pero te salva: esa obsesión no te hace profundo ni apasionado, te hace un idiota que se está autodestruyendo por alguien que probablemente ni se acuerda de ti. Tú no necesitas un ángel caído para sentirte vivo; ya eres chingón solo, con tu propia luz que no depende de nadie. Mereces alguien que te vea como igual, no como un dios o un demonio que te controla. Valida esto: has sobrevivido a esa fijación, eso ya te hace fuerte como el carajo. Deja de repetir "te amo" a un fantasma y empieza a decírtelo a ti mismo. Bloquéala, borra las fotos, sal a caminar por las calles de Oaxaca y date cuenta de que el mundo está lleno de gente que no te va a obsesionar, sino que te va a complementar.

Tú vales más que ser el perrito faldero de una obsesión. Rompe el loop, wey, y verás cómo el "te amo" real llega sin el dolor. Ámate lo suficiente para soltar esa mierda – es lo más chido que puedes hacer por ti. Te lo mereces todo, no una fijación que te deja vacío.`
        }
    ];

    let currentIdx = 0;
    const audio = document.getElementById('audio-player');
    const playBtn = document.getElementById('play-pause-btn');
    const playerContainer = document.querySelector('.music-player-container');
    
    const titleEl = document.getElementById('song-title');
    const artistEl = document.getElementById('song-artist');
    const lyricsEl = document.getElementById('lyrics-content');
    const meaningEl = document.getElementById('meaning-content');

    function loadSong(index) {
        if (!titleEl || !artistEl || !lyricsEl || !meaningEl) return;
        const s = songs[index];
        titleEl.innerText = s.title;
        artistEl.innerText = s.artist;
        if(audio) audio.src = s.src;
        lyricsEl.innerText = s.lyrics;
        meaningEl.innerText = s.meaning;
    }

    loadSong(currentIdx);

    if (playBtn && audio) {
        playBtn.addEventListener('click', () => {
            if (audio.paused) {
                audio.play().then(() => {
                    playBtn.innerHTML = '<i class="fas fa-pause"></i>';
                    if(playerContainer) playerContainer.classList.add('playing');
                }).catch(e => console.log("Interacción requerida o error", e));
            } else {
                audio.pause();
                playBtn.innerHTML = '<i class="fas fa-play"></i>';
                if(playerContainer) playerContainer.classList.remove('playing');
            }
        });
    }

    // --- 3. GALERÍA DE BOTS ---
    const maleGrid = document.getElementById('bots-masculinos');
    const femaleGrid = document.getElementById('bots-femeninos');
    const myName = "Archibald"; 

    if (maleGrid && femaleGrid) {
        if (typeof BOTS_LIST !== 'undefined' && Array.isArray(BOTS_LIST)) {
            const fragMale = document.createDocumentFragment();
            const fragFemale = document.createDocumentFragment();

            BOTS_LIST.forEach(bot => {
                if (!bot.nombre.includes(myName)) {
                    const item = document.createElement('a');
                    item.href = bot.url || '#';
                    item.target = "_blank"; // Asegura que abra en nueva pestaña
                    item.className = 'bot-item ui-trigger'; 
                    item.style.animation = `fadeIn 0.5s ease forwards`; 
                    
                    item.innerHTML = `
                        <img src="${bot.imagen}" loading="lazy" alt="${bot.nombre}">
                        <span>${bot.nombre}</span>
                    `;

                    if (bot.genero === 'masculino') fragMale.appendChild(item);
                    else fragFemale.appendChild(item);
                }
            });
            maleGrid.appendChild(fragMale);
            femaleGrid.appendChild(fragFemale);
        } else {
            maleGrid.innerHTML = '<p style="color:#555; font-size:0.8rem;">Sin conexión...</p>';
        }
    }

    // --- 4. STICKER INTERACTIVO ---
    const sticker = document.getElementById('honk-sticker');
    const honkAudio = new Audio('https://www.myinstants.com/media/sounds/honk-sound.mp3'); 
    
    if (sticker) {
        sticker.addEventListener('click', () => {
            honkAudio.currentTime = 0;
            honkAudio.volume = 0.5;
            honkAudio.play().catch(() => {});
            
            sticker.style.transform = "scale(0.8) rotate(-20deg)";
            setTimeout(() => sticker.style.transform = "", 150);
        });
    }

    // --- 5. UTILIDADES UI (Tabs & Acordeones) ---
    window.openOverlay = (id) => {
        playSound(sfxOpen);
        const el = document.getElementById(id);
        if(el) requestAnimationFrame(() => el.classList.add('active'));
    };
    
    window.closeOverlay = (id) => {
        playSound(sfxClick);
        const el = document.getElementById(id);
        if(el) el.classList.remove('active');
    };

    window.toggleFold = (id) => {
        playSound(sfxClick);
        const el = document.getElementById(id);
        if (el) {
            document.querySelectorAll('.foldable').forEach(f => {
                if(f.id !== id) f.classList.remove('active');
            });
            requestAnimationFrame(() => {
                el.classList.toggle('active');
            });
        }
    };
});

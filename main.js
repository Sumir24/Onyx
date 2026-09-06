import * as THREE from 'three';
import gsap from 'gsap';

// 3 Master Showcase Acts - Carrara White Edition
import whitePedestalImg from './images/step1_white_pedestal.png';
import whiteLevitateImg from './images/step3_white_floating.png';
import whiteWarriorImg  from './images/step5_white_warrior.png';

// 3 Master Showcase Acts - Nero Marquina Black Edition
import blackPedestalImg from './images/step1_black_pedestal.png';
import blackLevitateImg from './images/step3_black_floating.png';
import blackWarriorImg  from './images/step5_black_warrior.png';

document.addEventListener('DOMContentLoaded', () => {
    const app = document.getElementById('app') || document.body;
    app.innerHTML = '';

    // 0. Luxury Archival Roman Preloader
    const preloader = document.createElement('div');
    preloader.className = 'luxury-preloader';
    preloader.id = 'luxury-preloader';
    preloader.innerHTML = `
        <div class="preloader-slab preloader-slab-left"></div>
        <div class="preloader-slab preloader-slab-right"></div>
        
        <div class="preloader-content">
            <div class="preloader-corner preloader-corner-tl">LAT 44.0535° N · LON 10.1417° E</div>
            <div class="preloader-corner preloader-corner-tr">ROMA · MMXXVI</div>
            <div class="preloader-corner preloader-corner-bl">SPECIMEN NO. 01 / 02</div>
            <div class="preloader-corner preloader-corner-br">ARCHIVIO CAPITOLINO</div>

            <div class="preloader-center">
                <div class="preloader-kicker">SCULPTURAL EYEWEAR</div>
                <div class="preloader-monogram">L'ORFÈVRE</div>
                
                <div class="preloader-numerals">
                    <span class="roman-num" id="r-num-1">I</span>
                    <span class="roman-sep">·</span>
                    <span class="roman-num" id="r-num-2">II</span>
                    <span class="roman-sep">·</span>
                    <span class="roman-num" id="r-num-3">III</span>
                    <span class="roman-sep">·</span>
                    <span class="roman-num" id="r-num-4">IV</span>
                    <span class="roman-sep">·</span>
                    <span class="roman-num" id="r-num-5">V</span>
                    <span class="roman-sep">·</span>
                    <span class="roman-num" id="r-num-6">VI</span>
                </div>

                <div class="preloader-gauge">
                    <div class="preloader-rule"><div class="preloader-fill" id="preloader-fill"></div></div>
                    <div class="preloader-percentage" id="preloader-percentage">00%</div>
                </div>

                <div class="preloader-status" id="preloader-status">INITIALIZING ARCHIVAL DOSSIER...</div>

                <div class="preloader-enter-container">
                    <button class="preloader-enter-btn" id="preloader-enter-btn">
                        <span class="enter-main">ENTER ARCHIVE</span>
                        <span class="enter-sub">CLICK TO UNVEIL · WITH SOUND</span>
                    </button>
                </div>
            </div>
        </div>
    `;
    app.appendChild(preloader);
    const preloaderFill = document.getElementById('preloader-fill');
    const preloaderPercentage = document.getElementById('preloader-percentage');
    const preloaderStatus = document.getElementById('preloader-status');
    const preloaderEnterBtn = document.getElementById('preloader-enter-btn');

    // 1. WebGL Canvas
    const canvas = document.createElement('canvas');
    canvas.id = 'webgl-canvas';
    app.appendChild(canvas);

    // 2. Editorial "About" Inscription Layer (Act II: Centered during Levitation)
    const levitationAbout = document.createElement('div');
    levitationAbout.className = 'levitation-about-layer';
    levitationAbout.id = 'levitation-about';
    levitationAbout.innerHTML = `
        <div class="levitation-inner" id="levitation-inner">
            <span class="about-label" id="about-label">01 · CARRARA WHITE</span>
            <p class="about-text" id="about-main">
                CHISELED FROM TUSCAN APUAN MARBLE<br>
                BOUND WITH ARCHIVAL TITANIUM FILIGREE
            </p>
            <span class="roman-sub" id="about-sub">THIRTY-FOUR GRAMS · ZEISS MINERAL OPTICS</span>
        </div>
    `;
    app.appendChild(levitationAbout);

    // 3. Warrior Showcase Layer (Act III: Right-aligned archival dossier)
    const warriorShowcase = document.createElement('div');
    warriorShowcase.className = 'warrior-showcase-layer';
    warriorShowcase.id = 'warrior-showcase';
    warriorShowcase.innerHTML = `
        <div class="warrior-showcase-inner">
            <span class="warrior-tag" id="warrior-tag">— SPECIMEN NO. I · ARCHIVAL SHOWCASE —</span>
            <h2 class="warrior-title" id="warrior-title">THE WARRIOR'S VISAGE</h2>
            <p class="warrior-desc" id="warrior-desc">
                Chiseled in the classical Roman tradition. Milled from a single block of Tuscan marble to contour the anatomical architecture of the nasal bridge and zygomatic arches with zero pressure points.
            </p>

            <div class="warrior-specs">
                <div class="spec-block">
                    <span class="spec-num">01 /</span>
                    <span class="spec-label">ANATOMICAL CONTOUR</span>
                    <p class="spec-detail">Honed to rest flush against classical facial architecture.</p>
                </div>
                <div class="spec-block">
                    <span class="spec-num">02 /</span>
                    <span class="spec-label">HOROLOGICAL TOLERANCE</span>
                    <p class="spec-detail">Japanese titanium multi-barrel joints engineered to 0.02mm.</p>
                </div>
            </div>
        </div>
    `;
    app.appendChild(warriorShowcase);

    // 4. Editorial Brand Overlay (Exclusively Pure L'ORFÈVRE Title)
    const overlay = document.createElement('div');
    overlay.className = 'editorial-layer';
    overlay.innerHTML = `
        <header class="brand-header">
            <h1 class="brand-title">L'ORFÈVRE</h1>
        </header>
    `;
    app.appendChild(overlay);

    // 5. Flanking Interactive Guidance Cues (Left & Right of Pillar)
    const scrollCue = document.createElement('div');
    scrollCue.className = 'flanking-guidance-layer';
    scrollCue.id = 'flanking-guidance-layer';
    scrollCue.innerHTML = `
        <div class="flank-action flank-left" id="flank-morph-btn" title="Toggle Marble Edition">
            <span class="flank-glyph">◐</span>
            <span class="flank-text">CLICK TO MORPH</span>
        </div>
        <div class="flank-action flank-right" id="flank-scroll-btn" title="Scroll to Explore">
            <span class="flank-text">SCROLL</span>
            <span class="flank-arrow">↓</span>
        </div>
    `;
    app.appendChild(scrollCue);

    const morphActionBtn = scrollCue.querySelector('#flank-morph-btn');
    const scrollActionBtn = scrollCue.querySelector('#flank-scroll-btn');

    if (morphActionBtn) {
        morphActionBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            toggleEdition();
        });
    }

    if (scrollActionBtn) {
        scrollActionBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            smoothScrollTo(1.0, 0.85);
        });
    }

    // 6. Minimalist Roman Gallery Acoustic Controls
    const audioBtn = document.createElement('button');
    audioBtn.className = 'audio-toggle-btn';
    audioBtn.id = 'audio-toggle';
    audioBtn.setAttribute('title', 'Toggle Roman Gallery Acoustics');
    audioBtn.innerHTML = `
        <div class="audio-indicator-glyph">
            <div class="audio-equalizer" id="audio-eq" aria-hidden="true">
                <span class="eq-bar"></span>
                <span class="eq-bar"></span>
                <span class="eq-bar"></span>
                <span class="eq-bar"></span>
            </div>
            <svg class="audio-speaker-svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
                <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
                <path class="audio-arc arc-outer" d="M15.54 8.46a5 5 0 0 1 0 7.07"></path>
                <path class="audio-arc arc-far" d="M19.07 4.93a10 10 0 0 1 0 14.14"></path>
                <line class="audio-mute-slash" x1="22" y1="2" x2="2" y2="22"></line>
            </svg>
        </div>
        <span class="audio-label" id="audio-label">SOUND · ON</span>
    `;
    app.appendChild(audioBtn);
    const eqBars = audioBtn.querySelectorAll('.eq-bar');

    // =======================================================
    // ARCHIVAL ROMAN ACOUSTIC ENGINE 2.0 (STUDIO MASTERED)
    // =======================================================
    let audioCtx = null;
    let audioEnabled = true;
    let isAudioInitialized = false;
    let activePhaseIndex = 0; // 0: Pedestal, 1: Levitation, 2: Warrior
    let lastPhaseShiftTime = 0;
    const PHASE_COOLDOWN = 850; // ms to prevent boundary clatter
    let pulseTimeout = null;

    // Master Audio Graph Nodes
    let masterGain = null;
    let masterCompressor = null;
    let masterAnalyser = null;
    let freqData = null;
    let spatialPanner = null;
    let reverbConvolver = null;
    let reverbGain = null;
    let ambientDuckGain = null;

    let ambientSource = null;
    let ambientGain = null;
    let ambientFilter = null;
    let ambientPlaying = false;

    const audioBase = (import.meta.env.BASE_URL || '/').replace(/\/$/, '') + '/audio/';

    const soundConfigs = {
        ambient: { url: `${audioBase}roman_ambient.m4a?v=2`, fallback: `${audioBase}roman_ambient.wav?v=2`, vol: 0.22 },
        morph: { url: `${audioBase}roman_morph.m4a?v=orig`, fallback: `${audioBase}roman_morph.wav?v=orig`, vol: 0.70 },
        levitation: { url: `${audioBase}roman_levitation.m4a`, fallback: `${audioBase}roman_levitation.wav`, vol: 0.36 },
        warrior: { url: `${audioBase}roman_warrior.m4a?v=2`, fallback: `${audioBase}roman_warrior.wav?v=2`, vol: 0.58 },
        pedestal: { url: `${audioBase}roman_pedestal.m4a`, fallback: `${audioBase}roman_pedestal.wav`, vol: 0.50 }
    };

    const soundBuffers = {};
    const audioElements = {};

    // Pre-instantiate HTML5 Audio elements for zero-latency instant fallback
    Object.entries(soundConfigs).forEach(([key, cfg]) => {
        if (key === 'ambient') return;
        try {
            const el = new Audio();
            el.preload = 'auto';
            el.volume = cfg.vol;
            el.src = cfg.url;
            audioElements[key] = el;
        } catch (e) {}
    });

    // Procedural Impulse Response for Roman Marble Hall Acoustic Tail
    const createImpulseResponse = (ctx, duration = 0.85, decay = 2.4) => {
        const sampleRate = ctx.sampleRate;
        const length = Math.floor(sampleRate * duration);
        const impulse = ctx.createBuffer(2, length, sampleRate);
        const left = impulse.getChannelData(0);
        const right = impulse.getChannelData(1);

        for (let i = 0; i < length; i++) {
            const n = i / length;
            const env = Math.pow(1 - n, decay);
            left[i] = (Math.random() * 2 - 1) * env;
            right[i] = (Math.random() * 2 - 1) * env;
        }

        for (let ch = 0; ch < 2; ch++) {
            const data = impulse.getChannelData(ch);
            let prev = 0;
            for (let i = 0; i < length; i++) {
                data[i] = (data[i] + prev * 0.45) * 0.7;
                prev = data[i];
            }
        }
        return impulse;
    };

    // Smooth Musical Sidechain Ducking with Asymptotic Release (Zero Late Pump)
    const triggerDucking = (depth = 0.60, holdTime = 0.35, releaseTau = 0.38) => {
        if (!ambientDuckGain || !audioCtx) return;
        const now = audioCtx.currentTime;
        try {
            ambientDuckGain.gain.cancelScheduledValues(now);
            ambientDuckGain.gain.setValueAtTime(ambientDuckGain.gain.value, now);
            ambientDuckGain.gain.linearRampToValueAtTime(depth, now + 0.05);
            ambientDuckGain.gain.setValueAtTime(depth, now + holdTime);
            ambientDuckGain.gain.setTargetAtTime(1.0, now + holdTime, releaseTau);
        } catch (e) {}
    };

    const startAmbient = () => {
        if (!audioEnabled || ambientPlaying || !audioCtx || !soundBuffers['ambient']) return;
        if (audioCtx.state === 'suspended') {
            try { audioCtx.resume().catch(() => {}); } catch (e) {}
        }

        try {
            if (ambientSource) {
                try { ambientSource.stop(); } catch (e) {}
                ambientSource.disconnect();
                ambientSource = null;
            }

            ambientSource = audioCtx.createBufferSource();
            ambientSource.buffer = soundBuffers['ambient'];
            ambientSource.loop = true;

            ambientFilter = audioCtx.createBiquadFilter();
            ambientFilter.type = 'lowpass';
            ambientFilter.frequency.setValueAtTime(650, audioCtx.currentTime);
            ambientFilter.Q.setValueAtTime(1.2, audioCtx.currentTime);

            ambientGain = audioCtx.createGain();
            ambientGain.gain.setValueAtTime(0.001, audioCtx.currentTime);
            ambientGain.gain.setTargetAtTime(0.22, audioCtx.currentTime, 0.35);

            ambientSource.connect(ambientFilter);
            ambientFilter.connect(ambientGain);
            ambientGain.connect(ambientDuckGain || masterGain);

            ambientSource.start(0);
            ambientPlaying = true;
        } catch (e) {
            console.warn('Ambient start error:', e);
        }
    };

    const stopAmbient = () => {
        if (!ambientPlaying || !ambientGain || !audioCtx) return;
        try {
            ambientGain.gain.setValueAtTime(ambientGain.gain.value, audioCtx.currentTime);
            ambientGain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 0.6);
            setTimeout(() => {
                if (ambientSource) {
                    try { ambientSource.stop(); } catch (e) {}
                    ambientSource.disconnect();
                    ambientSource = null;
                }
                ambientPlaying = false;
            }, 650);
        } catch (e) {}
    };

    const initAudio = async () => {
        if (isAudioInitialized) return;
        try {
            const AudioContext = window.AudioContext || window.webkitAudioContext;
            if (!AudioContext) return;
            audioCtx = new AudioContext();
            if (audioCtx.state === 'suspended') {
                audioCtx.resume();
            }

            // 1. Master Output Bus Architecture
            masterGain = audioCtx.createGain();
            masterGain.gain.setValueAtTime(1.0, audioCtx.currentTime);

            masterCompressor = audioCtx.createDynamicsCompressor();
            masterCompressor.threshold.setValueAtTime(-18, audioCtx.currentTime);
            masterCompressor.knee.setValueAtTime(24, audioCtx.currentTime);
            masterCompressor.ratio.setValueAtTime(4.5, audioCtx.currentTime);
            masterCompressor.attack.setValueAtTime(0.003, audioCtx.currentTime);
            masterCompressor.release.setValueAtTime(0.2, audioCtx.currentTime);

            masterAnalyser = audioCtx.createAnalyser();
            masterAnalyser.fftSize = 64;
            masterAnalyser.smoothingTimeConstant = 0.82;
            freqData = new Uint8Array(masterAnalyser.frequencyBinCount);

            masterGain.connect(masterCompressor);
            masterCompressor.connect(masterAnalyser);
            masterAnalyser.connect(audioCtx.destination);

            // 2. Spatial 3D Stereo Panner
            if (audioCtx.createStereoPanner) {
                spatialPanner = audioCtx.createStereoPanner();
                spatialPanner.connect(masterGain);
            }

            // 3. Roman Marble Hall Convolver Reverb Bus
            reverbConvolver = audioCtx.createConvolver();
            reverbConvolver.buffer = createImpulseResponse(audioCtx, 0.85, 2.4);
            reverbGain = audioCtx.createGain();
            reverbGain.gain.setValueAtTime(0.18, audioCtx.currentTime);
            reverbConvolver.connect(reverbGain);
            reverbGain.connect(masterGain);

            // 4. Ambient Ducking Node
            ambientDuckGain = audioCtx.createGain();
            ambientDuckGain.gain.setValueAtTime(1.0, audioCtx.currentTime);
            ambientDuckGain.connect(masterGain);

            isAudioInitialized = true;

            // Apply equal-power sinusoidal micro-crossfade to ambient buffer so loop repeats with zero seam
            const makeSeamlessLoopBuffer = (buf) => {
                if (!buf) return buf;
                const numChannels = buf.numberOfChannels;
                const sampleRate = buf.sampleRate;
                const crossfadeLength = Math.min(Math.floor(sampleRate * 0.05), Math.floor(buf.length * 0.05)); // 50ms
                if (crossfadeLength <= 0) return buf;

                for (let ch = 0; ch < numChannels; ch++) {
                    const data = buf.getChannelData(ch);
                    const len = data.length;
                    for (let i = 0; i < crossfadeLength; i++) {
                        const t = i / crossfadeLength;
                        const gainIn = Math.sin((t * Math.PI) / 2);
                        const gainOut = Math.cos((t * Math.PI) / 2);
                        const head = data[i];
                        const tail = data[len - crossfadeLength + i];
                        const blended = head * gainIn + tail * gainOut;
                        data[i] = blended;
                        data[len - crossfadeLength + i] = blended;
                    }
                }
                return buf;
            };

            // Pre-decode high-definition AudioBuffers in parallel
            await Promise.allSettled(Object.entries(soundConfigs).map(async ([key, cfg]) => {
                try {
                    const res = await fetch(cfg.url);
                    if (!res.ok) throw new Error('fetch failed');
                    const arrayBuf = await res.arrayBuffer();
                    let decoded = await audioCtx.decodeAudioData(arrayBuf);
                    if (key === 'ambient') decoded = makeSeamlessLoopBuffer(decoded);
                    soundBuffers[key] = decoded;
                    if (key === 'ambient' && audioEnabled && !ambientPlaying) {
                        startAmbient();
                    }
                } catch (e) {
                    try {
                        const resWav = await fetch(cfg.fallback);
                        const arrayBufWav = await resWav.arrayBuffer();
                        let decodedWav = await audioCtx.decodeAudioData(arrayBufWav);
                        if (key === 'ambient') decodedWav = makeSeamlessLoopBuffer(decodedWav);
                        soundBuffers[key] = decodedWav;
                        if (key === 'ambient' && audioEnabled && !ambientPlaying) {
                            startAmbient();
                        }
                    } catch (err) {}
                }
            }));
        } catch (e) {
            console.warn('AudioContext error:', e);
        }
    };

    const unlockAudio = () => {
        if (!isAudioInitialized) {
            initAudio();
        }
        if (audioCtx) {
            if (audioCtx.state === 'suspended') {
                audioCtx.resume().then(() => {
                    if (audioEnabled && !ambientPlaying && soundBuffers['ambient']) {
                        startAmbient();
                    }
                }).catch(() => {});
            } else if (audioCtx.state === 'running') {
                if (audioEnabled && !ambientPlaying && soundBuffers['ambient']) {
                    startAmbient();
                }
            }
        }
    };

    // Preload and decode all audio assets immediately so they are in RAM during preloader
    initAudio();

    const userGestureEvents = ['click', 'pointerdown', 'touchstart', 'wheel', 'keydown', 'scroll'];
    const handleUserGesture = () => {
        unlockAudio();
        if (audioCtx && audioCtx.state === 'running' && audioEnabled && !ambientPlaying) {
            startAmbient();
            playRomanSound('pedestal');
        }
        if (ambientPlaying && audioCtx && audioCtx.state === 'running') {
            userGestureEvents.forEach(evt => window.removeEventListener(evt, handleUserGesture));
        }
    };
    userGestureEvents.forEach(evt => window.addEventListener(evt, handleUserGesture, { passive: true }));

    // Prime audio when user touches or clicks anywhere on the preloader
    if (preloader) {
        preloader.addEventListener('pointerdown', () => unlockAudio(), { passive: true });
    }

    const flashAudioPulse = () => {
        if (!audioBtn) return;
        audioBtn.classList.add('pulse-active');
        clearTimeout(pulseTimeout);
        pulseTimeout = setTimeout(() => {
            audioBtn.classList.remove('pulse-active');
        }, 320);
    };

    const playRomanSound = (key) => {
        if (!audioEnabled) return;
        unlockAudio();

        const cfg = soundConfigs[key];
        if (!cfg) return;

        flashAudioPulse();

        // 1. High-fidelity Web Audio BufferSource with Spatial Panning & Reverb Send
        if (audioCtx && soundBuffers[key]) {
            try {
                if (audioCtx.state === 'suspended') audioCtx.resume();
                const source = audioCtx.createBufferSource();
                source.buffer = soundBuffers[key];

                const sfxGain = audioCtx.createGain();
                sfxGain.gain.setValueAtTime(cfg.vol, audioCtx.currentTime);

                // Direct transparent routing for natural acoustic playback
                const sfxFilter = audioCtx.createBiquadFilter();
                sfxFilter.type = 'allpass';

                // Gentle fade at the natural end of the file to prevent hard buffer cutoffs
                if (key === 'morph') {
                    sfxGain.gain.setValueAtTime(cfg.vol, audioCtx.currentTime + 1.40);
                    sfxGain.gain.linearRampToValueAtTime(0.0001, audioCtx.currentTime + 1.82);
                } else if (key === 'levitation') {
                    sfxGain.gain.setValueAtTime(cfg.vol, audioCtx.currentTime + 1.50);
                    sfxGain.gain.linearRampToValueAtTime(0.0001, audioCtx.currentTime + 2.05);
                }

                source.connect(sfxFilter);
                sfxFilter.connect(sfxGain);

                // Direct dry routing through 3D Spatial Panner (or Master)
                if (spatialPanner) {
                    sfxGain.connect(spatialPanner);
                } else if (masterGain) {
                    sfxGain.connect(masterGain);
                } else {
                    sfxGain.connect(audioCtx.destination);
                }

                // Wet acoustic send to Roman Cathedral Reverb (generous wet diffusion for levitation & morph)
                if (reverbConvolver && key !== 'ambient') {
                    const sendGain = audioCtx.createGain();
                    const sendAmt = key === 'levitation' ? 0.42 : (key === 'morph' ? 0.28 : 0.22);
                    sendGain.gain.setValueAtTime(sendAmt, audioCtx.currentTime);
                    sfxGain.connect(sendGain);
                    sendGain.connect(reverbConvolver);
                }

                // Cinematic Tailored Sidechain Ducking with Smooth Asymptotic Release
                if (key === 'morph') {
                    triggerDucking(0.70, 0.40, 0.45); // Smooth 30% breath for the authentic morph sound
                } else if (key === 'levitation') {
                    triggerDucking(0.48, 0.80, 0.45);
                } else if (key === 'warrior') {
                    triggerDucking(0.50, 0.85, 0.50);
                } else if (key === 'pedestal') {
                    triggerDucking(0.55, 0.45, 0.40);
                }

                source.start(0);
                return;
            } catch (e) {}
        }

        // 2. High-speed HTML5 Audio fallback
        const el = audioElements[key];
        if (el) {
            try {
                el.currentTime = 0;
                el.volume = cfg.vol;
                el.play().catch(() => {});
            } catch (e) {}
        }
    };

    audioBtn.addEventListener('click', () => {
        unlockAudio();
        const label = audioBtn.querySelector('#audio-label');

        // If audio was silent or suspended, activate immediately on first click
        if (!ambientPlaying || (audioCtx && audioCtx.state !== 'running')) {
            audioEnabled = true;
            audioBtn.classList.remove('muted');
            if (label) label.textContent = 'SOUND · ON';
            if (masterGain && audioCtx) {
                masterGain.gain.setValueAtTime(1.0, audioCtx.currentTime);
            }
            startAmbient();
            playRomanSound('morph');
            return;
        }

        audioEnabled = !audioEnabled;
        audioBtn.classList.toggle('muted', !audioEnabled);
        if (label) label.textContent = audioEnabled ? 'SOUND · ON' : 'SOUND · OFF';
        if (masterGain && audioCtx) {
            masterGain.gain.setTargetAtTime(audioEnabled ? 1.0 : 0.0, audioCtx.currentTime, 0.05);
        }
        if (audioEnabled) {
            startAmbient();
            playRomanSound('morph');
        } else {
            stopAmbient();
        }
    });

    // DOM References
    const header = overlay.querySelector('.brand-header');
    const levitationInner = document.getElementById('levitation-inner');
    const aboutLabel = document.getElementById('about-label');
    const aboutMain = document.getElementById('about-main');
    const aboutSub = document.getElementById('about-sub');
    const warriorTag = document.getElementById('warrior-tag');
    const warriorTitle = document.getElementById('warrior-title');
    const warriorDesc = document.getElementById('warrior-desc');

    // 3D Spatial Mouse Parallax Tracking
    let mouseX = 0, mouseY = 0;
    let textTiltX = 0, textTiltY = 0;

    window.addEventListener('mousemove', (e) => {
        mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
        mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
    });

    // Three.js Scene Setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 100);
    camera.position.set(0, 0, 5.0);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({
        canvas: canvas,
        antialias: true,
        alpha: true,
        powerPreference: 'high-performance'
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));

    const maxAnisotropy = renderer.capabilities.getMaxAnisotropy();

    // 6 Master Textures Progressive Loading (3 White, 3 Black)
    const textureLoader = new THREE.TextureLoader();
    let texturesLoaded = 0;
    const totalTextures = 6;
    let initialRenderTriggered = false;
    let targetProgress = 0;
    let displayedProgress = 0;
    let preloaderCompleted = false;

    const ARCHIVAL_TELEMETRY = [
        "ACQUIRING APUAN CALCITE SLAB...",
        "SCLEROMETRIC MINERAL MAPPING...",
        "ZEISS OPTICAL REFRACTIVE CALIBRATION...",
        "QUARRYING NERO MARQUINA BASALT...",
        "CHISELING TITANIUM CORE FILIGREE...",
        "HARMONIC EQUILIBRIUM ACHIEVED."
    ];

    // Smooth Decimal Interpolation Loop
    const updatePreloaderProgress = () => {
        if (preloaderCompleted) return;

        // Easing interpolation towards targetProgress
        displayedProgress += (targetProgress - displayedProgress) * 0.12;
        if (texturesLoaded === totalTextures && 100 - displayedProgress < 0.8) {
            displayedProgress = 100;
        }

        if (preloaderFill) {
            preloaderFill.style.width = `${Math.min(100, displayedProgress)}%`;
        }
        if (preloaderPercentage) {
            const intVal = Math.min(100, Math.floor(displayedProgress));
            preloaderPercentage.textContent = `${intVal < 10 ? '0' + intVal : intVal}%`;
        }

        // When all 6 textures are loaded and visual progress has completed
        if (texturesLoaded === totalTextures && displayedProgress >= 100) {
            preloaderCompleted = true;
            if (preloaderFill) preloaderFill.style.width = '100%';
            if (preloaderPercentage) preloaderPercentage.textContent = '100%';
            if (preloaderStatus) preloaderStatus.textContent = 'ARCHIVE UNLOCKED · ENTERING SANCTUM';

            // Fully illuminate all Roman numerals
            for (let i = 1; i <= 6; i++) {
                const r = document.getElementById(`r-num-${i}`);
                if (r) r.classList.add('active');
            }

            let partingTriggered = false;
            const triggerParting = () => {
                if (partingTriggered) return;
                partingTriggered = true;

                // 1. Unconditionally resume AudioContext and trigger entrance acoustics
                if (!isAudioInitialized) initAudio();
                if (audioCtx && audioCtx.state === 'suspended') {
                    try { audioCtx.resume().catch(() => {}); } catch (e) {}
                }
                if (audioEnabled) {
                    startAmbient();
                    playRomanSound('pedestal');
                }

                // 2. Monolithic Slabs Parting Animation
                if (preloader) preloader.classList.add('parting');
                setTimeout(() => {
                    if (preloader) preloader.classList.add('loaded');
                }, 1250);
            };

            // If audio is already playing (autoplay permitted or user clicked during load)
            if (ambientPlaying && audioCtx && audioCtx.state === 'running') {
                setTimeout(triggerParting, 350);
            } else {
                // Show "ENTER ARCHIVE" prompt so user interaction unlocks Web Audio
                if (preloader) {
                    preloader.classList.add('ready-to-enter');
                    preloader.addEventListener('click', triggerParting, { once: true });
                }
                if (preloaderEnterBtn) {
                    preloaderEnterBtn.addEventListener('click', (e) => {
                        e.stopPropagation();
                        triggerParting();
                    }, { once: true });
                }

                // Also allow scrolling the wheel or pressing Enter/Space to enter with audio
                const onEnterInput = (e) => {
                    if (partingTriggered) return;
                    if (e.type === 'wheel' || e.code === 'Space' || e.code === 'Enter' || e.key === 'ArrowDown') {
                        window.removeEventListener('wheel', onEnterInput);
                        window.removeEventListener('keydown', onEnterInput);
                        triggerParting();
                    }
                };
                window.addEventListener('wheel', onEnterInput, { passive: true });
                window.addEventListener('keydown', onEnterInput, { passive: true });

                // Generous timeout (8s) so user has time to click, but page never gets stuck
                setTimeout(() => {
                    if (!partingTriggered) triggerParting();
                }, 8000);
            }
            return;
        }

        requestAnimationFrame(updatePreloaderProgress);
    };
    requestAnimationFrame(updatePreloaderProgress);

    const configureTexture = (tex) => {
        tex.colorSpace = THREE.NoColorSpace;
        tex.generateMipmaps = false;
        tex.minFilter = THREE.LinearFilter;
        tex.magFilter = THREE.LinearFilter;
        tex.anisotropy = maxAnisotropy;
        texturesLoaded++;

        // Ignite active Roman numeral
        const romanEl = document.getElementById(`r-num-${texturesLoaded}`);
        if (romanEl) romanEl.classList.add('active');

        // Update archival status text
        if (preloaderStatus && ARCHIVAL_TELEMETRY[texturesLoaded - 1]) {
            preloaderStatus.textContent = ARCHIVAL_TELEMETRY[texturesLoaded - 1];
        }

        targetProgress = (texturesLoaded / totalTextures) * 100;

        if (texturesLoaded >= 2 && !initialRenderTriggered) {
            initialRenderTriggered = true;
            renderFrame();
        }
    };

    // Load Carrara White master textures
    const texWhitePedestal = textureLoader.load(whitePedestalImg, configureTexture);
    const texWhiteLevitate = textureLoader.load(whiteLevitateImg, configureTexture);
    const texWhiteWarrior  = textureLoader.load(whiteWarriorImg, configureTexture);

    // Load Nero Marquina Black master textures
    const texBlackPedestal = textureLoader.load(blackPedestalImg, configureTexture);
    const texBlackLevitate = textureLoader.load(blackLevitateImg, configureTexture);
    const texBlackWarrior  = textureLoader.load(blackWarriorImg, configureTexture);

    // Compute Frustum visible dimensions matching camera view at Z=5.0
    const getVisibleSize = () => {
        const fovRad = (camera.fov * Math.PI) / 180;
        const height = 2 * Math.tan(fovRad / 2) * 5.0;
        const width = height * camera.aspect;
        return { width, height };
    };

    const visibleSize = getVisibleSize();
    const geometry = new THREE.PlaneGeometry(1, 1, 1, 1);

    // =======================================================
    // 3-ACT 3D KINETIC SHADERS & CRYSTALLINE CLEAVE
    // =======================================================
    const vertexShader = `
        varying vec2 vUv;

        void main() {
            vUv = uv;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
    `;

    const fragmentShader = `
        uniform sampler2D uTexWhitePedestal;
        uniform sampler2D uTexWhiteLevitate;
        uniform sampler2D uTexWhiteWarrior;

        uniform sampler2D uTexBlackPedestal;
        uniform sampler2D uTexBlackLevitate;
        uniform sampler2D uTexBlackWarrior;

        uniform vec2 uResolution;
        uniform vec2 uTextureRes; // 2752 x 1536
        uniform float uProgress;  // 1.0 = Carrara White, 0.0 = Nero Marquina Black
        uniform float uScroll;    // 0.0 (Pedestal) -> 1.0 (Levitate) -> 2.0 (Warrior)
        uniform float uScrollVel;
        uniform float uTime;

        varying vec2 vUv;

        // 2D Voronoi Cellular Noise for Crystalline Marble Cleavage
        vec2 hash2(vec2 p) {
            p = vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)));
            return fract(sin(p) * 43758.5453123);
        }

        float voronoi(vec2 x) {
            vec2 n = floor(x);
            vec2 f = fract(x);
            float m_dist = 8.0;
            for (int j = -1; j <= 1; j++) {
                for (int i = -1; i <= 1; i++) {
                    vec2 g = vec2(float(i), float(j));
                    vec2 o = hash2(n + g);
                    vec2 r = g + o - f;
                    float d = dot(r, r);
                    m_dist = min(m_dist, d);
                }
            }
            return sqrt(m_dist);
        }

        // Exact Aspect Ratio Cover UV math
        vec2 getCoverUv(vec2 uv, vec2 screenRes, vec2 texRes) {
            float screenAspect = screenRes.x / screenRes.y;
            float texAspect = texRes.x / texRes.y;
            vec2 ratio = vec2(
                min(screenAspect / texAspect, 1.0),
                min(texAspect / screenAspect, 1.0)
            );
            return vec2(
                (uv.x - 0.5) * ratio.x + 0.5,
                (uv.y - 0.5) * ratio.y + 0.5
            );
        }

        // Dedicated Carrara White 3-Act Continuous Sampler
        vec3 sampleWhite(vec2 uvSample, float scrollVal) {
            float s = clamp(scrollVal, 0.0, 2.0);
            vec2 baseUv = getCoverUv(uvSample, uResolution, uTextureRes);

            // =======================================================
            // ACT 1 -> ACT 2: Pedestal to Only Glasses (s: 0.0 -> 1.0)
            // =======================================================
            if (s <= 1.0) {
                float ease1 = smoothstep(0.0, 1.0, s);

                // Sample both images at exact 1:1 baseUv (zero zooming)
                vec3 pedColor = texture2D(uTexWhitePedestal, baseUv).rgb;
                vec3 levColor = texture2D(uTexWhiteLevitate, baseUv).rgb;

                // Crystalline Marble Dissolution Front rising smoothly across full height
                float v1 = voronoi(uvSample * 6.0);
                float v2 = voronoi(uvSample * 14.0 + 0.5);
                float stoneNoise = (v1 * 0.65 + v2 * 0.35 - 0.5) * 0.12;

                // Broad progressive sweep across the entire height of the screen
                float vertCoord = uvSample.y + stoneNoise;
                float threshold1 = mix(-0.25, 1.25, ease1);
                float bandWidth1 = 0.28;
                float blend12 = 1.0 - smoothstep(threshold1 - bandWidth1, threshold1 + bandWidth1, vertCoord);
                blend12 = clamp(blend12, 0.0, 1.0);

                // Caustic glint along the rising fracture line
                float fractureDist1 = abs(vertCoord - threshold1);
                float ridge1 = exp(-(fractureDist1 * fractureDist1) / (2.0 * bandWidth1 * bandWidth1 * 0.30));
                float edgeFade1 = smoothstep(0.0, 0.06, ease1) * smoothstep(1.0, 0.94, ease1);
                ridge1 *= edgeFade1;

                vec3 mixedColor = mix(pedColor, levColor, blend12);
                vec3 caustic = vec3(1.0, 0.98, 0.94) * pow(ridge1, 2.5) * 0.35;

                return mixedColor + caustic;
            }

            // =======================================================
            // ACT 2 -> ACT 3: Only Glasses to Roman Warrior (s: 1.0 -> 2.0)
            // =======================================================
            float s2 = clamp(s - 1.0, 0.0, 1.0);
            float ease2 = smoothstep(0.0, 1.0, s2);

            // Sample both images at exact 1:1 baseUv (zero zooming)
            vec3 levColor = texture2D(uTexWhiteLevitate, baseUv).rgb;
            vec3 warriorColor = texture2D(uTexWhiteWarrior, baseUv).rgb;

            // Chiseled Apuan Marble Fracture Sweep from Left to Right
            float sweepAngle = uvSample.x - uvSample.y * 0.18;
            float stoneCleaveNoise = (voronoi(uvSample * 7.0) - 0.5) * 0.12 + (voronoi(uvSample * 15.0) - 0.5) * 0.05;
            float chiselCoord = sweepAngle + stoneCleaveNoise * ease2;

            // Broad, gentle diagonal carve threshold across screen
            float threshold2 = mix(-0.45, 1.35, ease2);
            float edgeWidth2 = 0.24;
            float warriorBlend = 1.0 - smoothstep(threshold2 - edgeWidth2, threshold2 + edgeWidth2, chiselCoord);
            warriorBlend = clamp(warriorBlend, 0.0, 1.0);

            // Crystalline Caustic Glint along the carving edge
            float fractureDist2 = abs(chiselCoord - threshold2);
            float ridge2 = exp(-(fractureDist2 * fractureDist2) / (2.0 * edgeWidth2 * edgeWidth2 * 0.30));
            float edgeFade2 = smoothstep(0.0, 0.06, ease2) * smoothstep(1.0, 0.94, ease2);
            ridge2 *= edgeFade2;

            vec3 mixedColor = mix(levColor, warriorColor, warriorBlend);
            vec3 caustic = vec3(1.0, 0.98, 0.94) * pow(ridge2, 2.5) * 0.40;

            return mixedColor + caustic;
        }

        // Dedicated Nero Marquina Black 3-Act Continuous Sampler
        vec3 sampleBlack(vec2 uvSample, float scrollVal) {
            float s = clamp(scrollVal, 0.0, 2.0);
            vec2 baseUv = getCoverUv(uvSample, uResolution, uTextureRes);

            // ACT 1 -> ACT 2: Pedestal to Only Glasses (s: 0.0 -> 1.0)
            if (s <= 1.0) {
                float ease1 = smoothstep(0.0, 1.0, s);

                // Sample both images at exact 1:1 baseUv (zero zooming)
                vec3 pedColor = texture2D(uTexBlackPedestal, baseUv).rgb;
                vec3 levColor = texture2D(uTexBlackLevitate, baseUv).rgb;

                float v1 = voronoi(uvSample * 6.0);
                float v2 = voronoi(uvSample * 14.0 + 0.5);
                float stoneNoise = (v1 * 0.65 + v2 * 0.35 - 0.5) * 0.12;

                float vertCoord = uvSample.y + stoneNoise;
                float threshold1 = mix(-0.25, 1.25, ease1);
                float bandWidth1 = 0.28;
                float blend12 = 1.0 - smoothstep(threshold1 - bandWidth1, threshold1 + bandWidth1, vertCoord);
                blend12 = clamp(blend12, 0.0, 1.0);

                float fractureDist1 = abs(vertCoord - threshold1);
                float ridge1 = exp(-(fractureDist1 * fractureDist1) / (2.0 * bandWidth1 * bandWidth1 * 0.30));
                float edgeFade1 = smoothstep(0.0, 0.06, ease1) * smoothstep(1.0, 0.94, ease1);
                ridge1 *= edgeFade1;

                vec3 mixedColor = mix(pedColor, levColor, blend12);
                vec3 caustic = vec3(0.95, 0.97, 1.0) * pow(ridge1, 2.5) * 0.35;

                return mixedColor + caustic;
            }

            // ACT 2 -> ACT 3: Only Glasses to Roman Warrior (s: 1.0 -> 2.0)
            float s2 = clamp(s - 1.0, 0.0, 1.0);
            float ease2 = smoothstep(0.0, 1.0, s2);

            // Sample both images at exact 1:1 baseUv (zero zooming)
            vec3 levColor = texture2D(uTexBlackLevitate, baseUv).rgb;
            vec3 warriorColor = texture2D(uTexBlackWarrior, baseUv).rgb;

            float sweepAngle = uvSample.x - uvSample.y * 0.18;
            float stoneCleaveNoise = (voronoi(uvSample * 7.0) - 0.5) * 0.12 + (voronoi(uvSample * 15.0) - 0.5) * 0.05;
            float chiselCoord = sweepAngle + stoneCleaveNoise * ease2;

            float threshold2 = mix(-0.45, 1.35, ease2);
            float edgeWidth2 = 0.24;
            float warriorBlend = 1.0 - smoothstep(threshold2 - edgeWidth2, threshold2 + edgeWidth2, chiselCoord);
            warriorBlend = clamp(warriorBlend, 0.0, 1.0);

            float fractureDist2 = abs(chiselCoord - threshold2);
            float ridge2 = exp(-(fractureDist2 * fractureDist2) / (2.0 * edgeWidth2 * edgeWidth2 * 0.30));
            float edgeFade2 = smoothstep(0.0, 0.06, ease2) * smoothstep(1.0, 0.94, ease2);
            ridge2 *= edgeFade2;

            vec3 mixedColor = mix(levColor, warriorColor, warriorBlend);
            vec3 caustic = vec3(0.95, 0.97, 1.0) * pow(ridge2, 2.5) * 0.40;

            return mixedColor + caustic;
        }

        // Dynamic eyewear epicenter tracking across the 3 scroll acts
        vec2 getFocalCenter(float s) {
            float s1 = clamp(s, 0.0, 1.0);
            float s2 = clamp(s - 1.0, 0.0, 1.0);
            vec2 p01 = mix(vec2(0.50, 0.37), vec2(0.50, 0.50), s1);
            vec2 p12 = mix(p01, vec2(0.27, 0.70), s2);
            return p12;
        }

        void main() {
            vec2 uv = vUv;

            // Ultra-fast path when stationary in White or Black edition
            if (uProgress >= 0.9995) {
                vec3 finalCol = sampleWhite(uv, uScroll);
                gl_FragColor = vec4(finalCol, 1.0);
                return;
            }
            if (uProgress <= 0.0005) {
                vec3 finalCol = sampleBlack(uv, uScroll);
                gl_FragColor = vec4(finalCol, 1.0);
                return;
            }

            // Dynamic Focal Epicenter
            vec2 focal = getFocalCenter(uScroll);
            float aspect = uResolution.x / uResolution.y;
            vec2 delta = uv - focal;
            vec2 screenPos = vec2(delta.x * aspect, delta.y * 1.15);
            float radius = length(screenPos);
            vec2 radialDir = radius > 0.0001 ? (screenPos / radius) : vec2(0.0, 1.0);

            // Crystalline Voronoi Cleavage Fields
            float v1 = voronoi(screenPos * 5.0);
            float v2 = voronoi(screenPos * 13.0 + vec2(uProgress * 0.35));
            float crystalNoise = (v1 * 0.72 + v2 * 0.28) * 0.085;

            // Angular harmonic facets mimicking chiseled stone
            float angle = atan(screenPos.y, screenPos.x);
            float angularFacet = sin(angle * 6.0) * 0.03 + cos(angle * 12.0) * 0.015;

            // Radial wave front with overshoot for clean opening & closing
            float maxRadius = 1.55;
            float minRadius = -0.15;
            float waveRadius = mix(maxRadius, minRadius, uProgress);

            float centerDamp = smoothstep(-0.06, 0.24, waveRadius);
            float dist = radius - waveRadius + (crystalNoise + angularFacet) * centerDamp;

            // Crystalline Caustic Fracture Ridge
            float ridgeWidth = 0.042;
            float fractureRidge = exp(-(dist * dist) / (2.0 * ridgeWidth * ridgeWidth));
            float edgeFade = smoothstep(0.0, 0.04, uProgress) * smoothstep(1.0, 0.96, uProgress);
            fractureRidge *= edgeFade;

            // Optical Lens Refraction along fracture line
            float lensRefraction = -dist * fractureRidge * 0.26;
            vec2 displacement = vec2(radialDir.x / aspect, radialDir.y / 1.15) * lensRefraction;

            // Micro-Confined Abbe Chromatic Dispersion
            float abbeSpread = 0.016 * fractureRidge;
            vec2 uvRadialDir = normalize(vec2(radialDir.x / aspect, radialDir.y / 1.15));

            vec2 uvRed   = uv + displacement + uvRadialDir * abbeSpread;
            vec2 uvGreen = uv + displacement;
            vec2 uvBlue  = uv + displacement - uvRadialDir * (abbeSpread * 1.4);

            // High-performance selective Abbe dispersion
            vec3 colorWhite;
            vec3 colorBlack;

            if (fractureRidge > 0.002) {
                vec3 whiteR = sampleWhite(uvRed, uScroll);
                vec3 whiteG = sampleWhite(uvGreen, uScroll);
                vec3 whiteB = sampleWhite(uvBlue, uScroll);
                colorWhite = vec3(whiteR.r, whiteG.g, whiteB.b);

                vec3 blackR = sampleBlack(uvRed, uScroll);
                vec3 blackG = sampleBlack(uvGreen, uScroll);
                vec3 blackB = sampleBlack(uvBlue, uScroll);
                colorBlack = vec3(blackR.r, blackG.g, blackB.b);
            } else {
                colorWhite = sampleWhite(uvGreen, uScroll);
                colorBlack = sampleBlack(uvGreen, uScroll);
            }

            // Blend across crystalline fracture edge
            float edgeSoftness = 0.048;
            float blendFactor = smoothstep(-edgeSoftness, edgeSoftness, dist);
            vec3 finalColor = mix(colorBlack, colorWhite, blendFactor);

            // Incandescent Platinum Caustic Flash along fracture boundary
            float caustic = pow(fractureRidge, 2.8);
            vec3 causticColor = vec3(1.0, 0.97, 0.92) * caustic * 0.65;

            // Subtle film grain
            float grain = (fract(sin(dot(uv * (uTime * 0.5 + 7.0), vec2(12.9898, 78.233))) * 43758.5453) - 0.5) * 0.010;

            gl_FragColor = vec4(finalColor + causticColor + grain, 1.0);
        }
    `;

    const uniforms = {
        uTexWhitePedestal: { value: texWhitePedestal },
        uTexWhiteLevitate: { value: texWhiteLevitate },
        uTexWhiteWarrior:  { value: texWhiteWarrior },

        uTexBlackPedestal: { value: texBlackPedestal },
        uTexBlackLevitate: { value: texBlackLevitate },
        uTexBlackWarrior:  { value: texBlackWarrior },

        uResolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
        uTextureRes: { value: new THREE.Vector2(2752, 1536) },
        uProgress: { value: 1.0 },   // Starts at Carrara White (1.0)
        uScroll: { value: 0.0 },     // 0.0 (Pedestal) -> 1.0 (Levitate) -> 2.0 (Warrior)
        uScrollVel: { value: 0.0 },
        uTime: { value: 0.0 }
    };

    const material = new THREE.ShaderMaterial({
        vertexShader,
        fragmentShader,
        uniforms,
        side: THREE.DoubleSide
    });

    const plane = new THREE.Mesh(geometry, material);
    plane.scale.set(visibleSize.width, visibleSize.height, 1);
    scene.add(plane);

    // State Tracking
    const state = {
        progress: 1.0,
        isTransitioning: false
    };

    // Continuous 3-Act Scroll Progression (0.0: Pedestal, 1.0: Levitate, 2.0: Warrior)
    const scrollState = {
        target: 0.0,
        current: 0.0
    };

    let scrollVelocity = 0.0;
    let prevScroll = 0.0;

    const blackBg = [18, 18, 18];
    const whiteBg = [226, 221, 216];

    const updateUI = (p) => {
        const isDark = p < 0.5;

        const r = Math.round(blackBg[0] + p * (whiteBg[0] - blackBg[0]));
        const g = Math.round(blackBg[1] + p * (whiteBg[1] - blackBg[1]));
        const b = Math.round(blackBg[2] + p * (whiteBg[2] - blackBg[2]));
        document.body.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;

        header.classList.toggle('dark-theme', isDark);
        if (preloader) preloader.classList.toggle('dark-theme', isDark);
        if (levitationAbout) levitationAbout.classList.toggle('dark-theme', isDark);
        if (warriorShowcase) warriorShowcase.classList.toggle('dark-theme', isDark);
        if (scrollCue) scrollCue.classList.toggle('dark-theme', isDark);
        if (audioBtn) audioBtn.classList.toggle('dark-theme', isDark);

        // Stone Narrative Inversion for Inscription Layer (Act II)
        if (aboutLabel && aboutMain && aboutSub) {
            if (p >= 0.5) {
                aboutLabel.textContent = '01 · CARRARA WHITE';
                aboutMain.innerHTML = 'CHISELED FROM TUSCAN APUAN MARBLE<br>BOUND WITH ARCHIVAL TITANIUM FILIGREE';
                aboutSub.textContent = 'THIRTY-FOUR GRAMS · ZEISS MINERAL OPTICS';
            } else {
                aboutLabel.textContent = '02 · NERO MARQUINA ONYX';
                aboutMain.innerHTML = 'OBSIDIAN STONE WITH CALCITE VEINS<br>BOUND WITH GUNMETAL TITANIUM FILIGREE';
                aboutSub.textContent = 'THIRTY-FOUR GRAMS · POLISHED MIDNIGHT';
            }
        }

        // Stone Narrative Inversion for Warrior Showcase Dossier (Act III)
        if (warriorTag && warriorTitle && warriorDesc) {
            if (p >= 0.5) {
                warriorTag.textContent = '— SPECIMEN NO. I · ARCHIVAL SHOWCASE —';
                warriorTitle.textContent = "THE WARRIOR'S VISAGE";
                warriorDesc.textContent = 'Chiseled in the classical Roman tradition. Milled from a single block of Tuscan Carrara marble to contour the anatomical architecture of the nasal bridge and zygomatic arches with zero pressure points.';
            } else {
                warriorTag.textContent = '— SPECIMEN NO. II · OBSIDIAN SHOWCASE —';
                warriorTitle.textContent = 'THE MIDNIGHT LEGION';
                warriorDesc.textContent = 'Chiseled from solid Basque Nero Marquina black marble with white calcite veins. Paired with gunmetal titanium filigree and dark mineral crystal optics.';
            }
        }
    };

    let activeTween = null;

    // Crystalline Fracture Transition for White <-> Black (Brisk, Responsive Pace)
    const transitionTo = (targetProgress, duration = 1.15) => {
        if (activeTween) activeTween.kill();
        state.isTransitioning = true;
        playRomanSound('morph');

        activeTween = gsap.to(state, {
            progress: targetProgress,
            duration: duration,
            ease: 'power2.inOut',
            onUpdate: () => {
                uniforms.uProgress.value = state.progress;
                updateUI(state.progress);
            },
            onComplete: () => {
                state.isTransitioning = false;
                state.progress = targetProgress;
                uniforms.uProgress.value = targetProgress;
                updateUI(targetProgress);
                activeTween = null;
            }
        });
    };

    const toggleEdition = () => {
        const target = state.progress < 0.5 ? 1.0 : 0.0;
        transitionTo(target);
    };

    // Buttery Smooth Scroll Controller with Active Tween Cancellation
    let activeScrollTween = null;

    const smoothScrollTo = (targetStage, duration = 0.85, ease = 'power2.out') => {
        if (activeScrollTween) activeScrollTween.kill();
        const clampedTarget = Math.min(Math.max(targetStage, 0.0), 2.0);
        activeScrollTween = gsap.to(scrollState, {
            target: clampedTarget,
            duration: duration,
            ease: ease,
            onComplete: () => {
                activeScrollTween = null;
            }
        });
    };

    // Horizontal Drag / Swipe to Morph Editions
    let isDragging = false;
    let dragStartX = 0;
    let dragStartProgress = 1.0;

    const startDrag = (x) => {
        isDragging = true;
        dragStartX = x;
        dragStartProgress = state.progress;
        if (activeTween) activeTween.kill();
    };

    const moveDrag = (x) => {
        if (!isDragging) return;
        const delta = (x - dragStartX) / (window.innerWidth * 0.5);
        state.progress = Math.min(Math.max(dragStartProgress + delta, 0.0), 1.0);
        uniforms.uProgress.value = state.progress;
        updateUI(state.progress);
    };

    const endDrag = () => {
        if (!isDragging) return;
        isDragging = false;
        const target = state.progress >= 0.5 ? 1.0 : 0.0;
        transitionTo(target, 0.85);
    };

    // Canvas Click to Toggle Edition
    canvas.addEventListener('click', () => {
        if (!isDragging) toggleEdition();
    });

    // Pointer Events for Drag
    canvas.addEventListener('mousedown', (e) => startDrag(e.clientX));
    window.addEventListener('mousemove', (e) => moveDrag(e.clientX));
    window.addEventListener('mouseup', endDrag);

    // Mobile Touch Events with Inertia Buffer
    let touchStartY = 0;
    canvas.addEventListener('touchstart', (e) => {
        if (activeScrollTween) {
            activeScrollTween.kill();
            activeScrollTween = null;
        }
        touchStartY = e.touches[0].clientY;
        startDrag(e.touches[0].clientX);
    }, { passive: true });

    window.addEventListener('touchmove', (e) => {
        const deltaY = e.touches[0].clientY - touchStartY;
        touchStartY = e.touches[0].clientY;
        const clampedDeltaY = Math.sign(deltaY) * Math.min(Math.abs(deltaY), 45);
        scrollState.target = Math.min(Math.max(scrollState.target - clampedDeltaY * 0.0015, 0.0), 2.0);
        moveDrag(e.touches[0].clientX);
    }, { passive: true });

    window.addEventListener('touchend', () => {
        endDrag();
        const nearestStage = Math.round(scrollState.target);
        if (Math.abs(scrollState.target - nearestStage) > 0.01) {
            smoothScrollTo(nearestStage, 0.65);
        }
    });

    // Wheel Scroll Interaction with Delta Buffer & Magnetic Snapping
    let scrollSnapTimeout = null;

    window.addEventListener('wheel', (e) => {
        e.preventDefault();
        if (activeScrollTween) {
            activeScrollTween.kill();
            activeScrollTween = null;
        }

        // Responsive, energetic wheel scroll increment
        const rawDelta = e.deltaY;
        const clampedDelta = Math.sign(rawDelta) * Math.min(Math.abs(rawDelta), 45);
        const scrollDelta = clampedDelta * 0.00070;

        scrollState.target = Math.min(Math.max(scrollState.target + scrollDelta, 0.0), 2.0);

        // Magnetic snap: when wheel input pauses, gracefully glide into closest phase center
        clearTimeout(scrollSnapTimeout);
        scrollSnapTimeout = setTimeout(() => {
            const currentTarget = scrollState.target;
            const nearestStage = Math.round(currentTarget);
            if (Math.abs(currentTarget - nearestStage) > 0.01) {
                smoothScrollTo(nearestStage, 0.65);
            }
        }, 150);
    }, { passive: false });


    // Keyboard Navigation
    window.addEventListener('keydown', (e) => {
        if (e.code === 'Space') {
            e.preventDefault();
            toggleEdition();
        } else if (e.key === 'ArrowRight') {
            transitionTo(0.0);
        } else if (e.key === 'ArrowLeft') {
            transitionTo(1.0);
        } else if (e.key === 'ArrowDown') {
            const nextStage = Math.min(Math.floor(scrollState.target + 1.001), 2.0);
            smoothScrollTo(nextStage, 0.85);
        } else if (e.key === 'ArrowUp') {
            const prevStage = Math.max(Math.ceil(scrollState.target - 1.001), 0.0);
            smoothScrollTo(prevStage, 0.85);
        } else if (['1', '2', '3'].includes(e.key)) {
            const stepNum = parseInt(e.key) - 1;
            smoothScrollTo(stepNum, 0.90);
        }
    });

    // Responsive Resize Handler
    window.addEventListener('resize', () => {
        const width = window.innerWidth;
        const height = window.innerHeight;

        camera.aspect = width / height;
        camera.updateProjectionMatrix();

        renderer.setSize(width, height);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));

        const size = getVisibleSize();
        plane.scale.set(size.width, size.height, 1);

        uniforms.uResolution.value.set(width, height);
    });

    // =======================================================
    // CINEMATIC RENDER LOOP & BUFFERED SCROLL ENGINE
    // =======================================================
    const clock = new THREE.Clock();

    // Dwell Buffer Plateaus: Stage 1 [0..0.08], Stage 2 [0.92..1.08], Stage 3 [1.92..2.0]
    const mapScrollToStage = (v) => {
        const val = Math.min(Math.max(v, 0.0), 2.0);
        if (val <= 0.08) {
            return 0.0;
        } else if (val < 0.92) {
            const t = (val - 0.08) / (0.92 - 0.08);
            return THREE.MathUtils.smoothstep(t, 0.0, 1.0) * 1.0;
        } else if (val <= 1.08) {
            return 1.0;
        } else if (val < 1.92) {
            const t = (val - 1.08) / (1.92 - 1.08);
            return 1.0 + THREE.MathUtils.smoothstep(t, 0.0, 1.0) * 1.0;
        } else {
            return 2.0;
        }
    };

    const renderFrame = () => {
        requestAnimationFrame(renderFrame);

        const elapsedTime = clock.getElapsedTime();
        uniforms.uTime.value = elapsedTime;

        // Snappy, responsive Continuous Lerp with 0.078 damping
        scrollState.current = THREE.MathUtils.lerp(scrollState.current, scrollState.target, 0.078);

        // Map smooth virtual scroll to buffered stage scroll (with dwell plateaus)
        const effectiveScroll = mapScrollToStage(scrollState.current);
        uniforms.uScroll.value = effectiveScroll;

        // Dynamic Scroll Velocity for subtle effects
        const velDelta = Math.abs(scrollState.current - prevScroll);
        scrollVelocity = THREE.MathUtils.lerp(scrollVelocity, velDelta * 3.0, 0.12);
        uniforms.uScrollVel.value = scrollVelocity;
        prevScroll = scrollState.current;

        const curScroll = scrollState.current;

        // ---------------------------------------------------
        // TRUE ORTHOGONAL PERSPECTIVE CAMERA ALIGNMENT
        // ---------------------------------------------------
        camera.position.set(0, 0, 5.0);
        camera.lookAt(0, 0, 0);
        // ---------------------------------------------------
        // EDITORIAL LAYERS SYNCHRONIZATION (3-ACT CHOREOGRAPHY)
        // ---------------------------------------------------
        // 1. Levitation About Inscription (Act II: Centered Inscription, active 0.38 to 1.45)
        if (levitationAbout) {
            if (curScroll > 0.38 && curScroll < 1.45) {
                let opacity = 1.0;
                if (curScroll < 0.78) {
                    opacity = Math.min((curScroll - 0.38) / 0.38, 1.0);
                } else if (curScroll > 1.15) {
                    opacity = Math.max(1.0 - (curScroll - 1.15) / 0.30, 0.0);
                }
                levitationAbout.style.opacity = opacity.toString();
                levitationAbout.style.filter = `blur(${(1.0 - opacity) * 7}px)`;
                levitationAbout.style.transform = `translateX(-50%) translateY(${(1.0 - opacity) * 12}px)`;
                levitationAbout.classList.add('active');
            } else {
                levitationAbout.style.opacity = '0';
                levitationAbout.style.filter = 'blur(8px)';
                levitationAbout.style.transform = 'translateX(-50%) translateY(12px)';
                levitationAbout.classList.remove('active');
            }
        }

        // 3D Spatial Mouse Tilt on Levitating Inscription
        if (levitationInner && curScroll > 0.4 && curScroll < 1.4) {
            textTiltX = THREE.MathUtils.lerp(textTiltX, -mouseY * 4.5, 0.06);
            textTiltY = THREE.MathUtils.lerp(textTiltY, mouseX * 6.5, 0.06);
            levitationInner.style.transform = `rotateX(${textTiltX}deg) rotateY(${textTiltY}deg)`;
        }

        // 2. Warrior Showcase Layer (Act III: Right Dossier, active > 1.25)
        if (warriorShowcase) {
            if (curScroll > 1.25) {
                const opacity = Math.min((curScroll - 1.25) / 0.45, 1.0);
                warriorShowcase.style.opacity = opacity.toString();
                warriorShowcase.style.filter = `blur(${(1.0 - opacity) * 8}px)`;
                warriorShowcase.style.transform = `translateY(-50%) translateX(${(1.0 - opacity) * 24}px)`;
                warriorShowcase.classList.add('active');
            } else {
                warriorShowcase.style.opacity = '0';
                warriorShowcase.style.filter = 'blur(8px)';
                warriorShowcase.style.transform = 'translateY(-50%) translateX(24px)';
                warriorShowcase.classList.remove('active');
            }
        }

        // 3. Archival Scroll Indicator Fade-Out (Act I -> Act II)
        if (scrollCue) {
            const cueOpacity = Math.max(1.0 - curScroll * 3.2, 0.0);
            scrollCue.style.opacity = cueOpacity.toString();
            scrollCue.style.pointerEvents = cueOpacity > 0.15 ? 'auto' : 'none';
            scrollCue.style.transform = `translateY(${(1.0 - cueOpacity) * 8}px)`;
        }

        // 4. Mastered Roman Acoustic Engine 2.0 Real-time Modulation
        if (ambientFilter && ambientGain && audioCtx && ambientPlaying) {
            let baseFilterFreq = 600;
            let baseGain = 0.22;

            // Material Tone Offset: Carrara White (+65Hz brighter crystalline shimmer) vs Nero Marquina (-65Hz deeper obsidian rumble)
            const materialTone = (state.progress - 0.5) * 130;

            if (curScroll <= 1.0) {
                const t = Math.max(0, Math.min(curScroll, 1.0));
                // Warm, supportive rise to 1150Hz in Act II (keeps spectrum >1200Hz pristine for levitation harmonics)
                baseFilterFreq = 600 + t * (1150 - 600) + materialTone;
                baseGain = 0.22 - t * 0.01;
            } else {
                const t = Math.max(0, Math.min(curScroll - 1.0, 1.0));
                // Rich lift into Act III Warrior
                baseFilterFreq = 1150 + t * (1550 - 1150) + materialTone;
                baseGain = 0.21 + t * 0.02;
            }

            // Kinetic Velocity Boost: brisk scrolling opens the acoustic filter like cutting through Roman air
            const kineticBoost = Math.min(scrollVelocity * 4000, 650);
            const targetFilterFreq = baseFilterFreq + kineticBoost;
            const targetQ = 1.1 + Math.min(scrollVelocity * 3.5, 1.0);

            ambientFilter.frequency.setTargetAtTime(targetFilterFreq, audioCtx.currentTime, 0.12);
            ambientFilter.Q.setTargetAtTime(targetQ, audioCtx.currentTime, 0.12);
            ambientGain.gain.setTargetAtTime(baseGain, audioCtx.currentTime, 0.25);
        }

        // 3D Spatial Audio Tracking (Stereo Panner linked to tablet rotation & mouse position)
        if (spatialPanner && audioCtx && plane) {
            const rotPan = (plane.rotation.y || 0) * 0.55;
            const mousePan = (mouseX || 0) * 0.25;
            const targetPan = Math.max(-0.65, Math.min(0.65, rotPan + mousePan));
            spatialPanner.pan.setTargetAtTime(targetPan, audioCtx.currentTime, 0.08);
        }

        // 5. Anti-Clatter Hysteresis & Cooldown for Phase Transitions (Synchronized with visual flight)
        const now = performance.now();
        const timeSinceLastShift = now - lastPhaseShiftTime;

        if (curScroll >= 0.35 && curScroll < 1.45 && activePhaseIndex !== 1) {
            if (timeSinceLastShift > PHASE_COOLDOWN) {
                activePhaseIndex = 1;
                lastPhaseShiftTime = now;
                playRomanSound('levitation');
            }
        } else if (curScroll >= 1.45 && activePhaseIndex !== 2) {
            if (timeSinceLastShift > PHASE_COOLDOWN) {
                activePhaseIndex = 2;
                lastPhaseShiftTime = now;
                playRomanSound('warrior');
            }
        } else if (curScroll <= 0.25 && activePhaseIndex !== 0) {
            if (timeSinceLastShift > PHASE_COOLDOWN) {
                activePhaseIndex = 0;
                lastPhaseShiftTime = now;
                playRomanSound('pedestal');
            }
        }

        // 6. Real-time Acoustic Waveform Equalizer Update
        if (masterAnalyser && eqBars && eqBars.length > 0) {
            if (audioEnabled && ambientPlaying) {
                masterAnalyser.getByteFrequencyData(freqData);
                const b1 = Math.max(3, (freqData[2] / 255) * 13);
                const b2 = Math.max(4, (freqData[5] / 255) * 15);
                const b3 = Math.max(3, (freqData[10] / 255) * 14);
                const b4 = Math.max(2, (freqData[16] / 255) * 11);
                eqBars[0].style.height = `${b1.toFixed(1)}px`;
                eqBars[1].style.height = `${b2.toFixed(1)}px`;
                eqBars[2].style.height = `${b3.toFixed(1)}px`;
                eqBars[3].style.height = `${b4.toFixed(1)}px`;
            } else {
                for (let i = 0; i < eqBars.length; i++) {
                    eqBars[i].style.height = '2.5px';
                }
            }
        }

        renderer.render(scene, camera);
    };

    updateUI(1.0);
});

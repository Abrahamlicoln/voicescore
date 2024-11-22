class AudioProcessor {
    constructor(onTranscript) {
        this.mediaRecorder = null;
        this.audioChunks = [];
        this.whisperProcessor = null;
        this.isProcessing = false;
        this.onTranscript = onTranscript;
        this.recognition = null;
        this.init();
    }

    async init() {
        try {
            // Initialize Web Speech API
            if ('webkitSpeechRecognition' in window) {
                this.recognition = new webkitSpeechRecognition();
                this.setupSpeechRecognition();
            } else {
                throw new Error('Speech recognition not supported in this browser');
            }
        } catch (error) {
            console.error('Failed to initialize AudioProcessor:', error);
        }
    }

    setupSpeechRecognition() {
        this.recognition.continuous = true;
        this.recognition.interimResults = true;
        this.recognition.lang = 'en-US';

        this.recognition.onresult = (event) => {
            for (let i = event.resultIndex; i < event.results.length; i++) {
                const transcript = event.results[i][0].transcript;
                if (event.results[i].isFinal) {
                    this.onTranscript(transcript.trim());
                }
            }
        };

        this.recognition.onerror = (event) => {
            console.error('Speech recognition error:', event.error);
        };
    }

    startRecording() {
        if (this.recognition) {
            this.recognition.start();
        }
    }

    stopRecording() {
        if (this.recognition) {
            this.recognition.stop();
        }
    }
}

window.AudioProcessor = AudioProcessor;
export const CONFIG = {
    MISTRAL_API_KEY: '8wYDmiI88eAKQrmTCrBohaC7nEibc3m8',
    DEBUG: true,
    API_ENDPOINTS: {
        SELECT_STUDENT: 'api/select_student.php',
        UPDATE_GRADES: 'api/update_grades.php',
        GET_STUDENTS: 'api/get_students.php'
    },
    WHISPER: {
        MODEL: 'Xenova/whisper-small',
        CHUNK_LENGTH: 30,
        STRIDE_LENGTH: 5
    },
    MISTRAL: {
        MODEL: 'mistral-large-latest',
        ENDPOINT: 'https://api.mistral.ai/v1/chat/completions',
        MAX_TOKENS: 500,
        TEMPERATURE: 0.1
    },
    UI: {
        STATUS_COLORS: {
            SUCCESS: 'green',
            ERROR: 'red',
            WARNING: 'yellow',
            INFO: 'blue',
            IDLE: 'gray'
        },
        MESSAGE_DURATION: 2000 // Duration to show status messages (ms)
    }
}; 
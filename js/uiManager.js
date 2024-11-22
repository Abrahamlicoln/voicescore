class UIManager {
    constructor() {
        this.$statusDot = $('#statusDot');
        this.$statusText = $('#status');
        this.$voiceButton = $('#voiceButton');
        this.$processingIndicator = $('#processingIndicator');
        this.$activeStudent = $('#activeStudent');
        this.$activeMatric = $('#activeMatric');
        this.$activeName = $('#activeName');
        this.$studentsTableBody = $('#studentsTableBody');
    }

    updateRecordingState(isRecording) {
        this.$voiceButton.text(isRecording ? 'Stop Recording' : 'Start Voice Grading');
        this.updateStatus(isRecording ? 'Listening...' : 'Ready', isRecording ? 'green' : 'gray');
    }

    updateStatus(message, color) {
        this.$statusDot.removeClass().addClass(`w-3 h-3 rounded-full bg-${color}-400`);
        this.$statusText.text(message);
    }

    showProcessing(show) {
        this.$processingIndicator.toggleClass('hidden', !show);
    }

    showError(message, error) {
        console.error(error);
        this.updateStatus(message, 'red');
        $.toast({
            heading: 'Error',
            text: message,
            icon: 'error',
            position: 'top-right'
        });
    }

    showSuccess(message) {
        this.updateStatus(message, 'green');
        $.toast({
            heading: 'Success',
            text: message,
            icon: 'success',
            position: 'top-right'
        });
    }

    showWarning(message) {
        this.updateStatus(message, 'yellow');
        $.toast({
            heading: 'Warning',
            text: message,
            icon: 'warning',
            position: 'top-right'
        });
    }

    updateActiveStudent(student) {
        this.$activeStudent.removeClass('hidden');
        this.$activeMatric.text(student.matric_number);
        this.$activeName.text(student.full_name);
    }

    highlightStudent(studentId) {
        $('tr.bg-blue-50').removeClass('bg-blue-50');
        const $row = $(`#student-${studentId}`);
        if ($row.length) {
            $row.addClass('bg-blue-50');
            $row[0].scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    }

    updateStudentGrades(studentId, grades) {
        const $row = $(`#student-${studentId}`);
        if ($row.length) {
            if (grades.ca1 !== undefined) $row.find('.ca1').text(grades.ca1);
            if (grades.ca2 !== undefined) $row.find('.ca2').text(grades.ca2);
            if (grades.exam !== undefined) $row.find('.exam').text(grades.exam);
            
            // Update total
            const ca1 = parseFloat($row.find('.ca1').text()) || 0;
            const ca2 = parseFloat($row.find('.ca2').text()) || 0;
            const exam = parseFloat($row.find('.exam').text()) || 0;
            $row.find('.total').text((ca1 + ca2 + exam).toFixed(1));
        }
    }

    renderStudents(response) {
        if (!response?.success || !Array.isArray(response.data)) {
            this.$studentsTableBody.html(`
                <tr>
                    <td colspan="6" class="px-6 py-4 text-center text-red-500">
                        No students data available
                    </td>
                </tr>`);
            return;
        }

        const html = response.data.map(student => `
            <tr id="student-${student.id}" class="hover:bg-gray-50">
                <td class="px-6 py-4 whitespace-nowrap">${student.matric_number}</td>
                <td class="px-6 py-4 whitespace-nowrap">${student.full_name}</td>
                <td class="px-6 py-4 whitespace-nowrap ca1">${student.ca1 || '0'}</td>
                <td class="px-6 py-4 whitespace-nowrap ca2">${student.ca2 || '0'}</td>
                <td class="px-6 py-4 whitespace-nowrap exam">${student.exam || '0'}</td>
                <td class="px-6 py-4 whitespace-nowrap total">${student.total || '0'}</td>
            </tr>
        `).join('');

        this.$studentsTableBody.html(html);
    }
}

// Make it globally available
window.UIManager = UIManager;
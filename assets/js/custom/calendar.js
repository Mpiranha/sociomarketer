document.addEventListener('DOMContentLoaded', function () {
    var calendarEl = document.getElementById('calendar');
    var DAY_NAMES = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', ]
    var calendar = new FullCalendar.Calendar(calendarEl, {
        selectable: false,
        headerToolbar: {
            left: 'today',
            center: 'prev title next',
            right: 'dayGridMonth,timeGridWeek,timeGridDay',




        },
        dateClick: function (date) {

            inputDate = moment(date.dateStr).format('YYYY-MM-DD');
            // var moment2 = .fullCalendar('getDate');
            moment2 = moment().format('YYYY-MM-DD');
            if (inputDate < moment2) {
                alert("Can't Schedule for past date");
                return false;
            }


            alert('clicked ' + date.dateStr);

        },
        eventAfterAllRender: function (view) {
            var row, cell;
            $('.fc-content-skeleton').each(function (i) {
                row = $(this);
                $('thead td', row).each(function (k) {
                    cell = $(this);
                    cell.append('<span class="showmenu" style="cursor:pointer"> &#9662;</span>');
                });
            });
        },
        events: 'https://fullcalendar.io/demo-events.json',
        select: function (info) {
            // alert('selected ' + info.startStr + ' to ' + info.endStr);
        },
        dayHeaderContent: function (arg) {
            return DAY_NAMES[arg.date.getDay()]
        }
    });

    calendar.render();
});